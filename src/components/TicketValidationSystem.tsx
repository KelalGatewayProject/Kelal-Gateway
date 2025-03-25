import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Check, X, Clock, QrCode, Ticket } from "lucide-react";
import QRScannerWithValidation from "./QRScannerWithValidation";

interface ValidatedTicket {
  id: string;
  name: string;
  email: string;
  ticketType: string;
  checkInTime: string;
  status: "checked-in" | "not-checked-in" | "invalid";
}

interface TicketValidationSystemProps {
  eventName?: string;
  eventDate?: string;
  staffName?: string;
  staffPosition?: string;
  initialTickets?: ValidatedTicket[];
}

const TicketValidationSystem: React.FC<TicketValidationSystemProps> = ({
  eventName = "Summer Music Festival",
  eventDate = "August 15, 2023",
  staffName = "John Doe",
  staffPosition = "Security",
  initialTickets = [
    {
      id: "TICKET-123",
      name: "Alice Johnson",
      email: "alice@example.com",
      ticketType: "VIP",
      checkInTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      status: "checked-in",
    },
    {
      id: "TICKET-456",
      name: "Bob Smith",
      email: "bob@example.com",
      ticketType: "General",
      checkInTime: "",
      status: "not-checked-in",
    },
    {
      id: "TICKET-789",
      name: "Charlie Brown",
      email: "charlie@example.com",
      ticketType: "VIP",
      checkInTime: "",
      status: "not-checked-in",
    },
  ],
}) => {
  const [tickets, setTickets] = useState<ValidatedTicket[]>(initialTickets);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [stats, setStats] = useState({
    checkedIn: initialTickets.filter((t) => t.status === "checked-in").length,
    notCheckedIn: initialTickets.filter((t) => t.status === "not-checked-in")
      .length,
    total: initialTickets.length,
  });

  // Filter tickets based on search query
  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Group tickets by status
  const checkedInTickets = filteredTickets.filter(
    (t) => t.status === "checked-in",
  );
  const notCheckedInTickets = filteredTickets.filter(
    (t) => t.status === "not-checked-in",
  );

  const handleCheckIn = (ticketId: string) => {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id === ticketId && ticket.status === "not-checked-in") {
        return {
          ...ticket,
          status: "checked-in" as const,
          checkInTime: new Date().toISOString(),
        };
      }
      return ticket;
    });

    setTickets(updatedTickets);
    updateStats(updatedTickets);
  };

  const handleScanComplete = (result: {
    success: boolean;
    message: string;
    ticketId?: string;
  }) => {
    if (result.success && result.ticketId) {
      handleCheckIn(result.ticketId);
    }
    setIsScanning(false);
  };

  const updateStats = (updatedTickets: ValidatedTicket[]) => {
    setStats({
      checkedIn: updatedTickets.filter((t) => t.status === "checked-in").length,
      notCheckedIn: updatedTickets.filter((t) => t.status === "not-checked-in")
        .length,
      total: updatedTickets.length,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      {/* Header */}
      <div className="bg-[#0A1128] text-white p-4">
        <h1 className="text-xl font-bold">{eventName}</h1>
        <p className="text-sm">{eventDate}</p>
        <div className="flex items-center mt-2">
          <div className="bg-white/20 rounded-full p-1 mr-2">
            <Ticket className="h-4 w-4" />
          </div>
          <span className="text-sm">
            {stats.checkedIn} / {stats.total} checked in
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4">
        {isScanning ? (
          <QRScannerWithValidation
            staffName={staffName}
            staffPosition={staffPosition}
            eventName={eventName}
            onScanComplete={handleScanComplete}
            validTickets={tickets
              .filter((t) => t.status === "not-checked-in")
              .map((t) => t.id)}
            isDemo={true}
          />
        ) : (
          <>
            {/* Search and Scan Button */}
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Search className="h-4 w-4 mr-2 text-gray-500" />
                <Input
                  placeholder="Search by name, email, or ticket ID"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
              </div>
              <Button
                onClick={() => setIsScanning(true)}
                className="w-full bg-[#0A1128] mt-2"
              >
                <QrCode className="h-4 w-4 mr-2" />
                Scan QR Code
              </Button>
            </div>

            {/* Ticket Tabs */}
            <Tabs defaultValue="not-checked-in" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="not-checked-in">
                  Not Checked In ({stats.notCheckedIn})
                </TabsTrigger>
                <TabsTrigger value="checked-in">
                  Checked In ({stats.checkedIn})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="not-checked-in" className="space-y-4">
                {notCheckedInTickets.length > 0 ? (
                  <div className="space-y-3">
                    {notCheckedInTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="bg-white rounded-lg p-3 shadow-sm"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium">{ticket.name}</h3>
                            <p className="text-sm text-gray-500">
                              {ticket.email}
                            </p>
                            <div className="flex items-center mt-1">
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                {ticket.ticketType}
                              </span>
                              <span className="text-xs text-gray-500 ml-2">
                                {ticket.id}
                              </span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleCheckIn(ticket.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Check In
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white rounded-lg">
                    <p className="text-gray-500">
                      {searchQuery
                        ? "No matching tickets found"
                        : "All tickets have been checked in"}
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="checked-in" className="space-y-4">
                {checkedInTickets.length > 0 ? (
                  <div className="space-y-3">
                    {checkedInTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className="bg-white rounded-lg p-3 shadow-sm"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center">
                              <h3 className="font-medium">{ticket.name}</h3>
                              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                                <Check className="h-3 w-3 mr-1" />
                                Checked In
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">
                              {ticket.email}
                            </p>
                            <div className="flex items-center mt-1">
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                                {ticket.ticketType}
                              </span>
                              <span className="text-xs text-gray-500 ml-2 flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {new Date(
                                  ticket.checkInTime,
                                ).toLocaleTimeString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-white rounded-lg">
                    <p className="text-gray-500">
                      {searchQuery
                        ? "No matching tickets found"
                        : "No tickets have been checked in yet"}
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default TicketValidationSystem;
