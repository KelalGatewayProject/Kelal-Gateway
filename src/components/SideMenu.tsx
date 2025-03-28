import React from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Calendar,
  Ticket,
  CreditCard,
  Award,
  Users,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * SideMenu Component
 *
 * This component renders a side menu with navigation options based on the user's role.
 * Different menu items are displayed for admin, organizer, and regular members.
 */
const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const { userRole, logout, isAdmin } = useAuth();
  const isOrganizer = userRole === "organizer";
  const navigate = useNavigate();

  // Demo sponsored events
  const sponsoredEvents = [
    {
      id: 1,
      title: "TGI Fridaze",
      venue: "Mint Lounge",
      date: "Aug 25, 2023",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80",
    },
    {
      id: 2,
      title: "Addis Music Festival",
      venue: "Ghion Hotel",
      date: "Sep 15, 2023",
      image:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=300&q=80",
    },
    {
      id: 3,
      title: "Sunday Brunch",
      venue: "Hyatt Regency",
      date: "Oct 10, 2023",
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&q=80",
    },
  ];

  // Handle navigation and close menu
  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  // Render menu items based on user role
  const renderMenuItems = () => {
    // Admin only sees the Admin Dashboard link in the side menu
    if (isAdmin) {
      return (
        <>
          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => handleNavigation("/admin-dashboard")}
          >
            <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <span className="font-semibold">ADMIN DASHBOARD</span>
          </div>
          {/* Standard member menu items */}
          {renderMemberMenuItems()}
        </>
      );
    }

    // Organizer sees the Organizer Dashboard link plus standard member items
    if (isOrganizer) {
      return (
        <>
          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => handleNavigation("/event-organizer-dashboard")}
          >
            <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <span className="font-semibold">ORGANIZER DASHBOARD</span>
          </div>
          {/* Standard member menu items */}
          {renderMemberMenuItems()}
        </>
      );
    }

    // Regular member menu items
    return renderMemberMenuItems();
  };

  // Standard menu items for all users (members)
  const renderMemberMenuItems = () => {
    return (
      <>
        {!isOrganizer && (
          <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={() => handleNavigation("/event-organizer-register")}
          >
            <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
              <Calendar className="h-5 w-5" />
            </div>
            <span className="font-semibold">BECOME AN ORGANIZER</span>
          </div>
        )}
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => handleNavigation("/my-tickets")}
        >
          <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
            <Ticket className="h-5 w-5" />
          </div>
          <span className="font-semibold">MY TICKETS</span>
        </div>
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => handleNavigation("/credits")}
        >
          <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
            <CreditCard className="h-5 w-5" />
          </div>
          <span className="font-semibold">CREDITS</span>
        </div>
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => handleNavigation("/credits")}
        >
          <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
            <Award className="h-5 w-5" />
          </div>
          <span className="font-semibold">CREDIT POINTS</span>
        </div>
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => handleNavigation("/invite-friends")}
        >
          <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
            <Users className="h-5 w-5" />
          </div>
          <span className="font-semibold">
            INVITE FRIENDS / EARN CASH CREDIT
          </span>
        </div>
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => handleNavigation("/app-settings")}
        >
          <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
            <Settings className="h-5 w-5" />
          </div>
          <span className="font-semibold">SETTINGS</span>
        </div>
      </>
    );
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={onClose}
        />
      )}

      {/* Side Menu */}
      <div
        className={`fixed top-[75px] left-0 w-[306px] h-[675px] bg-white z-40 shadow-[0_6px_6px_rgba(0,0,0,0.1)] transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{
          borderTopRightRadius: "3%",
          borderBottomRightRadius: "3%",
        }}
      >
        {/* Close Button */}
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="p-1">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Menu Items */}
        <div className="pt-6 px-8 pb-4 h-full flex flex-col">
          <div className="flex-1 space-y-6">{renderMenuItems()}</div>

          {/* Sponsored Events for Attendees / Recent Events for Organizers */}
          <div className="mt-auto">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm font-semibold">
                  {isOrganizer ? "YOUR RECENT EVENTS" : "SPONSORED"}
                </span>
              </div>
              <button onClick={logout} className="text-red-600 font-bold">
                LOG OUT
              </button>
            </div>

            {/* Scrollable Events */}
            <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
              {sponsoredEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex-shrink-0 w-[167.73px] h-[127.25px] rounded-lg overflow-hidden relative"
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2">
                    <h3 className="text-white font-bold text-sm">
                      {event.title}
                    </h3>
                    <p className="text-white text-xs">{event.venue}</p>
                    <p className="text-white text-xs">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
