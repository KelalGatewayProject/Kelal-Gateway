import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const EmailVerificationBanner = () => {
  const { userProfile, isAuthenticated, isVerified, resendVerificationEmail } =
    useAuth();
  const [isResending, setIsResending] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Don't show the banner if user is not logged in, is already verified, or has no email
  if (!isAuthenticated || isVerified || !userProfile?.email) {
    return null;
  }

  const handleResendVerification = async () => {
    if (!userProfile.email) return;

    setIsResending(true);
    try {
      const success = await resendVerificationEmail(userProfile.email);

      if (success) {
        toast({
          title: "Verification email sent",
          description: "Please check your inbox for the verification link.",
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send verification email. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-yellow-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3 flex-1 md:flex md:justify-between">
          <p className="text-sm text-yellow-700">
            Your email address is not verified. Some features may be limited.
          </p>
          <div className="mt-3 flex items-center md:mt-0 md:ml-6">
            <Button
              variant="outline"
              size="sm"
              onClick={handleResendVerification}
              disabled={isResending}
              className="text-sm text-yellow-700 hover:text-yellow-800 font-medium"
            >
              {isResending ? "Sending..." : "Resend verification email"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationBanner;
