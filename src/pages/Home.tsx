import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Truck, ArrowRight, MapPin, Star, ShieldCheck, Leaf, Sparkles } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { PRODUCTS, TERPENE_PROFILES, type TerpeneProfile } from '@/data/products'
import { useCart } from '@/context/CartContext'

const CITIES = ['Santa Barbara', 'Ventura', 'Malibu', 'Los Angeles', 'Long Beach', 'Irvine', 'Carlsbad', 'La Jolla']

const TERPENE_CARDS: { profile: TerpeneProfile; icon: typeof Leaf }[] = [
  { profile: 'relaxed', icon: Leaf },
  { profile: 'euphoric', icon: Sparkles },
  { profile: 'creative', icon: Star },
  { profile: 'heavy', icon: ShieldCheck },
]

export default function Home() {
  const { addToCart } = useCart()
  const featured = PRODUCTS.filter(p => p.badge).slice(0, 4)

  return (
    <div className="grain">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="orb absolute top-[20%] left-[60%] w-[700px] h-[700px] rounded-full bg-[#39FF14]/[0.04] blur-[160px]" />
        <div className="orb absolute top-[60%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#39FF14]/[0.03] blur-[120px]" style={{ animationDelay: '3s' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#060606]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14] pulse-dot" />
                  <span className="text-xs font-medium text-gray-300">Now delivering &bull; Order by 8PM</span>
                </div>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-8">
                Premium
                <br />
                <span className="text-[#39FF14] text-glow">Cannabis</span>
                <br />
                <span className="text-gray-400">Delivered</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="text-lg text-gray-500 mb-10 max-w-md leading-relaxed">
                Curated terpene-focused menus delivered to your door. From Santa Barbara to La Jolla.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col sm:flex-row gap-3 mb-12">
                <Link to="/menu" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#39FF14] text-black font-bold rounded-xl hover:shadow-[0_0_40px_rgba(57,255,20,0.25)] transition-all duration-300 text-sm">
                  Order Now <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
                <Link to="/about" className="inline-flex items-center justify-center gap-2 px-8 py-4 glass text-white font-medium rounded-xl hover:bg-white/[0.06] transition-all text-sm">
                  How It Works
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex flex-wrap items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#39FF14]" />
                {CITIES.map((city, i) => (
                  <span key={city} className="text-[11px] text-gray-600">{city}{i < CITIES.length - 1 && <span className="mx-1 text-gray-700">&middot;</span>}</span>
                ))}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="hidden lg:flex items-center justify-center relative">
              <div className="absolute inset-0 bg-[#39FF14]/[0.06] rounded-full blur-[100px] scale-75" />
              <img src="/logo.png" alt="West Coast Terpz" className="relative w-full max-w-lg mx-auto drop-shadow-[0_0_60px_rgba(57,255,20,0.15)]" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="border-y border-white/[0.04] bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {[{ value: '45min', label: 'Avg Delivery' }, { value: '200mi', label: 'Coastline' }, { value: '100%', label: 'Lab Tested' }, { value: '21+', label: 'Verified Only' }].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className={`py-8 text-center ${i < 3 ? 'border-r border-white/[0.04]' : ''}`}>
                <div className="text-3xl sm:text-4xl font-black text-[#39FF14] mb-1">{stat.value}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TERPENE PROFILES ─── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-[11px] font-semibold text-[#39FF14]/80 uppercase tracking-[0.2em]">Find Your Vibe</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">Shop by Terpene Profile</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">Every product is categorized by its terpene profile so you find exactly the experience you want.</p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {TERPENE_CARDS.map(({ profile, icon: Icon }, i) => {
              const info = TERPENE_PROFILES[profile]
              return (
                <motion.div key={profile} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}>
                  <Link to={`/menu?profile=${profile}`} className="shimmer block p-6 rounded-2xl bg-[#0e0e0e] border border-white/[0.06] hover:border-white/[0.12] transition-all text-center group">
                    <div className="w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-3 border transition-all" style={{ backgroundColor: `${info.color}10`, borderColor: `${info.color}20` }}>
                      <Icon className="w-6 h-6" style={{ color: info.color }} />
                    </div>
                    <h3 className="font-semibold text-sm mb-1" style={{ color: info.color }}>{info.label}</h3>
                    <p className="text-[11px] text-gray-500">{info.description}</p>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURED ─── */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#060606] via-[#080808] to-[#060606]" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[11px] font-semibold text-[#39FF14]/80 uppercase tracking-[0.2em]">Top Picks</span>
              <h2 className="text-3xl font-bold mt-2">Featured Products</h2>
            </div>
            <Link to="/menu" className="hidden sm:inline-flex items-center gap-2 text-sm text-gray-400 font-medium hover:text-[#39FF14] transition-colors group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((product, i) => (<ProductCard key={product.id} product={product} index={i} onAddToCart={addToCart} />))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-[11px] font-semibold text-[#39FF14]/80 uppercase tracking-[0.2em]">Simple</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">How It Works</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', icon: ShieldCheck, title: 'Verify Your Age', desc: 'Quick 21+ verification. Upload your ID and get approved in minutes.' },
              { step: '02', icon: Sparkles, title: 'Browse & Order', desc: 'Explore our menu filtered by terpene profiles. Find your perfect match.' },
              { step: '03', icon: Truck, title: 'We Deliver', desc: 'Fast, discreet delivery to your door. Real-time tracking included.' },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative p-8 rounded-2xl bg-[#0e0e0e] border border-white/[0.06] text-center">
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center p-10 rounded-3xl glass">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-[#39FF14] fill-[#39FF14]" />)}
            </div>
            <blockquote className="text-lg sm:text-xl text-gray-300 font-medium leading-relaxed mb-6 max-w-xl mx-auto">
              "Fastest delivery I've ever experienced. Product quality is incredible and the terpene menu makes it easy to find what I want."
            </blockquote>
            <p className="font-semibold text-sm">Marcus T.</p>
            <p className="text-xs text-gray-500">Verified Customer &middot; Los Angeles</p>
          </motion.div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative p-12 sm:p-16 rounded-3xl overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/[0.08] via-[#0e0e0e] to-[#39FF14]/[0.04]" />
            <div className="absolute inset-0 border border-[#39FF14]/15 rounded-3xl" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#39FF14]/40 to-transparent" />
            <div className="relative z-10">
              <Leaf className="w-8 h-8 text-[#39FF14] mx-auto mb-5" />
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to order?</h2>
              <p className="text-gray-400 mb-10 max-w-md mx-auto text-sm">Premium cannabis delivered from Santa Barbara to La Jolla. Free delivery on orders $75+.</p>
              <Link to="/menu" className="group inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#39FF14] text-black font-bold rounded-xl hover:shadow-[0_0_40px_rgba(57,255,20,0.25)] transition-all duration-300 text-sm">
                Browse Menu <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
