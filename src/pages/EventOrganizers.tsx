import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Star, Phone } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const EventOrganizers: React.FC = () => {
  // Event organizers data
  const organizers = [
    {
      id: 1,
      name: "CHIMP EVENT",
      description: "full-service event organizing company based in Addis Ababa",
      phone: "+251 95 109 0991",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=CE&backgroundColor=yellow",
    },
    {
      id: 2,
      name: "SHEGA EVENTS",
      description: "The premier promotion and event management company.",
      phone: "+251 94 157 5050",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=SE&backgroundColor=orange",
    },
    {
      id: 3,
      name: "SPECTACLE EVENTS",
      description: "Professional staff who are passionate about events.",
      phone: "+251 93 010 1115",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=SP&backgroundColor=teal",
    },
    {
      id: 4,
      name: "FLAWLESS EVENTS",
      description: "Create successful events, from understanding your goals",
      phone: "+251 11 618 6915",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=FE&backgroundColor=green",
    },
    {
      id: 5,
      name: "LINKUP ADDIS",
      description: "Events, entertainment, fashion and lifestyle",
      phone: "+251 91 199 2684",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=LA&backgroundColor=blue",
    },
    {
      id: 6,
      name: "PRANA EVENTS",
      description: "Trade fair organizer, full-service event management",
      phone: "+251 91 123 4567",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=PE&backgroundColor=green",
    },
  ];

  return (
    <PageLayout>
      <main className="flex-1 p-4 relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">EVENT ORGANIZERS</h1>
        </div>

        {/* Event Organizers List */}
        <div className="space-y-4 mb-6">
          {organizers.map((organizer) => (
            <Link
              to={`/event-organizer/${organizer.id}`}
              key={organizer.id}
              className="no-underline"
            >
              <div className="bg-white rounded-lg overflow-hidden flex border border-gray-200">
                <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={organizer.logo}
                    alt={organizer.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>

                <div className="p-3 flex-1">
                  <h3 className="font-bold">{organizer.name}</h3>
                  <p className="text-sm text-gray-600">
                    {organizer.description}
                  </p>
                  <p className="text-sm font-bold mt-1">{organizer.phone}</p>
                </div>

                <div className="flex items-center pr-2">
                  <div className="bg-gray-200 p-1 rounded-full">
                    <span className="text-lg">♿</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Sponsored Ad */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-1">SPONSORED</p>
          <div className="bg-gray-800 text-white rounded-lg overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&q=80"
              alt="Diageo"
              className="w-full h-32 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
              <div className="flex justify-between items-end">
                <h3 className="text-xl font-bold text-yellow-400">DIAGEO</h3>
                <Button className="bg-[#0A1128] text-white text-xs py-1 px-3 rounded">
                  DISCOVER MORE
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default EventOrganizers;
