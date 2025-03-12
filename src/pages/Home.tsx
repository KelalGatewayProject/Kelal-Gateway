import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Search,
  Bell,
  Menu,
  Home as HomeIcon,
  Calendar,
  User,
} from "lucide-react";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="flex justify-between items-center p-3">
          <div className="flex items-center">
            <img
              src="https://imgur.com/JesyebX.png"
              alt="Kelal Logo"
              className="h-8 w-8"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src="https://imgur.com/JesyebX.png"
                alt="Kelal Payment"
                className="h-6 w-6"
              />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                1
              </span>
            </div>
            <Menu className="h-6 w-6" />
            <Bell className="h-6 w-6" />
            <Search className="h-6 w-6" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex justify-between items-center px-3 py-2 bg-white border-b border-gray-200 text-sm font-semibold">
          <div>CATEGORIES</div>
          <div>VENUES & CLUBS</div>
          <div>EVENT ORG</div>
        </div>
      </header>

      {/* Event Categories */}
      <div className="flex overflow-x-auto p-3 border-b border-gray-200">
        <Link
          to="/events"
          className="flex flex-col items-center justify-center w-16 h-16 border border-gray-300 rounded-lg mx-2"
        >
          <span className="text-2xl">🎵</span>
          <span className="text-xs mt-1 text-center">All Events</span>
        </Link>
        <Link
          to="/parties"
          className="flex flex-col items-center justify-center w-16 h-16 border border-gray-300 rounded-lg mx-2"
        >
          <span className="text-2xl">🎧</span>
          <span className="text-xs mt-1 text-center">PARTIES</span>
        </Link>
        <Link
          to="/concerts"
          className="flex flex-col items-center justify-center w-16 h-16 border border-gray-300 rounded-lg mx-2"
        >
          <span className="text-2xl">🎤</span>
          <span className="text-xs mt-1 text-center">CONCERT</span>
        </Link>
        <Link
          to="/activities"
          className="flex flex-col items-center justify-center w-16 h-16 border border-gray-300 rounded-lg mx-2"
        >
          <span className="text-2xl">🎫</span>
          <span className="text-xs mt-1 text-center">ACTIVITIES</span>
        </Link>
        <Link
          to="/festivals"
          className="flex flex-col items-center justify-center w-16 h-16 border border-gray-300 rounded-lg mx-2"
        >
          <span className="text-2xl">🎉</span>
          <span className="text-xs mt-1 text-center">FESTIVALS</span>
        </Link>
        <Link
          to="/conventions"
          className="flex flex-col items-center justify-center w-16 h-16 border border-gray-300 rounded-lg mx-2"
        >
          <span className="text-2xl">📜</span>
          <span className="text-xs mt-1 text-center">CONVENTIONS</span>
        </Link>
        <Link
          to="/networking"
          className="flex flex-col items-center justify-center w-16 h-16 border border-gray-300 rounded-lg mx-2"
        >
          <span className="text-2xl">🤝</span>
          <span className="text-xs mt-1 text-center">NETWORKING</span>
        </Link>
        <Link
          to="/sports"
          className="flex flex-col items-center justify-center w-16 h-16 border border-gray-300 rounded-lg mx-2"
        >
          <span className="text-2xl">⚽</span>
          <span className="text-xs mt-1 text-center">SPORTS</span>
        </Link>
        <Link
          to="/school"
          className="flex flex-col items-center justify-center w-16 h-16 border border-gray-300 rounded-lg mx-2"
        >
          <span className="text-2xl">🎓</span>
          <span className="text-xs mt-1 text-center">SCHOOL</span>
        </Link>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-3">
        {/* Newly Added Events */}
        <h2 className="text-lg font-bold my-4">NEWLY ADDED EVENTS</h2>

        {/* Event List */}
        <div
          className="space-y-4 overflow-y-auto"
          style={{ maxHeight: "400px" }}
        >
          {/* Event 1 */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="flex">
              <img
                src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=300&q=80"
                alt="Event"
                className="w-20 h-20 object-cover"
              />
              <div className="p-2 flex-1">
                <h3 className="font-semibold">አሁድ mood</h3>
                <p className="text-xs text-gray-600">
                  Following that, enjoy a delicious BBQ pop-up...
                </p>
                <div className="flex justify-between mt-1 text-xs">
                  <span>October 13</span>
                  <span>2:30 PM</span>
                  <span className="text-green-500 font-semibold">FREE</span>
                </div>
              </div>
              <div className="flex items-center pr-2">
                <div className="bg-gray-200 p-1 rounded-full">
                  <span className="text-lg">♿</span>
                </div>
              </div>
            </div>
          </div>

          {/* Event 2 */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="flex">
              <img
                src="https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=300&q=80"
                alt="Event"
                className="w-20 h-20 object-cover"
              />
              <div className="p-2 flex-1">
                <h3 className="font-semibold">Jubilation Africa</h3>
                <p className="text-xs text-gray-600">
                  Afrocentric celebration featuring top DJs...
                </p>
                <div className="flex justify-between mt-1 text-xs">
                  <span>March 23</span>
                  <span>4:00 PM</span>
                  <span className="text-red-500 font-semibold">500</span>
                </div>
              </div>
              <div className="flex items-center pr-2">
                <div className="bg-gray-200 p-1 rounded-full">
                  <span className="text-lg">♿</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sponsored Ad */}
          <div className="bg-red-600 text-white p-2 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs">SPONSORED</span>
                <div className="flex items-center">
                  <span className="text-sm font-bold">
                    The Gift That MAKES AN ENTRANCE
                  </span>
                  <img
                    src="https://images.unsplash.com/photo-1569529465841-dfecdab7503b?w=100&q=80"
                    alt="Johnnie Walker"
                    className="h-10 ml-2"
                  />
                </div>
              </div>
              <button className="bg-black text-white text-xs px-2 py-1 rounded">
                DISCOVER MORE
              </button>
            </div>
          </div>

          {/* Event 3 */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="flex">
              <img
                src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?w=300&q=80"
                alt="Event"
                className="w-20 h-20 object-cover"
              />
              <div className="p-2 flex-1">
                <h3 className="font-semibold">JULIAN MARLEY</h3>
                <p className="text-xs text-gray-600">
                  Festival lovers, families, reggae lovers!!!
                </p>
                <div className="flex justify-between mt-1 text-xs">
                  <span>July 20</span>
                  <span>7:00 PM</span>
                  <div>
                    <span className="text-red-500 font-semibold">GEN: 600</span>
                    <span className="text-red-500 font-semibold ml-1">
                      VIP: 1200
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center pr-2">
                <div className="bg-gray-200 p-1 rounded-full">
                  <span className="text-lg">♿</span>
                </div>
              </div>
            </div>
          </div>

          {/* Event 4 */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="flex">
              <img
                src="https://images.unsplash.com/photo-1472653431158-6364773b2a56?w=300&q=80"
                alt="Event"
                className="w-20 h-20 object-cover"
              />
              <div className="p-2 flex-1">
                <h3 className="font-semibold">LinkUp Bazaar</h3>
                <p className="text-xs text-gray-600">
                  Two-day food and family festival with more than 85...
                </p>
                <div className="flex justify-between mt-1 text-xs">
                  <span>October 23</span>
                  <span>9:00 AM</span>
                  <span className="text-green-500 font-semibold">FREE</span>
                </div>
              </div>
              <div className="flex items-center pr-2">
                <div className="bg-gray-200 p-1 rounded-full">
                  <span className="text-lg">♿</span>
                </div>
              </div>
            </div>
          </div>

          {/* Explore More Button */}
          <div className="flex justify-center my-4">
            <Button className="bg-black text-white px-4 py-2 rounded-md">
              EXPLORE MORE EVENTS
            </Button>
          </div>
        </div>

        {/* Venues & Clubs */}
        <div className="my-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">VENUES & CLUBS</h2>
            <span className="text-lg">→</span>
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-2">
            <div className="flex flex-col items-center min-w-[100px]">
              <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mb-2">
                <span className="text-green-500 text-2xl">W</span>
              </div>
              <span className="text-xs text-center font-semibold">
                THE VENUE WARHOUSE
              </span>
              <Button
                variant="outline"
                className="mt-1 text-xs py-0 h-6 rounded-full bg-black text-white border-none"
              >
                Follow
              </Button>
            </div>

            <div className="flex flex-col items-center min-w-[100px]">
              <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mb-2">
                <span className="text-yellow-500 text-2xl">F</span>
              </div>
              <span className="text-xs text-center font-semibold">
                FLIRT LOUNGE
              </span>
              <Button
                variant="outline"
                className="mt-1 text-xs py-0 h-6 rounded-full bg-black text-white border-none"
              >
                Follow
              </Button>
            </div>

            <div className="flex flex-col items-center min-w-[100px]">
              <div className="w-16 h-16 rounded-full bg-white border border-red-500 flex items-center justify-center mb-2">
                <span className="text-red-500 text-2xl">V</span>
              </div>
              <span className="text-xs text-center font-semibold">
                V LOUNGE
              </span>
              <Button
                variant="outline"
                className="mt-1 text-xs py-0 h-6 rounded-full bg-black text-white border-none"
              >
                Follow
              </Button>
            </div>
          </div>
        </div>

        {/* Event Organizers */}
        <div className="my-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">EVENT ORGANIZERS</h2>
            <span className="text-lg">→</span>
          </div>

          <div className="flex space-x-4 overflow-x-auto pb-2">
            <div className="flex flex-col items-center min-w-[120px] bg-white p-2 rounded-lg border border-gray-200">
              <div className="w-16 h-16 flex items-center justify-center mb-2">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=shega"
                  alt="Shega Events"
                  className="w-full h-full"
                />
              </div>
              <span className="text-xs text-center font-semibold">
                SHEGA EVENTS AND PROMOTION
              </span>
              <Button
                variant="outline"
                className="mt-1 text-xs py-0 h-6 rounded-full bg-black text-white border-none"
              >
                Follow
              </Button>
            </div>

            <div className="flex flex-col items-center min-w-[120px] bg-black p-2 rounded-lg">
              <div className="w-16 h-16 flex items-center justify-center mb-2">
                <span className="text-orange-500 text-2xl font-bold">
                  RIDON
                </span>
              </div>
              <span className="text-xs text-center font-semibold text-white">
                RIDON EVENTS
              </span>
              <Button
                variant="outline"
                className="mt-1 text-xs py-0 h-6 rounded-full bg-black text-white border border-white"
              >
                Follow
              </Button>
            </div>

            <div className="flex flex-col items-center min-w-[120px] bg-white p-2 rounded-lg border border-gray-200">
              <div className="w-16 h-16 flex items-center justify-center mb-2">
                <span className="text-yellow-500 text-2xl font-bold">F</span>
              </div>
              <span className="text-xs text-center font-semibold">
                CHIMP EVENTS
              </span>
              <Button
                variant="outline"
                className="mt-1 text-xs py-0 h-6 rounded-full bg-black text-white border-none"
              >
                Follow
              </Button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-xs text-gray-500 my-6">
          ©COPYRIGHT 2024/25 K'ELAL GATEWAY PLC
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-gray-100 border-t border-gray-200 fixed bottom-0 w-full">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className="flex flex-col items-center text-blue-600">
            <HomeIcon className="h-5 w-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            to="/profile"
            className="flex flex-col items-center text-gray-500"
          >
            <User className="h-5 w-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
          <Link
            to="/calendar"
            className="flex flex-col items-center text-gray-500"
          >
            <Calendar className="h-5 w-5" />
            <span className="text-xs mt-1">Calendar</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Home;
