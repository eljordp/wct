import { motion } from 'framer-motion'
import { Leaf, ShieldCheck, Truck, Award, Clock, FlaskConical, MapPin, Zap, ArrowRight, Package, DollarSign, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useMode } from '@/context/ModeContext'

const DELIVERY_VALUES = [
  { icon: FlaskConical, title: 'Lab Tested', description: 'Every product is third-party lab tested with full COAs available for your peace of mind.' },
  { icon: ShieldCheck, title: 'Farm Bill Compliant', description: 'All products are fully compliant with California regulations and tested for purity.' },
  { icon: Truck, title: 'Fast Delivery', description: 'Average 45-minute delivery within our zone. Order by 8PM for same-day delivery.' },
  { icon: Zap, title: 'Terpene Focused', description: 'We curate our menu around terpene profiles so you find the perfect match for your vibe.' },
  { icon: Clock, title: 'Daily Fresh', description: 'Rotating menu with fresh drops every week from California\'s top cultivators.' },
  { icon: Award, title: 'Premium Quality', description: 'Only top-shelf flower, concentrates, edibles, and vapes make it to our menu.' },
]

const WHOLESALE_VALUES = [
  { icon: FlaskConical, title: 'Lab Tested', description: 'Every product is third-party lab tested with full COAs available on request.' },
  { icon: ShieldCheck, title: 'Farm Bill Compliant', description: 'All products comply with the 2018 Farm Bill and contain less than 0.3% Delta-9 THC.' },
  { icon: DollarSign, title: 'Tiered Pricing', description: 'The more you order, the lower your per-unit cost. Up to 50%+ off retail pricing.' },
  { icon: Layers, title: '5 Categories', description: 'Flower, vapes, edibles, concentrates, and pre-rolls — a full product line for your store.' },
  { icon: Package, title: 'Ships Nationwide', description: 'Fast, discreet shipping anywhere in the US. Free shipping on orders over $500.' },
  { icon: Award, title: 'Premium Quality', description: 'Only top-shelf products sourced from trusted cultivators and manufacturers.' },
]

const DELIVERY_CITIES = [
  'Santa Barbara', 'Ventura', 'Oxnard', 'Thousand Oaks', 'Malibu',
  'Los Angeles', 'Long Beach', 'Anaheim', 'Irvine', 'Newport Beach',
  'Oceanside', 'Carlsbad', 'Encinitas', 'La Jolla',
]

