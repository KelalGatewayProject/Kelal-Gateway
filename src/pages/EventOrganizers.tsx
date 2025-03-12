import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Star, Phone } from "lucide-react";

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
    <div className="flex flex-col min-h-screen relative">
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(https://imgur.com/fSvWmgU.png)",
          opacity: "0.1",
        }}
      />

      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 relative z-10">
        <div className="flex justify-between items-center p-3">
          <div className="flex items-center">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=kelal"
              alt="Logo"
              className="h-8 w-8"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=ticket"
                alt="Ticket"
                className="h-6 w-6"
              />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                1
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">EVENT ORGANIZERS</h1>
        </div>

        {/* Event Organizers List */}
        <div className="space-y-4 mb-6">
          {organizers.map((organizer) => (
            <div
              key={organizer.id}
              className="bg-white rounded-lg overflow-hidden flex border border-gray-200"
            >
              <div className="w-20 h-20 flex-shrink-0 flex items-center justify-center">
                <img
                  src={organizer.logo}
                  alt={organizer.name}
                  className="w-16 h-16 object-contain"
                />
              </div>

              <div className="p-3 flex-1">
                <h3 className="font-bold">{organizer.name}</h3>
                <p className="text-sm text-gray-600">{organizer.description}</p>
                <p className="text-sm font-bold mt-1">{organizer.phone}</p>
              </div>

              <div className="flex items-center pr-2">
                <div className="bg-gray-200 p-1 rounded-full">
                  <span className="text-lg">♿</span>
                </div>
              </div>
            </div>
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

      {/* Bottom Navigation */}
      <nav className="bg-gray-100 border-t border-gray-200 fixed bottom-0 w-full z-10">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className="flex flex-col items-center text-gray-500">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            to="/profile"
            className="flex flex-col items-center text-gray-500"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                alt="Profile"
                className="w-full h-full"
              />
            </div>
            <span className="text-xs mt-1">Profile</span>
          </Link>
          <Link
            to="/calendar"
            className="flex flex-col items-center text-gray-500"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <span className="text-xs mt-1">Calendar</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default EventOrganizers;
