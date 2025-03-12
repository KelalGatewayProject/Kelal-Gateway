import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";

const AppSettings: React.FC = () => {
  const [showDay, setShowDay] = useState(false);
  const [showYear, setShowYear] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [language, setLanguage] = useState("ENGLISH");
  const [city, setCity] = useState("CITY");
  const [email, setEmail] = useState("name@server.com");
  const [password, setPassword] = useState("");

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
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-xl font-bold mb-2">SHOW DAY & MONTH</h1>
            <div className="flex justify-center items-center">
              <span className="mr-4">ONLY YOU</span>
              <div
                className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer ${showDay ? "bg-red-500 justify-end" : "bg-gray-300 justify-start"}`}
                onClick={() => setShowDay(!showDay)}
              >
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <span className="ml-4">YOUR FRIENDS</span>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-xl font-bold mb-2">SHOW YEAR</h1>
            <div className="flex justify-center items-center">
              <span className="mr-4">ONLY YOU</span>
              <div
                className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer ${showYear ? "bg-red-500 justify-end" : "bg-gray-300 justify-start"}`}
                onClick={() => setShowYear(!showYear)}
              >
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <span className="ml-4">YOUR FRIENDS</span>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-xl font-bold mb-2">SELECT YOUR LANGUAGE:</h1>
            <div className="relative w-full max-w-md mx-auto">
              <select
                className="w-full p-3 bg-[#0A1128] text-white rounded-md appearance-none text-center font-bold"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="ENGLISH">ENGLISH</option>
                <option value="AMHARIC">AMHARIC</option>
                <option value="FRENCH">FRENCH</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-xl font-bold mb-2">CHANGE CITY</h1>
            <div className="relative w-full max-w-md mx-auto">
              <select
                className="w-full p-3 bg-[#0A1128] text-white rounded-md appearance-none text-center font-bold"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="CITY">CITY</option>
                <option value="ADDIS ABABA">ADDIS ABABA</option>
                <option value="BAHIR DAR">BAHIR DAR</option>
                <option value="HAWASSA">HAWASSA</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-xl font-bold mb-2">CHANGE EMAIL ADDRESS:</h1>
            <div className="w-full max-w-md mx-auto">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-[#0A1128] text-white rounded-md text-center"
              />
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-xl font-bold mb-2">SHOW EMAIL</h1>
            <div className="flex justify-center items-center">
              <span className="mr-4">ONLY YOU</span>
              <div
                className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer ${showEmail ? "bg-red-500 justify-end" : "bg-gray-300 justify-start"}`}
                onClick={() => setShowEmail(!showEmail)}
              >
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
              <span className="ml-4">YOUR FRIENDS</span>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-xl font-bold mb-2">CHANGE PASSWORD:</h1>
            <div className="w-full max-w-md mx-auto relative">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-[#0A1128] text-white rounded-md text-center"
                placeholder="NEW PASSWORD"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Eye className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button className="bg-[#0A1128] text-white font-bold py-3 px-8 rounded-md">
              SAVE CHANGES
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

export default AppSettings;
