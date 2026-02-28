import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, ShoppingCart, Leaf, Wind, Candy, Gem, Cigarette } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { WholesaleProduct } from '@/data/wholesaleProducts'
import { STRAIN_INFO, getWholesaleUnitPrice } from '@/data/wholesaleProducts'

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  flower: Leaf,
  vapes: Wind,
  edibles: Candy,
  concentrates: Gem,
  'pre-rolls': Cigarette,
}

interface Props {
  product: WholesaleProduct
  index: number
  onAddToCart: (product: WholesaleProduct) => void
}

export default function WholesaleProductCard({ product, index, onAddToCart }: Props) {
  const [added, setAdded] = useState(false)
  const strainInfo = STRAIN_INFO[product.strain]
  const lowestTier = product.wholesale[0]

  const handleAdd = () => {
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <div className="card-hover relative rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/[0.06] h-full flex flex-col">
        {/* Top gradient accent */}
        <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${strainInfo.color}60, transparent)` }} />

        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide bg-[#39FF14] text-black">
              {product.badge}
            </span>
          )}
        </div>

        {/* Product visual area */}
        <div className="relative h-36 overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-0 opacity-[0.05] transition-all duration-500"
            style={{ background: `radial-gradient(circle at 50% 80%, ${strainInfo.color}, transparent 70%)` }}
          />
          {(() => {
            const Icon = CATEGORY_ICONS[product.category] || Leaf
            return <Icon className="w-12 h-12" style={{ color: strainInfo.color }} />
          })()}
          {/* Strain badge */}
          <div
            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold border backdrop-blur-sm"
            style={{ backgroundColor: `${strainInfo.color}10`, color: strainInfo.color, borderColor: `${strainInfo.color}25` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: strainInfo.color }} />
            {strainInfo.label}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pt-3 flex-1 flex flex-col border-t border-white/[0.04]">
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <h3 className="font-semibold text-white text-[13px] leading-tight">{product.name}</h3>
          </div>

          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] text-gray-600 uppercase tracking-wider">{product.category}</span>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] text-gray-600">THC {product.thc}</span>
            <span className="text-[10px] text-gray-600">&bull; Min. {product.minOrder} units</span>
          </div>

          <p className="text-[11px] text-gray-500 leading-relaxed mb-3 line-clamp-2 flex-1">
            {product.description}
          </p>

          {/* Tier pricing */}
          <div className="grid grid-cols-3 gap-1 mb-3">
            {product.wholesale.map(tier => (
              <div
                key={tier.minQty}
                className="text-center py-1.5 rounded-lg border border-white/[0.06] bg-white/[0.02]"
              >
                <div className="text-[9px] text-gray-500 font-medium">{tier.label}</div>
                <div className="text-[11px] font-bold text-[#39FF14]">${tier.price}</div>
              </div>
            ))}
          </div>

          {/* Price row */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-[#39FF14] font-bold text-lg">${lowestTier.price}</span>
              <span className="text-[10px] text-gray-500 ml-1">/unit</span>
            </div>
            <span className="text-[10px] text-gray-600 line-through">${product.retail} retail</span>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border"
            style={{
              backgroundColor: added ? `${strainInfo.color}25` : `${strainInfo.color}08`,
              borderColor: added ? `${strainInfo.color}50` : `${strainInfo.color}20`,
              color: strainInfo.color,
            }}
          >
            {added ? (
              <><ShoppingCart className="w-3.5 h-3.5" /> Added {product.minOrder} units!</>
            ) : (
              <><Plus className="w-3.5 h-3.5" /> Add {product.minOrder} to Cart</>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
