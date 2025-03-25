import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  BarChart2,
  Scan,
  ChevronRight,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import EventOrganizerDrawer from "@/components/EventOrganizerDrawer";

const EventOrganizerDashboard: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  // Check if we just created a new event
  useEffect(() => {
    const state = location.state as {
      newEventCreated?: boolean;
      isFirstEvent?: boolean;
      publishedEvent?: any;
    } | null;

    if (state?.newEventCreated) {
      // Show welcome message for first-time event creators
      if (state?.isFirstEvent) {
        setShowWelcomeMessage(true);
      }

      // If we have a newly published event, we could add it to the events list
      // In a real app, this would be handled by fetching updated data from the backend
      if (state?.publishedEvent) {
        console.log("New event published:", state.publishedEvent);
        // Here you would typically refresh your events data from the backend
        // For demo purposes, we could add it to the events array if needed
      }

      // Clear the state after processing
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Sample events data
  const events = [
    {
      id: "1",
      title: "Summer Music Festival",
      date: "Aug 15, 2023",
      time: "4:00 PM",
      location: "Central Park",
      attendees: 250,
      ticketsSold: 180,
      revenue: "ETB 5,400",
      positions: [
        { title: "Security", filled: true },
        { title: "Bartender", filled: false },
        { title: "Ticket Scanner", filled: true },
      ],
    },
    {
      id: "2",
      title: "Tech Conference 2023",
      date: "Sep 5, 2023",
      time: "9:00 AM",
      location: "Convention Center",
      attendees: 120,
      ticketsSold: 100,
      revenue: "ETB 3,000",
      positions: [
        { title: "Registration Desk", filled: true },
        { title: "AV Technician", filled: false },
        { title: "Host", filled: false },
      ],
    },
  ];

  const openPositionRequest = (event: any, position: string) => {
    setSelectedEvent({
      ...event,
      position: position,
      payment: "ETB 150",
    });
    setIsDrawerOpen(true);
  };

  const handleAcceptPosition = () => {
    // Logic to handle position acceptance
    setIsDrawerOpen(false);
  };

  const handleDeclinePosition = () => {
    // Logic to handle position decline
    setIsDrawerOpen(false);
  };

  return (
    <PageLayout>
      <div className="p-4 bg-white min-h-screen">
        {" "}
        {/* Main container with solid white background */}
        <h1 className="text-2xl font-bold mb-6">ORGANIZER DASHBOARD</h1>
        {/* Welcome message for first-time event creators */}
        {showWelcomeMessage && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  <span className="font-bold">
                    Welcome to your Event Organizer Dashboard!
                  </span>{" "}
                  Your first event has been created successfully. You can now
                  manage your events, track attendance, and more.
                </p>
                <button
                  onClick={() => setShowWelcomeMessage(false)}
                  className="mt-2 text-sm text-blue-700 hover:underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Your Events</h2>
          <Link to="/create-event">
            <Button className="bg-[#0A1128] text-white flex items-center gap-2">
              <span>+</span> CREATE NEW EVENT
            </Button>
          </Link>
        </div>
        {/* Show message when no events exist */}
        {events.length === 0 && (
          <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200 mb-4">
            <p className="text-gray-600 mb-4">
              You haven't created any events yet.
            </p>
            <Link to="/create-event">
              <Button className="bg-[#0A1128] text-white">
                Create Your First Event
              </Button>
            </Link>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-md hover:shadow-lg transition-shadow" // Solid white background with border and shadow
            >
              <div className="p-4 border-b border-gray-200 bg-white">
                {" "}
                {/* Header with solid white background */}
                <h3 className="text-lg font-bold">{event.title}</h3>
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

              <div className="grid grid-cols-3 divide-x border-b border-gray-200 bg-white">
                {" "}
                {/* Stats section with solid white background */}
                <div className="p-3 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <BarChart2 className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-sm font-medium">Tickets Sold</span>
                  </div>
                  <p className="font-bold">{event.ticketsSold}</p>
                </div>
                <div className="p-3 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-sm font-medium">CHECKED IN</span>
                  </div>
                  <p className="font-bold">{event.attendees}</p>
                </div>
                <div className="p-3 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <DollarSign className="h-4 w-4 mr-1 text-gray-500" />
                    <span className="text-sm font-medium">Revenue</span>
                  </div>
                  <p className="font-bold">{event.revenue}</p>
                </div>
              </div>

              <div className="p-4 bg-white flex justify-end">
                {" "}
                {/* Footer with solid white background */}
                <Link to={`/event-management/${event.id}`} className="w-full">
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-[#0A1128] hover:bg-gray-100"
                  >
                    <span>VIEW DETAILS</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <EventOrganizerDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          eventDetails={{
            title: selectedEvent.title,
            date: selectedEvent.date,
            time: selectedEvent.time,
            position: selectedEvent.position,
            payment: selectedEvent.payment,
          }}
          onAccept={handleAcceptPosition}
          onDecline={handleDeclinePosition}
        />
      )}
    </PageLayout>
  );
};

export default EventOrganizerDashboard;
