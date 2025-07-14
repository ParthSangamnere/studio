"use client";

const StrawHat = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 100"
    className="absolute -top-12 -left-4 w-32 h-auto transform -rotate-12 drop-shadow-lg"
  >
    <g fill="#FBE4A3" stroke="#D3A12E" strokeWidth="1.5">
      {/* Crown */}
      <path d="M100,15 C70,15 50,30 50,45 Q100,60 150,45 C150,30 130,15 100,15 Z" />
      {/* Brim */}
      <path d="M100,35 C40,35 5,50 5,65 H195 C195,50 160,35 100,35 Z" />
    </g>
    {/* Hat Band */}
    <rect x="48" y="42" width="104" height="6" fill="#E53E3E" rx="3" transform="rotate(-3 100 45)"/>
    {/* Detail lines on crown */}
    <path d="M100,15 Q120,25 135,43" fill="none" stroke="#D3A12E" strokeWidth="1" />
    <path d="M100,15 Q80,25 65,43" fill="none" stroke="#D3A12E" strokeWidth="1" />
    <path d="M100,15 Q100,20 100,43" fill="none" stroke="#D3A12E" strokeWidth="1" />
     {/* Detail lines on brim */}
    <path d="M5,65 C25,58 50,55 100,55 S175,58 195,65" fill="none" stroke="#D3A12E" strokeWidth="1" strokeDasharray="5,3" />
  </svg>
);


export const StrawHatTitle = () => {
    return (
      <div className="relative inline-block my-8 animate-[float_3s_ease-in-out_infinite_0.5s]">
        <StrawHat />
        <h1 className="text-6xl md:text-8xl font-headline uppercase text-foreground relative z-10" style={{ textShadow: '3px 3px 0px hsl(var(--border)), 5px 5px 8px rgba(0,0,0,0.3)' }}>
          <span className="text-primary">T</span>ic-
          <span className="text-primary">T</span>ac-
          <span className="text-primary">T</span>oe
        </h1>
      </div>
    );
  };
