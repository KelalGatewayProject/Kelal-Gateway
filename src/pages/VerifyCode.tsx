import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const VerifyCode: React.FC = () => {
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would verify the code with a backend
    navigate("/register");
  };

  return (
    <AuthLayout>
      <div className="flex flex-col mt-8">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Enter the verification code
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center space-x-2">
            {[0, 1, 2, 3, 4].map((index) => (
              <Input
                key={index}
                type="text"
                inputMode="numeric"
                value={code[index] || ""}
                onChange={(e) => {
                  const newCode = code.split("");
                  newCode[index] = e.target.value;
                  setCode(newCode.join(""));

                  // Auto-focus next input
                  if (e.target.value && index < 4) {
                    const nextInput = document.querySelector(
                      `input[name=code-${index + 1}]`,
                    ) as HTMLInputElement;
                    if (nextInput) nextInput.focus();
                  }
                }}
                className="w-12 h-12 text-center text-lg font-bold shadow-sm border-gray-200"
                maxLength={1}
                name={`code-${index}`}
                autoComplete="one-time-code"
              />
            ))}
          </div>

          <p className="text-center text-sm text-gray-600">
            A verification code has been sent to your mobile number
          </p>

          <Button
            type="submit"
            className="w-full bg-[#0A1128] hover:bg-[#0A1128]/90 text-white py-6 rounded-full"
          >
            Verify Code
          </Button>
        </form>

        <div className="mt-8 flex flex-col items-center space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">
              {timer > 0
                ? `Resend code in ${timer}s`
                : "Didn't receive the code?"}
            </p>
            <Button
              type="button"
              variant="link"
              className="text-blue-600"
              disabled={timer > 0}
              onClick={() => {
                setTimer(60);
                // In a real app, this would trigger a new code to be sent
              }}
            >
              Resend Code
            </Button>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyCode;
