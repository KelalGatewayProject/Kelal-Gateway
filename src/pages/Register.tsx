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

  const navigate = useNavigate();
  const { login, updateUserProfile } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Save basic profile data
    updateUserProfile({
      name: formData.name,
      email: formData.email,
    });

    // Navigate to profile setup
    navigate("/profile-setup");
  };

  const handleSocialLogin = (provider: "facebook" | "google") => {
    // In a real implementation, you would integrate with the respective social auth provider SDK
    // For now, we'll simulate a successful login
    console.log(`Logging in with ${provider}`);

    // Simulate getting user data from social provider
    const mockUserData = {
      name: provider === "facebook" ? "Facebook User" : "Google User",
      email: `${provider}.user@example.com`,
    };

    // Update form data with the social provider's data
    setFormData({
      ...formData,
      name: mockUserData.name,
      email: mockUserData.email,
      password: "", // In a real implementation, you might generate a secure random password
      confirmPassword: "",
    });

    // Save profile data from social login
    updateUserProfile({
      name: mockUserData.name,
      email: mockUserData.email,
    });

    // In a production app, you would handle the OAuth flow properly
    // For now, just navigate to the profile setup page
    navigate("/profile-setup");
  };

  return (
    <div className="flex flex-col items-center min-h-screen relative">
      {/* Background with left-side curve */}
      <div
        className="absolute top-0 left-0 right-0 h-[200px] bg-[#0A1128] z-0"
        style={{
          borderBottomLeftRadius: "50%", // Curve only the left side
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
          className="p-6 rounded-lg shadow-lg backdrop-blur-sm"
        >
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="NAME"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={formData.name}
              onChange={handleChange}
              required
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
            />
            <button
              type="button"
              className="p-2"
              onClick={() => setShowPassword(!showPassword)}
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
            />
            <button
              type="button"
              className="p-2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              👁️
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0A1128] text-white py-3 rounded-md font-bold mt-4"
          >
            REGISTER & CONTINUE
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
            >
              <FacebookIcon className="w-5 h-5" />
              Facebook
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("google")}
              className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 py-2 rounded-md font-bold"
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
        </form>
      </div>
    </div>
  );
}
