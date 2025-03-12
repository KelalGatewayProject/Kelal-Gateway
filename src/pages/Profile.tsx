import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Settings,
  CreditCard,
  Users,
  LogOut,
  Gift,
  Calendar,
  Ticket,
} from "lucide-react";

const Profile: React.FC = () => {
  // User data (in a real app, this would come from a backend)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+251 91 234 5678",
    credits: 500,
    joinDate: "March 2024",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  };

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
            <Link to="/app-settings">
              <Settings className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Profile Header */}
        <div className="bg-[#0A1128] text-white p-6">
          <div className="flex items-center">
            <div className="w-20 h-20 rounded-full bg-white overflow-hidden mr-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-sm opacity-80">Member since {user.joinDate}</p>
              <div className="flex items-center mt-2">
                <CreditCard className="h-4 w-4 mr-1" />
                <span className="font-bold">{user.credits} Credits</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Menu */}
        <div className="p-4 space-y-4">
          <Link
            to="/my-tickets"
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-full mr-3">
                <Ticket className="h-5 w-5 text-blue-600" />
              </div>
              <span className="font-semibold">My Tickets</span>
            </div>
            <span className="text-gray-400">→</span>
          </Link>

          <Link
            to="/calendar"
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              <div className="bg-green-100 p-2 rounded-full mr-3">
                <Calendar className="h-5 w-5 text-green-600" />
              </div>
              <span className="font-semibold">Calendar</span>
            </div>
            <span className="text-gray-400">→</span>
          </Link>

          <Link
            to="/credits"
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              <div className="bg-yellow-100 p-2 rounded-full mr-3">
                <CreditCard className="h-5 w-5 text-yellow-600" />
              </div>
              <span className="font-semibold">Credits</span>
            </div>
            <span className="text-gray-400">→</span>
          </Link>

          <Link
            to="/invite-friends"
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              <div className="bg-purple-100 p-2 rounded-full mr-3">
                <Gift className="h-5 w-5 text-purple-600" />
              </div>
              <span className="font-semibold">Invite Friends</span>
            </div>
            <span className="text-gray-400">→</span>
          </Link>

          <Link
            to="/friends"
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm"
          >
            <div className="flex items-center">
              <div className="bg-pink-100 p-2 rounded-full mr-3">
                <Users className="h-5 w-5 text-pink-600" />
              </div>
              <span className="font-semibold">Friends</span>
            </div>
            <span className="text-gray-400">→</span>
          </Link>

          <div className="pt-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center text-red-500 border-red-200"
            >
              <LogOut className="h-5 w-5 mr-2" />
              <span>Log Out</span>
            </Button>
          </div>
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
            className="flex flex-col items-center text-blue-600"
          >
            <div className="w-6 h-6 rounded-full overflow-hidden">
              <img src={user.avatar} alt="Profile" className="w-full h-full" />
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

export default Profile;
