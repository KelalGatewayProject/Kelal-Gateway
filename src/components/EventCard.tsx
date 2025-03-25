import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface EventCardProps {
  image: string;
  title: string;
  description: string;
  date: string;
  time: string;
  price: string | React.ReactNode;
  onFollow?: () => void;
  isFollowing?: boolean;
}

const EventCard: React.FC<EventCardProps> = ({
  image,
  title,
  description,
  date,
  time,
  price,
  onFollow,
  isFollowing = true,
}) => {
  const [following, setFollowing] = useState(isFollowing);

  const handleFollowClick = () => {
    setFollowing(!following);
    if (onFollow) onFollow();
  };

  return (
    <div
      className="flex items-center bg-white rounded-lg"
      style={{
        width: "356px",
        height: "94px",
        backgroundColor: "#ffffff", // Force solid white
      }}
    >
      <div className="ml-2 w-[95px] h-[76px] rounded-[10%] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 px-3 py-2">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-base font-roboto">{title}</h3>
          <Button
            variant="ghost"
            className="p-0 h-auto min-w-0 ml-auto"
            onClick={handleFollowClick}
          >
            <img
              src={following ? "/walking-active.svg" : "/walking.svg"}
              alt="Follow"
              className="w-6 h-6"
            />
          </Button>
        </div>

        <p className="text-sm text-gray-600 line-clamp-1 font-roboto">
          {description}
        </p>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex space-x-2">
            <span className="font-bold text-sm font-roboto">{date}</span>
            <span className="font-bold text-sm font-roboto">{time}</span>
          </div>
          <div className="text-sm text-red-500 font-roboto">{price}</div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
