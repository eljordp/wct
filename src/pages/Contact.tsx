import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Truck } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', type: 'order' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await fetch('https://formsubmit.co/ajax/ingrandefrankie@icloud.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `WCT Contact — ${form.type}`,
          _template: 'table',
          name: form.name,
          email: form.email,
          phone: form.phone || 'N/A',
          inquiry_type: form.type,
          message: form.message,
        }),
      })
      setSubmitted(true)
    } catch {
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 grain">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14 pt-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <MessageSquare className="w-4 h-4 text-[#39FF14]" />
            <span className="text-xs font-semibold text-[#39FF14]/80 uppercase tracking-wide">Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Have questions about delivery, products, or your order? We're here to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/[0.06]">
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-4 text-sm text-gray-400">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#39FF14]/[0.08] border border-[#39FF14]/15 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#39FF14]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-white">info@westcoastterpz.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#39FF14]/[0.08] border border-[#39FF14]/15 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#39FF14]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-white">(818) 555-0199</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#39FF14]/[0.08] border border-[#39FF14]/15 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#39FF14]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Delivery Zone</p>
                    <p className="text-white">Santa Barbara to Greater LA</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#39FF14]/[0.08] border border-[#39FF14]/15 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#39FF14]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Delivery Hours</p>
                    <p className="text-white">Daily 10AM–8PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#39FF14]/[0.06] to-[#0e0e0e] border border-[#39FF14]/15">
              <Truck className="w-6 h-6 text-[#39FF14] mb-3" />
              <h3 className="font-semibold mb-2">Free Delivery</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Orders over $75 get free delivery anywhere in our zone. Average delivery time is 45 minutes. Must be 21+ with valid ID.
              </p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-[#0e0e0e] border border-white/[0.06]">
              <h3 className="font-semibold text-lg mb-6">Send us a message</h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/30 focus:border-[#39FF14]/30 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/30 focus:border-[#39FF14]/30 transition-all"
                    placeholder="you@email.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/30 focus:border-[#39FF14]/30 transition-all"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Inquiry Type</label>
                  <select
                    value={form.type}
                    onChange={e => setForm({ ...form, type: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#39FF14]/30 focus:border-[#39FF14]/30 transition-all"
                  >
                    <option value="order" className="bg-[#0e0e0e]">Order Question</option>
                    <option value="delivery" className="bg-[#0e0e0e]">Delivery Inquiry</option>
                    <option value="product" className="bg-[#0e0e0e]">Product Question</option>
                    <option value="other" className="bg-[#0e0e0e]">Other</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs text-gray-500 mb-1.5">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/30 focus:border-[#39FF14]/30 transition-all resize-none"
                  placeholder="How can we help?"
                />
              </div>

              {submitted ? (
                <div className="text-center py-2">
                  <p className="text-[#39FF14] font-semibold text-sm">Message sent!</p>
                  <p className="text-xs text-gray-500 mt-1">We typically respond within 24 hours</p>
                </div>
              ) : (
                <>
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`w-full flex items-center justify-center gap-2 py-3.5 font-bold rounded-xl transition-all text-sm ${
                      submitting
                        ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                        : 'bg-[#39FF14] text-black hover:brightness-110'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                  <p className="text-xs text-gray-500 text-center mt-3">We typically respond within 24 hours</p>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
