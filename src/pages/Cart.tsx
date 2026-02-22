import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, ArrowLeft, Package, AlertCircle } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { STRAIN_INFO } from '@/data/products'

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, total, itemCount, getUnitPrice } = useCart()

  const MIN_ORDER_TOTAL = 150

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-8 pb-16 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your wholesale cart is empty</h2>
          <p className="text-gray-400 mb-6">Browse our catalog to start building your order</p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#39FF14] text-black font-bold rounded-xl hover:brightness-110 transition-all text-sm"
          >
            Shop Wholesale
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-8 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#39FF14] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Catalog
          </Link>

          <div className="flex items-center gap-3 mb-2">
            <Package className="w-6 h-6 text-[#39FF14]" />
            <h1 className="text-3xl font-bold">Wholesale Order</h1>
          </div>
          <p className="text-gray-400 mb-8">{itemCount} unit{itemCount !== 1 ? 's' : ''} across {items.length} product{items.length !== 1 ? 's' : ''}</p>
        </motion.div>

        {/* Items */}
        <div className="space-y-4 mb-8">
          {items.map((item, i) => {
            const strainInfo = STRAIN_INFO[item.product.strain]
            const unitPrice = getUnitPrice(item.product, item.quantity)
            const lineTotal = unitPrice * item.quantity

            return (
              <motion.div
                key={item.product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-xl bg-[#141414] border border-white/8"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{item.product.name}</h3>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full border"
                        style={{ color: strainInfo.color, borderColor: strainInfo.color, backgroundColor: `${strainInfo.color}15` }}
                      >
                        {strainInfo.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">THC {item.product.thc} &bull; Min. order: {item.product.minOrder} units</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[#39FF14] font-bold">${lineTotal.toFixed(2)}</span>
                    <p className="text-xs text-gray-500">${unitPrice.toFixed(2)}/unit</p>
                  </div>
                </div>

                {/* Tier info */}
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {item.product.wholesale.map(tier => {
                    const isActive = unitPrice === tier.price
                    return (
                      <div
                        key={tier.minQty}
                        className={`text-center py-1.5 rounded-lg border text-xs ${
                          isActive
                            ? 'border-[#39FF14]/40 bg-[#39FF14]/10 text-[#39FF14]'
                            : 'border-white/5 bg-white/3 text-gray-500'
                        }`}
                      >
                        <div className="font-medium">{tier.label}</div>
                        <div className="font-bold">${tier.price}</div>
                      </div>
                    )
                  })}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/8">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - item.product.minOrder)}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={e => {
                        const val = parseInt(e.target.value)
                        if (!isNaN(val) && val >= 0) updateQuantity(item.product.id, val)
                      }}
                      className="w-20 text-center text-sm font-medium bg-white/5 border border-white/8 rounded-lg py-1.5 text-white focus:outline-none focus:border-[#39FF14]/50"
                    />
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + item.product.minOrder)}
                      className="w-8 h-8 rounded-lg bg-white/5 border border-white/8 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all"
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
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-white/8">
          {total < MIN_ORDER_TOTAL && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 mb-4">
              <AlertCircle className="w-4 h-4 text-yellow-500 shrink-0" />
              <p className="text-xs text-yellow-500">
                Minimum order is ${MIN_ORDER_TOTAL}. Add ${(MIN_ORDER_TOTAL - total).toFixed(2)} more to proceed.
              </p>
            </div>
          )}

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Subtotal ({itemCount} units)</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Shipping</span>
              <span className={`text-sm font-medium ${total >= 500 ? 'text-[#39FF14]' : 'text-gray-400'}`}>
                {total >= 500 ? 'FREE' : 'Calculated at checkout'}
              </span>
            </div>
            {total < 500 && total >= MIN_ORDER_TOTAL && (
              <p className="text-xs text-gray-500">
                Add ${(500 - total).toFixed(2)} more for free shipping
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/8">
            <span className="font-bold text-lg">Estimated Total</span>
            <span className="font-bold text-lg text-[#39FF14]">${total.toFixed(2)}</span>
          </div>

          <button
            disabled={total < MIN_ORDER_TOTAL}
            className={`w-full mt-6 py-3.5 font-bold rounded-xl transition-all text-sm ${
              total >= MIN_ORDER_TOTAL
                ? 'bg-[#39FF14] text-black hover:brightness-110'
                : 'bg-gray-700 text-gray-400 cursor-not-allowed'
            }`}
          >
            Request Quote / Checkout
          </button>
          <p className="text-xs text-gray-500 text-center mt-3">Wholesale orders only &bull; Net 30 available for approved accounts</p>
        </div>
      </div>
    </div>
  )
}
