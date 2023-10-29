import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Box, Heading, Button } from "theme-ui";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import axios from "axios";

const LiveSeverity = () => {
  const navigate = useNavigate();
  const [mapCenter, setMapCenter] = useState({ lat: 51.5074, lng: -0.1278 });
  const [startMarker, setStartMarker] = useState(null);
  const [endMarker, setEndMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null); // State to store the user's location

  const [severity, setSeverity] = useState(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY,
  });

  const socket = io("http://localhost:5000");

  // Function to get the user's location
  const getUserLocation = (successCallback, errorCallback) => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          successCallback(userLocation);
          const requestData = {
            startLat: parseFloat(position.coords.latitude),
            startLong: parseFloat(position.coords.longitude),
            Day_of_Week: 2,
            Number_of_Vehicles: 2,
          };
          socket.emit("location_update", requestData);
        },
        (error) => {
          errorCallback(error);
        },
        { enableHighAccuracy: true, distanceFilter: 100 }
      );
    } else {
      errorCallback("Geolocation is not supported by your browser.");
    }
  };

  // useEffect(() => {
  //   console.log("HI before socket.on")
  //   socket.on("severity_update", (data) => {
  //     console.log("HI inside socket.on")
  //     console.log("Recorded severity:", data.severity_index);
  //     setSeverity(data.severity_index);
  //   });

  //   return () => {
  //     socket.off("severity_update");
  //   };
  // }, []);
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLng = toRadians(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  // Function to convert degrees to radians
  const toRadians = (degrees) => {
    return degrees * (Math.PI / 180);
  };

  // Callback function when the "Start" button is clicked
  const handleStartClick = () => {
    // Start the simulation using the start and end markers
    if (startMarker && endMarker) {
      // Perform simulation logic here
      console.log("Simulation started");
      const simulateMovement = setInterval(async () => {
        // Calculate the new position based on the current position and a certain distance
        const currentPosition = {
          lat: startMarker.lat,
          lng: startMarker.lng,
        };
        const newPosition = {
          lat: currentPosition.lat + 0.005, // Change the latitude by 0.001 (approximately 100m)
          lng: currentPosition.lng,
        };

        // Update the start marker with the new position
        setStartMarker(newPosition);

        // Send the new position to the backend via socket.io
        const requestData = {
          startLat: newPosition.lat,
          startLong: newPosition.lng,
          Day_of_Week: 2,
          Number_of_Vehicles: Math.floor(Math.random() * 3) + 1,
        };
        console.log("rD:", requestData);
        // socket.emit("location_update", requestData);
        const response = await axios.post("/predict", requestData);
        const { severity_index } =
          response.data;

        setSeverity(severity_index);
        console.log("Index:", severity_index);
        // Check if the new position is close to the end marker
        const distance = calculateDistance(newPosition, endMarker);
        if (distance < 0.01) {
          // Stop the simulation
          clearInterval(simulateMovement);
          console.log("Simulation completed");
        }
      }, 2000); // Move every 2 second (adjust this value as needed)
    }
  };

  const handleMapClick = (event) => {
    const { latLng } = event;
    const newMarker = {
      lat: latLng.lat(),
      lng: latLng.lng(),
    };

    // Set the start marker if it's not set yet
    if (!startMarker) {
      setStartMarker(newMarker);
    }
    // Set the end marker if the start marker is already set
    else if (startMarker && !endMarker) {
      setEndMarker(newMarker);
    }
  };

  // Get the user's location when the component mounts
  useEffect(() => {
    getUserLocation(
      (location) => {
        setUserLocation(location);
        setMapCenter(location); // Set the map center to the user's location
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  if (loadError) return <h1>Error loading maps</h1>;
  if (!isLoaded) return <h1>Loading...</h1>;

  return (
    <Box
      sx={{
        maxWidth: "800px",
        mx: "auto",
        px: "2rem",
        position: "relative",
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          my: "2rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Heading
          as="h1"
          className="text-4xl text-white"
          sx={{ fontFamily: "rubik" }}
        >
          {" "}
          Select a Location
        </Heading>
      </Box>
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <GoogleMap
          mapContainerStyle={{ height: "400px", width: "100%" }}
          center={mapCenter}
          zoom={12}
          onClick={handleMapClick}
        >
          {startMarker && (
            <Marker
              position={{ lat: startMarker.lat, lng: startMarker.lng }}
              onClick={() => setStartMarker(null)}
            />
          )}
          {endMarker && (
            <Marker
              position={{ lat: endMarker.lat, lng: endMarker.lng }}
              onClick={() => setEndMarker(null)}
            />
          )}{" "}
        </GoogleMap>
      </Box>
      <Box
        sx={{
          textAlign: "center",
          mt: "2rem",
          position: "relative",
          zIndex: 2,
        }}
      >
        {" "}
        <Button
          onClick={handleStartClick}
          disabled={!startMarker || !endMarker}
          className={`bg-blue-500 hover-bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover-border-blue-500 rounded ${
            startMarker && endMarker ? "" : "cursor-not-allowed"
          }`}
        >
          {" "}
          Start Simulation{" "}
        </Button>{" "}
        <h3 color="white">{`SEVERITY: ${severity}`}</h3>
      </Box>{" "}
    </Box>
  );
};

export default LiveSeverity;
