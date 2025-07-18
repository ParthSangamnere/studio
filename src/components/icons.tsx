import { cn } from "@/lib/utils";

const iconGlow = "drop-shadow-[0_0_3px_hsl(var(--primary))]";
const accentGlow = "drop-shadow-[0_0_5px_hsl(var(--accent))]";

export const IconO = ({ className, isWinner }: { className?: string; isWinner?: boolean }) => (
  <svg
    className={cn("w-full h-full text-secondary", isWinner ? accentGlow : iconGlow, className)}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_d_1_1)">
      {/* Rope Circle */}
      <path
        d="M52.7,32c0,11.4-9.2,20.7-20.7,20.7S11.3,43.4,11.3,32S20.5,11.3,32,11.3S52.7,20.6,52.7,32z"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Rope texture */}
      <path
        d="M20.5,15c-0.2,1-0.4,2-0.5,3 M15,20.5c-1,0.2-2,0.4-3,0.5 M15,43.5c-1-0.2-2-0.4-3-0.5 M20.5,49c0.2-1,0.4-2,0.5-3 M43.5,49c1-0.2,2-0.4,3-0.5 M49,43.5c1,0.2,2,0.4,3,0.5 M49,20.5c-1,0.2-2-0.4-3-0.5 M43.5,15c-0.2,1-0.4,2-0.5,3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Anchor */}
      <g transform="translate(32, 32) scale(0.6) translate(-32, -32)">
        <path
          d="M32,18 L32,46 M32,24 C36,24 40,28 40,32 L40,38 M24,38 L24,32 C24,28 28,24 32,24"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18,38 C18,35.8 19.8,34 22,34 L26,34"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M46,38 C46,35.8 44.2,34 42,34 L38,34"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="32" cy="18" r="4" fill="currentColor" />
      </g>
    </g>
  </svg>
);


export const IconX = ({ className, isWinner }: { className?: string; isWinner?: boolean }) => (
  <svg
    className={cn("w-full h-full text-accent", isWinner ? accentGlow : iconGlow, className)}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Sword 1 */}
    <g transform="rotate(45, 32, 32)">
        <path d="M32 6 L 32 58" stroke="hsl(var(--card-foreground))" strokeWidth="3" strokeLinecap="round"/>
        <path d="M26 48 L 38 48" stroke="hsl(var(--card-foreground))" strokeWidth="5" strokeLinecap="round"/>
        <path d="M30 50 C 20 40 20 20 30 10" stroke="currentColor" strokeWidth="7" fill="none" strokeLinecap="round" />
    </g>
    {/* Sword 2 */}
    <g transform="rotate(-45, 32, 32)">
        <path d="M32 6 L 32 58" stroke="hsl(var(--card-foreground))" strokeWidth="3" strokeLinecap="round"/>
        <path d="M26 48 L 38 48" stroke="hsl(var(--card-foreground))" strokeWidth="5" strokeLinecap="round"/>
        <path d="M34 50 C 44 40 44 20 34 10" stroke="currentColor" strokeWidth="7" fill="none" strokeLinecap="round" />
    </g>
  </svg>
);

