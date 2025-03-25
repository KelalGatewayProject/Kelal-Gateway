import React, { useState } from "react";
import { X, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import QRCodeGenerator from "./QRCodeGenerator";
import StaffRequestNotification from "./StaffRequestNotification";

interface NotificationDetailDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notification: {
    id: string;
    title: string;
    message: string;
    image?: string | null;
    timestamp: string;
    eventId?: string;
    hasPromotion?: boolean;
    isStaffRequest?: boolean;
    eventDetails?: {
      eventName: string;
      eventDate: string;
      eventTime: string;
      eventLocation: string;
      position: string;
      payment: string;
      organizerName: string;
    };
  } | null;
}

const demoNotification = {
  id: "demo-notification-1",
  title: "Free Drink Promotion!",
  message:
    "You've received a free drink promotion for tonight's event at Skybar Lounge. Show the QR code to the bartender.",
  timestamp: new Date().toISOString(),
  read: false,
  hasPromotion: true,
  eventId: "event-123",
  image:
    "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=800&q=80",
};

const NotificationDetailDrawer: React.FC<NotificationDetailDrawerProps> = ({
  isOpen,
  onClose,
  notification = null,
}) => {
  const [showQRCode, setShowQRCode] = useState(false);
  const activeNotification = notification || demoNotification;

  if (!isOpen) return null;

  const handleGetPromotion = () => setShowQRCode(!showQRCode);
  const handleCloseQRCode = () => setShowQRCode(false);

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      >
        <motion.div
          className="fixed top-[141px] right-0 w-[330px] h-[500px] bg-white rounded-l-[3%] shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden z-50"
          style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="font-bold text-lg">NOTIFICATION</h2>
            <button
              onClick={onClose}
              className="rounded-[3%] p-1 hover:bg-gray-100"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {activeNotification.isStaffRequest &&
          activeNotification.eventDetails ? (
            <div className="overflow-y-auto h-[calc(500px-64px)]">
              <StaffRequestNotification
                eventName={activeNotification.eventDetails.eventName}
                eventDate={activeNotification.eventDetails.eventDate}
                eventTime={activeNotification.eventDetails.eventTime}
                eventLocation={activeNotification.eventDetails.eventLocation}
                position={activeNotification.eventDetails.position}
                payment={activeNotification.eventDetails.payment}
                organizerName={activeNotification.eventDetails.organizerName}
                onAccept={() => {
                  console.log("Position accepted");
                  alert(
                    "You have accepted the position as " +
                      activeNotification.eventDetails.position +
                      " at " +
                      activeNotification.eventDetails.eventName,
                  );
                  onClose();
                }}
                onDecline={() => {
                  console.log("Position declined");
                  alert(
                    "You have declined the position as " +
                      activeNotification.eventDetails.position +
                      " at " +
                      activeNotification.eventDetails.eventName,
                  );
                  onClose();
                }}
              />
            </div>
          ) : (
            <div className="overflow-y-auto h-[calc(500px-64px-80px)]">
              {/* Banner Image at top */}
              {activeNotification.image && (
                <div className="w-full h-32 bg-gray-100 relative">
                  <img
                    src={activeNotification.image}
                    alt="Notification banner"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                    <h3 className="text-white font-medium text-sm">
                      {activeNotification.title}
                    </h3>
                  </div>
                </div>
              )}

              <div className="p-4">
                <h3 className="font-bold mb-2">{activeNotification.title}</h3>
                <p className="text-gray-700 text-sm mb-3">
                  {activeNotification.message}
                </p>

                <div className="text-xs text-gray-500 mb-4">
                  {new Date(activeNotification.timestamp).toLocaleString()}
                </div>

                <div className="bg-gray-100 p-3 rounded-lg text-sm">
                  <p className="font-semibold mb-1">Event Details</p>
                  <p>Skybar Lounge</p>
                  <p>Tonight at 8PM</p>
                </div>
              </div>
            </div>
          )}

          {activeNotification.hasPromotion && (
            <div className="p-4 border-t">
              <button
                onClick={handleGetPromotion}
                className="w-full bg-blue-600 text-white py-2 rounded-[3%] text-sm font-medium hover:bg-blue-700"
              >
                {showQRCode ? "Hide QR Code" : "Show QR Code"}
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* QR Code Drawer */}
      {showQRCode && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
          onClick={handleCloseQRCode}
        >
          <motion.div
            className="fixed top-[141px] right-0 w-[330px] h-[500px] bg-white rounded-l-[3%] shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden z-[60]"
            style={{ boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="font-bold text-lg">YOUR PROMOTION</h2>
              <button
                onClick={handleCloseQRCode}
                className="rounded-[3%] p-1 hover:bg-gray-100"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-4 flex flex-col items-center h-[calc(500px-64px)]">
              <div className="mb-4 text-center">
                <h3 className="font-bold mb-1">{activeNotification.title}</h3>
                <p className="text-sm text-gray-600">
                  Show this code to the bartender
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                    JSON.stringify({
                      eventId: activeNotification.eventId,
                      notificationId: activeNotification.id,
                    }),
                  )}`}
                  alt="Promotion QR Code"
                  className="w-40 h-40 mx-auto"
                />
              </div>

              <div className="text-xs text-gray-500 text-center mb-4">
                Valid until{" "}
                {new Date(
                  new Date().setDate(new Date().getDate() + 1),
                ).toLocaleDateString()}
              </div>

              {/* Added under-21 message */}
              <div className="text-xs text-gray-600 text-center italic">
                IF YOU ARE UNDER 21,
                <br />
                HAVE A SOFT DRINK ON US...
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default NotificationDetailDrawer;
