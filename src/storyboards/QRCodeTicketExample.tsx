import React, { useState } from "react";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import DigitalTicket from "@/components/DigitalTicket";
import QRCodeScanner from "@/components/QRCodeScanner";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function QRCodeTicketExample() {
  const [activeTab, setActiveTab] = useState("generate");
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isTicketOpen, setIsTicketOpen] = useState(false);

  const handleScanSuccess = (data: string) => {
    setScanResult(data);
    setIsScannerOpen(false);
  };

  const ticketData = {
    type: "event_ticket",
    eventId: "event-123",
    userId: "user-456",
    ticketId: "ticket-789",
    ticketType: "General Admission",
    timestamp: new Date().toISOString(),
  };

  const ticketProps = {
    eventId: ticketData.eventId,
    userId: ticketData.userId,
    ticketId: ticketData.ticketId,
    eventTitle: "Summer Music Festival",
    eventDate: "Aug 15, 2023",
    startTime: "4:00 PM",
    ticketPrice: "30 ETB",
    ticketNumber: "T1234",
    ticketType: ticketData.ticketType,
    eventLocation: "Central Park",
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">QR Code Ticket System</h1>

        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="scan">Scan</TabsTrigger>
            <TabsTrigger value="ticket">Ticket</TabsTrigger>
          </TabsList>

          <TabsContent value="generate" className="space-y-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Generate QR Code</h2>
              <div className="flex justify-center">
                <QRCodeGenerator
                  value={JSON.stringify(ticketData)}
                  size={200}
                />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 text-center">
                This QR code contains encoded ticket information
              </p>
              <Button
                onClick={() => setIsTicketOpen(true)}
                className="w-full bg-[#0A1128]"
              >
                View Full Ticket
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="scan" className="space-y-4">
            <h2 className="text-lg font-semibold mb-2">Scan QR Code</h2>

            {scanResult ? (
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Scan Result:</h3>
                  <pre className="text-xs bg-gray-100 p-2 rounded overflow-x-auto">
                    {scanResult}
                  </pre>
                </div>
                <Button
                  onClick={() => setScanResult(null)}
                  className="w-full bg-[#0A1128]"
                >
                  Scan Again
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-sm text-gray-600">
                  Click the button below to scan a QR code ticket
                </p>
                <Button
                  onClick={() => setIsScannerOpen(true)}
                  className="w-full bg-[#0A1128]"
                >
                  Open Scanner
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="ticket" className="space-y-4">
            <h2 className="text-lg font-semibold mb-2">Digital Ticket</h2>
            <div className="border rounded-lg overflow-hidden">
              <DigitalTicket
                isOpen={true}
                onClose={() => {}}
                {...ticketProps}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* QR Code Scanner Modal */}
      <QRCodeScanner
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />

      {/* Digital Ticket Modal */}
      <DigitalTicket
        isOpen={isTicketOpen}
        onClose={() => setIsTicketOpen(false)}
        {...ticketProps}
      />
    </div>
  );
}
