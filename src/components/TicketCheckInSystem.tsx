import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CheckInScanner from "@/components/CheckInScanner";
import DigitalTicket from "@/components/DigitalTicket";
import { EventCheckIn } from "@/types/database.types";

interface TicketCheckInSystemProps {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  startTime: string;
  ticketPrice: string;
}

const TicketCheckInSystem: React.FC<TicketCheckInSystemProps> = ({
  eventId = "event-123",
  eventTitle = "Summer Music Festival",
  eventDate = "Aug 15, 2023",
  startTime = "4:00 PM",
  ticketPrice = "30 ETB",
}) => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isTicketOpen, setIsTicketOpen] = useState(false);
  const [checkIns, setCheckIns] = useState<EventCheckIn[]>([]);
  const [lastScannedTicket, setLastScannedTicket] = useState<string>("");

  // Generate a random ticket number for demo purposes
  const ticketNumber = `T${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`;

  const handleScanSuccess = async (data: string): Promise<boolean> => {
    try {
      // Parse the QR code data
      const ticketData = JSON.parse(data);

      // Check if this is a valid ticket QR code
      if (
        ticketData.type !== "event_ticket" ||
        ticketData.eventId !== eventId
      ) {
        return false;
      }

      // Check if ticket is already checked in
      const isAlreadyCheckedIn = checkIns.some(
        (checkIn) => checkIn.ticket_id === ticketData.ticketId,
      );

      if (isAlreadyCheckedIn) {
        return false;
      }

      // Create a new check-in record
      const newCheckIn: EventCheckIn = {
        id: `checkin-${Date.now()}`,
        event_id: eventId,
        user_id: ticketData.userId,
        ticket_id: ticketData.ticketId,
        check_in_time: new Date().toISOString(),
        ticket_type: "General Admission",
        user_name: "John Doe", // In a real app, you would get this from the user profile
      };

      // Add to local state (in a real app, you would save to database)
      setCheckIns([...checkIns, newCheckIn]);
      setLastScannedTicket(ticketData.ticketId);

      return true;
    } catch (error) {
      console.error("Error processing ticket scan:", error);
      return false;
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Event Check-In System</h2>

      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-medium mb-2">Event Details</h3>
          <p>
            <strong>Event:</strong> {eventTitle}
          </p>
          <p>
            <strong>Date:</strong> {eventDate}
          </p>
          <p>
            <strong>Time:</strong> {startTime}
          </p>
          <p>
            <strong>Check-ins:</strong> {checkIns.length}
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <Button
            onClick={() => setIsScannerOpen(true)}
            className="bg-[#0A1128] text-white"
          >
            Scan Ticket QR Code
          </Button>

          <Button onClick={() => setIsTicketOpen(true)} variant="outline">
            View Sample Ticket
          </Button>
        </div>

        {checkIns.length > 0 && (
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium mb-2">Recent Check-ins</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {checkIns.map((checkIn) => (
                <div
                  key={checkIn.id}
                  className="p-2 bg-gray-50 rounded flex justify-between"
                >
                  <div>
                    <p className="font-medium">{checkIn.user_name}</p>
                    <p className="text-sm text-gray-500">
                      Ticket: {checkIn.ticket_id}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(checkIn.check_in_time).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* QR Code Scanner */}
      <CheckInScanner
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
        eventId={eventId}
      />

      {/* Digital Ticket */}
      <DigitalTicket
        isOpen={isTicketOpen}
        onClose={() => setIsTicketOpen(false)}
        eventTitle={eventTitle}
        eventDate={eventDate}
        startTime={startTime}
        ticketPrice={ticketPrice}
        ticketNumber={ticketNumber}
      />
    </div>
  );
};

export default TicketCheckInSystem;
