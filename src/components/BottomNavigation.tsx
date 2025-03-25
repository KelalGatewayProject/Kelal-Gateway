import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, User, Calendar, LayoutDashboard, Ticket } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const { userRole } = useAuth();

  // Different navigation items based on user role
  const isOrganizer = userRole === "organizer";

  // Get current path without query parameters
  const currentPath = location.pathname.split("?")[0];

  return (
    <nav className="bg-gray-100 border-t border-gray-200 fixed bottom-0 w-full z-20">
      <div className="flex justify-around items-center h-16">
        <Link
          to="/"
          className={`flex flex-col items-center ${currentPath === "/" || currentPath === "/home" ? "text-blue-600" : "text-gray-500"}`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">Home</span>
        </Link>

        {isOrganizer ? (
          // Organizer-specific navigation items
          <>
            <Link
              to="/event-organizer-dashboard"
              className={`flex flex-col items-center ${currentPath === "/event-organizer-dashboard" ? "text-blue-600" : "text-gray-500"}`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="text-xs mt-1">Dashboard</span>
            </Link>
            <Link
              to="/create-event"
              className={`flex flex-col items-center ${currentPath === "/create-event" || currentPath === "/create-event-form" || currentPath === "/event-approval" ? "text-blue-600" : "text-gray-500"}`}
            >
              <Calendar className="h-5 w-5" />
              <span className="text-xs mt-1">Create</span>
            </Link>
          </>
        ) : (
          // Attendee-specific navigation items
          <>
            <Link
              to="/my-tickets"
              className={`flex flex-col items-center ${currentPath === "/my-tickets" ? "text-blue-600" : "text-gray-500"}`}
            >
              <Ticket className="h-5 w-5" />
              <span className="text-xs mt-1">Tickets</span>
            </Link>
            <Link
              to="/calendar"
              className={`flex flex-col items-center ${currentPath === "/calendar" ? "text-blue-600" : "text-gray-500"}`}
            >
              <Calendar className="h-5 w-5" />
              <span className="text-xs mt-1">Calendar</span>
            </Link>
          </>
        )}

        <Link
          to="/profile"
          className={`flex flex-col items-center ${currentPath === "/profile" ? "text-blue-600" : "text-gray-500"}`}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavigation;
