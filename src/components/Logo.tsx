import React from "react";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <svg
        width="60"
        height="60"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M60 40C73.2548 40 84 50.7452 84 64C84 77.2548 73.2548 88 60 88C46.7452 88 36 77.2548 36 64C36 50.7452 46.7452 40 60 40Z"
          fill="#FF5757"
        />
        <path
          d="M60 112C73.2548 112 84 122.745 84 136C84 149.255 73.2548 160 60 160C46.7452 160 36 149.255 36 136C36 122.745 46.7452 112 60 112Z"
          fill="#FF9966"
        />
        <path d="M164 64L104 124L84 104L104 84L164 144V64Z" fill="#CCFF00" />
      </svg>
      <h1 className="text-white text-xl font-bold mt-2">TICKET GATEWAY</h1>
    </div>
  );
};

export default Logo;
