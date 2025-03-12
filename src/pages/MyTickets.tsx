import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QrCode, Calendar, MapPin, Clock } from "lucide-react";

const MyTickets: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");

  // Sample ticket data
  const upcomingTickets = [
    {
      id: 1,
      eventName: "JULIAN MARLEY",
      date: "July 20, 2024",
      time: "7:00 PM",
      venue: "Ghion Hotel",
      location: "Addis Ababa",
      ticketType: "VIP",
      ticketNumber: "T-12345-678",
      image:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?w=300&q=80",
    },
    {
      id: 2,
      eventName: "LinkUp Bazaar",
      date: "October 22, 2024",
      time: "9:00 AM",
      venue: "Millennium Hall",
      location: "Addis Ababa",
      ticketType: "General Admission",
      ticketNumber: "T-98765-432",
      image:
        "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=300&q=80",
    },
  ];

  const pastTickets = [
    {
      id: 3,
      eventName: "Jubilation Africa",
      date: "March 23, 2024",
      time: "4:00 PM",
      venue: "Sheraton Hotel",
      location: "Addis Ababa",
      ticketType: "General Admission",
      ticketNumber: "T-54321-987",
      image:
        "https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=300&q=80",
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
          <h1 className="text-2xl font-bold">MY TICKETS</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`flex-1 py-2 font-semibold text-center ${activeTab === "upcoming" ? "text-[#0A1128] border-b-2 border-[#0A1128]" : "text-gray-500"}`}
            onClick={() => setActiveTab("upcoming")}
          >
            UPCOMING
          </button>
          <button
            className={`flex-1 py-2 font-semibold text-center ${activeTab === "past" ? "text-[#0A1128] border-b-2 border-[#0A1128]" : "text-gray-500"}`}
            onClick={() => setActiveTab("past")}
          >
            PAST
          </button>
        </div>

        {/* Tickets List */}
        <div className="space-y-6">
          {activeTab === "upcoming" ? (
            upcomingTickets.length > 0 ? (
              upcomingTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md"
                >
                  {/* Event Image */}
                  <div className="relative h-32">
                    <img
                      src={ticket.image}
                      alt={ticket.eventName}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h3 className="font-bold text-lg">{ticket.eventName}</h3>
                      <p className="text-sm">{ticket.ticketType}</p>
                    </div>
                  </div>

                  {/* Ticket Details */}
                  <div className="p-4 space-y-3">
                    <div className="flex items-center">
                      <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                      <span>{ticket.date}</span>
                    </div>

                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-500 mr-3" />
                      <span>{ticket.time}</span>
                    </div>

                    <div className="flex items-center">
                      <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                      <div>
                        <p>{ticket.venue}</p>
                        <p className="text-sm text-gray-500">
                          {ticket.location}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div>
                        <p className="text-xs text-gray-500">TICKET #</p>
                        <p className="font-mono">{ticket.ticketNumber}</p>
                      </div>

                      <Button className="bg-[#0A1128] text-white">
                        <QrCode className="h-5 w-5 mr-2" />
                        VIEW QR
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500 mb-4">
                  You don't have any upcoming tickets
                </p>
                <Button className="bg-[#0A1128] text-white">
                  BROWSE EVENTS
                </Button>
              </div>
            )
          ) : pastTickets.length > 0 ? (
            pastTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-lg overflow-hidden shadow-md opacity-75"
              >
                {/* Event Image */}
                <div className="relative h-32">
                  <img
                    src={ticket.image}
                    alt={ticket.eventName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <h3 className="font-bold text-lg">{ticket.eventName}</h3>
                    <p className="text-sm">{ticket.ticketType}</p>
                  </div>
                </div>

                {/* Ticket Details */}
                <div className="p-4 space-y-3">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-gray-500 mr-3" />
                    <span>{ticket.date}</span>
                  </div>

                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-gray-500 mr-3" />
                    <span>{ticket.time}</span>
                  </div>

                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-gray-500 mr-3" />
                    <div>
                      <p>{ticket.venue}</p>
                      <p className="text-sm text-gray-500">{ticket.location}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div>
                      <p className="text-xs text-gray-500">TICKET #</p>
                      <p className="font-mono">{ticket.ticketNumber}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">You don't have any past tickets</p>
            </div>
          )}
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

export default MyTickets;
