import { motion } from 'framer-motion'
import { Leaf, ShieldCheck, Truck, MapPin, Clock, Award } from 'lucide-react'
import { Link } from 'react-router-dom'

const FEATURES = [
  { icon: ShieldCheck, title: 'Licensed & Verified', description: 'Fully licensed California cannabis delivery service. Every product is lab tested and verified for quality.' },
  { icon: Leaf, title: 'Terpene-Focused', description: 'Our menu is organized by terpene profiles so you can find the exact experience you\'re looking for.' },
  { icon: Truck, title: 'Professional Delivery', description: 'Discreet, professional delivery within a 10-mile radius of Van Nuys. Average delivery time: 45 minutes.' },
  { icon: Clock, title: 'Same Day Service', description: 'Order by 8PM for same day delivery. Real-time tracking keeps you informed every step of the way.' },
  { icon: MapPin, title: 'Van Nuys & Surrounding', description: 'We currently serve Van Nuys and surrounding areas within a 10-mile delivery radius.' },
  { icon: Award, title: 'Premium Selection', description: 'Curated selection of flower, vapes, edibles, concentrates, and pre-rolls from top California brands.' },
]

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <Leaf className="w-4 h-4 text-[#39FF14]" />
            <span className="text-sm text-gray-400">About Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-[#39FF14] text-glow">Premium</span> Cannabis Delivery
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            California's premier terpene-focused cannabis delivery service. Curated products, professional service, Van Nuys and surrounding areas.
          </p>
        </motion.div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/10"
            >
              <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center mb-4">
                <feature.icon className="w-5 h-5 text-[#39FF14]" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Delivery info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-8 rounded-3xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Delivery Zone</h2>
          <p className="text-gray-400 mb-6">We deliver within a 10-mile radius of Van Nuys, CA</p>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
              <MapPin className="w-4 h-4 text-[#39FF14]" /> Van Nuys Area
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
              <Clock className="w-4 h-4 text-[#39FF14]" /> Same Day
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400">
              <Truck className="w-4 h-4 text-[#39FF14]" /> Fast Delivery
            </div>
          </div>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#39FF14] text-black font-bold rounded-xl hover:brightness-110 transition-all text-sm"
          >
            Browse Menu
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
