import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react";
import PageLayout from "@/components/PageLayout";

const Wallet: React.FC = () => {
  const navigate = useNavigate();

  // Sample transaction data
  const transactions = [
    {
      id: 1,
      type: "received",
      amount: 25,
      from: "Sarah Johnson",
      date: "Oct 15, 2024",
    },
    {
      id: 2,
      type: "sent",
      amount: 50,
      to: "Michael Chen",
      date: "Oct 12, 2024",
    },
    {
      id: 3,
      type: "received",
      amount: 100,
      from: "Event Reward",
      date: "Oct 10, 2024",
    },
    {
      id: 4,
      type: "sent",
      amount: 75,
      to: "Aisha Mohammed",
      date: "Oct 5, 2024",
    },
    {
      id: 5,
      type: "received",
      amount: 25,
      from: "Referral Bonus",
      date: "Oct 1, 2024",
    },
  ];

  return (
    <PageLayout>
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">WALLET</h1>
      </div>

      <main className="flex-1 p-4 relative z-10">
        {/* Credit Card */}
        <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white rounded-xl p-6 shadow-lg mb-6">
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-sm opacity-80">BALANCE</p>
              <p className="text-3xl font-bold flex items-center">
                500 <span className="ml-1 text-xl">ᚕ</span>
              </p>
            </div>
            <CreditCard className="h-8 w-8 opacity-80" />
          </div>

          <div className="flex justify-between">
            <div>
              <p className="text-xs opacity-80">ACCOUNT NUMBER</p>
              <p className="font-mono">0984715947</p>
            </div>
            <div>
              <p className="text-xs opacity-80">MEMBER SINCE</p>
              <p>MAR 2024</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4 mb-6">
          <Button
            className="flex-1 bg-[#0A1128] text-white py-3 flex items-center justify-center"
            onClick={() => navigate("/transfer-credits")}
          >
            <ArrowUpRight className="h-5 w-5 mr-2" />
            SEND
          </Button>
          <Button
            className="flex-1 bg-[#0A1128] text-white py-3 flex items-center justify-center"
            onClick={() => navigate("/invite-friends")}
          >
            <Plus className="h-5 w-5 mr-2" />
            EARN MORE
          </Button>
        </div>

        {/* Transactions */}
        <div>
          <h2 className="font-bold mb-4">RECENT TRANSACTIONS</h2>

          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="bg-white p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${transaction.type === "received" ? "bg-green-100" : "bg-red-100"}`}
                  >
                    {transaction.type === "received" ? (
                      <ArrowDownRight className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowUpRight className="h-5 w-5 text-red-600" />
                    )}
                  </div>

                  <div className="flex-1">
                    <p className="font-semibold">
                      {transaction.type === "received"
                        ? `From ${transaction.from}`
                        : `To ${transaction.to}`}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>

                  <div
                    className={`font-bold ${transaction.type === "received" ? "text-green-600" : "text-red-600"}`}
                  >
                    {transaction.type === "received" ? "+" : "-"}
                    {transaction.amount} ᚕ
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <Button variant="link" className="text-blue-600">
              View All Transactions
            </Button>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default Wallet;
