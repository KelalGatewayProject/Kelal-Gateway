import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "./ui/button";

interface TestLoginFlowProps {
  startScreen?: "welcome" | "login" | "register" | "phoneLogin";
}

export default function TestLoginFlow({
  startScreen = "welcome",
}: TestLoginFlowProps) {
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Test user credentials
  const testUser = {
    email: "micheltadesse@yahoo.com",
    password: "12345",
    name: "Michel Tadesse",
  };

  useEffect(() => {
    // Navigate to the starting screen when component mounts
    if (startScreen === "welcome") {
      navigate("/welcome");
    } else if (startScreen === "login") {
      navigate("/login");
    } else if (startScreen === "register") {
      navigate("/register");
    } else if (startScreen === "phoneLogin") {
      navigate("/phone-login");
    }
  }, [navigate, startScreen]);

  const handleTestLogin = async () => {
    const success = await login(testUser.email, testUser.password);
    if (success) {
      console.log("Test login successful");
    } else {
      console.log("Test login failed, attempting registration");
      handleTestRegister();
    }
  };

  const handleTestRegister = async () => {
    const success = await register({
      name: testUser.name,
      email: testUser.email,
      password: testUser.password,
    });
    if (success) {
      console.log("Test registration successful");
    } else {
      console.log("Test registration failed");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/80 p-4 rounded-lg text-white">
      <h3 className="font-bold mb-2">Test Controls</h3>
      <div className="flex flex-col gap-2">
        <Button onClick={handleTestLogin} variant="outline" size="sm">
          Login as Test Member
        </Button>
        <Button onClick={handleTestRegister} variant="outline" size="sm">
          Register Test Member
        </Button>
        <Button
          onClick={() => navigate("/welcome")}
          variant="outline"
          size="sm"
        >
          Go to Welcome
        </Button>
        <Button onClick={() => navigate("/login")} variant="outline" size="sm">
          Go to Login
        </Button>
        <Button
          onClick={() => navigate("/register")}
          variant="outline"
          size="sm"
        >
          Go to Register
        </Button>
        <Button
          onClick={() => navigate("/phone-login")}
          variant="outline"
          size="sm"
        >
          Go to Phone Login
        </Button>
        <Button
          onClick={() => navigate("/profile-setup")}
          variant="outline"
          size="sm"
        >
          Go to Profile Setup
        </Button>
      </div>
      <div className="mt-2 text-xs">
        <p>Email: {testUser.email}</p>
        <p>Password: {testUser.password}</p>
        <p>Status: {isAuthenticated ? "Logged In" : "Logged Out"}</p>
      </div>
    </div>
  );
}
