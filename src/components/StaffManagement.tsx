import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  UserPlus,
  Check,
  X,
  Clock,
  AlertCircle,
  Send,
} from "lucide-react";
import EventOrganizerDrawer from "./EventOrganizerDrawer";
import { Textarea } from "@/components/ui/textarea";

interface StaffMember {
  id: string;
  name: string;
  phone: string;
  position: string;
  permissions: string[];
  status: "pending" | "accepted" | "declined" | "checked-in";
  checkedInTime?: string;
  payment?: string;
}

interface StaffManagementProps {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  positions: Array<{
    title: string;
    filled: number;
    required: number;
    payment: string;
  }>;
  onStaffUpdate?: (staff: StaffMember[]) => void;
}

const StaffManagement: React.FC<StaffManagementProps> = ({
  eventId,
  eventTitle,
  eventDate,
  eventTime,
  onStaffUpdate,
}) => {
  // Mock database of member phone numbers
  const memberPhoneNumbers = [
    "0911223344",
    "0922334455",
    "0933445566",
    "0944556677",
    "0955667788",
    "0966778899",
    "0977889900",
  ];
  // Demo positions data
  const [positions, setPositions] = useState([
    { title: "Manager", filled: 1, required: 1, payment: "300 ETB" },
    { title: "Waitress", filled: 1, required: 3, payment: "150 ETB" },
    { title: "Hosts", filled: 1, required: 2, payment: "200 ETB" },
    { title: "Security", filled: 1, required: 2, payment: "250 ETB" },
    { title: "Ticket Scanner", filled: 0, required: 2, payment: "200 ETB" },
  ]);
  // Demo staff data
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([
    {
      id: "staff-1",
      name: "John Doe",
      phone: "0911223344",
      position: "Manager",
      permissions: [
        "scan_tickets",
        "scan_drinks",
        "manage_staff",
        "view_analytics",
      ],
      status: "checked-in",
      checkedInTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    },
    {
      id: "staff-2",
      name: "Sarah Smith",
      phone: "0922334455",
      position: "Waitress",
      permissions: ["scan_drinks"],
      status: "accepted",
    },
    {
      id: "staff-3",
      name: "Michael Brown",
      phone: "0933445566",
      position: "Waitress",
      permissions: ["scan_drinks"],
      status: "pending",
    },
    {
      id: "staff-4",
      name: "David Wilson",
      phone: "0944556677",
      position: "Hosts",
      permissions: ["scan_tickets", "view_guest_list"],
      status: "checked-in",
      checkedInTime: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    },
    {
      id: "staff-5",
      name: "James Johnson",
      phone: "0955667788",
      position: "Security",
      permissions: ["scan_tickets"],
      status: "declined",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPosition, setSelectedPosition] = useState<string>("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");
  const [selectedStaffForMessage, setSelectedStaffForMessage] =
    useState<StaffMember | null>(null);

  // Simplified states - removed modal-specific states
  const [phoneSearchQuery, setPhoneSearchQuery] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter staff based on search and position filter
  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.phone.includes(searchQuery) ||
      staff.position.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPosition = selectedPosition
      ? staff.position === selectedPosition
      : true;

    return matchesSearch && matchesPosition;
  });

  // Group staff by status
  const pendingStaff = filteredStaff.filter(
    (staff) => staff.status === "pending",
  );
  const acceptedStaff = filteredStaff.filter(
    (staff) => staff.status === "accepted" || staff.status === "checked-in",
  );
  const declinedStaff = filteredStaff.filter(
    (staff) => staff.status === "declined",
  );

  // Handle adding a new staff member
  const handleAddStaff = () => {
    setSelectedPosition("");
    setIsDrawerOpen(true);
    setPhoneSearchQuery("");
  };

  // This function is no longer needed as position selection is now in the drawer
  // Keeping it as a placeholder in case we need to reintroduce it
  const handlePositionSelect = (position: string) => {
    setSelectedPosition(position);
  };

  // This function is simplified as we now handle everything in the drawer
  const handlePhoneSearch = (phone: string) => {
    if (!phone.trim() || phone.length < 10) return null;

    // For demo purposes, check if the phone number exists in our staff list or in the member database
    const phoneExists =
      staffMembers.some((staff) => staff.phone === phone) ||
      memberPhoneNumbers.includes(phone);

    return phoneExists ? "found" : "not_found";
  };

  // Handle sending SMS invitation
  const handleSendSMSInvitation = (phone: string, position: string) => {
    setIsProcessing(true);

    // Simulate sending SMS
    setTimeout(() => {
      console.log(`SMS invitation sent to ${phone} for ${position} position`);
      setIsProcessing(false);

      // Show success message
      alert(
        `SMS invitation sent to ${phone} with app download link and position details for ${eventTitle} on ${eventDate} at ${eventTime}`,
      );
    }, 1500);
  };

  // Handle accepting a staff request
  const handleAcceptStaffRequest = (staffData: {
    name: string;
    phone: string;
    payment: string;
    position: string;
  }) => {
    const isMember = memberPhoneNumbers.includes(staffData.phone);

    if (isMember) {
      // If it's a member, we're sending a notification
      console.log(
        `Notification sent to member ${staffData.phone} for ${staffData.position} position`,
      );

      // Show success message
      alert(
        `Staff request notification sent to ${staffData.phone} for the ${staffData.position} position at ${eventTitle}`,
      );

      // In a real app, this would create a pending staff request
      const newStaffMember: StaffMember = {
        id: `staff-${Date.now()}`,
        name: staffData.name || "Member", // Use provided name or default to "Member"
        phone: staffData.phone,
        position: staffData.position,
        permissions: getPermissionsForPosition(staffData.position),
        status: "pending", // Set as pending until they accept
        payment: staffData.payment,
      };

      const updatedStaff = [...staffMembers, newStaffMember];
      setStaffMembers(updatedStaff);

      if (onStaffUpdate) {
        onStaffUpdate(updatedStaff);
      }
    } else {
      // If not a member, send SMS invitation with app download link
      handleSendSMSInvitation(staffData.phone, staffData.position);

      // Create a pending staff member entry
      const newStaffMember: StaffMember = {
        id: `staff-${Date.now()}`,
        name: staffData.name,
        phone: staffData.phone,
        position: staffData.position,
        permissions: getPermissionsForPosition(staffData.position),
        status: "pending", // Set as pending until they download the app and accept
        payment: staffData.payment,
      };

      const updatedStaff = [...staffMembers, newStaffMember];
      setStaffMembers(updatedStaff);

      if (onStaffUpdate) {
        onStaffUpdate(updatedStaff);
      }
    }

    setIsDrawerOpen(false);
  };

  // Handle updating staff status
  const handleUpdateStaffStatus = (
    staffId: string,
    newStatus: "accepted" | "declined" | "checked-in",
  ) => {
    const updatedStaff = staffMembers.map((staff) => {
      if (staff.id === staffId) {
        return {
          ...staff,
          status: newStatus,
          ...(newStatus === "checked-in"
            ? { checkedInTime: new Date().toISOString() }
            : {}),
        };
      }
      return staff;
    });

    setStaffMembers(updatedStaff);

    if (onStaffUpdate) {
      onStaffUpdate(updatedStaff);
    }
  };

  // Handle sending a message to staff
  const handleSendMessage = () => {
    if (!selectedStaffForMessage || !messageText.trim()) return;

    // In a real app, this would send the message to the staff member
    console.log(
      `Message sent to ${selectedStaffForMessage.name}: ${messageText}`,
    );

    // Clear the form
    setMessageText("");
    setSelectedStaffForMessage(null);
  };

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
      case "ticket scanner":
        return ["scan_tickets"];
      default:
        return [];
    }
  };

  // Get the count of staff by position
  const getStaffCountByPosition = (position: string) => {
    return staffMembers.filter(
      (staff) =>
        staff.position === position &&
        (staff.status === "accepted" || staff.status === "checked-in"),
    ).length;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Staff Management</h2>

      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Search className="h-4 w-4 mr-2 text-gray-500" />
          <Input
            placeholder="Search staff by name, phone, or position"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          <Button
            variant={selectedPosition === "" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPosition("")}
            className={selectedPosition === "" ? "bg-[#0A1128]" : ""}
          >
            All
          </Button>

          {positions.map((pos) => (
            <Button
              key={pos.title}
              variant={selectedPosition === pos.title ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedPosition(pos.title)}
              className={selectedPosition === pos.title ? "bg-[#0A1128]" : ""}
            >
              {pos.title}
            </Button>
          ))}
        </div>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="active">
            Active ({acceptedStaff.length})
          </TabsTrigger>
          <TabsTrigger value="pending">
            Pending ({pendingStaff.length})
          </TabsTrigger>
          <TabsTrigger value="declined">
            Declined ({declinedStaff.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {acceptedStaff.length > 0 ? (
            <div className="space-y-3">
              {acceptedStaff.map((staff) => (
                <div key={staff.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">{staff.name}</h3>
                        {staff.status === "checked-in" && (
                          <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                            <Check className="h-3 w-3 mr-1" />
                            Checked In
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{staff.phone}</p>
                      <div className="flex items-center mt-1">
                        <span className="text-sm font-medium">
                          {staff.position}
                        </span>
                        {staff.payment && (
                          <span className="ml-2 text-xs text-gray-500">
                            • {staff.payment}
                          </span>
                        )}
                        {staff.checkedInTime && (
                          <span className="ml-2 text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {new Date(staff.checkedInTime).toLocaleTimeString()}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {staff.permissions.map((permission, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                          >
                            {permission.replace("_", " ")}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      {staff.status !== "checked-in" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600 border-green-600 hover:bg-green-50"
                          onClick={() =>
                            handleUpdateStaffStatus(staff.id, "checked-in")
                          }
                        >
                          Mark as Checked In
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="mt-2"
                        onClick={() => setSelectedStaffForMessage(staff)}
                      >
                        <Send className="h-4 w-4 mr-1" />
                        Message
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No active staff members found</p>
            </div>
          )}

          <div className="mt-4">
            <Button
              onClick={() => handleAddStaff()}
              className="w-full bg-[#0A1128]"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add New Staff Member
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {pendingStaff.length > 0 ? (
            <div className="space-y-3">
              {pendingStaff.map((staff) => (
                <div key={staff.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{staff.name}</h3>
                      <p className="text-sm text-gray-500">{staff.phone}</p>
                      <p className="text-sm font-medium mt-1">
                        {staff.position} {staff.payment && `• ${staff.payment}`}
                      </p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {staff.permissions.map((permission, index) => (
                          <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                          >
                            {permission.replace("_", " ")}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-green-600 border-green-600 hover:bg-green-50"
                        onClick={() =>
                          handleUpdateStaffStatus(staff.id, "accepted")
                        }
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-50"
                        onClick={() =>
                          handleUpdateStaffStatus(staff.id, "declined")
                        }
                      >
                        <X className="h-4 w-4 mr-1" />
                        Decline
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No pending staff requests</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="declined" className="space-y-4">
          {declinedStaff.length > 0 ? (
            <div className="space-y-3">
              {declinedStaff.map((staff) => (
                <div key={staff.id} className="border rounded-lg p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium">{staff.name}</h3>
                        <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full flex items-center">
                          <X className="h-3 w-3 mr-1" />
                          Declined
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{staff.phone}</p>
                      <p className="text-sm font-medium mt-1">
                        {staff.position} {staff.payment && `• ${staff.payment}`}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        handleUpdateStaffStatus(staff.id, "accepted")
                      }
                    >
                      Reconsider
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No declined staff requests</p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Position Request Drawer */}
      {isDrawerOpen && (
        <EventOrganizerDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          eventDetails={{
            title: eventTitle,
            date: eventDate,
            time: eventTime,
            permissions: selectedPosition
              ? getPermissionsForPosition(selectedPosition)
              : undefined,
          }}
          positions={positions}
          onAccept={handleAcceptStaffRequest}
          onDecline={() => setIsDrawerOpen(false)}
          isMemberNotification={
            phoneSearchQuery
              ? memberPhoneNumbers.includes(phoneSearchQuery)
              : false
          }
        />
      )}

      {/* Message Staff Modal */}
      {selectedStaffForMessage && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[90%] max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                Message to {selectedStaffForMessage.name}
              </h3>
              <button
                onClick={() => setSelectedStaffForMessage(null)}
                className="p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-1">Message</p>
                <Textarea
                  placeholder="Enter your message here..."
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="flex space-x-2">
                <Button
                  onClick={() => setSelectedStaffForMessage(null)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSendMessage}
                  className="flex-1 bg-[#0A1128]"
                  disabled={!messageText.trim()}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
