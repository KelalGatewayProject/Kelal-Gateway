import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Welcome: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header with Blue Background (75% of the screen) */}
      <div className="bg-[#0A1128] rounded-bl-[100px] h-[75vh] flex flex-col items-center justify-center relative">
        {/* Logo and Text */}
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <img
            src="https://kelalgateway.et/wp-content/uploads/2025/03/cropped-Kelal-logo-2.png"
            alt="Logo"
            className="w-28 h-24"
          />
          <h1 className="text-white text-2xl font-bold">Kelal Gateway</h1>
          <p className="text-gray-300 text-lg">
            Your Gateway to
            <br />
            <span className="font-semibold">Unforgettable Experiences</span>
          </p>
        </div>

        {/* GET STARTED Button */}
        <div className="w-full px-6 absolute" style={{ bottom: "-100px" }}>
          <Link to="/Phone-Login" className="w-full">
            <Button className="w-full bg-[#0A1128] hover:bg-[#0A1128]/90 text-white py-6 rounded-full">
              GET STARTED
            </Button>
          </Link>
        </div>
      </div>

      {/* Content (if needed) */}
      <div className="flex-1 px-6 py-8 bg-transparent">
        {/* Add additional content here if necessary */}
      </div>
    </div>
  );
};

export default Welcome;
