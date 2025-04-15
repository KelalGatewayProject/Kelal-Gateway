import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, X } from "lucide-react";
import SimpleOpenStreetMap from "./SimpleOpenStreetMap";

export interface EventCardProps {
  id?: string;
  imageUrl?: string;
  image?: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  location?: string;
  locationCoords?: { lat: number; lng: number };
  price?: number | string | { general?: string; vip?: string };
  onFollow?: () => void;
  isFollowing?: boolean;
}

// Update the Event interface to include general property
interface Event {
  general?: boolean;
  id?: string;
  imageUrl?: string;
  image?: string;
  title: string;
  description?: string;
  date: string;
  time: string;
  location?: string;
  locationCoords?: { lat: number; lng: number };
  price?: number | string | React.ReactNode;
  onFollow?: () => void;
  isFollowing?: boolean;
}

function EventCard({
  id,
  imageUrl,
  image,
  title,
  description = "",
  date,
  time,
  location,
  locationCoords = { lat: 9.0222, lng: 38.7468 }, // Default to Addis Ababa if not provided
  price,
  onFollow,
  isFollowing = true,
}: EventCardProps) {
  const [following, setFollowing] = useState(isFollowing);
  const [showMap, setShowMap] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const imageToUse =
    image ||
    imageUrl ||
    "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80";

  const handleFollowClick = () => {
    setFollowing(!following);
    if (onFollow) onFollow();
  };

  const handleLocationClick = () => {
    setMapError(null);
    setShowMap(true);
  };

  const handleCloseMap = () => {
    setShowMap(false);
    setMapError(null);
  };

  const handleMapError = (error: string) => {
    setMapError(error);
  };

  return (
    <>
      <div
        className="flex items-center bg-white rounded-lg w-full"
        style={{
          height: "94px",
          backgroundColor: "#ffffff", // Force solid white
        }}
      >
        <div className="ml-2 w-[95px] h-[76px] rounded-[10%] overflow-hidden">
          <img
            src={imageToUse}
            alt={title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src =
                "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80";
            }}
          />
        </div>

        <div className="flex-1 px-3 py-2">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-base font-roboto">{title}</h3>
            <Button
              variant="ghost"
              className="p-0 h-auto min-w-0 ml-auto"
              onClick={handleFollowClick}
              aria-label={following ? "Unfollow event" : "Follow event"}
            >
              <img
                src={
                  following
                    ? "https://kelalgateway.et/wp-content/uploads/2025/03/FOLLOWING.png"
                    : "/walking.svg"
                }
                alt={following ? "Following" : "Follow"}
                className="w-6 h-6"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.currentTarget.src = following
                    ? "https://api.dicebear.com/7.x/avataaars/svg?seed=following"
                    : "https://api.dicebear.com/7.x/avataaars/svg?seed=follow";
                }}
              />
            </Button>
          </div>

          {location && (
            <div
              className="flex items-center text-sm text-gray-600 line-clamp-1 font-roboto cursor-pointer hover:text-blue-600 transition-colors"
              onClick={handleLocationClick}
              role="button"
              aria-label="View location on map"
            >
              <MapPin className="h-3 w-3 mr-1 text-gray-500" />
              <span>{location}</span>
            </div>
          )}

          {!location && description && (
            <p className="text-sm text-gray-600 line-clamp-1 font-roboto">
              {description}
            </p>
          )}

          <div className="flex justify-between items-center mt-auto">
            <div className="flex space-x-2">
              <span className="font-bold text-sm font-roboto">{date}</span>
              <span className="font-bold text-sm font-roboto">{time}</span>
            </div>
            <div className="text-sm text-red-500 font-roboto">
              {typeof price === "object" && price !== null && !React.isValidElement(price)
                ? `${price.general ? `General: ${price.general}` : ""}${price.vip ? (price.general ? " / " : "") + `VIP: ${price.vip}` : ""}`
                : typeof price === "string" || typeof price === "number"
                  ? price
                  : ""}
            </div>
          </div>
        </div>
      </div>

      {/* Map overlay */}
      {showMap && (
        <div className="fixed inset-0 z-50 bg-black/5 backdrop-blur-sm">
          <div className="absolute top-4 right-4 z-[1001]">
            <Button
              variant="secondary"
              size="icon"
              className="bg-white shadow-md rounded-full"
              onClick={handleCloseMap}
              aria-label="Close map"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {mapError && (
            <div className="absolute top-4 left-4 right-16 z-[1001] bg-red-100 text-red-700 p-2 text-sm rounded-md shadow-md">
              {mapError}
              <button
                className="ml-2 underline"
                onClick={() => setMapError(null)}
              >
                Dismiss
              </button>
            </div>
          )}

          <SimpleOpenStreetMap
            initialLocation={locationCoords}
            height="100%"
            readOnly={true}
            locationName={location || title}
            showControls={true}
          />
        </div>
      )}
    </>
  );
}

export default EventCard;
