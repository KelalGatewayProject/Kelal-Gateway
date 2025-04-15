import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Check,
  Share2,
  Globe,
  ArrowLeft,
  Edit,
  Image as ImageIcon,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";

const EventApproval: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Use demo data if no event data is passed
  const eventData = location.state?.eventData || {
    // Demo event data
    organizerName: "Addis Music Festival",
    biography: "Bringing the best music to Addis Ababa since 2020",
    phoneNumber: "+251 91 234 5678",
    webAddress: "www.addismusicfest.com",
    instagram: "@addismusicfest",
    facebook: "@addismusicfestival",
    showOnMemberApp: "yes",
    eventName: "Summer Beats Festival 2023",
    eventSummary:
      "A day of amazing music, food, and culture in the heart of Addis Ababa",
    performers: ["DJ Abeba", "Ethio Band", "Habesha Beats", "Selam Sounds"],
    performerImages: [
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&q=80",
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80",
      "https://images.unsplash.com/photo-1501612780327-45045538702b?w=500&q=80",
      "https://images.unsplash.com/photo-1528111493914-3f98f1d33ab2?w=500&q=80",
    ],

    sponsors: ["Ambo Water", "Dashen Beer", "Commercial Bank", "Ethio Telecom"],
    sponsorImages: [
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=300&q=80",
      "https://images.unsplash.com/photo-1581281863883-2469417a1668?w=300&q=80",
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=300&q=80",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=300&q=80",
    ],

    startDate: "2023-07-15",
    startTime: "14:00",
    endDate: "2023-07-15",
    endTime: "23:00",
    category: "Music",
    venueName: "Millennium Hall",
    venuePhone: "+251 92 345 6789",
    venueAddress: "Bole Road, Addis Ababa",
    venueBanner:
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    eventType: "public",
    eventCost: "paid",
    ageRestriction: "over21",
    generalTicketPrice: "500",
    vipTicketPrice: "1500",
    ticketQuantity: "1000",
    eventBanner:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    organizerBanner:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
  };

  const isPublic = eventData.eventType === "public";

  const handleViewDashboard = () => {
    // Navigate to dashboard with state indicating a newly published event
    navigate("/event-organizer-dashboard", {
      state: {
        newEventCreated: true,
        publishedEvent: {
          id: eventData.eventId || Date.now().toString(),
          title: eventData.eventName,
          date: eventData.startDate,
          time: eventData.startTime,
          location: eventData.venueName,
        },
      },
    });
  };

  const handleEditEvent = () => {
    navigate("/create-event-form", { state: { eventData } });
  };

  const handleCopyLink = () => {
    // Generate a unique event link - in a real app this would be a proper unique URL
    const eventId = eventData.eventId || Date.now().toString();
    const eventLink = `https://app.kelal.com/event/${eventId}`;
    navigator.clipboard.writeText(eventLink);

    // Use a more user-friendly notification instead of alert
    try {
      navigator.clipboard.writeText(eventLink);
      // Show toast notification if available in your app
      if (window.toast) {
        window.toast({
          title: "Link Copied",
          description: "Event link copied to clipboard!",
          status: "success",
        });
      } else {
        alert("Event link copied to clipboard!");
      }
    } catch (error) {
      console.error("Failed to copy link:", error);
      alert("Failed to copy link. Please try again.");
    }
  };

  return (
    <PageLayout>
      <div className="p-4 pb-20">
        <div className="bg-white rounded-lg p-6 shadow-md mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">EVENT REVIEW</h2>
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={handleEditEvent}
            >
              <Edit size={16} />
              Edit Event
            </Button>
          </div>

          <div className="space-y-6">
            {/* Organizer Section */}
            <div className="border-b pb-4">
              <h3 className="font-bold text-lg mb-3">ORGANIZER</h3>
              {eventData.organizerBanner ? (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src={eventData.organizerBanner}
                    alt="Organizer Banner"
                    className="w-full h-40 object-cover"
                  />
                </div>
              ) : (
                <div className="mb-4 rounded-lg bg-gray-100 h-40 flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                  <p className="text-gray-500 ml-2">
                    No organizer banner uploaded
                  </p>
                </div>
              )}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>{eventData.organizerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Biography:</span>
                  <span className="text-right">{eventData.biography}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Phone:</span>
                  <span>{eventData.phoneNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Website:</span>
                  <span>{eventData.webAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Instagram:</span>
                  <span>{eventData.instagram}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Facebook:</span>
                  <span>{eventData.facebook}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Show on Member App:</span>
                  <span>
                    {eventData.showOnMemberApp === "yes" ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </div>

            {/* Event Details Section */}
            <div className="border-b pb-4">
              <h3 className="font-bold text-lg mb-3">EVENT DETAILS</h3>
              {eventData.eventBanner ? (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src={eventData.eventBanner}
                    alt="Event Banner"
                    className="w-full h-48 object-cover"
                  />
                </div>
              ) : (
                <div className="mb-4 rounded-lg bg-gray-100 h-40 flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                  <p className="text-gray-500 ml-2">No event banner uploaded</p>
                </div>
              )}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>{eventData.eventName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Summary:</span>
                  <span className="text-right">{eventData.eventSummary}</span>
                </div>
              </div>
            </div>

            {/* Performers & Sponsors */}
            <div className="border-b pb-4">
              <h3 className="font-bold text-lg mb-3">PERFORMERS & SPONSORS</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-3">Performers:</h4>
                  {eventData.performerImages &&
                  eventData.performerImages.filter((img) => img).length > 0 ? (
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {eventData.performerImages.map((image, index) => (
                        <div
                          key={index}
                          className="relative rounded-lg overflow-hidden"
                          style={{ minHeight: "100px" }}
                        >
                          <img
                            src={image}
                            alt={`Performer ${index + 1}`}
                            className="w-full h-24 object-cover bg-gray-100"
                            onError={(e) => {
                              e.currentTarget.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=performer-${index}`;
                            }}
                          />
                          {eventData.performers[index] && (
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-1 text-xs">
                              {eventData.performers[index]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : eventData.performers &&
                    eventData.performers.length > 0 ? (
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {eventData.performers
                        .filter((p) => p)
                        .map((performer, index) => (
                          <div
                            key={index}
                            className="relative rounded-lg overflow-hidden"
                            style={{ minHeight: "100px" }}
                          >
                            <img
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=performer-${index}`}
                              alt={`Performer ${index + 1}`}
                              className="w-full h-24 object-cover bg-gray-100"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-1 text-xs">
                              {performer}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="bg-gray-100 px-2 py-1 rounded-md text-sm">
                        No performers added
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-medium mb-3">Sponsors:</h4>
                  {eventData.sponsorImages &&
                  eventData.sponsorImages.filter((img) => img).length > 0 ? (
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {eventData.sponsorImages.map((logo, index) => (
                        <div
                          key={index}
                          className="relative rounded-lg overflow-hidden bg-white p-1 border border-gray-200"
                          style={{ minHeight: "90px" }}
                        >
                          <img
                            src={logo}
                            alt={`Sponsor ${index + 1}`}
                            className="w-full h-20 object-contain"
                            style={{ display: "block" }}
                            onError={(e) => {
                              e.currentTarget.src = `https://api.dicebear.com/7.x/identicon/svg?seed=sponsor-${index}`;
                            }}
                          />
                          {eventData.sponsors[index] && (
                            <div className="text-center mt-1 text-xs font-medium">
                              {eventData.sponsors[index]}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : eventData.sponsors && eventData.sponsors.length > 0 ? (
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {eventData.sponsors
                        .filter((s) => s)
                        .map((sponsor, index) => (
                          <div
                            key={index}
                            className="relative rounded-lg overflow-hidden bg-white p-1 border border-gray-200"
                            style={{ minHeight: "90px" }}
                          >
                            <img
                              src={`https://api.dicebear.com/7.x/identicon/svg?seed=sponsor-${index}`}
                              alt={`Sponsor ${index + 1}`}
                              className="w-full h-20 object-contain"
                            />
                            <div className="text-center mt-1 text-xs font-medium">
                              {sponsor}
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 px-2 py-1 rounded-md text-sm">
                        No sponsors added
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="border-b pb-4">
              <h3 className="font-bold text-lg mb-3">DATE & TIME</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Start:</span>
                  <span>
                    {eventData.startDate} at {eventData.startTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">End:</span>
                  <span>
                    {eventData.endDate} at {eventData.endTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Category:</span>
                  <span>{eventData.category || "Not specified"}</span>
                </div>
              </div>
            </div>

            {/* Venue */}
            <div className="border-b pb-4">
              <h3 className="font-bold text-lg mb-3">VENUE</h3>
              {eventData.venueBanner ? (
                <div className="mb-4 rounded-lg overflow-hidden">
                  <img
                    src={eventData.venueBanner}
                    alt="Venue Banner"
                    className="w-full h-40 object-cover"
                  />
                </div>
              ) : (
                <div className="mb-4 rounded-lg bg-gray-100 h-40 flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-gray-400" />
                  <p className="text-gray-500 ml-2">No venue image uploaded</p>
                </div>
              )}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Name:</span>
                  <span>{eventData.venueName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Phone:</span>
                  <span>{eventData.venuePhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Address:</span>
                  <span>{eventData.venueAddress}</span>
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="border-b pb-4">
              <h3 className="font-bold text-lg mb-3">ADDITIONAL DETAILS</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Event Type:</span>
                  <span className="capitalize">{eventData.eventType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Event Cost:</span>
                  <span className="capitalize">{eventData.eventCost}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Age Restriction:</span>
                  <span>
                    {eventData.ageRestriction === "over21"
                      ? "21+ Only"
                      : "Under 21 Allowed"}
                  </span>
                </div>
              </div>
            </div>

            {/* Ticket Prices */}
            <div>
              <h3 className="font-bold text-lg mb-3">TICKET PRICES</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">General Tickets:</span>
                  <span>
                    {eventData.generalTicketPrice
                      ? `${eventData.generalTicketPrice} ETB`
                      : "Free"}
                  </span>
                </div>
                {eventData.vipTicketPrice && (
                  <div className="flex justify-between">
                    <span className="font-medium">VIP Tickets:</span>
                    <span>{eventData.vipTicketPrice} ETB</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-medium">Ticket Quantity:</span>
                  <span>
                    {eventData.ticketQuantity
                      ? eventData.ticketQuantity
                      : "Unlimited"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Approval Section */}
        <div className="bg-white rounded-lg p-6 shadow-md mb-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="h-12 w-12 text-green-600" />
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4">
            READY TO PUBLISH YOUR EVENT?
          </h2>

          {isPublic ? (
            <div className="mb-6">
              <div className="flex justify-center mb-3">
                <Globe className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-gray-600 mb-4">
                Your event will be automatically published to the Members App.
                All members will be able to see and register for your event.
              </p>
            </div>
          ) : (
            <div className="mb-6">
              <div className="flex justify-center mb-3">
                <Share2 className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-gray-600 mb-4">
                Your private event will be created. You'll be able to share it
                with your friends and family using a private link.
              </p>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 mb-2"
                onClick={handleCopyLink}
              >
                COPY PRIVATE LINK
              </Button>
            </div>
          )}

          <Button
            className="w-full bg-[#0A1128] text-white py-3"
            onClick={handleViewDashboard}
          >
            PUBLISH & GO TO DASHBOARD
          </Button>

          {/* Back button to edit event */}
          <Button
            variant="ghost"
            className="w-full mt-2 text-gray-600"
            onClick={handleEditEvent}
          >
            Go Back to Edit
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default EventApproval;
