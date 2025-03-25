import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import QRCodeScanner from "./QRCodeScanner";
import TicketValidationSystem from "./TicketValidationSystem";

interface TicketValidationAppProps {
  eventName?: string;
  eventDate?: string;
  staffName?: string;
  staffPosition?: string;
}

const TicketValidationApp: React.FC<TicketValidationAppProps> = ({
  eventName = "Summer Music Festival",
  eventDate = "August 15, 2023",
  staffName = "John Doe",
  staffPosition = "Security",
}) => {
  const [activeView, setActiveView] = useState<"scanner" | "validation">(
    "validation",
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-[#0A1128] text-white p-4">
        <h1 className="text-xl font-bold">{eventName}</h1>
        <p className="text-sm">{eventDate}</p>
        <div className="flex items-center mt-2">
          <span className="text-sm">
            Staff: {staffName} ({staffPosition})
          </span>
        </div>
      </div>

      {/* View Toggle */}
      <div className="p-4">
        <Tabs
          value={activeView}
          onValueChange={(value) =>
            setActiveView(value as "scanner" | "validation")
          }
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="validation">Ticket List</TabsTrigger>
            <TabsTrigger value="scanner">QR Scanner</TabsTrigger>
          </TabsList>

          <TabsContent value="validation">
            <TicketValidationSystem
              eventName={eventName}
              eventDate={eventDate}
              staffName={staffName}
              staffPosition={staffPosition}
            />
          </TabsContent>

          <TabsContent value="scanner">
            <div className="p-4">
              <QRCodeScanner
                isOpen={true}
                onClose={() => setActiveView("validation")}
                onScanSuccess={(data) => {
                  console.log("QR Code scanned:", data);
                  // Handle the scan result
                  alert(`Ticket scanned: ${data}`);
                  setActiveView("validation");
                }}
                title="Scan Ticket QR Code"
                description="Position the QR code within the frame to validate the ticket"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TicketValidationApp;
