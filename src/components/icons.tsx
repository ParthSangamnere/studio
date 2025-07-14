import { cn } from "@/lib/utils";

const iconGlow = "drop-shadow-[0_0_3px_hsl(var(--primary))]";
const accentGlow = "drop-shadow-[0_0_5px_hsl(var(--accent))]";

// A gold coin for O
export const IconO = ({ className, isWinner }: { className?: string; isWinner?: boolean }) => (
  <svg
    className={cn("w-full h-full text-secondary-foreground", isWinner ? accentGlow : iconGlow, className)}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="hsl(var(--primary))" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5"/>
    <circle cx="12" cy="12" r="7" fill="none" stroke="hsl(var(--primary-foreground))" strokeWidth="1"/>
    <text x="12" y="15" textAnchor="middle" fontSize="6" fill="hsl(var(--primary-foreground))" className="font-headline">P</text>
  </svg>
);


// Jolly Roger for X
export const IconX = ({ className, isWinner }: { className?: string; isWinner?: boolean }) => (
  <svg
    className={cn("w-full h-full text-accent", isWinner ? accentGlow : iconGlow, className)}
    viewBox="0 0 64 64"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Skull */}
    <path d="M32 6C19.85 6 10 15.85 10 28c0 5.16 1.76 9.93 4.68 13.84C13.24 43.14 12 45.43 12 48c0 3.31 2.69 6 6 6h28c3.31 0 6-2.69 6-6 0-2.57-1.24-4.86-2.68-6.16C40.24 37.93 42 33.16 42 28c0-12.15-9.85-22-22-22zm-8 20a4 4 0 118 0 4 4 0 01-8 0zm16 0a4 4 0 118 0 4 4 0 01-8 0z" />
    
    {/* Crossbones */}
    <path d="M16.41 41.59a2 2 0 00-2.82 2.82L28.18 59a2 2 0 002.82-2.82L16.41 41.59z" transform="translate(6, -6) rotate(15 22 51)" />
    <path d="M39.59 41.59a2 2 0 00-2.82 2.82L51.36 59a2 2 0 002.82-2.82L39.59 41.59z" transform="translate(-6, -6) rotate(-15 45 51)"/>
  </svg>
);

    