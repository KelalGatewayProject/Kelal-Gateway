import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Textarea } from "@/components/ui/textarea";
import { Building, Mail, Phone, User, MapPin, FileText } from "lucide-react";
import TopNavigation from "@/components/TopNavigation";
import BottomNavigation from "@/components/BottomNavigation";
import { useAuth } from "@/context/AuthContext";

const EventOrganizerRegister: React.FC = () => {
  const navigate = useNavigate();
  const { setUserRole } = useAuth();
  const [formData, setFormData] = useState({
    organizerName: "",
    email: "",
    phone: "",
    address: "",
    description: "",
    contactPerson: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, we would send this data to the backend
    console.log("Submitting organizer registration:", formData);

    // Set user role to organizer and update isOrganizer in AuthContext
    setUserRole("organizer");

    // Update isOrganizer in localStorage
    localStorage.setItem("isOrganizer", "true");

    // Navigate to create event page
    navigate("/create-event");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <TopNavigation />

      <div className="flex-1 pt-[70px] pb-20 px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-6">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Become an Event Organizer
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <InputWithIcon
              type="text"
              name="organizerName"
              placeholder="Organization Name"
              value={formData.organizerName}
              onChange={handleChange}
              className="w-full bg-white shadow-sm border-gray-200"
              icon={<Building className="w-5 h-5 text-gray-500" />}
            />

            <InputWithIcon
              type="email"
              name="email"
              placeholder="Business Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white shadow-sm border-gray-200"
              icon={<Mail className="w-5 h-5 text-gray-500" />}
            />

            <InputWithIcon
              type="tel"
              name="phone"
              placeholder="Business Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full bg-white shadow-sm border-gray-200"
              icon={<Phone className="w-5 h-5 text-gray-500" />}
            />

            <InputWithIcon
              type="text"
              name="contactPerson"
              placeholder="Contact Person Name"
              value={formData.contactPerson}
              onChange={handleChange}
              className="w-full bg-white shadow-sm border-gray-200"
              icon={<User className="w-5 h-5 text-gray-500" />}
            />

            <InputWithIcon
              type="text"
              name="address"
              placeholder="Business Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full bg-white shadow-sm border-gray-200"
              icon={<MapPin className="w-5 h-5 text-gray-500" />}
            />

            <div className="space-y-2">
              <label className="flex items-center text-sm font-medium text-gray-700">
                <FileText className="w-5 h-5 text-gray-500 mr-2" />
                <span>Organization Description</span>
              </label>
              <Textarea
                name="description"
                placeholder="Tell us about your organization and the types of events you organize..."
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-white shadow-sm border-gray-200 min-h-[100px]"
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-[#0A1128] hover:bg-[#0A1128]/90 text-white py-6 rounded-full"
              >
                Register as Event Organizer
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              By registering, you agree to our Terms of Service and Privacy
              Policy.
            </p>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default EventOrganizerRegister;
