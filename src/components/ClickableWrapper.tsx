import React from "react";
import { useNavigate } from "react-router-dom";

interface ClickableWrapperProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const ClickableWrapper: React.FC<ClickableWrapperProps> = ({
  to,
  children,
  className = "",
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Navigating to: ${to}`);
    navigate(to);
  };

  return (
    <div
      onClick={handleClick}
      className={`${className} cursor-pointer`}
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        e.key === "Enter" && handleClick(e as unknown as React.MouseEvent)
      }
    >
      {children}
    </div>
  );
};

export default ClickableWrapper;
