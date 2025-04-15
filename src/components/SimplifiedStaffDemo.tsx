import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PositionAcceptanceFlow from "./PositionAcceptanceFlow";
import DeepLinkHandler from "./DeepLinkHandler";

interface SimplifiedStaffDemoProps {
  initialTab?: string;
}

const SimplifiedStaffDemo: React.FC<SimplifiedStaffDemoProps> = ({
  initialTab = "acceptance",
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedPosition, setSelectedPosition] = useState("Bartender");

  const positions = [
    { title: "Bartender", description: "Scan drink vouchers" },
    { title: "Security", description: "Scan event tickets" },
    { title: "Hosts", description: "Scan tickets and view guest list" },
    { title: "Manager", description: "Full access to all features" },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Simplified Staff Demo</h1>

      <div className="bg-white rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-lg font-medium mb-3">Select Staff Position</h2>
        <div className="grid grid-cols-2 gap-2 mb-4">
          {positions.map((pos) => (
            <Button
              key={pos.title}
              variant={selectedPosition === pos.title ? "default" : "outline"}
              className={selectedPosition === pos.title ? "bg-[#0A1128]" : ""}
              onClick={() => setSelectedPosition(pos.title)}
            >
              {pos.title}
            </Button>
          ))}
        </div>
        <p className="text-sm text-gray-500">
          <strong>{selectedPosition}:</strong>{" "}
          {positions.find((p) => p.title === selectedPosition)?.description}
        </p>
      </div>

      <Tabs
        defaultValue={activeTab}
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="acceptance">Position Acceptance</TabsTrigger>
          <TabsTrigger value="deeplink">Direct QR Scanning</TabsTrigger>
        </TabsList>

        <TabsContent
          value="acceptance"
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="border-b border-gray-200 p-3 bg-gray-50">
            <h3 className="font-medium">Position Acceptance Flow</h3>
            <p className="text-sm text-gray-500">
              Accept a position and get assigned permissions
            </p>
          </div>
          <div className="h-[600px] overflow-hidden">
            <PositionAcceptanceFlow position={selectedPosition} />
          </div>
        </TabsContent>

        <TabsContent
          value="deeplink"
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="border-b border-gray-200 p-3 bg-gray-50">
            <h3 className="font-medium">Direct QR Scanning Demo</h3>
            <p className="text-sm text-gray-500">
              Scan QR codes without opening the app first
            </p>
          </div>
          <div className="h-[600px] overflow-hidden">
            <DeepLinkHandler staffPosition={selectedPosition} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SimplifiedStaffDemo;
