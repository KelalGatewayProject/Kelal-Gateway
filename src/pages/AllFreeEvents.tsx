import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { MapPin, Calendar, Clock } from "lucide-react";

const AllFreeEvents: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [freeEvents, setFreeEvents] = useState<any[]>([]);

  useEffect(() => {
    // Simulate loading data
    setLoading(true);

    // Demo free events data
    const events = [
      {
        id: 2,
        title: "LINKUP BAZAAR & FAMILY FEST",
        organizer: "LINKUP ADDIS",
        images: [
          {
            url: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=300&q=80",
            alt: "LinkUp Bazaar Event",
          },
        ],
        description:
          "Two-day bazaar and family festival with more than 85 vendors. The monthly bazaar has got a new home at the stunningly beautiful Officers Club.",
        date: "Oct 22",
        time: "9:00 AM",
        price: "FREE",
        goingCount: 310,
        interestedCount: 1200,
        eventDate: "SATURDAY OCT 22",
        startTime: "9:00 AM",
        endTime: "6:00 PM",
        venue: "EFDR DEFENCE FORCE OFFICERS' CLUB",
        mapLocation:
          "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=400&q=80",
        categories: ["FOOD & DRINKS", "ARTS & CULTURE", "BUSINESS"],
      },
      {
        id: 7,
        title: "STARTUP NETWORKING EVENT",
        organizer: "ADDIS TECH HUB",
        images: [
          {
            url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&q=80",
            alt: "Startup Networking Event",
          },
        ],
        description:
          "Connect with entrepreneurs and investors at our monthly networking event.",
        date: "Oct 18",
        time: "6:00 PM",
        price: "FREE",
        goingCount: 156,
        interestedCount: 420,
        eventDate: "TUESDAY OCT 18",
        startTime: "6:00 PM",
        endTime: "9:00 PM",
        venue: "ADDIS TECH HUB, BOLE ROAD",
        mapLocation:
          "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=400&q=80",
        categories: ["BUSINESS"],
      },
      {
        id: 10,
        title: "ANNUAL CHARITY FOOTBALL TOURNAMENT",
        organizer: "ADDIS SPORTS FOUNDATION",
        images: [
          {
            url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&q=80",
            alt: "Football Tournament",
          },
        ],
        description:
          "Annual charity football tournament supporting local education initiatives.",
        date: "Nov 12",
        time: "2:00 PM",
        price: "FREE",
        goingCount: 230,
        interestedCount: 580,
        eventDate: "SATURDAY NOV 12",
        startTime: "2:00 PM",
        endTime: "7:00 PM",
        venue: "ADDIS ABABA STADIUM",
        mapLocation:
          "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&q=80",
        categories: ["SPORTS", "CHARITY"],
      },
      {
        id: 11,
        title: "SCHOOL SCIENCE FAIR",
        organizer: "ADDIS EDUCATION DEPARTMENT",
        images: [
          {
            url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&q=80",
            alt: "Science Fair",
          },
        ],
        description:
          "Annual science fair showcasing student projects from schools across Addis Ababa.",
        date: "Dec 5",
        time: "9:00 AM",
        price: "FREE",
        goingCount: 185,
        interestedCount: 320,
        eventDate: "MONDAY DEC 5",
        startTime: "9:00 AM",
        endTime: "4:00 PM",
        venue: "ADDIS ABABA EXHIBITION CENTER",
        mapLocation:
          "https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?w=400&q=80",
        categories: ["SCHOOL", "EDUCATION"],
      },
      {
        id: 12,
        title: "UNIVERSITY GRADUATION CEREMONY",
        organizer: "ADDIS ABABA UNIVERSITY",
        images: [
          {
            url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=300&q=80",
            alt: "Graduation Ceremony",
          },
        ],
        description:
          "Join us to celebrate the achievements of this year's graduating class at Addis Ababa University.",
        date: "June 15",
        time: "10:00 AM",
        price: "FREE",
        goingCount: 450,
        interestedCount: 780,
        eventDate: "THURSDAY JUNE 15",
        startTime: "10:00 AM",
        endTime: "1:00 PM",
        venue: "ADDIS ABABA UNIVERSITY MAIN CAMPUS",
        mapLocation:
          "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80",
        categories: ["SCHOOL", "EDUCATION"],
      },
    ];

    setFreeEvents(events);
    setLoading(false);
  }, []);

  return (
    <PageLayout>
      <div className="flex flex-col min-h-screen bg-white">
        {/* Header */}
        <div className="pt-16 pb-4 px-4 bg-[#030F29] text-white">
          <h1 className="text-2xl font-bold mb-2">FREE EVENTS</h1>
          <p className="text-sm opacity-80">
            Discover all free events happening around you
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A1128] mx-auto mb-4"></div>
              <p className="text-gray-600">Loading events...</p>
            </div>
          </div>
        ) : (
          /* Events List */
          <div className="flex-1 divide-y divide-gray-200">
            {freeEvents.map((event) => (
              <Link
                to={`/event/${event.id}`}
                key={event.id}
                className="no-underline"
              >
                <div className="p-4 bg-white">
                  <div className="flex items-center space-x-3 mb-2">
                    <img
                      src={event.images[0].url}
                      alt={event.images[0].alt}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-bold text-base">{event.title}</h3>
                      <p className="text-sm text-gray-600">
                        by {event.organizer}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                    {event.description}
                  </p>

                  <div className="flex justify-between text-sm">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{event.date}</span>
                    </div>

                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-gray-500" />
                      <span>{event.time}</span>
                    </div>

                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                      <span className="truncate max-w-[100px]">
                        {event.venue.split(",")[0]}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center">
                        <div className="bg-gray-100 rounded-full p-1 mr-1">
                          <span className="text-xs">👥</span>
                        </div>
                        <span className="text-xs">{event.goingCount}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="bg-gray-100 rounded-full p-1 mr-1">
                          <span className="text-xs">👀</span>
                        </div>
                        <span className="text-xs">{event.interestedCount}</span>
                      </div>
                    </div>
                    <span className="text-green-500 font-bold text-sm">
                      FREE
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default AllFreeEvents;
