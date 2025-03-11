import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Eye, EyeOff, Facebook, Mail } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login
    window.location.href = "/dashboard";
  };

  return (
    <AuthLayout>
      <div className="flex flex-col mt-8">
        <h2 className="text-lg font-semibold mb-4 text-center">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            autoComplete="current-password"
          />

          <div className="flex justify-end">
            <Link to="/reset-password" className="text-sm text-blue-600">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#0A1128] hover:bg-[#0A1128]/90 text-white py-6 mt-4 rounded-full"
          >
            Log In
          </Button>
        </form>

        <div className="mt-8 flex flex-col items-center space-y-6">
          <Button
            variant="outline"
            className="flex items-center space-x-2 w-full py-5 rounded-full"
          >
            <Facebook className="w-5 h-5 text-blue-600" />
            <span>Continue with Facebook</span>
          </Button>

          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Don't have an account?</span>
            <Link to="/phone-login" className="font-bold text-blue-600">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
