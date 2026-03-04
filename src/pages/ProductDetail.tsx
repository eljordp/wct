import { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Plus, Minus, ShoppingCart, Moon, Sun, Palette, Leaf, Package } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { TERPENE_PROFILES, WEIGHT_OPTIONS, type WeightOption } from '@/data/products'
import { STRAIN_INFO } from '@/data/wholesaleProducts'
import { useCart, getQuantityPrice } from '@/context/CartContext'
import { useMode } from '@/context/ModeContext'
import { getDeliveryProducts, getWholesaleProducts } from '@/lib/adminStore'
import { getWholesaleUnitPrice } from '@/data/wholesaleProducts'

const PROFILE_ICONS: Record<string, LucideIcon> = {
  relaxed: Moon,
  euphoric: Sun,
  creative: Palette,
  heavy: Leaf,
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { addToCart, addWholesaleToCart } = useCart()
  const { isDelivery } = useMode()

  const deliveryProducts = getDeliveryProducts()
  const wholesaleProducts = getWholesaleProducts()

  const product = deliveryProducts.find(p => p.id === id)
  const wholesaleProduct = wholesaleProducts.find(p => p.id === `w-${id}` || p.id === id)

  if (!product && !wholesaleProduct) {
    return <Navigate to="/menu" replace />
  }

  // Use delivery product as primary, fall back to wholesale
  const name = product?.name ?? wholesaleProduct?.name ?? ''
  const thc = product?.thc ?? wholesaleProduct?.thc ?? ''
  const description = product?.description ?? wholesaleProduct?.description ?? ''
  const imageUrl = product?.image_url ?? wholesaleProduct?.image_url
  const badge = product?.badge ?? wholesaleProduct?.badge
  const brand = product?.brand ?? wholesaleProduct?.brand
  const category = product?.category ?? wholesaleProduct?.category ?? 'flower'

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 grain">
      <div className="max-w-5xl mx-auto">
        {/* Back button */}
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#39FF14] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Menu
        </Link>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/[0.06] aspect-square">
              {badge && (
                <span className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wide bg-[#39FF14] text-black">
                  {badge}
                </span>
              )}
              {imageUrl ? (
                <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Leaf className="w-24 h-24 text-gray-800" />
                </div>
              )}
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[10px] text-gray-600 uppercase tracking-wider">{category}</span>
              {brand && (
                <span className="text-[10px] text-gray-600 uppercase tracking-wider">{brand}</span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">{name}</h1>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-gray-400">THC {thc}</span>
            </div>

            {/* Terpene / Strain info */}
            {product && (
              <div className="flex items-center gap-2 mb-4">
                {(() => {
                  const profile = TERPENE_PROFILES[product.terpene_profile]
                  const Icon = PROFILE_ICONS[product.terpene_profile]
                  return (
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border"
                      style={{ backgroundColor: `${profile.color}10`, color: profile.color, borderColor: `${profile.color}25` }}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      {profile.label}
                    </div>
                  )
                })()}
              </div>
            )}
            {!product && wholesaleProduct && (
              <div className="flex items-center gap-2 mb-4">
                {(() => {
                  const strainInfo = STRAIN_INFO[wholesaleProduct.strain]
                  return (
                    <div
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border"
                      style={{ backgroundColor: `${strainInfo.color}10`, color: strainInfo.color, borderColor: `${strainInfo.color}25` }}
                    >
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: strainInfo.color }} />
                      {strainInfo.label}
                    </div>
                  )
                })()}
              </div>
            )}

            <p className="text-sm text-gray-400 leading-relaxed mb-8">{description}</p>

            {/* Delivery or wholesale pricing */}
            {isDelivery && product ? (
              <DeliveryControls product={product} onAddToCart={addToCart} />
            ) : wholesaleProduct ? (
              <WholesaleControls product={wholesaleProduct} onAddToCart={addWholesaleToCart} />
            ) : product ? (
              <DeliveryControls product={product} onAddToCart={addToCart} />
            ) : null}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// ── Delivery Controls ──

import type { Product } from '@/data/products'

function DeliveryControls({ product, onAddToCart }: {
  product: Product
  onAddToCart: (product: Product, quantity?: number, weight?: WeightOption, flavor?: string) => void
}) {
  const hasWeights = !!product.weights
  const hasQtyPricing = !!product.quantityPricing?.length
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>('eighth')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const activeProfile = TERPENE_PROFILES[product.terpene_profile]

  const unitPrice = hasQtyPricing
    ? getQuantityPrice(product.quantityPricing!, qty)
    : hasWeights ? product.weights![selectedWeight] : product.price
  const totalPrice = unitPrice * qty

  const handleAdd = () => {
    onAddToCart(product, qty, hasWeights ? selectedWeight : undefined)
    setAdded(true)
    setQty(1)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div className="mt-auto">
      {/* Weight selector */}
      {hasWeights && (
        <div className="mb-6">
          <span className="text-xs text-gray-500 uppercase tracking-wider mb-3 block">Select Size</span>
          <div className="grid grid-cols-4 gap-2">
            {WEIGHT_OPTIONS.map(w => (
              <button
                key={w.value}
                onClick={() => setSelectedWeight(w.value)}
                className="py-3 px-2 rounded-xl text-center transition-all border"
                style={{
                  borderColor: selectedWeight === w.value ? `${activeProfile.color}50` : 'rgba(255,255,255,0.06)',
                  backgroundColor: selectedWeight === w.value ? `${activeProfile.color}12` : 'rgba(255,255,255,0.02)',
                  color: selectedWeight === w.value ? activeProfile.color : '#6b7280',
                }}
              >
                <div className="text-sm font-semibold">{w.label}</div>
                <div className="text-xs opacity-70 mt-0.5">${product.weights![w.value]}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity tier pricing */}
      {hasQtyPricing && (
        <div className="mb-6">
          <span className="text-xs text-gray-500 uppercase tracking-wider mb-3 block">Quantity Pricing</span>
          <div className="grid grid-cols-3 gap-2 mb-3">
            {product.quantityPricing!.map(tier => {
              const isActive = qty >= tier.minQty &&
                !product.quantityPricing!.some(t => t.minQty > tier.minQty && qty >= t.minQty)
              return (
                <button
                  key={tier.minQty}
                  onClick={() => setQty(tier.minQty)}
                  className="py-3 px-2 rounded-xl text-center transition-all border"
                  style={{
                    borderColor: isActive ? `${activeProfile.color}50` : 'rgba(255,255,255,0.06)',
                    backgroundColor: isActive ? `${activeProfile.color}12` : 'rgba(255,255,255,0.02)',
                    color: isActive ? activeProfile.color : '#6b7280',
                  }}
                >
                  <div className="text-sm font-semibold">{tier.label}</div>
                  <div className="text-xs opacity-70 mt-0.5">${tier.price}/ea</div>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Qty controls */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs text-gray-500 uppercase tracking-wider">Qty</span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all"
          >
            <Minus className="w-4 h-4" />
          </button>
          {hasQtyPricing ? (
            <input
              type="number"
              min={1}
              value={qty}
              onChange={e => {
                const v = parseInt(e.target.value)
                if (!isNaN(v) && v >= 1) setQty(v)
              }}
              className="w-16 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] text-center text-sm font-medium text-white appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
          ) : (
            <span className="w-10 text-center text-sm font-medium">{qty}</span>
          )}
          <button
            onClick={() => {
              const max = product.maxQuantity
              if (!max || qty < max) setQty(qty + 1)
            }}
            disabled={!!product.maxQuantity && qty >= product.maxQuantity}
            className={`w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center transition-all ${
              product.maxQuantity && qty >= product.maxQuantity
                ? 'text-gray-700 cursor-not-allowed'
                : 'text-gray-400 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Price + Add to cart */}
      <div className="flex items-center gap-4 mb-4">
        <span className="text-[#39FF14] font-black text-3xl">${totalPrice}</span>
        {hasQtyPricing && (
          <span className="text-sm text-gray-500">${unitPrice}/ea</span>
        )}
      </div>

      <button
        onClick={handleAdd}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base font-bold transition-all duration-300 border"
        style={{
          backgroundColor: added ? `${activeProfile.color}25` : `${activeProfile.color}12`,
          borderColor: added ? `${activeProfile.color}50` : `${activeProfile.color}30`,
          color: activeProfile.color,
        }}
      >
        {added ? (
          <><ShoppingCart className="w-4 h-4" /> Added to Cart!</>
        ) : (
          <><Plus className="w-4 h-4" /> Add to Cart</>
        )}
      </button>
    </div>
  )
}

// ── Wholesale Controls ──

import type { WholesaleProduct } from '@/data/wholesaleProducts'

function WholesaleControls({ product, onAddToCart }: {
  product: WholesaleProduct
  onAddToCart: (product: WholesaleProduct) => void
}) {
  const [added, setAdded] = useState(false)
  const strainInfo = STRAIN_INFO[product.strain]
  const lowestTier = product.wholesale[0]

  const handleAdd = () => {
    onAddToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1200)
  }

  return (
    <div className="mt-auto">
      {/* Tier pricing */}
      <div className="mb-6">
        <span className="text-xs text-gray-500 uppercase tracking-wider mb-3 block">Wholesale Tiers</span>
        <div className="grid grid-cols-3 gap-2">
          {product.wholesale.map(tier => (
            <div
              key={tier.minQty}
              className="text-center py-3 px-2 rounded-xl border border-white/[0.06] bg-white/[0.02]"
            >
              <div className="text-xs text-gray-500 font-medium">{tier.label}</div>
              <div className="text-lg font-bold text-[#39FF14] mt-0.5">${tier.price}</div>
              <div className="text-[10px] text-gray-600">per unit</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <span className="text-sm text-gray-500">Min order: {product.minOrder} units</span>
      </div>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-[#39FF14] font-black text-3xl">${lowestTier.price}</span>
        <span className="text-sm text-gray-500">/unit starting</span>
      </div>

      <button
        onClick={handleAdd}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-base font-bold transition-all duration-300 border"
        style={{
          backgroundColor: added ? `${strainInfo.color}25` : `${strainInfo.color}12`,
          borderColor: added ? `${strainInfo.color}50` : `${strainInfo.color}30`,
          color: strainInfo.color,
        }}
      >
        {added ? (
          <><ShoppingCart className="w-4 h-4" /> Added {product.minOrder} units!</>
        ) : (
          <><Package className="w-4 h-4" /> Add {product.minOrder} to Cart</>
        )}
      </button>
    </div>
  )
}
