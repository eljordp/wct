import { MapPin, Mail, Phone, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.04] bg-[#060606]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="WCT" className="h-10 w-auto" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <div>
                <span className="text-base font-bold block leading-tight">West Coast Terpz</span>
                <span className="text-[9px] font-medium text-[#39FF14] uppercase tracking-widest">Delivery</span>
              </div>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Premium cannabis delivery from Santa Barbara to La Jolla. Curated terpene-focused menus.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Menu</h4>
            <div className="space-y-2.5 text-sm">
              <Link to="/menu" className="block text-gray-500 hover:text-[#39FF14] transition-colors">All Products</Link>
              <Link to="/menu?cat=flower" className="block text-gray-500 hover:text-[#39FF14] transition-colors">Flower</Link>
              <Link to="/menu?cat=vapes" className="block text-gray-500 hover:text-[#39FF14] transition-colors">Vapes</Link>
              <Link to="/menu?cat=edibles" className="block text-gray-500 hover:text-[#39FF14] transition-colors">Edibles</Link>
              <Link to="/menu?cat=concentrates" className="block text-gray-500 hover:text-[#39FF14] transition-colors">Concentrates</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Company</h4>
            <div className="space-y-2.5 text-sm">
              <Link to="/about" className="block text-gray-500 hover:text-[#39FF14] transition-colors">About Us</Link>
              <Link to="/contact" className="block text-gray-500 hover:text-[#39FF14] transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Delivery Zone</h4>
            <div className="space-y-3 text-sm text-gray-500">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#39FF14]/60 shrink-0" />
                <span>Santa Barbara to La Jolla</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#39FF14]/60 shrink-0" />
                <span>45 min avg delivery</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#39FF14]/60 shrink-0" />
                <span>info@westcoastterpz.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#39FF14]/60 shrink-0" />
                <span>(818) 555-0199</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-700">&copy; 2026 West Coast Terpz. All rights reserved.</p>
          <p className="text-xs text-gray-700 text-center leading-relaxed max-w-xl">
            Licensed cannabis delivery. Must be 21+ with valid ID. Consume responsibly.
          </p>
        </div>
      </div>
    </footer>
  )
}
