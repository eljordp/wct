import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShieldCheck, Truck, Package, DollarSign, ArrowRight, FlaskConical, Award, Users, MapPin, Star } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { PRODUCTS, CATEGORIES } from '@/data/products'
import { useCart } from '@/context/CartContext'

const FEATURES = [
  { icon: DollarSign, title: 'Wholesale Pricing', description: 'Tiered bulk pricing with margins up to 60% off retail. The more you order, the more you save.' },
  { icon: Truck, title: 'Fast Shipping', description: 'Free shipping on $500+ orders. Same-day dispatch from our LA warehouse.' },
  { icon: FlaskConical, title: 'Lab Tested', description: 'Every batch third-party tested. Full COAs available on request.' },
  { icon: ShieldCheck, title: 'Farm Bill Compliant', description: 'All products under 0.3% Delta-9 THC. Fully 2018 Farm Bill compliant.' },
  { icon: Package, title: 'Low Minimums', description: 'Start with as few as 10 units per SKU. Test before you commit.' },
  { icon: Users, title: 'Dedicated Support', description: 'Personal account manager for every wholesale partner.' },
]

const STATS = [
  { value: '500+', label: 'Retail Partners' },
  { value: '16', label: 'Product Lines' },
  { value: '98%', label: 'Fill Rate' },
  { value: '<24hr', label: 'Ship Time' },
]

const CITIES = ['Santa Barbara', 'Ventura', 'Malibu', 'Los Angeles', 'Long Beach', 'Irvine', 'Carlsbad', 'La Jolla']

