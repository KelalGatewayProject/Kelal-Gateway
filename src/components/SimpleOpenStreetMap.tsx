import React, { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  ZoomControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Button } from "@/components/ui/button";
import {
  Maximize2,
  Minimize2,
  Navigation,
  ZoomIn,
  ZoomOut,
  Locate,
  MapPin,
} from "lucide-react";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface SimpleOpenStreetMapProps {
  initialLocation?: { lat: number; lng: number };
  onLocationChange?: (
    location: { lat: number; lng: number },
    address?: string,
  ) => void;
  height?: string;
  readOnly?: boolean;
  locationName?: string;
  showControls?: boolean;
}

const MapEvents = ({
  onLocationChange,
  readOnly,
}: {
  onLocationChange: (location: { lat: number; lng: number }) => void;
  readOnly: boolean;
}) => {
  const map = useMapEvents({
    click: (e) => {
      if (readOnly) return;
      const { lat, lng } = e.latlng;
      onLocationChange({ lat, lng });
    },
  });
  return null;
};

const MapControls = ({
  readOnly,
  onFullscreenToggle,
}: {
  readOnly: boolean;
  onFullscreenToggle: () => void;
}) => {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 16 });
  };

  const handleOpenDirections = () => {
    const center = map.getCenter();
    const url = `https://www.openstreetmap.org/directions?from=&to=${center.lat},${center.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="absolute bottom-2 right-2 z-[1000] flex flex-col gap-2">
      <Button
        variant="secondary"
        size="icon"
        className="bg-white shadow-md"
        onClick={handleZoomIn}
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="bg-white shadow-md"
        onClick={handleZoomOut}
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="bg-white shadow-md"
        onClick={handleLocate}
      >
        <Locate className="h-4 w-4" />
      </Button>
      {readOnly && (
        <Button
          variant="secondary"
          size="icon"
          className="bg-white shadow-md"
          onClick={handleOpenDirections}
        >
          <Navigation className="h-4 w-4" />
        </Button>
      )}
      <Button
        variant="secondary"
        size="icon"
        className="bg-white shadow-md"
        onClick={onFullscreenToggle}
      >
        <Maximize2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

const FullscreenMapControls = ({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) => {
  const map = useMap();

  const handleZoomIn = () => {
    map.zoomIn();
  };

  const handleZoomOut = () => {
    map.zoomOut();
  };

  const handleLocate = () => {
    map.locate({ setView: true, maxZoom: 16 });
  };

  return (
    <div className="absolute bottom-4 left-0 right-0 z-[1000] flex justify-center gap-2">
      <Button
        variant="default"
        className="bg-blue-600 text-white shadow-md"
        onClick={onConfirm}
      >
        <MapPin className="h-4 w-4 mr-2" />
        Choose Location
      </Button>
      <Button
        variant="secondary"
        className="bg-white shadow-md"
        onClick={onClose}
      >
        Cancel
      </Button>
    </div>
  );
};

const SimpleOpenStreetMap: React.FC<SimpleOpenStreetMapProps> = ({
  initialLocation = { lat: 9.0222, lng: 38.7468 },
  onLocationChange,
  height = "400px",
  readOnly = false,
  locationName = "",
  showControls = true,
}) => {
  const [location, setLocation] = useState(initialLocation);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [address, setAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef(null);
  const fullscreenMapRef = useRef(null);

  const handleLocationChange = (newLocation: { lat: number; lng: number }) => {
    setLocation(newLocation);
    setIsLoading(true);
    setError(null);

    getAddressFromCoordinates(newLocation.lat, newLocation.lng)
      .then((address) => {
        setAddress(address);
        if (onLocationChange) {
          onLocationChange(newLocation, address);
        }
      })
      .catch((error) => {
        console.error("Error getting address:", error);
        setError("Failed to get address. Please try again.");
        if (onLocationChange) {
          onLocationChange(newLocation);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setIsMapReady(true);
    if (initialLocation) {
      setIsLoading(true);
      setError(null);

      getAddressFromCoordinates(initialLocation.lat, initialLocation.lng)
        .then((address) => {
          setAddress(address);
        })
        .catch((error) => {
          console.error("Error fetching address:", error);
          setError("Failed to get address information.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [initialLocation]);

  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            "User-Agent": "EventApp/1.0",
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.display_name || "";
    } catch (error) {
      console.error("Error fetching address:", error);
      throw error;
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleFullscreenLocationSelect = () => {
    if (onLocationChange) {
      onLocationChange(location, address);
    }
    setIsFullscreen(false);
  };

  if (!isMapReady) {
    return (
      <div className="flex items-center justify-center" style={{ height }}>
        <p>Loading Map...</p>
      </div>
    );
  }

  return (
    <>
      {/* Regular Map */}
      <div
        style={{
          height: isFullscreen ? "0" : height,
          width: "100%",
          position: "relative",
          overflow: "hidden",
          transition: "height 0.3s ease",
        }}
      >
        {isLoading && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1001] bg-white p-2 rounded-md shadow-md">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm mt-1">Loading...</p>
          </div>
        )}

        {error && (
          <div className="absolute top-0 left-0 right-0 z-[1001] bg-red-100 text-red-700 p-2 text-sm text-center">
            {error}
            <button className="ml-2 underline" onClick={() => setError(null)}>
              Dismiss
            </button>
          </div>
        )}

        <MapContainer
          center={[location.lat, location.lng]}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          attributionControl={true}
          ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[location.lat, location.lng]}
            draggable={!readOnly}
            eventHandlers={{
              dragend: (e) => {
                if (readOnly) return;
                const marker = e.target;
                const position = marker.getLatLng();
                const newLocation = {
                  lat: position.lat,
                  lng: position.lng,
                };
                handleLocationChange(newLocation);
              },
            }}
          />
          {!readOnly && (
            <MapEvents
              onLocationChange={handleLocationChange}
              readOnly={readOnly}
            />
          )}
          {showControls && (
            <MapControls
              readOnly={readOnly}
              onFullscreenToggle={toggleFullscreen}
            />
          )}
        </MapContainer>

        <div className="text-xs text-gray-500 mt-1">
          ©{" "}
          <a
            href="https://www.openstreetmap.org/copyright"
            target="_blank"
            rel="noopener noreferrer"
          >
            OpenStreetMap
          </a>{" "}
          contributors
        </div>
      </div>

      {/* Fullscreen Map */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[9999] bg-white">
          <div className="absolute top-4 right-4 z-[10000]">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white shadow-md"
              onClick={toggleFullscreen}
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>

          <MapContainer
            center={[location.lat, location.lng]}
            zoom={15}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
            attributionControl={false}
            ref={fullscreenMapRef}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[location.lat, location.lng]}
              draggable={!readOnly}
              eventHandlers={{
                dragend: (e) => {
                  if (readOnly) return;
                  const marker = e.target;
                  const position = marker.getLatLng();
                  const newLocation = {
                    lat: position.lat,
                    lng: position.lng,
                  };
                  setLocation(newLocation);
                  getAddressFromCoordinates(newLocation.lat, newLocation.lng)
                    .then(setAddress)
                    .catch(console.error);
                },
              }}
            />
            {!readOnly && (
              <MapEvents
                onLocationChange={(loc) => {
                  setLocation(loc);
                  getAddressFromCoordinates(loc.lat, loc.lng)
                    .then(setAddress)
                    .catch(console.error);
                }}
                readOnly={readOnly}
              />
            )}
            <FullscreenMapControls
              onClose={toggleFullscreen}
              onConfirm={handleFullscreenLocationSelect}
            />
          </MapContainer>
        </div>
      )}
    </>
  );
};

export default SimpleOpenStreetMap;
