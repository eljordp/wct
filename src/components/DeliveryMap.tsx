const CITIES: { name: string; x: number; y: number; major?: boolean; labelDir: 'right' | 'left' | 'above' }[] = [
  { name: 'Santa Barbara', x: 110, y: 48, major: true, labelDir: 'above' },
  { name: 'Ventura', x: 202, y: 88, labelDir: 'right' },
  { name: 'Oxnard', x: 212, y: 112, labelDir: 'right' },
  { name: 'Thousand Oaks', x: 255, y: 105, labelDir: 'right' },
  { name: 'Malibu', x: 295, y: 178, labelDir: 'above' },
  { name: 'Los Angeles', x: 388, y: 165, major: true, labelDir: 'right' },
  { name: 'Long Beach', x: 448, y: 306, major: true, labelDir: 'left' },
]

// Geographically accurate SoCal coastline — Santa Barbara to Long Beach
// Key features: E-W coast at SB, Point Dume bend, Santa Monica Bay, Palos Verdes Peninsula
const COAST_PATH = 'M 25,55 C 60,50 88,46 110,48 C 132,50 155,55 175,66 C 188,74 196,80 202,88 C 208,96 210,104 212,112 C 216,124 224,136 235,148 C 250,162 262,170 272,174 C 286,179 306,180 328,182 C 342,183 350,185 354,192 C 356,202 356,218 356,235 C 356,252 354,266 346,280 C 336,296 330,306 336,314 C 344,322 362,320 385,316 C 402,312 425,306 448,306 C 465,306 480,310 495,314'

// Inland boundary of delivery zone
const INLAND_PATH = 'M 25,28 C 60,22 90,18 115,22 C 148,28 178,40 202,58 C 218,70 230,82 240,95 C 250,108 260,120 272,130 C 284,140 298,148 316,155 C 340,164 358,168 375,172 C 392,178 408,192 420,210 C 432,228 440,252 448,275 C 454,290 462,304 472,310 C 480,313 490,314 495,314'

// Closed zone fill: coast forward, then inland boundary reversed
const ZONE_FILL = 'M 25,55 C 60,50 88,46 110,48 C 132,50 155,55 175,66 C 188,74 196,80 202,88 C 208,96 210,104 212,112 C 216,124 224,136 235,148 C 250,162 262,170 272,174 C 286,179 306,180 328,182 C 342,183 350,185 354,192 C 356,202 356,218 356,235 C 356,252 354,266 346,280 C 336,296 330,306 336,314 C 344,322 362,320 385,316 C 402,312 425,306 448,306 C 465,306 480,310 495,314 C 490,314 480,313 472,310 C 462,304 454,290 448,275 C 440,252 432,228 420,210 C 408,192 392,178 375,172 C 358,168 340,164 316,155 C 298,148 284,140 272,130 C 260,120 250,108 240,95 C 230,82 218,70 202,58 C 178,40 148,28 115,22 C 90,18 60,22 25,28 L 25,55 Z'

