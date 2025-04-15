import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, X, Check, AlertCircle } from "lucide-react";
import { Html5Qrcode } from "html5-qrcode";
import { api } from "@/lib/supabase";

interface QRCodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (data: string) => Promise<boolean> | void;
  title?: string;
  description?: string;
  validateWithServer?: boolean;
  validationEndpoint?: string;
  authToken?: string;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({
  isOpen,
  onClose,
  onScanSuccess,
  title = "Scan QR Code",
  description = "Position the QR code within the frame",
  validateWithServer = false,
  validationEndpoint = "/validate-qr",
  authToken,
}) => {
  const [scanning, setScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      startScanner();
    } else {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [isOpen]);

  const startScanner = async () => {
    if (!scannerContainerRef.current) return;

    try {
      // Check if camera is available
      await navigator.mediaDevices.getUserMedia({ video: true });
      setHasCamera(true);
      setError(null);

      // Create scanner instance if it doesn't exist
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode("qr-reader");
      }

      const qrCodeSuccessCallback = async (decodedText: string) => {
        await handleScanComplete(decodedText);
      };

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1,
      };

      await scannerRef.current.start(
        { facingMode: "environment" },
        config,
        qrCodeSuccessCallback,
        (errorMessage) => {
          // QR code scanning error (not camera permission error)
          console.log(errorMessage);
        },
      );

      setScanning(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasCamera(false);
      setError(
        "Could not access camera. Please ensure you've granted camera permissions.",
      );
    }
  };

  const stopScanner = () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current
        .stop()
        .then(() => {
          setScanning(false);
        })
        .catch((error) => {
          console.error("Error stopping scanner:", error);
        });
    }
  };

  const handleScanComplete = async (data: string) => {
    // Stop scanning temporarily
    stopScanner();
    setIsProcessing(true);

    try {
      // Try to parse the data as JSON to see if it's valid
      let parsedData: any;
      try {
        parsedData = JSON.parse(data);
      } catch (e) {
        // If it's not valid JSON, just use the raw string
        parsedData = data;
      }

      // If server validation is enabled, validate with server first
      if (validateWithServer && authToken) {
        try {
          const validationResponse = await api.post(
            validationEndpoint,
            { qrData: typeof parsedData === "object" ? parsedData : data },
            authToken,
          );

          if (!validationResponse.valid) {
            setError(validationResponse.message || "Invalid QR code");
            setIsProcessing(false);
            // Restart scanning after a delay
            setTimeout(() => {
              setError(null);
              startScanner();
            }, 3000);
            return;
          }
        } catch (error: any) {
          console.error("Server validation error:", error);
          setError(error.message || "Error validating QR code with server");
          setIsProcessing(false);
          // Restart scanning after a delay
          setTimeout(() => {
            setError(null);
            startScanner();
          }, 3000);
          return;
        }
      }

      // Call the onScanSuccess callback and await its result if it returns a Promise
      const result = await onScanSuccess(
        typeof parsedData === "object" ? JSON.stringify(parsedData) : data,
      );

      // If the callback explicitly returns false, we can restart scanning
      if (result === false) {
        startScanner();
      }
    } catch (error: any) {
      console.error("Error in scan success handler:", error);
      setError(error.message || "Error processing QR code");
      // Restart scanning after a delay
      setTimeout(() => {
        setError(null);
        startScanner();
      }, 3000);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[90%] max-w-md overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className="p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          {!hasCamera ? (
            <div className="text-center p-8">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p>{error || "Camera access is required for scanning."}</p>
              <Button onClick={startScanner} className="mt-4 bg-[#0A1128]">
                Try Again
              </Button>
            </div>
          ) : error ? (
            <div className="text-center p-8">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 font-medium">{error}</p>
              <Button
                onClick={() => {
                  setError(null);
                  startScanner();
                }}
                className="mt-4 bg-[#0A1128]"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className="relative">
              <div
                id="qr-reader"
                ref={scannerContainerRef}
                className="aspect-square w-full overflow-hidden rounded-lg relative"
                style={{ background: "#000" }}
              ></div>

              {/* Scanning overlay - shown on top of the scanner */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border-2 border-green-500 rounded-lg animate-pulse" />
                </div>

                {scanning && (
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="text-white bg-black/50 inline-block px-3 py-1 rounded-full text-sm">
                      {isProcessing ? "Processing..." : "Scanning..."}
                    </p>
                  </div>
                )}
              </div>

              <p className="text-center mt-4 text-sm text-gray-600">
                {description}
              </p>
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <Button onClick={onClose} className="w-full bg-[#0A1128]">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScanner;