export default function Home() {
  const { addToCart } = useCart()
  const featured = PRODUCTS.filter(p => p.badge).slice(0, 4)

  return (
    <div className="grain">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Animated orbs */}
        <div className="orb absolute top-[20%] left-[60%] w-[700px] h-[700px] rounded-full bg-[#39FF14]/[0.04] blur-[160px]" />
        <div className="orb absolute top-[60%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#39FF14]/[0.03] blur-[120px]" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060606]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left text */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] pulse-dot" />
                  <span className="text-xs font-medium text-gray-300">Now accepting wholesale accounts</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-8"
              >
                Premium
                <br />
                <span className="text-[#39FF14] text-glow">THCa</span>
                <br />
                <span className="text-gray-400">Wholesale</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg text-gray-500 mb-10 max-w-md leading-relaxed"
              >
                Stock your shelves with California's finest. Flower, vapes, edibles & concentrates — delivered from Santa Barbara to La Jolla.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-3 mb-12"
              >
                <Link
                  to="/shop"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#39FF14] text-black font-bold rounded-xl hover:shadow-[0_0_40px_rgba(57,255,20,0.25)] transition-all duration-300 text-sm"
                >
                  Shop Wholesale
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 glass text-white font-medium rounded-xl hover:bg-white/[0.06] transition-all text-sm"
                >
                  Apply for Account
                </Link>
              </motion.div>

              {/* Delivery strip */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center gap-2"
              >
                <MapPin className="w-3.5 h-3.5 text-[#39FF14]" />
                {CITIES.map((city, i) => (
                  <span key={city} className="text-[11px] text-gray-600">
                    {city}{i < CITIES.length - 1 && <span className="mx-1 text-gray-700">&middot;</span>}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right — logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex items-center justify-center relative"
            >
              <div className="absolute inset-0 bg-[#39FF14]/[0.06] rounded-full blur-[100px] scale-75" />
              <img
                src="/logo.png"
                alt="West Coast Terpz"
                className="relative w-full max-w-lg mx-auto drop-shadow-[0_0_60px_rgba(57,255,20,0.15)]"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="border-y border-white/[0.04] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`py-8 text-center ${i < 3 ? 'border-r border-white/[0.04]' : ''}`}
              >
                <div className="text-3xl sm:text-4xl font-black text-[#39FF14] mb-1">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CATEGORY BROWSE ─── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-[11px] font-semibold text-[#39FF14]/80 uppercase tracking-[0.2em]">Products</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">Shop by Category</h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {CATEGORIES.filter(c => c.value !== 'all').map((cat, i) => (
              <motion.div
                key={cat.value}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  to={`/shop?cat=${cat.value}`}
                  className="shimmer glow-border block p-6 rounded-2xl bg-[#0e0e0e] border border-white/[0.06] hover:border-[#39FF14]/20 transition-all text-center group"
                >
                  <div className="w-14 h-14 mx-auto rounded-xl bg-[#39FF14]/[0.06] border border-[#39FF14]/10 flex items-center justify-center mb-3 group-hover:bg-[#39FF14]/[0.12] group-hover:border-[#39FF14]/25 transition-all">
                    <Package className="w-6 h-6 text-gray-500 group-hover:text-[#39FF14] transition-colors" />
                  </div>
                  <h3 className="font-semibold text-sm text-gray-300 group-hover:text-white transition-colors">{cat.label}</h3>
                  <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-wider">Shop now</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED ─── */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#080808] to-[#060606]" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-end justify-between mb-12"
          >
            <div>
              <span className="text-[11px] font-semibold text-[#39FF14]/80 uppercase tracking-[0.2em]">Top Sellers</span>
              <h2 className="text-3xl font-bold mt-2">Featured Products</h2>
            </div>
            <Link to="/shop" className="hidden sm:inline-flex items-center gap-2 text-sm text-gray-400 font-medium hover:text-[#39FF14] transition-colors group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} onAddToCart={addToCart} />
            ))}
          </div>

          <div className="sm:hidden text-center mt-8">
            <Link to="/shop" className="inline-flex items-center gap-2 text-sm text-[#39FF14] font-medium">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[11px] font-semibold text-[#39FF14]/80 uppercase tracking-[0.2em]">Why Choose Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">Built for Retailers</h2>
            <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm">Premium products, wholesale pricing, and support designed to grow your business.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="shimmer glow-border p-6 rounded-2xl bg-[#0e0e0e] border border-white/[0.06]"
              >
                <div className="w-10 h-10 rounded-lg bg-[#39FF14]/[0.08] border border-[#39FF14]/15 flex items-center justify-center mb-4">
                  <feature.icon className="w-4.5 h-4.5 text-[#39FF14]" />
                </div>
                <h3 className="font-semibold text-sm mb-1.5">{feature.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#080808] to-[#060606]" />
        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[11px] font-semibold text-[#39FF14]/80 uppercase tracking-[0.2em]">Get Started</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">Three Steps to Premium</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', icon: Users, title: 'Create Account', desc: 'Sign up for a wholesale account. No long applications — get approved fast.' },
              { step: '02', icon: Package, title: 'Browse & Order', desc: 'Full catalog with real-time wholesale pricing and live inventory.' },
              { step: '03', icon: Truck, title: 'We Ship It', desc: 'Same-day dispatch from LA. Free shipping on $500+ orders. SB to La Jolla.' },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-8 rounded-2xl bg-[#0e0e0e] border border-white/[0.06] text-center"
              >
                <span className="absolute top-4 right-4 text-5xl font-black text-white/[0.03]">{item.step}</span>
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#39FF14]/[0.08] border border-[#39FF14]/15 mb-5">
                  <item.icon className="w-6 h-6 text-[#39FF14]" />
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIAL ─── */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center p-10 rounded-3xl glass"
          >
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#39FF14] fill-[#39FF14]" />)}
            </div>
            <blockquote className="text-lg sm:text-xl text-gray-300 font-medium leading-relaxed mb-6 max-w-xl mx-auto">
              "Best wholesale partner we've had. Quality product, fast shipping, and their team actually picks up the phone."
            </blockquote>
            <div>
              <p className="font-semibold text-sm">Marcus T.</p>
              <p className="text-xs text-gray-500">Smoke Shop Owner &middot; Los Angeles</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative p-12 sm:p-16 rounded-3xl overflow-hidden text-center"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/[0.08] via-[#0e0e0e] to-[#39FF14]/[0.04]" />
            <div className="absolute inset-0 border border-[#39FF14]/15 rounded-3xl" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#39FF14]/40 to-transparent" />

            <div className="relative z-10">
              <Award className="w-8 h-8 text-[#39FF14] mx-auto mb-5" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to stock your shelves?</h2>
              <p className="text-gray-400 mb-10 max-w-md mx-auto text-sm">Join 500+ retailers partnering with West Coast Terpz. Premium products, wholesale pricing, Santa Barbara to La Jolla delivery.</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/shop"
                  className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#39FF14] text-black font-bold rounded-xl hover:shadow-[0_0_40px_rgba(57,255,20,0.25)] transition-all duration-300 text-sm"
                >
                  Start Shopping
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 glass text-white font-medium rounded-xl hover:bg-white/[0.06] transition-all text-sm"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
