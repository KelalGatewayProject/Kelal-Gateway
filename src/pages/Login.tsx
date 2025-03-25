import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.email || !formData.password) {
      alert("Please enter both email and password");
      return;
    }

    // Call login function from auth context
    // For demo purposes, we'll default to attendee role
    login(formData.email, formData.password, "attendee");
  };

  return (
    <div className="flex flex-col items-center min-h-screen relative">
      {/* Blue background with left-side curve */}
      <div
        className="absolute top-0 left-0 right-0 h-[250px] bg-[#0A1128] z-0"
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
      <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-6 z-10">
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded-lg shadow-lg backdrop-blur-sm bg-white/30" // Semi-transparent form background
        >
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

          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="PASSWORD"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "👁️" : "🔒"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0A1128] text-white py-3 rounded-md font-bold mt-4"
          >
            LOGIN
          </button>

          <p className="text-center mt-4">
            Don't have an account?{" "}
            <a href="/register" className="font-bold text-blue-600">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
