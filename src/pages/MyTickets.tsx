import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QrCode, Calendar, MapPin, Clock } from "lucide-react";
import PageLayout from "@/components/PageLayout";

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
      ticketType: "FREE",
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
      ticketType: "FREE",
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
      ticketType: "FREE",
      ticketNumber: "T-54321-987",
      image:
        "https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=300&q=80",
    },
  ];

  return (
    <PageLayout>
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
                <Link
                  to={`/event/${ticket.id}`}
                  key={ticket.id}
                  className="no-underline"
                >
                  <div className="bg-white rounded-lg overflow-hidden shadow-md">
                    {/* Event Image */}
                    <div className="relative h-32">
                      <img
                        src={ticket.image}
                        alt={ticket.eventName}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <h3 className="font-bold text-lg">
                          {ticket.eventName}
                        </h3>
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
                </Link>
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
              <Link
                to={`/event/${ticket.id}`}
                key={ticket.id}
                className="no-underline"
              >
                <div className="bg-white rounded-lg overflow-hidden shadow-md opacity-75">
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

                    <div className="mt-4">
                      <div>
                        <p className="text-xs text-gray-500">TICKET #</p>
                        <p className="font-mono">{ticket.ticketNumber}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">You don't have any past tickets</p>
            </div>
          )}
        </div>
      </main>
    </PageLayout>
  );
};

export default MyTickets;
