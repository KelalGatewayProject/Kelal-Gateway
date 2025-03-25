import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { QrCode, ExternalLink } from "lucide-react";
import DirectQRScanner from "./DirectQRScanner";

interface DeepLinkHandlerProps {
  staffName?: string;
  staffPosition?: string;
  eventName?: string;
}

const DeepLinkHandler: React.FC<DeepLinkHandlerProps> = ({
  staffName = "John Doe",
  staffPosition = "Bartender",
  eventName = "Summer Music Festival",
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [notificationShown, setNotificationShown] = useState(false);

  // Simulate a deep link being received
  useEffect(() => {
    // In a real app, this would be triggered by a deep link handler
    const timer = setTimeout(() => {
      setNotificationShown(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpenScanner = () => {
    setIsScanning(true);
    setNotificationShown(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Status Bar - Simulating mobile device */}
      <div className="bg-black text-white p-2 text-xs flex justify-between items-center">
        <span>9:41 AM</span>
        <div className="flex space-x-1">
          <span>5G</span>
          <span>100%</span>
        </div>
      </div>

      {!isScanning && (
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h2 className="text-xl font-bold mb-4">QR Code Deep Link Demo</h2>

            <p className="text-gray-600 mb-4">
              This demonstrates how staff can scan QR codes directly with their
              phone camera, without needing to open the app first.
            </p>

            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <h3 className="font-medium mb-2">How it works:</h3>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Staff member accepts a position for an event</li>
                <li>
                  They receive a confirmation with their role and permissions
                </li>
                <li>
                  When they scan any QR code with their phone camera, the app
                  automatically opens
                </li>
                <li>
                  The scan is processed based on their assigned permissions
                </li>
              </ol>
            </div>

            <Button
              onClick={() => setNotificationShown(true)}
              className="w-full bg-[#0A1128]"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Simulate Deep Link Notification
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-medium mb-2">Staff Information:</h3>
            <p>
              <strong>Name:</strong> {staffName}
            </p>
            <p>
              <strong>Position:</strong> {staffPosition}
            </p>
            <p>
              <strong>Event:</strong> {eventName}
            </p>
            <p>
              <strong>Scan Permission:</strong>{" "}
              {staffPosition === "Bartender" || staffPosition === "Waitress"
                ? "Drink Vouchers"
                : "Event Tickets"}
            </p>
          </div>
        </div>
      )}

      {/* Notification overlay */}
      {notificationShown && !isScanning && (
        <div className="fixed inset-x-0 top-14 flex justify-center">
          <div className="bg-white rounded-lg shadow-lg p-3 w-[90%] flex items-center">
            <div className="bg-[#0A1128] rounded-lg p-2 mr-3">
              <QrCode className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">QR Code Detected</p>
              <p className="text-xs text-gray-500">
                Tap to scan as {staffPosition}
              </p>
            </div>
            <Button
              size="sm"
              onClick={handleOpenScanner}
              className="bg-[#0A1128]"
            >
              Open
            </Button>
          </div>
        </div>
      )}

      {isScanning && (
        <DirectQRScanner
          staffName={staffName}
          staffPosition={staffPosition}
          eventName={eventName}
        />
      )}
    </div>
  );
};

export default DeepLinkHandler;
