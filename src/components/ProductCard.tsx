import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import type { Product } from '@/data/products'
import { TERPENE_PROFILES } from '@/data/products'

interface Props {
  product: Product
  index: number
  onAddToCart: (product: Product) => void
}

const PROFILE_ICONS: Record<string, string> = {
  relaxed: '🍇',
  euphoric: '☀️',
  creative: '🎨',
  heavy: '🌿',
}

export default function ProductCard({ product, index, onAddToCart }: Props) {
  const profile = TERPENE_PROFILES[product.terpene_profile]

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="card-hover relative rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/[0.06] h-full flex flex-col">
        {/* Top gradient accent */}
        <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${profile.color}60, transparent)` }} />

        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-[#39FF14] text-black">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product visual area */}
        <div className="relative h-44 overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{ background: `radial-gradient(circle at 50% 80%, ${profile.color}, transparent 70%)` }}
          />
          <div className="text-5xl group-hover:scale-110 transition-transform duration-500">
            {PROFILE_ICONS[product.terpene_profile]}
          </div>
          {/* Terpene badge overlaid bottom-right */}
          <div
            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold border backdrop-blur-sm"
            style={{ backgroundColor: `${profile.color}10`, color: profile.color, borderColor: `${profile.color}25` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: profile.color }} />
            {profile.label}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pt-3 flex-1 flex flex-col border-t border-white/[0.04]">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="font-semibold text-white text-[13px] leading-tight">{product.name}</h3>
            <span className="text-[#39FF14] font-bold text-sm shrink-0">${product.price}</span>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] text-gray-600 uppercase tracking-wider">{product.category}</span>
            <span className="text-[10px] text-gray-700">&bull;</span>
            <span className="text-[10px] text-gray-600">THC {product.thc}</span>
          </div>
          <p className="text-[11px] text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-1">{product.description}</p>
          <button
            onClick={() => onAddToCart(product)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border"
            style={{
              backgroundColor: `${profile.color}08`,
              borderColor: `${profile.color}20`,
              color: profile.color,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = `${profile.color}18`
              e.currentTarget.style.borderColor = `${profile.color}40`
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = `${profile.color}08`
              e.currentTarget.style.borderColor = `${profile.color}20`
            }}
          >
            <Plus className="w-3.5 h-3.5" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  )
}
