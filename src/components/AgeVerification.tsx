import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-md w-full p-8 rounded-3xl bg-[#141414] border border-white/10 text-center"
          >
            <img src="/logo.png" alt="WCT" className="h-24 w-auto mx-auto mb-4" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />

            <h2 className="text-2xl font-bold mb-1">West Coast Terpz</h2>
            <p className="text-[#39FF14] text-sm font-semibold mb-4 uppercase tracking-wider">Wholesale</p>
            <p className="text-gray-400 text-sm mb-6">
              You must be at least 21 years of age to enter this site. This site is intended for licensed retailers and wholesale buyers only.
            </p>

            <div className="flex items-center justify-center gap-2 mb-8 text-xs text-gray-500">
              <ShieldCheck className="w-4 h-4 text-[#39FF14]" />
              <span>Licensed Distributor &bull; Lab Tested &bull; Farm Bill Compliant</span>
            </div>

            <div className="space-y-3">
              <button
                onClick={onVerify}
                className="w-full py-3.5 px-6 rounded-xl bg-[#39FF14] text-black font-bold text-sm hover:brightness-110 transition-all"
              >
                I am 21 or older — Enter
              </button>
              <button
                onClick={onDeny}
                className="w-full py-3 px-6 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm hover:text-white hover:bg-white/10 transition-all"
              >
                I am under 21
              </button>
            </div>

            <p className="text-[10px] text-gray-600 mt-6 leading-relaxed">
              All products comply with the 2018 Farm Bill and contain less than 0.3% Delta-9 THC.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
