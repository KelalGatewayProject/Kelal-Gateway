import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const NotificationSettings = () => {
  const { userProfile, updateNotificationSettings } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState<boolean>(
    userProfile?.emailNotifications !== false,
  );
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleToggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
  };

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      const success = await updateNotificationSettings(emailNotifications);

      if (success) {
        toast({
          title: "Settings saved",
          description: "Your notification preferences have been updated.",
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description:
            "Failed to update notification settings. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>
          Manage how you receive notifications about events, tickets, and
          updates.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <p className="text-sm text-gray-500">
                Receive email notifications about ticket purchases, event
                updates, and important announcements.
              </p>
            </div>
            <Switch
              id="email-notifications"
              checked={emailNotifications}
              onCheckedChange={handleToggleEmailNotifications}
            />
          </div>
        </div>

        <Button
          onClick={handleSaveSettings}
          disabled={isSaving}
          className="w-full md:w-auto"
        >
          {isSaving ? "Saving..." : "Save Settings"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;
