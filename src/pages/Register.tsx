import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FacebookIcon, GoogleIcon } from "../components/SocialIcons";
import { useAuth } from "../context/AuthContext";

export default function RegisterDetails() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { register } = useAuth();

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

    // DEVELOPMENT ONLY: Skip validation and registration process
    // TODO: REMOVE BEFORE PRODUCTION
    console.log(
      "DEV MODE: Skipping registration validation and proceeding to home",
    );
    navigate("/");
    return;

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    try {
      // Register user with backend
      const success = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (success) {
        // Navigate to profile setup
        navigate("/profile-setup");
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during registration");
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "facebook" | "google") => {
    setError("");
    setIsLoading(true);

    try {
      // In a real implementation, you would integrate with the respective social auth provider SDK
      // For now, we'll show an error message
      setError(
        `${provider} login is currently unavailable. Please register with email.`,
      );
    } catch (err) {
      setError(
        `${provider} login failed. Please try again or use email registration.`,
      );
      console.error(`${provider} login error:`, err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen relative">
      {/* Background with left-side curve */}
      <div
        className="absolute top-0 left-0 right-0 h-[200px] bg-[#0A1128] z-0"
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
      <div className="absolute top-[57%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-6 z-10">
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-lg shadow-lg backdrop-blur-sm bg-white/30"
        >
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-center">
              {error}
            </div>
          )}

          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="NAME"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

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

          <div className="mb-4 flex items-center gap-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="PASSWORD"
              className="flex-1 p-3 border border-gray-300 rounded-md"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              className="p-2"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              👁️
            </button>
          </div>

          <div className="mb-4 flex items-center gap-2">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="CONFIRM PASSWORD"
              className="flex-1 p-3 border border-gray-300 rounded-md"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              className="p-2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
            >
              👁️
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
                REGISTERING...
              </>
            ) : (
              "REGISTER & CONTINUE"
            )}
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <div className="flex gap-4 mb-4">
            <button
              type="button"
              onClick={() => handleSocialLogin("facebook")}
              className="flex-1 flex items-center justify-center gap-2 bg-[#1877F2] text-white py-2 rounded-md font-bold"
              disabled={isLoading}
            >
              <FacebookIcon className="w-5 h-5" />
              Facebook
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-md font-bold"
              disabled={isLoading}
            >
              <GoogleIcon className="w-5 h-5" />
              Google
            </button>
          </div>

          {/* Split "Terms of Use" into two lines */}
          <p className="text-center text-xs mt-2">
            BY CLICKING REGISTER, YOU AGREE TO OUR
          </p>
          <p className="text-center text-xs">
            <a href="/terms" className="font-bold text-blue-600">
              TERMS OF USE
            </a>
          </p>

          <p className="text-center mt-4">
            Already have an account?{" "}
            <a href="/login" className="font-bold text-blue-600">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
