import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import EmailVerificationBanner from "../components/EmailVerificationBanner";

const EmailVerificationFlow = () => {
  return (
    <div className="p-4 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">Email Verification Flow</h1>

      {/* Verification Banner */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Verification Banner</h2>
        <div className="border rounded-md p-4 bg-white">
          <EmailVerificationBanner />
        </div>
      </div>

      {/* Verification Email Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Email Verification</CardTitle>
          <CardDescription>Preview of verification email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md p-4 bg-gray-50">
            <div
              style={{
                fontFamily: "Arial, sans-serif",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              <h2>Verify Your Email Address</h2>
              <p>Hello John,</p>
              <p>
                Thank you for registering with our Ticket System. Please verify
                your email address by clicking the button below:
              </p>
              <div style={{ textAlign: "center", margin: "30px 0" }}>
                <Button>Verify Email</Button>
              </div>
              <p>
                If the button doesn't work, you can also copy and paste the
                following link into your browser:
              </p>
              <p>https://example.com/verify-email?token=sample-token-12345</p>
              <p>This link will expire in 24 hours.</p>
              <p>
                If you didn't create an account, you can safely ignore this
                email.
              </p>
              <p>
                Best regards,
                <br />
                The Ticket System Team
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Reset Email Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Password Reset</CardTitle>
          <CardDescription>Preview of password reset email</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md p-4 bg-gray-50">
            <div
              style={{
                fontFamily: "Arial, sans-serif",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              <h2>Reset Your Password</h2>
              <p>Hello John,</p>
              <p>
                You requested a password reset. Please click the button below to
                set a new password:
              </p>
              <div style={{ textAlign: "center", margin: "30px 0" }}>
                <Button>Reset Password</Button>
              </div>
              <p>
                If the button doesn't work, you can also copy and paste the
                following link into your browser:
              </p>
              <p>https://example.com/reset-password?token=sample-token-12345</p>
              <p>This link will expire in 1 hour.</p>
              <p>
                If you didn't request a password reset, you can safely ignore
                this email.
              </p>
              <p>
                Best regards,
                <br />
                The Ticket System Team
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ticket Purchase Email Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Ticket Purchase</CardTitle>
          <CardDescription>
            Preview of ticket purchase confirmation email
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md p-4 bg-gray-50">
            <div
              style={{
                fontFamily: "Arial, sans-serif",
                maxWidth: "600px",
                margin: "0 auto",
              }}
            >
              <h2>Ticket Purchase Confirmation</h2>
              <p>Hello John,</p>
              <p>
                Thank you for purchasing a ticket for{" "}
                <strong>Summer Music Festival</strong>.
              </p>
              <div
                style={{
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  padding: "20px",
                  margin: "20px 0",
                }}
              >
                <h3 style={{ marginTop: "0" }}>Event Details</h3>
                <p>
                  <strong>Event:</strong> Summer Music Festival
                </p>
                <p>
                  <strong>Date:</strong> August 15, 2023 at 7:00 PM
                </p>
                <p>
                  <strong>Location:</strong> Central Park
                </p>
                <p>
                  <strong>Ticket Type:</strong> VIP
                </p>
                <p>
                  <strong>Ticket ID:</strong> TKT-12345
                </p>
              </div>
              <div style={{ textAlign: "center", margin: "30px 0" }}>
                <Button>View Ticket</Button>
              </div>
              <p>
                You can access your ticket at any time by logging into your
                account.
              </p>
              <p>We look forward to seeing you at the event!</p>
              <p>
                Best regards,
                <br />
                The Ticket System Team
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerificationFlow;
