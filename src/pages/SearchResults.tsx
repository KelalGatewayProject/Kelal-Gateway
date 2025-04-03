import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, MapPin, User, Building } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import EventCard from "@/components/EventCard";

interface SearchResult {
  id: string | number;
  type: "event" | "venue" | "organizer";
  title: string;
  description: string;
  image: string;
  date?: string;
  time?: string;
  location?: string;
  rating?: number;
  price?: string;
}

const SearchResults: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Parse the search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("q") || "";
    setSearchQuery(query);
    performSearch(query);
  }, [location.search]);

  const performSearch = (query: string) => {
    setIsLoading(true);
    setError(null);

    // In a real app, this would be an API call to search events, venues, and organizers
    // For demo purposes, we'll simulate a search with mock data
    setTimeout(() => {
      try {
        const mockResults: SearchResult[] = [
          // Events
          {
            id: "event-1",
            type: "event",
            title: "JULIAN MARLEY",
            description: "Festival lovers, families, reggae lovers!!!",
            image:
              "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?w=300&q=80",
            date: "July 20",
            time: "7:00 PM",
            location: "Ghion Hotel, Addis Ababa",
            price: "FREE",
          },
          {
            id: "event-2",
            type: "event",
            title: "LINKUP BAZAAR & FAMILY FEST",
            description:
              "Two-day bazaar and family festival with more than 85 vendors",
            image:
              "https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=300&q=80",
            date: "Oct 22",
            time: "9:00 AM",
            location: "Officers' Club, Addis Ababa",
            price: "FREE",
          },

          // Venues
          {
            id: "venue-1",
            type: "venue",
            title: "THE VENUE WAREHOUSE",
            description:
              "Addis Ababa's premier event space for concerts and large gatherings",
            image:
              "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=300&q=80",
            location: "Bole, Addis Ababa",
            rating: 4.8,
          },
          {
            id: "venue-2",
            type: "venue",
            title: "FLIRT LOUNGE",
            description:
              "Upscale nightclub featuring local and international DJs",
            image:
              "https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=300&q=80",
            location: "Kazanchis, Addis Ababa",
            rating: 4.5,
          },

          // Organizers
          {
            id: "organizer-1",
            type: "organizer",
            title: "SHEGA EVENTS",
            description:
              "Premier event organizer specializing in concerts and festivals",
            image: "https://imgur.com/ve0BjeU.png",
          },
          {
            id: "organizer-2",
            type: "organizer",
            title: "LINKUP ADDIS",
            description:
              "Community-focused event organizer for bazaars and family events",
            image: "https://imgur.com/s8Z8dkV.png",
          },
        ];

        // Filter results based on search query
        const filteredResults =
          query.trim() === ""
            ? mockResults
            : mockResults.filter(
                (result) =>
                  result.title.toLowerCase().includes(query.toLowerCase()) ||
                  result.description
                    .toLowerCase()
                    .includes(query.toLowerCase()) ||
                  (result.location &&
                    result.location
                      .toLowerCase()
                      .includes(query.toLowerCase())),
              );

        setResults(filteredResults);
        setIsLoading(false);
      } catch (err) {
        console.error("Search error:", err);
        setError("An error occurred while searching. Please try again.");
        setIsLoading(false);
      }
    }, 1000);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const filterResults = (results: SearchResult[]) => {
    if (activeFilter === "all") return results;
    return results.filter((result) => result.type === activeFilter);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case "event":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "venue":
        return <Building className="h-5 w-5 text-green-500" />;
      case "organizer":
        return <User className="h-5 w-5 text-purple-500" />;
      default:
        return <Search className="h-5 w-5" />;
    }
  };

  const handleRetry = () => {
    performSearch(searchQuery);
  };

  return (
    <PageLayout hideSearch={true}>
      <main className="flex-1 p-4 relative z-10">
        <div className="mb-6">
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <Input
              type="text"
              placeholder="SEARCH EVENTS, VENUES, ORGANIZERS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 font-['Roboto'] uppercase text-sm"
              autoFocus
            />
            <Button type="submit" className="ml-2 bg-[#0A1128]">
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </div>

        {/* Filter Tabs */}
        <div className="flex border-b border-gray-200 mb-6 overflow-x-auto">
          <button
            className={`py-2 px-4 font-semibold text-center whitespace-nowrap ${activeFilter === "all" ? "text-[#0A1128] border-b-2 border-[#0A1128]" : "text-gray-500"}`}
            onClick={() => setActiveFilter("all")}
          >
            ALL RESULTS
          </button>
          <button
            className={`py-2 px-4 font-semibold text-center whitespace-nowrap ${activeFilter === "event" ? "text-[#0A1128] border-b-2 border-[#0A1128]" : "text-gray-500"}`}
            onClick={() => setActiveFilter("event")}
          >
            EVENTS
          </button>
          <button
            className={`py-2 px-4 font-semibold text-center whitespace-nowrap ${activeFilter === "venue" ? "text-[#0A1128] border-b-2 border-[#0A1128]" : "text-gray-500"}`}
            onClick={() => setActiveFilter("venue")}
          >
            VENUES
          </button>
          <button
            className={`py-2 px-4 font-semibold text-center whitespace-nowrap ${activeFilter === "organizer" ? "text-[#0A1128] border-b-2 border-[#0A1128]" : "text-gray-500"}`}
            onClick={() => setActiveFilter("organizer")}
          >
            ORGANIZERS
          </button>
        </div>

        {/* Search Results */}
        <div className="space-y-4">
          {error ? (
            // Error state
            <div className="text-center py-10">
              <div className="mb-4 text-red-500">
                <svg
                  className="h-12 w-12 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-600 uppercase">
                NETWORK ERROR
              </h3>
              <p className="text-gray-500 mt-2 mb-4">{error}</p>
              <Button onClick={handleRetry} className="bg-[#0A1128] text-white">
                TRY AGAIN
              </Button>
            </div>
          ) : isLoading ? (
            // Loading state
            <div className="flex flex-col space-y-4">
              {[1, 2, 3].map((item) => (
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
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filterResults(results).length > 0 ? (
            filterResults(results).map((result) => (
              <div
                key={`${result.type}-${result.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
                onClick={() => {
                  // Navigate based on result type
                  if (result.type === "event") {
                    navigate(`/event/${result.id}`);
                  } else if (result.type === "venue") {
                    navigate(`/venue/${result.id}`);
                  } else if (result.type === "organizer") {
                    navigate(`/organizer/${result.id}`);
                  }
                }}
              >
                {result.type === "event" ? (
                  <EventCard
                    id={result.id.toString()}
                    title={result.title}
                    description={result.description}
                    date={result.date || ""}
                    time={result.time || ""}
                    image={result.image}
                    price={result.price || "FREE"}
                  />
                ) : (
                  <div className="flex">
                    <div className="w-20 h-20 bg-gray-100 flex-shrink-0">
                      <img
                        src={result.image}
                        alt={result.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3 flex-1">
                      <div className="flex items-center mb-1">
                        {getResultIcon(result.type)}
                        <span className="text-xs text-gray-500 ml-1 uppercase">
                          {result.type === "venue" ? "VENUE" : "ORGANIZER"}
                        </span>
                      </div>
                      <h3 className="font-bold text-sm uppercase">
                        {result.title}
                      </h3>
                      <p className="text-xs text-gray-600 line-clamp-1">
                        {result.description}
                      </p>
                      {result.location && (
                        <div className="flex items-center mt-1 text-xs text-gray-500">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{result.location}</span>
                        </div>
                      )}
                      {result.rating && (
                        <div className="mt-1 text-xs font-semibold">
                          Rating: {result.rating}/5
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-10">
              <div className="mb-4">
                <Search className="h-12 w-12 mx-auto text-gray-300" />
              </div>
              <h3 className="text-lg font-medium text-gray-600 uppercase">
                NO RESULTS FOUND
              </h3>
              <p className="text-gray-500 mt-2">
                Try different keywords or browse categories
              </p>
            </div>
          )}
        </div>
      </main>
    </PageLayout>
  );
};

export default SearchResults;
