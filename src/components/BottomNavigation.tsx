import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Calendar, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar } from "@/components/ui/avatar";

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const { userRole, userProfile } = useAuth();

  // Different navigation items based on user role
  const isOrganizer = userRole === "organizer";

  // Get current path without query parameters
  const currentPath = location.pathname.split("?")[0];

  // Get user avatar or use default
  const avatarUrl =
    userProfile?.avatar ||
    `https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile?.name || "user"}`;

  return (
    <nav className="bg-gray-100 border-t border-gray-200 fixed bottom-0 w-full z-20">
      <div className="flex justify-around items-center h-16">
        {/* HOME - Always first */}
        <Link
          to="/"
          className={`flex flex-col items-center ${currentPath === "/" || currentPath === "/home" ? "text-blue-600" : "text-gray-500"}`}
        >
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">HOME</span>
        </Link>

        {/* PROFILE - Moved to second position */}
        <Link
          to="/profile"
          className={`flex flex-col items-center ${currentPath === "/profile" ? "text-blue-600" : "text-gray-500"}`}
        >
          <div className="h-6 w-6 rounded-full overflow-hidden border border-gray-300">
            <img
              src={avatarUrl}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-xs mt-1">PROFILE</span>
        </Link>

        {isOrganizer ? (
          // Organizer-specific navigation items - CALENDAR becomes CREATE
          <>
            <Link
              to="/create-event"
              className={`flex flex-col items-center ${currentPath === "/create-event" || currentPath === "/create-event-form" || currentPath === "/event-approval" ? "text-blue-600" : "text-gray-500"}`}
            >
              <Calendar className="h-5 w-5" />
              <span className="text-xs mt-1">CREATE</span>
            </Link>
            <Link
              to="/event-organizer-dashboard"
              className={`flex flex-col items-center ${currentPath === "/event-organizer-dashboard" ? "text-blue-600" : "text-gray-500"}`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="text-xs mt-1">DASHBOARD</span>
            </Link>
          </>
        ) : (
          // Attendee-specific CALENDAR - Now third position
          <Link
            to="/calendar"
            className={`flex flex-col items-center ${currentPath === "/calendar" ? "text-blue-600" : "text-gray-500"}`}
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs mt-1">CALENDAR</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default BottomNavigation;
