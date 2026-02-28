import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle, Copy, ArrowRight, Truck, Package } from 'lucide-react'
import { useState } from 'react'

export default function Confirmation() {
  const location = useLocation()
  const order = location.state as any
  const [copied, setCopied] = useState('')

  const copyText = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  if (!order) {
    return (
      <div className="min-h-screen pt-8 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">No order found</p>
          <Link to="/menu" className="text-[#39FF14] hover:underline text-sm">Browse Menu</Link>
        </div>
      </div>
    )
  }

  const isDelivery = order.mode === 'delivery'

  const paymentInstructions: Record<string, { title: string; detail: string; copyable?: string }> = {
    cashapp: { title: 'CashApp', detail: 'Send payment to:', copyable: '$YourCashTag' },
    venmo: { title: 'Venmo', detail: 'Send payment to:', copyable: '@YourVenmo' },
    cash: { title: 'Cash on Delivery', detail: 'Have exact cash ready at time of delivery. Our driver will collect payment.' },
    wire: { title: 'Wire / Zelle', detail: 'Wire transfer details will be sent to your email shortly.' },
  }

  const payment = paymentInstructions[order.payment] || paymentInstructions.cashapp

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 grain">
      <div className="max-w-2xl mx-auto">
        {/* Success header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 pt-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#39FF14]/[0.1] border border-[#39FF14]/20 mb-6">
            <CheckCircle className="w-10 h-10 text-[#39FF14]" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Placed!</h1>
          <p className="text-gray-400 text-sm">Order #{order.id}</p>
          <div className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06]">
            {isDelivery ? <Truck className="w-3.5 h-3.5 text-[#39FF14]" /> : <Package className="w-3.5 h-3.5 text-[#39FF14]" />}
            <span className="text-xs text-gray-400">{isDelivery ? 'Delivery Order' : 'Wholesale Order'}</span>
          </div>
        </motion.div>

        {/* Payment Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-2xl bg-gradient-to-br from-[#39FF14]/[0.06] to-[#0a0a0a] border border-[#39FF14]/15 mb-6"
        >
          <h2 className="font-bold text-lg mb-1">Pay via {payment.title}</h2>
          <p className="text-sm text-gray-400 mb-4">{payment.detail}</p>

          {payment.copyable && (
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 px-4 py-3 rounded-lg bg-black/40 border border-white/[0.08] text-white font-mono text-sm">
                {payment.copyable}
              </div>
              <button
                onClick={() => copyText(payment.copyable!, 'handle')}
                className="px-4 py-3 rounded-lg bg-white/[0.05] border border-white/[0.08] text-gray-400 hover:text-[#39FF14] transition-colors"
              >
                {copied === 'handle' ? <CheckCircle className="w-4 h-4 text-[#39FF14]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          )}

          <div className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-[#39FF14]/20">
            <span className="text-sm text-gray-300">Amount Due</span>
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-[#39FF14]">${order.total.toFixed(2)}</span>
              <button
                onClick={() => copyText(`$${order.total.toFixed(2)}`, 'amount')}
                className="p-2 rounded-lg bg-white/[0.05] text-gray-400 hover:text-[#39FF14] transition-colors"
              >
                {copied === 'amount' ? <CheckCircle className="w-3.5 h-3.5 text-[#39FF14]" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Order Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/[0.06] mb-6"
        >
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-3 mb-4">
            {order.items?.map((item: any, i: number) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-400">{item.name} — {item.detail}</span>
                <span className="text-white font-medium">${item.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-white/[0.06] flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold text-[#39FF14]">${order.total.toFixed(2)}</span>
          </div>
        </motion.div>

        {/* Customer Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/[0.06] mb-8"
        >
          <h3 className="font-semibold mb-3">{isDelivery ? 'Delivery' : 'Shipping'} Details</h3>
          <div className="text-sm text-gray-400 space-y-1">
            <p>{order.customer?.name}</p>
            <p>{order.customer?.phone}</p>
            <p>{order.customer?.email}</p>
            <p className="pt-2">{order.address?.street}</p>
            <p>{order.address?.city}, {order.address?.state} {order.address?.zip}</p>
            {isDelivery && order.deliveryWindow && (
              <p className="pt-2 text-[#39FF14]">Delivery: {order.deliveryWindow === 'sameday' ? 'Same day' : order.deliveryWindow === 'nextday' ? 'Next day' : 'Flexible'}</p>
            )}
          </div>
        </motion.div>

        {/* Back button */}
        <div className="text-center">
          <Link
            to="/menu"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#39FF14] text-black font-bold rounded-xl hover:brightness-110 transition-all text-sm"
          >
            Continue Shopping
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
