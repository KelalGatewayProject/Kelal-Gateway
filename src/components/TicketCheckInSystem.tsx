import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import CheckInScanner from "@/components/CheckInScanner";
import DigitalTicket from "@/components/DigitalTicket";
import { EventCheckIn } from "@/types/database.types";
import QRCodeScanner from "./QRCodeScanner";
import {
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Users,
  TicketIcon,
} from "lucide-react";

interface TicketCheckInSystemProps {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  startTime: string;
  ticketPrice: string;
}

interface Attendee {
  id: string;
  name: string;
  ticketId: string;
  ticketType: string;
  checkedIn: boolean;
  checkInTime?: string;
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
  const [searchQuery, setSearchQuery] = useState("");
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    attendee?: Attendee;
  } | null>(null);

  // Generate a random ticket number for demo purposes
  const ticketNumber = `T${Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0")}`;

  // Generate some sample attendees
  const [attendees, setAttendees] = useState<Attendee[]>(() => {
    const ticketTypes = [
      "VIP",
      "General Admission",
      "Early Bird",
      "Backstage Pass",
    ];
    const names = [
      "John Smith",
      "Emma Johnson",
      "Michael Brown",
      "Olivia Davis",
      "William Wilson",
      "Sophia Martinez",
      "James Anderson",
      "Ava Taylor",
      "Benjamin Thomas",
      "Mia Hernandez",
      "Daniel White",
      "Charlotte Lewis",
    ];

    return names.map((name, index) => ({
      id: `user-${index + 100}`,
      name,
      ticketId: `ticket-${index + 1000}`,
      ticketType: ticketTypes[index % ticketTypes.length],
      checkedIn: index < 3, // First 3 are already checked in
      checkInTime:
        index < 3
          ? new Date(Date.now() - Math.random() * 3600000).toISOString()
          : undefined,
    }));
  });

  const stats = {
    total: attendees.length,
    checkedIn: attendees.filter((a) => a.checkedIn).length,
    remaining: attendees.filter((a) => !a.checkedIn).length,
    percentage: Math.round(
      (attendees.filter((a) => a.checkedIn).length / attendees.length) * 100,
    ),
  };

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

  const handleManualCheckIn = (attendeeId: string) => {
    const updatedAttendees = attendees.map((a) => {
      if (a.id === attendeeId && !a.checkedIn) {
        return {
          ...a,
          checkedIn: true,
          checkInTime: new Date().toISOString(),
        };
      }
      return a;
    });

    setAttendees(updatedAttendees);

    const checkedInAttendee = updatedAttendees.find((a) => a.id === attendeeId);

    setScanResult({
      success: true,
      message: "Attendee manually checked in",
      attendee: checkedInAttendee,
    });
  };

  const filteredAttendees = attendees.filter((attendee) => {
    const query = searchQuery.toLowerCase();
    return (
      attendee.name.toLowerCase().includes(query) ||
      attendee.ticketId.toLowerCase().includes(query) ||
      attendee.ticketType.toLowerCase().includes(query)
    );
  });

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
            <strong>Check-ins:</strong> {stats.checkedIn}/{stats.total}
          </p>

          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: `${stats.percentage}%` }}
              ></div>
            </div>
          </div>
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

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search attendees..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A1128]/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredAttendees.length > 0 ? (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {filteredAttendees.map((attendee) => (
              <div
                key={attendee.id}
                className="p-3 border rounded-lg flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center">
                    <p className="font-medium">{attendee.name}</p>
                    {attendee.checkedIn && (
                      <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Checked In
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">
                    {attendee.ticketType} • {attendee.ticketId}
                  </p>
                  {attendee.checkInTime && (
                    <p className="text-xs text-gray-400">
                      {new Date(attendee.checkInTime).toLocaleTimeString()}
                    </p>
                  )}
                </div>

                {!attendee.checkedIn && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-2"
                    onClick={() => handleManualCheckIn(attendee.id)}
                  >
                    Check In
                  </Button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">
            No attendees found matching your search
          </div>
        )}

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
      <QRCodeScanner
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
        title="Scan Ticket"
        description="Position the QR code within the frame to check in the attendee"
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
