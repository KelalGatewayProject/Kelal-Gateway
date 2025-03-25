import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Copy, Share2 } from "lucide-react";
import PageLayout from "@/components/PageLayout";

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
    <PageLayout>
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">INVITE FRIENDS</h1>
      </div>

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
                inputMode="tel"
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
    </PageLayout>
  );
};

export default InviteFriends;
