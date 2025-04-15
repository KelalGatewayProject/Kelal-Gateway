import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, User } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const TransferCredits: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const navigate = useNavigate();

  // Sample user data
  const users = [
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      id: "2",
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=michael",
    },
    {
      id: "3",
      name: "Aisha Mohammed",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aisha",
    },
    {
      id: "4",
      name: "David Bekele",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=david",
    },
  ];

  // Filter users based on search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <PageLayout>
      <div className="flex items-center p-4">
        <button onClick={() => navigate(-1)} className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold">TRANSFER CREDITS</h1>
      </div>

      <main className="flex-1 p-4 relative z-10">
        {/* Credit Balance */}
        <div className="bg-[#0A1128] text-white p-4 rounded-lg mb-6">
          <p className="text-center text-sm mb-1">YOUR CREDIT BALANCE</p>
          <p className="text-center text-3xl font-bold flex items-center justify-center">
            500 <span className="ml-1 text-xl">ᚕ</span>
          </p>
        </div>

        {/* Search Users */}
        <div className="mb-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              placeholder="Search friends"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* User List */}
        <div className="mb-6">
          <h2 className="font-bold mb-3">SELECT RECIPIENT</h2>

          <div className="space-y-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`flex items-center p-3 rounded-lg cursor-pointer ${selectedUser === user.id ? "bg-blue-50 border border-blue-200" : "bg-white"}`}
                onClick={() => setSelectedUser(user.id)}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-medium">{user.name}</span>

                {selectedUser === user.id && (
                  <div className="ml-auto w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  </div>
                )}
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No users found
              </div>
            )}
          </div>
        </div>

        {/* Amount Input */}
        {selectedUser && (
          <div className="mb-8">
            <h2 className="font-bold mb-3">ENTER AMOUNT</h2>

            <div className="flex items-center bg-white p-3 rounded-lg">
              <Input
                type="number"
                inputMode="numeric"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-2xl font-bold text-center border-none"
                min="1"
                max="500"
              />
              <span className="text-xl ml-2">ᚕ</span>
            </div>

            <div className="flex justify-between mt-2 text-sm">
              <button
                className="text-blue-600"
                onClick={() => setAmount("100")}
              >
                100 ᚕ
              </button>
              <button
                className="text-blue-600"
                onClick={() => setAmount("200")}
              >
                200 ᚕ
              </button>
              <button
                className="text-blue-600"
                onClick={() => setAmount("300")}
              >
                300 ᚕ
              </button>
              <button
                className="text-blue-600"
                onClick={() => setAmount("500")}
              >
                500 ᚕ
              </button>
            </div>
          </div>
        )}

        {/* Transfer Button */}
        <Button
          className="w-full bg-[#0A1128] text-white py-3"
          disabled={!selectedUser || !amount || parseInt(amount) <= 0}
        >
          TRANSFER CREDITS
        </Button>
      </main>
    </PageLayout>
  );
};

export default TransferCredits;
