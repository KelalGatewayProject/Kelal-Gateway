import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PageLayout from "@/components/PageLayout";
import SimpleOpenStreetMap from "@/components/SimpleOpenStreetMap";
import {
  Phone,
  Globe,
  Instagram,
  Facebook,
  Calendar,
  Clock,
  MapPin,
  Image,
  Plus,
  ArrowRight,
} from "lucide-react";

const CreateEventForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 7;

  // Form state
  // Available categories for events - standardized for MembersApp integration
  const categories = [
    "ALL EVENTS",
    "MUSIC",
    "FOOD & DRINKS",
    "NIGHTLIFE",
    "ARTS & CULTURE",
    "SPORTS",
    "BUSINESS",
    "NETWORKING",
    "FESTIVALS",
    "SCHOOL",
  ];

  // Google Maps API configuration - removed direct dependency on the API loader

  // Default location is set in the venue location in formData

  const [formData, setFormData] = useState({
    // Step 1: Organizer - MembersApp integration fields
    organizerId: "", // Unique ID for organizer in the system
    organizerBanner: "",
    organizerName: "",
    biography: "",
    phoneNumber: "",
    webAddress: "",
    instagram: "",
    facebook: "",
    showOnMemberApp: "yes",

    // Step 2: Event Details - MembersApp integration fields
    eventId: "", // Unique ID for event in the system
    eventName: "",
    eventSummary: "",
    eventBanner: "",

    // Step 3: Performers & Sponsors - MembersApp integration fields
    performers: ["", "", "", ""],
    performerImages: ["", "", "", ""],
    performerIds: ["", "", "", ""], // IDs for linking performers in MembersApp
    sponsors: ["", "", "", ""],
    sponsorImages: ["", "", "", ""],
    sponsorIds: ["", "", "", ""], // IDs for linking sponsors in MembersApp

    // Step 4: Date & Time - MembersApp integration fields
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    category: "",

    // Step 5: Venue - MembersApp integration fields
    venueId: "", // Unique ID for venue in the system
    venueBanner: "",
    venueName: "",
    venuePhone: "",
    venueAddress: "",
    venueLocation: { lat: 9.0222, lng: 38.7468 }, // Default to Addis Ababa

    // Step 6: Additional Details - MembersApp integration fields
    eventType: "public",
    eventCost: "free",
    ageRestriction: "under21",
    eventStatus: "draft", // Status tracking for MembersApp (draft, published, cancelled)

    // Step 7: Ticket Prices - MembersApp integration fields
    ticketId: "", // Unique ID for tickets in the system
    generalTicketPrice: "",
    vipTicketPrice: "",
    ticketQuantity: "",
    ticketsSold: 0, // Track tickets sold for MembersApp
    ticketsRemaining: 0, // Track tickets remaining for MembersApp
  });

  // Fix for touch events on inputs
  useEffect(() => {
    const fixInputTouchEvents = () => {
      document.querySelectorAll("input, select, textarea").forEach((el) => {
        if (!el.getAttribute("data-touch-fixed")) {
          el.setAttribute("data-touch-fixed", "true");
          el.setAttribute(
            "style",
            "touch-action: manipulation; -webkit-tap-highlight-color: transparent; position: relative; z-index: 20; pointer-events: auto !important;",
          );
        }
      });
    };

    fixInputTouchEvents();
    const interval = setInterval(fixInputTouchEvents, 500);

    return () => clearInterval(interval);
  }, [currentStep]);

  // Time is now handled directly by the time input

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    console.log("Input changed:", name, value);

    // Store the original 24-hour format for time inputs but display in 12-hour format
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNext = () => {
    // Generate IDs for MembersApp integration if they don't exist
    const updatedFormData = { ...formData };

    // Generate unique IDs for integration with MembersApp if not already set
    if (!updatedFormData.eventId) {
      updatedFormData.eventId = `event-${Date.now()}`;
    }

    if (!updatedFormData.organizerId) {
      updatedFormData.organizerId = `org-${Date.now()}`;
    }

    if (!updatedFormData.venueId) {
      updatedFormData.venueId = `venue-${Date.now()}`;
    }

    if (!updatedFormData.ticketId && updatedFormData.eventCost === "paid") {
      updatedFormData.ticketId = `ticket-${Date.now()}`;
    }

    // Update performer and sponsor IDs if they have names but no IDs
    updatedFormData.performerIds = updatedFormData.performers.map(
      (performer, index) =>
        performer && !updatedFormData.performerIds[index]
          ? `performer-${Date.now()}-${index}`
          : updatedFormData.performerIds[index],
    );

    updatedFormData.sponsorIds = updatedFormData.sponsors.map(
      (sponsor, index) =>
        sponsor && !updatedFormData.sponsorIds[index]
          ? `sponsor-${Date.now()}-${index}`
          : updatedFormData.sponsorIds[index],
    );

    // Set event status to ready for review
    updatedFormData.eventStatus = "pending_review";

    // Calculate tickets remaining if it's a paid event with quantity
    if (
      updatedFormData.eventCost === "paid" &&
      updatedFormData.ticketQuantity
    ) {
      updatedFormData.ticketsRemaining =
        parseInt(updatedFormData.ticketQuantity) || 0;
    }

    // Update form data with the new IDs
    setFormData(updatedFormData);

    // Always set event cost to free for initial launch
    updatedFormData.eventCost = "free";

    // If we're on step 6 (Additional Details), skip to approval
    if (currentStep === 6) {
      // Submit form and navigate to event approval page with event data
      navigate("/event-approval", { state: { eventData: updatedFormData } });
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Save the event to localStorage for persistence
      try {
        // Create a simplified event object for the dashboard
        const newEvent = {
          id: updatedFormData.eventId,
          name: updatedFormData.eventName,
          date: updatedFormData.startDate,
          time: updatedFormData.startTime,
          location: updatedFormData.venueName,
          description: updatedFormData.eventSummary,
          createdAt: new Date().toISOString(),
        };

        // Get existing events or initialize empty array
        const existingEventsJSON = localStorage.getItem("userEvents");
        const existingEvents = existingEventsJSON
          ? JSON.parse(existingEventsJSON)
          : [];

        // Add new event and save back to localStorage
        existingEvents.push(newEvent);
        localStorage.setItem("userEvents", JSON.stringify(existingEvents));

        // Check if this was the first event being created
        const isFirstEvent =
          localStorage.getItem("isCreatingFirstEvent") === "true";
        localStorage.removeItem("isCreatingFirstEvent"); // Clean up

        // Submit form and navigate to event approval page with event data
        navigate("/event-organizer-dashboard", {
          state: {
            newEventCreated: true,
            isFirstEvent: isFirstEvent,
          },
        });
      } catch (error) {
        console.error("Error saving event:", error);
        // Submit form and navigate to event approval page with event data
        navigate("/event-approval", { state: { eventData: updatedFormData } });
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: // Organizer
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">ORGANIZER</h2>
            <div
              className="border border-gray-300 rounded-md p-4 flex items-center justify-center relative bg-white overflow-hidden cursor-pointer shadow-md"
              onClick={() =>
                document.getElementById("organizerBanner")?.click()
              }
            >
              <div className="text-center flex flex-col items-center">
                <p>850 X 350</p>
                <p>BANNER</p>
                <p className="font-bold text-[#030F29] mt-2">Click to upload</p>
              </div>
              <input
                id="organizerBanner"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    // Handle file upload
                    setFormData({
                      ...formData,
                      organizerBanner: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
              {formData.organizerBanner && (
                <div className="absolute inset-0 cursor-move">
                  <img
                    src={formData.organizerBanner}
                    alt="Organizer Banner"
                    className="w-full h-full object-cover rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Toggle image scale between 1, 1.2, and 1.5
                      const currentScale = e.currentTarget.style.transform
                        ? parseFloat(
                            e.currentTarget.style.transform.match(
                              /scale\(([^)]+)\)/,
                            )?.[1] || "1",
                          )
                        : 1;
                      const newScale =
                        currentScale >= 1.4
                          ? 1
                          : currentScale >= 1.2
                            ? 1.5
                            : 1.2;
                      e.currentTarget.style.transform = `scale(${newScale})`;
                      e.currentTarget.style.transition = "transform 0.3s";
                    }}
                  />
                </div>
              )}
            </div>

            <Input
              name="organizerName"
              value={formData.organizerName}
              onChange={handleInputChange}
              placeholder="ORGANIZER NAME"
              className="w-full bg-white"
              inputMode="text"
              type="text"
              style={{ touchAction: "manipulation" }}
            />

            <div>
              <Textarea
                name="biography"
                value={formData.biography}
                onChange={handleInputChange}
                placeholder="BIOGRAPHY"
                className="w-full resize-none bg-white"
                maxLength={120}
                inputMode="text"
                style={{ touchAction: "manipulation" }}
              />
              <div className="text-right text-xs text-gray-500">
                {formData.biography.length}/120
              </div>
            </div>

            <div className="flex items-center">
              <div className="mr-2 text-blue-900">
                <Phone size={24} />
              </div>
              <Input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="PHONE NUMBER"
                className="w-full bg-white"
                inputMode="tel"
                type="tel"
                style={{ touchAction: "manipulation" }}
              />
            </div>

            <div className="flex items-center">
              <div className="mr-2 text-blue-900">
                <Globe size={24} />
              </div>
              <Input
                name="webAddress"
                value={formData.webAddress}
                onChange={handleInputChange}
                placeholder="WEB ADDRESS"
                className="w-full bg-white"
                inputMode="url"
                type="url"
                style={{ touchAction: "manipulation" }}
              />
            </div>

            <div className="flex items-center">
              <div className="mr-2 text-blue-900">
                <Instagram size={24} />
              </div>
              <Input
                name="instagram"
                value={formData.instagram}
                onChange={handleInputChange}
                placeholder="INSTAGRAM @"
                className="w-full bg-white"
                inputMode="text"
                type="text"
                style={{ touchAction: "manipulation" }}
              />
            </div>

            <div className="flex items-center">
              <div className="mr-2 text-blue-900">
                <Facebook size={24} />
              </div>
              <Input
                name="facebook"
                value={formData.facebook}
                onChange={handleInputChange}
                placeholder="FACEBOOK @"
                className="w-full bg-white"
                inputMode="text"
                type="text"
                style={{ touchAction: "manipulation" }}
              />
            </div>

            <div className="mt-4">
              <p className="text-center text-sm mb-2">
                DO YOU WANT THE ORGANIZER'S DETAILS UPLOADED TO THE "ORGANIZER
                PAGE" ON THE MEMBERS APP? (REQUIRED FOR INTEGRATION)
              </p>
              <div className="flex justify-center space-x-8">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="showOnMemberApp"
                    checked={formData.showOnMemberApp === "yes"}
                    onChange={() => handleRadioChange("showOnMemberApp", "yes")}
                    className="hidden"
                  />
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${formData.showOnMemberApp === "yes" ? "bg-yellow-400 text-white" : "border border-gray-300 text-gray-700"} font-bold`}
                  >
                    Yes
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="showOnMemberApp"
                    checked={formData.showOnMemberApp === "no"}
                    onChange={() => handleRadioChange("showOnMemberApp", "no")}
                    className="hidden"
                  />
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${formData.showOnMemberApp === "no" ? "bg-yellow-400 text-white" : "border border-gray-300 text-gray-700"} font-bold`}
                  >
                    No
                  </span>
                </label>
              </div>
            </div>
          </div>
        );
      case 2: // Event Details
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">EVENT DETAILS</h2>

            <div
              className="border border-gray-300 rounded-md p-4 flex items-center justify-center relative bg-white overflow-hidden cursor-pointer shadow-md"
              onClick={() => document.getElementById("eventBanner")?.click()}
            >
              <div className="text-center flex flex-col items-center">
                <p>850 X 350</p>
                <p>EVENT BANNER</p>
                <p className="font-bold text-[#030F29] mt-2">Click to upload</p>
              </div>
              <input
                id="eventBanner"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    // Handle file upload
                    setFormData({
                      ...formData,
                      eventBanner: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
              {formData.eventBanner && (
                <div className="absolute inset-0 cursor-move">
                  <img
                    src={formData.eventBanner}
                    alt="Event Banner"
                    className="w-full h-full object-cover rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Toggle image scale between 1, 1.2, and 1.5
                      const currentScale = e.currentTarget.style.transform
                        ? parseFloat(
                            e.currentTarget.style.transform.match(
                              /scale\(([^)]+)\)/,
                            )?.[1] || "1",
                          )
                        : 1;
                      const newScale =
                        currentScale >= 1.4
                          ? 1
                          : currentScale >= 1.2
                            ? 1.5
                            : 1.2;
                      e.currentTarget.style.transform = `scale(${newScale})`;
                      e.currentTarget.style.transition = "transform 0.3s";
                    }}
                  />
                </div>
              )}
            </div>

            <Input
              name="eventName"
              value={formData.eventName}
              onChange={handleInputChange}
              placeholder="EVENT NAME"
              className="w-full bg-white"
              inputMode="text"
              type="text"
              style={{ touchAction: "manipulation" }}
            />

            <h3 className="text-2xl font-bold text-center mt-6">SUMMARY</h3>

            <div>
              <Textarea
                name="eventSummary"
                value={formData.eventSummary}
                onChange={handleInputChange}
                placeholder="ENTER A BRIEF SUMMARY OF YOUR EVENT, SO GUEST KNOW WHAT TO EXPECT"
                className="w-full h-40 resize-none bg-white"
                maxLength={80}
                inputMode="text"
                style={{ touchAction: "manipulation" }}
              />
              <div className="text-right text-xs text-gray-500">
                {formData.eventSummary.length}/80 characters
              </div>
            </div>
          </div>
        );

      case 3: // Performers & Sponsors
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">
              PERFORMERS AND SPONSORS
            </h2>

            <div className="border-t border-gray-300 pt-4">
              <h3 className="text-lg font-bold mb-4">THE ARTISTS PREFORMING</h3>

              <div className="grid grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={`performer-${index}`}
                    className="flex flex-col items-center"
                  >
                    <div
                      className="w-16 h-16 rounded-[10%] bg-white border border-gray-300 flex items-center justify-center relative mb-2 overflow-hidden cursor-pointer shadow-md"
                      onClick={() =>
                        document
                          .getElementById(`performer-image-${index}`)
                          ?.click()
                      }
                    >
                      {formData.performerImages[index] ? (
                        <div
                          className="w-full h-full cursor-move relative"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Toggle image scale between 1, 1.2, and 1.5
                            const img = e.currentTarget.querySelector("img");
                            const currentScale = img.style.transform
                              ? parseFloat(
                                  img.style.transform.match(
                                    /scale\(([^)]+)\)/,
                                  )?.[1] || "1",
                                )
                              : 1;
                            const newScale =
                              currentScale >= 1.4
                                ? 1
                                : currentScale >= 1.2
                                  ? 1.5
                                  : 1.2;
                            img.style.transform = `scale(${newScale})`;
                            img.style.transition = "transform 0.3s";
                          }}
                        >
                          <img
                            src={formData.performerImages[index]}
                            alt={`Performer ${index + 1}`}
                            className="w-full h-full object-cover absolute inset-0"
                          />
                        </div>
                      ) : (
                        <p className="font-bold text-[#030F29] text-center">
                          Click to upload
                        </p>
                      )}
                      <input
                        id={`performer-image-${index}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const newPerformerImages = [
                              ...formData.performerImages,
                            ];
                            newPerformerImages[index] = URL.createObjectURL(
                              e.target.files[0],
                            );
                            setFormData({
                              ...formData,
                              performerImages: newPerformerImages,
                            });
                          }
                        }}
                      />
                    </div>
                    <div className="w-16 text-center text-sm bg-white px-1 py-1 min-h-[2.5rem] overflow-hidden shadow-md">
                      <textarea
                        className="w-full text-center text-sm bg-white border-none focus:outline-none resize-none"
                        placeholder=""
                        value={formData.performers[index]}
                        onChange={(e) => {
                          const newPerformers = [...formData.performers];
                          newPerformers[index] = e.target.value;
                          setFormData({
                            ...formData,
                            performers: newPerformers,
                          });
                        }}
                        style={{
                          touchAction: "manipulation",
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                          height: "auto",
                          minHeight: "2.5rem",
                        }}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-300 pt-4">
              <h3 className="text-lg font-bold mb-4">SPONSORS</h3>

              <div className="grid grid-cols-4 gap-4">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={`sponsor-${index}`}
                    className="flex flex-col items-center"
                  >
                    <div
                      className="w-16 h-16 rounded-[10%] bg-white border border-gray-300 flex items-center justify-center relative mb-2 overflow-hidden cursor-pointer shadow-md"
                      onClick={() =>
                        document
                          .getElementById(`sponsor-image-${index}`)
                          ?.click()
                      }
                    >
                      {formData.sponsorImages[index] ? (
                        <div
                          className="w-full h-full cursor-move relative"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            // Toggle image scale between 1, 1.2, and 1.5
                            const img = e.currentTarget.querySelector("img");
                            const currentScale = img.style.transform
                              ? parseFloat(
                                  img.style.transform.match(
                                    /scale\(([^)]+)\)/,
                                  )?.[1] || "1",
                                )
                              : 1;
                            const newScale =
                              currentScale >= 1.4
                                ? 1
                                : currentScale >= 1.2
                                  ? 1.5
                                  : 1.2;
                            img.style.transform = `scale(${newScale})`;
                            img.style.transition = "transform 0.3s";
                          }}
                        >
                          <img
                            src={formData.sponsorImages[index]}
                            alt={`Sponsor ${index + 1}`}
                            className="w-full h-full object-cover absolute inset-0"
                          />
                        </div>
                      ) : (
                        <p className="font-bold text-[#030F29] text-center">
                          Click to upload
                        </p>
                      )}
                      <input
                        id={`sponsor-image-${index}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            const newSponsorImages = [
                              ...formData.sponsorImages,
                            ];
                            newSponsorImages[index] = URL.createObjectURL(
                              e.target.files[0],
                            );
                            setFormData({
                              ...formData,
                              sponsorImages: newSponsorImages,
                            });
                          }
                        }}
                      />
                    </div>
                    <div className="w-16 text-center text-sm bg-white px-1 py-1 min-h-[2.5rem] overflow-hidden shadow-md">
                      <textarea
                        className="w-full text-center text-sm bg-white border-none focus:outline-none resize-none"
                        placeholder=""
                        value={formData.sponsors[index]}
                        onChange={(e) => {
                          const newSponsors = [...formData.sponsors];
                          newSponsors[index] = e.target.value;
                          setFormData({ ...formData, sponsors: newSponsors });
                        }}
                        style={{
                          touchAction: "manipulation",
                          wordBreak: "break-word",
                          whiteSpace: "normal",
                          height: "auto",
                          minHeight: "2.5rem",
                        }}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 4: // Date & Time
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">DATE & TIME</h2>

            <div className="space-y-4">
              <h3 className="text-gray-500 font-medium">START</h3>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Calendar size={24} className="mr-2" />
                    <span className="font-bold">DATE</span>
                  </div>
                  <div className="relative w-full">
                    <Input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full bg-white cursor-pointer"
                      inputMode="none"
                      style={{ touchAction: "manipulation" }}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Clock size={24} className="mr-2" />
                    <span className="font-bold">TIME</span>
                  </div>
                  <div className="relative w-full">
                    <Input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      className="w-full bg-white cursor-pointer"
                      inputMode="none"
                      style={{ touchAction: "manipulation" }}
                    />
                  </div>
                </div>
              </div>
              <h3 className="text-gray-500 font-medium mt-4">END</h3>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Calendar size={24} className="mr-2" />
                    <span className="font-bold">DATE</span>
                  </div>
                  <div className="relative w-full">
                    <Input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full bg-white cursor-pointer"
                      inputMode="none"
                      style={{ touchAction: "manipulation" }}
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <Clock size={24} className="mr-2" />
                    <span className="font-bold">TIME</span>
                  </div>
                  <div className="relative w-full">
                    <Input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={(e) => {
                        // Convert to 12-hour format for display
                        handleInputChange(e);
                      }}
                      className="w-full bg-white cursor-pointer"
                      inputMode="none"
                      style={{ touchAction: "manipulation" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-300 pt-4">
              <h2 className="text-2xl font-bold text-center mb-4">CATEGORY</h2>

              <p className="text-center text-sm mb-4">
                "CHOOSING THE RIGHT CATEGORY ENSURES OPTIMAL VISIBILITY AND
                HELPS ATTENDEES FIND YOUR EVENT MORE EASILY."
              </p>

              <div className="flex justify-center">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full max-w-xs p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-center shadow-md"
                  style={{
                    touchAction: "manipulation",
                    zIndex: 30,
                    position: "relative",
                  }}
                >
                  <option value="" disabled>
                    SELECT A CATEGORY
                  </option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );

      case 5: // Venue
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">THE VENUE</h2>
            <div
              className="border border-gray-300 rounded-md p-4 flex items-center justify-center relative bg-white overflow-hidden cursor-pointer shadow-md"
              onClick={() => document.getElementById("venueBanner")?.click()}
            >
              <div className="text-center flex flex-col items-center">
                <p>850 X 350</p>
                <p>BANNER</p>
                <p className="font-bold text-[#030F29] mt-2">Click to upload</p>
              </div>
              <input
                id="venueBanner"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    // Handle file upload
                    setFormData({
                      ...formData,
                      venueBanner: URL.createObjectURL(e.target.files[0]),
                    });
                  }
                }}
              />
              {formData.venueBanner && (
                <div className="absolute inset-0 cursor-move">
                  <img
                    src={formData.venueBanner}
                    alt="Venue Banner"
                    className="w-full h-full object-cover rounded-md"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // Toggle image scale between 1, 1.2, and 1.5
                      const currentScale = e.currentTarget.style.transform
                        ? parseFloat(
                            e.currentTarget.style.transform.match(
                              /scale\(([^)]+)\)/,
                            )?.[1] || "1",
                          )
                        : 1;
                      const newScale =
                        currentScale >= 1.4
                          ? 1
                          : currentScale >= 1.2
                            ? 1.5
                            : 1.2;
                      e.currentTarget.style.transform = `scale(${newScale})`;
                      e.currentTarget.style.transition = "transform 0.3s";
                    }}
                  />
                </div>
              )}
            </div>
            <Input
              name="venueName"
              value={formData.venueName}
              onChange={handleInputChange}
              placeholder="VENUE NAME"
              className="w-full bg-white"
              inputMode="text"
              type="text"
              style={{ touchAction: "manipulation" }}
            />
            <div className="flex items-center">
              <div className="mr-2 text-blue-900">
                <Phone size={24} />
              </div>
              <Input
                name="venuePhone"
                value={formData.venuePhone}
                onChange={handleInputChange}
                placeholder="PHONE NUMBER"
                className="w-full bg-white"
                inputMode="tel"
                type="tel"
                style={{ touchAction: "manipulation" }}
              />
            </div>
            <div className="flex items-center">
              <div className="mr-2 text-blue-900">
                <MapPin size={24} />
              </div>
              <Input
                name="venueAddress"
                value={formData.venueAddress}
                onChange={handleInputChange}
                placeholder="ADDRESS / AREA"
                className="w-full bg-white"
                inputMode="text"
                type="text"
                style={{ touchAction: "manipulation" }}
              />
            </div>
            // In your CreateEventForm component (step 5 case)
            <div>
              <p className="mb-2 font-bold">PIN LOCATION ON MAP</p>
              <div className="h-48 bg-white border border-gray-300 rounded-md overflow-hidden shadow-md relative">
                <SimpleOpenStreetMap
                  initialLocation={formData.venueLocation}
                  onLocationChange={(newLocation, address) => {
                    setFormData({
                      ...formData,
                      venueLocation: newLocation,
                      venueAddress: address || formData.venueAddress,
                    });
                  }}
                  height="100%"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1 text-center">
                Click on the map to place a marker or drag the marker to adjust
                the location. Click the expand button to view full screen.
              </p>
            </div>
          </div>
        );

      case 6: // Additional Details
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">
              ADDITIONAL DETAILS
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-center space-x-8 mb-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="eventType"
                      checked={formData.eventType === "private"}
                      onChange={() => handleRadioChange("eventType", "private")}
                      className="mr-2"
                      style={{ touchAction: "manipulation" }}
                    />
                    <span className="font-bold">Private</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="eventType"
                      checked={formData.eventType === "public"}
                      onChange={() => handleRadioChange("eventType", "public")}
                      className="mr-2"
                      style={{ touchAction: "manipulation" }}
                    />
                    <span className="font-bold">Public</span>
                  </label>
                </div>

                <p className="text-center text-sm mb-6">
                  Private events will be provided with a link to privately share
                  with friends and family
                  <br />
                  Public events will be shared on Members App for all to attend
                  and will be fully integrated with the Members App system
                </p>
              </div>

              <div>
                <p className="text-center font-bold mb-2">Event Cost</p>
                <div className="flex justify-center mb-6">
                  <Button
                    variant="default"
                    className="bg-[#0A1128] text-white shadow-md"
                    style={{ touchAction: "manipulation" }}
                    disabled
                  >
                    FREE
                  </Button>
                </div>
                <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
                  <p className="text-sm text-yellow-700">
                    🎉 We're launching with free events only during our testing
                    phase! Payment features coming soon in Stage 2 - stay tuned
                    for updates!
                  </p>
                </div>
              </div>

              <div>
                <p className="text-center font-bold mb-2">ADULT ONLY EVENT</p>
                <div className="flex justify-center space-x-8 mb-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="ageRestriction"
                      checked={formData.ageRestriction === "under21"}
                      onChange={() =>
                        handleRadioChange("ageRestriction", "under21")
                      }
                      className="mr-2"
                      style={{ touchAction: "manipulation" }}
                    />
                    <span className="font-bold">Under 21</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="ageRestriction"
                      checked={formData.ageRestriction === "over21"}
                      onChange={() =>
                        handleRadioChange("ageRestriction", "over21")
                      }
                      className="mr-2"
                      style={{ touchAction: "manipulation" }}
                    />
                    <span className="font-bold">Over 21+</span>
                  </label>
                </div>

                <p className="text-center text-sm">
                  Adult only events will be publicized to only adult over 21+ on
                  the app and entrance will be restricted
                </p>
              </div>
            </div>
          </div>
        );

      case 7: // Ticket Information
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-center">
              TICKET INFORMATION
            </h2>

            <div className="space-y-4">
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
                <p className="text-sm text-yellow-700 font-bold">
                  🎉 We're launching with free events only during our testing
                  phase! Payment features coming soon in Stage 2 - stay tuned
                  for updates!
                </p>
              </div>

              {/* Ticket Quantity */}
              <div className="shadow-md p-4 rounded-md bg-white">
                <p className="font-bold mb-2">TICKET QUANTITY</p>
                <div className="flex items-center">
                  <input
                    name="ticketQuantity"
                    value={formData.ticketQuantity || ""}
                    onChange={handleInputChange}
                    placeholder="Enter quantity"
                    className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    inputMode="numeric"
                    type="number"
                    style={{ touchAction: "manipulation" }}
                  />
                  <span className="ml-4 text-xs font-bold">
                    LEAVE BLANK
                    <br />
                    FOR UNLIMITED
                  </span>
                </div>
              </div>

              {/* Free Ticket Information */}
              <div className="shadow-md p-4 rounded-md bg-white">
                <p className="font-bold mb-2">FREE TICKETS</p>
                <p className="text-sm">
                  All events are currently free during our testing phase.
                  Attendees will receive a QR code ticket when they click the
                  "FREE TICKET" button on the event page.
                </p>
              </div>

              {/* Integration Information */}
              <div className="mt-4 p-4 bg-white border border-gray-300 rounded-md text-sm text-center shadow-md">
                <p>
                  Your event will be fully integrated with the Members App
                  ticketing system. All ticket data will be synchronized
                  automatically.
                </p>
                <p className="mt-2 font-semibold">
                  Payment features will be available in Stage 2 of our
                  development.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center p-4">
            <p>Invalid step. Please go back and try again.</p>
          </div>
        );
    }
  };

  return (
    <PageLayout>
      <div className="p-4 pb-20" style={{ touchAction: "manipulation" }}>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium">
              {Math.round((currentStep / totalSteps) * 100)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#0A1128] h-2 rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <div
          className="bg-white rounded-lg p-4 shadow-md mb-6"
          style={{ touchAction: "manipulation" }}
        >
          {renderStep()}
        </div>

        <div className="flex justify-between">
          {currentStep > 1 ? (
            <Button
              variant="outline"
              onClick={handleBack}
              className="border-gray-300 shadow-md"
              style={{ touchAction: "manipulation" }}
            >
              Back
            </Button>
          ) : (
            <div></div>
          )}
          <button
            className="bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center p-0 shadow-lg"
            onClick={handleNext}
            style={{ touchAction: "manipulation" }}
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default CreateEventForm;
