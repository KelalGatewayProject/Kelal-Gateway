import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Star, Phone } from "lucide-react";

const VenuesAndClubs: React.FC = () => {
  // Venues data
  const venues = [
    {
      id: 1,
      name: "THE VENUE WAREHOUSE",
      description:
        "Addis Ababa's premier event space for concerts and large gatherings",
      address: "Bole, Addis Ababa",
      phone: "+251 91 123 4567",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=500&q=80",
      logo: "W",
      logoColor: "text-green-500",
      upcoming: 3,
    },
    {
      id: 2,
      name: "FLIRT LOUNGE",
      description: "Upscale nightclub featuring local and international DJs",
      address: "Kazanchis, Addis Ababa",
      phone: "+251 92 345 6789",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=500&q=80",
      logo: "F",
      logoColor: "text-yellow-500",
      upcoming: 5,
    },
    {
      id: 3,
      name: "V LOUNGE",
      description: "Elegant lounge with craft cocktails and live music",
      address: "Meskel Square, Addis Ababa",
      phone: "+251 93 456 7890",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=500&q=80",
      logo: "V",
      logoColor: "text-red-500",
      upcoming: 2,
    },
    {
      id: 4,
      name: "GHION HOTEL",
      description: "Historic hotel with beautiful gardens for outdoor events",
      address: "Piazza, Addis Ababa",
      phone: "+251 11 551 0459",
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=500&q=80",
      logo: "G",
      logoColor: "text-blue-500",
      upcoming: 4,
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
          <h1 className="text-2xl font-bold">VENUES & CLUBS</h1>
        </div>

        {/* Venues List */}
        <div className="space-y-6">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              {/* Venue Image */}
              <div className="relative h-40">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />

                {/* Venue Logo */}
                <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-black flex items-center justify-center">
                  <span className={`text-2xl font-bold ${venue.logoColor}`}>
                    {venue.logo}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-bold">{venue.rating}</span>
                </div>
              </div>

              {/* Venue Details */}
              <div className="p-4">
                <h2 className="font-bold text-lg mb-1">{venue.name}</h2>
                <p className="text-gray-600 text-sm mb-3">
                  {venue.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">{venue.address}</span>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">{venue.phone}</span>
                  </div>

                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">
                      {venue.upcoming} upcoming events
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1 bg-[#0A1128] text-white">
                    VIEW EVENTS
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-[#0A1128] text-[#0A1128]"
                  >
                    FOLLOW
                  </Button>
                </div>
              </div>
            </div>
          ))}
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

export default VenuesAndClubs;
