import React, { ReactNode } from "react";
import TopNavigation from "./TopNavigation";
import BottomNavigation from "./BottomNavigation";

interface PageLayoutProps {
  children: ReactNode;
  backgroundImage?: string;
  hideSearch?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  backgroundImage = "https://imgur.com/9NT8Cbi.png",
  hideSearch = false,
}) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-hidden font-['Roboto']">
      {/* Background Image with Opacity */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          opacity: "0.1",
        }}
      />

      <TopNavigation hideSearch={hideSearch} />

      {/* Main Content */}
      <div className="flex-1 pt-[67px] pb-12">{children}</div>

      <BottomNavigation />
    </div>
  );
};

export default PageLayout;
