import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Eye, EyeOff, User, Mail } from "lucide-react";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration
    window.location.href = "/profile-setup";
  };

  return (
    <AuthLayout>
      <div className="flex flex-col mt-8">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <InputWithIcon
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white shadow-sm border-gray-200 py-3"
            icon={<User className="w-5 h-5 text-gray-500" />}
            iconPosition="left"
            autoComplete="name"
          />

          <InputWithIcon
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white shadow-sm border-gray-200 py-3"
            icon={<Mail className="w-5 h-5 text-gray-500" />}
            iconPosition="left"
            autoComplete="email"
          />

          <InputWithIcon
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white shadow-sm border-gray-200 py-3"
            icon={
              showPassword ? (
                <Eye
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeOff
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(true)}
                />
              )
            }
            autoComplete="new-password"
          />

          <InputWithIcon
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-white shadow-sm border-gray-200 py-3"
            icon={
              showConfirmPassword ? (
                <Eye
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowConfirmPassword(false)}
                />
              ) : (
                <EyeOff
                  className="cursor-pointer text-gray-500"
                  onClick={() => setShowConfirmPassword(true)}
                />
              )
            }
            autoComplete="new-password"
          />

          <Button
            type="submit"
            className="w-full bg-[#0A1128] hover:bg-[#0A1128]/90 text-white py-6 mt-6 rounded-full"
          >
            Register & Continue
          </Button>

          <p className="text-center text-xs text-gray-600 mt-2">
            By clicking Register, you agree to our
            <br />
            <Link to="/terms" className="font-bold text-blue-600">
              Terms of Use
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Register;
