import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Facebook, Phone } from "lucide-react";

const PhoneLogin: React.FC = () => {
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Store phone number
    localStorage.setItem("userPhone", phone);
    // Navigate to verify code page using proper React Router navigation
    window.location.href = "/verify-code";
  };

  return (
    <AuthLayout>
      <div className="flex flex-col mt-8">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Let's start with your mobile number
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputWithIcon
            type="tel"
            placeholder="Enter your phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-white shadow-sm border-gray-200"
            icon={<Phone className="w-5 h-5 text-gray-500" />}
            iconPosition="left"
            autoComplete="tel"
            pattern="[0-9]*"
            inputMode="numeric"
          />

          <p className="text-center text-sm text-gray-600">
            A 5-digit code will be sent to your mobile number via SMS to confirm
            your identity
          </p>

          <Button
            type="submit"
            className="w-full bg-[#0A1128] hover:bg-[#0A1128]/90 text-white py-6 rounded-full"
          >
            Send Code
          </Button>
        </form>

        <div className="mt-8 flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Have an account?</span>
            <Link to="/login" className="font-bold text-blue-600">
              Log In
            </Link>
          </div>

          <Button
            variant="outline"
            className="flex items-center space-x-2 w-full py-5 rounded-full"
          >
            <Facebook className="w-5 h-5 text-blue-600" />
            <span>Continue with Facebook</span>
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
};

export default PhoneLogin;
