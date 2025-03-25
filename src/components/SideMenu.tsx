import React from "react";
import { Link } from "react-router-dom";
import {
  X,
  Calendar,
  Ticket,
  CreditCard,
  Award,
  Users,
  Settings,
  LayoutDashboard,
  FileText,
  CheckSquare,
  BarChart,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onClose }) => {
  const { userRole, logout } = useAuth();
  const isOrganizer = userRole === "organizer";

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
        className={`fixed top-[40px] left-0 w-[306px] h-[694px] bg-white z-40 shadow-[0_6px_6px_rgba(0,0,0,0.1)] transition-transform duration-300 ${
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
        <div className="pt-16 px-6 pb-4 h-full flex flex-col">
          <div className="flex-1 space-y-8">
            {isOrganizer ? (
              // Organizer Menu Items
              <>
                <Link
                  to="/event-organizer-dashboard"
                  className="flex items-center space-x-4"
                  onClick={onClose}
                >
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                    <LayoutDashboard className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">ORGANIZER DASHBOARD</span>
                </Link>
                <Link
                  to="/create-event"
                  className="flex items-center space-x-4"
                  onClick={onClose}
                >
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">CREATE NEW EVENT</span>
                </Link>
                <Link
                  to="/event-approval"
                  className="flex items-center space-x-4"
                  onClick={onClose}
                >
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                    <CheckSquare className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">EVENT APPROVALS</span>
                </Link>
                <Link
                  to="/my-tickets"
                  className="flex items-center space-x-4"
                  onClick={onClose}
                >
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                    <Ticket className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">TICKET MANAGEMENT</span>
                </Link>
                <Link
                  to="/wallet"
                  className="flex items-center space-x-4"
                  onClick={onClose}
                >
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                    <BarChart className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">SALES ANALYTICS</span>
                </Link>
                <Link
                  to="/app-settings"
                  className="flex items-center space-x-4"
                  onClick={onClose}
                >
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                    <Settings className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">SETTINGS</span>
                </Link>
              </>
            ) : (
              // Attendee Menu Items
              <>
                <Link
                  to={
                    isOrganizer ? "/create-event" : "/event-organizer-register"
                  }
                  className="flex items-center space-x-4"
                  onClick={onClose}
                >
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">
                    {isOrganizer ? "CREATE EVENT" : "BECOME AN ORGANIZER"}
                  </span>
                </Link>
                <Link
                  to="/my-tickets"
                  className="flex items-center space-x-4"
                  onClick={onClose}
                >
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                    <Ticket className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">MY TICKETS</span>
                </Link>
                <Link
                  to="/wallet"
                  className="flex items-center space-x-4"
                  onClick={onClose}
                >
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">WALLET</span>
                </Link>
                <Link
                  to="/credits"
                  className="flex items-center space-x-4"
                  onClick={onClose}
                >
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                    <Award className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">CREDIT POINTS</span>
                </Link>
                <Link
                  to="/invite-friends"
                  className="flex items-center space-x-4"
                  onClick={onClose}
                >
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">
                    INVITE FRIENDS / EARN CASH CREDIT
                  </span>
                </Link>
                <Link
                  to="/app-settings"
                  className="flex items-center space-x-4"
                  onClick={onClose}
                >
                  <div className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center">
                    <Settings className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">SETTINGS</span>
                </Link>
              </>
            )}
          </div>

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
