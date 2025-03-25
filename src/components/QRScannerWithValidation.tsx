import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, AlertCircle, Camera } from "lucide-react";
import QRCodeScanner from "./QRCodeScanner";

interface QRScannerWithValidationProps {
  staffName?: string;
  staffPosition?: string;
  eventName?: string;
  onScanComplete?: (result: {
    success: boolean;
    message: string;
    ticketId?: string;
    ticketType?: string;
  }) => void;
  validTickets?: string[];
  isDemo?: boolean;
}

const QRScannerWithValidation: React.FC<QRScannerWithValidationProps> = ({
  staffName = "John Doe",
  staffPosition = "Security",
  eventName = "Summer Music Festival",
  onScanComplete,
  validTickets = ["TICKET-123", "TICKET-456", "TICKET-789"],
  isDemo = true,
}) => {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    ticketId?: string;
    ticketType?: string;
  } | null>(null);
  const [cameraPermission, setCameraPermission] = useState<boolean | null>(
    null,
  );

  // Check for camera permission
  useEffect(() => {
    if (!isDemo) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => setCameraPermission(true))
        .catch(() => setCameraPermission(false));
    } else {
      // In demo mode, simulate camera permission
      setCameraPermission(true);
    }
  }, [isDemo]);

  const handleScanStart = () => {
    setScanning(true);
    setScanResult(null);
  };

  const handleScanStop = () => {
    setScanning(false);
  };

  const handleScanSuccess = (data: string) => {
    // Parse the QR code data
    let ticketData;
    try {
      ticketData = JSON.parse(data);
    } catch (e) {
      // If not JSON, assume it's a ticket ID string
      ticketData = { ticketId: data };
    }

    const ticketId = ticketData.ticketId || data;
    const ticketType = ticketData.type || "standard";

    // Validate the ticket
    const isValid = validTickets.includes(ticketId);
    const isTicketScan =
      staffPosition === "Security" || staffPosition === "Hosts";

    const result = {
      success: isValid,
      message: isValid
        ? isTicketScan
          ? "Ticket check-in successful!"
          : "Drink voucher redeemed successfully!"
        : isTicketScan
          ? "Invalid ticket or already checked in"
          : "Invalid drink voucher or already redeemed",
      ticketId,
      ticketType,
    };

    setScanResult(result);
    setScanning(false);

    if (onScanComplete) {
      onScanComplete(result);
    }
  };

  const handleSimulateSuccess = () => {
    const validTicketId =
      validTickets[Math.floor(Math.random() * validTickets.length)];
    handleScanSuccess(validTicketId);
  };

  const handleSimulateFailure = () => {
    handleScanSuccess("INVALID-TICKET");
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

        {cameraPermission === false && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
              <div>
                <h3 className="font-medium text-red-800">
                  Camera Access Denied
                </h3>
                <p className="text-sm text-red-700">
                  Please enable camera access in your browser settings to scan
                  tickets.
                </p>
              </div>
            </div>
          </div>
        )}

        {!scanning && !scanResult && (
          <div className="space-y-4">
            <div className="aspect-square w-full bg-gray-100 rounded-lg flex items-center justify-center">
              <Camera className="h-16 w-16 text-gray-400" />
              <p className="absolute text-sm text-gray-500">Camera inactive</p>
            </div>

            <Button
              onClick={handleScanStart}
              className="w-full bg-[#0A1128]"
              disabled={cameraPermission === false}
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

        {scanning && (
          <div className="space-y-4">
            <div className="aspect-square w-full bg-black overflow-hidden rounded-lg relative">
              {isDemo ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border-2 border-green-500 rounded-lg animate-pulse" />
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="text-white bg-black/50 inline-block px-3 py-1 rounded-full text-sm">
                      Scanning...
                    </p>
                  </div>
                </div>
              ) : (
                <QRCodeScanner onScan={handleScanSuccess} />
              )}
            </div>

            <Button
              onClick={handleScanStop}
              variant="outline"
              className="w-full"
            >
              Cancel Scanning
            </Button>
          </div>
        )}

        {scanResult && (
          <div className="space-y-4">
            <div className="p-8 border rounded-lg">
              {scanResult.success ? (
                <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
              ) : (
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              )}
              <p className="text-lg font-medium text-center mb-2">
                {scanResult.success ? "Success!" : "Error"}
              </p>
              <p className="text-center mb-4">{scanResult.message}</p>

              <div className="text-left p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium">Staff: {staffName}</p>
                <p className="text-sm font-medium">Position: {staffPosition}</p>
                <p className="text-sm font-medium">Event: {eventName}</p>
                {scanResult.ticketId && (
                  <p className="text-sm font-medium">
                    Ticket ID: {scanResult.ticketId}
                  </p>
                )}
                {scanResult.ticketType && (
                  <p className="text-sm font-medium">
                    Type: {scanResult.ticketType}
                  </p>
                )}
                <p className="text-sm font-medium">
                  Time: {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>

            <Button
              onClick={() => setScanResult(null)}
              className="w-full bg-[#0A1128]"
            >
              Scan Another
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRScannerWithValidation;
