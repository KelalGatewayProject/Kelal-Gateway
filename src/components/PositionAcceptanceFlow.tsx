import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight, QrCode } from "lucide-react";
import DirectQRScanner from "./DirectQRScanner";

interface PositionAcceptanceFlowProps {
  eventTitle?: string;
  eventDate?: string;
  eventTime?: string;
  position?: string;
  payment?: string;
  staffName?: string;
  staffPhone?: string;
}

const PositionAcceptanceFlow: React.FC<PositionAcceptanceFlowProps> = ({
  eventTitle = "Summer Music Festival",
  eventDate = "Aug 15, 2023",
  eventTime = "4:00 PM",
  position = "Bartender",
  payment = "150 ETB",
  staffName = "John Doe",
  staffPhone = "0911223344",
}) => {
  const [step, setStep] = useState<"request" | "accepted" | "scanner">(
    "request",
  );

  // Get permissions based on position
  const getPermissionsForPosition = (position: string): string[] => {
    switch (position.toLowerCase()) {
      case "manager":
        return [
          "scan_tickets",
          "scan_drinks",
          "manage_staff",
          "view_analytics",
        ];
      case "dj":
        return ["view_schedule"];
      case "waitress":
      case "bartender":
        return ["scan_drinks"];
      case "hosts":
        return ["scan_tickets", "view_guest_list"];
      case "security":
        return ["scan_tickets"];
      default:
        return [];
    }
  };

  const permissions = getPermissionsForPosition(position);

  const handleAccept = () => {
    setStep("accepted");
  };

  const handleProceedToScanner = () => {
    setStep("scanner");
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

      {step === "request" && (
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-4">Position Request</h2>

            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-500">Event</p>
                <p className="font-medium">{eventTitle}</p>
              </div>

              <div className="flex space-x-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="font-medium">{eventDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Time</p>
                  <p className="font-medium">{eventTime}</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Position</p>
                <p className="font-medium">{position}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Payment</p>
                <p className="font-medium">{payment}</p>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500">Permissions</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {permissions.map((permission, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                    >
                      {permission.replace("_", " ")}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Button
                onClick={handleAccept}
                className="w-full bg-[#0A1128] text-white"
              >
                <Check className="h-4 w-4 mr-2" />
                Accept Position
              </Button>

              <Button
                variant="outline"
                className="w-full border-[#0A1128] text-[#0A1128]"
              >
                <X className="h-4 w-4 mr-2" />
                Decline
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === "accepted" && (
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="text-center py-6">
              <div className="bg-green-100 rounded-full p-4 inline-block mb-4">
                <Check className="h-12 w-12 text-green-600" />
              </div>

              <h2 className="text-xl font-bold mb-2">Position Accepted!</h2>
              <p className="text-gray-600 mb-6">
                You have been assigned as a{" "}
                <span className="font-bold">{position}</span> for {eventTitle}.
              </p>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-medium mb-2">Your Permissions:</h3>
                <div className="flex flex-wrap gap-1">
                  {permissions.map((permission, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                    >
                      {permission.replace("_", " ")}
                    </span>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleProceedToScanner}
                className="w-full bg-[#0A1128]"
              >
                <QrCode className="h-4 w-4 mr-2" />
                Try QR Scanner
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === "scanner" && (
        <DirectQRScanner
          staffName={staffName}
          staffPosition={position}
          eventName={eventTitle}
        />
      )}
    </div>
  );
};

export default PositionAcceptanceFlow;
