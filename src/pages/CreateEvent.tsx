import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/PageLayout";
import { ArrowRight } from "lucide-react";

const CreateEvent: React.FC = () => {
  const navigate = useNavigate();
  const [hasEvents, setHasEvents] = useState<boolean | null>(null);
  const [showNoEventsDialog, setShowNoEventsDialog] = useState(false);

  useEffect(() => {
    const checkForEvents = async () => {
      try {
        const userEvents = localStorage.getItem("userEvents");
        const mockHasEvents = userEvents
          ? JSON.parse(userEvents).length > 0
          : false;
        setHasEvents(mockHasEvents);
      } catch (error) {
        console.error("Error checking for events:", error);
        setHasEvents(false);
      }
    };

    checkForEvents();
  }, []);

  const handleStartCreating = () => {
    localStorage.setItem("isCreatingFirstEvent", "true");
    navigate("/create-event-form");
  };

  const handleGoToDashboard = () => {
    if (hasEvents) {
      navigate("/event-organizer-dashboard");
    } else {
      setShowNoEventsDialog(true);
    }
  };

  const handleCreateFirstEvent = () => {
    navigate("/create-event-form");
  };

  const handleReturnHome = () => {
    navigate("/home");
  };

  return (
    <PageLayout>
      <div className="p-4 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex justify-center mb-6">
              <img
                src="https://kelalgateway.et/wp-content/uploads/2025/03/cropped-Kelal-logo-2.png"
                alt="K'elal Logo"
                className="h-24 w-28"
              />
            </div>

            <div className="text-center mb-6">
              <h2 className="text-xl font-bold">KELAL GATEWAY</h2>
              <h3 className="text-lg font-semibold mt-2">EVENT CREATOR</h3>
            </div>

            <p className="text-center text-gray-600 mb-8">
              Create and manage your events with our easy-to-use event creation
              tool. Fill in the details step by step and publish your event to
              the Kelal Gateway platform.
            </p>

            <div className="space-y-4">
              <Button
                className="w-full bg-[#0A1128] text-white py-3"
                onClick={handleStartCreating}
              >
                START CREATING YOUR EVENT
              </Button>

              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-lg font-semibold text-center mb-3">
                  ALREADY AN EVENT ORGANIZER?
                </h3>
                <Button
                  variant="outline"
                  className="w-full border-[#0A1128] text-[#0A1128] hover:bg-gray-50 flex justify-between items-center"
                  onClick={handleGoToDashboard}
                >
                  <span>GO TO YOUR ORGANIZER DASHBOARD</span>
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* No Events Dialog */}
        {showNoEventsDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full">
              <h3 className="text-xl font-bold text-center mb-4">
                No Events Found
              </h3>
              <p className="text-center text-gray-600 mb-6">
                You haven't created any events yet. Would you like to create
                your first event now?
              </p>
              <div className="flex flex-col space-y-3">
                <Button
                  className="w-full bg-[#0A1128] text-white"
                  onClick={handleCreateFirstEvent}
                >
                  Yes, Create My First Event
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-gray-300"
                  onClick={handleReturnHome}
                >
                  No, Return to Home
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-gray-500"
                  onClick={() => setShowNoEventsDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default CreateEvent;
