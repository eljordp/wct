import { motion } from 'framer-motion'

const CITIES: { name: string; x: number; y: number; major?: boolean }[] = [
  { name: 'Santa Barbara', x: 78, y: 58, major: true },
  { name: 'Ventura', x: 138, y: 118 },
  { name: 'Oxnard', x: 148, y: 148 },
  { name: 'Thousand Oaks', x: 200, y: 125 },
  { name: 'Malibu', x: 215, y: 208 },
  { name: 'Los Angeles', x: 278, y: 258, major: true },
  { name: 'Long Beach', x: 318, y: 338 },
  { name: 'Anaheim', x: 365, y: 315 },
  { name: 'Irvine', x: 370, y: 378 },
  { name: 'Newport Beach', x: 348, y: 398 },
  { name: 'Oceanside', x: 375, y: 510 },
  { name: 'Carlsbad', x: 382, y: 548 },
  { name: 'Encinitas', x: 388, y: 580 },
  { name: 'La Jolla', x: 395, y: 638, major: true },
]

const COAST_PATH = 'M 30,45 C 50,42 65,48 78,58 C 95,70 120,100 138,118 C 150,132 152,142 165,168 C 178,194 200,205 215,218 C 235,235 258,248 278,265 C 295,280 310,310 318,338 C 325,358 335,378 348,398 C 358,415 365,450 372,480 C 378,505 380,530 382,548 C 385,568 388,600 395,638 C 398,655 400,670 402,690'

export default function DeliveryMap() {
  return (
    <div className="relative w-full aspect-[5/7] max-w-[480px] mx-auto">
      <svg viewBox="0 0 500 750" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Glow filter for the coast line */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Bigger glow for major cities */}
          <filter id="cityGlow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="12" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          {/* Delivery zone gradient */}
          <linearGradient id="zoneGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#39FF14" stopOpacity="0.06" />
            <stop offset="50%" stopColor="#39FF14" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#39FF14" stopOpacity="0.04" />
          </linearGradient>
          {/* Coast line gradient */}
          <linearGradient id="coastGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#39FF14" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#39FF14" stopOpacity="1" />
            <stop offset="100%" stopColor="#39FF14" stopOpacity="0.6" />
          </linearGradient>
          <radialGradient id="dotGlow">
            <stop offset="0%" stopColor="#39FF14" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#39FF14" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background grid dots */}
        {Array.from({ length: 20 }).map((_, row) =>
          Array.from({ length: 15 }).map((_, col) => (
            <circle
              key={`${row}-${col}`}
              cx={col * 35 + 15}
              cy={row * 40 + 10}
              r="0.5"
              fill="rgba(255,255,255,0.06)"
            />
          ))
        )}

        {/* Delivery zone area — wide band along coast */}
        <path
          d="M 10,25 C 30,22 45,28 78,58 C 95,70 120,100 138,118 C 150,132 152,142 165,168 C 178,194 200,205 215,218 C 235,235 258,248 278,265 C 295,280 310,310 318,338 C 325,358 335,378 348,398 C 358,415 365,450 372,480 C 378,505 380,530 382,548 C 385,568 388,600 395,638 C 398,655 400,670 402,710 L 480,710 L 480,25 Z"
          fill="url(#zoneGrad)"
        />

        {/* Coast line — outer glow */}
        <path
          d={COAST_PATH}
          fill="none"
          stroke="#39FF14"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.15"
          filter="url(#glow)"
        />
        {/* Coast line — main */}
        <path
          d={COAST_PATH}
          fill="none"
          stroke="url(#coastGrad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="0"
        />
        {/* Coast line — bright core */}
        <path
          d={COAST_PATH}
          fill="none"
          stroke="#39FF14"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* City markers */}
        {CITIES.map((city, i) => (
          <g key={city.name}>
            {/* Ambient glow */}
            <circle
              cx={city.x}
              cy={city.y}
              r={city.major ? 20 : 12}
              fill="url(#dotGlow)"
              opacity={city.major ? 0.5 : 0.3}
            />
            {/* Outer ring for major cities */}
            {city.major && (
              <circle
                cx={city.x}
                cy={city.y}
                r="8"
                fill="none"
                stroke="#39FF14"
                strokeWidth="0.5"
                opacity="0.3"
              />
            )}
            {/* Dot */}
            <circle
              cx={city.x}
              cy={city.y}
              r={city.major ? 4 : 2.5}
              fill="#39FF14"
              opacity={city.major ? 1 : 0.7}
            />
            {/* Label */}
            <text
              x={city.x + (city.x > 300 ? -8 : 12)}
              y={city.y + (city.major ? 0 : 1)}
              textAnchor={city.x > 300 ? 'end' : 'start'}
              dominantBaseline="middle"
              fill={city.major ? '#ffffff' : 'rgba(255,255,255,0.45)'}
              fontSize={city.major ? '11' : '9'}
              fontFamily="'Space Grotesk', 'Inter', sans-serif"
              fontWeight={city.major ? '600' : '400'}
              letterSpacing="0.02em"
            >
              {city.name}
            </text>
          </g>
        ))}

        {/* "PACIFIC OCEAN" label */}
        <text
          x="80"
          y="500"
          fill="rgba(57,255,20,0.08)"
          fontSize="32"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
          letterSpacing="0.15em"
          transform="rotate(-70, 80, 500)"
        >
          PACIFIC OCEAN
        </text>
      </svg>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-[#39FF14]/20" />
      <div className="absolute top-0 right-0 w-8 h-8 border-r border-t border-[#39FF14]/20" />
      <div className="absolute bottom-0 left-0 w-8 h-8 border-l border-b border-[#39FF14]/20" />
      <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-[#39FF14]/20" />
    </div>
  )
}
