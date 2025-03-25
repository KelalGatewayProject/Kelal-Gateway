import React from "react";
import { SmartInput } from "@/components/ui/smart-input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label?: string;
  type?:
    | "text"
    | "number"
    | "email"
    | "tel"
    | "password"
    | "url"
    | "image"
    | "textarea";
  placeholder?: string;
  value?: string | number;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  onImageChange?: (file: File | null) => void;
  error?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  containerClassName?: string;
  imageUrl?: string;
  imagePreviewClassName?: string;
}

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  onImageChange,
  error,
  helperText,
  required = false,
  disabled = false,
  className,
  containerClassName,
  imageUrl,
  imagePreviewClassName,
  ...props
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2", containerClassName)}>
      {label && (
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </Label>
      )}

      <SmartInput
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onImageChange={onImageChange}
        error={error}
        helperText={helperText}
        disabled={disabled}
        className={className}
        imageUrl={imageUrl}
        imagePreviewClassName={imagePreviewClassName}
        required={required}
        {...props}
      />
    </div>
  );
}
