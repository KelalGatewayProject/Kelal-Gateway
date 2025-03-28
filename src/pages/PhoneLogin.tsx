import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { api } from "../lib/supabase";
import { useAuth } from "../context/AuthContext";
import { Phone } from "lucide-react";
import AuthLayout from "../components/AuthLayout";

const PhoneLogin: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // In development mode, just simulate sending OTP
      if (process.env.NODE_ENV === "development" || true) {
        console.log("DEV MODE: Simulating OTP send to", phone);
        localStorage.setItem("userPhone", phone);
        setStep("otp");
        setExpiresAt(new Date(Date.now() + 10 * 60 * 1000)); // 10 minutes
        setLoading(false);
        return;
      }

      const response = await api.post("/auth/phone-login/send-otp", { phone });

      if (response.message) {
        localStorage.setItem("userPhone", phone);
        setStep("otp");
        if (response.expiresAt) {
          setExpiresAt(new Date(response.expiresAt));
        }
      }
    } catch (error: any) {
      setError(error.message || "Failed to send verification code");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setError(null);
    setLoading(true);

    try {
      // In development mode, just simulate verification
      if (process.env.NODE_ENV === "development" || true) {
        console.log("DEV MODE: Simulating OTP verification", otp);

        // Create a mock user and token
        const mockUser = {
          id: "user-" + Date.now(),
          name: phone.split("@")[0] || "Phone User",
          phone: phone,
          role: "attendee",
          isPhoneVerified: true,
        };

        const mockToken = "phone-token-" + Date.now();

        // Store the token
        localStorage.setItem("authToken", mockToken);
        localStorage.setItem("userRole", mockUser.role);

        // Navigate to home page
        navigate("/");
        return;
      }

      const response = await api.post("/auth/phone-login/verify-otp", {
        phone,
        otp,
      });

      if (response.token) {
        // Store the token
        localStorage.setItem("authToken", response.token);

        // Store user role if available
        if (response.user && response.user.role) {
          localStorage.setItem("userRole", response.user.role);
        }

        // Redirect to home page
        navigate("/");
      }
    } catch (error: any) {
      setError(error.message || "Failed to verify code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex flex-col mt-8">
        <h2 className="text-lg font-semibold mb-4 text-center">
          {step === "phone"
            ? "Let's start with your mobile number"
            : "Enter verification code"}
        </h2>

        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {step === "phone" ? (
          <form onSubmit={handleSendOTP} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full shadow-sm border-gray-200"
                autoComplete="tel"
                pattern="[0-9+]*"
                inputMode="tel"
              />
              <p className="text-center text-sm text-gray-600">
                A 6-digit code will be sent to your mobile number via SMS to
                confirm your identity
              </p>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#0A1128] hover:bg-[#0A1128]/90 text-white py-6 rounded-full"
              disabled={loading || !phone}
            >
              {loading ? "Sending..." : "Send Code"}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <Input
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full shadow-sm border-gray-200"
                maxLength={6}
                pattern="[0-9]*"
                inputMode="numeric"
              />
              {expiresAt && (
                <p className="text-center text-xs text-gray-500">
                  Code expires at {expiresAt.toLocaleTimeString()}
                </p>
              )}
            </div>

            <Button
              onClick={handleVerifyOTP}
              className="w-full bg-[#0A1128] hover:bg-[#0A1128]/90 text-white py-6 rounded-full"
              disabled={loading || otp.length !== 6}
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </Button>

            <Button
              variant="outline"
              onClick={() => setStep("phone")}
              className="w-full"
            >
              Change Phone Number
            </Button>
          </div>
        )}

        <div className="mt-8 flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Have an account?</span>
            <Button
              variant="link"
              onClick={() => navigate("/login")}
              className="font-bold text-blue-600 p-0"
            >
              Log In
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default PhoneLogin;
