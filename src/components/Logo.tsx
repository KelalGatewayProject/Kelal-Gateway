import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <img
        src="https://imgur.com/IblnJgd.png"
        alt="Logo"
        className="w-24 h-24"
      />
      <h1 className="text-white text-2xl font-bold">Kelal Gateway</h1>
    </div>
  );
};

export default Logo;
