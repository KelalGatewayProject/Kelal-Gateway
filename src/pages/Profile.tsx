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
    name: "MICHEL DAMITE",
    city: "ADDIS ABABA",
    phone: "0984715947",
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
            <Link to="/app-settings" aria-label="SETTINGS">
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
          <h1 className="text-3xl font-bold mt-6 uppercase">{user.name}</h1>
          <p className="text-lg opacity-80 mt-2 uppercase">{user.city}</p>
          <div className="flex items-center justify-center mt-4">
            <span className="font-bold text-xl uppercase">
              ACCOUNT NO: {user.phone || "NOT SET"}
            </span>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="p-6 border border-gray-200 rounded-lg my-6 mx-4">
          <h2 className="text-lg font-bold mb-4 uppercase">PREFERENCES</h2>
          <div className="space-y-6">
            <Link
              to="/organizers-following"
              className="block text-sm hover:text-blue-500 uppercase"
            >
              ORGANIZERS YOU FOLLOW
            </Link>
            <Link
              to="/manage-notifications"
              className="block text-sm hover:text-blue-500 uppercase"
            >
              MANAGE NOTIFICATIONS
            </Link>
            <Link
              to="/linked-accounts"
              className="block text-sm hover:text-blue-500 uppercase"
            >
              LINKED ACCOUNTS
            </Link>
            <Link
              to="/help-center"
              className="block text-sm hover:text-blue-500 uppercase"
            >
              BROWSE HELP CENTER
            </Link>
          </div>
        </div>

        {/* Legal Section */}
        <div className="p-6 border border-gray-200 rounded-lg my-6 mx-4 bg-gray-50">
          <h2 className="text-lg font-bold mb-4 uppercase">LEGAL</h2>
          <div className="space-y-4">
            <Link
              to="https://kelalgateway.et/?page_id=13"
              className="flex justify-between items-center text-sm hover:text-blue-500 py-2 border-b border-gray-100 uppercase"
            >
              <span>TERMS OF SERVICE</span>
              <span className="text-gray-400">></span>
            </Link>
            <Link
              to="https://kelalgateway.et/?page_id=3"
              className="flex justify-between items-center text-sm hover:text-blue-500 py-2 border-b border-gray-100 uppercase"
            >
              <span>PRIVACY POLICY</span>
              <span className="text-gray-400">></span>
            </Link>
            <Link
              to="https://kelalgateway.et/?page_id=16"
              className="flex justify-between items-center text-sm hover:text-blue-500 py-2 border-b border-gray-100 uppercase"
            >
              <span>TERMS & CONDITIONS</span>
              <span className="text-gray-400">></span>
            </Link>
            <Link
              to="https://kelalgateway.et/?page_id=19"
              className="flex justify-between items-center text-sm hover:text-blue-500 py-2 uppercase"
            >
              <span>COOKIES POLICY</span>
              <span className="text-gray-400">></span>
            </Link>
          </div>
        </div>

        {/* Sign Out Section */}
        <div className="p-4">
          <Button
            className="w-full flex items-center justify-center gap-2 uppercase"
            onClick={handleSignOut}
          >
            <LogOut size={16} />
            SIGN OUT
          </Button>
        </div>
      </main>
    </PageLayout>
  );
};

export default Profile;