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
import { Input } from "@/components/ui/input";
import { X, Check, Navigation, Search, Locate, Share2 } from "lucide-react";

// Fix for default marker icons in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

interface FullscreenMapProps {
  initialLocation: { lat: number; lng: number };
  onLocationSelect: (
    location: { lat: number; lng: number },
    address: string,
  ) => void;
  onClose: () => void;
  showDirections?: boolean;
  locationName?: string;
}

// Component to handle map events
const MapEvents = ({
  onLocationChange,
}: {
  onLocationChange: (location: { lat: number; lng: number }) => void;
}) => {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationChange({ lat, lng });
    },
  });
  return null;
};

// Component to handle user location
const LocationFinder = ({
  onFound,
}: {
  onFound: (coords: { lat: number; lng: number }) => void;
}) => {
  const map = useMap();

  useEffect(() => {
    map.on("locationfound", (e) => {
      onFound({ lat: e.latlng.lat, lng: e.latlng.lng });
    });

    map.on("locationerror", (e) => {
      console.error("Location error:", e.message);
    });

    return () => {
      map.off("locationfound");
      map.off("locationerror");
    };
  }, [map, onFound]);

  return null;
};

const FullscreenMap: React.FC<FullscreenMapProps> = ({
  initialLocation,
  onLocationSelect,
  onClose,
  showDirections = false,
  locationName = "",
}) => {
  const [location, setLocation] = useState(initialLocation);
  const [address, setAddress] = useState("");
  const [isMapReady, setIsMapReady] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Handle location change
  const handleLocationChange = (newLocation: { lat: number; lng: number }) => {
    setLocation(newLocation);
    setSearchError(null);
    getAddressFromCoordinates(newLocation.lat, newLocation.lng)
      .then((address) => {
        setAddress(address);
      })
      .catch((error) => {
        console.error("Error getting address:", error);
        setSearchError("Could not retrieve address information.");
      });
  };

  // Ensure map is ready after component mounts
  useEffect(() => {
    setIsMapReady(true);
    if (initialLocation) {
      getAddressFromCoordinates(initialLocation.lat, initialLocation.lng)
        .then((address) => {
          setAddress(address);
        })
        .catch((error) => {
          console.error("Error getting address:", error);
          setSearchError("Could not retrieve address information.");
        });
    }

    // Focus search input when component mounts
    if (searchInputRef.current && !showDirections) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 300);
    }
  }, [initialLocation, showDirections]);

  // Function to get address from coordinates using Nominatim
  const getAddressFromCoordinates = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
        {
          headers: {
            "User-Agent": "EventApp/1.0", // Required by Nominatim's usage policy
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

  // Function to open directions in a new tab
  const openDirections = () => {
    const url = `https://www.openstreetmap.org/directions?from=&to=${location.lat},${location.lng}`;
    window.open(url, "_blank");
  };

  // Function to search for a location
  const searchLocation = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setSearchError(null);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}`,
        {
          headers: {
            "User-Agent": "EventApp/1.0", // Required by Nominatim's usage policy
          },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.length > 0) {
        const newLocation = {
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        };
        setLocation(newLocation);
        setAddress(data[0].display_name || "");

        // Center map on the new location
        if (mapRef.current) {
          mapRef.current.setView([newLocation.lat, newLocation.lng], 15);
        }
      } else {
        setSearchError("No results found for your search.");
      }
    } catch (error) {
      console.error("Error searching for location:", error);
      setSearchError("Error searching for location. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  // Function to find user's current location
  const findMyLocation = () => {
    setIsLocating(true);
    setSearchError(null);

    if (mapRef.current) {
      mapRef.current.locate({ setView: true, maxZoom: 16 });
    }
  };

  // Handle when user location is found
  const handleLocationFound = (coords: { lat: number; lng: number }) => {
    setLocation(coords);
    setIsLocating(false);

    getAddressFromCoordinates(coords.lat, coords.lng)
      .then((address) => {
        setAddress(address);
      })
      .catch((error) => {
        console.error("Error getting address:", error);
        setSearchError("Found your location but couldn't get the address.");
      });
  };

  // Function to share location
  const shareLocation = () => {
    const url = `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=15/${location.lat}/${location.lng}`;

    if (navigator.share) {
      navigator
        .share({
          title: locationName || "Shared Location",
          text: `Check out this location: ${address}`,
          url: url,
        })
        .catch((err) => {
          console.error("Error sharing:", err);
          setShareUrl(url);
        });
    } else {
      setShareUrl(url);
    }
  };

  // Function to copy share URL to clipboard
  const copyShareUrl = () => {
    if (shareUrl) {
      navigator.clipboard
        .writeText(shareUrl)
        .then(() => {
          alert("Link copied to clipboard!");
          setShareUrl(null);
        })
        .catch((err) => {
          console.error("Failed to copy:", err);
        });
    }
  };

  if (!isMapReady) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p>Loading Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex flex-col">
      <div className="bg-white p-2 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">
            {showDirections ? locationName || "Location" : "Select Location"}
          </h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close map"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Search bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="Search for a location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && searchLocation()}
              className="pr-10"
              ref={searchInputRef}
              aria-label="Search location"
            />
            {isSearching && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          <Button
            onClick={searchLocation}
            disabled={isSearching}
            aria-label="Search"
          >
            <Search className="h-4 w-4 mr-2" /> Search
          </Button>
          <Button
            variant="outline"
            onClick={findMyLocation}
            disabled={isLocating}
            aria-label="Find my location"
          >
            <Locate className="h-4 w-4" />
          </Button>
        </div>

        {searchError && (
          <div className="bg-red-100 text-red-700 p-2 text-sm rounded-md">
            {searchError}
            <button
              className="ml-2 underline"
              onClick={() => setSearchError(null)}
            >
              Dismiss
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 relative">
        {isLocating && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1001] bg-white p-2 rounded-md shadow-md">
            <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-sm mt-1">Finding your location...</p>
          </div>
        )}

        <MapContainer
          center={[location.lat, location.lng]}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          attributionControl={true}
          ref={mapRef}
        >
          <ZoomControl position="bottomright" />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[location.lat, location.lng]}
            draggable={!showDirections}
            eventHandlers={{
              dragend: (e) => {
                if (showDirections) return;
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
          {!showDirections && (
            <MapEvents onLocationChange={handleLocationChange} />
          )}
          <LocationFinder onFound={handleLocationFound} />
        </MapContainer>
      </div>

      <div className="bg-white p-4 space-y-2">
        {address && (
          <div className="text-sm text-gray-700 mb-2">
            <strong>Address:</strong> {address}
          </div>
        )}

        <div className="flex justify-between gap-2">
          {showDirections ? (
            <>
              <Button onClick={openDirections} className="flex-1">
                <Navigation className="mr-2 h-4 w-4" /> Get Directions
              </Button>
              <Button
                variant="outline"
                onClick={shareLocation}
                className="flex-none"
                aria-label="Share location"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => onLocationSelect(location, address)}
                className="flex-1"
              >
                <Check className="mr-2 h-4 w-4" /> Choose This Location
              </Button>
              <Button
                variant="outline"
                onClick={shareLocation}
                className="flex-none"
                aria-label="Share location"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>

        {shareUrl && (
          <div className="mt-2 p-2 bg-gray-100 rounded-md">
            <p className="text-sm mb-2">
              Copy this link to share the location:
            </p>
            <div className="flex gap-2">
              <Input
                value={shareUrl}
                readOnly
                className="text-xs"
                onClick={(e) => (e.target as HTMLInputElement).select()}
              />
              <Button size="sm" onClick={copyShareUrl}>
                Copy
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullscreenMap;
