import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import QRCodeScanner from "./QRCodeScanner";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface TicketValidationSystemProps {
  eventId: string;
  eventTitle?: string;
  onValidateTicket?: (ticketData: any, isValid: boolean) => void;
}

const TicketValidationSystem: React.FC<TicketValidationSystemProps> = ({
  eventId = "event-123",
  eventTitle = "Summer Music Festival",
  onValidateTicket = () => {},
}) => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scanResult, setScanResult] = useState<{
    data: any;
    status: "valid" | "invalid" | "used" | null;
    message: string;
  }>({ data: null, status: null, message: "" });
  
  // Mock database of scanned tickets (in a real app, this would be a server call)
  const [scannedTickets, setScannedTickets] = useState<Record<string, boolean>>({});
  const [scanHistory, setScanHistory] = useState<Array<{
    ticketId: string;
    timestamp: string;
    status: "valid" | "invalid" | "used";
  }>>([]);

  const handleScanSuccess = (rawData: string) => {
    try {
      const data = JSON.parse(rawData);
      
      // Validate the ticket
      if (data.type !== "event_ticket") {
        setScanResult({
          data,
          status: "invalid",
          message: "Invalid ticket type",
        });
        return;
      }
      
      if (data.eventId !== eventId) {
        setScanResult({
          data,
          status: "invalid",
          message: "This ticket is for a different event",
        });
        return;
      }
      
      // Check if ticket has been used before
      if (scannedTickets[data.ticketId]) {
        setScanResult({
          data,
          status: "used",
          message: "This ticket has already been scanned",
        });
        return;
      }
      
      // Valid ticket
      setScannedTickets(prev => ({
        ...prev,
        [data.ticketId]: true
      }));
      
      setScanResult({
        data,
        status: "valid",
        message: "Ticket is valid",
      });
      
      // Add to scan history
      setScanHistory(prev => [
        {
          ticketId: data.ticketId,
          timestamp: new Date().toISOString(),
          status: "valid"
        },
        ...prev
      ]);
      
      // Call the callback
      onValidateTicket(data, true);
      
    } catch (error) {
      setScanResult({
        data: null,
        status: "invalid",
        message: "Could not parse QR code data",
      });
      onValidateTicket({}, false);
    }
  };

  const resetScan = () => {
    setScanResult({
      data: null,
      status: null,
      message: "",
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4">
      <div className="max-w-md mx-auto">
        <div className="bg-[#0A1128] text-white p-4 rounded-t-lg">
          <h1 className="text-xl font-bold">{eventTitle}</h1>
          <p className="text-sm">Ticket Validation System</p>
        </div>
        
        <div className="bg-white rounded-b-lg shadow-md p-4 mb-4">
          <div className="text-center mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg font-semibold">Ticket Scanner</h2>
                <p className="text-sm text-gray-500">Scan attendee tickets</p>
              </div>
              <div className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                {scanHistory.length} scanned
              </div>
            </div>
            
            {scanResult.status ? (
              <div className="mb-6">
                <div className="flex justify-center mb-4">
                  {scanResult.status === "valid" ? (
                    <div className="bg-green-100 p-6 rounded-full">
                      <CheckCircle className="h-16 w-16 text-green-500" />
                    </div>
                  ) : scanResult.status === "used" ? (
                    <div className="bg-amber-100 p-6 rounded-full">
                      <Clock className="h-16 w-16 text-amber-500" />
                    </div>
                  ) : (
                    <div className="bg-red-100 p-6 rounded-full">
                      <XCircle className="h-16 w-16 text-red-500" />
                    </div>
                  )}
                </div>
                
                <h3 className="text-xl font-bold mb-1">
                  {scanResult.status === "valid"
                    ? "Valid Ticket"
                    : scanResult.status === "used"
                    ? "Already Scanned"
                    : "Invalid Ticket"}
                </h3>
                <p className="text-gray-600 mb-4">{scanResult.message}</p>
                
                {scanResult.data && (
                  <div className="bg-gray-50 p-4 rounded-lg text-left mb-4">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-gray-500">Ticket ID:</p>
                        <p className="font-medium">{scanResult.data.ticketId}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Ticket Type:</p>
                        <p className="font-medium">{scanResult.data.ticketType || "General Admission"}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">User ID:</p>
                        <p className="font-medium">{scanResult.data.userId}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Timestamp:</p>
                        <p className="font-medium">
                          {new Date(scanResult.data.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                
                <Button
                  onClick={resetScan}
                  className="bg-[#0A1128] hover:bg-[#0A1128]/90 w-full"
                >
                  Scan Another Ticket
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setIsScannerOpen(true)}
                className="bg-[#0A1128] hover:bg-[#0A1128]/90 w-full"
              >
                Scan Ticket QR Code
              </Button>
            )}
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
                      <p className="text-sm font-medium truncate">{scan.ticketId}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(scan.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="ml-2 text-xs px-2 py-0.5 rounded-full
                      ${scan.status === "valid" ? "bg-green-100 text-green-800" :
                      scan.status === "used" ? "bg-amber-100 text-amber-800" :
                      "bg-red-100 text-red-800"}"
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