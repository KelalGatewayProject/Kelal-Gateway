import React, { useState, useRef, useEffect } from "react";
import { Camera, X, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Html5Qrcode } from "html5-qrcode";
import { api } from "@/lib/supabase";

interface CheckInScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (data: string) => Promise<boolean>;
  eventId: string;
  scanMode?: "tickets" | "drinks" | "all";
  staffRole?: string;
  staffPermissions?: string[];
  authToken?: string;
}

const CheckInScanner: React.FC<CheckInScannerProps> = ({
  isOpen,
  onClose,
  onScanSuccess,
  eventId,
  scanMode = "tickets",
  staffRole = "",
  staffPermissions = [],
  authToken,
}) => {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    type?: string;
  } | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerContainerRef = useRef<HTMLDivElement>(null);
  const [hasCamera, setHasCamera] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // Start scanner when component is opened
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
      setScanResult(null);

      // Create scanner instance if it doesn't exist
      if (!scannerRef.current) {
        scannerRef.current = new Html5Qrcode("checkin-qr-reader");
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
    // Stop scanning
    stopScanner();
    setIsProcessing(true);

    try {
      // Try to parse the data as JSON
      let qrData: any;
      let qrType: string;

      try {
        qrData = JSON.parse(data);
        qrType = qrData.type;
      } catch (e) {
        // If it's not valid JSON, show an error
        setScanResult({
          success: false,
          message: "Invalid QR code format",
        });
        setIsProcessing(false);
        return;
      }

      // Check if staff has permission to scan this type of QR code
      let hasPermission = false;

      if (
        qrType === "event_ticket" &&
        (staffPermissions.includes("scan_tickets") ||
          scanMode === "tickets" ||
          scanMode === "all")
      ) {
        hasPermission = true;
      } else if (
        qrType === "drink_voucher" &&
        (staffPermissions.includes("scan_drinks") ||
          scanMode === "drinks" ||
          scanMode === "all")
      ) {
        hasPermission = true;
      }

      if (!hasPermission) {
        setScanResult({
          success: false,
          message: `You don't have permission to scan ${qrType === "drink_voucher" ? "drink vouchers" : "tickets"}`,
          type: qrType,
        });
        setIsProcessing(false);
        return;
      }

      // Verify the event ID matches
      if (qrData.eventId !== eventId) {
        setScanResult({
          success: false,
          message: `This ${qrType === "drink_voucher" ? "drink voucher" : "ticket"} is for a different event`,
          type: qrType,
        });
        setIsProcessing(false);
        return;
      }

      // Call the onScanSuccess callback
      const result = await onScanSuccess(data);

      if (result) {
        setScanResult({
          success: true,
          message: `${qrType === "drink_voucher" ? "Drink voucher" : "Ticket"} validated successfully`,
          type: qrType,
        });
      } else {
        setScanResult({
          success: false,
          message: `${qrType === "drink_voucher" ? "Drink voucher" : "Ticket"} is invalid or already used`,
          type: qrType,
        });
      }
    } catch (error) {
      console.error("Error processing scan:", error);
      setScanResult({
        success: false,
        message: "Error processing scan",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[90%] max-w-md overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-bold">
            Scan {scanMode === "tickets" ? "Ticket" : "Drink Voucher"}
          </h3>
          <button onClick={onClose} className="p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        {scanResult ? (
          <div className="p-6 text-center">
            {scanResult.success ? (
              <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
            ) : (
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            )}
            <p className="text-lg font-medium mb-2">
              {scanResult.success ? "Success!" : "Error"}
            </p>
            <p className="mb-6">{scanResult.message}</p>

            <div className="flex space-x-2">
              <Button
                onClick={() => {
                  setScanResult(null);
                  startScanner();
                }}
                className="flex-1 bg-[#0A1128]"
              >
                Scan Again
              </Button>
              <Button onClick={onClose} variant="outline" className="flex-1">
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-4">
            {!hasCamera ? (
              <div className="text-center p-8">
                <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <p>Camera access is required for scanning.</p>
                <Button onClick={startScanner} className="mt-4 bg-[#0A1128]">
                  Try Again
                </Button>
              </div>
            ) : (
              <div className="relative">
                <div
                  id="checkin-qr-reader"
                  ref={scannerContainerRef}
                  className="aspect-square w-full overflow-hidden rounded-lg relative"
                  style={{ background: "#000" }}
                ></div>

                {/* Scanning overlay */}
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
                  Position the QR code within the frame
                </p>
              </div>
            )}

            <div className="mt-4">
              <Button onClick={onClose} className="w-full bg-[#0A1128]">
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckInScanner;
