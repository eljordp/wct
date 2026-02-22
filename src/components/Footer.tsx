import { MapPin, Mail, Phone, Clock, ArrowRight, Globe } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')

  return (
    <footer className="relative border-t border-white/10 bg-[#080808]">
      {/* Newsletter CTA */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-1">Join our wholesale network</h3>
              <p className="text-sm text-gray-400">Get exclusive pricing, new product drops, and industry updates.</p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 md:w-72 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#39FF14]/50"
              />
              <button className="px-5 py-3 bg-[#39FF14] text-black font-bold text-sm rounded-lg hover:brightness-110 transition-all flex items-center gap-2">
                Subscribe
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="WCT" className="h-10 w-auto" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <div>
                <span className="text-base font-bold block leading-tight">West Coast Terpz</span>
                <span className="text-[9px] font-medium text-[#39FF14] uppercase tracking-widest">Wholesale</span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              California's premium THCa wholesale distributor. Delivering from Santa Barbara to La Jolla.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-[#39FF14] hover:border-[#39FF14]/30 transition-all">
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Quick Links</h4>
            <div className="space-y-2.5 text-sm">
              <Link to="/shop" className="block text-gray-400 hover:text-[#39FF14] transition-colors">Shop All</Link>
              <Link to="/shop?cat=flower" className="block text-gray-400 hover:text-[#39FF14] transition-colors">THCa Flower</Link>
              <Link to="/shop?cat=vapes" className="block text-gray-400 hover:text-[#39FF14] transition-colors">Vape Carts</Link>
              <Link to="/shop?cat=edibles" className="block text-gray-400 hover:text-[#39FF14] transition-colors">Edibles</Link>
              <Link to="/shop?cat=concentrates" className="block text-gray-400 hover:text-[#39FF14] transition-colors">Concentrates</Link>
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Company</h4>
            <div className="space-y-2.5 text-sm">
              <Link to="/about" className="block text-gray-400 hover:text-[#39FF14] transition-colors">About Us</Link>
              <Link to="/contact" className="block text-gray-400 hover:text-[#39FF14] transition-colors">Contact</Link>
              <Link to="/contact" className="block text-gray-400 hover:text-[#39FF14] transition-colors">Become a Retailer</Link>
              <a href="#" className="block text-gray-400 hover:text-[#39FF14] transition-colors">Lab Results</a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-sm">Contact</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#39FF14] shrink-0" />
                <span>Los Angeles, CA</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#39FF14] shrink-0" />
                <span>wholesale@westcoastterpz.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#39FF14] shrink-0" />
                <span>(818) 555-0199</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#39FF14] shrink-0" />
                <span>Mon–Fri 9AM–6PM PST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; 2026 West Coast Terpz Wholesale. All rights reserved.
          </p>
          <p className="text-xs text-gray-600 text-center leading-relaxed max-w-xl">
            All products comply with the 2018 Farm Bill. THCa products contain less than 0.3% Delta-9 THC. Must be 21+ to purchase.
          </p>
        </div>
      </div>
    </footer>
  )
}
