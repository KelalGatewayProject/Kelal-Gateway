import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Share,
  MapPin,
  Phone,
  Calendar,
  Clock,
  Check,
  Star,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import TicketDrawer from "@/components/TicketDrawer";
import DigitalTicket from "@/components/DigitalTicket";

const LinkUpBazaarEvent: React.FC = () => {
  const [isGoing, setIsGoing] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  const [showTicketDrawer, setShowTicketDrawer] = useState(false);
  const [showDigitalTicket, setShowDigitalTicket] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");

  // Sample data for the LinkUp Bazaar event
  const eventData = {
    id: "linkup-bazaar",
    title: "LINKUP BAZAAR & FAMILY FEST",
    organizer: "LINKUP ADDIS",
    images: [
      {
        url: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=800&q=80",
        alt: "LinkUp Bazaar Event",
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

  const handleGoing = () => {
    setIsGoing(!isGoing);
    if (isInterested && !isGoing) {
      setIsInterested(false);
    }
  };

  const handleInterested = () => {
    setIsInterested(!isInterested);
    if (isGoing && !isInterested) {
      setIsGoing(false);
    }
  };

  const handleShare = () => {
    // Share functionality would go here
    alert("Share functionality would be implemented here");
  };

  // Generate a random ticket number when component mounts
  useEffect(() => {
    setTicketNumber(Math.floor(10000000 + Math.random() * 90000000).toString());
  }, []);

  const handleViewTicket = () => {
    setShowTicketDrawer(false);
    setShowDigitalTicket(true);
  };

  return (
    <PageLayout>
      <div className="flex flex-col min-h-screen bg-white">
        {/* Event Banner Image */}
        <div className="relative w-full">
          <img
            src={eventData.images[0].url}
            alt={eventData.images[0].alt}
            className="w-full h-[200px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"></div>
        </div>

        {/* Event Title and Organizer */}
        <div className="p-4 border-b">
          <h1 className="text-lg font-bold" style={{ fontFamily: "Roboto" }}>
            {eventData.title}
          </h1>
          <p className="text-base font-bold" style={{ fontFamily: "Roboto" }}>
            Event by: {eventData.organizer}
          </p>
        </div>

        {/* Event Description */}
        <div className="p-4 border-b">
          <p className="text-sm">{eventData.description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between p-4 border-b">
          <div className="flex space-x-2">
            <Button
              variant={isGoing ? "default" : "outline"}
              className={`rounded-full ${isGoing ? "bg-[#0A1128] text-white" : ""}`}
              onClick={handleGoing}
            >
              <Check className="h-4 w-4 mr-1" /> GOING
            </Button>
            <Button
              variant={isInterested ? "default" : "outline"}
              className={`rounded-full ${isInterested ? "bg-[#0A1128] text-white" : ""}`}
              onClick={handleInterested}
            >
              <Star className="h-4 w-4 mr-1" /> INTERESTED
            </Button>
          </div>
          <Button
            variant="outline"
            className="rounded-full"
            onClick={handleShare}
          >
            <Share className="h-4 w-4 mr-1" /> SHARE
          </Button>
        </div>

        {/* Attendance Counts */}
        <div className="flex items-center p-4 border-b text-sm">
          <div className="flex items-center mr-4">
            <div className="bg-gray-200 rounded-full p-1 mr-2">
              <span className="text-lg">👥</span>
            </div>
            <span>{eventData.goingCount} going</span>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full p-1 mr-2">
              <span className="text-lg">👀</span>
            </div>
            <span>{eventData.interestedCount} Interested</span>
          </div>
        </div>

        {/* Ticket Information */}
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold">GENERAL</h3>
              <h3 className="text-sm font-bold">ADMISSION</h3>
              <p className="text-2xl font-bold">FREE</p>
            </div>
            <Button
              className="bg-[#0A1128] text-white rounded-full"
              onClick={() => setShowTicketDrawer(true)}
            >
              FREE TICKET
            </Button>
          </div>
        </div>

        {/* Performers Section */}
        <div className="p-4 border-b">
          <h3 className="text-sm font-bold mb-2">DJ / PERFORMER LINEUPS</h3>
          <div className="flex space-x-4 overflow-x-auto">
            {eventData.performers.map((performer, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={performer.image}
                  alt={performer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <p className="text-xs mt-1 text-center">{performer.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsors Section */}
        <div className="p-4 border-b">
          <h3 className="text-sm font-bold mb-2">SPONSORS</h3>
          <div className="flex space-x-4 overflow-x-auto">
            {eventData.sponsors.map((sponsor, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={sponsor.image}
                  alt={sponsor.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <p className="text-xs mt-1 text-center">{sponsor.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Event Information */}
        <div className="p-4 border-b">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">EVENT DATE</p>
              <p className="text-base font-bold">{eventData.eventDate}</p>
              <p className="text-xs text-gray-500 mt-2">MORE INFO</p>
              <div className="flex items-center mt-1">
                <Phone className="h-4 w-4 mr-1" />
                <p className="text-sm">{eventData.contactPhone}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-500">START TIME</p>
              <p className="text-base">{eventData.startTime}</p>
              <p className="text-xs text-gray-500 mt-2">END TIME</p>
              <p className="text-base">{eventData.endTime}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <p className="text-sm font-bold uppercase">{eventData.venue}</p>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="p-4 border-b">
          <img
            src={eventData.mapLocation}
            alt="Event Location Map"
            className="w-full h-32 object-cover rounded-md"
          />
        </div>

        {/* Safety Guidelines */}
        <div className="p-4 border-b">
          <h3 className="text-sm font-bold text-center mb-2">
            COVID-19 SAFETY GUIDELINES
          </h3>
          <h3 className="text-sm font-bold text-center mb-2">
            FOR NIGHTLIFE VENUES
          </h3>
          <ol className="list-decimal pl-6 text-sm space-y-1">
            <li>Avoid touching your eyes, nose, and mouth</li>
            <li>Avoid sharing drinks and hookahs</li>
            <li>Cover your mouth when you cough or sneeze</li>
            <li>Wash your hand soften with soap and water</li>
          </ol>
        </div>
      </div>

      {/* Ticket Drawer */}
      <TicketDrawer
        isOpen={showTicketDrawer}
        onClose={() => setShowTicketDrawer(false)}
        onViewTicket={handleViewTicket}
        eventTitle={eventData.title}
        eventDate={eventData.eventDate}
        eventTime={eventData.startTime}
        ticketPrice="FREE"
        ticketNumber={ticketNumber}
      />

      {/* Digital Ticket Modal */}
      <DigitalTicket
        isOpen={showDigitalTicket}
        onClose={() => setShowDigitalTicket(false)}
        eventTitle={eventData.title}
        eventDate={eventData.eventDate}
        startTime={eventData.startTime}
        ticketPrice="FREE"
        ticketNumber={ticketNumber}
      />
    </PageLayout>
  );
};

export default LinkUpBazaarEvent;
