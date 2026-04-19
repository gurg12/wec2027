// Deep atmospheric prairie hero — layered SVG sky, rolling hills, dramatic sun.
export default function PrairieHorizon({ className = '' }) {
  return (
    <svg
      viewBox="0 0 1440 900"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Deep navy → midnight sky */}
        <linearGradient id="ph-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#000617" />
          <stop offset="45%"  stopColor="#000b3a" />
          <stop offset="80%"  stopColor="#0b1f3a" />
          <stop offset="100%" stopColor="#122a50" />
        </linearGradient>
        {/* Gold horizon glow */}
        <radialGradient id="ph-sun-glow" cx="72%" cy="52%" r="38%">
          <stop offset="0%"   stopColor="#ffd600" stopOpacity="0.35" />
          <stop offset="40%"  stopColor="#ffd600" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ffd600" stopOpacity="0"    />
        </radialGradient>
        {/* Sky blue atmospheric haze near horizon */}
        <radialGradient id="ph-haze" cx="50%" cy="75%" r="60%">
          <stop offset="0%"   stopColor="#7eb9ef" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#7eb9ef" stopOpacity="0"    />
        </radialGradient>
        {/* Hill gradients */}
        <linearGradient id="ph-hill-far" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#1a3a6b" />
          <stop offset="100%" stopColor="#0b2045" />
        </linearGradient>
        <linearGradient id="ph-hill-mid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#0f2d5a" />
          <stop offset="100%" stopColor="#000b3a" />
        </linearGradient>
        <linearGradient id="ph-hill-near" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#071c42" />
          <stop offset="100%" stopColor="#000b3a" />
        </linearGradient>
        <linearGradient id="ph-ground" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#000b3a" />
          <stop offset="100%" stopColor="#000514" />
        </linearGradient>
        {/* Star shimmer */}
        <filter id="ph-glow">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Sky base */}
      <rect width="1440" height="900" fill="url(#ph-sky)" />

      {/* Horizon glow from sun */}
      <rect width="1440" height="900" fill="url(#ph-sun-glow)" />

      {/* Atmospheric haze */}
      <rect width="1440" height="900" fill="url(#ph-haze)" />

      {/* Stars (small, scattered) */}
      {[
        [120,60],[240,40],[380,90],[500,30],[650,70],[820,45],[960,80],
        [1100,35],[1280,65],[180,130],[420,115],[700,100],[1050,120],[1350,90],
        [80,180],[350,160],[600,145],[880,170],[1150,155],[1400,140],
        [300,210],[750,200],[1000,215],[1300,195],[50,230],[550,240],
      ].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r={i%5===0?1.5:0.9}
          fill="#faf8f0" opacity={0.3+Math.sin(i)*0.3} />
      ))}

      {/* Sun disc */}
      <circle cx="1040" cy="420" r="52" fill="#ffd600" opacity="0.95" filter="url(#ph-glow)" />
      {/* Sun inner bright spot */}
      <circle cx="1040" cy="420" r="28" fill="#fff4a6" opacity="0.85" />
      {/* Sun corona rings */}
      <circle cx="1040" cy="420" r="80"  fill="none" stroke="#ffd600" strokeWidth="1"   opacity="0.3" />
      <circle cx="1040" cy="420" r="110" fill="none" stroke="#ffd600" strokeWidth="0.5" opacity="0.18" />
      <circle cx="1040" cy="420" r="150" fill="none" stroke="#ffd600" strokeWidth="0.5" opacity="0.1" />

      {/* Far distant hills — lightest blue */}
      <path
        d="M0 560 Q180 490 360 530 Q540 570 720 510 Q900 450 1080 490 Q1260 530 1440 505 L1440 900 L0 900 Z"
        fill="url(#ph-hill-far)" opacity="0.6"
      />

      {/* Mid hills */}
      <path
        d="M0 620 Q200 560 400 590 Q580 620 760 570 Q940 520 1120 560 Q1300 600 1440 575 L1440 900 L0 900 Z"
        fill="url(#ph-hill-mid)" opacity="0.75"
      />

      {/* Near hills — river valley curve */}
      <path
        d="M0 700 Q160 650 320 665 Q480 680 600 640 Q720 600 860 645 Q1000 690 1140 660 Q1280 630 1440 650 L1440 900 L0 900 Z"
        fill="url(#ph-hill-near)"
      />

      {/* Foreground flat prairie — darkest */}
      <path
        d="M0 790 Q360 760 720 775 Q1080 790 1440 770 L1440 900 L0 900 Z"
        fill="url(#ph-ground)"
      />

      {/* Subtle sky blue river reflection in foreground */}
      <path
        d="M480 810 Q560 800 600 815 Q640 830 700 820 Q740 810 780 818 Q760 840 700 845 Q640 850 600 840 Q560 830 520 838 Z"
        fill="#7eb9ef" opacity="0.18"
      />

      {/* Gold horizon line */}
      <line x1="0" y1="618" x2="1440" y2="618" stroke="#ffd600" strokeWidth="1" opacity="0.2" />
    </svg>
  );
}
