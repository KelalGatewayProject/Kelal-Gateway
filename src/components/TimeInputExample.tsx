import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Clock } from "lucide-react";

// Utility functions for time conversion
const formatTime12Hour = (time24: string) => {
  const [hours, minutes] = time24.split(":");
  const hoursNum = parseInt(hours, 10);
  const suffix = hoursNum >= 12 ? "PM" : "AM";
  const hours12 = ((hoursNum + 11) % 12) + 1; // Convert to 12-hour format
  return `${hours12}:${minutes} ${suffix}`;
};

const formatTime24Hour = (time12: string) => {
  const [time, suffix] = time12.split(" ");
  let [hours, minutes] = time.split(":");
  if (suffix === "PM" && hours !== "12") {
    hours = (parseInt(hours, 10) + 12).toString();
  } else if (suffix === "AM" && hours === "12") {
    hours = "00";
  }
  return `${hours}:${minutes}`;
};

const TimeInputExample = () => {
  const [formData, setFormData] = useState({
    startTime: "13:45", // Default time in 24-hour format
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="flex-1">
      <div className="flex items-center mb-2">
        <Clock size={24} className="mr-2" />
        <span className="font-bold">TIME</span>
      </div>
      <div className="relative w-full">
        <Input
          type="text" // Use type="text" instead of type="time"
          name="startTime"
          value={formatTime12Hour(formData.startTime)} // Display in 12-hour format
          onChange={(e) => {
            const newTime12 = e.target.value;
            const newTime24 = formatTime24Hour(newTime12); // Convert back to 24-hour format
            handleInputChange({
              target: { name: "startTime", value: newTime24 },
            } as React.ChangeEvent<HTMLInputElement>);
          }}
          className="w-full bg-white cursor-pointer"
          inputMode="none"
          style={{ touchAction: "manipulation" }}
        />
      </div>
    </div>
  );
};

export default TimeInputExample;
