import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { TERPENE_PROFILES } from '@/data/products'

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total, itemCount } = useCart()

  const MIN_ORDER = 150

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-8 pb-16 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-6">Browse our menu to find something you'll love</p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#39FF14] text-black font-bold rounded-xl hover:brightness-110 transition-all text-sm"
          >
            Browse Menu
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
            Back to Menu
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <ShoppingCart className="w-6 h-6 text-[#39FF14]" />
            <h1 className="text-3xl font-bold">Your Cart</h1>
          </div>
          <p className="text-gray-400 mb-8">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
        </motion.div>

        {/* Items */}
        <div className="space-y-4 mb-8">
          {items.map((item, i) => {
            const profileInfo = TERPENE_PROFILES[item.product.terpene_profile]
            const lineTotal = item.product.price * item.quantity

            return (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-xl bg-[#0a0a0a] border border-white/[0.06]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{item.product.name}</h3>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full border"
                        style={{ color: profileInfo.color, borderColor: `${profileInfo.color}40`, backgroundColor: `${profileInfo.color}15` }}
                      >
                        {profileInfo.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      THC {item.product.thc} &bull; ${item.product.price.toFixed(2)} each
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[#39FF14] font-bold">${lineTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Summary */}
        <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/[0.06]">
          {total < MIN_ORDER && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/[0.08] border border-yellow-500/20 mb-4">
              <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0" />
              <p className="text-xs text-yellow-500">
                Minimum order is ${MIN_ORDER}. Add ${(MIN_ORDER - total).toFixed(2)} more to proceed.
              </p>
            </div>
          )}

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Subtotal ({itemCount} items)</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Delivery</span>
              <span className="text-sm font-medium text-[#39FF14]">FREE</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-lg text-[#39FF14]">${total.toFixed(2)}</span>
          </div>

          <button
            disabled={total < MIN_ORDER}
            className={`w-full mt-6 py-3.5 font-bold rounded-xl transition-all text-sm ${
              total >= MIN_ORDER
                ? 'bg-[#39FF14] text-black hover:brightness-110 hover:shadow-[0_0_30px_rgba(57,255,20,0.2)]'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            {total >= MIN_ORDER ? 'Proceed to Checkout' : `$${(MIN_ORDER - total).toFixed(2)} more to reach minimum`}
          </button>
          <p className="text-xs text-gray-600 text-center mt-3">
            Must be 21+ with valid ID at delivery &bull; Santa Barbara to La Jolla
          </p>
        </div>
      </div>
    </div>
  )
}
