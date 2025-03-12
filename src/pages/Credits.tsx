import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Credits: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(https://imgur.com/fSvWmgU.png)",
          opacity: "0.1",
        }}
      />

      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 relative z-10">
        <div className="flex justify-between items-center p-3">
          <div className="flex items-center">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=kelal"
              alt="Logo"
              className="h-8 w-8"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=ticket"
                alt="Ticket"
                className="h-6 w-6"
              />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                1
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 p-4 relative z-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">K'ELAL CREDITS</h1>
        </div>

        {/* Credit Card */}
        <div className="bg-blue-500 text-white rounded-lg p-6 shadow-lg mb-8">
          <div className="mb-4">
            <p className="text-sm">ACCOUNT NUMBER</p>
            <p className="text-xl font-bold">0984715947</p>
          </div>

          <div className="flex items-center mb-4">
            <div className="w-10 h-8 bg-yellow-200 rounded-md mr-2 flex items-center justify-center">
              <div className="w-6 h-4 bg-yellow-600 rounded-sm"></div>
            </div>
          </div>

          <div>
            <p className="text-sm">CREDITS ACCUMULATED</p>
            <p className="text-4xl font-bold flex items-center">
              500 <span className="ml-1 text-2xl">ᚕ</span>
            </p>
          </div>
        </div>

        {/* Information */}
        <div className="text-center mb-8">
          <p className="text-lg font-bold mb-4">
            EARN AND SPEND YOUR 'REWARD CREDITS" FOR TICKET PURCHASES, DRINKS OR
            EVENT MERCHANDISE
          </p>

          <Button className="bg-[#0A1128] text-white font-bold py-3 px-8 rounded-md mb-6">
            INVITE FRIENDS
          </Button>

          <p className="font-bold mb-4">25 CREDIT POINTS</p>

          <p className="font-bold mb-2">EARN EVEN MORE CREDITS</p>

          <div className="space-y-2 mb-4">
            <p>GET A 'PAID TICKET', 15 CREDIT POINTS</p>
            <p>GET A 'FREE TICKET', 05 CREDIT POINTS</p>
            <p>SHARE AN "EVENT", 02 CREDIT POINTS</p>
          </div>

          <p className="text-sm">
            YOUR CREDIT POINTS WILL BE AUTOMATICALLY UPDATED TO YOUR ACCOUNT
          </p>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-gray-100 border-t border-gray-200 fixed bottom-0 w-full z-10">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className="flex flex-col items-center text-gray-500">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            to="/profile"
            className="flex flex-col items-center text-gray-500"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=user"
                alt="Profile"
                className="w-full h-full"
              />
            </div>
            <span className="text-xs mt-1">Profile</span>
          </Link>
          <Link
            to="/calendar"
            className="flex flex-col items-center text-gray-500"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
            <span className="text-xs mt-1">Calendar</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Credits;
