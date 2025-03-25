import React from "react";
import FreeEventPage from "@/components/FreeEventPage";

const FreeEvent: React.FC = () => {
  // Sample data for a free event
  const eventData = {
    title: "LINKUP BAZAAR & FAMILY FEST",
    organizer: "LINKUP ADDIS",
    images: [
      {
        url: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=300&q=80",
        alt: "LinkUp Bazaar Event",
      },
      {
        url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=300&q=80",
        alt: "Family Festival",
      },
    ],
    description:
      "LinkUp Bazaar is back bigger and better! The monthly bazaar has got a new home at the stunningly beautiful Officers Club (Mekoniñoch Kibeb) near Lideta/Tor Hailoch and will kick off its journey as a two-day bazaar and family festival with more than 85 merchants...",
    goingCount: 310,
    interestedCount: 1200,
    performers: [
      {
        name: "SAM YF",
        image:
          "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80",
      },
    ],
    sponsors: [
      {
        name: "LINKUP",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=linkup",
      },
      {
        name: "Linkup Addis",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=addis",
      },
    ],
    eventDate: "SATURDAY OCT 12-13",
    startTime: "9:00 AM",
    endTime: "6:00 PM",
    contactPhone: "+25191 199 2684",
    venue: "EFDR DEFENCE FORCE OFFICERS' CLUB",
    mapLocation:
      "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=400&q=80",
  };

  return <FreeEventPage {...eventData} />;
};

export default FreeEvent;
