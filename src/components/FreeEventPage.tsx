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
  Info,
  Settings,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import TicketDrawer from "@/components/TicketDrawer";
import DigitalTicket from "@/components/DigitalTicket";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

interface Performer {
  name: string;
  image: string;
}

interface Sponsor {
  name: string;
  image: string;
}

interface EventImage {
  url: string;
  alt: string;
}

interface FreeEventPageProps {
  title: string;
  organizer: string;
  images: EventImage[];
  description: string;
  goingCount: number;
  interestedCount: number;
  performers?: Performer[];
  sponsors?: Sponsor[];
  eventDate: string;
  startTime: string;
  endTime: string;
  contactPhone?: string;
  venue: string;
  mapLocation: string | { lat: number; lng: number };
  googleMapsApiKey?: string;
  onGoing?: () => void;
  onInterested?: () => void;
  onShare?: () => void;
  isGoing?: boolean;
  isInterested?: boolean;
}

const FreeEventPage: React.FC<FreeEventPageProps> = ({
  title,
  organizer,
  images,
  description,
  goingCount,
  interestedCount,
  performers = [],
  sponsors = [],
  eventDate,
  startTime,
  endTime,
  contactPhone,
  venue,
  mapLocation,
  googleMapsApiKey,
  onGoing = () => {},
  onInterested = () => {},
  onShare = () => {},
  isGoing = false,
  isInterested = false,
}) => {
  const [isGoingState, setIsGoingState] = useState(isGoing);
  const [isInterestedState, setIsInterestedState] = useState(isInterested);
  const [showTicketDrawer, setShowTicketDrawer] = useState(false);
  const [showDigitalTicket, setShowDigitalTicket] = useState(false);
  const [ticketNumber, setTicketNumber] = useState("");
  const [mapCoordinates, setMapCoordinates] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Process map location data
  useEffect(() => {
    if (
      typeof mapLocation === "object" &&
      "lat" in mapLocation &&
      "lng" in mapLocation
    ) {
      setMapCoordinates(mapLocation);
    } else if (typeof mapLocation === "string" && mapLocation.includes(",")) {
      // Try to parse string coordinates "lat,lng"
      try {
        const [lat, lng] = mapLocation
          .split(",")
          .map((coord) => parseFloat(coord.trim()));
        if (!isNaN(lat) && !isNaN(lng)) {
          setMapCoordinates({ lat, lng });
        }
      } catch (error) {
        console.error("Failed to parse map coordinates:", error);
      }
    }
  }, [mapLocation]);

  const handleGoing = () => {
    const newIsGoing = !isGoingState;
    setIsGoingState(newIsGoing);
    if (isInterestedState && !isGoingState) {
      setIsInterestedState(false);
    }
    onGoing();
  };

  const handleInterested = () => {
    const newIsInterested = !isInterestedState;
    setIsInterestedState(newIsInterested);
    if (isGoingState && !isInterestedState) {
      setIsGoingState(false);
    }
    onInterested();
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
            src={images[0]?.url}
            alt={images[0]?.alt}
            className="w-full h-[200px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-30"></div>
        </div>

        {/* Event Title and Organizer */}
        <div className="p-4 border-b">
          <h1 className="text-lg font-bold" style={{ fontFamily: "Roboto" }}>
            {title}
          </h1>
          <p className="text-base font-bold" style={{ fontFamily: "Roboto" }}>
            Event by: {organizer}
          </p>
        </div>

        {/* Event Description */}
        <div className="p-4 border-b">
          <p className="text-sm">{description}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between p-4 border-b">
          <div className="flex space-x-2">
            <Button
              variant={isGoingState ? "default" : "outline"}
              className={`rounded-full ${isGoingState ? "bg-[#0A1128] text-white" : ""}`}
              onClick={handleGoing}
            >
              <Check className="h-4 w-4 mr-1" /> GOING
            </Button>
            <Button
              variant={isInterestedState ? "default" : "outline"}
              className={`rounded-full ${isInterestedState ? "bg-[#0A1128] text-white" : ""}`}
              onClick={handleInterested}
            >
              <Star className="h-4 w-4 mr-1" /> INTERESTED
            </Button>
          </div>
          <Button variant="outline" className="rounded-full" onClick={onShare}>
            <Share className="h-4 w-4 mr-1" /> SHARE
          </Button>
        </div>

        {/* Attendance Counts */}
        <div className="flex items-center p-4 border-b text-sm">
          <div className="flex items-center mr-4">
            <div className="bg-gray-200 rounded-full p-1 mr-2">
              <span className="text-lg">👥</span>
            </div>
            <span>{goingCount} going</span>
          </div>
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full p-1 mr-2">
              <span className="text-lg">👀</span>
            </div>
            <span>{interestedCount} Interested</span>
          </div>
          {/* Settings icon removed to match LinkUpBazaarEvent */}
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
        {performers.length > 0 && (
          <div className="p-4 border-b">
            <h3 className="text-sm font-bold mb-2">DJ / PERFORMER LINEUPS</h3>
            <div className="flex space-x-4 overflow-x-auto">
              {performers.map((performer, index) => (
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
        )}

        {/* Sponsors Section */}
        {sponsors.length > 0 && (
          <div className="p-4 border-b">
            <h3 className="text-sm font-bold mb-2">SPONSORS</h3>
            <div className="flex space-x-4 overflow-x-auto">
              {sponsors.map((sponsor, index) => (
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
        )}

        {/* Event Information */}
        <div className="p-4 border-b">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-500">EVENT DATE</p>
              <p className="text-base font-bold">{eventDate}</p>
              <p className="text-xs text-gray-500 mt-2">MORE INFO</p>
              {contactPhone && (
                <div className="flex items-center mt-1">
                  <Phone className="h-4 w-4 mr-1" />
                  <p className="text-sm">{contactPhone}</p>
                </div>
              )}
            </div>
            <div>
              <p className="text-xs text-gray-500">START TIME</p>
              <p className="text-base">{startTime}</p>
              <p className="text-xs text-gray-500 mt-2">END TIME</p>
              <p className="text-base">{endTime}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <p className="text-sm font-bold uppercase">{venue}</p>
            </div>
          </div>
        </div>

        {/* Google Map */}
        <div className="p-4 border-b">
          {googleMapsApiKey ? (
            <div className="w-full h-48 rounded-md overflow-hidden">
              <LoadScript
                googleMapsApiKey={googleMapsApiKey}
                onLoad={() => setIsMapLoaded(true)}
              >
                <GoogleMap
                  mapContainerStyle={{
                    width: "100%",
                    height: "100%",
                  }}
                  center={mapCoordinates || { lat: 9.0222, lng: 38.7468 }} // Default to Addis Ababa if no coordinates
                  zoom={15}
                >
                  {mapCoordinates && <Marker position={mapCoordinates} />}
                </GoogleMap>
              </LoadScript>
            </div>
          ) : (
            typeof mapLocation === "string" && (
              <div className="relative w-full h-48 bg-gray-100 rounded-md flex items-center justify-center">
                <MapPin className="h-8 w-8 text-gray-400" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-sm text-gray-500">
                    Map will be available soon
                  </p>
                </div>
              </div>
            )
          )}
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

        {/* Bottom Navigation removed to match LinkUpBazaarEvent */}
      </div>

      {/* Ticket Drawer */}
      <TicketDrawer
        isOpen={showTicketDrawer}
        onClose={() => setShowTicketDrawer(false)}
        onViewTicket={handleViewTicket}
        eventTitle={title}
        eventDate={eventDate}
        eventTime={startTime}
        ticketPrice="FREE"
        ticketNumber={ticketNumber}
      />

      {/* Digital Ticket Modal */}
      <DigitalTicket
        isOpen={showDigitalTicket}
        onClose={() => setShowDigitalTicket(false)}
        eventTitle={title}
        eventDate={eventDate}
        startTime={startTime}
        ticketPrice="FREE"
        ticketNumber={ticketNumber}
      />
    </PageLayout>
  );
};

export default FreeEventPage;
