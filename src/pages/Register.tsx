import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/register/profile");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white relative">
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
          <img src="/logo.svg" alt="K'ELAL GATEWAY" className="w-24 h-24" />
          <h1 className="text-xl font-bold text-center text-white mt-2">
            K'ELAL GATEWAY
          </h1>
        </div>
      </div>

      {/* Centered Form content */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-6 z-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-lg"
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

          <div className="mb-4 relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="CONFIRM PASSWORD"
              className="w-full p-3 border border-gray-300 rounded-md"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? "👁️" : "🔒"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#0A1128] text-white py-3 rounded-md font-bold mt-4"
          >
            REGISTER & CONTINUE
          </button>

          <p className="text-center text-xs mt-2">
            BY CLICKING REGISTER, YOU AGREE TO OUR{" "}
            <a href="/terms" className="font-bold">
              TERMS OF USE
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
