import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/supabase"; // Renamed but still using the file for API functions
import { UserRole, rolePermissions } from "../types/roles";

// Define user profile type
export interface UserProfile {
  id?: string;
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
  role?: UserRole;
  isVerified?: boolean;
  emailNotifications?: boolean;
}

/**
 * AuthContext Interface
 * Defines the shape of the authentication context with all available methods and properties
 */
interface AuthContextType {
  isAuthenticated: boolean;
  userRole: UserRole | null;
  isOrganizer: boolean;
  isAdmin: boolean;
  userProfile: UserProfile | null;
  token: string | null;
  isVerified: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: {
    name: string;
    email: string;
    password: string;
  }) => Promise<boolean>;
  logout: () => void;
  setUserRole: (role: UserRole | null) => void;
  updateUserProfile: (profile: Partial<UserProfile>) => Promise<boolean>;
  hasPermission: (permission: keyof typeof rolePermissions.admin) => boolean;
  forgotPassword: (email: string) => Promise<boolean>;
  resetPassword: (token: string, password: string) => Promise<boolean>;
  verifyEmail: (token: string) => Promise<boolean>;
  resendVerificationEmail: (email: string) => Promise<boolean>;
  updateNotificationSettings: (emailNotifications: boolean) => Promise<boolean>;
}

// Create the auth context with default values
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: null,
  isOrganizer: false,
  isAdmin: false,
  userProfile: null,
  token: null,
  isVerified: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  setUserRole: () => {},
  updateUserProfile: async () => false,
  hasPermission: () => false,
  forgotPassword: async () => false,
  resetPassword: async () => false,
  verifyEmail: async () => false,
  resendVerificationEmail: async () => false,
  updateNotificationSettings: async () => false,
});

/**
 * Custom hook to use the auth context
 * @returns The auth context
 */
const useAuth = () => {
  return useContext(AuthContext);
};

