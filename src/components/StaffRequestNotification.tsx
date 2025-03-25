import React from "react";
import { Calendar, Clock, MapPin, Users, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface StaffRequestNotificationProps {
  eventName?: string;
  eventDate?: string;
  eventTime?: string;
  eventLocation?: string;
  position?: string;
  payment?: string;
  organizerName?: string;
  organizerImage?: string;
  onAccept?: () => void;
  onDecline?: () => void;
}

const StaffRequestNotification: React.FC<StaffRequestNotificationProps> = ({
  eventName = "Summer Music Festival",
  eventDate = "August 15, 2023",
  eventTime = "4:00 PM - 10:00 PM",
  eventLocation = "Central Park, New York",
  position = "Ticket Scanner",
  payment = "120",
  organizerName = "Event Masters Inc.",
  organizerImage = "",
  onAccept = () => console.log("Position accepted"),
  onDecline = () => console.log("Position declined"),
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-md">
      {/* Header */}
      <div className="bg-blue-50 p-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-blue-900">
            Staff Position Request
          </h3>
          <Badge className="bg-blue-100 text-blue-800">New Opportunity</Badge>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 space-y-4">
        <h4 className="text-lg font-bold">{eventName}</h4>

        <div className="space-y-3">
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-2 text-blue-500" />
            <span>{eventDate}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="h-4 w-4 mr-2 text-blue-500" />
            <span>{eventTime}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
            <span>{eventLocation}</span>
          </div>
        </div>

        <div className="bg-gray-50 p-3 rounded-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2 text-blue-600" />
              <span>Position:</span>
            </div>
            <span>{position}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span>Payment:</span>
            </div>
            <span className="font-semibold">{payment}</span>
          </div>
        </div>

        <div className="flex items-center">
          <Avatar className="h-6 w-6 mr-2">
            {organizerImage ? (
              <AvatarImage src={organizerImage} alt={organizerName} />
            ) : (
              <AvatarFallback className="bg-blue-100 text-blue-800">
                {organizerName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            )}
          </Avatar>
          <div>
            <span className="text-xs text-gray-500">Organizer</span>
            <p className="text-sm font-medium">{organizerName}</p>
          </div>
        </div>

        {/* Action Buttons - Moved up slightly */}
        <div className="flex items-center space-x-3 pt-0">
          {" "}
          {/* Changed from pt-3 to pt-2 */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <MessageCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Message organizer</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex-1 flex space-x-2">
            <Button onClick={onDecline} variant="outline" className="flex-1">
              Decline
            </Button>
            <Button
              onClick={onAccept}
              className="flex-1 bg-blue-600 hover:bg-blue-700"
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffRequestNotification;
