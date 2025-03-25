import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Camera, X, Check, AlertCircle } from "lucide-react";

interface QRCodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccess: (data: string) => void;
  title?: string;
  description?: string;
}

const QRCodeScanner: React.FC<QRCodeScannerProps> = ({
  isOpen,
  onClose,
  onScanSuccess,
  title = "Scan QR Code",
  description = "Position the QR code within the frame",
}) => {
  const [scanning, setScanning] = useState(false);
  const [hasCamera, setHasCamera] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
        setError(null);
        scanQRCode();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setHasCamera(false);
      setError(
        "Could not access camera. Please ensure you've granted camera permissions.",
      );
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
          // Simulate QR code data
          const simulatedQRData = JSON.stringify({
            type: "event_ticket",
            eventId: "event-123",
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

  const handleScanComplete = (data: string) => {
    setScanning(false);
    stopCamera();
    onScanSuccess(data);
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
              <Button onClick={startCamera} className="mt-4 bg-[#0A1128]">
                Try Again
              </Button>
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
