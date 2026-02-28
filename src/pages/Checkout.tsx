import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Send, Truck, Package, MapPin } from 'lucide-react'
import { useCart, getItemPrice } from '@/context/CartContext'
import { useMode } from '@/context/ModeContext'
import { getWholesaleUnitPrice } from '@/data/wholesaleProducts'

export default function Checkout() {
  const { items, total, clearCart } = useCart()
  const { isDelivery, isWholesale } = useMode()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: isDelivery ? 'CA' : '',
    zip: '',
    company: '',
    notes: '',
    payment: 'cashapp' as 'cashapp' | 'venmo' | 'cash' | 'wire',
    deliveryWindow: 'flexible' as 'sameday' | 'nextday' | 'flexible',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-8 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Your cart is empty</p>
          <Link to="/menu" className="text-[#39FF14] hover:underline text-sm">Browse Menu</Link>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)

    try {
      const orderId = `WCT-${Date.now()}`

      // Build order summary for email
      const orderItems = items.map(item => {
        if (item.mode === 'wholesale' && item.wholesaleProduct) {
          const unitPrice = getWholesaleUnitPrice(item.wholesaleProduct, item.quantity)
          return {
            name: item.wholesaleProduct.name,
            detail: `${item.quantity} units @ $${unitPrice.toFixed(2)}`,
            total: unitPrice * item.quantity,
          }
        }
        const price = getItemPrice(item)
        return {
          name: item.product?.name ?? 'Unknown',
          detail: item.weight ? `${item.weight} x${item.quantity}` : `x${item.quantity}`,
          total: price * item.quantity,
        }
      })

      // Save order to localStorage
      const order = {
        id: orderId,
        date: new Date().toISOString(),
        mode: isDelivery ? 'delivery' : 'wholesale',
        customer: { name: form.name, email: form.email, phone: form.phone },
        address: { street: form.street, city: form.city, state: form.state, zip: form.zip },
        company: form.company,
        payment: form.payment,
        deliveryWindow: form.deliveryWindow,
        notes: form.notes,
        items: orderItems,
        total,
      }

      const existing = JSON.parse(localStorage.getItem('wct-orders') || '[]')
      existing.unshift(order)
      localStorage.setItem('wct-orders', JSON.stringify(existing))

      // Try to send email via EmailJS if configured
      try {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

        if (serviceId && templateId && publicKey) {
          const { default: emailjs } = await import('@emailjs/browser')
          await emailjs.send(serviceId, templateId, {
            order_number: orderId,
            customer_name: form.name,
            customer_email: form.email,
            customer_phone: form.phone,
            mode: isDelivery ? 'Delivery' : 'Wholesale',
            items_text: orderItems.map(i => `${i.name} - ${i.detail} = $${i.total.toFixed(2)}`).join('\n'),
            total: `$${total.toFixed(2)}`,
            payment_method: form.payment,
            address: `${form.street}, ${form.city}, ${form.state} ${form.zip}`,
            company: form.company || 'N/A',
            notes: form.notes || 'None',
            delivery_window: isDelivery ? form.deliveryWindow : 'N/A',
          }, publicKey)
        }
      } catch {
        // EmailJS not configured or failed — order is still saved locally
      }

      clearCart()
      navigate('/confirmation', { state: order })
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 grain">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#39FF14] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>
          <div className="flex items-center gap-3 mb-2">
            {isDelivery ? <Truck className="w-6 h-6 text-[#39FF14]" /> : <Package className="w-6 h-6 text-[#39FF14]" />}
            <h1 className="text-3xl font-bold">{isDelivery ? 'Delivery' : 'Wholesale'} Checkout</h1>
          </div>
        </motion.div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-5 gap-8 mt-8">
          {/* Form */}
          <div className="lg:col-span-3 space-y-6">
            {/* Contact Info */}
            <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/[0.06]">
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Full Name *</label>
                  <input type="text" required value={form.name} onChange={e => update('name', e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/30" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Email *</label>
                  <input type="email" required value={form.email} onChange={e => update('email', e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/30" placeholder="you@email.com" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Phone *</label>
                  <input type="tel" required value={form.phone} onChange={e => update('phone', e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/30" placeholder="(555) 123-4567" />
                </div>
                {isWholesale && (
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">Company / Store Name</label>
                    <input type="text" value={form.company} onChange={e => update('company', e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/30" placeholder="Your store" />
                  </div>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/[0.06]">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-[#39FF14]" />
                <h3 className="font-semibold">{isDelivery ? 'Delivery' : 'Shipping'} Address</h3>
              </div>
              {isDelivery && (
                <p className="text-xs text-gray-500 mb-4">Delivery zone: Santa Barbara to La Jolla, CA</p>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Street Address *</label>
                  <input type="text" required value={form.street} onChange={e => update('street', e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/30" placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-xs text-gray-500 mb-1.5">City *</label>
                    <input type="text" required value={form.city} onChange={e => update('city', e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/30" placeholder="City" />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">State *</label>
                    <input type="text" required value={form.state} onChange={e => update('state', e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/30" placeholder="CA" readOnly={isDelivery} />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1.5">ZIP *</label>
                    <input type="text" required value={form.zip} onChange={e => update('zip', e.target.value)} className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/30" placeholder="90001" />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Window (delivery mode only) */}
            {isDelivery && (
              <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/[0.06]">
                <h3 className="font-semibold mb-4">Delivery Window</h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'sameday', label: 'Same Day' },
                    { value: 'nextday', label: 'Next Day' },
                    { value: 'flexible', label: 'Flexible' },
                  ].map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => update('deliveryWindow', opt.value)}
                      className={`py-3 rounded-xl text-sm font-medium border transition-all ${
                        form.deliveryWindow === opt.value
                          ? 'border-[#39FF14]/40 bg-[#39FF14]/8 text-[#39FF14]'
                          : 'border-white/[0.06] bg-white/[0.02] text-gray-500 hover:text-white'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Method */}
            <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/[0.06]">
              <h3 className="font-semibold mb-4">Payment Method</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'cashapp', label: 'CashApp' },
                  { value: 'venmo', label: 'Venmo' },
                  ...(isDelivery ? [{ value: 'cash', label: 'Cash on Delivery' }] : []),
                  ...(isWholesale ? [{ value: 'wire', label: 'Wire / Zelle' }] : []),
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => update('payment', opt.value)}
                    className={`py-3 rounded-xl text-sm font-medium border transition-all ${
                      form.payment === opt.value
                        ? 'border-[#39FF14]/40 bg-[#39FF14]/8 text-[#39FF14]'
                        : 'border-white/[0.06] bg-white/[0.02] text-gray-500 hover:text-white'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Notes */}
            <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/[0.06]">
              <h3 className="font-semibold mb-4">Order Notes</h3>
              <textarea
                rows={3}
                value={form.notes}
                onChange={e => update('notes', e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/30 resize-none"
                placeholder="Any special instructions..."
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 p-6 rounded-2xl bg-[#0a0a0a] border border-white/[0.06]">
              <h3 className="font-semibold mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4">
                {items.map((item, i) => {
                  const isW = item.mode === 'wholesale' && item.wholesaleProduct
                  const name = isW ? item.wholesaleProduct!.name : item.product?.name ?? 'Unknown'
                  const price = isW
                    ? getWholesaleUnitPrice(item.wholesaleProduct!, item.quantity) * item.quantity
                    : getItemPrice(item) * item.quantity
                  return (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="text-gray-400 truncate mr-2">{name} x{item.quantity}</span>
                      <span className="text-white font-medium shrink-0">${price.toFixed(2)}</span>
                    </div>
                  )
                })}
              </div>
              <div className="pt-4 border-t border-white/[0.06]">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">{isDelivery ? 'Delivery' : 'Shipping'}</span>
                  <span className="text-[#39FF14] font-medium">{total >= 500 ? 'FREE' : isDelivery ? 'FREE' : 'TBD'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-lg text-[#39FF14]">${total.toFixed(2)}</span>
                </div>
              </div>

              {error && <p className="text-red-400 text-xs mt-4">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className={`w-full mt-6 py-3.5 font-bold rounded-xl transition-all text-sm flex items-center justify-center gap-2 ${
                  submitting
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-[#39FF14] text-black hover:brightness-110 hover:shadow-[0_0_30px_rgba(57,255,20,0.2)]'
                }`}
              >
                <Send className="w-4 h-4" />
                {submitting ? 'Placing Order...' : 'Place Order'}
              </button>

              <p className="text-[10px] text-gray-600 text-center mt-3">
                Payment instructions will be shown after order is placed
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
