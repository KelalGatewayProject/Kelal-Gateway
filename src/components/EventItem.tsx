import React from "react";
import { useNavigate } from "react-router-dom";

interface EventItemProps {
  id: number | string;
  image: string;
  title: string;
  description: string;
  date: string;
  time: string;
  price: string;
  to: string;
  venue_name?: string;
  organizer_name?: string;
}

const EventItem: React.FC<EventItemProps> = ({
  id,
  image,
  title,
  description,
  date,
  time,
  price,
  to,
  venue_name,
  organizer_name,
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Navigating to: ${to}`);
    navigate(to);
  };

  const isPriceNumeric = price !== "FREE";

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex">
        <img src={image} alt={title} className="w-20 h-20 object-cover" />
        <div className="p-2 flex-1">
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xs text-gray-600">{description}</p>
          <div className="flex justify-between mt-1 text-xs">
            <span>{date}</span>
            <span>{time}</span>
            {typeof price === "string" && (
              <span
                className={
                  isPriceNumeric
                    ? "text-red-500 font-semibold"
                    : "text-green-500 font-semibold"
                }
              >
                {price}
              </span>
            )}
          </div>
          {(venue_name || organizer_name) && (
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              {venue_name && <span>Venue: {venue_name}</span>}
              {organizer_name && <span>By: {organizer_name}</span>}
            </div>
          )}
        </div>
        <div className="flex items-center pr-2">
          <div className="bg-gray-200 p-1 rounded-full">
            <span className="text-lg">🔔</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
