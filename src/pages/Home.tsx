import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ShieldCheck, Truck, Leaf, MapPin, Clock, Sparkles, ArrowRight } from 'lucide-react'

const STEPS = [
  {
    icon: ShieldCheck,
    title: 'Verify Your Age',
    description: 'Quick identity verification ensures compliance. Upload your ID and get approved in minutes.',
  },
  {
    icon: Sparkles,
    title: 'Browse & Order',
    description: 'Explore our curated menu filtered by terpene profiles. Find the perfect match for your needs.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Discreet, professional delivery to your door. Real-time tracking keeps you informed.',
  },
]

const BADGES = [
  { icon: ShieldCheck, label: '100% Verified' },
  { icon: Leaf, label: 'Lab Tested' },
  { icon: MapPin, label: '10 Mile Radius' },
  { icon: Clock, label: '45 min avg' },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#39FF14]/5 via-transparent to-transparent" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#39FF14]/5 rounded-full blur-[120px]" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Leaf className="w-4 h-4 text-[#39FF14]" />
              <span className="text-sm text-gray-400">Premium Cannabis Delivery</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl sm:text-7xl font-black mb-4"
          >
            <span className="text-[#39FF14] text-glow">West Coast</span>
            <br />
            <span className="text-white">Terpz</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-400 mb-4 max-w-2xl mx-auto leading-relaxed"
          >
            Premium Cannabis Delivery &bull; Van Nuys, CA
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="text-sm text-gray-500 mb-8 max-w-lg mx-auto"
          >
            Premium products organized by terpene profiles for a personalized experience
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              to="/menu"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#39FF14] text-black font-bold rounded-xl hover:brightness-110 transition-all text-sm"
            >
              View Menu
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent border border-[#39FF14]/50 text-[#39FF14] font-medium rounded-xl hover:bg-[#39FF14]/10 transition-all text-sm"
            >
              Learn More
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {BADGES.map(badge => (
              <div key={badge.label} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
                <badge.icon className="w-3.5 h-3.5 text-[#39FF14]" />
                {badge.label}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs font-medium text-[#39FF14] uppercase tracking-widest">How It Works</span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-3">Three simple steps to premium cannabis delivered to your door</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#39FF14]/20 to-[#39FF14]/5 border border-[#39FF14]/30 mb-6">
                  <step.icon className="w-7 h-7 text-[#39FF14]" />
                </div>
                <div className="text-xs text-[#39FF14] font-medium mb-2">Step {i + 1}</div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/10"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Ready to order?</h2>
            <p className="text-gray-400 mb-8">We deliver within a 10-mile radius of Van Nuys, CA</p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#39FF14] text-black font-bold rounded-xl hover:brightness-110 transition-all text-sm"
            >
              Browse Menu
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
