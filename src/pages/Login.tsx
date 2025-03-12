import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Eye, EyeOff, Mail } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would verify credentials with a backend
    // For now, just navigate to home
    navigate("/");
  };

  return (
    <AuthLayout>
      <div className="flex flex-col mt-8">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Log in to your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <InputWithIcon
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white shadow-sm border-gray-200 py-3"
            icon={<Mail className="w-5 h-5 text-gray-500" />}
            iconPosition="left"
            autoComplete="email"
            required
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
            required
          />

          <Button
            type="submit"
            className="w-full bg-[#0A1128] hover:bg-[#0A1128]/90 text-white py-6 rounded-full"
          >
            Log In
          </Button>
        </form>

        <div className="mt-8 flex flex-col items-center space-y-6">
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-blue-600">
              Register
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
