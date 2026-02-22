import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, ArrowLeft } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { TERPENE_PROFILES } from '@/data/products'

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total, itemCount } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-400 mb-6">Browse our menu to add products</p>
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
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/menu" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#39FF14] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Menu
          </Link>

          <h1 className="text-3xl font-bold mb-2">Your Cart</h1>
          <p className="text-gray-400 mb-8">{itemCount} item{itemCount !== 1 ? 's' : ''}</p>
        </motion.div>

        {/* Items */}
        <div className="space-y-4 mb-8">
          {items.map((item, i) => {
            const profile = TERPENE_PROFILES[item.product.terpene_profile]
            return (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{item.product.name}</h3>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full border"
                        style={{ color: profile.color, borderColor: profile.color, backgroundColor: `${profile.color}15` }}
                      >
                        {profile.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{item.product.category} &bull; THC {item.product.thc}</p>
                  </div>
                  <span className="text-[#39FF14] font-bold">${item.product.price * item.quantity}</span>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
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
        <div className="p-6 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Subtotal</span>
            <span className="font-semibold">${total}</span>
          </div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-400">Delivery</span>
            <span className="text-[#39FF14] text-sm font-medium">Free</span>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <span className="font-bold text-lg">Total</span>
            <span className="font-bold text-lg text-[#39FF14]">${total}</span>
          </div>

          <button className="w-full mt-6 py-3.5 bg-[#39FF14] text-black font-bold rounded-xl hover:brightness-110 transition-all text-sm">
            Secure Checkout
          </button>
          <p className="text-xs text-gray-500 text-center mt-3">Secure checkout &bull; Fast delivery</p>
        </div>
      </div>
    </div>
  )
}
