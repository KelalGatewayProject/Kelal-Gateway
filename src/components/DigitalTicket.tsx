import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  X,
  Download,
  Calendar,
  Clock,
  MapPin,
  User,
  Ticket,
} from "lucide-react";
import QRCodeGenerator from "./QRCodeGenerator";

interface DigitalTicketProps {
  isOpen?: boolean;
  onClose?: () => void;
  eventId?: string;
  userId?: string;
  ticketId?: string;
  eventTitle?: string;
  eventDate?: string;
  startTime?: string;
  endTime?: string;
  ticketPrice?: string;
  ticketNumber?: string;
  ticketType?: string;
  eventLocation?: string;
  eventOrganizer?: string;
}

const DigitalTicket: React.FC<DigitalTicketProps> = ({
  isOpen = true,
  onClose = () => {},
  eventId = "event-123",
  userId = "user-456",
  ticketId = "ticket-789",
  eventTitle = "SUMMER MUSIC FESTIVAL",
  eventDate = "AUG 15, 2023",
  startTime = "4:00 PM",
  endTime = "10:00 PM",
  ticketPrice = "30 ETB",
  ticketNumber = "T1234",
  ticketType = "GENERAL ADMISSION",
  eventLocation = "MILLENNIUM HALL",
  eventOrganizer = "EVENT CO.",
}) => {
  const navigate = useNavigate();

  // Generate QR code data
  const qrCodeData = JSON.stringify({
    type: "event_ticket",
    eventId,
    userId,
    ticketId,
    ticketType,
    timestamp: new Date().toISOString(),
  });

  // If used as a standalone component (not modal)
  if (isOpen === true && typeof onClose !== "function") {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-lg max-w-md mx-auto">
        <div className="bg-[#0A1128] text-white p-4">
          <h2 className="text-xl font-bold">{eventTitle}</h2>
          <p className="text-sm opacity-90">{ticketType}</p>
        </div>

        <div className="p-6">
          <div className="flex justify-center mb-6">
            <QRCodeGenerator
              value={qrCodeData}
              size={200}
              isTicket={true}
              eventId={eventId}
              userId={userId}
              ticketId={ticketId}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">DATE</p>
                <p className="font-medium">{eventDate}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">TIME</p>
                <p className="font-medium">
                  {startTime} - {endTime}
                </p>
              </div>
            </div>

            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">LOCATION</p>
                <p className="font-medium">{eventLocation}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Ticket className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">REGISTER YOUR QR CODE</p>
                <p className="font-medium">RECEIVE FREE DRINK !!!!</p>
                <p className="font-medium">NOTIFICATIONS ALL NIGHT..</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Modal version
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
      <div className="relative bg-[#0A1128] text-white rounded-lg w-full max-w-sm overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300"
        >
          <X size={24} />
        </button>

        <div className="p-6 text-center">
          <h1 className="text-xl font-bold mb-1 uppercase">
            THIS IS YOUR TICKET
          </h1>
          <p className="text-sm mb-6 uppercase">
            PLEASE SHOW IT AT THE ENTRANCE OF THE VENUE
          </p>

          <div className="mb-4">
            <p className="text-gray-400 text-sm uppercase">
              REGISTER YOUR QR CODE
            </p>
            <p className="text-gray-300 uppercase">RECEIVE FREE DRINK !!!!</p>
            <p className="text-gray-300 uppercase">NOTIFICATIONS ALL NIGHT..</p>
          </div>

          <div className="mb-6">
            <QRCodeGenerator
              value={qrCodeData}
              size={200}
              isTicket={true}
              eventId={eventId}
              userId={userId}
              ticketId={ticketId}
            />
          </div>

          <div className="flex justify-between mb-4">
            <div className="text-left">
              <p className="text-gray-400 text-sm uppercase">EVENT NAME</p>
              <p className="font-bold uppercase">{eventTitle}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm uppercase">EVENT ORGANIZER</p>
              <p className="font-bold uppercase">{eventOrganizer}</p>
            </div>
          </div>

          <div className="flex justify-between mb-4">
            <div className="text-left">
              <p className="text-gray-400 text-sm uppercase">EVENT DATE</p>
              <p className="uppercase">{eventDate}</p>
              <p className="text-gray-400 text-sm mt-2 uppercase">
                EVENT LOCATION
              </p>
              <p className="uppercase">{eventLocation}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm uppercase">START TIME</p>
              <p className="uppercase">{startTime}</p>
              <p className="text-gray-400 text-sm mt-2 uppercase">END TIME</p>
              <p className="uppercase">{endTime}</p>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-600 pt-4 mt-4 flex justify-between">
            <div className="text-left">
              <p className="text-gray-400 text-sm uppercase">TICKET PRICE</p>
              <p className="font-bold uppercase">FREE</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm uppercase">TICKET NO:</p>
              <p className="uppercase">{ticketNumber}</p>
            </div>
          </div>

          <Button
            className="mt-6 bg-white text-[#0A1128] hover:bg-gray-200 w-full rounded-full font-bold uppercase"
            onClick={() => navigate("/mytickets")}
          >
            MY TICKETS
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DigitalTicket;
