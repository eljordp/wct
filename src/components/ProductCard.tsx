import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, ShoppingCart } from 'lucide-react'
import type { Product, WeightOption } from '@/data/products'
import { TERPENE_PROFILES, WEIGHT_OPTIONS } from '@/data/products'

interface Props {
  product: Product
  index: number
  onAddToCart: (product: Product, quantity?: number, weight?: WeightOption, flavor?: string) => void
}

const PROFILE_ICONS: Record<string, string> = {
  relaxed: '🍇',
  euphoric: '☀️',
  creative: '🎨',
  heavy: '🌿',
}

export default function ProductCard({ product, index, onAddToCart }: Props) {
  const hasWeights = !!product.weights
  const hasFlavors = !!product.flavors?.length
  const [selectedFlavor, setSelectedFlavor] = useState(0)
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>('eighth')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  // If product has flavors, use the selected flavor's data
  const activeFlavor = hasFlavors ? product.flavors![selectedFlavor] : null
  const activeProfile = activeFlavor
    ? TERPENE_PROFILES[activeFlavor.terpene_profile]
    : TERPENE_PROFILES[product.terpene_profile]
  const activeThc = activeFlavor ? activeFlavor.thc : product.thc
  const activeDescription = activeFlavor ? activeFlavor.description : product.description
  const activeEmoji = activeFlavor ? activeFlavor.emoji : PROFILE_ICONS[product.terpene_profile]
  const activeFlavorName = activeFlavor ? activeFlavor.name : undefined

  const displayPrice = hasWeights ? product.weights![selectedWeight] : product.price
  const totalPrice = displayPrice * qty

  const handleAdd = () => {
    onAddToCart(product, qty, hasWeights ? selectedWeight : undefined, activeFlavorName)
    setAdded(true)
    setQty(1)
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
        <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, transparent, ${activeProfile.color}60, transparent)` }} />

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
            style={{ background: `radial-gradient(circle at 50% 80%, ${activeProfile.color}, transparent 70%)` }}
          />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeEmoji}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-5xl"
            >
              {activeEmoji}
            </motion.div>
          </AnimatePresence>
          {/* Terpene badge */}
          <div
            className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-semibold border backdrop-blur-sm transition-colors duration-300"
            style={{ backgroundColor: `${activeProfile.color}10`, color: activeProfile.color, borderColor: `${activeProfile.color}25` }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: activeProfile.color }} />
            {activeProfile.label}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 pt-3 flex-1 flex flex-col border-t border-white/[0.04]">
          {/* Brand name */}
          <div className="flex items-start justify-between gap-2 mb-0.5">
            <h3 className="font-semibold text-white text-[13px] leading-tight">{product.name}</h3>
            {product.brand && (
              <span className="text-[9px] text-gray-600 uppercase tracking-wider shrink-0 mt-0.5">{product.brand}</span>
            )}
          </div>

          {/* Flavor name or category */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFlavorName || 'default'}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
            >
              {activeFlavorName ? (
                <p className="text-xs font-medium mb-1" style={{ color: activeProfile.color }}>{activeFlavorName}</p>
              ) : (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] text-gray-600 uppercase tracking-wider">{product.category}</span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] text-gray-600">THC {activeThc}</span>
          </div>

          {/* Description */}
          <AnimatePresence mode="wait">
            <motion.p
              key={activeDescription}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="text-[11px] text-gray-500 leading-relaxed mb-3 line-clamp-2 flex-1"
            >
              {activeDescription}
            </motion.p>
          </AnimatePresence>

          {/* Flavor selector */}
          {hasFlavors && (
            <div className="grid grid-cols-4 gap-1 mb-3">
              {product.flavors!.map((f, i) => (
                <button
                  key={f.name}
                  onClick={() => setSelectedFlavor(i)}
                  className="py-1.5 rounded-lg text-center transition-all border"
                  title={f.name}
                  style={{
                    borderColor: selectedFlavor === i ? `${TERPENE_PROFILES[f.terpene_profile].color}50` : 'rgba(255,255,255,0.06)',
                    backgroundColor: selectedFlavor === i ? `${TERPENE_PROFILES[f.terpene_profile].color}12` : 'rgba(255,255,255,0.02)',
                  }}
                >
                  <div className="text-base leading-none">{f.emoji}</div>
                </button>
              ))}
            </div>
          )}

          {/* Weight selector for flower */}
          {hasWeights && (
            <div className="grid grid-cols-4 gap-1 mb-3">
              {WEIGHT_OPTIONS.map(w => (
                <button
                  key={w.value}
                  onClick={() => setSelectedWeight(w.value)}
                  className="py-1.5 px-1 rounded-lg text-center transition-all border"
                  style={{
                    borderColor: selectedWeight === w.value ? `${activeProfile.color}50` : 'rgba(255,255,255,0.06)',
                    backgroundColor: selectedWeight === w.value ? `${activeProfile.color}12` : 'rgba(255,255,255,0.02)',
                    color: selectedWeight === w.value ? activeProfile.color : '#6b7280',
                  }}
                >
                  <div className="text-[10px] font-semibold leading-tight">{w.label}</div>
                  <div className="text-[9px] opacity-70">${product.weights![w.value]}</div>
                </button>
              ))}
            </div>
          )}

          {/* Price + quantity row */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#39FF14] font-bold text-lg">${totalPrice}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-6 text-center text-sm font-medium">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 border"
            style={{
              backgroundColor: added ? `${activeProfile.color}25` : `${activeProfile.color}08`,
              borderColor: added ? `${activeProfile.color}50` : `${activeProfile.color}20`,
              color: activeProfile.color,
            }}
          >
            {added ? (
              <><ShoppingCart className="w-3.5 h-3.5" /> Added!</>
            ) : (
              <><Plus className="w-3.5 h-3.5" /> Add to Cart</>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
