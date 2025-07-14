"use client";

const StrawHat = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 100"
      className="absolute -top-10 -left-2 w-28 h-auto transform -rotate-12 drop-shadow-lg"
    >
      <g fill="#FBE4A3">
        <path d="M100,25 C40,25 10,45 10,60 H190 C190,45 160,25 100,25 Z" />
        <path d="M100,10 C60,10 40,25 40,40 Q100,55 160,40 C160,25 140,10 100,10 Z" />
      </g>
      <path d="M10,60 C10,58 40,43 100,43 S190,58 190,60" fill="none" stroke="#D3A12E" strokeWidth="2"/>
      <rect x="50" y="38" width="100" height="4" fill="#E53E3E" rx="2" transform="rotate(-5 100 40)"/>
    </svg>
  );

export const StrawHatTitle = () => {
    return (
      <div className="relative inline-block my-8 animate-[float_3s_ease-in-out_infinite_0.5s]">
        <StrawHat />
        <h1 className="text-6xl md:text-8xl font-headline uppercase text-foreground relative z-10" style={{ textShadow: '2px 2px 4px hsl(var(--border))' }}>
          <span className="text-accent">T</span>ic-
          <span className="text-accent">T</span>ac-
          <span className="text-accent">T</span>oe
        </h1>
      </div>
    );
  };
