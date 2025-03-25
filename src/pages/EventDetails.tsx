import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import FreeEventPage from "@/components/FreeEventPage";

const EventDetails: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const eventId = parseInt(id || "0");
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState<any>(null);

  useEffect(() => {
    // Simulate loading data
    setLoading(true);

    // Demo events data
    const events = [
      {
        id: 1,
        title: "JULIAN MARLEY",
        organizer: "Shega Events",
        images: [
          {
            url: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?w=600&q=80",
            alt: "Julian Marley Concert",
          },
          {
            url: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&q=80",
            alt: "Concert Stage",
          },
        ],
        description:
          'Julian Marley, son of reggae legend Bob Marley, brings his "As I Am Tour" to Addis Ababa! Experience an unforgettable night of roots reggae music with positive vibrations. The concert will feature Julian\'s greatest hits and tracks from his Grammy-nominated album "As I Am". Don\'t miss this rare opportunity to see a member of reggae royalty live in concert!',
        goingCount: 450,
        interestedCount: 1200,
        performers: [
          {
            name: "Julian Marley",
            image:
              "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100&q=80",
          },
          {
            name: "Local Support Act",
            image:
              "https://images.unsplash.com/photo-1549213783-8284d0336c4f?w=100&q=80",
          },
        ],
        sponsors: [
          {
            name: "Shega Events",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=shega",
          },
          {
            name: "Music Ethiopia",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=music",
          },
        ],
        eventDate: "SATURDAY, JULY 20, 2024",
        startTime: "7:00 PM",
        endTime: "11:00 PM",
        contactPhone: "+251 94 157 5050",
        venue: "GHION HOTEL",
        mapLocation:
          "https://images.unsplash.com/photo-1577415124269-fc1140a69e91?w=400&q=80",
      },
      {
        id: 2,
        title: "አሁድ mood",
        organizer: "LinkUp Addis",
        images: [
          {
            url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=600&q=80",
            alt: "Sunday Mood Event",
          },
          {
            url: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80",
            alt: "BBQ Food",
          },
        ],
        description:
          "Join us for a relaxing Sunday afternoon filled with good vibes, delicious food, and great company. Our BBQ pop-up features the best local chefs preparing mouthwatering dishes while you enjoy the perfect atmosphere to unwind before the new week begins.",
        goingCount: 210,
        interestedCount: 450,
        performers: [
          {
            name: "DJ Selam",
            image:
              "https://images.unsplash.com/photo-1594708767771-a5e9d3c6b191?w=100&q=80",
          },
        ],
        sponsors: [
          {
            name: "LinkUp Addis",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=linkup",
          },
          {
            name: "Hyatt Regency",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=hyatt",
          },
        ],
        eventDate: "SUNDAY, OCTOBER 13, 2024",
        startTime: "2:30 PM",
        endTime: "8:00 PM",
        contactPhone: "+251 91 199 2684",
        venue: "HYATT REGENCY GARDEN",
        mapLocation:
          "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=400&q=80",
      },
      {
        id: 3,
        title: "JUBILATION AFRICA",
        organizer: "Afro Events",
        images: [
          {
            url: "https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=600&q=80",
            alt: "Jubilation Africa Event",
          },
          {
            url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
            alt: "African Dance",
          },
        ],
        description:
          "Jubilation Africa is the ultimate celebration of African music, culture, and heritage. This vibrant event features top DJs from across the continent spinning the best Afrobeats, Amapiano, and traditional rhythms. Come dressed in your finest African attire and be prepared for a night of non-stop dancing and jubilation!",
        goingCount: 320,
        interestedCount: 780,
        performers: [
          {
            name: "DJ Kofi",
            image:
              "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=100&q=80",
          },
          {
            name: "Amapiano Kings",
            image:
              "https://images.unsplash.com/photo-1559763615-c65a6124b3d3?w=100&q=80",
          },
          {
            name: "Afro Dance Crew",
            image:
              "https://images.unsplash.com/photo-1523528283115-9bf9b1699245?w=100&q=80",
          },
        ],
        sponsors: [
          {
            name: "Afro Events",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=afro",
          },
          {
            name: "Sheraton Hotel",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sheraton",
          },
        ],
        eventDate: "SATURDAY, MARCH 23, 2024",
        startTime: "4:00 PM",
        endTime: "2:00 AM",
        contactPhone: "+251 92 345 6789",
        venue: "SHERATON HOTEL",
        mapLocation:
          "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400&q=80",
      },
      {
        id: 4,
        title: "TERRACE SESSION",
        organizer: "Acoustic Nights",
        images: [
          {
            url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&q=80",
            alt: "Terrace Session Event",
          },
          {
            url: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80",
            alt: "Acoustic Performance",
          },
        ],
        description:
          "Join us for an intimate evening on our scenic rooftop terrace featuring the soulful sounds of @dele_music_. This acoustic session promises to be a magical experience under the stars with breathtaking views of the city. Limited capacity ensures an exclusive atmosphere where you can truly connect with the music.",
        goingCount: 85,
        interestedCount: 210,
        performers: [
          {
            name: "@dele_music_",
            image:
              "https://images.unsplash.com/photo-1577375729152-4c8b5fcda381?w=100&q=80",
          },
        ],
        sponsors: [
          {
            name: "Acoustic Nights",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=acoustic",
          },
          {
            name: "Sky Lounge",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sky",
          },
        ],
        eventDate: "FRIDAY, JULY 20, 2024",
        startTime: "7:00 PM",
        endTime: "10:00 PM",
        contactPhone: "+251 93 456 7890",
        venue: "SKY LOUNGE",
        mapLocation:
          "https://images.unsplash.com/photo-1594608661623-aa0bd3a69799?w=400&q=80",
      },
      {
        id: 5,
        title: "4TH ANNUAL WALK",
        organizer: "Pink Ethiopia",
        images: [
          {
            url: "https://images.unsplash.com/photo-1576858574144-9ae1ebcf5ae5?w=600&q=80",
            alt: "Breast Cancer Awareness Walk",
          },
          {
            url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&q=80",
            alt: "Charity Event",
          },
        ],
        description:
          "Join us for the 4th Annual Breast Cancer Awareness Walk. This community event brings together survivors, supporters, and advocates to raise awareness and funds for breast cancer research and support services. The 5km route is suitable for all ages and fitness levels. Together, we can make a difference in the fight against breast cancer.",
        goingCount: 420,
        interestedCount: 650,
        performers: [],
        sponsors: [
          {
            name: "Pink Ethiopia",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=pink",
          },
          {
            name: "Health Ministry",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=health",
          },
          {
            name: "Women's Health",
            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=women",
          },
        ],
        eventDate: "SUNDAY, OCTOBER 23, 2024",
        startTime: "9:00 AM",
        endTime: "12:00 PM",
        contactPhone: "+251 94 567 8901",
        venue: "MESKEL SQUARE",
        mapLocation:
          "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&q=80",
      },
    ];

    // Find the event with the matching ID
    const foundEvent = events.find((e) => e.id === eventId);

    if (foundEvent) {
      setEvent(foundEvent);
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
          <Button onClick={() => navigate("/")} className="bg-[#0A1128]">
            Back to Home
          </Button>
        </div>
      </PageLayout>
    );
  }

  // Process map location data for Google Maps
  const processedEvent = {
    ...event,
    // If it contains coordinates in the format "lat,lng", it will be processed in FreeEventPage
    // googleMapsApiKey will be provided later
    googleMapsApiKey: undefined, // Replace with actual API key when available
  };

  return <FreeEventPage {...processedEvent} />;
};

export default EventDetails;
