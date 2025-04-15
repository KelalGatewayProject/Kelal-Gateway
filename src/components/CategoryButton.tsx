import React from "react";
import { useNavigate } from "react-router-dom";

interface CategoryButtonProps {
  to: string;
  icon?: string;
  iconUrl?: string;
  label: string;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  to,
  icon,
  iconUrl,
  label,
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`Navigating to category: ${to}`);
    navigate(to);
  };

  return (
    <div
      onClick={handleClick}
      className="flex flex-col items-center justify-center w-[80px] h-[62px] border border-gray-300 rounded-lg mx-2 shadow-sm flex-shrink-0 bg-white cursor-pointer hover:bg-gray-50 active:bg-gray-100"
    >
      {iconUrl ? (
        <img src={iconUrl} alt={label} className="w-6 h-6 object-contain" />
      ) : icon ? (
        <span className="text-xl">{icon}</span>
      ) : null}
      <span className="text-xs mt-1 text-center block font-medium font-['Roboto'] uppercase">
        {label}
      </span>
    </div>
  );
};

export default CategoryButton;
