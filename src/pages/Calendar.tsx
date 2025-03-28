import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/PageLayout";

const Calendar: React.FC = () => {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [visibleMonth, setVisibleMonth] = useState<number>(currentMonth);

  // Months data
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

  // Days of week
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  // Highlighted dates (events) - using the same dates as in DayEvents.tsx
  const highlightedDates = [12, 17, 21, 25];

  // Handle day click to navigate to day events
  const handleDayClick = (day: number, month: number, year: number) => {
    // Format date as YYYY-MM-DD for URL
    const formattedMonth = (month + 1).toString().padStart(2, "0");
    const formattedDay = day.toString().padStart(2, "0");
    const dateString = `${year}-${formattedMonth}-${formattedDay}`;

    // Navigate to day events page with the date parameter
    navigate(`/day-events/${dateString}`);
  };

  // Generate calendar for a specific month
  const generateCalendar = (month: number, year: number) => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({
        day: i,
        hasEvent: highlightedDates.includes(i),
        isToday:
          i === new Date().getDate() &&
          month === new Date().getMonth() &&
          year === new Date().getFullYear(),
      });
    }

    return calendarDays;
  };

  // Handle scroll to update visible month
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollPosition = container.scrollLeft;
      const monthWidth = container.clientWidth * 0.85; // 85% of viewport width
      const newVisibleMonth = Math.round(scrollPosition / monthWidth);
      setVisibleMonth(Math.max(0, Math.min(11, newVisibleMonth)));
    }
  };

  // Scroll to current month on load
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const monthWidth = container.clientWidth * 0.85;

      const scrollToPosition = () => {
        container.scrollTo({
          left: currentMonth * monthWidth,
          behavior: "smooth",
        });
      };

      // Wait for container to be properly sized
      setTimeout(scrollToPosition, 100);

      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return (
    <PageLayout>
      <main className="flex-1 p-4 relative z-10">
        <div className="text-center mb-6 sticky top-0 bg-white z-10 pb-4">
          <h1 className="text-2xl font-bold">CALENDAR OF EVENTS</h1>
          <h2 className="text-xl font-medium">
            {months[visibleMonth]} {currentYear}
          </h2>
        </div>

        {/* Horizontal Scroll Calendar - Uniform "MARCH" width */}
        <div className="mb-6 w-full overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-8 scrollbar-hide px-[7.5%]"
            style={{ scrollBehavior: "smooth" }}
          >
            {months.map((month, index) => {
              const calendarDays = generateCalendar(index, currentYear);

              return (
                <div key={month} className="flex-shrink-0 w-[85vw] snap-center">
                  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-full">
                    {/* Days of week header */}
                    <div className="grid grid-cols-7 gap-3 text-center mb-3">
                      {daysOfWeek.map((day) => (
                        <div
                          key={day}
                          className="text-gray-600 text-sm font-medium"
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Calendar grid - Wider spacing like MARCH */}
                    <div className="grid grid-cols-7 gap-3">
                      {calendarDays.map((day, i) => (
                        <div
                          key={i}
                          className={`py-1 text-center ${day ? "cursor-pointer" : "opacity-0"}`}
                          onClick={() =>
                            day && handleDayClick(day.day, index, currentYear)
                          }
                        >
                          {day && (
                            <div
                              className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-base
                                ${day.isToday ? "bg-blue-500 text-white" : ""}
                                ${day.hasEvent && !day.isToday ? "bg-[#030F29] text-white" : ""}
                                ${!day.hasEvent && !day.isToday ? "hover:bg-gray-100" : ""}
                              `}
                            >
                              {day.day}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sponsored Ad */}
        <div className="bg-white rounded-lg overflow-hidden shadow-sm mt-6">
          <div className="p-2 bg-gray-100 text-xs uppercase text-gray-500">
            SPONSORED
          </div>
          <div className="relative w-full h-[95px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80"
              alt="Sponsored event"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
              <h3 className="text-white font-bold">Summer Music Festival</h3>
              <p className="text-white text-sm">Get your tickets now!</p>
            </div>
            <button className="absolute bottom-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
              Learn More
            </button>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Calendar;
