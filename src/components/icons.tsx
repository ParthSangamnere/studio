import { cn } from "@/lib/utils";

const iconGlow = "drop-shadow-[0_0_3px_hsl(var(--primary))]";
const accentGlow = "drop-shadow-[0_0_5px_hsl(var(--accent))]";

// A peace symbol for O
export const IconO = ({ className, isWinner }: { className?: string; isWinner?: boolean }) => (
  <svg
    className={cn("w-full h-full text-secondary-foreground", isWinner ? accentGlow : iconGlow, className)}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="hsl(var(--primary))" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5"/>
    <path d="M12 2v10" stroke="hsl(var(--primary-foreground))" />
    <path d="M12 12l-4 4" stroke="hsl(var(--primary-foreground))" />
    <path d="M12 12l4 4" stroke="hsl(var(--primary-foreground))" />
  </svg>
);


// Danger/Pirate symbol for X
export const IconX = ({ className, isWinner }: { className?: string; isWinner?: boolean }) => (
  <svg
    className={cn("w-full h-full text-accent", isWinner ? accentGlow : iconGlow, className)}
    viewBox="0 0 64 64"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="scale(1.1) translate(-3, -3)">
        {/* Skull */}
        <path d="M32 10C22.6 10 15 17.6 15 27c0 7.4 4.5 13.7 10.7 16.3-.5.9-.8 1.9-.8 3 0 3.3 2.7 6 6 6h10c3.3 0 6-2.7 6-6 0-1.1-.3-2.1-.8-3C52.5 40.7 57 34.4 57 27c0-9.4-7.6-17-17-17z"/>
        {/* Eyes */}
        <circle cx="26" cy="27" r="4"/>
        <circle cx="46" cy="27" r="4"/>
        {/* Crossbones */}
        <path transform="rotate(-45 22 51)" d="M17 49h10v4H17z"/>
        <path transform="rotate(-45 22 51)" d="M20 46h4v10h-4z"/>
        <path transform="rotate(45 50 51)" d="M45 49h10v4H45z"/>
        <path transform="rotate(45 50 51)" d="M48 46h4v10h-4z"/>
    </g>
  </svg>
);