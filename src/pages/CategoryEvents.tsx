import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import EventCard from "../components/EventCard";
import { Button } from "../components/ui/button";
import PageLayout from "../components/PageLayout";
import CategoryButton from "../components/CategoryButton";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  price: number;
  category: string;
}

const CategoryEvents = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Demo events for each category
  const demoEventsByCategory: Record<string, Event[]> = {
    "ALL EVENTS": [
      {
        id: "all-1",
        title: "Weekend Festival",
        date: "2023-10-15",
        time: "14:00",
        location: "City Center",
        imageUrl:
          "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
        price: 0,
        category: "ALL EVENTS",
      },
      {
        id: "all-2",
        title: "Tech Conference",
        date: "2023-10-20",
        time: "09:00",
        location: "Convention Center",
        imageUrl:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
        price: 50,
        category: "ALL EVENTS",
      },
    ],
    MUSIC: [
      {
        id: "music-1",
        title: "Summer Music Festival",
        date: "2023-07-15",
        time: "18:00",
        location: "Central Park",
        imageUrl:
          "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
        price: 25,
        category: "MUSIC",
      },
      {
        id: "music-2",
        title: "Jazz Night",
        date: "2023-07-20",
        time: "20:00",
        location: "Blue Note Club",
        imageUrl:
          "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
        price: 15,
        category: "MUSIC",
      },
      {
        id: "music-3",
        title: "Rock Concert",
        date: "2023-07-25",
        time: "19:00",
        location: "Stadium Arena",
        imageUrl:
          "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80",
        price: 30,
        category: "MUSIC",
      },
      {
        id: "music-4",
        title: "EDM Party",
        date: "2023-07-30",
        time: "22:00",
        location: "Nightclub Downtown",
        imageUrl:
          "https://images.unsplash.com/photo-1571266752264-7a0fea01df2b?w=800&q=80",
        price: 20,
        category: "MUSIC",
      },
    ],
    NIGHTLIFE: [
      {
        id: "nightlife-1",
        title: "Club Night",
        date: "2023-08-05",
        time: "23:00",
        location: "XO Club",
        imageUrl:
          "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&q=80",
        price: 15,
        category: "NIGHTLIFE",
      },
      {
        id: "nightlife-2",
        title: "Rooftop Party",
        date: "2023-08-12",
        time: "21:00",
        location: "Sky Lounge",
        imageUrl:
          "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
        price: 20,
        category: "NIGHTLIFE",
      },
    ],
    "ARTS & CULTURE": [
      {
        id: "arts-1",
        title: "Art Exhibition",
        date: "2023-09-10",
        time: "10:00",
        location: "Modern Art Gallery",
        imageUrl:
          "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?w=800&q=80",
        price: 10,
        category: "ARTS & CULTURE",
      },
      {
        id: "arts-2",
        title: "Cultural Festival",
        date: "2023-09-15",
        time: "11:00",
        location: "Heritage Park",
        imageUrl:
          "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
        price: 0,
        category: "ARTS & CULTURE",
      },
    ],
    FESTIVALS: [
      {
        id: "festival-1",
        title: "Food Festival",
        date: "2023-10-01",
        time: "12:00",
        location: "City Square",
        imageUrl:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
        price: 5,
        category: "FESTIVALS",
      },
      {
        id: "festival-2",
        title: "Film Festival",
        date: "2023-10-05",
        time: "16:00",
        location: "Cinema Complex",
        imageUrl:
          "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80",
        price: 15,
        category: "FESTIVALS",
      },
    ],
    BUSINESS: [
      {
        id: "business-1",
        title: "Startup Conference",
        date: "2023-11-10",
        time: "09:00",
        location: "Business Center",
        imageUrl:
          "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        price: 50,
        category: "BUSINESS",
      },
      {
        id: "business-2",
        title: "Networking Event",
        date: "2023-11-15",
        time: "18:00",
        location: "Grand Hotel",
        imageUrl:
          "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
        price: 20,
        category: "BUSINESS",
      },
    ],
    NETWORKING: [
      {
        id: "networking-1",
        title: "Tech Meetup",
        date: "2023-12-01",
        time: "19:00",
        location: "Innovation Hub",
        imageUrl:
          "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80",
        price: 0,
        category: "NETWORKING",
      },
      {
        id: "networking-2",
        title: "Career Fair",
        date: "2023-12-05",
        time: "10:00",
        location: "University Campus",
        imageUrl:
          "https://images.unsplash.com/photo-1560439514-4e9645039924?w=800&q=80",
        price: 0,
        category: "NETWORKING",
      },
    ],
    SPORTS: [
      {
        id: "sports-1",
        title: "Marathon",
        date: "2024-01-10",
        time: "07:00",
        location: "City Streets",
        imageUrl:
          "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800&q=80",
        price: 25,
        category: "SPORTS",
      },
      {
        id: "sports-2",
        title: "Basketball Tournament",
        date: "2024-01-15",
        time: "14:00",
        location: "Sports Arena",
        imageUrl:
          "https://images.unsplash.com/photo-1546519638-68e109acd27d?w=800&q=80",
        price: 10,
        category: "SPORTS",
      },
    ],
    SCHOOL: [
      {
        id: "school-1",
        title: "Graduation Ceremony",
        date: "2024-02-01",
        time: "10:00",
        location: "University Hall",
        imageUrl:
          "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&q=80",
        price: 0,
        category: "SCHOOL",
      },
      {
        id: "school-2",
        title: "School Fair",
        date: "2024-02-05",
        time: "12:00",
        location: "School Grounds",
        imageUrl:
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80",
        price: 5,
        category: "SCHOOL",
      },
    ],
  };

  useEffect(() => {
    // Simulate fetching events by category
    const fetchEvents = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        const mockEvents: Event[] = [
          {
            id: "1",
            title: "Summer Music Festival",
            date: "2023-07-15",
            time: "18:00",
            location: "Central Park",
            imageUrl:
              "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80",
            price: 25,
            category: "music",
          },
          {
            id: "2",
            title: "Jazz Night",
            date: "2023-07-20",
            time: "20:00",
            location: "Blue Note Club",
            imageUrl:
              "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
            price: 15,
            category: "music",
          },
          {
            id: "3",
            title: "Rock Concert",
            date: "2023-07-25",
            time: "19:00",
            location: "Stadium Arena",
            imageUrl:
              "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80",
            price: 30,
            category: "music",
          },
          {
            id: "4",
            title: "EDM Party",
            date: "2023-07-30",
            time: "22:00",
            location: "Nightclub Downtown",
            imageUrl:
              "https://images.unsplash.com/photo-1571266752264-7a0fea01df2b?w=800&q=80",
            price: 20,
            category: "music",
          },
        ];

        // Filter events by category, but if none found, we'll use demo events later
        const filteredEvents = mockEvents.filter(
          (event) => event.category.toLowerCase() === category?.toLowerCase(),
        );
        setEvents(filteredEvents);
        setLoading(false);
      }, 1000);
    };

    fetchEvents();
  }, [category]);

  // Get the normalized category name for lookup in demoEventsByCategory
  const normalizedCategory = category?.toUpperCase() || "ALL EVENTS";

  // Get demo events for this category or use ALL EVENTS as fallback
  const demoEvents =
    demoEventsByCategory[normalizedCategory] ||
    demoEventsByCategory["ALL EVENTS"];

  // Categories for the buttons
  const categories = [
    { label: "All\nEVENTS", to: "/category/ALL%20EVENTS" },
    {
      label: "PARTIES",
      to: "/category/NIGHTLIFE",
      iconUrl: "https://kelalgateway.et/wp-content/uploads/2025/03/PARTIES.png",
    },
    {
      label: "CONCERT",
      to: "/category/MUSIC",
      iconUrl: "https://kelalgateway.et/wp-content/uploads/2025/03/CONCERT.png",
    },
    {
      label: "ACTIVITIES",
      to: "/category/ARTS%20%26%20CULTURE",
      iconUrl:
        "https://kelalgateway.et/wp-content/uploads/2025/03/ACTIVITIES.png",
    },
    {
      label: "FESTIVALS",
      to: "/category/FESTIVALS",
      iconUrl:
        "https://kelalgateway.et/wp-content/uploads/2025/03/FESITIVALS3.webp",
    },
    {
      label: "CONVENTIONS",
      to: "/category/BUSINESS",
      iconUrl:
        "https://kelalgateway.et/wp-content/uploads/2025/03/CONVENTIONS.png",
    },
    {
      label: "NETWORKING",
      to: "/category/NETWORKING",
      iconUrl:
        "https://kelalgateway.et/wp-content/uploads/2025/03/NETWORKING.png",
    },
    {
      label: "SPORTS",
      to: "/category/SPORTS",
      iconUrl: "https://kelalgateway.et/wp-content/uploads/2025/03/SPORTS.png",
    },
    { label: "SCHOOL", to: "/category/SCHOOL", icon: "🎓" },
  ];

  return (
    <PageLayout>
      <div className="flex flex-col h-full bg-white">
        <div className="sticky top-[67px] z-10 bg-white p-4 border-b">
          <div className="flex items-center mb-4">
            <Link to="/">
              <Button variant="ghost" size="icon" className="mr-2">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-1xl font-bold capitalize">{category} EVENTS</h1>
          </div>

          {/* Category Buttons */}
          <div className="flex overflow-x-auto p-2 gap-2 scrollbar-hide w-full">
            {categories.map((cat, index) => (
              <CategoryButton
                key={index}
                to={cat.to}
                label={cat.label}
                icon={cat.icon}
                iconUrl={cat.iconUrl}
              />
            ))}
          </div>
          {/* Black Line */}
          <div className="border-b border-black mt-2"></div>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <p>Loading events...</p>
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {events.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  date={event.date}
                  time={event.time}
                  description={event.location}
                  image={event.imageUrl}
                  price={`${event.price} ETB`}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 mb-4">
                <p className="text-sm text-yellow-700">
                  No real events found in this category. Showing demo events
                  instead.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {demoEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    id={event.id}
                    title={event.title}
                    date={event.date}
                    time={event.time}
                    description={event.location}
                    image={event.imageUrl}
                    price={event.price === 0 ? "FREE" : `${event.price} ETB`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default CategoryEvents;