export default function DeliveryMap() {
  return (
    <div className="relative w-full aspect-[3/2] max-w-[560px] mx-auto">
      <svg viewBox="0 0 520 355" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="zoneGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#39FF14" stopOpacity="0.12" />
            <stop offset="40%" stopColor="#39FF14" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#39FF14" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="coastGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#39FF14" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#39FF14" stopOpacity="1" />
            <stop offset="100%" stopColor="#39FF14" stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id="dotGlow">
            <stop offset="0%" stopColor="#39FF14" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#39FF14" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background grid */}
        <g opacity="0.04">
          {Array.from({ length: 10 }).map((_, row) =>
            Array.from({ length: 14 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={col * 38 + 12} cy={row * 38 + 10} r="0.6" fill="white" />
            ))
          )}
        </g>

        {/* Delivery zone fill */}
        <path d={ZONE_FILL} fill="url(#zoneGrad)" opacity="0.8" />

        {/* Zone boundary — inland dashed */}
        <path d={INLAND_PATH} fill="none" stroke="#39FF14" strokeWidth="0.8" strokeDasharray="6 4" opacity="0.15" />

        {/* Channel Islands (faint geographic context) */}
        <g opacity="0.06">
          <ellipse cx="125" cy="148" rx="34" ry="6" fill="none" stroke="white" strokeWidth="0.8" transform="rotate(-8, 125, 148)" />
          <ellipse cx="198" cy="145" rx="9" ry="2.5" fill="none" stroke="white" strokeWidth="0.6" />
        </g>

        {/* Coast — outer glow */}
        <path d={COAST_PATH} fill="none" stroke="#39FF14" strokeWidth="8" strokeLinecap="round" opacity="0.08" filter="url(#glow)" />
        {/* Coast — mid glow */}
        <path d={COAST_PATH} fill="none" stroke="#39FF14" strokeWidth="4" strokeLinecap="round" opacity="0.15" />
        {/* Coast — main line */}
        <path d={COAST_PATH} fill="none" stroke="url(#coastGrad)" strokeWidth="2" strokeLinecap="round" />
        {/* Coast — bright core */}
        <path d={COAST_PATH} fill="none" stroke="#39FF14" strokeWidth="0.8" strokeLinecap="round" opacity="0.95" />

        {/* Animated route dashes */}
        <path d={COAST_PATH} fill="none" stroke="#39FF14" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 12" opacity="0.4">
          <animate attributeName="stroke-dashoffset" from="0" to="-48" dur="3s" repeatCount="indefinite" />
        </path>

        {/* City markers */}
        {CITIES.map((city) => {
          const lx = city.labelDir === 'right' ? city.x + 14 : city.labelDir === 'left' ? city.x - 14 : city.x
          const ly = city.labelDir === 'above' ? city.y - 14 : city.y + 1
          const anchor = city.labelDir === 'right' ? 'start' : city.labelDir === 'left' ? 'end' : 'middle'
          return (
            <g key={city.name}>
              {/* Ambient glow */}
              <circle cx={city.x} cy={city.y} r={city.major ? 24 : 14} fill="url(#dotGlow)" opacity={city.major ? 0.6 : 0.3} />

              {/* Pulse ring for major cities */}
              {city.major && (
                <circle cx={city.x} cy={city.y} r="10" fill="none" stroke="#39FF14" strokeWidth="0.5" opacity="0.25">
                  <animate attributeName="r" from="6" to="16" dur="2.5s" repeatCount="indefinite" />
                  <animate attributeName="opacity" from="0.4" to="0" dur="2.5s" repeatCount="indefinite" />
                </circle>
              )}

              {/* Outer ring */}
              {city.major && (
                <circle cx={city.x} cy={city.y} r="7" fill="none" stroke="#39FF14" strokeWidth="0.6" opacity="0.35" />
              )}

              {/* Dot */}
              <circle cx={city.x} cy={city.y} r={city.major ? 3.5 : 2} fill="#39FF14" opacity={city.major ? 1 : 0.65} />

              {/* Label */}
              <text
                x={lx}
                y={ly}
                textAnchor={anchor}
                dominantBaseline="middle"
                fill={city.major ? '#ffffff' : 'rgba(255,255,255,0.4)'}
                fontSize={city.major ? '11' : '8.5'}
                fontFamily="'Space Grotesk', 'Inter', sans-serif"
                fontWeight={city.major ? '600' : '400'}
                letterSpacing="0.02em"
              >
                {city.name}
              </text>
            </g>
          )
        })}

        {/* "PACIFIC OCEAN" label */}
        <text
          x="55"
          y="285"
          fill="rgba(57,255,20,0.06)"
          fontSize="28"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
          letterSpacing="0.2em"
          transform="rotate(-38, 55, 285)"
        >
          PACIFIC OCEAN
        </text>
      </svg>

      {/* Corner frame accents */}
      <div className="absolute top-0 left-0 w-10 h-10 border-l-2 border-t-2 border-[#39FF14]/15 rounded-tl-lg" />
      <div className="absolute top-0 right-0 w-10 h-10 border-r-2 border-t-2 border-[#39FF14]/15 rounded-tr-lg" />
      <div className="absolute bottom-0 left-0 w-10 h-10 border-l-2 border-b-2 border-[#39FF14]/15 rounded-bl-lg" />
      <div className="absolute bottom-0 right-0 w-10 h-10 border-r-2 border-b-2 border-[#39FF14]/15 rounded-br-lg" />

      {/* Distance label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#39FF14]/[0.06] border border-[#39FF14]/15">
        <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] animate-pulse" />
        <span className="text-[10px] text-[#39FF14]/80 font-medium tracking-wide">100 MI COASTLINE</span>
      </div>
    </div>
  )
}
