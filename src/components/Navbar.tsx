import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X, ChevronDown, Truck } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [shopOpen, setShopOpen] = useState(false)
  const { itemCount } = useCart()
  const location = useLocation()

  const categories = [
    { to: '/shop?cat=flower', label: 'THCa Flower' },
    { to: '/shop?cat=vapes', label: 'Vape Carts' },
    { to: '/shop?cat=edibles', label: 'Edibles' },
    { to: '/shop?cat=concentrates', label: 'Concentrates' },
    { to: '/shop?cat=pre-rolls', label: 'Pre-Rolls' },
  ]

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Promo banner */}
      <div className="bg-[#39FF14] text-black text-center py-2 px-4 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2">
        <Truck className="w-4 h-4 hidden sm:block" />
        <span>FREE SHIPPING on wholesale orders over $500 &bull; Minimum order $150</span>
      </div>

      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="WCT" className="h-10 w-auto" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <div className="flex flex-col">
                <span className="text-base font-bold text-white leading-tight">West Coast Terpz</span>
                <span className="text-[10px] font-medium text-[#39FF14] uppercase tracking-widest">Wholesale</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {links.slice(0, 1).map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'text-[#39FF14] bg-[#39FF14]/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Shop dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setShopOpen(true)}
                onMouseLeave={() => setShopOpen(false)}
              >
                <Link
                  to="/shop"
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === '/shop'
                      ? 'text-[#39FF14] bg-[#39FF14]/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Shop
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${shopOpen ? 'rotate-180' : ''}`} />
                </Link>

                <AnimatePresence>
                  {shopOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-48 py-2 rounded-xl bg-[#1a1a1a] border border-white/10 shadow-2xl"
                    >
                      <Link
                        to="/shop"
                        className="block px-4 py-2 text-sm text-gray-300 hover:text-[#39FF14] hover:bg-white/5 transition-colors"
                      >
                        All Products
                      </Link>
                      {categories.map(cat => (
                        <Link
                          key={cat.to}
                          to={cat.to}
                          className="block px-4 py-2 text-sm text-gray-300 hover:text-[#39FF14] hover:bg-white/5 transition-colors"
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {links.slice(1).map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.to
                      ? 'text-[#39FF14] bg-[#39FF14]/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <Link
                to="/shop"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#39FF14] text-black text-sm font-bold rounded-lg hover:brightness-110 transition-all"
              >
                Shop Now
              </Link>

              <Link to="/cart" className="relative p-2 text-gray-400 hover:text-white transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {itemCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-[#39FF14] text-black text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-gray-400 hover:text-white"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#0a0a0a]/98 backdrop-blur-xl border-b border-white/10 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                <Link to="/" onClick={() => setMobileOpen(false)} className={`block py-2.5 px-3 rounded-lg text-sm font-medium ${location.pathname === '/' ? 'text-[#39FF14] bg-[#39FF14]/10' : 'text-gray-400'}`}>
                  Home
                </Link>
                <Link to="/shop" onClick={() => setMobileOpen(false)} className={`block py-2.5 px-3 rounded-lg text-sm font-medium ${location.pathname === '/shop' ? 'text-[#39FF14] bg-[#39FF14]/10' : 'text-gray-400'}`}>
                  Shop All
                </Link>
                <div className="pl-3 space-y-1">
                  {categories.map(cat => (
                    <Link key={cat.to} to={cat.to} onClick={() => setMobileOpen(false)} className="block py-2 px-3 text-xs text-gray-500 hover:text-[#39FF14]">
                      {cat.label}
                    </Link>
                  ))}
                </div>
                <Link to="/about" onClick={() => setMobileOpen(false)} className={`block py-2.5 px-3 rounded-lg text-sm font-medium ${location.pathname === '/about' ? 'text-[#39FF14] bg-[#39FF14]/10' : 'text-gray-400'}`}>
                  About
                </Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)} className={`block py-2.5 px-3 rounded-lg text-sm font-medium ${location.pathname === '/contact' ? 'text-[#39FF14] bg-[#39FF14]/10' : 'text-gray-400'}`}>
                  Contact
                </Link>
                <div className="pt-3">
                  <Link to="/shop" onClick={() => setMobileOpen(false)} className="block w-full text-center py-3 bg-[#39FF14] text-black text-sm font-bold rounded-lg">
                    Shop Wholesale
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  )
}
