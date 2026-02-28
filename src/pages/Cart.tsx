import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, ArrowLeft, AlertCircle, Truck, Package } from 'lucide-react'
import { useCart, getItemPrice } from '@/context/CartContext'
import { useMode } from '@/context/ModeContext'
import { TERPENE_PROFILES, WEIGHT_OPTIONS } from '@/data/products'
import { STRAIN_INFO, getWholesaleUnitPrice } from '@/data/wholesaleProducts'

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total, itemCount, getKey } = useCart()
  const { isDelivery } = useMode()

  const MIN_ORDER = 150
  const modeItems = items.filter(i => i.mode === (isDelivery ? 'delivery' : 'wholesale'))
  const modeTotal = modeItems.reduce((sum, i) => sum + getItemPrice(i) * i.quantity, 0)
  const modeItemCount = modeItems.reduce((sum, i) => sum + i.quantity, 0)

  const getWeightLabel = (weight?: string) => {
    if (!weight) return null
    return WEIGHT_OPTIONS.find(w => w.value === weight)
  }

  if (modeItems.length === 0) {
    return (
      <div className="min-h-screen pt-8 pb-16 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-6">
            {isDelivery ? 'Browse our menu to find something you\'ll love' : 'Browse our wholesale catalog to start building your order'}
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#39FF14] text-black font-bold rounded-xl hover:brightness-110 transition-all text-sm"
          >
            {isDelivery ? 'Browse Menu' : 'Shop Wholesale'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 grain">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/menu" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#39FF14] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            {isDelivery ? 'Back to Menu' : 'Back to Catalog'}
          </Link>

          <div className="flex items-center gap-3 mb-2">
            {isDelivery ? <Truck className="w-6 h-6 text-[#39FF14]" /> : <Package className="w-6 h-6 text-[#39FF14]" />}
            <h1 className="text-3xl font-bold">{isDelivery ? 'Your Cart' : 'Wholesale Order'}</h1>
          </div>
          <p className="text-gray-400 mb-8">
            {isDelivery
              ? `${modeItemCount} item${modeItemCount !== 1 ? 's' : ''}`
              : `${modeItemCount} unit${modeItemCount !== 1 ? 's' : ''} across ${modeItems.length} product${modeItems.length !== 1 ? 's' : ''}`}
          </p>
        </motion.div>

        {/* Items */}
        <div className="space-y-4 mb-8">
          {modeItems.map((item, i) => {
            const key = getKey(item)

            if (item.mode === 'delivery' && item.product) {
              const profileInfo = TERPENE_PROFILES[item.product.terpene_profile]
              const unitPrice = getItemPrice(item)
              const lineTotal = unitPrice * item.quantity
              const weightInfo = getWeightLabel(item.weight)

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-5 rounded-xl bg-[#0a0a0a] border border-white/[0.06]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="font-semibold text-sm">
                          {item.product.name}
                          {item.flavor && <span className="text-gray-400 font-normal"> — {item.flavor}</span>}
                        </h3>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full border"
                          style={{ color: profileInfo.color, borderColor: `${profileInfo.color}40`, backgroundColor: `${profileInfo.color}15` }}
                        >
                          {profileInfo.label}
                        </span>
                        {weightInfo && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#39FF14]/30 bg-[#39FF14]/10 text-[#39FF14] font-semibold">
                            {weightInfo.label}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        THC {item.product.thc} &bull; ${unitPrice.toFixed(2)} each
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[#39FF14] font-bold">${lineTotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(key, item.quantity - 1)}
                        className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all"
                      >
                        <Minus className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(key, item.quantity + 1)}
                        className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all"
                      >
                        <Plus className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(key)}
                      className="p-3 sm:p-2 text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )
            }

            if (item.mode === 'wholesale' && item.wholesaleProduct) {
              const wp = item.wholesaleProduct
              const strainInfo = STRAIN_INFO[wp.strain]
              const unitPrice = getWholesaleUnitPrice(wp, item.quantity)
              const lineTotal = unitPrice * item.quantity

              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-5 rounded-xl bg-[#0a0a0a] border border-white/[0.06]"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm">{wp.name}</h3>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full border"
                          style={{ color: strainInfo.color, borderColor: `${strainInfo.color}40`, backgroundColor: `${strainInfo.color}15` }}
                        >
                          {strainInfo.label}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">THC {wp.thc} &bull; Min. order: {wp.minOrder} units</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[#39FF14] font-bold">${lineTotal.toFixed(2)}</span>
                      <p className="text-xs text-gray-500">${unitPrice.toFixed(2)}/unit</p>
                    </div>
                  </div>

                  {/* Tier info */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {wp.wholesale.map(tier => {
                      const isActive = unitPrice === tier.price
                      return (
                        <div
                          key={tier.minQty}
                          className={`text-center py-1.5 rounded-lg border text-xs ${
                            isActive
                              ? 'border-[#39FF14]/40 bg-[#39FF14]/10 text-[#39FF14]'
                              : 'border-white/[0.05] bg-white/[0.02] text-gray-500'
                          }`}
                        >
                          <div className="font-medium">{tier.label}</div>
                          <div className="font-bold">${tier.price}</div>
                        </div>
                      )
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(key, item.quantity - wp.minOrder)}
                        className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all"
                      >
                        <Minus className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={e => {
                          const val = parseInt(e.target.value)
                          if (!isNaN(val) && val >= 0) updateQuantity(key, val)
                        }}
                        className="w-20 text-center text-sm font-medium bg-white/[0.04] border border-white/[0.08] rounded-lg py-1.5 text-white focus:outline-none focus:border-[#39FF14]/50"
                      />
                      <button
                        onClick={() => updateQuantity(key, item.quantity + wp.minOrder)}
                        className="w-10 h-10 sm:w-8 sm:h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all"
                      >
                        <Plus className="w-3.5 h-3.5 sm:w-3 sm:h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(key)}
                      className="p-3 sm:p-2 text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )
            }

            return null
          })}
        </div>

        {/* Summary */}
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/[0.06]">
          {modeTotal < MIN_ORDER && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/[0.08] border border-yellow-500/20 mb-4">
              <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0" />
              <p className="text-xs text-yellow-500">
                Minimum order is ${MIN_ORDER}. Add ${(MIN_ORDER - modeTotal).toFixed(2)} more to proceed.
              </p>
            </div>
          )}

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Subtotal ({modeItemCount} {isDelivery ? 'items' : 'units'})</span>
              <span className="font-semibold">${modeTotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">{isDelivery ? 'Delivery' : 'Shipping'}</span>
              {isDelivery ? (
                <span className="text-sm font-medium text-[#39FF14]">FREE</span>
              ) : (
                <span className={`text-sm font-medium ${modeTotal >= 500 ? 'text-[#39FF14]' : 'text-gray-400'}`}>
                  {modeTotal >= 500 ? 'FREE' : 'Calculated at checkout'}
                </span>
              )}
            </div>
            {!isDelivery && modeTotal < 500 && modeTotal >= MIN_ORDER && (
              <p className="text-xs text-gray-500">
                Add ${(500 - modeTotal).toFixed(2)} more for free shipping
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
            <span className="font-bold text-lg">{isDelivery ? 'Total' : 'Estimated Total'}</span>
            <span className="font-bold text-lg text-[#39FF14]">${modeTotal.toFixed(2)}</span>
          </div>

          <Link
            to={modeTotal >= MIN_ORDER ? '/checkout' : '#'}
            onClick={e => { if (modeTotal < MIN_ORDER) e.preventDefault() }}
            className={`block w-full mt-6 py-3.5 font-bold rounded-xl transition-all text-sm text-center ${
              modeTotal >= MIN_ORDER
                ? 'bg-[#39FF14] text-black hover:brightness-110 hover:shadow-[0_0_30px_rgba(57,255,20,0.2)]'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            {modeTotal >= MIN_ORDER ? 'Proceed to Checkout' : `$${(MIN_ORDER - modeTotal).toFixed(2)} more to reach minimum`}
          </Link>
          <p className="text-xs text-gray-600 text-center mt-3">
            {isDelivery
              ? 'Must be 21+ with valid ID at delivery \u2022 Santa Barbara to Greater LA'
              : 'Wholesale orders only \u2022 Must be 21+ to purchase'}
          </p>
        </div>
      </div>
    </div>
  )
}
