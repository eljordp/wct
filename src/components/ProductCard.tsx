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
      transition={{ delay: index * 0.04 }}
      className="group"
    >
      <div className="shimmer glow-border relative rounded-2xl overflow-hidden bg-[#0e0e0e] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-300 h-full flex flex-col">
        <div className="absolute top-3 left-3 z-10 flex gap-2">
          {product.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-[#39FF14] text-black">
              {product.badge}
            </span>
          )}
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-semibold border"
            style={{ backgroundColor: `${profile.color}15`, color: profile.color, borderColor: `${profile.color}40` }}
          >
            {profile.label}
          </span>
        </div>

        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-white/[0.04] to-transparent flex items-center justify-center">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center border"
            style={{ backgroundColor: `${profile.color}12`, borderColor: `${profile.color}25` }}
          >
            <Beaker className="w-7 h-7" style={{ color: profile.color }} />
          </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-start justify-between mb-1">
            <h3 className="font-semibold text-white text-sm">{product.name}</h3>
            <span className="text-[#39FF14] font-bold text-sm">${product.price}</span>
          </div>
          <span className="text-[10px] text-gray-500 mb-2 block uppercase tracking-wider">
            {product.category} &bull; THC {product.thc}
          </span>
          <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-1">{product.description}</p>
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