/**
 * AuthProvider Component
 * Provides authentication context to the application
 * Manages user authentication state, roles, and permissions
 */
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRoleState, setUserRoleState] = useState<UserRole | null>(null);
  const [isOrganizer, setIsOrganizer] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const navigate = useNavigate();

  /**
   * Set the user role and update related state
   * @param role The user role to set
   */
  const setUserRole = (role: UserRole | null) => {
    if (role) {
      setUserRoleState(role);
      setIsOrganizer(role === "organizer");
      setIsAdmin(role === "admin");
      localStorage.setItem("userRole", role);
    } else {
      setUserRoleState(null);
      setIsOrganizer(false);
      setIsAdmin(false);
      localStorage.removeItem("userRole");
    }
  };

  // Check for existing auth on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedRole = localStorage.getItem("userRole") as UserRole | null;

    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);

      // If we have a stored role, set it immediately before fetching profile
      if (storedRole) {
        setUserRoleState(storedRole);
        setIsOrganizer(storedRole === "organizer");
        setIsAdmin(storedRole === "admin");
      }

      // Fetch user profile from the server using the token
      fetchUserProfile(storedToken);
    }
  }, []);

  /**
   * Fetch user profile from the server
   * @param authToken The authentication token
   */
  const fetchUserProfile = async (authToken: string) => {
    try {
      // DEVELOPMENT ONLY: Mock profile fetch for testing
      // TODO: REMOVE BEFORE PRODUCTION
      if (process.env.NODE_ENV === "development" || true) {
        console.log("DEV MODE: Using mock profile data instead of API call");
        // Create mock user data based on token
        const isAdminToken = authToken.includes("admin-token");

        const mockUserData = {
          id: isAdminToken ? "admin-id" : "user-id",
          name: isAdminToken ? "Admin" : "Test User",
          email: isAdminToken ? "admin@example.com" : "user@example.com",
          role: isAdminToken ? "admin" : ("attendee" as UserRole),
          isVerified: true,
          city: "Addis Ababa",
          language: "English",
          birthDate: {
            year: "1990",
            month: "January",
            day: "1",
          },
        };

        setUserProfile(mockUserData);
        setUserRoleState(mockUserData.role as UserRole);
        setIsOrganizer(mockUserData.role === "organizer");
        setIsAdmin(mockUserData.role === "admin");
        setIsVerified(true);
        localStorage.setItem("userRole", mockUserData.role);
        return;
      }

      // Regular profile fetch - commented out to avoid network errors during development
      // const userData = await api.get("/users/profile", authToken);
      // setUserProfile(userData);
      // setUserRoleState(userData.role as UserRole);
      // setIsOrganizer(userData.role === "organizer");
      // setIsAdmin(userData.role === "admin");
      // setIsVerified(userData.isVerified || false);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // If token is invalid, log the user out
      logout();
    }
  };

  /**
   * Register a new user
   * @param userData The user data for registration
   * @returns A boolean indicating success or failure
   */
  const register = async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      // DEVELOPMENT ONLY: Mock registration for testing
      // TODO: REMOVE BEFORE PRODUCTION
      if (process.env.NODE_ENV === "development" || true) {
        console.log("DEV MODE: Using mock registration instead of API call");
        // Create a mock user and token
        const mockUser = {
          id: "user-" + Date.now(),
          name: userData.name,
          email: userData.email,
          role: "attendee" as UserRole,
          isVerified: true,
        };

        const mockToken = "user-token-" + Date.now();

        // Store the token
        localStorage.setItem("authToken", mockToken);
        setToken(mockToken);
        setIsAuthenticated(true);

        // Set user data
        setUserProfile(mockUser);
        setUserRoleState(mockUser.role);
        setIsOrganizer(false);
        setIsAdmin(false);
        setIsVerified(true);
        localStorage.setItem("userRole", mockUser.role);

        return true;
      }

      // Regular registration - commented out to avoid network errors during development
      // const response = await api.post("/auth/register", userData);
      //
      // if (response.token) {
      //   // Store the token
      //   localStorage.setItem("authToken", response.token);
      //   setToken(response.token);
      //   setIsAuthenticated(true);
      //
      //   // Set user data
      //   setUserProfile(response.user);
      //   setUserRoleState(response.user.role as UserRole);
      //   setIsOrganizer(response.user.role === "organizer");
      //   setIsAdmin(response.user.role === "admin");
      //   setIsVerified(response.user.isVerified || false);
      //
      //   return true;
      // }
      return false;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  /**
   * Log in a user
   * @param email The user's email
   * @param password The user's password
   * @returns A boolean indicating success or failure
   */
  const login = async (email: string, password: string) => {
    try {
      // Special case for admin login - SECURITY NOTE: In production, this should be moved to server-side validation
      if (email === "KelalAdmin" && password === "Gateway@2025") {
        // Create a mock admin user and token
        const adminUser = {
          id: "admin-id",
          name: "Admin",
          email: "admin@example.com",
          role: "admin" as UserRole,
        };

        const mockToken = "admin-token-" + Date.now();

        // Store the token
        localStorage.setItem("authToken", mockToken);
        setToken(mockToken);
        setIsAuthenticated(true);

        // Set admin user data
        setUserProfile(adminUser);
        setUserRoleState("admin");
        setIsOrganizer(false);
        setIsAdmin(true);
        setIsVerified(true); // Admins are always verified
        localStorage.setItem("userRole", "admin");

        // Navigate to home
        navigate("/");
        return true;
      }

      // DEVELOPMENT ONLY: Mock user login for testing
      // TODO: REMOVE BEFORE PRODUCTION
      if (process.env.NODE_ENV === "development" || true) {
        console.log("DEV MODE: Using mock login instead of API call");
        // Create a mock user and token
        const mockUser = {
          id: "user-" + Date.now(),
          name: email.split("@")[0] || "Test User",
          email: email,
          role: "attendee" as UserRole,
          isVerified: true,
        };

        const mockToken = "user-token-" + Date.now();

        // Store the token
        localStorage.setItem("authToken", mockToken);
        setToken(mockToken);
        setIsAuthenticated(true);

        // Set user data
        setUserProfile(mockUser);
        setUserRoleState(mockUser.role);
        setIsOrganizer(false);
        setIsAdmin(false);
        setIsVerified(true);
        localStorage.setItem("userRole", mockUser.role);

        // Navigate to home
        navigate("/");
        return true;
      }

      // Regular user login - commented out to avoid network errors during development
      // const response = await api.post("/auth/login", { email, password });
      //
      // if (response.token) {
      //   // Store the token
      //   localStorage.setItem("authToken", response.token);
      //   setToken(response.token);
      //   setIsAuthenticated(true);
      //
      //   // Set user data
      //   setUserProfile(response.user);
      //   setUserRoleState(response.user.role as UserRole);
      //   setIsOrganizer(response.user.role === "organizer");
      //   setIsAdmin(response.user.role === "admin");
      //   setIsVerified(response.user.isVerified || false);
      //
      //   // Navigate to home
      //   navigate("/");
      //   return true;
      // }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  /**
   * Log out the current user
   */
  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setIsOrganizer(false);
    setIsAdmin(false);
    setUserProfile(null);
    setToken(null);
    setIsVerified(false);

    // Clear localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("viewMode");

    // Navigate to login
    navigate("/login");
  };

  /**
   * Update the user profile
   * @param profile The profile data to update
   * @returns A boolean indicating success or failure
   */
  const updateUserProfile = async (profile: Partial<UserProfile>) => {
    if (!token) return false;

    try {
      const updatedProfile = await api.put("/users/profile", profile, token);

      setUserProfile(updatedProfile);

      // Update role if it was changed
      if (updatedProfile.role) {
        setUserRole(updatedProfile.role as UserRole);
        // Note: setIsOrganizer and setIsAdmin are handled by setUserRole

        // Save the role to localStorage for persistence
        localStorage.setItem("userRole", updatedProfile.role);
      }

      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      return false;
    }
  };

  /**
   * Check if the user has a specific permission
   * @param permission The permission to check
   * @returns A boolean indicating if the user has the permission
   */
  const hasPermission = (
    permission: keyof typeof rolePermissions.admin,
  ): boolean => {
    if (!userRoleState) return false;
    return rolePermissions[userRoleState][permission];
  };

  /**
   * Send a forgot password request
   * @param email The user's email
   * @returns A boolean indicating success or failure
   */
  const forgotPassword = async (email: string) => {
    try {
      const response = await api.post("/auth/forgot-password", { email });
      return !!response.message;
    } catch (error) {
      console.error("Forgot password error:", error);
      return false;
    }
  };

  /**
   * Reset the user's password
   * @param token The reset token
   * @param password The new password
   * @returns A boolean indicating success or failure
   */
  const resetPassword = async (token: string, password: string) => {
    try {
      const response = await api.post(`/auth/reset-password/${token}`, {
        password,
      });
      return !!response.message;
    } catch (error) {
      console.error("Reset password error:", error);
      return false;
    }
  };

  /**
   * Verify the user's email
   * @param token The verification token
   * @returns A boolean indicating success or failure
   */
  const verifyEmail = async (token: string) => {
    try {
      const response = await api.get(`/auth/verify-email/${token}`);
      if (response.message) {
        // If the user is already logged in, update their verification status
        if (isAuthenticated && userProfile) {
          setIsVerified(true);
          setUserProfile({ ...userProfile, isVerified: true });
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("Verify email error:", error);
      return false;
    }
  };

  /**
   * Resend the verification email
   * @param email The user's email
   * @returns A boolean indicating success or failure
   */
  const resendVerificationEmail = async (email: string) => {
    try {
      const response = await api.post("/auth/resend-verification", { email });
      return !!response.message;
    } catch (error) {
      console.error("Resend verification email error:", error);
      return false;
    }
  };

  /**
   * Update notification settings
   * @param emailNotifications Whether to enable email notifications
   * @returns A boolean indicating success or failure
   */
  const updateNotificationSettings = async (emailNotifications: boolean) => {
    if (!token) return false;

    try {
      const response = await api.put(
        "/notifications/settings",
        { emailNotifications },
        token,
      );

      if (response.message && userProfile) {
        setUserProfile({
          ...userProfile,
          emailNotifications,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Update notification settings error:", error);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userRole: userRoleState,
        isOrganizer,
        isAdmin,
        userProfile,
        token,
        isVerified,
        login,
        register,
        logout,
        setUserRole,
        updateUserProfile,
        hasPermission,
        forgotPassword,
        resetPassword,
        verifyEmail,
        resendVerificationEmail,
        updateNotificationSettings,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Export the hook and provider
export { useAuth, AuthProvider };
export default AuthProvider;
