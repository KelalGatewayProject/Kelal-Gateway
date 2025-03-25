import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

interface SimpleGoogleMapProps {
  initialLocation?: { lat: number; lng: number };
  onLocationChange?: (location: { lat: number; lng: number }) => void;
  height?: string;
}

const SimpleGoogleMap: React.FC<SimpleGoogleMapProps> = ({
  initialLocation = { lat: 9.0222, lng: 38.7468 }, // Default to Addis Ababa
  onLocationChange,
  height = "400px",
}) => {
  const [location, setLocation] = useState(initialLocation);

  // Use a direct API key to avoid environment variable issues
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBIwzALxUPNbatRBj3Xi1Uhp0fFzwWNBkE",
    libraries: ["places"],
  });

  const handleLocationChange = (newLocation: { lat: number; lng: number }) => {
    setLocation(newLocation);
    if (onLocationChange) {
      onLocationChange(newLocation);
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <p>Loading Map...</p>
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={{
        width: "100%",
        height,
      }}
      center={location}
      zoom={13}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
      }}
      onClick={(e) => {
        const newLocation = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        };
        handleLocationChange(newLocation);
      }}
    >
      <Marker
        position={location}
        draggable={true}
        onDragEnd={(e) => {
          const newLocation = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          };
          handleLocationChange(newLocation);
        }}
      />
    </GoogleMap>
  );
};

export default SimpleGoogleMap;
