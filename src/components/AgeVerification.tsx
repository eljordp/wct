import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, MapPin } from 'lucide-react'

interface Props {
  isOpen: boolean
  onVerify: () => void
  onDeny: () => void
}

export default function AgeVerification({ isOpen, onVerify, onDeny }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black" />
          <div className="orb absolute top-[30%] left-[50%] w-[600px] h-[600px] rounded-full bg-[#39FF14]/[0.05] blur-[150px]" />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-md w-full"
          >
            <div className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/[0.06] shadow-2xl">
              <div className="h-px bg-gradient-to-r from-transparent via-[#39FF14]/50 to-transparent" />

              <div className="p-8 sm:p-10 text-center">
                <motion.img
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  src="/logo.png"
                  alt="WCT"
                  className="w-44 mx-auto mb-6 drop-shadow-[0_0_40px_rgba(57,255,20,0.15)]"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />

                <h2 className="text-2xl font-bold mb-0.5">West Coast Terpz</h2>
                <p className="text-[10px] font-semibold text-[#39FF14]/70 uppercase tracking-[0.25em] mb-6">Premium Delivery</p>

                <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-6" />

                <p className="text-sm text-gray-500 mb-8 max-w-xs mx-auto leading-relaxed">
                  You must be 21 or older to access this site. This site is for licensed retailers and wholesale buyers.
                </p>

                <div className="space-y-3 mb-8">
                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={onVerify}
                    className="w-full py-4 px-6 rounded-xl bg-[#39FF14] text-black font-bold text-sm tracking-wide hover:shadow-[0_0_30px_rgba(57,255,20,0.3)] transition-all duration-300"
                  >
                    YES, I AM 21+
                  </motion.button>
                  <button
                    onClick={onDeny}
                    className="w-full py-3.5 px-6 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-500 text-sm font-medium hover:text-gray-300 hover:bg-white/[0.06] transition-all"
                  >
                    No, take me back
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] text-gray-600">
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-[#39FF14]/50" />
                    Farm Bill Compliant
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#39FF14]/50" />
                    SB to La Jolla
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
