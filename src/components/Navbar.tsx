import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X, ChevronDown, Truck } from 'lucide-react'
import { useCart } from '@/context/CartContext'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { itemCount } = useCart()
  const location = useLocation()

  const categories = [
    { to: '/menu?cat=flower', label: 'Flower' },
    { to: '/menu?cat=vapes', label: 'Vapes' },
    { to: '/menu?cat=edibles', label: 'Edibles' },
    { to: '/menu?cat=concentrates', label: 'Concentrates' },
    { to: '/menu?cat=pre-rolls', label: 'Pre-Rolls' },
  ]

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Promo banner */}
      <div className="bg-[#39FF14] text-black text-center py-2 px-4 text-xs font-semibold flex items-center justify-center gap-2">
        <Truck className="w-3.5 h-3.5 hidden sm:block" />
        <span>FREE DELIVERY on orders $75+ &bull; Santa Barbara to La Jolla</span>
      </div>

      <nav className="sticky top-0 z-50 bg-[#060606]/95 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="WCT" className="h-10 w-auto" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <div className="flex flex-col">
                <span className="text-base font-bold text-white leading-tight">West Coast Terpz</span>
                <span className="text-[10px] font-medium text-[#39FF14] uppercase tracking-widest">Delivery</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {links.slice(0, 1).map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.to ? 'text-[#39FF14] bg-[#39FF14]/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="relative" onMouseEnter={() => setMenuOpen(true)} onMouseLeave={() => setMenuOpen(false)}>
                <Link
                  to="/menu"
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === '/menu' ? 'text-[#39FF14] bg-[#39FF14]/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Menu
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
                </Link>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-48 py-2 rounded-xl bg-[#111] border border-white/[0.08] shadow-2xl"
                    >
                      <Link to="/menu" className="block px-4 py-2 text-sm text-gray-300 hover:text-[#39FF14] hover:bg-white/5 transition-colors">
                        All Products
                      </Link>
                      {categories.map(cat => (
                        <Link key={cat.to} to={cat.to} className="block px-4 py-2 text-sm text-gray-300 hover:text-[#39FF14] hover:bg-white/5 transition-colors">
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
                    location.pathname === link.to ? 'text-[#39FF14] bg-[#39FF14]/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/menu"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 bg-[#39FF14] text-black text-sm font-bold rounded-lg hover:brightness-110 transition-all"
              >
                Order Now
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
              <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-gray-400 hover:text-white">
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#060606]/98 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
            >
              <div className="px-4 py-4 space-y-1">
                {[{ to: '/', label: 'Home' }, { to: '/menu', label: 'Menu' }, { to: '/about', label: 'About' }, { to: '/contact', label: 'Contact' }].map(l => (
                  <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className={`block py-2.5 px-3 rounded-lg text-sm font-medium ${location.pathname === l.to ? 'text-[#39FF14] bg-[#39FF14]/10' : 'text-gray-400'}`}>
                    {l.label}
                  </Link>
                ))}
                <div className="pt-3">
                  <Link to="/menu" onClick={() => setMobileOpen(false)} className="block w-full text-center py-3 bg-[#39FF14] text-black text-sm font-bold rounded-lg">
                    Order Now
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
