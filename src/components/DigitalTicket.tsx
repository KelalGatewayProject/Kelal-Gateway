import React from "react";
import { Button } from "@/components/ui/button";
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
  ticketPrice?: string;
  ticketNumber?: string;
  ticketType?: string;
  eventLocation?: string;
}

const DigitalTicket: React.FC<DigitalTicketProps> = ({
  isOpen = true,
  onClose = () => {},
  eventId = "event-123",
  userId = "user-456",
  ticketId = "ticket-789",
  eventTitle = "Summer Music Festival",
  eventDate = "Aug 15, 2023",
  startTime = "4:00 PM",
  ticketPrice = "30 ETB",
  ticketNumber = "T1234",
  ticketType = "General Admission",
  eventLocation = "Central Park",
}) => {
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
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{eventDate}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{startTime}</p>
              </div>
            </div>

            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{eventLocation}</p>
              </div>
            </div>

            <div className="flex items-center">
              <Ticket className="h-5 w-5 text-gray-500 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Ticket</p>
                <p className="font-medium">{ticketNumber}</p>
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
          <h1 className="text-xl font-bold mb-1">THIS IS YOUR TICKET</h1>
          <p className="text-sm mb-6">
            PLEASE SHOW IT ON YOUR PHONE AT THE VENUE
          </p>

          <div className="mb-4">
            <p className="text-gray-400 text-sm">TICKET NUMBER:</p>
            <p className="text-gray-300">{ticketNumber}</p>
          </div>

          <div className="bg-white p-4 mb-6">
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
              <p className="text-gray-400 text-sm">EVENT NAME</p>
              <p className="font-bold">{eventTitle}</p>
            </div>
          </div>

          <div className="flex justify-between mb-6">
            <div className="text-left">
              <p className="text-gray-400 text-sm">EVENT DATE</p>
              <p>{eventDate}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">START TIME</p>
              <p>{startTime}</p>
            </div>
          </div>

          <div className="border-t border-dashed border-gray-600 pt-4 mt-4 flex justify-between">
            <div className="text-left">
              <p className="text-gray-400 text-sm">TICKET PRICE</p>
              <p className="font-bold">{ticketPrice}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-400 text-sm">TICKET NO:</p>
              <p>{ticketNumber}</p>
            </div>
          </div>

          <Button
            className="mt-6 bg-white text-[#0A1128] hover:bg-gray-200 w-full rounded-full"
            onClick={() => window.history.back()}
          >
            MY TICKETS
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DigitalTicket;
