const CITIES: { name: string; x: number; y: number; major?: boolean }[] = [
  { name: 'Santa Barbara', x: 85, y: 52, major: true },
  { name: 'Ventura', x: 145, y: 110 },
  { name: 'Oxnard', x: 132, y: 140 },
  { name: 'Thousand Oaks', x: 215, y: 145 },
  { name: 'Malibu', x: 195, y: 195 },
  { name: 'Los Angeles', x: 275, y: 242, major: true },
  { name: 'Long Beach', x: 310, y: 320, major: true },
]

// Simplified SoCal coastline path — SB to Greater LA
const COAST_PATH = 'M 35,38 C 55,35 70,42 85,52 C 100,62 125,90 145,110 C 155,122 140,135 148,158 C 156,178 180,192 195,205 C 215,222 248,238 270,252 C 288,264 298,290 310,320'

// Inland boundary of delivery zone
const INLAND_PATH = 'M 35,38 C 90,20 170,60 220,95 C 270,130 330,180 370,250 C 380,280 365,310 310,320'

export default function DeliveryMap() {
  return (
    <div className="relative w-full aspect-[5/4] max-w-[500px] mx-auto">
      <svg viewBox="0 0 440 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="bigGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="15" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="zoneGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#39FF14" stopOpacity="0.1" />
            <stop offset="40%" stopColor="#39FF14" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#39FF14" stopOpacity="0.02" />
          </linearGradient>
          <linearGradient id="coastGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#39FF14" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#39FF14" stopOpacity="1" />
            <stop offset="100%" stopColor="#39FF14" stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id="dotGlow">
            <stop offset="0%" stopColor="#39FF14" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#39FF14" stopOpacity="0" />
          </radialGradient>
          {/* Animated dash for route */}
          <linearGradient id="routeGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#39FF14" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#39FF14" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#39FF14" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Background grid */}
        <g opacity="0.04">
          {Array.from({ length: 11 }).map((_, row) =>
            Array.from({ length: 12 }).map((_, col) => (
              <circle key={`${row}-${col}`} cx={col * 38 + 12} cy={row * 38 + 10} r="0.6" fill="white" />
            ))
          )}
        </g>

        {/* Delivery zone fill */}
        <path
          d={`${COAST_PATH} L 310,320 ${INLAND_PATH.replace('M', 'L').split(' ').reverse().join(' ')} Z`}
          fill="url(#zoneGrad)"
          opacity="0.8"
        />

        {/* Zone boundary — inland dashed */}
        <path d={INLAND_PATH} fill="none" stroke="#39FF14" strokeWidth="0.8" strokeDasharray="6 4" opacity="0.15" />

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
          const isLeft = city.x < 280
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
                x={city.x + (isLeft ? 14 : -14)}
                y={city.y + 1}
                textAnchor={isLeft ? 'start' : 'end'}
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
          x="30"
          y="280"
          fill="rgba(57,255,20,0.06)"
          fontSize="32"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
          letterSpacing="0.2em"
          transform="rotate(-55, 30, 280)"
        >
          PACIFIC OCEAN
        </text>

        {/* Start marker — SB */}
        <g>
          <circle cx="85" cy="52" r="14" fill="none" stroke="#39FF14" strokeWidth="1" opacity="0.2" strokeDasharray="3 2" />
          <text x="85" y="28" textAnchor="middle" fill="#39FF14" fontSize="8" fontFamily="'Space Grotesk', sans-serif" fontWeight="600" letterSpacing="0.1em" opacity="0.7">START</text>
        </g>

        {/* End marker — Long Beach */}
        <g>
          <circle cx="310" cy="320" r="14" fill="none" stroke="#39FF14" strokeWidth="1" opacity="0.2" strokeDasharray="3 2" />
          <text x="310" y="350" textAnchor="middle" fill="#39FF14" fontSize="8" fontFamily="'Space Grotesk', sans-serif" fontWeight="600" letterSpacing="0.1em" opacity="0.7">END</text>
        </g>
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
