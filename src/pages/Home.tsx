import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Truck, ArrowRight, MapPin, Star, ShieldCheck, Leaf, Sparkles, Clock, FlaskConical } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import DeliveryMap from '@/components/DeliveryMap'
import { PRODUCTS, TERPENE_PROFILES, type TerpeneProfile } from '@/data/products'
import { useCart } from '@/context/CartContext'

const TERPENE_CARDS: { profile: TerpeneProfile; icon: typeof Leaf; emoji: string }[] = [
  { profile: 'relaxed', icon: Leaf, emoji: '🍇' },
  { profile: 'euphoric', icon: Sparkles, emoji: '☀️' },
  { profile: 'creative', icon: Star, emoji: '🎨' },
  { profile: 'heavy', icon: ShieldCheck, emoji: '🌿' },
]

const CITIES = ['Santa Barbara', 'Ventura', 'Malibu', 'Los Angeles', 'Long Beach', 'Newport Beach', 'Carlsbad', 'La Jolla']

export default function Home() {
  const { addToCart } = useCart()
  const featured = PRODUCTS.filter(p => p.badge).slice(0, 4)

  return (
    <div className="grain">
      {/* ─── HERO ─── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden mesh-gradient">
        <div className="orb absolute top-[15%] left-[55%] w-[800px] h-[800px] rounded-full bg-[#39FF14]/[0.035] blur-[180px]" />
        <div className="orb absolute top-[65%] left-[15%] w-[600px] h-[600px] rounded-full bg-[#39FF14]/[0.025] blur-[140px]" style={{ animationDelay: '4s' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass mb-8">
                  <div className="w-2 h-2 rounded-full bg-[#39FF14] pulse-dot" />
                  <span className="text-xs font-medium text-gray-300">Now delivering &bull; Order by 8PM</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-6xl lg:text-[5.5rem] font-black leading-[0.9] mb-8 tracking-tight"
              >
                Premium
                <br />
                Cannabis
                <br />
                <span className="gradient-text">Delivered.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="text-lg text-gray-500 mb-10 max-w-md leading-relaxed">
                Terpene-curated menus delivered to your door. 200 miles of California coastline covered.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="flex flex-col sm:flex-row gap-3 mb-14">
                <Link to="/menu" className="group inline-flex items-center justify-center gap-2.5 px-10 py-4 bg-[#39FF14] text-black font-bold rounded-xl hover:shadow-[0_0_50px_rgba(57,255,20,0.3)] transition-all duration-500 text-sm">
                  Browse Menu <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                <Link to="/menu" className="inline-flex items-center justify-center gap-2 px-8 py-4 glass text-white font-medium rounded-xl hover:bg-white/[0.06] transition-all text-sm">
                  $150 Minimum
                </Link>
              </motion.div>

              {/* City marquee */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="overflow-hidden">
                <div className="flex items-center gap-3">
                  <MapPin className="w-3.5 h-3.5 text-[#39FF14] shrink-0" />
                  <div className="overflow-hidden relative">
                    <div className="flex gap-4 marquee">
                      {[...CITIES, ...CITIES].map((city, i) => (
                        <span key={i} className="text-[11px] text-gray-600 whitespace-nowrap">{city}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex items-center justify-center relative"
            >
              <div className="absolute inset-0 bg-[#39FF14]/[0.04] rounded-full blur-[120px] scale-75" />
              <img src="/logo.png" alt="West Coast Terpz" className="relative w-full max-w-lg mx-auto drop-shadow-[0_0_80px_rgba(57,255,20,0.12)]" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="relative border-y border-white/[0.04]">
        <div className="absolute inset-0 bg-[#050505]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.04]">
            {[
              { value: '45', unit: 'min', label: 'Avg Delivery' },
              { value: '200', unit: 'mi', label: 'Coastline' },
              { value: '100', unit: '%', label: 'Lab Tested' },
              { value: '$150', unit: '', label: 'Min Order' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="py-10 text-center"
              >
                <div className="text-3xl sm:text-4xl font-black tracking-tight">
                  <span className="gradient-text">{stat.value}</span>
                  <span className="text-[#39FF14]/60 text-xl">{stat.unit}</span>
                </div>
                <div className="text-[10px] text-gray-600 uppercase tracking-[0.15em] mt-1 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TERPENE PROFILES ─── */}
      <section className="py-28 px-4 relative overflow-hidden">
        <div className="orb absolute top-[50%] left-[80%] w-[500px] h-[500px] rounded-full bg-[#39FF14]/[0.02] blur-[150px]" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-[10px] font-semibold text-[#39FF14]/60 uppercase tracking-[0.25em]">Find Your Vibe</span>
            <h2 className="text-4xl sm:text-5xl font-black mt-4 tracking-tight">Shop by Terpene Profile</h2>
            <p className="text-gray-500 mt-4 max-w-lg mx-auto text-sm leading-relaxed">Every product is categorized by its terpene profile so you find exactly the experience you want.</p>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {TERPENE_CARDS.map(({ profile, emoji }, i) => {
              const info = TERPENE_PROFILES[profile]
              return (
                <motion.div key={profile} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <Link
                    to={`/menu?profile=${profile}`}
                    className="card-hover block relative p-8 rounded-2xl bg-[#0a0a0a] border border-white/[0.06] transition-all text-center group overflow-hidden"
                  >
                    {/* Colored accent line at top */}
                    <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${info.color}50, transparent)` }} />
                    {/* Background glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{ background: `radial-gradient(circle at 50% 60%, ${info.color}08, transparent 70%)` }}
                    />
                    <div className="relative z-10">
                      <div className="text-4xl mb-4">{emoji}</div>
                      <h3 className="font-bold text-base mb-1.5" style={{ color: info.color }}>{info.label}</h3>
                      <p className="text-[11px] text-gray-500 leading-relaxed">{info.description}</p>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── FEATURED ─── */}
      <section className="py-28 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#070707] to-[#050505]" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex items-end justify-between mb-14">
            <div>
              <span className="text-[10px] font-semibold text-[#39FF14]/60 uppercase tracking-[0.25em]">Top Picks</span>
              <h2 className="text-3xl sm:text-4xl font-black mt-3 tracking-tight">Featured Products</h2>
            </div>
            <Link to="/menu" className="hidden sm:inline-flex items-center gap-2 text-sm text-gray-500 font-medium hover:text-[#39FF14] transition-colors group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((product, i) => (<ProductCard key={product.id} product={product} index={i} onAddToCart={addToCart} />))}
          </div>
          <div className="mt-8 text-center sm:hidden">
            <Link to="/menu" className="inline-flex items-center gap-2 text-sm text-gray-400 font-medium hover:text-[#39FF14] transition-colors">
              View All Products <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ─── DELIVERY MAP ─── */}
      <section className="py-28 px-4 relative overflow-hidden">
        <div className="orb absolute top-[30%] left-[20%] w-[600px] h-[600px] rounded-full bg-[#39FF14]/[0.02] blur-[150px]" />
        <div className="relative max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="text-[10px] font-semibold text-[#39FF14]/60 uppercase tracking-[0.25em]">Delivery Zone</span>
              <h2 className="text-3xl sm:text-4xl font-black mt-4 mb-6 tracking-tight">
                200 Miles of
                <br />
                <span className="gradient-text">California Coast</span>
              </h2>
              <p className="text-gray-500 mb-10 leading-relaxed text-sm">
                From Santa Barbara all the way down the coast through Greater Los Angeles, Orange County, and into San Diego County — ending at La Jolla. Premium cannabis delivered to your door.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-10">
                {[
                  { icon: Truck, label: '45min Avg Delivery' },
                  { icon: Clock, label: 'Order by 8PM' },
                  { icon: FlaskConical, label: '100% Lab Tested' },
                  { icon: ShieldCheck, label: '21+ ID Verified' },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <item.icon className="w-4 h-4 text-[#39FF14] shrink-0" />
                    <span className="text-xs text-gray-400">{item.label}</span>
                  </div>
                ))}
              </div>

              <Link to="/menu" className="group inline-flex items-center gap-2.5 px-8 py-4 bg-[#39FF14] text-black font-bold rounded-xl hover:shadow-[0_0_50px_rgba(57,255,20,0.3)] transition-all duration-500 text-sm">
                Order Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <DeliveryMap />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-28 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#070707] to-[#050505]" />
        <div className="relative max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <span className="text-[10px] font-semibold text-[#39FF14]/60 uppercase tracking-[0.25em]">Simple Process</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-4 tracking-tight">How It Works</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', icon: ShieldCheck, title: 'Verify Your ID', desc: 'Quick 21+ ID verification. Upload your ID and get approved to shop.' },
              { step: '02', icon: Sparkles, title: 'Browse & Order', desc: 'Explore our terpene-focused menu. Find your vibe, build your order ($150 min).' },
              { step: '03', icon: Truck, title: 'Fast Delivery', desc: 'Delivered to your door in ~45 minutes. Discreet packaging, real-time tracking.' },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="card-hover relative p-8 rounded-2xl bg-[#0a0a0a] border border-white/[0.06] text-center h-full">
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#39FF14]/20 to-transparent" />
                  <span className="absolute top-4 right-5 text-5xl font-black text-white/[0.02]">{item.step}</span>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#39FF14]/[0.06] border border-[#39FF14]/10 mb-5">
                    <item.icon className="w-6 h-6 text-[#39FF14]" />
                  </div>
                  <h3 className="font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <span className="text-[10px] font-semibold text-[#39FF14]/60 uppercase tracking-[0.25em]">Reviews</span>
            <h2 className="text-3xl font-black mt-4 tracking-tight">What Customers Say</h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { quote: 'Fastest delivery I\'ve experienced. Product quality is incredible and the terpene menu makes ordering easy.', name: 'Marcus T.', city: 'Los Angeles', stars: 5 },
              { quote: 'Love that they organize by terpene profiles. Found my perfect relaxed strain on the first try. Will never go anywhere else.', name: 'Alyssa R.', city: 'Santa Barbara', stars: 5 },
              { quote: 'Ordered at 6PM and it was at my door by 6:40. Lab-tested, beautifully packaged. This is how it should be done.', name: 'Jordan K.', city: 'La Jolla', stars: 5 },
            ].map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/[0.06]"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(review.stars)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 text-[#39FF14] fill-[#39FF14]" />)}
                </div>
                <blockquote className="text-sm text-gray-300 leading-relaxed mb-5">"{review.quote}"</blockquote>
                <div>
                  <p className="text-xs font-semibold">{review.name}</p>
                  <p className="text-[10px] text-gray-600">{review.city}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-28 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative p-14 sm:p-20 rounded-3xl overflow-hidden text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/[0.06] via-[#0a0a0a] to-[#39FF14]/[0.03]" />
            <div className="absolute inset-0 border border-[#39FF14]/10 rounded-3xl" />
            <div className="neon-line absolute top-0 left-[15%] right-[15%]" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-5xl font-black mb-5 tracking-tight">Ready to order?</h2>
              <p className="text-gray-500 mb-10 max-w-md mx-auto text-sm leading-relaxed">Premium cannabis delivered anywhere from Santa Barbara to La Jolla. Free delivery on all orders.</p>
              <Link to="/menu" className="group inline-flex items-center justify-center gap-2.5 px-12 py-4.5 bg-[#39FF14] text-black font-bold rounded-xl hover:shadow-[0_0_60px_rgba(57,255,20,0.35)] transition-all duration-500 text-sm">
                Browse Menu <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
