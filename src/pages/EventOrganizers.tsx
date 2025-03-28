import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const EventOrganizers: React.FC = () => {
  const organizers = [
    {
      id: 1,
      name: "CHIMP EVENT",
      description: "full-service event organizing company based in Addis Ababa",
      phone: "+251 95 109 0991",
      logo: "https://api.dicebear.com/7.x/initials/svg?seed=CE&backgroundColor=yellow",
    },
    // ... other organizers data
  ];

  return (
    <PageLayout>
      <main className="flex-1 p-4 relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">EVENT ORGANIZERS</h1>
        </div>

        {/* Event Organizers List - Completely shadow-free */}
        <div className="space-y-4 mb-6">
          {organizers.map((organizer) => (
            <Link
              to={`/event-organizer/${organizer.id}`}
              key={organizer.id}
              className="no-underline"
            >
              <div className="bg-white rounded-lg overflow-hidden flex border border-gray-200 h-24">
                <div className="w-24 h-full flex-shrink-0">
                  <img
                    src={organizer.logo}
                    alt={organizer.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold">{organizer.name}</h3>
                    <p className="text-sm text-gray-600">
                      {organizer.description}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-bold mt-1">{organizer.phone}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 text-xs rounded-full border border-gray-300" // Added explicit border
                    >
                      <Share className="h-3 w-3 mr-1" /> SHARE
                    </Button>
                  </div>
                </div>

                <div className="flex items-center pr-2">
                  <div className="bg-gray-200 p-1 rounded-full border border-gray-300">
                    {" "}
                    {/* Added border */}
                    <span className="text-lg">♿</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Sponsored Ad - Completely shadow-free */}
        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-1">SPONSORED</p>
          <div className="bg-gray-800 text-white rounded-lg overflow-hidden relative border border-gray-700">
            {" "}
            {/* Added border */}
            <img
              src="https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500&q=80"
              alt="Diageo"
              className="w-full h-32 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent">
              <div className="flex justify-between items-end">
                <h3 className="text-xl font-bold text-yellow-400">DIAGEO</h3>
                <div className="flex space-x-2">
                  <Button className="bg-[#0A1128] text-white text-xs py-1 px-3 rounded border border-[#0A1128]">
                    {" "}
                    {/* Added border */}
                    <Share className="h-3 w-3 mr-1" /> SHARE
                  </Button>
                  <Button className="bg-[#0A1128] text-white text-xs py-1 px-3 rounded border border-[#0A1128]">
                    {" "}
                    {/* Added border */}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default EventOrganizers;
