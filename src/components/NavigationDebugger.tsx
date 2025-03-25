import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * This component monitors navigation events and logs them to help debug navigation issues
 */
const NavigationDebugger: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Current location:", location.pathname);

    // Patch navigate function to log navigation attempts
    const originalNavigate = navigate;
    (window as any).debugNavigate = (to: string) => {
      console.log("Debug navigation attempt to:", to);
      originalNavigate(to);
    };

    // Monitor click events to detect potential issues
    const clickHandler = (e: MouseEvent) => {
      console.log("Click detected on:", e.target);
    };

    document.addEventListener("click", clickHandler);

    return () => {
      document.removeEventListener("click", clickHandler);
    };
  }, [location, navigate]);

  return null; // This component doesn't render anything
};

export default NavigationDebugger;
