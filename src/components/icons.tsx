import { cn } from "@/lib/utils";

const iconGlow = "drop-shadow-[0_0_3px_hsl(var(--primary))]";
const accentGlow = "drop-shadow-[0_0_5px_hsl(var(--accent))]";

// A skull for O
export const IconO = ({ className, isWinner }: { className?: string; isWinner?: boolean }) => (
  <svg
    className={cn("w-full h-full text-secondary-foreground", isWinner ? accentGlow : iconGlow, className)}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    <path d="M15.5 12c0 1.93-1.57 3.5-3.5 3.5S8.5 13.93 8.5 12c0-.9.36-1.72.95-2.32.28-.28.73-.28 1.01 0 .28.28.28.73 0 1.01-.39.39-.63.9-.63 1.45 0 1.1.9 2 2 2s2-.9 2-2c0-.55-.24-1.06-.63-1.45-.28-.28-.28-.73 0-1.01.28-.28.73-.28 1.01 0 .59.6 1.04 1.42 1.04 2.32z"/>
    <circle cx="9" cy="9.5" r="1.5" />
    <circle cx="15" cy="9.5" r="1.5" />
  </svg>
);


// Crossed swords for X
export const IconX = ({ className, isWinner }: { className?: string; isWinner?: boolean }) => (
  <svg
    className={cn("w-full h-full text-accent", isWinner ? accentGlow : iconGlow, className)}
    viewBox="0 0 100 100"
    fill="none"
    stroke="currentColor"
    strokeWidth="8"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M85,15 L15,85 M35,15 L15,35 M65,15 L15,65 M85,35 L35,85" strokeWidth="6"/>
    <path d="M87,13 L13,87" />
    <path d="M13,13 L87,87" />
    <path d="M50,10 L50,30 M40,20 L60,20" />
    <path d="M50,90 L50,70 M40,80 L60,80" />
  </svg>
);
