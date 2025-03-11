import React, { ReactNode } from "react";
import Logo from "./Logo";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gray-100">
      <div className="bg-[#0A1128] rounded-bl-[100px] pt-10 pb-20 px-6">
        <Logo />
      </div>
      <div className="flex-1 px-6 py-8 bg-white">
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
};

export default AuthLayout;
