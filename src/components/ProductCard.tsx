import { motion } from 'framer-motion'
import { Plus, Beaker } from 'lucide-react'
import type { Product } from '@/data/products'
import { TERPENE_PROFILES } from '@/data/products'

interface Props {
  product: Product
  index: number
  onAddToCart: (product: Product) => void
}

export default function ProductCard({ product, index, onAddToCart }: Props) {
  const profile = TERPENE_PROFILES[product.terpene_profile]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group"
    >
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#111111] to-[#0a0a0a] border border-white/10 hover:border-white/20 transition-all duration-300">
        {/* Image area */}
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${profile.color}20`, borderColor: `${profile.color}40`, borderWidth: 1 }}>
            <Beaker className="w-8 h-8" style={{ color: profile.color }} />
          </div>
          {/* Badge */}
          <div
            className="absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium border"
            style={{
              backgroundColor: `${profile.color}20`,
              color: profile.color,
              borderColor: profile.color,
            }}
          >
            {profile.label}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-white text-sm">{product.name}</h3>
            <span className="text-[#39FF14] font-bold text-sm">${product.price}</span>
          </div>

          <span className="text-xs text-gray-500 mb-2 block">{product.category} &bull; THC {product.thc}</span>

          <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
            {product.description}
          </p>

          <button
            onClick={() => onAddToCart(product)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#39FF14]/10 border border-[#39FF14]/30 text-[#39FF14] text-sm font-medium hover:bg-[#39FF14]/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  )
}
