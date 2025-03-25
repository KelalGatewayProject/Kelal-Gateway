import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import QRCodeScanner from "./QRCodeScanner";

interface QRScannerWithValidationProps {
  onValidTicket?: (data: any) => void;
  onInvalidTicket?: (data: any, reason: string) => void;
  validationRules?: {
    eventId?: string;
    ticketType?: string[];
    validateExpiration?: boolean;
  };
  onScanComplete?: (result: {
    success: boolean;
    message: string;
    ticketId?: string;
    ticketType?: string;
  }) => void;
  validTickets?: string[];
  isDemo?: boolean;
  staffName?: string;
  staffPosition?: string;
  eventName?: string;
}

const QRScannerWithValidation: React.FC<QRScannerWithValidationProps> = ({
  onValidTicket = () => {},
  onInvalidTicket = () => {},
  validationRules = {},
  onScanComplete,
  validTickets = [],
  isDemo = false,
  staffName = "John Doe",
  staffPosition = "Security",
  eventName = "Summer Music Festival",
}) => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scanResult, setScanResult] = useState<{
    isValid: boolean;
    data: any;
    message: string;
  } | null>(null);

  const handleScanSuccess = (rawData: string) => {
    try {
      const data = JSON.parse(rawData);
      let isValid = true;
      let invalidReason = "";

      // Validate ticket type
      if (data.type !== "event_ticket") {
        isValid = false;
        invalidReason = "Invalid ticket format";
      }

      // Validate event ID if specified
      if (
        isValid &&
        validationRules.eventId &&
        data.eventId !== validationRules.eventId
      ) {
        isValid = false;
        invalidReason = "Ticket is for a different event";
      }

      // Validate ticket type if specified
      if (
        isValid &&
        validationRules.ticketType &&
        validationRules.ticketType.length > 0 &&
        data.ticketType &&
        !validationRules.ticketType.includes(data.ticketType)
      ) {
        isValid = false;
        invalidReason = `Invalid ticket type: ${data.ticketType}`;
      }

      // Validate expiration if needed
      if (isValid && validationRules.validateExpiration && data.expiresAt) {
        const expirationDate = new Date(data.expiresAt);
        if (expirationDate < new Date()) {
          isValid = false;
          invalidReason = "Ticket has expired";
        }
      }

      // Check if ticket is in valid tickets list (if provided)
      if (isValid && validTickets.length > 0) {
        const ticketId = data.ticketId || "";
        if (!validTickets.includes(ticketId)) {
          isValid = false;
          invalidReason = "Ticket not found in the system";
        }
      }

      setScanResult({
        isValid,
        data,
        message: isValid ? "Valid ticket" : invalidReason,
      });

      // Call appropriate callback
      if (isValid) {
        onValidTicket(data);
      } else {
        onInvalidTicket(data, invalidReason);
      }

      // Call onScanComplete if provided
      if (onScanComplete) {
        onScanComplete({
          success: isValid,
          message: isValid ? "Valid ticket" : invalidReason,
          ticketId: data.ticketId,
          ticketType: data.ticketType,
        });
      }
    } catch (error) {
      setScanResult({
        isValid: false,
        data: null,
        message: "Could not parse QR code data",
      });
      onInvalidTicket(null, "Invalid QR code format");

      if (onScanComplete) {
        onScanComplete({
          success: false,
          message: "Could not parse QR code data",
        });
      }
    }
  };

  const resetScan = () => {
    setScanResult(null);
  };

  const handleSimulateSuccess = () => {
    if (validTickets.length > 0) {
      const validTicketId =
        validTickets[Math.floor(Math.random() * validTickets.length)];
      handleScanSuccess(
        JSON.stringify({
          type: "event_ticket",
          eventId: validationRules.eventId || "event-123",
          userId: `user-${Math.floor(Math.random() * 1000)}`,
          ticketId: validTicketId,
          ticketType: "General Admission",
          timestamp: new Date().toISOString(),
        }),
      );
    } else {
      handleScanSuccess(
        JSON.stringify({
          type: "event_ticket",
          eventId: validationRules.eventId || "event-123",
          userId: `user-${Math.floor(Math.random() * 1000)}`,
          ticketId: `ticket-${Date.now()}`,
          ticketType: "General Admission",
          timestamp: new Date().toISOString(),
        }),
      );
    }
  };

  const handleSimulateFailure = () => {
    handleScanSuccess(
      JSON.stringify({
        type: "event_ticket",
        eventId: "wrong-event-id",
        userId: `user-${Math.floor(Math.random() * 1000)}`,
        ticketId: "INVALID-TICKET",
        timestamp: new Date().toISOString(),
      }),
    );
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Status Bar - Simulating mobile device */}
      <div className="bg-black text-white p-2 text-xs flex justify-between items-center">
        <span>9:41 AM</span>
        <div className="flex space-x-1">
          <span>5G</span>
          <span>100%</span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Ticket Scanner</h2>
          <p className="text-sm text-gray-600">
            <span className="font-bold">{staffName}</span> -{" "}
            <span className="text-blue-600">{staffPosition}</span>
          </p>
          <p className="text-sm text-gray-600">Event: {eventName}</p>
        </div>

        {scanResult ? (
          <div className="space-y-4">
            <div className="p-8 border rounded-lg">
              {scanResult.isValid ? (
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              )}
              <p className="text-lg font-medium text-center mb-2">
                {scanResult.isValid ? "Success!" : "Error"}
              </p>
              <p className="text-center mb-4">{scanResult.message}</p>

              {scanResult.data && (
                <div className="text-left p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium">Staff: {staffName}</p>
                  <p className="text-sm font-medium">
                    Position: {staffPosition}
                  </p>
                  <p className="text-sm font-medium">Event: {eventName}</p>
                  {scanResult.data.ticketId && (
                    <p className="text-sm font-medium">
                      Ticket ID: {scanResult.data.ticketId}
                    </p>
                  )}
                  {scanResult.data.ticketType && (
                    <p className="text-sm font-medium">
                      Type: {scanResult.data.ticketType}
                    </p>
                  )}
                  <p className="text-sm font-medium">
                    Time: {new Date().toLocaleTimeString()}
                  </p>
                </div>
              )}
            </div>

            <Button onClick={resetScan} className="w-full bg-[#0A1128]">
              Scan Another
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="aspect-square w-full bg-gray-100 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <AlertTriangle className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Camera inactive</p>
              </div>
            </div>

            <Button
              onClick={() => setIsScannerOpen(true)}
              className="w-full bg-[#0A1128]"
            >
              Start Scanning
            </Button>

            {isDemo && (
              <div className="space-y-2 pt-2">
                <p className="text-sm text-gray-500 text-center">
                  Demo Options:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    onClick={handleSimulateSuccess}
                    variant="outline"
                    className="border-green-500 text-green-600"
                  >
                    Simulate Valid Scan
                  </Button>
                  <Button
                    onClick={handleSimulateFailure}
                    variant="outline"
                    className="border-red-500 text-red-600"
                  >
                    Simulate Invalid Scan
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <QRCodeScanner
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
        title="Scan Ticket QR Code"
        description="Position the QR code within the frame to validate the ticket"
      />
    </div>
  );
};

export default QRScannerWithValidation;
