import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Menu, Bell, Search, User, Briefcase } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { NotificationDrawer } from "./NotificationDrawer";
import SideMenu from "./SideMenu";
import NotificationDetailDrawer from "./NotificationDetailDrawer";
import { useAuth } from "../context/AuthContext";

interface TopNavigationProps {
  toggleSideMenu: () => void;
  isNotificationDrawerOpen: boolean;
  toggleNotificationDrawer: () => void;
  allNotifications?: Array<{
    id: string;
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
    hasPromotion?: boolean;
  }>;
  openNotificationDetail: (notification: any) => void;
}

const TopNavigation: React.FC<TopNavigationProps> = ({
  toggleSideMenu,
  isNotificationDrawerOpen,
  toggleNotificationDrawer,
  allNotifications = [],
  openNotificationDetail,
}) => {
  const navigate = useNavigate();
  const { isOrganizer, setUserRole, userRole, isAuthenticated } = useAuth();
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [isNotificationDetailOpen, setIsNotificationDetailOpen] =
    useState(false);
  const [viewMode, setViewMode] = useState<"member" | "organizer">(
    userRole === "organizer" ? "organizer" : "member",
  );

  const handleSearchClick = () => {
    navigate("/search");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleToggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const handleToggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
  };

  const handleCloseSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  const handleCloseNotification = () => {
    setIsNotificationOpen(false);
  };

  const handleOpenNotificationDetail = (notification: any) => {
    // Add demo data for QR code generation
    const enhancedNotification = {
      ...notification,
      id: notification.id || "demo-notification-1",
      eventId: notification.eventId || "demo-event-123",
      hasPromotion:
        notification.hasPromotion !== undefined
          ? notification.hasPromotion
          : true,
      image:
        notification.image ||
        "https://images.unsplash.com/photo-1575444758702-4a6b9222336e?w=800&q=80",
      title: notification.title || "Free Drink Promotion!",
      message:
        notification.message ||
        "You've received a free drink promotion for tonight's event at Skybar Lounge. Click to view your QR code that can be scanned by the bartender.",
      timestamp: notification.timestamp || new Date().toISOString(),
      read: notification.read !== undefined ? notification.read : false,
    };
    setSelectedNotification(enhancedNotification);
    setIsNotificationDetailOpen(true);
    setIsNotificationOpen(false);
  };

  const handleCloseNotificationDetail = () => {
    setIsNotificationDetailOpen(false);
  };

  // Toggle between member and organizer views
  const toggleViewMode = () => {
    const newMode = viewMode === "member" ? "organizer" : "member";
    setViewMode(newMode);
    localStorage.setItem("viewMode", newMode);

    // If switching to organizer view and user is not already an organizer,
    // navigate to organizer registration
    if (newMode === "organizer" && !isOrganizer) {
      navigate("/event-organizer-register");
      return;
    }

    // Update the user role in context if needed
    if (newMode === "organizer" && userRole !== "organizer") {
      setUserRole("organizer");
    } else if (newMode === "member" && userRole !== "attendee") {
      setUserRole("attendee");
    }
  };

  // Load saved view mode from localStorage on component mount
  useEffect(() => {
    if (isAuthenticated) {
      const savedViewMode = localStorage.getItem("viewMode") as
        | "member"
        | "organizer"
        | null;
      if (savedViewMode) {
        setViewMode(savedViewMode);

        // If saved mode is organizer but user is not an organizer, reset to member view
        if (savedViewMode === "organizer" && !isOrganizer) {
          setViewMode("member");
          localStorage.setItem("viewMode", "member");
        }
      } else {
        // Default to member view if nothing is saved
        setViewMode("member");
        localStorage.setItem("viewMode", "member");
      }
    }
  }, [isAuthenticated, isOrganizer]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-40 flex items-center justify-between px-4">
        {/* Kelal Logo - Far Left */}
        <div className="flex items-center">
          <button onClick={handleLogoClick} className="focus:outline-none">
            <img
              src="https://imgur.com/IblnJgd.png"
              alt="Kelal Logo"
              className="h-10 w-10 cursor-pointer hover:opacity-80 transition-opacity"
            />
          </button>
        </div>

        {/* Member/Organizer Toggle - Center */}
        {isAuthenticated && isOrganizer && (
          <div className="flex items-center justify-center">
            <div className="flex bg-gray-100 rounded-full p-1">
              <button
                onClick={() => viewMode !== "member" && toggleViewMode()}
                className={`flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${viewMode === "member" ? "bg-white shadow-sm text-gray-800" : "text-gray-500 hover:text-gray-700"}`}
              >
                <User className="h-4 w-4 mr-1" />
                Member
              </button>
              <button
                onClick={() => viewMode !== "organizer" && toggleViewMode()}
                className={`flex items-center px-3 py-1 rounded-full text-sm font-medium transition-colors ${viewMode === "organizer" ? "bg-white shadow-sm text-gray-800" : "text-gray-500 hover:text-gray-700"}`}
              >
                <Briefcase className="h-4 w-4 mr-1" />
                Organizer
              </button>
            </div>
          </div>
        )}

        {/* Right Side Icons - Menu, Bell, Search */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleToggleSideMenu}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </button>

          <button
            onClick={handleToggleNotification}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 relative"
            aria-label="Notifications"
          >
            <Bell className="h-6 w-6 text-gray-700" />
            {allNotifications?.some((n) => !n.read) && (
              <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
            )}
          </button>

          <button
            onClick={handleSearchClick}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300"
            aria-label="Search"
          >
            <Search className="h-6 w-6 text-gray-700" />
          </button>
        </div>
      </header>

      {/* Side Menu */}
      <SideMenu isOpen={isSideMenuOpen} onClose={handleCloseSideMenu} />

      {/* Notification Detail Drawer */}
      <NotificationDetailDrawer
        isOpen={isNotificationDetailOpen}
        onClose={handleCloseNotificationDetail}
        notification={selectedNotification}
      />

      {/* Notification Drawer with exact specifications */}
      <AnimatePresence>
        {isNotificationOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50"
            onClick={handleCloseNotification}
          >
            <motion.div
              className="fixed right-0 w-[330px] h-[500px] bg-white rounded-[3%] shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden z-50"
              style={{
                top: "141px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              }}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="font-bold text-lg">NOTIFICATIONS</h2>
                <button
                  onClick={handleCloseNotification}
                  className="rounded-[3%] p-1 hover:bg-gray-100"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="overflow-y-auto h-[calc(447px-64px)]">
                {allNotifications.length > 0 ? (
                  <div className="p-2">
                    {allNotifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`mb-3 p-3 bg-gray-800 rounded-[3%] cursor-pointer transition-all hover:bg-gray-700 ${
                          !notification.read ? "ring-2 ring-blue-400" : ""
                        }`}
                        onClick={() =>
                          handleOpenNotificationDetail(notification)
                        }
                      >
                        <div className="text-white">
                          <p className="font-medium text-sm line-clamp-1">
                            {notification.title}
                          </p>
                          <p className="text-xs text-gray-300 line-clamp-2 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-xs text-gray-400">
                              {new Date(
                                notification.timestamp,
                              ).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                            {notification.hasPromotion && (
                              <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                                Promotion
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-2">
                    <div
                      className="mb-3 p-3 bg-gray-800 rounded-[3%] cursor-pointer transition-all hover:bg-gray-700 ring-2 ring-blue-400"
                      onClick={() =>
                        handleOpenNotificationDetail({
                          id: "demo-notification-1",
                          title: "Free Drink Promotion!",
                          message:
                            "You've received a free drink promotion for tonight's event at Skybar Lounge. Click to view your QR code.",
                          timestamp: new Date().toISOString(),
                          read: false,
                          hasPromotion: true,
                        })
                      }
                    >
                      <div className="text-white">
                        <p className="font-medium text-sm line-clamp-1">
                          Free Drink Promotion!
                        </p>
                        <p className="text-xs text-gray-300 line-clamp-2 mt-1">
                          You've received a free drink promotion for tonight's
                          event at Skybar Lounge. Click to view your QR code.
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xs text-gray-400">
                            {new Date().toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full">
                            Promotion
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Staff Position Request Demo Notification */}
                    <div
                      className="mb-3 p-3 bg-gray-800 rounded-[3%] cursor-pointer transition-all hover:bg-gray-700 ring-2 ring-blue-400"
                      onClick={() =>
                        handleOpenNotificationDetail({
                          id: "staff-request-demo",
                          title: "Staff Position Request",
                          message:
                            "You've been invited to work as a Ticket Scanner at Summer Music Festival on August 15, 2023.",
                          timestamp: new Date().toISOString(),
                          read: false,
                          isStaffRequest: true,
                          eventDetails: {
                            eventName: "Summer Music Festival",
                            eventDate: "August 15, 2023",
                            eventTime: "4:00 PM - 10:00 PM",
                            eventLocation: "Central Park, New York",
                            position: "Ticket Scanner",
                            payment: "$120",
                            organizerName: "Event Masters Inc.",
                          },
                        })
                      }
                    >
                      <div className="text-white">
                        <p className="font-medium text-sm line-clamp-1">
                          Staff Position Request
                        </p>
                        <p className="text-xs text-gray-300 line-clamp-2 mt-1">
                          You've been invited to work as a Ticket Scanner at
                          Summer Music Festival on August 15, 2023.
                        </p>
                        <div className="flex justify-between items-center mt-2">
                          <p className="text-xs text-gray-400">
                            {new Date().toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                          <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                            Job Offer
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopNavigation;
