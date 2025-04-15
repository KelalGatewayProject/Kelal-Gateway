import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";

const Credits: React.FC = () => {
  return (
    <PageLayout>
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
    </PageLayout>
  );
};

export default Credits;
