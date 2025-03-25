import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import EventCard from "@/components/EventCard";

interface CategoryEventsProps {
  categoryParam?: string;
}

const CategoryEvents: React.FC<CategoryEventsProps> = ({ categoryParam }) => {
  const params = useParams<{ category: string }>();
  // Use the prop if provided (for storyboards), otherwise use the URL param
  const category = categoryParam || params.category;
  const decodedCategory = category
    ? decodeURIComponent(category)
    : "ALL EVENTS";

  const [activeCategory, setActiveCategory] = useState<string>(decodedCategory);

  useEffect(() => {
    setActiveCategory(decodedCategory);
  }, [decodedCategory]);

  // Categories for events
  const categories = [
    "ALL EVENTS",
    "MUSIC",
    "FOOD & DRINKS",
    "NIGHTLIFE",
    "ARTS & CULTURE",
    "SPORTS",
    "BUSINESS",
    "NETWORKING",
    "FESTIVALS",
    "SCHOOL",
  ];

  // Demo events data with categories
  const allEvents = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?w=300&q=80",
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
    {
      id: 6,
      image:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=300&q=80",
      title: "Charity Run",
      description: "5K run to support local education initiatives",
      date: "Nov 5",
      time: "7:00 AM",
      price: "FREE",
      categories: ["SPORTS", "CHARITY"],
    },
    {
      id: 7,
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&q=80",
      title: "Startup Networking",
      description: "Connect with entrepreneurs and investors",
      date: "Oct 18",
      time: "6:00 PM",
      price: "FREE",
      categories: ["BUSINESS", "NETWORKING"],
    },
    {
      id: 8,
      image:
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=80",
      title: "Food Festival",
      description: "Taste cuisines from around the world",
      date: "Sep 30",
      time: "12:00 PM",
      price: "FREE",
      categories: ["FOOD & DRINKS", "FESTIVALS"],
    },
    {
      id: 9,
      image:
        "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&q=80",
      title: "Art Exhibition",
      description: "Contemporary art from emerging Ethiopian artists",
      date: "Aug 28",
      time: "10:00 AM",
      price: "FREE",
      categories: ["ARTS & CULTURE"],
    },
    {
      id: 10,
      image:
        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&q=80",
      title: "Football Tournament",
      description: "Annual charity football tournament",
      date: "Nov 12",
      time: "2:00 PM",
      price: "FREE",
      categories: ["SPORTS", "CHARITY"],
    },
    {
      id: 11,
      image:
        "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&q=80",
      title: "School Science Fair",
      description: "Annual science fair showcasing student projects",
      date: "Dec 5",
      time: "9:00 AM",
      price: "FREE",
      categories: ["SCHOOL"],
    },
    {
      id: 12,
      image:
        "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=300&q=80",
      title: "Graduation Ceremony",
      description: "University graduation ceremony",
      date: "June 15",
      time: "10:00 AM",
      price: "FREE",
      categories: ["SCHOOL"],
    },
  ];

  // Filter events based on selected category
  const filteredEvents =
    activeCategory === "ALL EVENTS"
      ? allEvents
      : allEvents.filter((event) => event.categories.includes(activeCategory));

  // Category icons mapping
  const categoryIcons: Record<string, string> = {
    "ALL EVENTS": "",
    MUSIC: "🎤",
    "FOOD & DRINKS": "🍽️",
    NIGHTLIFE: "🕺",
    "ARTS & CULTURE": "🎟️",
    SPORTS: "⚽",
    BUSINESS: "✖️",
    NETWORKING: "🔗",
    FESTIVALS: "🏠",
    SCHOOL: "🎓",
  };

  return (
    <PageLayout>
      <main className="flex-1">
        {/* Categories Section - Same as Home page */}
        <section className="border-b border-gray-200 w-full bg-[#fefdfb] sticky top-[57px] z-10">
          <div className="flex overflow-x-auto p-3 gap-2 scrollbar-hide w-full">
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/category/${encodeURIComponent(cat)}`}
                className={`flex flex-col items-center justify-center w-[80px] h-[62px] border border-gray-300 rounded-lg mx-2 shadow-sm flex-shrink-0 ${activeCategory === cat ? "bg-[#0A1128] text-white" : "bg-white"}`}
              >
                <span className="text-1xl">{categoryIcons[cat]}</span>
                <span className="text-xs mt-1 text-center block">
                  {cat === "ALL EVENTS" ? "All Events" : cat}
                </span>
              </Link>
            ))}
          </div>
          {/* Black Line */}
          <div className="border-b border-black"></div>
        </section>

        <div className="p-4">
          {/* Category Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{activeCategory}</h1>
            <p className="text-gray-600">
              {filteredEvents.length}{" "}
              {filteredEvents.length === 1 ? "event" : "events"} found
            </p>
          </div>

          {/* Events List */}
          <div className="space-y-3">
            {filteredEvents.length > 0 ? (
              <>
                {filteredEvents.map((event, index) => (
                  <React.Fragment key={event.id}>
                    <Link
                      to={`/event/${event.id}`}
                      className="no-underline block mb-2"
                    >
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
                            <span className="text-red-500 font-semibold">{`${event.price} ETB`}</span>
                          )
                        }
                        onFollow={() =>
                          console.log(`Following event: ${event.title}`)
                        }
                      />
                    </Link>
                    {index === 2 && (
                      <div className="w-[380px] h-[90px] bg-yellow-100 border border-yellow-300 rounded mx-auto my-4 flex items-center justify-center">
                        <p className="text-xs font-semibold text-yellow-800">
                          SPONSORED
                        </p>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </>
            ) : (
              <div className="text-center py-8 bg-white rounded-lg shadow-sm">
                <p className="text-gray-500">
                  No events found in this category
                </p>
                <Link to="/category/ALL%20EVENTS">
                  <Button className="mt-4 bg-[#0A1128]">
                    Browse All Events
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default CategoryEvents;
