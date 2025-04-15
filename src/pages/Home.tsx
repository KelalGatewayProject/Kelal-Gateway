import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import TopNavigation from "@/components/TopNavigation";
import BottomNavigation from "@/components/BottomNavigation";
import CategoryButton from "@/components/CategoryButton";
import EventCard from "@/components/EventCard";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/context/AuthContext";

interface Event {
  id: string | number;
  image: string;
  title: string;
  description: string;
  date: string;
  time: string;
  price: string;
  categories?: string[];
  to?: string;
  venue_name?: string;
  organizer_name?: string;
}

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const [activeCategory, setActiveCategory] = useState<string>("ALL EVENTS");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [featuredEvents, setFeaturedEvents] = useState<Event[]>([]);

  useEffect(() => {
    console.log("Home component rendered");
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("events")
        .select(
          `
          id,
          title,
          description,
          event_date,
          start_time,
          price,
          image_url,
          categories,
          venue:venues(name),
          organizer:organizers(name)
        `,
        )
        .order("created_at", { ascending: false })
        .limit(10);

      if (error) {
        console.error("Error fetching events:", error);
        return;
      }

      if (data) {
        const formattedEvents = data.map((event) => {
          // Format the date
          const eventDate = new Date(event.event_date);
          const formattedDate = eventDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          });

          // Format the time
          const timeString = event.start_time || "00:00:00";
          const [hours, minutes] = timeString.split(":");
          const hour = parseInt(hours, 10);
          const ampm = hour >= 12 ? "PM" : "AM";
          const formattedHour = hour % 12 || 12;
          const formattedTime = `${formattedHour}:${minutes} ${ampm}`;

          // Format the price
          const formattedPrice = event.price === 0 ? "FREE" : `${event.price}`;

          return {
            id: event.id,
            title: event.title,
            description: event.description,
            date: formattedDate,
            time: formattedTime,
            price: formattedPrice,
            image:
              event.image_url ||
              "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=300&q=80",
            categories: event.categories || [],
            to: `/event/${event.id}`,
            venue_name: event.venue?.name,
            organizer_name: event.organizer?.name,
          };
        });

        setFeaturedEvents(formattedEvents);
      }
    } catch (error) {
      console.error("Error in fetchEvents:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback demo events data with categories
  const allEvents = [
    {
      id: 1,
      image: "https://imgur.com/HQ6DO2e.png",
      title: "JULIAN MARLEY",
      description: "Festival lovers, families, reggae lovers!!!",
      date: "July 20",
      time: "7:00 PM",
      price: "FREE",
      categories: ["MUSIC", "ARTS & CULTURE"],
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=300&q=80",
      title: "LinkUp Bazaar",
      description:
        "Two-day bazaar and family festival with more than 85 vendors",
      date: "Oct 22",
      time: "9:00 AM",
      price: "FREE",
      categories: ["FOOD & DRINKS", "ARTS & CULTURE", "BUSINESS"],
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&q=80",
      title: "TGI Fridaze",
      description: "The best Friday night party in town!",
      date: "Aug 25",
      time: "10:00 PM",
      price: "FREE",
      categories: ["NIGHTLIFE", "MUSIC"],
    },
    {
      id: 4,
      image:
        "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&q=80",
      title: "Addis Music Festival",
      description:
        "Annual music festival featuring top local and international artists",
      date: "Sep 15",
      time: "4:00 PM",
      price: "FREE",
      categories: ["MUSIC", "ARTS & CULTURE"],
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&q=80",
      title: "Sunday Brunch",
      description: "Gourmet brunch with unlimited mimosas",
      date: "Oct 10",
      time: "11:00 AM",
      price: "FREE",
      categories: ["FOOD & DRINKS"],
    },
  ];

  // Fallback featured events data in case the API call fails
  const fallbackEvents = [
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=300&q=80",
      title: "አሁድ mood",
      description: "Following that, enjoy a delicious BBQ pop-up...",
      date: "October 13",
      time: "2:30 PM",
      price: "FREE",
      to: "/event/2",
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=300&q=80",
      title: "Jubilation Africa",
      description: "Afrocentric celebration featuring top DJs...",
      date: "March 23",
      time: "4:00 PM",
      price: "FREE",
      to: "/event/3",
    },
    {
      id: 1,
      image: "https://imgur.com/HQ6DO2e.png",
      title: "JULIAN MARLEY",
      description: "Festival lovers, families, reggae lovers!!!",
      date: "July 20",
      time: "7:00 PM",
      price: "FREE",
      to: "/event/1",
    },
    {
      id: "bazaar",
      image:
        "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=300&q=80",
      title: "LINKUP BAZAAR & FAMILY FEST",
      description:
        "LinkUp Bazaar is back bigger and better! The monthly bazaar has got a new home at the stunningly beautiful...",
      date: "OCT 12-13",
      time: "9:00 AM",
      price: "FREE",
      to: "/event/bazaar",
    },
    {
      id: 5,
      image:
        "https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5?w=300&q=80",
      title: "4th Annual Walk",
      description: "Time to lace up those walking shoes for Breast Cancer...",
      date: "October 23",
      time: "9:00 AM",
      price: "FREE",
      to: "/event/5",
    },
  ];

  const handleExploreMoreClick = () => {
    navigate("/category/ALL%20EVENTS");
  };

  // Render different content based on user role
  const renderContent = () => {
    if (userRole === "organizer") {
      return renderOrganizerDashboard();
    } else {
      return renderAttendeeHome();
    }
  };

  // Organizer dashboard content
  const renderOrganizerDashboard = () => {
    return (
      <div className="pb-16">
        <div className="p-4 bg-white rounded-lg shadow-md mb-4">
          <h2 className="text-xl font-bold mb-2">Welcome, Event Organizer!</h2>
          <p className="text-gray-600 mb-4">
            Manage your events and track ticket sales from your dashboard.
          </p>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h3 className="font-semibold">Active Events</h3>
              <p className="text-2xl font-bold">3</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h3 className="font-semibold">Tickets Sold</h3>
              <p className="text-2xl font-bold">127</p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/event-organizer-dashboard")}
            className="w-full bg-[#0A1128]"
          >
            Go to Dashboard
          </Button>
        </div>

        <div className="p-4">
          <h2 className="text-lg font-bold mb-4">YOUR RECENT EVENTS</h2>
          <div className="space-y-4">
            {fallbackEvents.slice(0, 3).map((event) => (
              <div
                key={event.id}
                className="mb-4"
                onClick={() => navigate(`/event/${event.id}`)}
              >
                <EventCard
                  image={event.image}
                  title={event.title}
                  description={event.description}
                  date={event.date}
                  time={event.time}
                  price={
                    event.price === "FREE" ? (
                      <span className="text-green-500 font-semibold">FREE</span>
                    ) : (
                      <span className="text-red-500 font-semibold">
                        {event.price}
                      </span>
                    )
                  }
                  onFollow={() =>
                    console.log(`Following event: ${event.title}`)
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Attendee home content
  const renderAttendeeHome = () => {
    return (
      <div className="flex-1 pb-16">
        {/* Newly Added Events */}
        <div className="px-3 pt-0">
          <h2 className="text-lg font-bold mb-4">NEWLY ADDED EVENTS</h2>
          {/* Event List */}
          <div className="space-y-4">
            {isLoading ? (
              // Loading state
              <div className="flex flex-col space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-md h-20 animate-pulse"
                  >
                    <div className="flex">
                      <div className="w-20 h-20 bg-gray-200"></div>
                      <div className="p-2 flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                        <div className="flex justify-between mt-1">
                          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : featuredEvents.length > 0 ? (
              // Event Cards
              featuredEvents.map((event, index) => (
                <React.Fragment key={event.id}>
                  {index === 2 && (
                    /* Sponsored Ad after the second event */
                    <div className="bg-transparent mb-0">
                      <div className="flex justify-center mx-auto">
                        <span className="text-xs text-gray-500 uppercase tracking-wider">
                          SPONSORED
                        </span>
                        <img
                          src="https://imgur.com/A8mPpar.png"
                          alt="St.George Beer"
                          className="h-25 object-contain"
                        />
                      </div>
                    </div>
                  )}
                  <div onClick={() => navigate(`/event/${event.id}`)}>
                    <EventCard
                      image={event.image}
                      title={event.title}
                      description={event.description}
                      date={event.date}
                      time={event.time}
                      price={
                        event.price === "FREE" ? (
                          <span className="text-green-500 font-semibold">
                            FREE
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            {event.price}
                          </span>
                        )
                      }
                      onFollow={() =>
                        console.log(`Following event: ${event.title}`)
                      }
                    />
                  </div>
                </React.Fragment>
              ))
            ) : (
              // Fallback to demo events if no events from API
              fallbackEvents.map((event, index) => (
                <React.Fragment key={event.id}>
                  {index === 2 && (
                    /* Sponsored Ad after the second event */
                    <div className="bg-transparent mb-0">
                      <div className="flex justify-center mx-auto">
                        <span className="text-xs text-gray-500 uppercase tracking-wider absolute left-0 top-0">
                          SPONSORED
                        </span>
                        <img
                          src="https://imgur.com/A8mPpar.png"
                          alt="St.George Beer"
                          className="h-25 object-contain"
                        />
                      </div>
                    </div>
                  )}
                  <div onClick={() => navigate(`/event/${event.id}`)}>
                    <EventCard
                      image={event.image}
                      title={event.title}
                      description={event.description}
                      date={event.date}
                      time={event.time}
                      price={
                        event.price === "FREE" ? (
                          <span className="text-green-500 font-semibold">
                            FREE
                          </span>
                        ) : (
                          <span className="text-red-500 font-semibold">
                            {event.price}
                          </span>
                        )
                      }
                      onFollow={() =>
                        console.log(`Following event: ${event.title}`)
                      }
                    />
                  </div>
                </React.Fragment>
              ))
            )}
          </div>
        </div>

        {/* EXPLORE MORE EVENTS Button */}
        <div className="flex justify-center my-6">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleExploreMoreClick();
            }}
            className="bg-[#030F29] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#E64A19] transition-colors event-fix"
          >
            EXPLORE MORE EVENTS
          </button>
        </div>

        {/* Venues & Clubs */}
        <div className="my-6 px-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">VENUES & CLUBS</h2>
            <ChevronRight
              className="h-6 w-6 cursor-pointer"
              onClick={() => navigate("/venues-and-clubs")}
            />
          </div>

          {/* Scrollable Container - Horizontal Scroll */}
          <div className="overflow-x-auto pb-2 -mx-3 px-3">
            <div className="flex space-x-6 w-max">
              {[
                {
                  name: "THE VENUE\nWARHOUSE",
                  image: "https://imgur.com/s9EMYLA.png",
                },
                {
                  name: "FLIRT\nLOUNGE",
                  image: "https://imgur.com/S5NMv0m.png",
                },
                {
                  name: "V\nLOUNGE",
                  image: "https://imgur.com/xHIYcsg.png",
                },
                {
                  name: "XO\nCLUB",
                  image: "https://imgur.com/Zrd6FQ2.png",
                },
                {
                  name: "LUXX\nADDIS",
                  image: "https://imgur.com/k7LHzWB.png",
                },
              ].map((venue, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-[102px] h-[141px] bg-white p-2 rounded-lg border border-gray-200 shadow-md flex-shrink-0 cursor-pointer"
                  style={{
                    boxShadow: "0 9px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={() => console.log(`Clicked on venue: ${venue.name}`)}
                >
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-2">
                    <img
                      src={venue.image}
                      alt={venue.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="text-xs text-center font-semibold whitespace-pre-wrap">
                    {venue.name}
                  </span>
                  <Button
                    variant="outline"
                    className="mt-1 text-xs py-0 h-6 rounded-full bg-black text-white border-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`Following venue: ${venue.name}`);
                    }}
                  >
                    Follow
                  </Button>
                </div>
              ))}

              {/* Standalone "See All Venues" Icon */}
              <div
                className="flex flex-col items-center min-w-[60px] justify-center cursor-pointer"
                onClick={() => navigate("/venues-and-clubs")}
              >
                <div
                  className="rounded-full w-[61px] h-[61px] flex items-center justify-center"
                  style={{
                    boxShadow: "0 9px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                    src="https://imgur.com/7AY4Tqx.png"
                    alt="See All Venues"
                    className="w-[34px] h-[34px] object-contain"
                  />
                </div>
                <span className="text-xs text-center font-semibold mt-1">
                  SEE ALL <br /> VENUES
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Event Organizers */}
        <div className="my-6 px-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">EVENT ORGANIZERS</h2>
            <ChevronRight
              className="h-6 w-6 cursor-pointer"
              onClick={() => navigate("/event-organizers")}
            />
          </div>

          {/* Scrollable Container - Horizontal Scroll */}
          <div className="overflow-x-auto pb-2 -mx-3 px-3">
            <div className="flex space-x-6 w-max">
              {[
                {
                  name: "SHEGA EVENTS\nAND PROMOTION",
                  image: "https://imgur.com/ve0BjeU.png",
                },
                {
                  name: "RIDON\nEVENTS",
                  image: "https://imgur.com/aQAfLTV.png",
                },
                {
                  name: "CHIMP\nEVENTS",
                  image: "https://imgur.com/mM6u8Nq.png",
                },
                {
                  name: "DANNY\nDAVIS",
                  image: "https://imgur.com/HdlpvTQ.png",
                },
                {
                  name: "LINKLUP\nADDIS",
                  image: "https://imgur.com/s8Z8dkV.png",
                },
              ].map((organizer, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-[111px] h-[170px] bg-white p-2 rounded-lg border border-gray-200 flex-shrink-0 cursor-pointer"
                  style={{
                    boxShadow: "0 0px 0px rgba(0, 0, 0, 0.1)",
                  }}
                  onClick={() =>
                    console.log(`Clicked on organizer: ${organizer.name}`)
                  }
                >
                  <div
                    className="rounded-lg w-[111px] h-[109px] overflow-hidden mb-2"
                    style={{
                      boxShadow: "0 9px 6px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <img
                      src={organizer.image}
                      alt={organizer.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <span className="text-xs text-center font-semibold whitespace-pre-wrap">
                    {organizer.name}
                  </span>
                  <Button
                    variant="outline"
                    className="mt-2 text-xs py-0 h-6 rounded-full bg-black text-white border-none"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(`Following organizer: ${organizer.name}`);
                    }}
                  >
                    Follow
                  </Button>
                </div>
              ))}

              {/* Standalone "See All Organizers" Icon */}
              <div
                className="flex flex-col items-center min-w-[60px] justify-center cursor-pointer"
                onClick={() => navigate("/event-organizers")}
              >
                <div
                  className="rounded-full w-[61px] h-[61px] flex items-center justify-center"
                  style={{
                    boxShadow: "0 9px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <img
                    src="https://imgur.com/7AY4Tqx.png"
                    alt="See All Organizers"
                    className="w-[34px] h-[34px] object-contain"
                  />
                </div>
                <span className="text-xs text-center font-semibold mt-1">
                  SEE ALL <br /> ORGANIZERS
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Text */}
        <div className="text-center text-xs text-gray-500 pb-0">
          © Copyright 2025 KELAL GATEWAY
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Background Image with Opacity */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(https://imgur.com/9NT8Cbi.png)",
          opacity: "0.1",
        }}
      />

      <TopNavigation />

      {/* Header Sections - Only show for non-organizers */}
      {userRole !== "organizer" && (
        <div className="sticky top-[57px] left-0 right-0 z-10 bg-[#fefdfb] shadow-sm">
          {/* Small shadow to cover any potential gap */}
          <div className="absolute -top-1 left-0 right-0 h-1 bg-[#fefdfb]"></div>

          {/* Categories Section */}
          <section className="border-b border-gray-200 w-full pt-1">
            <div className="flex overflow-x-auto p-3 gap-2 scrollbar-hide w-full">
              <CategoryButton to="/category/ALL%20EVENTS" label="All Events" />
              <CategoryButton
                to="/category/NIGHTLIFE"
                iconUrl="https://kelalgateway.et/wp-content/uploads/2025/03/PARTIES.png"
                label="PARTIES"
              />
              <CategoryButton
                to="/category/MUSIC"
                iconUrl="https://kelalgateway.et/wp-content/uploads/2025/03/CONCERT.png"
                label="CONCERT"
              />
              <CategoryButton
                to="/category/ARTS%20%26%20CULTURE"
                iconUrl="https://kelalgateway.et/wp-content/uploads/2025/03/ACTIVITIES.png"
                label="ACTIVITIES"
              />
              <CategoryButton
                to="/category/FESTIVALS"
                iconUrl="https://kelalgateway.et/wp-content/uploads/2025/03/FESITIVALS3.webp"
                label="FESTIVALS"
              />
              <CategoryButton
                to="/category/BUSINESS"
                iconUrl="https://kelalgateway.et/wp-content/uploads/2025/03/CONVENTIONS.png"
                label="CONVENTIONS"
              />
              <CategoryButton
                to="/category/NETWORKING"
                iconUrl="https://kelalgateway.et/wp-content/uploads/2025/03/NETWORKING.png"
                label="NETWORKING"
              />
              <CategoryButton
                to="/category/SPORTS"
                iconUrl="https://kelalgateway.et/wp-content/uploads/2025/03/SPORTS.png"
                label="SPORTS"
              />
              <CategoryButton to="/category/SCHOOL" icon="🎓" label="SCHOOL" />
            </div>
            {/* Black Line */}
            <div className="border-b border-black"></div>
          </section>
        </div>
      )}

      {/* Main Content - Conditionally render based on user role */}
      <main className="flex-1 overflow-y-auto relative z-0 mt-[85px]">
        {/* Added mt-[115px] to push content down */}
        <div className={userRole === "organizer" ? "pt-2 pb-10" : "pb-10"}>
          {renderContent()}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default Home;
