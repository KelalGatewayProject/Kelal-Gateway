import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { Button } from "@/components/ui/button";
import { MapPin, Globe } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProfileSetup: React.FC = () => {
  const { userProfile, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  // Initialize with existing profile data if available
  const [birthDate, setBirthDate] = useState<{
    year: string;
    month: string;
    day: string;
  }>(
    userProfile?.birthDate || {
      year: "",
      month: "",
      day: "",
    },
  );

  const [city, setCity] = useState<string>(userProfile?.city || "");
  const [language, setLanguage] = useState<string>(userProfile?.language || "");

  // Load profile data if available
  useEffect(() => {
    if (userProfile) {
      if (userProfile.birthDate) {
        setBirthDate(userProfile.birthDate);
      }
      if (userProfile.city) {
        setCity(userProfile.city);
      }
      if (userProfile.language) {
        setLanguage(userProfile.language);
      }
    }
  }, [userProfile]);

  // Generate arrays for years, months, and days
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) =>
    (currentYear - i).toString(),
  );
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

  const handleBirthDateChange = (
    type: "year" | "month" | "day",
    value: string,
  ) => {
    setBirthDate((prev) => ({ ...prev, [type]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // DEVELOPMENT ONLY: Skip profile setup
    // TODO: REMOVE BEFORE PRODUCTION
    console.log("DEV MODE: Skipping profile setup and proceeding to home");
    navigate("/");
    return;

    // Save profile data to auth context
    updateUserProfile({
      birthDate,
      city,
      language,
    });

    console.log("Profile data saved:", { birthDate, city, language });
    navigate("/");
  };

  return (
    <AuthLayout>
      <div className="flex flex-col mt-4 px-4">
        <h2 className="text-2xl font-bold mb-2 text-center text-[#0A1128]">
          Set up your profile
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Tell us a bit about yourself
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Birthday Selection */}
          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-[#0A1128]">
              When is your birthday?
            </label>
            <p className="text-xs text-gray-500 mb-3">
              We filter out adult-only events if you are under 21 plus we give
              you free gift on your birthday...
            </p>

            {/* YEAR & MONTH on the same line */}
            <div className="flex flex-row gap-4">
              {/* Year Dropdown */}
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700">
                  Year
                </label>
                <Select
                  value={birthDate.year}
                  onValueChange={(value) =>
                    handleBirthDateChange("year", value)
                  }
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Month Dropdown */}
              <div className="flex-1">
                <label className="text-sm font-medium text-gray-700">
                  Month
                </label>
                <Select
                  value={birthDate.month}
                  onValueChange={(value) =>
                    handleBirthDateChange("month", value)
                  }
                >
                  <SelectTrigger className="bg-white border-gray-300">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[200px]">
                    {months.map((month) => (
                      <SelectItem key={month} value={month}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Day Dropdown (on a new line) */}
            <div className="mt-4">
              <label className="text-sm font-medium text-gray-700">Day</label>
              <Select
                value={birthDate.day}
                onValueChange={(value) => handleBirthDateChange("day", value)}
              >
                <SelectTrigger className="bg-white border-gray-300">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent className="max-h-[200px]">
                  {days.map((day) => (
                    <SelectItem key={day} value={day}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {birthDate.year && birthDate.month && birthDate.day && (
              <div className="mt-2 text-sm text-center text-gray-600">
                Selected date: {birthDate.month} {birthDate.day},{" "}
                {birthDate.year}
              </div>
            )}
          </div>

          {/* City Dropdown */}
          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-[#0A1128]">
              Select your city
            </label>
            <Select value={city} onValueChange={setCity}>
              <SelectTrigger className="w-full bg-white border-gray-300">
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Choose your city" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="addis-ababa">Addis Ababa</SelectItem>
                <SelectItem value="dire-dawa">Dire Dawa</SelectItem>
                <SelectItem value="mekelle">Mekelle</SelectItem>
                <SelectItem value="nazreth-adama">Nazreth/Adama</SelectItem>
                <SelectItem value="awassa">Awassa</SelectItem>
                <SelectItem value="bahir-dar">Bahir Dar</SelectItem>
                <SelectItem value="gonder">Gonder</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Language Dropdown */}
          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-[#0A1128]">
              Select your language
            </label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-full bg-white border-gray-300">
                <div className="flex items-center">
                  <Globe className="mr-2 h-4 w-4 text-gray-500" />
                  <SelectValue placeholder="Choose your language" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="amharic">Amharic</SelectItem>
                <SelectItem value="french">French</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0A1128] hover:bg-[#0A1128]/90 text-white py-6 rounded-xl mt-6 shadow-md"
          >
            Save Profile & Continue
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default ProfileSetup;
