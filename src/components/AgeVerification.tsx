import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, MapPin, Upload, ArrowRight } from 'lucide-react'

interface Props {
  isOpen: boolean
  onVerify: () => void
  onDeny: () => void
}

export default function AgeVerification({ isOpen, onVerify, onDeny }: Props) {
  const [step, setStep] = useState<'age' | 'id'>('age')

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
          <div className="orb absolute top-[30%] left-[50%] w-[600px] h-[600px] rounded-full bg-[#39FF14]/[0.04] blur-[150px]" />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-md w-full"
          >
            <div className="relative overflow-hidden rounded-3xl bg-[#0a0a0a] border border-white/[0.06] shadow-2xl">
              <div className="h-[2px] bg-gradient-to-r from-transparent via-[#39FF14]/50 to-transparent" />

              {step === 'age' ? (
                <div className="p-8 sm:p-10 text-center">
                  <motion.img
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    src="/logo.png"
                    alt="WCT"
                    className="w-40 mx-auto mb-6 drop-shadow-[0_0_40px_rgba(57,255,20,0.15)]"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                  />

                  <h2 className="text-2xl font-bold mb-0.5">West Coast Terpz</h2>
                  <p className="text-[10px] font-semibold text-[#39FF14]/70 uppercase tracking-[0.25em] mb-6">Premium Delivery</p>

                  <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-6" />

                  <p className="text-sm text-gray-500 mb-8 max-w-xs mx-auto leading-relaxed">
                    You must be 21 or older to access this site. By entering, you confirm you are of legal age.
                  </p>

                  <div className="space-y-3 mb-8">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setStep('id')}
                      className="w-full py-4 px-6 rounded-xl bg-[#39FF14] text-black font-bold text-sm tracking-wide hover:shadow-[0_0_30px_rgba(57,255,20,0.3)] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      YES, I AM 21+
                      <ArrowRight className="w-4 h-4" />
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
                      Licensed Delivery
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#39FF14]/50" />
                      SB to La Jolla
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 sm:p-10 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#39FF14]/[0.08] border border-[#39FF14]/15 mb-6">
                    <ShieldCheck className="w-8 h-8 text-[#39FF14]" />
                  </div>

                  <h2 className="text-xl font-bold mb-2">Verify Your ID</h2>
                  <p className="text-sm text-gray-500 mb-8 max-w-xs mx-auto leading-relaxed">
                    Upload a photo of your government-issued ID to verify your age. Required for all deliveries.
                  </p>

                  {/* ID Upload placeholder */}
                  <div className="mb-6 p-8 rounded-2xl border-2 border-dashed border-white/[0.08] bg-white/[0.02] hover:border-[#39FF14]/20 hover:bg-[#39FF14]/[0.02] transition-all cursor-pointer group">
                    <Upload className="w-8 h-8 text-gray-600 group-hover:text-[#39FF14]/60 mx-auto mb-3 transition-colors" />
                    <p className="text-sm text-gray-400 font-medium mb-1">Upload ID Photo</p>
                    <p className="text-[11px] text-gray-600">Driver's License, State ID, or Passport</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <button
                      className="w-full py-3.5 px-6 rounded-xl bg-gray-800 text-gray-500 text-sm font-bold cursor-not-allowed"
                      disabled
                    >
                      Verify &amp; Continue
                    </button>
                    <button
                      onClick={onVerify}
                      className="w-full py-3 px-6 text-[#39FF14] text-sm font-medium hover:underline transition-all"
                    >
                      Skip for now →
                    </button>
                  </div>

                  <p className="text-[10px] text-gray-700 leading-relaxed">
                    ID verification is required before your first delivery. You can skip to browse the menu.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
