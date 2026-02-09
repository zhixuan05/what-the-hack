import * as React from "react";
import { cn } from "./utils";

interface TooltipProps {
  children: React.ReactNode;
}

interface TooltipTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

interface TooltipContentProps {
  children: React.ReactNode;
  className?: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

const TooltipContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

export function TooltipProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function Tooltip({ children }: TooltipProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <TooltipContext.Provider value={{ isOpen, setIsOpen }}>
      <div className="relative inline-block">
        {children}
      </div>
    </TooltipContext.Provider>
  );
}

export function TooltipTrigger({ asChild, children }: TooltipTriggerProps) {
  const { setIsOpen } = React.useContext(TooltipContext);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    } as any);
  }

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
}

export function TooltipContent({ children, className, side = 'top' }: TooltipContentProps) {
  const { isOpen } = React.useContext(TooltipContext);

  if (!isOpen) return null;

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-gray-900",
    bottom: "bottom-full left-1/2 -translate-x-1/2 -mb-px border-4 border-transparent border-b-gray-900",
    left: "left-full top-1/2 -translate-y-1/2 -ml-px border-4 border-transparent border-l-gray-900",
    right: "right-full top-1/2 -translate-y-1/2 -mr-px border-4 border-transparent border-r-gray-900",
  };

  return (
    <div
      className={cn(
        "absolute z-50",
        positionClasses[side],
        "px-3 py-1.5 text-xs text-white bg-gray-900 rounded-md",
        "whitespace-nowrap pointer-events-none",
        "animate-in fade-in-0 zoom-in-95 duration-200",
        className
      )}
    >
      {children}
      <div className={cn("absolute", arrowClasses[side])}>
        <div />
      </div>
    </div>
  );
}