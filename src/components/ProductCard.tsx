import { motion } from 'framer-motion'
import { Plus, Package } from 'lucide-react'
import type { Product } from '@/data/products'
import { STRAIN_INFO } from '@/data/products'

interface Props {
  product: Product
  index: number
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, index, onAddToCart }: Props) {
  const strain = STRAIN_INFO[product.strain]
  const lowestPrice = product.wholesale[product.wholesale.length - 1].price
  const savings = Math.round((1 - lowestPrice / product.retail) * 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="group"
    >
      <div className="shimmer glow-border relative rounded-2xl overflow-hidden bg-[#0e0e0e] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 h-full flex flex-col">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-[#39FF14] text-black">
              {product.badge}
            </span>
          )}
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-semibold border"
            style={{
              backgroundColor: `${strain.color}15`,
              color: strain.color,
              borderColor: `${strain.color}40`,
            }}
          >
            {strain.label}
          </span>
        </div>

        {/* Image area */}
        <div className="relative h-52 overflow-hidden bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center border"
            style={{ backgroundColor: `${strain.color}12`, borderColor: `${strain.color}25` }}
          >
            <Package className="w-9 h-9" style={{ color: strain.color }} />
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-white text-sm mb-1 leading-snug">{product.name}</h3>
          <span className="text-xs text-gray-500 mb-2">THC {product.thc} &bull; Min. {product.minOrder} units</span>
          <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2 flex-1">{product.description}</p>

          {/* Pricing */}
          <div className="mb-3 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500 line-through">Retail ${product.retail}</span>
              <span className="text-xs font-semibold text-[#39FF14]">Save up to {savings}%</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold text-white">
                ${product.wholesale[0].price}
              </span>
              <span className="text-xs text-gray-500">
                – ${lowestPrice}/unit
              </span>
            </div>
          </div>

          {/* Wholesale tiers */}
          <div className="grid grid-cols-3 gap-1 mb-3">
            {product.wholesale.map(tier => (
              <div key={tier.minQty} className="text-center py-1.5 rounded-lg bg-white/5 border border-white/5">
                <div className="text-[10px] text-gray-500">{tier.label}</div>
                <div className="text-xs font-bold text-white">${tier.price}</div>
              </div>
            ))}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] text-sm font-medium hover:bg-[#39FF14]/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add to Order
          </button>
        </div>
      </div>
    </motion.div>
  )
}
