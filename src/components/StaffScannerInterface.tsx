import React, { useState } from "react";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { QrCode, Ticket, Wine } from "lucide-react";
import CheckInScanner from "./CheckInScanner";

interface StaffScannerInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  staffMember: {
    name: string;
    phone: string;
    position: string;
    permissions?: string[];
  };
  eventId: string;
}

const StaffScannerInterface: React.FC<StaffScannerInterfaceProps> = ({
  isOpen,
  onClose,
  staffMember,
  eventId,
}) => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerMode, setScannerMode] = useState<"tickets" | "drinks" | "all">(
    "tickets",
  );

  if (!isOpen) return null;

  const permissions = staffMember.permissions || [];
  const canScanTickets = permissions.includes("scan_tickets");
  const canScanDrinks = permissions.includes("scan_drinks");

  const handleScanSuccess = async (data: string): Promise<boolean> => {
    // In a real app, this would validate the QR code with a backend
    console.log("Scan data:", data);

    // Simulate successful scan
    return true;
  };

  const openScanner = (mode: "tickets" | "drinks" | "all") => {
    setScannerMode(mode);
    setIsScannerOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[90%] max-w-md max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b">
          <h3 className="text-lg font-bold">
            {staffMember.name}'s Scanner Interface
          </h3>
          <p className="text-sm text-gray-500">
            Position: {staffMember.position}
          </p>
        </div>

        <Tabs
          defaultValue="overview"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2 p-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="scan">Scan</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="p-4">
            <div className="space-y-4">
              <div className="p-3 border rounded-md">
                <h4 className="font-medium mb-2">Your Permissions</h4>
                {permissions.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {permissions.map((permission, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                      >
                        {permission.replace("_", " ")}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No permissions assigned</p>
                )}
              </div>

              <div className="p-3 border rounded-md">
                <h4 className="font-medium mb-2">Scanner Options</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={canScanTickets ? "default" : "outline"}
                    className={
                      canScanTickets ? "bg-[#0A1128]" : "text-gray-400"
                    }
                    disabled={!canScanTickets}
                    onClick={() => {
                      setActiveTab("scan");
                      setScannerMode("tickets");
                    }}
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    Scan Tickets
                  </Button>

                  <Button
                    variant={canScanDrinks ? "default" : "outline"}
                    className={canScanDrinks ? "bg-[#0A1128]" : "text-gray-400"}
                    disabled={!canScanDrinks}
                    onClick={() => {
                      setActiveTab("scan");
                      setScannerMode("drinks");
                    }}
                  >
                    <Wine className="h-4 w-4 mr-2" />
                    Scan Drinks
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="scan" className="p-4">
            <div className="space-y-4">
              <div className="p-3 border rounded-md">
                <h4 className="font-medium mb-2">Select Scan Type</h4>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <Button
                    variant={scannerMode === "tickets" ? "default" : "outline"}
                    className={
                      scannerMode === "tickets" && canScanTickets
                        ? "bg-[#0A1128]"
                        : ""
                    }
                    disabled={!canScanTickets}
                    onClick={() => setScannerMode("tickets")}
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    Tickets
                  </Button>

                  <Button
                    variant={scannerMode === "drinks" ? "default" : "outline"}
                    className={
                      scannerMode === "drinks" && canScanDrinks
                        ? "bg-[#0A1128]"
                        : ""
                    }
                    disabled={!canScanDrinks}
                    onClick={() => setScannerMode("drinks")}
                  >
                    <Wine className="h-4 w-4 mr-2" />
                    Drinks
                  </Button>
                </div>

                {(canScanTickets && scannerMode === "tickets") ||
                (canScanDrinks && scannerMode === "drinks") ? (
                  <Button
                    className="w-full bg-[#0A1128]"
                    onClick={() => openScanner(scannerMode)}
                  >
                    <QrCode className="h-4 w-4 mr-2" />
                    Open Scanner
                  </Button>
                ) : (
                  <p className="text-center text-red-500 text-sm">
                    You don't have permission to use this scanner mode
                  </p>
                )}
              </div>

              <div className="p-3 border rounded-md">
                <h4 className="font-medium mb-2">Recent Scans</h4>
                <p className="text-gray-500 text-center">No recent scans</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="p-4 border-t">
          <Button onClick={onClose} className="w-full bg-[#0A1128]">
            Close
          </Button>
        </div>
      </div>

      {/* Scanner Component */}
      {isScannerOpen && (
        <CheckInScanner
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onScanSuccess={handleScanSuccess}
          eventId={eventId}
          scanMode={scannerMode}
          staffRole={staffMember.position}
          staffPermissions={staffMember.permissions}
        />
      )}
    </div>
  );
};

export default StaffScannerInterface;
