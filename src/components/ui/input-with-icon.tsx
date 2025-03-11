import React from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ className, icon, iconPosition = "right", ...props }, ref) => {
    return (
      <div className="relative w-full">
        <Input
          className={cn(
            "w-full rounded-md border border-gray-300 bg-transparent px-4 py-3",
            iconPosition === "right" ? "pr-10" : "pl-10",
            className,
          )}
          ref={ref}
          {...props}
        />
        {icon && (
          <div
            className={cn(
              "absolute top-1/2 transform -translate-y-1/2",
              iconPosition === "right" ? "right-3" : "left-3",
            )}
          >
            {icon}
          </div>
        )}
      </div>
    );
  },
);

InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
