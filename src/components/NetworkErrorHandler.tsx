import React, { useState, useEffect } from "react";
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NetworkErrorHandlerProps {
  children: React.ReactNode;
}

const NetworkErrorHandler: React.FC<NetworkErrorHandlerProps> = ({
  children,
}) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setHasError(false);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setHasError(true);
    };

    const handleError = () => {
      setHasError(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("error", handleError, { capture: true });

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("error", handleError, { capture: true });
    };
  }, []);

  const handleRetry = () => {
    setRetryCount(retryCount + 1);

    if (!isOnline) {
      // If we're offline, check connection again
      setIsOnline(navigator.onLine);
    } else {
      // If we're online but had an error, reset the error state
      setHasError(false);

      // Reload the page if we've tried multiple times
      if (retryCount >= 2) {
        window.location.reload();
      }
    }
  };

  if (!isOnline || hasError) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50 p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2 font-['Roboto'] uppercase">
            Network Error
          </h2>
          <p className="text-gray-600 mb-6">
            {!isOnline
              ? "You appear to be offline. Please check your internet connection and try again."
              : "There was a problem connecting to the server. Please try again later."}
          </p>
          <Button
            onClick={handleRetry}
            className="bg-[#0A1128] hover:bg-[#0A1128]/90 font-['Roboto'] uppercase"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default NetworkErrorHandler;
