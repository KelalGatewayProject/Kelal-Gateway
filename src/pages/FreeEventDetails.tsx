import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import FreeEventPage from "@/components/FreeEventPage";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";

const FreeEventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<any>(null);

  // Convert id to number, but handle it safely
  const eventId = id ? parseInt(id) : 0;

  useEffect(() => {
    // Simulate loading data
    setLoading(true);

    // Demo free events data
    const freeEvents = [
      {
        id: 2,
        title: "LINKUP BAZAAR & FAMILY FEST",
        organizer: "LINKUP ADDIS",
        images: [
          {
            url: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=300&q=80",
            alt: "LinkUp Bazaar Event",
          },
          {
            url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=300&q=80",
            alt: "Family Festival",
          },
        ],
        description:
          "Two-day bazaar and family festival with more than 85 vendors. The monthly bazaar has got a new home at the stunningly beautiful Officers Club (Mekoniñoch Kibeb) near Lideta/Tor Hailoch and will kick off its journey as a two-day bazaar and family festival.",
        goingCount: 310,
        interestedCount: 1200,
        performers: [
          {
            name: "SAM YF",
            image:
              "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&q=80",
          },
        ],
        sponsors: [
          {
            name: "LINKUP",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=linkup",
          },
          {
            name: "Linkup Addis",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=addis",
          },
        ],
        eventDate: "SATURDAY OCT 22",
        startTime: "9:00 AM",
        endTime: "6:00 PM",
        contactPhone: "+25191 199 2684",
        venue: "EFDR DEFENCE FORCE OFFICERS' CLUB",
        mapLocation:
          "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=400&q=80",
      },
      {
        id: 7,
        title: "STARTUP NETWORKING EVENT",
        organizer: "ADDIS TECH HUB",
        images: [
          {
            url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=300&q=80",
            alt: "Startup Networking Event",
          },
          {
            url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=300&q=80",
            alt: "Business Meeting",
          },
        ],
        description:
          "Connect with entrepreneurs and investors at our monthly networking event. This is your chance to pitch your ideas, find collaborators, and learn from successful business leaders in the Ethiopian tech ecosystem.",
        goingCount: 156,
        interestedCount: 420,
        performers: [],
        sponsors: [
          {
            name: "Addis Tech Hub",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=techhub",
          },
          {
            name: "Startup Ethiopia",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=startup",
          },
        ],
        eventDate: "TUESDAY OCT 18",
        startTime: "6:00 PM",
        endTime: "9:00 PM",
        contactPhone: "+25191 234 5678",
        venue: "ADDIS TECH HUB, BOLE ROAD",
        mapLocation:
          "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=400&q=80",
      },
      {
        id: 10,
        title: "ANNUAL CHARITY FOOTBALL TOURNAMENT",
        organizer: "ADDIS SPORTS FOUNDATION",
        images: [
          {
            url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=300&q=80",
            alt: "Football Tournament",
          },
          {
            url: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=300&q=80",
            alt: "Football Match",
          },
        ],
        description:
          "Join us for our annual charity football tournament supporting local education initiatives. Teams from across Addis Ababa will compete in this exciting event with all proceeds going to build new classrooms for rural schools.",
        goingCount: 230,
        interestedCount: 580,
        performers: [],
        sponsors: [
          {
            name: "Addis Sports",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sports",
          },
          {
            name: "Education Fund",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=education",
          },
          {
            name: "Local Brewery",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=brewery",
          },
        ],
        eventDate: "SATURDAY NOV 12",
        startTime: "2:00 PM",
        endTime: "7:00 PM",
        contactPhone: "+25191 876 5432",
        venue: "ADDIS ABABA STADIUM",
        mapLocation:
          "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&q=80",
      },
      {
        id: 11,
        title: "SCHOOL SCIENCE FAIR",
        organizer: "ADDIS EDUCATION DEPARTMENT",
        images: [
          {
            url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300&q=80",
            alt: "Science Fair",
          },
          {
            url: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=300&q=80",
            alt: "Student Projects",
          },
        ],
        description:
          "Annual science fair showcasing student projects from schools across Addis Ababa. Come see the innovative ideas and experiments created by our talented young scientists and support STEM education in our community.",
        goingCount: 185,
        interestedCount: 320,
        performers: [],
        sponsors: [
          {
            name: "Education Dept",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=education",
          },
          {
            name: "Science Academy",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=science",
          },
        ],
        eventDate: "MONDAY DEC 5",
        startTime: "9:00 AM",
        endTime: "4:00 PM",
        contactPhone: "+25191 345 6789",
        venue: "ADDIS ABABA EXHIBITION CENTER",
        mapLocation:
          "https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?w=400&q=80",
      },
      {
        id: 12,
        title: "UNIVERSITY GRADUATION CEREMONY",
        organizer: "ADDIS ABABA UNIVERSITY",
        images: [
          {
            url: "https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=300&q=80",
            alt: "Graduation Ceremony",
          },
          {
            url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=300&q=80",
            alt: "University Graduation",
          },
        ],
        description:
          "Join us to celebrate the achievements of this year's graduating class at Addis Ababa University. Family and friends are welcome to attend this special ceremony honoring our students' hard work and dedication.",
        goingCount: 450,
        interestedCount: 780,
        performers: [
          {
            name: "University Choir",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=choir",
          },
        ],
        sponsors: [
          {
            name: "AAU Alumni",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=alumni",
          },
          {
            name: "Education Ministry",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ministry",
          },
        ],
        eventDate: "THURSDAY JUNE 15",
        startTime: "10:00 AM",
        endTime: "1:00 PM",
        contactPhone: "+25191 456 7890",
        venue: "ADDIS ABABA UNIVERSITY MAIN CAMPUS",
        mapLocation:
          "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80",
      },
    ];

    // Find the event with the matching ID
    const foundEvent = freeEvents.find((e) => e.id === eventId);

    if (foundEvent) {
      setEvent(foundEvent);
    } else if (freeEvents.length > 0) {
      // Use the first event as a fallback
      setEvent(freeEvents[0]);
    }

    setLoading(false);
  }, [eventId]);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A1128] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading event details...</p>
          </div>
        </div>
      </PageLayout>
    );
  }

  if (!event) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center h-[70vh]">
          <h2 className="text-xl font-bold mb-4">Event not found</h2>
          <Button
            onClick={() => navigate("/free-events")}
            className="bg-[#0A1128]"
          >
            Back to Free Events
          </Button>
        </div>
      </PageLayout>
    );
  }

  return <FreeEventPage {...event} />;
};

export default FreeEventDetails;
