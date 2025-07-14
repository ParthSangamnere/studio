import { cn } from "@/lib/utils";

const iconGlow = "drop-shadow-[0_0_3px_hsl(var(--primary))]";
const accentGlow = "drop-shadow-[0_0_5px_hsl(var(--accent))]";

export const IconO = ({ className, isWinner }: { className?: string; isWinner?: boolean }) => (
  <svg
    className={cn("w-full h-full text-primary", isWinner ? accentGlow : iconGlow, className)}
    fill="none"
    stroke="currentColor"
    strokeWidth="10"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="50" cy="50" r="35" />
  </svg>
);

export const IconX = ({ className, isWinner }: { className?: string; isWinner?: boolean }) => (
  <svg
    className={cn("w-full h-full text-primary", isWinner ? accentGlow : iconGlow, className)}
    fill="none"
    stroke="currentColor"
    strokeWidth="10"
    strokeLinecap="round"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="15" y1="15" x2="85" y2="85" />
    <line x1="85" y1="15" x2="15" y2="85" />
  </svg>
);
