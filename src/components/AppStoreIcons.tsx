import React from "react";

interface IconProps {
  className?: string;
}

export const AppleIcon: React.FC<IconProps> = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="20"
      height="24"
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.2 12.8c0-3.2 2.6-4.7 2.7-4.8-1.5-2.1-3.8-2.4-4.6-2.5-2-.2-3.8 1.1-4.8 1.1-1 0-2.5-1.1-4.2-1.1-2.1 0-4.1 1.2-5.2 3.1-2.2 3.9-.6 9.6 1.6 12.7 1.1 1.5 2.3 3.3 4 3.2 1.6-.1 2.2-1 4.1-1 1.9 0 2.5 1 4.2 1 1.7 0 2.8-1.6 3.9-3.1 1.2-1.8 1.7-3.5 1.7-3.6-.1-.1-3.3-1.3-3.4-5z"
        fill="currentColor"
      />
      <path
        d="M13.2 3.9c.9-1.1 1.5-2.6 1.3-4.1-1.3.1-2.8.8-3.7 1.9-.8.9-1.5 2.5-1.3 3.9 1.4.1 2.9-.7 3.7-1.7z"
        fill="currentColor"
      />
    </svg>
  );
};

export const PlayStoreIcon: React.FC<IconProps> = ({ className = "" }) => {
  return (
    <svg
      className={className}
      width="22"
      height="24"
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M.5 1.1v21.8c0 .6.5 1.1 1.1 1.1l11.9-12L1.6 0C1 0 .5.5.5 1.1z"
        fill="currentColor"
      />
      <path
        d="M15.9 12l-3.1 3.1L1.6 24c.2.1.3.1.5.1.2 0 .4-.1.6-.2l14.4-8.3-1.2-3.6z"
        fill="currentColor"
      />
      <path
        d="M21.5 10.4L17.1 8 15.9 12l1.2 3.6 4.4-2.5c.6-.3.9-1 .5-1.6-.1-.4-.3-.8-.5-1.1z"
        fill="currentColor"
      />
      <path
        d="M1.6 0l11.2 11.9 3.1-3.1L2.7.2C2.4.1 2 0 1.6 0z"
        fill="currentColor"
      />
    </svg>
  );
};
