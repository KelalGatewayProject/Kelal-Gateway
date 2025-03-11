import React from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";

const Welcome: React.FC = () => {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center justify-center h-full mt-16">
        <div className="mb-8">
          <img
            src="https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=300&q=80"
            alt="Event"
            className="w-48 h-auto rounded-lg shadow-md"
          />
        </div>
        <Link to="/phone-login" className="w-full">
          <Button className="w-full bg-[#0A1128] hover:bg-[#0A1128]/90 text-white py-6 rounded-full">
            GET STARTED
          </Button>
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Welcome;
