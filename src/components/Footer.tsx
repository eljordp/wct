import { Leaf, MapPin, Mail, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#39FF14]/20 flex items-center justify-center border border-[#39FF14]/30">
                <Leaf className="w-4 h-4 text-[#39FF14]" />
              </div>
              <span className="text-lg font-bold">West Coast Terpz</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              California's premier terpene-focused cannabis delivery service. Curated products, professional service, Van Nuys and surrounding areas.
            </p>
          </div>

          {/* Info */}
          <div>
            <h4 className="font-semibold mb-4">Info</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#39FF14]" />
                <span>Van Nuys, CA - Local Delivery Only</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#39FF14]" />
                <span>hello@westcoastterpz.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#39FF14]" />
                <span>Order by 8PM for same day delivery</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <Link to="/menu" className="block text-gray-400 hover:text-[#39FF14] transition-colors">Menu</Link>
              <Link to="/about" className="block text-gray-400 hover:text-[#39FF14] transition-colors">About</Link>
              <Link to="/cart" className="block text-gray-400 hover:text-[#39FF14] transition-colors">Cart</Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            Licensed cannabis delivery service. 21+ only with valid ID. Consumption of cannabis may impair your ability to drive.
          </p>
          <p className="text-xs text-gray-600 text-center mt-2">
            &copy; 2025 West Coast Terpz. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
