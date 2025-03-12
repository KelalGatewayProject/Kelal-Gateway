import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Copy, Share2 } from "lucide-react";

const InviteFriends: React.FC = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const referralCode = "KELAL25";

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    // In a real app, you would show a toast notification here
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

      {/* Header */}
      <header className="bg-white border-b border-gray-200 relative z-10">
        <div className="flex items-center p-4">
          <button onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold">INVITE FRIENDS</h1>
        </div>
      </header>

      <main className="flex-1 p-4 relative z-10">
        {/* Referral Code Section */}
        <div className="bg-[#0A1128] text-white p-4 rounded-lg mb-6">
          <h2 className="text-center font-bold mb-2">YOUR REFERRAL CODE</h2>
          <div className="flex items-center justify-between bg-white bg-opacity-10 p-3 rounded">
            <span className="text-xl font-bold">{referralCode}</span>
            <button
              onClick={handleCopyCode}
              className="bg-white text-[#0A1128] p-2 rounded-full"
            >
              <Copy className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Invite Methods */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-bold mb-3">INVITE BY EMAIL</h2>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button className="bg-[#0A1128] text-white">SEND</Button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-3">INVITE BY SMS</h2>
            <div className="flex space-x-2">
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1"
              />
              <Button className="bg-[#0A1128] text-white">SEND</Button>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-bold mb-3">SHARE YOUR LINK</h2>
            <Button
              className="w-full flex items-center justify-center space-x-2 bg-[#0A1128] text-white py-3"
              onClick={() => {
                // In a real app, this would open the native share dialog
                navigator.share({
                  title: "Join me on K'elal Gateway",
                  text: `Use my referral code ${referralCode} to sign up and get 25 credits!`,
                  url: "https://kelal.app/referral?code=" + referralCode,
                });
              }}
            >
              <Share2 className="h-5 w-5" />
              <span>SHARE</span>
            </Button>
          </div>
        </div>

        {/* Rewards Info */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-center font-bold mb-3">REWARDS</h2>
          <p className="text-center mb-4">
            For each friend who signs up using your referral code, you'll both
            receive:
          </p>
          <div className="flex justify-center">
            <div className="bg-[#0A1128] text-white font-bold text-2xl py-2 px-6 rounded">
              25 CREDITS
            </div>
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

export default InviteFriends;
