import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Camera } from "lucide-react";
import { cn } from "@/lib/utils";

type InputType =
  | "text"
  | "number"
  | "email"
  | "tel"
  | "password"
  | "url"
  | "image"
  | "textarea";

interface SmartInputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  type?: InputType;
  label?: string;
  helperText?: string;
  error?: string;
  containerClassName?: string;
  imagePreviewClassName?: string;
  onImageChange?: (file: File | null) => void;
  imageUrl?: string;
}

export const SmartInput = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  SmartInputProps
>(
  (
    {
      type = "text",
      label,
      helperText,
      error,
      className,
      containerClassName,
      imagePreviewClassName,
      onImageChange,
      imageUrl,
      ...props
    },
    ref,
  ) => {
    const [selectedImage, setSelectedImage] = useState<string | null>(
      imageUrl || null,
    );
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handle keyboard type based on input type
    const getInputMode = () => {
      switch (type) {
        case "number":
          return "numeric";
        case "tel":
          return "tel";
        case "email":
          return "email";
        case "url":
          return "url";
        default:
          return "text";
      }
    };

    // Handle image selection
    const handleImageClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result as string);
          if (onImageChange) {
            onImageChange(file);
          }
        };
        reader.readAsDataURL(file);
      }
    };

    // Update image preview if imageUrl prop changes
    useEffect(() => {
      if (imageUrl) {
        setSelectedImage(imageUrl);
      }
    }, [imageUrl]);

    return (
      <div className={cn("space-y-2", containerClassName)}>
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}

        {type === "image" ? (
          <div className="space-y-2">
            <div
              onClick={handleImageClick}
              className={cn(
                "w-full h-32 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors",
                imagePreviewClassName,
              )}
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt="Preview"
                  className="h-full w-full object-contain rounded-md"
                />
              ) : (
                <>
                  <Camera className="h-6 w-6 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Upload image</p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef as React.RefObject<HTMLInputElement>}
              onChange={handleImageChange}
              {...props}
            />
          </div>
        ) : type === "textarea" ? (
          <Textarea
            className={cn("resize-none rounded-lg", className)}
            ref={ref as React.RefObject<HTMLTextAreaElement>}
            {...props}
          />
        ) : (
          <Input
            type={type}
            inputMode={getInputMode()}
            className={cn("rounded-lg", className)}
            ref={ref as React.RefObject<HTMLInputElement>}
            {...props}
          />
        )}

        {helperText && !error && (
          <p className="text-xs text-gray-500">{helperText}</p>
        )}

        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  },
);

SmartInput.displayName = "SmartInput";
