import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  BarChart2,
  Scan,
  ArrowLeft,
  Ticket,
  TrendingUp,
  UserPlus,
  Check,
  User,
  X,
  Bell,
  QrCode,
  Camera,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventOrganizerDrawer from "@/components/EventOrganizerDrawer";
import {
  NotificationDrawer,
  NotificationDetailDrawer,
} from "@/components/NotificationDrawer";
import QRCodeGenerator from "@/components/QRCodeGenerator";
import StaffScannerInterface from "@/components/StaffScannerInterface";
import StaffManagement from "@/components/StaffManagement";
import { Textarea } from "@/components/ui/textarea"; // Import Textarea for the message box

// Define a type for staff members
interface StaffMember {
  name: string;
  phone: string;
  position: string;
  permissions?: string[];
}

// Define a type for notifications
interface EventNotification {
  id: string;
  title: string;
  message: string;
  image: string | null;
  timestamp: string;
  sentToCount: number;
}

const EventManagement: React.FC = () => {
  // Make useParams optional by providing a default value
  const params = useParams<{ id: string }>();
  const id = params?.id || "1"; // Default to "1" if no ID is provided

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [checkedInCount, setCheckedInCount] = useState(0); // State for checked-in attendees
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]); // State for staff members
  const [showStaffList, setShowStaffList] = useState(false); // State to toggle staff list view
  const [selectedPositionForList, setSelectedPositionForList] =
    useState<string>(""); // Position selected for viewing staff list
  const [isStaffScannerOpen, setIsStaffScannerOpen] = useState(false);
  const [selectedStaffMember, setSelectedStaffMember] =
    useState<StaffMember | null>(null);

  // New states for notification functionality
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] =
    useState(false);
  const [isQRCodeModalOpen, setIsQRCodeModalOpen] = useState(false);
  const [currentNotificationId, setCurrentNotificationId] = useState("");
  const [notifications, setNotifications] = useState<EventNotification[]>([
    {
      id: "1",
      title: "Free Drinks Available!",
      message: "Come to the bar and scan your QR code for a free drink!",
      image:
        "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&q=80",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      sentToCount: 45,
    },
  ]);

  // State for the message box
  const [message, setMessage] = useState("");

  // State for the notification approval drawer
  const [isApprovalDrawerOpen, setIsApprovalDrawerOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] =
    useState<EventNotification | null>(null);

  // Sample event data - in a real app, you would fetch this based on the ID
  const event = {
    id: id || "1",
    title: id === "2" ? "Tech Conference 2023" : "Summer Music Festival",
    date: id === "2" ? "Sep 5, 2023" : "Aug 15, 2023",
    time: id === "2" ? "9:00 AM" : "4:00 PM",
    location: id === "2" ? "Convention Center" : "Central Park",
    attendees: id === "2" ? 120 : 250,
    ticketsSold: id === "2" ? 100 : 180,
    revenue: id === "2" ? "3,000 ETB" : "5,400 ETB",
    positions: [
      { title: "Manager", filled: 1, required: 2, payment: "300 ETB" }, // 1 filled, 2 required
      { title: "DJ", filled: 0, required: 1, payment: "500 ETB" },
      { title: "Waitress", filled: 2, required: 4, payment: "200 ETB" },
      { title: "Hosts", filled: 1, required: 3, payment: "250 ETB" },
      { title: "Security", filled: 1, required: 5, payment: "350 ETB" }, // Added Security position
    ],
    // Demo staff members who have already accepted positions
    demoStaff: [
      {
        name: "John Doe",
        phone: "0911223344",
        position: "Manager",
        permissions: [
          "scan_tickets",
          "scan_drinks",
          "manage_staff",
          "view_analytics",
        ],
      },
      {
        name: "Sarah Smith",
        phone: "0922334455",
        position: "Waitress",
        permissions: ["scan_drinks"],
      },
      {
        name: "Michael Brown",
        phone: "0933445566",
        position: "Waitress",
        permissions: ["scan_drinks"],
      },
      {
        name: "David Wilson",
        phone: "0944556677",
        position: "Hosts",
        permissions: ["scan_tickets", "view_guest_list"],
      },
      {
        name: "James Johnson",
        phone: "0955667788",
        position: "Security",
        permissions: ["scan_tickets"],
      },
    ],
    ticketTypes: [
      {
        name: "General Admission",
        price: "30 ETB",
        sold: id === "2" ? 80 : 150,
      },
      { name: "VIP", price: "75 ETB", sold: id === "2" ? 20 : 30 },
    ],
    salesByDay: [
      { day: "Mon", sales: 10 },
      { day: "Tue", sales: 20 },
      { day: "Wed", sales: 15 },
      { day: "Thu", sales: 25 },
      { day: "Fri", sales: 30 },
      { day: "Sat", sales: 40 },
      { day: "Sun", sales: 35 },
    ],
  };

  // Initialize staff members from demo data
  useEffect(() => {
    setStaffMembers(event.demoStaff || []);
  }, []);

  const openPositionRequest = (position: string) => {
    setSelectedPosition(position);
    setIsDrawerOpen(true);
  };

  const handleAcceptPosition = (staffData: { name: string; phone: string }) => {
    // Get permissions based on position
    const permissions = getPermissionsForPosition(selectedPosition);

    // Add the new staff member to the list
    const newStaffMember: StaffMember = {
      ...staffData,
      position: selectedPosition,
      permissions: permissions,
    };

    setStaffMembers([...staffMembers, newStaffMember]);

    // Update the filled count for the position
    const updatedPositions = event.positions.map((pos) => {
      if (pos.title === selectedPosition) {
        return { ...pos, filled: pos.filled + 1 };
      }
      return pos;
    });

    event.positions = updatedPositions;

    setIsDrawerOpen(false);
  };

  // Function to determine permissions based on position
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

  const handleDeclinePosition = () => {
    // Logic to handle position decline
    setIsDrawerOpen(false);
  };

  const openStaffList = (position: string) => {
    setSelectedPositionForList(position);
    setShowStaffList(true);
  };

  const closeStaffList = () => {
    setShowStaffList(false);
  };

  // Filter staff members by position
  const getStaffForPosition = (position: string) => {
    return staffMembers.filter((staff) => staff.position === position);
  };

  // Notification handling functions
  const openNotificationDrawer = () => {
    setIsNotificationDrawerOpen(true);
  };

  const handleSendNotification = (data: {
    title: string;
    message: string;
    image: string | null;
  }) => {
    // Create a new notification
    const newNotification: EventNotification = {
      id: Date.now().toString(),
      title: data.title,
      message: data.message,
      image: data.image,
      timestamp: new Date().toISOString(),
      sentToCount: checkedInCount, // Send to all checked-in attendees
    };

    // Add to notifications list
    setNotifications([newNotification, ...notifications]);
    setCurrentNotificationId(newNotification.id);
    setIsNotificationDrawerOpen(false);
    setIsQRCodeModalOpen(true);
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (message.trim()) {
      const newNotification: EventNotification = {
        id: Date.now().toString(),
        title: "New Message",
        message: message.trim(),
        image: null,
        timestamp: new Date().toISOString(),
        sentToCount: checkedInCount,
      };

      setNotifications([newNotification, ...notifications]);
      setMessage(""); // Clear the message box
    }
  };

  // Handle clicking a notification
  const handleNotificationClick = (notification: EventNotification) => {
    setSelectedNotification(notification);
    setIsApprovalDrawerOpen(true);
  };

  // Handle approving a notification
  const handleApproveNotification = () => {
    if (selectedNotification) {
      // Logic to send the notification
      console.log("Notification approved and sent:", selectedNotification);
      setIsApprovalDrawerOpen(false);
    }
  };

  // Simulate automatic check-in updates (e.g., from QR code scanning)
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate a check-in by incrementing the counter
      if (checkedInCount < event.ticketsSold) {
        setCheckedInCount((prevCount) => prevCount + 1);
      }
    }, 5000); // Simulate a check-in every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [checkedInCount, event.ticketsSold]);

  return (
    <PageLayout>
      <div className="p-4 bg-gray-50 min-h-screen">
        <div className="mb-6">
          <Link
            to="/event-organizer-dashboard"
            className="flex items-center text-gray-600 mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold">{event.title}</h1>
          <div className="flex flex-wrap gap-4 mt-2 text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-gray-500" />
              {event.date}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-gray-500" />
              {event.time}
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-gray-500" />
              {event.location}
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* TICKET SOLD moved up */}
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Tickets Sold</h3>
                  <Ticket className="h-5 w-5 text-gray-500" />
                </div>
                <p className="text-2xl font-bold">{event.ticketsSold}</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Revenue</h3>
                  <DollarSign className="h-5 w-5 text-gray-500" />
                </div>
                <p className="text-2xl font-bold">{event.revenue}</p>
              </div>

              {/* CHECKED IN moved down */}
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Checked In</h3>
                  <Users className="h-5 w-5 text-gray-500" />
                </div>
                <p className="text-2xl font-bold">{checkedInCount}</p>
                <Button
                  onClick={openNotificationDrawer}
                  className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Send Promotion Notification
                </Button>
              </div>
            </div>

            {/* Recent Notifications Section */}
            {notifications.length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-medium">Recent Notifications</h3>
                  <span className="text-xs text-gray-500">
                    {notifications.length} sent
                  </span>
                </div>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-3 border rounded-md cursor-pointer hover:bg-gray-50"
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start space-x-3">
                        {notification.image && (
                          <img
                            src={notification.image}
                            alt=""
                            className="w-12 h-12 rounded object-cover"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <p className="font-medium">{notification.title}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-6 w-6 p-0"
                              onClick={() => {
                                setCurrentNotificationId(notification.id);
                                setIsQRCodeModalOpen(true);
                              }}
                            >
                              <QrCode className="h-4 w-4" />
                            </Button>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {notification.message}
                          </p>
                          <div className="flex justify-between items-center mt-1">
                            <p className="text-xs text-gray-500">
                              {new Date(
                                notification.timestamp,
                              ).toLocaleString()}
                            </p>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                              Sent to {notification.sentToCount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Send Message Section */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium mb-4">Send Message</h3>
              <Textarea
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mb-4"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-[#0A1128] text-white"
              >
                Send Message
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="staff" className="space-y-4">
            <StaffManagement
              eventId={event.id}
              eventTitle={event.title}
              eventDate={event.date}
              eventTime={event.time}
              positions={event.positions}
              onStaffUpdate={(updatedStaff) => {
                // In a real app, this would update the staff members in the state
                console.log("Staff updated:", updatedStaff);
                setStaffMembers(updatedStaff);
              }}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Sales Trend</h3>
                <TrendingUp className="h-5 w-5 text-gray-500" />
              </div>

              <div className="h-64 flex items-end justify-between">
                {event.salesByDay.map((day, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="bg-blue-500 w-8 rounded-t-md"
                      style={{ height: `${day.sales * 4}px` }}
                    ></div>
                    <span className="text-xs mt-2">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium mb-3">Revenue Breakdown</h3>
              <div className="space-y-3">
                {event.ticketTypes.map((ticket, index) => {
                  const revenue =
                    parseInt(ticket.price.replace(" ETB", "")) * ticket.sold;
                  return (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <p className="font-medium">{ticket.name}</p>
                        <p className="text-sm text-gray-500">
                          {ticket.sold} tickets × {ticket.price}
                        </p>
                      </div>
                      <p className="font-bold">{revenue} ETB</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Staff Position Drawer */}
      {isDrawerOpen && (
        <EventOrganizerDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          eventDetails={{
            title: event.title,
            date: event.date,
            time: event.time,
            position: selectedPosition,
            payment:
              event.positions.find((p) => p.title === selectedPosition)
                ?.payment || "150 ETB",
            permissions: getPermissionsForPosition(selectedPosition),
          }}
          onAccept={handleAcceptPosition}
          onDecline={handleDeclinePosition}
        />
      )}

      {/* Staff List Modal */}
      {showStaffList && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[90%] max-w-md max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold">
                  {selectedPositionForList} Staff
                </h3>
                <button onClick={closeStaffList} className="p-1">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-4">
              {getStaffForPosition(selectedPositionForList).length > 0 ? (
                <div className="space-y-3">
                  {getStaffForPosition(selectedPositionForList).map(
                    (staff, index) => (
                      <div key={index} className="p-3 border rounded-md">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{staff.name}</p>
                            <p className="text-sm text-gray-500">
                              {staff.phone}
                            </p>
                            {staff.permissions &&
                              staff.permissions.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {staff.permissions.map((permission, i) => (
                                    <span
                                      key={i}
                                      className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                                    >
                                      {permission.replace("_", " ")}
                                    </span>
                                  ))}
                                </div>
                              )}
                          </div>
                          <div className="flex flex-col items-end">
                            <div className="flex items-center text-green-600">
                              <Check className="h-4 w-4 mr-1" />
                              <span className="text-sm">Accepted</span>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-2 text-xs"
                              onClick={() => {
                                // Set the selected staff member and open the scanner interface
                                setSelectedStaffMember(staff);
                                closeStaffList();
                                setIsStaffScannerOpen(true);
                              }}
                            >
                              Open Scanner
                            </Button>
                          </div>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  No staff members for this position yet.
                </p>
              )}
            </div>

            <Button
              onClick={closeStaffList}
              className="mt-4 w-full bg-[#0A1128] text-white"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Notification Drawer */}
      {isNotificationDrawerOpen && (
        <NotificationDrawer
          isOpen={isNotificationDrawerOpen}
          onClose={() => setIsNotificationDrawerOpen(false)}
          onSend={handleSendNotification}
        />
      )}

      {/* QR Code Modal */}
      {isQRCodeModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[90%] max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Notification QR Code</h3>
              <button
                onClick={() => setIsQRCodeModalOpen(false)}
                className="p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-center mb-4">
                Attendees can scan this QR code to view this notification
              </p>
              <QRCodeGenerator
                value={`notification:${currentNotificationId}`}
                size={200}
              />
            </div>

            <Button
              onClick={() => setIsQRCodeModalOpen(false)}
              className="mt-6 w-full bg-[#0A1128] text-white"
            >
              Close
            </Button>
          </div>
        </div>
      )}

      {/* Notification Approval Drawer */}
      {isApprovalDrawerOpen && selectedNotification && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[90%] max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Notification Details</h3>
              <button
                onClick={() => setIsApprovalDrawerOpen(false)}
                className="p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium">Title</h4>
                <p>{selectedNotification.title}</p>
              </div>

              <div>
                <h4 className="font-medium">Message</h4>
                <p>{selectedNotification.message}</p>
              </div>

              {selectedNotification.image && (
                <div>
                  <h4 className="font-medium">Image</h4>
                  <img
                    src={selectedNotification.image}
                    alt=""
                    className="w-full h-40 object-cover rounded mt-2"
                  />
                </div>
              )}

              <div>
                <h4 className="font-medium">Sent to</h4>
                <p>{selectedNotification.sentToCount} attendees</p>
              </div>

              <div>
                <h4 className="font-medium">Time</h4>
                <p>
                  {new Date(selectedNotification.timestamp).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex space-x-2 mt-6">
              <Button
                onClick={() => setIsApprovalDrawerOpen(false)}
                variant="outline"
                className="flex-1"
              >
                Close
              </Button>
              <Button
                onClick={handleApproveNotification}
                className="flex-1 bg-[#0A1128] text-white"
              >
                Resend
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Staff Scanner Interface */}
      {isStaffScannerOpen && selectedStaffMember && (
        <StaffScannerInterface
          isOpen={isStaffScannerOpen}
          onClose={() => setIsStaffScannerOpen(false)}
          staffMember={selectedStaffMember}
          eventId={event.id}
        />
      )}

      {/* Floating Action Button for sending notifications */}
      <button
        onClick={openNotificationDrawer}
        className="fixed bottom-6 right-6 bg-[#0A1128] text-white rounded-full p-4 shadow-lg"
      >
        <Bell className="h-6 w-6" />
      </button>
    </PageLayout>
  );
};

export default EventManagement;
