import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import QRCodeScanner from "./QRCodeScanner";

interface TicketValidationSystemProps {
  eventId: string;
  eventName: string;
  validTickets?: string[];
  onValidate?: (result: {
    success: boolean;
    ticketId: string;
    message: string;
  }) => void;
  staffName?: string;
  staffPosition?: string;
}

type ScanStatus = "valid" | "invalid" | "used";

interface ScanHistoryItem {
  ticketId: string;
  status: ScanStatus;
  timestamp: string;
  message: string;
}

const TicketValidationSystem: React.FC<TicketValidationSystemProps> = ({
  eventId,
  eventName,
  validTickets = [],
  onValidate,
  staffName = "John Doe",
  staffPosition = "Security",
}) => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scanHistory, setScanHistory] = useState<ScanHistoryItem[]>([]);
  const [usedTickets, setUsedTickets] = useState<Set<string>>(new Set());

  const handleScanSuccess = async (data: string): Promise<boolean> => {
    try {
      // Parse the QR code data
      const ticketData = JSON.parse(data);

      // Validate the ticket
      let isValid = false;
      let status: ScanStatus = "invalid";
      let message = "Invalid ticket";

      // Check if this is a valid ticket format
      if (ticketData.type === "event_ticket") {
        // Check if the ticket is for this event
        if (ticketData.eventId === eventId) {
          const ticketId = ticketData.ticketId || "";

          // Check if the ticket has already been used
          if (usedTickets.has(ticketId)) {
            status = "used";
            message = "Ticket already checked in";
          }
          // If validTickets array is provided, check if the ticket is in the list
          else if (validTickets.length > 0) {
            if (validTickets.includes(ticketId)) {
              isValid = true;
              status = "valid";
              message = "Valid ticket";
              // Mark the ticket as used
              setUsedTickets((prev) => new Set([...prev, ticketId]));
            } else {
              message = "Ticket not found in the system";
            }
          } else {
            // If no validTickets array is provided, assume it's valid
            isValid = true;
            status = "valid";
            message = "Valid ticket";
            // Mark the ticket as used
            if (ticketId) {
              setUsedTickets((prev) => new Set([...prev, ticketId]));
            }
          }
        } else {
          message = "Ticket is for a different event";
        }
      }

      // Add to scan history
      const historyItem: ScanHistoryItem = {
        ticketId: ticketData.ticketId || "Unknown",
        status,
        timestamp: new Date().toISOString(),
        message,
      };

      setScanHistory((prev) => [historyItem, ...prev]);

      // Call the onValidate callback if provided
      if (onValidate) {
        onValidate({
          success: isValid,
          ticketId: ticketData.ticketId || "Unknown",
          message,
        });
      }

      return true; // Return true to close the scanner
    } catch (error) {
      console.error("Error processing scan:", error);

      // Add to scan history
      const historyItem: ScanHistoryItem = {
        ticketId: "Unknown",
        status: "invalid",
        timestamp: new Date().toISOString(),
        message: "Invalid QR code format",
      };

      setScanHistory((prev) => [historyItem, ...prev]);

      if (onValidate) {
        onValidate({
          success: false,
          ticketId: "Unknown",
          message: "Invalid QR code format",
        });
      }

      return true; // Return true to close the scanner
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#0A1128] text-white p-4">
        <h1 className="text-xl font-bold">{eventName}</h1>
        <p className="text-sm">
          {staffName} - {staffPosition}
        </p>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 p-3 rounded-lg text-center">
              <p className="text-xl font-bold">{scanHistory.length}</p>
              <p className="text-xs text-gray-500">Total Scans</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg text-center">
              <p className="text-xl font-bold">
                {scanHistory.filter((scan) => scan.status === "valid").length}
              </p>
              <p className="text-xs text-gray-500">Valid</p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg text-center">
              <p className="text-xl font-bold">
                {scanHistory.filter((scan) => scan.status === "invalid").length}
              </p>
              <p className="text-xs text-gray-500">Invalid</p>
            </div>
          </div>

          {/* Scan Button */}
          <div>
            <Button
              onClick={() => setIsScannerOpen(true)}
              className="w-full bg-[#0A1128] py-6 text-lg font-bold rounded-lg shadow-md hover:bg-[#0A1128]/90 w-full"
            >
              Scan Ticket QR Code
            </Button>
          </div>

          {scanHistory.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">Recent Scans</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {scanHistory.map((scan, index) => (
                  <div
                    key={index}
                    className="flex items-center p-2 bg-gray-50 rounded-lg"
                  >
                    {scan.status === "valid" ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    ) : scan.status === "used" ? (
                      <Clock className="h-5 w-5 text-amber-500 mr-2" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mr-2" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium truncate">
                        {scan.ticketId}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(scan.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <div
                      className={`ml-2 text-xs px-2 py-0.5 rounded-full ${scan.status === "valid" ? "bg-green-100 text-green-800" : scan.status === "used" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"}`}
                    >
                      {scan.status === "valid"
                        ? "Valid"
                        : scan.status === "used"
                          ? "Used"
                          : "Invalid"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* QR Code Scanner Modal */}
        <QRCodeScanner
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onScanSuccess={handleScanSuccess}
          title="Scan Ticket"
          description="Position the QR code within the frame to validate the ticket"
        />
      </div>
    </div>
  );
};

export default TicketValidationSystem;
