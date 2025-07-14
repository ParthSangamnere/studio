"use client";

const StrawHat = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 100"
      className="absolute -top-16 -left-8 w-40 h-auto transform -rotate-12 drop-shadow-lg"
    >
      <defs>
        <filter id="texture" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
          <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 -0.2 1.1"/>
          <feComposite operator="in" in2="SourceGraphic" result="textured"/>
        </filter>
      </defs>
      <g>
        {/* Hat shadow */}
        <path d="M100,35 C40,35 5,50 5,65 H195 C195,50 160,35 100,35 Z" fill="rgba(0,0,0,0.2)" transform="translate(3, 3)"/>

        {/* Hat */}
        <g fill="#FBE4A3" stroke="#D3A12E" strokeWidth="1.5">
          <path d="M100,15 C70,15 50,30 50,45 Q100,60 150,45 C150,30 130,15 100,15 Z" />
          <path d="M100,35 C40,35 5,50 5,65 H195 C195,50 160,35 100,35 Z" />
        </g>

        {/* Hat texture */}
        <g opacity="0.4" filter="url(#texture)">
            <path d="M100,15 C70,15 50,30 50,45 Q100,60 150,45 C150,30 130,15 100,15 Z" fill="#D3A12E" />
            <path d="M100,35 C40,35 5,50 5,65 H195 C195,50 160,35 100,35 Z" fill="#D3A12E" />
        </g>
        
        {/* Hat Band */}
        <rect x="48" y="42" width="104" height="6" fill="#E53E3E" rx="3" transform="rotate(-3 100 45)" stroke="#A02C2C" strokeWidth="0.5"/>

        {/* Jolly Roger */}
        <g transform="translate(88, 18) scale(0.25)">
          <g fill="white" stroke="black" strokeWidth="2">
            {/* Skull */}
            <path d="M50,15 C35,15 20,25 20,40 C20,55 35,65 50,65 C65,65 80,55 80,40 C80,25 65,15 50,15 Z" />
            <path d="M40,60 C45,70 55,70 60,60 L55,80 H45 Z" />
            {/* Crossbones */}
            <g transform="translate(50, 78) rotate(15) scale(1.2)">
              <rect x="-25" y="-4" width="50" height="8" rx="4"/>
              <rect x="-4" y="-25" width="8" height="50" rx="4"/>
            </g>
          </g>
          {/* Eyes & nose */}
          <circle cx="38" cy="42" r="6" fill="black" />
          <circle cx="62" cy="42" r="6" fill="black" />
        </g>
      </g>
    </svg>
  );


export const StrawHatTitle = () => {
    return (
      <div className="relative inline-block my-12 animate-[float_3s_ease-in-out_infinite_0.5s]">
        <StrawHat />
        <h1 className="text-6xl md:text-8xl font-headline uppercase text-foreground relative z-10" style={{ textShadow: '3px 3px 0px hsl(var(--border)), 5px 5px 8px rgba(0,0,0,0.3)' }}>
          <span className="text-primary">T</span>ic-
          <span className="text-primary">T</span>ac-
          <span className="text-primary">T</span>oe
        </h1>
      </div>
    );
  };