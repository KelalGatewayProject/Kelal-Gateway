import React from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import EventCard from "@/components/EventCard";
import { ArrowLeft } from "lucide-react";

const DayEvents: React.FC = () => {
  const { date } = useParams<{ date: string }>();

  // Parse the date from URL parameter (format: YYYY-MM-DD)
  const parseDate = (dateStr: string | undefined) => {
    if (!dateStr) return new Date();

    try {
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day);
    } catch (error) {
      console.error("Invalid date format", error);
      return new Date();
    }
  };

  const selectedDate = parseDate(date);

  // Format date for display
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Months for formatting
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Demo events from Home page
  const demoEvents = [
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
    // Additional events for specific dates
    {
      id: 6,
      title: "JULIAN MARLEY",
      description: "Festival lovers, families, reggae lovers!!!",
      date: "July 12",
      time: "7:00 PM",
      price: { general: "600", vip: "1200" },
      image:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?w=300&q=80",
    },
    {
      id: 7,
      title: "LinkUp Bazaar",
      description: "Two-day bazaar and family festival with more than 85...",
      date: "July 17",
      time: "9:00 AM",
      price: "FREE",
      image:
        "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=300&q=80",
    },
    {
      id: 8,
      title: "Hands on UI meetup",
      description: "Join us for an interactive UI/UX design workshop",
      date: "July 21",
      time: "5:00 PM",
      price: "FREE",
      image:
        "https://images.unsplash.com/photo-1540317580384-e5d43867caa6?w=300&q=80",
    },
    {
      id: 9,
      title: "Wireframe presentation",
      description: "Learn how to create effective wireframes for your projects",
      date: "July 25",
      time: "2:00 PM",
      price: "FREE",
      image:
        "https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5?w=300&q=80",
    },
  ];

  // Get events for the selected date
  const getEventsForDate = () => {
    const day = selectedDate.getDate();
    const month = selectedDate.getMonth();
    const monthName = months[month];

    // Filter events for the selected date
    return demoEvents.filter((event) => {
      const eventDateParts = event.date.split(" ");
      if (eventDateParts.length >= 2) {
        const eventMonth = eventDateParts[0];
        const eventDay = parseInt(eventDateParts[1], 10);
        return (
          monthName.toLowerCase().startsWith(eventMonth.toLowerCase()) &&
          eventDay === day
        );
      }
      return false;
    });
  };

  const events = getEventsForDate();

  return (
    <PageLayout>
      <main className="flex-1 p-4 relative z-10 overflow-y-auto pb-16">
        <div className="flex items-center mb-6">
          <Link to="/calendar" className="mr-3">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">
            Events for {formatDate(selectedDate)}
          </h1>
        </div>

        {events.length > 0 ? (
          <div className="space-y-4">
            {events.map((event) => (
              <Link
                to={`/event/${event.id}`}
                key={event.id}
                className="no-underline block"
              >
                <EventCard
                  id={event.id.toString()}
                  title={event.title}
                  description={event.description}
                  date={event.date}
                  time={event.time}
                  price={event.price}
                  imageUrl={event.image}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="mb-4">
              <img
                src="https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=400&q=80"
                alt="No events"
                className="w-32 h-32 object-cover rounded-full mx-auto opacity-50"
              />
            </div>
            <h3 className="text-xl font-medium text-gray-600">
              No events for this date
            </h3>
            <p className="text-gray-500 mt-2">
              Check another date or create a new event
            </p>
          </div>
        )}
      </main>
    </PageLayout>
  );
};

export default DayEvents;
