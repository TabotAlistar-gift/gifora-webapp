import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LuxuryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  isLoading?: boolean;
}

export const LuxuryButton = forwardRef<HTMLButtonElement, LuxuryButtonProps>(
  ({ className, variant = "primary", isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "relative px-8 py-4 tracking-[0.15em] text-sm uppercase font-medium overflow-hidden group transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed",
          variant === "primary" && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(201,168,76,0.15)] hover:shadow-[0_0_30px_rgba(201,168,76,0.3)]",
          variant === "outline" && "bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
          variant === "ghost" && "bg-transparent text-foreground hover:text-primary hover:bg-secondary",
          className
        )}
        {...props}
      >
        <span className={cn("flex items-center justify-center gap-2", isLoading && "opacity-0")}>
          {children}
        </span>
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-5 h-5 animate-spin" />
          </span>
        )}
        {/* Subtle shine effect for primary variant */}
        {variant === "primary" && !disabled && (
          <span className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-[200%] transition-all duration-1000 ease-in-out" />
        )}
      </button>
    );
  }
);
LuxuryButton.displayName = "LuxuryButton";
