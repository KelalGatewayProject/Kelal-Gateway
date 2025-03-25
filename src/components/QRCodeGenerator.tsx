import React from "react";

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  includeMargin?: boolean;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  value,
  size = 200,
  bgColor = "#FFFFFF",
  fgColor = "#000000",
  includeMargin = false,
}) => {
  // Create a URL for the QR code using the QR Server API
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(value)}${bgColor ? `&bgcolor=${bgColor.replace("#", "")}` : ""}${fgColor ? `&color=${fgColor.replace("#", "")}` : ""}${includeMargin ? "&margin=4" : ""}`;

  return (
    <div className="flex justify-center">
      <img
        src={qrCodeUrl}
        alt="QR Code"
        width={size}
        height={size}
        className="border p-2 rounded bg-white"
      />
    </div>
  );
};

export default QRCodeGenerator;
