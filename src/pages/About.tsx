import { motion } from 'framer-motion'
import { Leaf, ShieldCheck, Truck, Award, Users, FlaskConical, MapPin, Package, TrendingUp, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const VALUES = [
  { icon: FlaskConical, title: 'Lab Tested', description: 'Every product is third-party lab tested with full COAs available. We never cut corners on quality.' },
  { icon: ShieldCheck, title: 'Farm Bill Compliant', description: 'All products contain less than 0.3% Delta-9 THC, fully compliant with federal regulations.' },
  { icon: Package, title: 'Consistent Supply', description: 'Reliable inventory levels so you never run out of your best sellers. We keep your shelves stocked.' },
  { icon: TrendingUp, title: 'High Margins', description: 'Our wholesale pricing is designed to give you competitive margins that keep your business profitable.' },
  { icon: Truck, title: 'Fast Fulfillment', description: 'Orders ship same day from our LA warehouse. Most domestic orders arrive within 2–3 business days.' },
  { icon: Users, title: 'Partner Support', description: 'Dedicated account managers, marketing materials, and product training to help your team sell.' },
]

export default function About() {
  return (
    <div className="min-h-screen pt-8 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 pt-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#39FF14]/10 border border-[#39FF14]/20 mb-6">
            <Leaf className="w-4 h-4 text-[#39FF14]" />
            <span className="text-xs font-semibold text-[#39FF14] uppercase tracking-wide">About Us</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            California's Trusted
            <br />
            <span className="text-[#39FF14] text-glow">Wholesale Partner</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            West Coast Terpz is a licensed California distributor specializing in premium THCa cannabis products. We partner with retailers and dispensaries nationwide to bring the best of California cannabis to their shelves.
          </p>
        </motion.div>

        {/* Logo / brand section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-16"
        >
          <img
            src="/logo.png"
            alt="West Coast Terpz"
            className="w-64 sm:w-80 drop-shadow-2xl"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-20"
        >
          <div className="p-8 rounded-2xl bg-[#141414] border border-white/8">
            <Award className="w-8 h-8 text-[#39FF14] mb-4" />
            <h3 className="text-xl font-bold mb-3">Our Mission</h3>
            <p className="text-gray-400 leading-relaxed">
              To be the most reliable wholesale cannabis supplier in the country. We focus on quality, consistency, and building long-term partnerships with retailers who share our commitment to premium products.
            </p>
          </div>
          <div className="p-8 rounded-2xl bg-[#141414] border border-white/8">
            <MapPin className="w-8 h-8 text-[#39FF14] mb-4" />
            <h3 className="text-xl font-bold mb-3">Based in LA</h3>
            <p className="text-gray-400 leading-relaxed">
              Operating out of Los Angeles, California, we source from the state's top cultivators and manufacturers. Our central West Coast location means faster shipping to customers nationwide.
            </p>
          </div>
        </motion.div>

        {/* Values grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-[#39FF14] uppercase tracking-widest">What Sets Us Apart</span>
            <h2 className="text-3xl font-bold mt-3">Built for Your Business</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-6 rounded-2xl bg-[#141414] border border-white/8"
              >
                <div className="w-12 h-12 rounded-xl bg-[#39FF14]/10 border border-[#39FF14]/20 flex items-center justify-center mb-4">
                  <value.icon className="w-5 h-5 text-[#39FF14]" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-10 rounded-3xl bg-gradient-to-br from-[#39FF14]/10 to-[#141414] border border-[#39FF14]/20 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Partner with West Coast Terpz</h2>
          <p className="text-gray-400 mb-8 max-w-lg mx-auto">Whether you're a smoke shop, dispensary, or online retailer — we have the products and pricing to fuel your growth.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#39FF14] text-black font-bold rounded-xl hover:brightness-110 transition-all text-sm"
            >
              Browse Catalog
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all text-sm"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
