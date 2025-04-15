import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Ticket, Wine, Users, BarChart } from "lucide-react";
import QRCodeScanner from "./QRCodeScanner";
import TicketValidationSystem from "./TicketValidationSystem";

interface StaffScannerInterfaceProps {
  eventId?: string;
  eventTitle?: string;
  staffName?: string;
  staffRole?: string;
  staffMember?: {
    name: string;
    phone: string;
    position: string;
    permissions?: string[];
  };
}

const StaffScannerInterface: React.FC<StaffScannerInterfaceProps> = ({
  eventId = "event-123",
  eventTitle = "Summer Music Festival",
  staffName = "John Doe",
  staffRole = "Event Staff",
  staffMember = {
    name: "John Doe",
    phone: "+1234567890",
    position: "Event Staff",
    permissions: ["scan_tickets", "scan_drinks"],
  },
}) => {
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannerMode, setScannerMode] = useState<"tickets" | "drinks" | "all">(
    "tickets",
  );
  const [stats, setStats] = useState({
    totalScanned: 0,
    validTickets: 0,
    invalidTickets: 0,
    alreadyUsedTickets: 0,
  });

  const handleTicketValidation = (ticketData: any, isValid: boolean) => {
    setStats((prev) => ({
      ...prev,
      totalScanned: prev.totalScanned + 1,
      validTickets: isValid ? prev.validTickets + 1 : prev.validTickets,
      invalidTickets: !isValid ? prev.invalidTickets + 1 : prev.invalidTickets,
    }));
  };

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

  const permissions = staffMember.permissions || [];
  const canScanTickets = permissions.includes("scan_tickets");
  const canScanDrinks = permissions.includes("scan_drinks");

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
          <TabsList className="grid w-full grid-cols-3 p-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="scan">Scan</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
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

              <div className="p-3 border rounded-md">
                <h4 className="font-medium mb-2">Event Information</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Event:</span>
                    <span className="font-medium">{eventTitle}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Event ID:</span>
                    <span className="font-medium">{eventId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Staff:</span>
                    <span className="font-medium">{staffMember.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Contact:</span>
                    <span className="font-medium">{staffMember.phone}</span>
                  </div>
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

          <TabsContent value="stats" className="p-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <Users className="h-6 w-6 text-blue-500 mx-auto mb-1" />
                  <p className="text-xl font-bold">{stats.totalScanned}</p>
                  <p className="text-xs text-gray-500">Total Scanned</p>
                </div>

                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <Ticket className="h-6 w-6 text-green-500 mx-auto mb-1" />
                  <p className="text-xl font-bold">{stats.validTickets}</p>
                  <p className="text-xs text-gray-500">Valid Tickets</p>
                </div>
              </div>

              <div className="p-3 border rounded-md">
                <h4 className="font-medium mb-2">Scanning Activity</h4>
                <div className="h-32 flex items-end justify-between gap-1">
                  {[0.3, 0.5, 0.7, 0.4, 0.6, 0.8, 0.5].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-blue-200 rounded-t"
                      style={{ height: `${height * 100}%` }}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="p-4 border-t">
          <Button onClick={() => {}} className="w-full bg-[#0A1128]">
            Close
          </Button>
        </div>
      </div>

      {/* Scanner Component */}
      {isScannerOpen && (
        <QRCodeScanner
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onScanSuccess={handleScanSuccess}
          title={`Scan ${scannerMode === "tickets" ? "Ticket" : "Drink Voucher"}`}
          description={`Position the ${scannerMode === "tickets" ? "ticket" : "drink voucher"} QR code within the frame`}
        />
      )}
    </div>
  );
};

export default StaffScannerInterface;
