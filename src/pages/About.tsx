import { motion } from 'framer-motion'
import { Leaf, ShieldCheck, Truck, Award, Users, FlaskConical, MapPin, Package, TrendingUp, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const VALUES = [
  { icon: FlaskConical, title: 'Lab Tested', description: 'Every product is third-party lab tested with full COAs available.' },
  { icon: ShieldCheck, title: 'Farm Bill Compliant', description: 'All products under 0.3% Delta-9 THC, fully compliant with federal regulations.' },
  { icon: Package, title: 'Consistent Supply', description: 'Reliable inventory so you never run out of your best sellers.' },
  { icon: TrendingUp, title: 'High Margins', description: 'Wholesale pricing designed for competitive, profitable margins.' },
  { icon: Truck, title: 'Fast Fulfillment', description: 'Same-day dispatch from LA. Most orders arrive in 2–3 business days.' },
  { icon: Users, title: 'Partner Support', description: 'Dedicated account managers, marketing materials, and product training.' },
]

const DELIVERY_CITIES = [
  'Santa Barbara', 'Ventura', 'Oxnard', 'Thousand Oaks', 'Malibu',
  'Los Angeles', 'Long Beach', 'Anaheim', 'Irvine', 'Newport Beach',
  'Oceanside', 'Carlsbad', 'Encinitas', 'La Jolla',
]

export default function About() {
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
            California's Trusted
            <br />
            <span className="text-[#39FF14] text-glow">Wholesale Partner</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            West Coast Terpz is a licensed California distributor specializing in premium THCa products. We serve retailers from Santa Barbara to La Jolla.
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
              {[
                { value: '500+', label: 'Retail Partners' },
                { value: '16', label: 'Product Lines' },
                { value: '98%', label: 'Fill Rate' },
                { value: '<24hr', label: 'Ship Time' },
              ].map(stat => (
                <div key={stat.label} className="p-4 rounded-xl bg-[#0e0e0e] border border-white/[0.06]">
                  <div className="text-xl font-black text-[#39FF14]">{stat.value}</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="space-y-4 text-gray-400 text-sm leading-relaxed">
              <p>
                Based in Los Angeles, we curate premium flower, vapes, edibles, and concentrates from California's top cultivators. Every product is lab tested, Farm Bill compliant, and packaged retail-ready.
              </p>
              <p>
                We deliver across the entire Southern California coastline — from Santa Barbara down through LA, Orange County, and all the way to La Jolla. Fast shipping, low minimums, margins that work.
              </p>
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
              Be the most reliable wholesale cannabis supplier on the coast. Quality, consistency, and long-term partnerships with retailers who share our commitment to premium products.
            </p>
          </div>
          <div className="shimmer glow-border p-8 rounded-2xl bg-[#0e0e0e] border border-white/[0.06]">
            <MapPin className="w-7 h-7 text-[#39FF14] mb-4" />
            <h3 className="text-lg font-bold mb-3">Based in LA</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Operating from Los Angeles, we source from the state's top cultivators. Our central SoCal location means faster shipping to every city from Santa Barbara to La Jolla.
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
            <span className="text-[11px] font-semibold text-[#39FF14]/80 uppercase tracking-[0.2em]">What Sets Us Apart</span>
            <h2 className="text-3xl font-bold mt-3">Built for Your Business</h2>
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

        {/* Delivery zone */}
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
                  <div className="text-2xl font-black text-[#39FF14]">24hr</div>
                  <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">Avg Ship Time</div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <div className="text-2xl font-black text-[#39FF14]">$500+</div>
                  <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">Free Shipping</div>
                </div>
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-center">
                  <div className="text-2xl font-black text-[#39FF14]">200mi</div>
                  <div className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">Coastline</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Partner with West Coast Terpz</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto text-sm">Whether you're a smoke shop, dispensary, or online retailer — we have the products and pricing to fuel your growth.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#39FF14] text-black font-bold rounded-xl hover:shadow-[0_0_40px_rgba(57,255,20,0.25)] transition-all duration-300 text-sm"
            >
              Browse Catalog
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
