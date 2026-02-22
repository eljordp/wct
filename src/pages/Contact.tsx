import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Building2 } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', company: '', phone: '', message: '', type: 'wholesale' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you! We will get back to you within 24 hours.')
  }

  return (
    <div className="min-h-screen pt-8 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14 pt-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20 mb-6">
            <MessageSquare className="w-4 h-4 text-[#39FF14]" />
            <span className="text-xs font-semibold text-[#39FF14] uppercase tracking-wide">Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto">
            Ready to start a wholesale account? Have questions about our products? We'd love to hear from you.
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
            <div className="p-6 rounded-2xl bg-[#141414] border border-white/8">
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-4 text-sm text-gray-400">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#39FF14]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-white">wholesale@westcoastterpz.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#39FF14]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-white">(818) 555-0199</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[#39FF14]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Location</p>
                    <p className="text-white">Los Angeles, CA</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-[#39FF14]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Hours</p>
                    <p className="text-white">Mon-Fri 9AM-6PM PST</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#39FF14]/10 to-[#141414] border border-[#39FF14]/20">
              <Building2 className="w-6 h-6 text-[#39FF14] mb-3" />
              <h3 className="font-semibold mb-2">Wholesale Accounts</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                New wholesale accounts are typically approved within 24 hours. Fill out the form and our team will set you up with login credentials and access to wholesale pricing.
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
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-[#141414] border border-white/8">
              <h3 className="font-semibold text-lg mb-6">Send us a message</h3>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/8 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50"
                    placeholder="John Smith"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/8 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50"
                    placeholder="john@store.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Company / Store Name</label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={e => setForm({ ...form, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/8 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50"
                    placeholder="Your Store Name"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/8 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs text-gray-500 mb-1.5">Inquiry Type</label>
                <select
                  value={form.type}
                  onChange={e => setForm({ ...form, type: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/8 text-white text-sm focus:outline-none focus:border-[#39FF14]/50"
                >
                  <option value="wholesale" className="bg-[#141414]">New Wholesale Account</option>
                  <option value="order" className="bg-[#141414]">Order Inquiry</option>
                  <option value="product" className="bg-[#141414]">Product Questions</option>
                  <option value="other" className="bg-[#141414]">Other</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-xs text-gray-500 mb-1.5">Message *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/8 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#39FF14]/50 resize-none"
                  placeholder="Tell us about your business and what products you're interested in..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#39FF14] text-black font-bold rounded-xl hover:brightness-110 transition-all text-sm"
              >
                <Send className="w-4 h-4" />
                Send Message
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">We typically respond within 24 hours</p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