export default function About() {
  const { isDelivery } = useMode()
  const VALUES = isDelivery ? DELIVERY_VALUES : WHOLESALE_VALUES

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 grain">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 pt-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <Leaf className="w-3.5 h-3.5 text-[#39FF14]" />
            <span className="text-xs font-semibold text-[#39FF14]/80 uppercase tracking-wide">About Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6 leading-[1.05]">
            {isDelivery ? (
              <>
                Terpene-Focused
                <br />
                <span className="text-[#39FF14] text-glow">Cannabis Delivery</span>
              </>
            ) : (
              <>
                Premium Exotic
                <br />
                <span className="text-[#39FF14] text-glow">Wholesale</span>
              </>
            )}
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {isDelivery
              ? 'West Coast Terpz delivers premium cannabis straight to your door. We serve the entire Southern California coastline from Santa Barbara to La Jolla.'
              : 'West Coast Terpz offers premium wholesale cannabis products shipped nationwide. Tiered pricing, top-shelf quality, and fast shipping for your business.'}
          </p>
        </motion.div>

        {/* Logo + story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center mb-24"
        >
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-[#39FF14]/[0.06] rounded-full blur-[80px] scale-90" />
              <img
                src="/logo.png"
                alt="West Coast Terpz"
                className="relative w-72 sm:w-80 drop-shadow-[0_0_40px_rgba(57,255,20,0.12)]"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            </div>
          </div>
          <div>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {(isDelivery
                ? [
                    { value: '45min', label: 'Avg Delivery' },
                    { value: '16+', label: 'Products' },
                    { value: '200mi', label: 'Coastline' },
                    { value: '21+', label: 'Verified' },
                  ]
                : [
                    { value: '16+', label: 'Products' },
                    { value: '50%+', label: 'Off Retail' },
                    { value: '50', label: 'States' },
                    { value: '21+', label: 'Verified' },
                  ]
              ).map(stat => (
                <div key={stat.label} className="p-4 rounded-xl bg-[#0e0e0e] border border-white/[0.06]">
                  <div className="text-xl font-black text-[#39FF14]">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
              {isDelivery ? (
                <>
                  <p>
                    We believe cannabis should be curated like craft coffee — by flavor, effect, and experience. That's why our menu is organized by terpene profiles: Relaxed, Euphoric, Creative, and Heavy.
                  </p>
                  <p>
                    Every product is sourced from California's top cultivators, lab tested for purity and potency, and delivered fast to your door. From Santa Barbara down through LA, Orange County, and all the way to La Jolla.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    We supply dispensaries, smoke shops, and retailers across the country with premium cannabis products at competitive wholesale prices. Our tiered pricing rewards bigger orders with better per-unit costs.
                  </p>
                  <p>
                    Every product is lab tested, Farm Bill compliant, and ready for retail shelves. From flower and vapes to edibles, concentrates, and pre-rolls — we offer a complete product line to stock your store.
                  </p>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Mission cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-4 mb-24"
        >
          <div className="shimmer glow-border p-8 rounded-2xl bg-[#0e0e0e] border border-white/[0.06]">
            <Award className="w-7 h-7 text-[#39FF14] mb-4" />
            <h3 className="text-lg font-bold mb-3">Our Mission</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {isDelivery
                ? 'Make premium cannabis accessible to everyone on the coast. We focus on quality, speed, and helping you find the perfect product for your mood through our terpene-guided menu.'
                : 'Provide retailers with premium cannabis products at the best wholesale prices. We focus on quality, reliability, and helping your business grow with in-demand products.'}
            </p>
          </div>
          <div className="shimmer glow-border p-8 rounded-2xl bg-[#0e0e0e] border border-white/[0.06]">
            <MapPin className="w-7 h-7 text-[#39FF14] mb-4" />
            <h3 className="text-lg font-bold mb-3">{isDelivery ? 'SoCal Roots' : 'Nationwide Reach'}</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {isDelivery
                ? 'Based in Southern California, we source from the state\'s top cultivators and deliver across 200 miles of coastline. Our central location means fast delivery to every city in our zone.'
                : 'Based in California, we ship to all 50 states. Our products comply with the 2018 Farm Bill, and we work with trusted shipping partners to ensure fast, discreet delivery.'}
            </p>
          </div>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <div className="text-center mb-14">
            <span className="text-[11px] font-semibold text-[#39FF14]/80 uppercase tracking-[0.2em]">Why West Coast Terpz</span>
            <h2 className="text-3xl font-bold mt-3">What Sets Us Apart</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="shimmer glow-border p-6 rounded-2xl bg-[#0e0e0e] border border-white/[0.06]"
              >
                <div className="w-10 h-10 rounded-lg bg-[#39FF14]/[0.08] border border-[#39FF14]/15 flex items-center justify-center mb-4">
                  <value.icon className="w-4 h-4 text-[#39FF14]" />
                </div>
                <h3 className="font-semibold text-sm mb-1.5">{value.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Delivery zone (delivery only) */}
        {isDelivery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-24"
          >
            <div className="relative p-8 sm:p-12 rounded-3xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#39FF14]/[0.06] via-[#0e0e0e] to-[#39FF14]/[0.03]" />
              <div className="absolute inset-0 border border-[#39FF14]/15 rounded-3xl" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-px bg-gradient-to-r from-transparent via-[#39FF14]/40 to-transparent" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-[#39FF14]/[0.1] border border-[#39FF14]/20 flex items-center justify-center">
                    <Truck className="w-6 h-6 text-[#39FF14]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Delivery Zone</h2>
                    <p className="text-sm text-gray-500">Santa Barbara to La Jolla</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {DELIVERY_CITIES.map(city => (
                    <div key={city} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-gray-400">
                      <MapPin className="w-3 h-3 text-[#39FF14]/60" />
                      {city}
                    </div>
                  ))}
                </div>

                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                    <div className="text-2xl font-black text-[#39FF14]">45min</div>
                    <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">Avg Delivery</div>
                  </div>
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                    <div className="text-2xl font-black text-[#39FF14]">FREE</div>
                    <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">Local Delivery</div>
                  </div>
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                    <div className="text-2xl font-black text-[#39FF14]">200mi</div>
                    <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">Coastline</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to Order?</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm">
            {isDelivery
              ? 'Browse our terpene-focused menu and get premium cannabis delivered to your door in under an hour.'
              : 'Browse our wholesale catalog and stock your shelves with premium products at unbeatable prices.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/menu"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#39FF14] text-black font-bold rounded-xl hover:shadow-[0_0_40px_rgba(57,255,20,0.25)] transition-all duration-300 text-sm"
            >
              {isDelivery ? 'Browse Menu' : 'Shop Wholesale'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 glass text-white font-medium rounded-xl hover:bg-white/[0.06] transition-all text-sm"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
