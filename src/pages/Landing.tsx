import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Truck, Package, MapPin, Globe, Clock, DollarSign } from 'lucide-react'
import { useMode } from '@/context/ModeContext'

export default function Landing() {
  const { setMode } = useMode()
  const navigate = useNavigate()

  const handleSelect = (mode: 'delivery' | 'wholesale') => {
    setMode(mode)
    navigate('/home')
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden grain">
      <div className="orb absolute top-[20%] left-[60%] w-[700px] h-[700px] rounded-full bg-[#39FF14]/[0.04] blur-[160px]" />
      <div className="orb absolute top-[60%] left-[20%] w-[500px] h-[500px] rounded-full bg-[#39FF14]/[0.03] blur-[120px]" style={{ animationDelay: '3s' }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]/50" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 w-full py-12">
        {/* Logo & Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <img
            src="/logo.png"
            alt="West Coast Terpz"
            className="w-32 sm:w-40 mx-auto mb-6 drop-shadow-[0_0_40px_rgba(57,255,20,0.15)]"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-[0.95] mb-4">
            West Coast <span className="gradient-text">Terpz</span>
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
            Premium exotic flower and carts. Choose how you want to shop.
          </p>
        </motion.div>

        {/* Two Mode Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
          {/* Delivery Card */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => handleSelect('delivery')}
            className="group text-left p-6 sm:p-8 rounded-2xl glass border border-white/[0.08] hover:border-[#39FF14]/30 transition-all duration-300 hover:shadow-[0_0_60px_rgba(57,255,20,0.08)] cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#39FF14]/[0.08] border border-[#39FF14]/15 flex items-center justify-center mb-5 group-hover:bg-[#39FF14]/[0.15] transition-colors">
              <Truck className="w-7 h-7 text-[#39FF14]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Delivery</h2>
            <p className="text-gray-400 text-sm mb-6">Hand-delivered to your door</p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <MapPin className="w-4 h-4 text-[#39FF14]/60 shrink-0" />
                <span>Santa Barbara to La Jolla</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <Clock className="w-4 h-4 text-[#39FF14]/60 shrink-0" />
                <span>Same-day / next-day delivery</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <DollarSign className="w-4 h-4 text-[#39FF14]/60 shrink-0" />
                <span>Cash, CashApp, or Venmo</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#39FF14] text-black font-bold rounded-xl group-hover:shadow-[0_0_30px_rgba(57,255,20,0.25)] transition-all text-sm w-full justify-center">
              Shop Delivery
            </div>
          </motion.button>

          {/* Wholesale Card */}
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => handleSelect('wholesale')}
            className="group text-left p-6 sm:p-8 rounded-2xl glass border border-white/[0.08] hover:border-[#39FF14]/30 transition-all duration-300 hover:shadow-[0_0_60px_rgba(57,255,20,0.08)] cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#39FF14]/[0.08] border border-[#39FF14]/15 flex items-center justify-center mb-5 group-hover:bg-[#39FF14]/[0.15] transition-colors">
              <Package className="w-7 h-7 text-[#39FF14]" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">Wholesale</h2>
            <p className="text-gray-400 text-sm mb-6">Bulk orders shipped nationwide</p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <Globe className="w-4 h-4 text-[#39FF14]/60 shrink-0" />
                <span>Ships anywhere in the US</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <Package className="w-4 h-4 text-[#39FF14]/60 shrink-0" />
                <span>Tiered bulk pricing</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <DollarSign className="w-4 h-4 text-[#39FF14]/60 shrink-0" />
                <span>CashApp, Venmo, or Wire</span>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#39FF14] text-black font-bold rounded-xl group-hover:shadow-[0_0_30px_rgba(57,255,20,0.25)] transition-all text-sm w-full justify-center">
              Shop Wholesale
            </div>
          </motion.button>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-xs text-gray-600 mt-10"
        >
          All products comply with the 2018 Farm Bill &bull; Under 0.3% Delta-9 THC &bull; Must be 21+
        </motion.p>
      </div>
    </div>
  )
}
