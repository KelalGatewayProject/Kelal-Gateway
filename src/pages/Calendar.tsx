import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";

const Calendar: React.FC = () => {
  // Calendar data
  const days = ["S", "M", "T", "W", "T", "F", "S"];
  const dates = [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, null, null],
  ];

  // Highlighted dates (events)
  const highlightedDates = [22, 26, 28];

  // Events data
  const events = [
    {
      id: 1,
      title: "JULIAN MARLEY",
      description: "Festival lovers, families, reggae lovers!!!",
      date: "July 20",
      time: "7:00 PM",
      price: { general: "600", vip: "1200" },
      image:
        "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?w=300&q=80",
    },
    {
      id: 2,
      title: "LinkUp Bazaar",
      description: "Two-day bazaar and family festival with more than 85...",
      date: "October 22",
      time: "9:00 AM",
      price: "FREE",
      image:
        "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=300&q=80",
    },
    {
      id: 3,
      title: "4th Annual Walk",
      description: "Time to lace up those walking shoes for Breast Cancer...",
      date: "October 27",
      time: "9:00 AM",
      price: "FREE",
      image:
        "https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5?w=300&q=80",
    },
  ];

  return (
    <PageLayout>
      <main className="flex-1 p-4 relative z-10 overflow-y-auto pb-16">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">CALENDAR OF EVENTS</h1>
        </div>

        {/* Calendar Month */}
        <div className="bg-white rounded-lg p-4 mb-6">
          <h2 className="text-xl font-bold text-center mb-4">OCTOBER 2024</h2>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-center">
            {/* Days of week */}
            {days.map((day, index) => (
              <div key={`day-${index}`} className="text-gray-500">
                {day}
              </div>
            ))}

            {/* Calendar dates */}
            {dates.flat().map((date, index) => (
              <div key={`date-${index}`} className="py-2">
                {date && (
                  <div
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${highlightedDates.includes(date) ? "bg-pink-500 text-white" : "text-gray-700"}`}
                  >
                    {date}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between mt-4">
            <button className="text-2xl">&larr;</button>
            <button className="text-2xl">&rarr;</button>
          </div>
        </div>

        {/* Upcoming Events */}
        <div>
          <h2 className="text-xl font-bold mb-4">UP COMING EVENTS</h2>

          <div className="space-y-4 overflow-y-auto">
            {events.map((event) => (
              <Link
                to={`/event/${event.id}`}
                key={event.id}
                className="no-underline"
              >
                <div className="bg-white rounded-lg overflow-hidden flex border border-gray-200">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-24 h-24 object-cover"
                  />

                  <div className="p-3 flex-1">
                    <h3 className="font-bold">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.description}</p>

                    <div className="flex justify-between mt-2 text-sm">
                      <span>{event.date}</span>
                      <span>{event.time}</span>

                      {typeof event.price === "string" ? (
                        <span
                          className={
                            event.price === "FREE"
                              ? "text-green-500 font-bold"
                              : "text-red-500 font-bold"
                          }
                        >
                          {event.price}
                        </span>
                      ) : (
                        <div>
                          <span className="text-red-500 font-bold">
                            GEN: {event.price.general}
                          </span>
                          <span className="text-red-500 font-bold ml-1">
                            VIP: {event.price.vip}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center pr-2">
                    <div className="bg-gray-200 p-1 rounded-full">
                      <span className="text-lg">♿</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Calendar;
