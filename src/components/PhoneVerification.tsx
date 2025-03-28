import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Alert, AlertDescription } from "./ui/alert";
import { api } from "../lib/supabase";

interface PhoneVerificationProps {
  onVerificationComplete?: () => void;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  onVerificationComplete,
}) => {
  const { userProfile, token } = useAuth();
  const [phone, setPhone] = useState(userProfile?.phone || "");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"add-phone" | "verify-otp">(
    userProfile?.phone ? "verify-otp" : "add-phone",
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);

  const handleAddPhone = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await api.post("/auth/add-phone", { phone }, token);

      if (response.message) {
        setSuccess("Verification code sent to your phone");
        setStep("verify-otp");
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
    setSuccess(null);
    setLoading(true);

    try {
      const response = await api.post("/auth/verify-phone", { otp }, token);

      if (response.message) {
        setSuccess("Phone verified successfully");
        if (onVerificationComplete) {
          onVerificationComplete();
        }
      }
    } catch (error: any) {
      setError(error.message || "Failed to verify code");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await api.post("/auth/resend-phone-otp", {}, token);

      if (response.message) {
        setSuccess("Verification code resent to your phone");
        if (response.expiresAt) {
          setExpiresAt(new Date(response.expiresAt));
        }
      }
    } catch (error: any) {
      setError(error.message || "Failed to resend verification code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Phone Verification</CardTitle>
        <CardDescription>
          {step === "add-phone"
            ? "Add your phone number to enable OTP login"
            : "Enter the verification code sent to your phone"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {step === "add-phone" ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">
                Phone Number
              </label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1234567890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full"
              />
              <p className="text-xs text-gray-500">
                Include country code (e.g., +1 for US)
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="otp" className="text-sm font-medium">
                Verification Code
              </label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full"
                maxLength={6}
              />
            </div>
            {expiresAt && (
              <p className="text-xs text-gray-500">
                Code expires at {expiresAt.toLocaleTimeString()}
              </p>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        {step === "add-phone" ? (
          <Button
            onClick={handleAddPhone}
            disabled={loading || !phone}
            className="w-full"
          >
            {loading ? "Sending..." : "Send Verification Code"}
          </Button>
        ) : (
          <>
            <Button
              onClick={handleVerifyOTP}
              disabled={loading || otp.length !== 6}
              className="w-full"
            >
              {loading ? "Verifying..." : "Verify Code"}
            </Button>
            <Button
              variant="outline"
              onClick={handleResendOTP}
              disabled={loading}
              className="w-full"
            >
              Resend Code
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default PhoneVerification;
