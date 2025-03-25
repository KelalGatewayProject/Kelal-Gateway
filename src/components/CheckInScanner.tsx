import React, { useState, useRef, useEffect } from "react";
import { Camera, X, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CheckInScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (data: string) => Promise<boolean>;
  eventId: string;
  scanMode?: "tickets" | "drinks" | "all";
  staffRole?: string;
  staffPermissions?: string[];
}

const CheckInScanner: React.FC<CheckInScannerProps> = ({
  isOpen,
  onClose,
  onScanSuccess,
  eventId,
  scanMode = "tickets",
  staffRole = "",
  staffPermissions = [],
}) => {
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    type?: string;
  } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasCamera, setHasCamera] = useState(true);

  // Start camera when scanner is opened
  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const constraints = {
        video: { facingMode: "environment" },
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setScanning(true);
        setHasCamera(true);
        scanQRCode();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setScanning(false);
  };

  const scanQRCode = () => {
    if (!scanning) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    // Only process if video is playing
    if (video.readyState === video.HAVE_ENOUGH_DATA) {
      canvas.height = video.videoHeight;
      canvas.width = video.videoWidth;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      // In a real app, you would use a QR code scanning library here
      // For demo purposes, we'll simulate a successful scan after a delay
      setTimeout(() => {
        if (scanning) {
          // Simulate QR code data based on scan mode
          let qrType = scanMode === "drinks" ? "drink_voucher" : "event_ticket";

          // Randomly generate drink voucher or ticket based on permissions
          if (scanMode === "all" && Math.random() > 0.5) {
            qrType = "drink_voucher";
          }

          const simulatedQRData = JSON.stringify({
            type: qrType,
            eventId: eventId,
            userId: `user-${Math.floor(Math.random() * 1000)}`,
            ticketId: `ticket-${Date.now()}`,
            timestamp: new Date().toISOString(),
          });

          handleScanComplete(simulatedQRData);
        }
      }, 2000);
    }

    // Continue scanning
    if (scanning) {
      requestAnimationFrame(scanQRCode);
    }
  };

  const handleScanComplete = async (data: string) => {
    setScanning(false);
    stopCamera();

    try {
      // Parse the QR data
      const qrData = JSON.parse(data);
      const qrType = qrData.type;

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
        return;
      }

      // Process the scan with the parent component's handler
      const success = await onScanSuccess(data);

      setScanResult({
        success,
        message: success
          ? qrType === "drink_voucher"
            ? "Drink voucher redeemed successfully!"
            : "Check-in successful!"
          : qrType === "drink_voucher"
            ? "Invalid drink voucher or already redeemed"
            : "Invalid ticket or already checked in",
        type: qrType,
      });
    } catch (error) {
      console.error("Error processing scan:", error);
      setScanResult({
        success: false,
        message: "Error processing scan",
      });
    }
  };

  const handleReset = () => {
    setScanResult(null);
    startCamera();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center">
      <div className="bg-white rounded-lg w-[90%] max-w-md overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <div>
            <h3 className="text-lg font-bold">
              {scanMode === "drinks"
                ? "Scan Drink Voucher"
                : scanMode === "all"
                  ? "Scan Any QR Code"
                  : "Scan Ticket QR Code"}
            </h3>
            {staffRole && (
              <p className="text-sm text-gray-500">Role: {staffRole}</p>
            )}
          </div>
          <button onClick={onClose} className="p-1">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-4">
          {!hasCamera ? (
            <div className="text-center p-8">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p>Camera access is required for scanning tickets.</p>
              <Button onClick={startCamera} className="mt-4">
                Try Again
              </Button>
            </div>
          ) : scanResult ? (
            <div className="text-center p-8">
              {scanResult.success ? (
                <Check className="h-16 w-16 text-green-500 mx-auto mb-4" />
              ) : (
                <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              )}
              <p className="text-lg font-medium mb-2">
                {scanResult.success ? "Success!" : "Error"}
              </p>
              <p className="mb-4">{scanResult.message}</p>
              <div className="flex space-x-2">
                <Button onClick={handleReset} className="flex-1">
                  Scan Another
                </Button>
                <Button onClick={onClose} variant="outline" className="flex-1">
                  Close
                </Button>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="aspect-square w-full bg-black overflow-hidden rounded-lg relative">
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted
                />
                <canvas ref={canvasRef} className="hidden" />

                {/* Scanning overlay */}
                <div className="absolute inset-0 border-2 border-white/30 rounded-lg">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 border-2 border-green-500 rounded-lg animate-pulse" />
                  </div>
                </div>

                {scanning && (
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <p className="text-white bg-black/50 inline-block px-3 py-1 rounded-full text-sm">
                      Scanning...
                    </p>
                  </div>
                )}
              </div>

              <p className="text-center mt-4 text-sm text-gray-600">
                Position the QR code within the green box
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckInScanner;
