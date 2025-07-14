import { cn } from "@/lib/utils";

const iconGlow = "drop-shadow-[0_0_3px_hsl(var(--primary))]";
const accentGlow = "drop-shadow-[0_0_5px_hsl(var(--accent))]";

export const IconO = ({ className, isWinner }: { className?: string; isWinner?: boolean }) => (
  <svg
    className={cn("w-full h-full text-secondary", isWinner ? accentGlow : iconGlow, className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="9" />
  </svg>
);

export const IconX = ({ className, isWinner }: { className?: string; isWinner?: boolean }) => (
  <svg
    className={cn("w-full h-full text-accent", isWinner ? accentGlow : iconGlow, className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
