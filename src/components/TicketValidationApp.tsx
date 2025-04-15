import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QRCodeScanner from "./QRCodeScanner";
import TicketValidationSystem from "./TicketValidationSystem";
import StaffScannerInterface from "./StaffScannerInterface";
import TicketCheckInSystem from "./TicketCheckInSystem";

interface TicketValidationAppProps {
  eventId?: string;
  eventTitle?: string;
  staffName?: string;
  staffPosition?: string;
}

const TicketValidationApp: React.FC<TicketValidationAppProps> = ({
  eventId = "event-123",
  eventTitle = "Summer Music Festival",
  staffName = "John Doe",
  staffPosition = "Security",
}) => {
  const [activeView, setActiveView] = useState<"scanner" | "validation">(
    "validation",
  );
  const [activeMode, setActiveMode] = useState<"staff" | "organizer" | "setup">(
    "setup",
  );
  const [stats, setStats] = useState({
    totalTickets: 250,
    scannedTickets: 87,
    validTickets: 82,
    invalidTickets: 5,
  });

  if (activeMode === "staff") {
    return (
      <StaffScannerInterface
        eventId={eventId}
        eventTitle={eventTitle}
        staffName={staffName}
        staffRole={staffPosition}
      />
    );
  }

  if (activeMode === "organizer") {
    return (
      <TicketCheckInSystem
        eventId={eventId}
        eventTitle={eventTitle}
        eventDate="Aug 15, 2023"
        startTime="4:00 PM"
        ticketPrice="30 ETB"
      />
    );
  }

  // Setup mode
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-[#0A1128] text-white p-4">
        <h1 className="text-xl font-bold">{eventTitle}</h1>
        <p className="text-sm">Ticket Validation App</p>
      </div>

      <div className="p-4 max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-semibold mb-4">Select Mode</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button
              variant={activeMode === "staff" ? "default" : "outline"}
              className={activeMode === "staff" ? "bg-[#0A1128]" : ""}
              onClick={() => setActiveMode("staff")}
            >
              Staff Scanner
            </Button>
            <Button
              variant={activeMode === "organizer" ? "default" : "outline"}
              className={activeMode === "organizer" ? "bg-[#0A1128]" : ""}
              onClick={() => setActiveMode("organizer")}
            >
              Organizer View
            </Button>
          </div>

          <div className="bg-blue-50 p-3 rounded-lg mb-4">
            <h3 className="font-medium text-blue-800 mb-1">Mode Description</h3>
            <p className="text-sm text-blue-700">
              {activeMode === "staff"
                ? "Staff Scanner: Simple interface for event staff to scan and validate tickets at entry points."
                : "Organizer View: Comprehensive dashboard for event organizers to manage attendee check-ins and view statistics."}
            </p>
          </div>

          <Button
            onClick={() => setActiveMode(activeMode)}
            className="w-full bg-[#0A1128]"
          >
            Launch {activeMode === "staff" ? "Staff Scanner" : "Organizer View"}
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-semibold mb-4">Event Statistics</h2>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <p className="text-xl font-bold">{stats.totalTickets}</p>
              <p className="text-xs text-gray-500">Total Tickets</p>
            </div>

            <div className="bg-green-50 p-3 rounded-lg text-center">
              <p className="text-xl font-bold">{stats.validTickets}</p>
              <p className="text-xs text-gray-500">Valid Entries</p>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Check-in Progress</span>
              <span>
                {Math.round((stats.scannedTickets / stats.totalTickets) * 100)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{
                  width: `${(stats.scannedTickets / stats.totalTickets) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold mb-4">Quick Test</h2>
          <p className="text-sm text-gray-500 mb-4">
            Test the ticket validation system with a sample QR code
          </p>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() =>
                (window.location.href =
                  "/tempobook/storyboards/QRCodeTicketExample")
              }
            >
              Generate Sample Ticket
            </Button>
            <Button
              className="flex-1 bg-[#0A1128]"
              onClick={() => setActiveMode("staff")}
            >
              Test Scanner
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketValidationApp;
