import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle } from "lucide-react";

interface DirectQRScannerProps {
  staffName?: string;
  staffPosition?: string;
  eventName?: string;
  scanResult?: {
    success: boolean;
    message: string;
    type?: string;
  } | null;
}

const DirectQRScanner: React.FC<DirectQRScannerProps> = ({
  staffName = "John Doe",
  staffPosition = "Bartender",
  eventName = "Summer Music Festival",
  scanResult = null,
}) => {
  const [result, setResult] = useState(scanResult);

  // In a real app, this would be triggered by a deep link or URL scheme
  // For demo purposes, we're simulating a successful scan
  const simulateSuccessfulScan = () => {
    const isTicketScan =
      staffPosition === "Security" || staffPosition === "Hosts";

    setResult({
      success: true,
      message: isTicketScan
        ? "Ticket check-in successful!"
        : "Drink voucher redeemed successfully!",
      type: isTicketScan ? "event_ticket" : "drink_voucher",
    });
  };

  const simulateFailedScan = () => {
    const isTicketScan =
      staffPosition === "Security" || staffPosition === "Hosts";

    setResult({
      success: false,
      message: isTicketScan
        ? "Invalid ticket or already checked in"
        : "Invalid drink voucher or already redeemed",
      type: isTicketScan ? "event_ticket" : "drink_voucher",
    });
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

      {/* Camera Permission Dialog (simulated) */}
      {!result && (
        <div className="p-4 text-center">
          <div className="aspect-square w-full bg-black overflow-hidden rounded-lg relative mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-3/4 h-3/4 border-2 border-green-500 rounded-lg animate-pulse" />
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center">
              <p className="text-white bg-black/50 inline-block px-3 py-1 rounded-full text-sm">
                Scanning...
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Your phone's camera is automatically scanning for a QR code.
            <br />
            <span className="font-bold">{staffName}</span> -{" "}
            <span className="text-blue-600">{staffPosition}</span>
          </p>

          <div className="space-y-2">
            <Button
              onClick={simulateSuccessfulScan}
              className="w-full bg-[#0A1128]"
            >
              Simulate Successful Scan
            </Button>
            <Button
              onClick={simulateFailedScan}
              variant="outline"
              className="w-full"
            >
              Simulate Failed Scan
            </Button>
          </div>
        </div>
      )}

      {/* Scan Result */}
      {result && (
        <div className="p-4 text-center">
          <div className="p-8 border rounded-lg mb-4">
            {result.success ? (
              <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
            ) : (
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            )}
            <p className="text-lg font-medium mb-2">
              {result.success ? "Success!" : "Error"}
            </p>
            <p className="mb-4">{result.message}</p>

            <div className="text-left p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium">Staff: {staffName}</p>
              <p className="text-sm font-medium">Position: {staffPosition}</p>
              <p className="text-sm font-medium">Event: {eventName}</p>
              <p className="text-sm font-medium">
                Scan Type:{" "}
                {result.type === "event_ticket" ? "Ticket" : "Drink Voucher"}
              </p>
              <p className="text-sm font-medium">
                Time: {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Button
              onClick={() => setResult(null)}
              className="w-full bg-[#0A1128]"
            >
              Scan Another
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DirectQRScanner;
