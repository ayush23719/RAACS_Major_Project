import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { Box, Heading, Button } from "theme-ui";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
const LiveSeverity = () => {
  const navigate = useNavigate();
  const [mapCenter, setMapCenter] = useState({ lat: 51.5074, lng: -0.1278 });
  const [selectedMarker, setSelectedMarker] = useState(null);
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

  // Callback function when the "Start" button is clicked
  const handleStartClick = () => {
    // You can use the userLocation here
  };

  const handleMapClick = (event) => {
    const { latLng } = event;
    const newMarker = {
      Latitude: latLng.lat(),
      Longitude: latLng.lng(),
    };
    setSelectedMarker(newMarker);
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

  useEffect(() => {
    socket.on("severity_update", (data) => {
      console.log("Recorded severity:", data.severity_index)
      setSeverity(data.severity_index);
    })

    return () => {
      socket.off("severity_update")
    }
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
          {selectedMarker && (
            <Marker
              position={{
                lat: selectedMarker.Latitude,
                lng: selectedMarker.Longitude,
              }}
              onClick={() => setSelectedMarker(null)}
            />
          )}
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
        <Button
          onClick={handleStartClick}
          disabled={!selectedMarker}
          className={`bg-blue-500 hover-bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover-border-blue-500 rounded ${
            selectedMarker ? "" : "cursor-not-allowed"
          }`}
        >
          Start
        </Button>
      </Box>
    </Box>
  );
};  

export default LiveSeverity;
