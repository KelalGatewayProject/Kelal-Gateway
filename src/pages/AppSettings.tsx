import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";
import PageLayout from "@/components/PageLayout";

const AppSettings: React.FC = () => {
  const [language, setLanguage] = useState("ENGLISH");
  const [city, setCity] = useState("CITY");
  const [email, setEmail] = useState("name@server.com");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(
    "https://imgur.com/zkK19cm.png",
  ); // Default profile image

  // Handle profile image change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <PageLayout>
      {/* Move content down by adding padding to the top */}
      <main className="flex-1 p-4 relative z-0 pt-16 overflow-y-auto">
        {/* Profile Image and Upload Button Section */}
        <div className="flex flex-col items-center mb-8">
          {/* Profile Image */}
          <div className="relative w-32 h-32 rounded-full overflow-hidden">
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Upload Image Text */}
          <label
            htmlFor="profile-image-upload"
            className="mt-4 text-sm font-semibold text-[#030F29] cursor-pointer hover:underline"
          >
            UPLOAD IMAGE
            <input
              id="profile-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* Settings Content */}
        <div className="space-y-6 max-w-md mx-auto">
          {/* Language Selection */}
          <div className="p-6 bg-gray-100 rounded-lg">
            <h1 className="text-xl font-bold mb-4 text-center">
              SELECT YOUR LANGUAGE:
            </h1>
            <div className="relative">
              <select
                className="w-full p-3 bg-white text-gray-800 rounded-md appearance-none text-center font-bold border border-gray-300"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="ENGLISH">ENGLISH</option>
                <option value="AMHARIC">AMHARIC</option>
                <option value="FRENCH">FRENCH</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-800"
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

          {/* City Selection */}
          <div className="p-6 bg-gray-100 rounded-lg">
            <h1 className="text-xl font-bold mb-4 text-center">CHANGE CITY</h1>
            <div className="relative">
              <select
                className="w-full p-3 bg-white text-gray-800 rounded-md appearance-none text-center font-bold border border-gray-300"
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
                  className="w-5 h-5 text-gray-800"
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

          {/* Email Change */}
          <div className="p-6 bg-gray-100 rounded-lg">
            <h1 className="text-xl font-bold mb-4 text-center">
              CHANGE EMAIL ADDRESS:
            </h1>
            <div className="w-full">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-white text-gray-800 rounded-md text-center border border-gray-300"
              />
            </div>
          </div>

          {/* Password Change */}
          <div className="p-6 bg-gray-100 rounded-lg">
            <h1 className="text-xl font-bold mb-4 text-center">
              CHANGE PASSWORD:
            </h1>
            <div className="w-full relative">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-white text-gray-800 rounded-md text-center border border-gray-300"
                placeholder="NEW PASSWORD"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <Eye className="h-5 w-5 text-gray-800" />
              </div>
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="text-center mt-8">
            <Button className="bg-[#0A1128] text-white font-bold py-3 px-8 rounded-md">
              SAVE CHANGES
            </Button>
          </div>
        </div>
      </main>
    </PageLayout>
  );
};

export default AppSettings;
