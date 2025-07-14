"use client";

const StrawHat = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 100"
      className="absolute -top-16 -left-8 w-40 h-auto transform -rotate-12 drop-shadow-lg"
    >
      <g>
        {/* Hat */}
        <g fill="#FBE4A3" stroke="#D3A12E" strokeWidth="1.5">
          <path d="M100,15 C70,15 50,30 50,45 Q100,60 150,45 C150,30 130,15 100,15 Z" />
          <path d="M100,35 C40,35 5,50 5,65 H195 C195,50 160,35 100,35 Z" />
        </g>
        {/* Hat Band */}
        <rect x="48" y="42" width="104" height="6" fill="#E53E3E" rx="3" transform="rotate(-3 100 45)" />
        {/* Jolly Roger Skull */}
        <g transform="translate(88, 18) scale(0.25)">
          <path d="M50,10 C30,10 10,30 10,50 C10,70 30,90 50,90 C70,90 90,70 90,50 C90,30 70,10 50,10 Z" fill="white" />
          <path d="M35,60 C40,70 60,70 65,60 L60,85 H40 Z" fill="white"/>
          <circle cx="35" cy="40" r="8" fill="black" />
          <circle cx="65" cy="40" r="8" fill="black" />
          <rect x="40" y="25" width="20" height="5" fill="black" />
          {/* Crossbones */}
          <g transform="translate(50, 75) rotate(45)">
            <rect x="-35" y="-5" width="70" height="10" rx="5" fill="white"/>
            <rect x="-5" y="-35" width="10" height="70" rx="5" fill="white"/>
          </g>
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

    