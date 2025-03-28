import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user types
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // DEVELOPMENT ONLY: Auto-login with test credentials
    // TODO: REMOVE BEFORE PRODUCTION
    if (process.env.NODE_ENV === "development") {
      console.log("DEV MODE: Auto-login with test credentials");
      setIsLoading(true);
      try {
        // Use admin credentials for quick testing
        const testSuccess = await login("KelalAdmin", "Gateway@2025");
        if (!testSuccess) {
          setError("Auto-login failed. Falling back to normal login.");
          // Continue with normal login flow
        } else {
          return; // Exit early if auto-login succeeded
        }
      } catch (err) {
        console.error("Auto-login error:", err);
        // Continue with normal login flow
      } finally {
        setIsLoading(false);
      }
    }

    // Normal login flow
    // Validate form
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      // Call login function from auth context
      const success = await login(formData.email, formData.password);

      if (!success) {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("An error occurred during login. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen relative">
      {/* Blue background with left-side curve */}
      <div
        className="absolute top-0 left-0 right-0 h-[300px] bg-[#0A1128] z-0"
        style={{
          borderBottomLeftRadius: "30%", // Curve only the left side
          borderBottomRightRadius: "0%", // No curve on the right side
        }}
      >
        {/* Logo and text */}
        <div className="flex flex-col items-center justify-center h-full">
          <img
            src="https://imgur.com/IblnJgd.png"
            alt="KELAL GATEWAY"
            className="w-24 h-24"
          />
          <h1 className="text-xl font-bold text-center text-white mt-2">
            K'ELAL GATEWAY
          </h1>
        </div>
      </div>

      {/* Centered Form content */}
      <div className="absolute top-[63%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-6 z-10">
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-lg shadow-lg backdrop-blur-sm bg-white/30" // Semi-transparent form background
        >
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-center">
              {error}
            </div>
          )}

          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={formData.email}
              onChange={handleChange}
              required
              inputMode="email"
              disabled={isLoading}
            />
          </div>

          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="PASSWORD"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? "👁️" : "🔒"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0A1128] text-white py-3 rounded-md font-bold mt-4 flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                LOGGING IN...
              </>
            ) : (
              "LOGIN"
            )}
          </button>

          <p className="text-center mt-4">
            Don't have an account?{" "}
            <a href="/register" className="font-bold text-blue-600">
              Register
            </a>
          </p>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  email: "KelalAdmin",
                  password: "Gateway@2025",
                });
                // Submit the form after setting the admin credentials
                setTimeout(() => {
                  handleSubmit(
                    new Event("click") as unknown as React.FormEvent,
                  );
                }, 100);
              }}
              className="w-full bg-gray-700 text-white py-2 rounded-md font-bold flex items-center justify-center"
            >
              ADMIN ACCESS
            </button>
            <p className="text-xs text-gray-500 text-center mt-2">
              For development purposes only
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
