import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export type UserRole = "attendee" | "organizer" | null;

// Define user profile type
export interface UserProfile {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
  birthDate?: {
    year: string;
    month: string;
    day: string;
  };
  language?: string;
  avatar?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole;
  isOrganizer: boolean;
  userProfile: UserProfile | null;
  login: (email: string, password: string, role: UserRole) => void;
  logout: () => void;
  setUserRole: (role: UserRole) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: null,
  isOrganizer: false,
  userProfile: null,
  login: () => {},
  logout: () => {},
  setUserRole: () => {},
  updateUserProfile: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isOrganizer, setIsOrganizer] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const navigate = useNavigate();

  // Check for existing auth on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("isAuthenticated");
    const storedRole = localStorage.getItem("userRole") as UserRole;
    const storedIsOrganizer = localStorage.getItem("isOrganizer");
    const storedProfile = localStorage.getItem("userProfile");

    if (storedAuth === "true") {
      setIsAuthenticated(true);
      setUserRole(storedRole);
      setIsOrganizer(storedIsOrganizer === "true");

      // Load user profile if available
      if (storedProfile) {
        try {
          setUserProfile(JSON.parse(storedProfile));
        } catch (error) {
          console.error("Error parsing stored user profile:", error);
        }
      }
    }
  }, []);

  // Update isOrganizer when user registers as an organizer
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("isOrganizer", isOrganizer.toString());
    }
  }, [isOrganizer, isAuthenticated]);

  const login = (email: string, password: string, role: UserRole) => {
    // In a real app, we would verify credentials with a backend
    // For now, just set as authenticated
    setIsAuthenticated(true);
    setUserRole(role);

    // Set isOrganizer based on role
    const newIsOrganizer = role === "organizer";
    setIsOrganizer(newIsOrganizer);

    // Store in localStorage for persistence
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("userRole", role || "");
    localStorage.setItem("isOrganizer", newIsOrganizer.toString());

    // Navigate to home
    navigate("/");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setIsOrganizer(false);
    setUserProfile(null);

    // Clear localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");
    localStorage.removeItem("isOrganizer");
    localStorage.removeItem("userProfile");
    localStorage.removeItem("viewMode");

    // Navigate to login
    navigate("/login");
  };

  // Function to update user profile
  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prevProfile) => {
      const updatedProfile = { ...prevProfile, ...profile };

      // Store updated profile in localStorage
      localStorage.setItem("userProfile", JSON.stringify(updatedProfile));

      return updatedProfile;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole,
        isOrganizer,
        userProfile,
        login,
        logout,
        setUserRole,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
