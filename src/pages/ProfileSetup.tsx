import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Calendar, MapPin } from "lucide-react";

const ProfileSetup: React.FC = () => {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [birthday, setBirthday] = useState("");
  const [city, setCity] = useState("");
  const navigate = useNavigate();

  // Pre-fill name if available from registration
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setName(savedName);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save profile data
    localStorage.setItem("userBio", bio);
    localStorage.setItem("userBirthday", birthday);
    localStorage.setItem("userCity", city);
    // Navigate to home page
    navigate("/");
  };

  return (
    <AuthLayout>
      <div className="flex flex-col mt-8">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Set up your profile
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white shadow-sm border-gray-200"
            autoComplete="name"
            required
          />

          <Input
            type="text"
            placeholder="Short Bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-white shadow-sm border-gray-200"
            autoComplete="off"
          />

          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Calendar className="w-5 h-5 text-gray-500" />
            </div>
            <Input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="w-full bg-white shadow-sm border-gray-200 py-3 pl-10"
              autoComplete="bday"
            />
          </div>

          <InputWithIcon
            type="text"
            placeholder="Your City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-white shadow-sm border-gray-200 py-3"
            icon={<MapPin className="w-5 h-5 text-gray-500" />}
            iconPosition="left"
            autoComplete="address-level2"
          />

          <Button
            type="submit"
            className="w-full bg-[#0A1128] hover:bg-[#0A1128]/90 text-white py-6 rounded-full"
          >
            Save Profile
          </Button>
        </form>

        <div className="mt-8 flex flex-col items-center space-y-6">
          <p className="text-center text-sm text-gray-600">
            <Link to="/dashboard" className="font-bold text-blue-600">
              Skip for now
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ProfileSetup;
