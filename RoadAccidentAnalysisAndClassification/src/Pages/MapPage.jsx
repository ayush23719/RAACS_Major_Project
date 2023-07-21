import React, { useState } from "react";
import { Map, Marker } from "pigeon-maps";
import { osm } from "pigeon-maps/providers";
import { Box, Heading, Button } from "theme-ui";
import { useNavigate } from "react-router-dom";
import "../styles/MapPage.css";

const MapPage = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = React.createRef();
  const navigate = useNavigate();

  const handleMapClick = (event) => {
    const { latLng } = event;
    const newMarker = {
      latitude: latLng[0],
      longitude: latLng[1],
    };
    setSelectedMarker(newMarker);
  };

  const handleProceedClick = () => {
    if (selectedMarker) {
      const { latitude, longitude } = selectedMarker;
      navigate(`/home?latitude=${latitude}&longitude=${longitude}`);
    }
  };

  const handleMarkerClick = () => {
    if (selectedMarker) {
      const { latitude, longitude } = selectedMarker;
      alert(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }
  };

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
        <Map
          ref={mapRef}
          height={400}
          defaultCenter={[51.5074, 0.1278]} // Center of London
          defaultZoom={9}
          onClick={handleMapClick}
          provider={osm}
        >
          {selectedMarker && (
            <Marker
              width={50}
              anchor={[selectedMarker.latitude, selectedMarker.longitude]}
              onClick={handleMarkerClick}
            />
          )}
        </Map>
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
