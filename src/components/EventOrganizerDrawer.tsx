import React, { useState } from "react";
import { X, Phone, User, Bell, Calendar, Clock, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface EventOrganizerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  eventDetails: {
    title: string;
    date: string;
    time: string;
    position?: string;
    payment?: string;
    permissions?: string[];
  };
  staffMember?: {
    name: string;
    phone: string;
  };
  positions?: Array<{
    title: string;
    filled: number;
    required: number;
    payment: string;
  }>;
  onAccept: (staffData: {
    name: string;
    phone: string;
    payment: string;
    position: string;
  }) => void;
  onDecline: () => void;
  isMemberNotification?: boolean;
}

const EventOrganizerDrawer: React.FC<EventOrganizerDrawerProps> = ({
  isOpen,
  onClose,
  eventDetails,
  staffMember,
  positions = [],
  onAccept,
  onDecline,
  isMemberNotification = false,
}) => {
  const [phoneNumber, setPhoneNumber] = useState(staffMember?.phone || "");
  const [staffName, setStaffName] = useState(staffMember?.name || "");
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isNameValid, setIsNameValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(
    eventDetails.position || "",
  );
  const [paymentAmount, setPaymentAmount] = useState(
    eventDetails.payment ||
      positions?.find((p) => p.title === eventDetails.position)?.payment ||
      "150",
  );
  const [isPaymentValid, setIsPaymentValid] = useState(true);

  // Get permissions based on position
  const positionPermissions =
    eventDetails.permissions || getDefaultPermissions(selectedPosition);

  // Function to get default permissions based on position
  function getDefaultPermissions(position: string): string[] {
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
  }

  if (!isOpen) return null;

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);
    // Simple validation - must be 10 digits
    setIsPhoneValid(value.replace(/\D/g, "").length === 10 || value === "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setStaffName(value);
    setIsNameValid(value.trim().length > 0);
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPaymentAmount(value);
    // Simple validation - must be a number
    setIsPaymentValid(/^\d+$/.test(value) || value === "");
  };

  const handleSubmit = () => {
    if (!phoneNumber || !isPhoneValid) {
      setIsPhoneValid(false);
      return;
    }

    if (!staffName || !isNameValid) {
      setIsNameValid(false);
      return;
    }

    if (!selectedPosition) {
      return;
    }

    if (!paymentAmount || !isPaymentValid) {
      setIsPaymentValid(false);
      return;
    }

    setIsSubmitting(true);

    // Check if the phone number is registered in the system
    const isMemberRegistered = isMemberNotification;

    // In a real app, this would be an API call to check if the phone number exists
    // For now, we're using the isMemberNotification prop as a simulation

    // Simulate API call
    setTimeout(() => {
      onAccept({
        name: staffName,
        phone: phoneNumber,
        payment: `${paymentAmount} ETB`,
        position: selectedPosition,
      });
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50">
      <div
        className="fixed right-0 top-[90px] w-[355px] h-[650px] bg-white rounded-l-lg shadow-lg"
        style={{ borderTopLeftRadius: "5%", borderBottomLeftRadius: "5%" }}
      >
        <div className="p-4 h-full flex flex-col">
          <div className="flex justify-end">
            <button onClick={onClose} className="p-1">
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Adjusted padding and spacing here */}
          <div className="flex-1 p-2">
            {" "}
            {/* Reduced padding from p-4 to p-2 */}
            <h2 className="text-xl font-bold mb-2">
              {isMemberNotification
                ? "Send Staff Request"
                : "Request Staff Member"}
            </h2>{" "}
            {/* Reduced margin-bottom */}
            <div className="space-y-2">
              {" "}
              {/* Reduced spacing between elements */}
              <div>
                <p className="text-sm font-medium text-gray-500">Event</p>
                <p className="font-medium">{eventDetails.title}</p>
              </div>
              <div className="flex space-x-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Date</p>
                  <p className="font-medium">{eventDetails.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Time</p>
                  <p className="font-medium">{eventDetails.time}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Position</p>
                {positions.length > 0 ? (
                  <div className="relative mt-1">
                    <select
                      value={selectedPosition}
                      onChange={(e) => setSelectedPosition(e.target.value)}
                      className="w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select a position</option>
                      {positions.map((pos) => (
                        <option key={pos.title} value={pos.title}>
                          {pos.title}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <p className="font-medium">{selectedPosition}</p>
                )}
              </div>
              {selectedPosition && (
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Permissions
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {positionPermissions.map((permission, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded"
                      >
                        {permission.replace("_", " ")}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Staff Member Name
                </p>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    type="text"
                    placeholder="Enter staff name"
                    className={`pl-10 ${!isNameValid ? "border-red-500" : ""}`}
                    value={staffName}
                    onChange={handleNameChange}
                  />
                </div>
                {!isNameValid && (
                  <p className="text-red-500 text-xs mt-1">
                    Please enter a staff name
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Staff Member Phone
                </p>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    type="tel"
                    inputMode="tel"
                    placeholder="Enter phone number"
                    className={`pl-10 ${!isPhoneValid ? "border-red-500" : ""}`}
                    value={phoneNumber}
                    onChange={handlePhoneChange}
                  />
                </div>
                {!isPhoneValid && (
                  <p className="text-red-500 text-xs mt-1">
                    Please enter a valid phone number
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Payment Amount (ETB)
                </p>
                <div className="relative">
                  <Input
                    type="text"
                    inputMode="numeric"
                    placeholder="Enter payment amount"
                    className={`${!isPaymentValid ? "border-red-500" : ""}`}
                    value={paymentAmount}
                    onChange={handlePaymentChange}
                  />
                </div>
                {!isPaymentValid && (
                  <p className="text-red-500 text-xs mt-1">
                    Please enter a valid payment amount
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Buttons section */}
          <div className="pt-2 pb-4 px-4 space-y-2">
            <Button
              onClick={handleSubmit}
              className="w-full bg-[#0A1128] text-white"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? "SENDING REQUEST..."
                : isMemberNotification
                  ? "SEND NOTIFICATION"
                  : "SEND REQUEST"}
            </Button>
            <Button
              onClick={onDecline}
              variant="outline"
              className="w-full border-[#0A1128] text-[#0A1128]"
              disabled={isSubmitting}
            >
              CANCEL
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventOrganizerDrawer;
