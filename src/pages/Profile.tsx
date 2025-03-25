import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings, LogOut } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { useAuth } from "@/context/AuthContext";

const Profile: React.FC = () => {
  const { userProfile, logout } = useAuth();
  const navigate = useNavigate();

  // Fallback user data if profile is not set
  const user = userProfile || {
    name: "Michel Damite",
    city: "Addis Ababa", // Example city from registration
    phone: "0984715947", // Example phone number
    avatar: "https://imgur.com/zkK19cm.png",
  };

  const handleSignOut = () => {
    logout();
  };

  return (
    <PageLayout>
      {/* Main Content */}
      <main className="flex-1 pt-4 overflow-y-auto">
        {/* Profile Header */}
        <div className="p-6 text-center relative">
          {/* Settings Gear Icon */}
          <div className="absolute top-6 right-6">
            <Link to="/app-settings" aria-label="Settings">
              <Settings className="h-6 w-6" />
            </Link>
          </div>

          {/* Profile Image and Details */}
          <div className="w-32 h-32 rounded-full bg-white overflow-hidden mx-auto">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold mt-6">{user.name}</h1>
          <p className="text-lg opacity-80 mt-2">{user.city}</p>
          <div className="flex items-center justify-center mt-4">
            <span className="font-bold text-xl">
              Account No: {user.phone || "Not set"}
            </span>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="p-6 border border-gray-200 rounded-lg my-6 mx-4">
          <h2 className="text-lg font-bold mb-4">Preferences</h2>
          <div className="space-y-6">
            <Link
              to="/organizers-following"
              className="block text-sm hover:text-blue-500"
            >
              Organizers you follow
            </Link>
            <Link
              to="/manage-notifications"
              className="block text-sm hover:text-blue-500"
            >
              Manage notifications
            </Link>
            <Link
              to="/linked-accounts"
              className="block text-sm hover:text-blue-500"
            >
              Linked accounts
            </Link>
            <Link
              to="/help-center"
              className="block text-sm hover:text-blue-500"
            >
              Browse Help Center
            </Link>
          </div>
        </div>

        {/* Legal Section */}
        <div className="p-6 border border-gray-200 rounded-lg my-6 mx-4">
          <h2 className="text-lg font-bold mb-4">Legal</h2>
          <div className="space-y-6">
            <Link
              to="/terms-of-service"
              className="block text-sm hover:text-blue-500"
            >
              Terms of Service
            </Link>
            <Link to="/privacy" className="block text-sm hover:text-blue-500">
              Privacy
            </Link>
            <Link
              to="/accessibility"
              className="block text-sm hover:text-blue-500"
            >
              Accessibility
            </Link>
            <Link to="/cookies" className="block text-sm hover:text-blue-500">
              Cookies
            </Link>
          </div>
        </div>

        {/* Sign Out Section */}
        <div className="p-4">
          <Button
            className="w-full flex items-center justify-center gap-2"
            onClick={handleSignOut}
          >
            <LogOut size={16} />
            Sign out
          </Button>
        </div>
      </main>
    </PageLayout>
  );
};

export default Profile;
