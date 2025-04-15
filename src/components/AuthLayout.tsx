import React, { ReactNode } from "react";
import Logo from "./Logo";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-100 relative">
      {/* Background Image with Opacity - Fixed position */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(https://imgur.com/9NT8Cbi.png)",
          opacity: "0.1",
        }}
      />

      {/* Header with Blue Background (35% of the screen) */}
      <div className="bg-[#0A1128] rounded-bl-[100px] h-[35vh] flex flex-col items-center justify-center relative z-10">
        {/* Logo and Text */}
        <Logo />
      </div>

      {/* Content (Transparent Background) */}
      <div className="flex-1 px-6 py-8 relative z-10">
        {" "}
        {/* Removed bg-white */}
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
