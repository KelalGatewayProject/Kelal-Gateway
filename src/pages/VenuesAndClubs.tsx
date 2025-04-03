import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, Star, Phone, Share } from "lucide-react";
import TopNavigation from "@/components/TopNavigation";
import BottomNavigation from "@/components/BottomNavigation";
import PageLayout from "@/components/PageLayout";

const VenuesAndClubs: React.FC = () => {
  // Venues data
  const venues = [
    {
      id: 1,
      name: "THE VENUE WAREHOUSE",
      description:
        "Addis Ababa's premier event space for concerts and large gatherings",
      address: "Bole, Addis Ababa",
      phone: "+251 91 123 4567",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=500&q=80",
      logo: "W",
      logoColor: "text-green-500",
      upcoming: 3,
    },
    {
      id: 2,
      name: "FLIRT LOUNGE",
      description: "Upscale nightclub featuring local and international DJs",
      address: "Kazanchis, Addis Ababa",
      phone: "+251 92 345 6789",
      rating: 4.5,
      image:
        "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=500&q=80",
      logo: "F",
      logoColor: "text-yellow-500",
      upcoming: 5,
    },
    {
      id: 3,
      name: "V LOUNGE",
      description: "Elegant lounge with craft cocktails and live music",
      address: "Meskel Square, Addis Ababa",
      phone: "+251 93 456 7890",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=500&q=80",
      logo: "V",
      logoColor: "text-red-500",
      upcoming: 2,
    },
    {
      id: 4,
      name: "GHION HOTEL",
      description: "Historic hotel with beautiful gardens for outdoor events",
      address: "Piazza, Addis Ababa",
      phone: "+251 11 551 0459",
      rating: 4.3,
      image:
        "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=500&q=80",
      logo: "G",
      logoColor: "text-blue-500",
      upcoming: 4,
    },
  ];

  return (
    <PageLayout>
      <main className="flex-1 p-4 relative z-10 pt-[67px]">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold font-['Roboto'] uppercase">
            VENUES & CLUBS
          </h1>
        </div>

        {/* Venues List */}
        <div className="space-y-6">
          {venues.map((venue) => (
            <div
              key={venue.id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              {/* Venue Image */}
              <div className="relative h-40">
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />

                {/* Venue Logo */}
                <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-black flex items-center justify-center">
                  <span className={`text-2xl font-bold ${venue.logoColor}`}>
                    {venue.logo}
                  </span>
                </div>

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-full flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-bold">{venue.rating}</span>
                </div>
              </div>

              {/* Venue Details */}
              <div className="p-4">
                <h2 className="font-bold text-lg mb-1">{venue.name}</h2>
                <p className="text-gray-600 text-sm mb-3">
                  {venue.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">{venue.address}</span>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">{venue.phone}</span>
                  </div>

                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm">
                      {venue.upcoming} upcoming events
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button className="flex-1 bg-[#0A1128] text-white">
                    VIEW EVENTS
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-[#0A1128] text-[#0A1128]"
                  >
                    FOLLOW
                  </Button>
                </div>
                <Button
                  variant="outline"
                  className="w-full mt-2 border-[#0A1128] text-[#0A1128]"
                  onClick={() => {
                    // App download link
                    const appDownloadLink =
                      "https://play.google.com/store/apps/details?id=com.yourapp"; // Replace with your actual app store link
                    const appDeepLink = `yourapp://venue?id=${venue.id}`; // Replace with your actual deep link scheme

                    // Create a rich description with all required details
                    const shareText = `
🏢 VENUE: ${venue.name}

📝 DESCRIPTION: ${venue.description}

📍 LOCATION: ${venue.address}
📞 CONTACT: ${venue.phone}
⭐ RATING: ${venue.rating}/5
🎭 UPCOMING EVENTS: ${venue.upcoming}

Open in app or download: ${appDownloadLink}
`;

                    if (navigator.share) {
                      navigator
                        .share({
                          title: venue.name,
                          text: shareText,
                          url: window.location.href + "/" + venue.id,
                        })
                        .then(() => console.log("Successful share"))
                        .catch((error) => console.log("Error sharing:", error));
                    } else {
                      alert(
                        "Share this venue:\n\n" +
                          shareText +
                          "\n" +
                          window.location.href +
                          "/" +
                          venue.id,
                      );
                    }
                  }}
                >
                  <Share className="h-4 w-4 mr-1" /> SHARE
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </PageLayout>
  );
};

export default VenuesAndClubs;
