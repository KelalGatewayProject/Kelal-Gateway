import React, { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, MapPin, Gift, Users } from "lucide-react";
import { InputWithIcon } from "@/components/ui/input-with-icon";

const ProfileSetup: React.FC = () => {
  const [birthday, setBirthday] = useState("");
  const [city, setCity] = useState("");
  const [referenceCode, setReferenceCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle profile setup
    window.location.href = "/dashboard";
  };

  return (
    <AuthLayout>
      <div className="flex flex-col mt-8 items-center">
        <div className="w-24 h-24 rounded-full border-2 border-gray-300 flex items-center justify-center mb-2 bg-white shadow-sm">
          <Camera className="w-10 h-10 text-gray-500" />
          <span className="sr-only">Upload Photo</span>
        </div>
        <p className="text-center mb-6 text-sm text-gray-600">
          Upload Profile Photo
        </p>

        <div className="w-full">
          <h2 className="text-lg font-semibold mb-2 text-center">
            Complete Your Profile
          </h2>
          <p className="text-sm mb-4 text-center text-gray-600">
            Get a free birthday ticket on us!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="w-full bg-white shadow-sm border-gray-200 py-3 pl-10"
                autoComplete="bday"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Gift className="w-5 h-5 text-gray-500" />
              </div>
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

            <InputWithIcon
              type="text"
              placeholder="Referral Code (Optional)"
              value={referenceCode}
              onChange={(e) => setReferenceCode(e.target.value)}
              className="w-full bg-white shadow-sm border-gray-200 py-3"
              icon={<Users className="w-5 h-5 text-gray-500" />}
              iconPosition="left"
            />

            <p className="text-xs text-gray-500">
              Enter a referral code from an invited member if you have one
            </p>

            <Button
              type="submit"
              className="w-full bg-[#0A1128] hover:bg-[#0A1128]/90 text-white py-6 mt-4 rounded-full"
            >
              Get Started
            </Button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ProfileSetup;
