import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";
import NetworkErrorHandler from "@/components/NetworkErrorHandler";

const NetworkErrorDemo = () => {
  const [showError, setShowError] = useState(false);

  const triggerError = () => {
    setShowError(true);
  };

  const resetDemo = () => {
    setShowError(false);
  };

  if (showError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50 p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2 font-['Roboto'] uppercase">
            Network Error
          </h2>
          <p className="text-gray-600 mb-6">
            There was a problem connecting to the server. Please try again
            later.
          </p>
          <Button
            onClick={resetDemo}
            className="bg-[#0A1128] hover:bg-[#0A1128]/90 font-['Roboto'] uppercase"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4 font-['Roboto'] uppercase">
        Network Error Handler Demo
      </h1>
      <p className="mb-6">
        Click the button below to simulate a network error.
      </p>

      <Button
        onClick={triggerError}
        className="bg-red-500 hover:bg-red-600 font-['Roboto'] uppercase"
      >
        Simulate Network Error
      </Button>

      <div className="mt-8 p-4 border border-gray-200 rounded-md">
        <h2 className="text-lg font-semibold mb-2">How It Works</h2>
        <p className="text-sm text-gray-600">
          The NetworkErrorHandler component wraps around the application and
          detects when the user goes offline or when network requests fail. It
          provides a user-friendly error message and retry functionality.
        </p>
      </div>
    </div>
  );
};

export default NetworkErrorDemo;
