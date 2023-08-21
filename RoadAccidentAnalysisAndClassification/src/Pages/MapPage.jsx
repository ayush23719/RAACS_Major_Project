import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  useLoadScript,
} from "@react-google-maps/api";
import { Box, Heading, Button, Input } from "theme-ui";
import { useNavigate } from "react-router-dom";

const MapPage = () => {
  const navigate = useNavigate();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY,
    libraries: ["places"], // Add the 'places' library here
  });

  const handleProceedClick = () => {
    if (selectedMarker) {
      const { Latitude, Longitude } = selectedMarker;
      navigate(`/home?Latitude=${Latitude}&Longitude=${Longitude}`);
    }
  };

  const handleMapClick = (event) => {
    const { latLng } = event;
    const newMarker = {
      Latitude: latLng.lat(),
      Longitude: latLng.lng(),
    };
    setSelectedMarker(newMarker);
  };

  const handleSearchLoad = (searchBox) => {
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length > 0) {
        const { lat, lng } = places[0].geometry.location;
        const Latitude = lat();
        const Longitude = lng();
        setSelectedMarker({ Latitude, Longitude });
        setSearchQuery(places[0].formatted_address);
      }
    });
  };

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
          center={{ lat: 51.5074, lng: -0.1278 }} // Center of London (UK)
          zoom={10}
          onClick={handleMapClick}
        >
          <StandaloneSearchBox
            onLoad={handleSearchLoad}
            onPlacesChanged={() => {}}
          >
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: "100%",
                p: "0.5rem",
                fontSize: "0.875rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                bg: "white",
              }}
            />
          </StandaloneSearchBox>
          {selectedMarker && (
            <Marker
              position={{
                lat: selectedMarker.Latitude,
                lng: selectedMarker.Longitude,
              }}
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
          onClick={handleProceedClick}
          disabled={!selectedMarker}
          className={`bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded ${
            selectedMarker ? "" : "cursor-not-allowed"
          }`}
        >
          Proceed
        </Button>
      </Box>
    </Box>
  );
};

export default MapPage;
