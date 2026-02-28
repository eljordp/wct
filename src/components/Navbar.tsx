import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Menu, X, ChevronDown, Truck, Package } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useMode } from '@/context/ModeContext'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { itemCount } = useCart()
  const { mode, setMode } = useMode()
  const location = useLocation()
  const navigate = useNavigate()

  const isDelivery = mode === 'delivery'

  const categories = isDelivery
    ? [
        { to: '/menu?cat=flower', label: 'Flower' },
        { to: '/menu?cat=vapes', label: 'Carts' },
      ]
    : [
        { to: '/menu?cat=flower', label: 'Flower' },
        { to: '/menu?cat=vapes', label: 'Vapes' },
        { to: '/menu?cat=edibles', label: 'Edibles' },
        { to: '/menu?cat=concentrates', label: 'Concentrates' },
        { to: '/menu?cat=pre-rolls', label: 'Pre-Rolls' },
      ]

  const links = [
    { to: '/home', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ]

  const handleModeSwitch = (newMode: 'delivery' | 'wholesale') => {
    if (newMode !== mode) {
      setMode(newMode)
      navigate('/home')
    }
  }

  return (
    <>
      {/* Promo banner */}
      <div className="bg-[#39FF14] text-black text-center py-2 px-4 text-[10px] sm:text-xs font-semibold flex items-center justify-center gap-2">
        {isDelivery ? (
          <>
            <Truck className="w-3.5 h-3.5 hidden sm:block" />
            <span className="hidden sm:inline">FREE DELIVERY &bull; $150 Minimum &bull; Santa Barbara to La Jolla</span>
            <span className="sm:hidden">FREE DELIVERY &bull; $150 Min &bull; SB to La Jolla</span>
          </>
        ) : (
          <>
            <Package className="w-3.5 h-3.5 hidden sm:block" />
            <span className="hidden sm:inline">FREE SHIPPING $500+ &bull; $150 Minimum &bull; Ships Anywhere in the US</span>
            <span className="sm:hidden">FREE SHIP $500+ &bull; $150 Min &bull; Ships US</span>
          </>
        )}
      </div>

      <nav className="sticky top-0 z-50 bg-[#060606]/95 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link to="/home" className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <img src="/logo.png" alt="WCT" className="h-8 sm:h-10 w-auto" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              <div className="flex flex-col">
                <span className="text-sm sm:text-base font-bold text-white leading-tight">
                  <span className="hidden sm:inline">West Coast Terpz</span>
                  <span className="sm:hidden">WCT</span>
                </span>
                <span className="text-[9px] sm:text-[10px] font-medium text-[#39FF14] uppercase tracking-widest">
                  {isDelivery ? 'Delivery' : 'Wholesale'}
                </span>
              </div>
            </Link>

            {/* Mode toggle */}
            <div className="hidden md:flex items-center bg-white/[0.04] rounded-lg border border-white/[0.06] p-0.5">
              <button
                onClick={() => handleModeSwitch('delivery')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  isDelivery
                    ? 'bg-[#39FF14]/15 text-[#39FF14] border border-[#39FF14]/30'
                    : 'text-gray-500 hover:text-gray-300 border border-transparent'
                }`}
              >
                <Truck className="w-3 h-3" />
                Delivery
              </button>
              <button
                onClick={() => handleModeSwitch('wholesale')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  !isDelivery
                    ? 'bg-[#39FF14]/15 text-[#39FF14] border border-[#39FF14]/30'
                    : 'text-gray-500 hover:text-gray-300 border border-transparent'
                }`}
              >
                <Package className="w-3 h-3" />
                Wholesale
              </button>
            </div>

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
                  {isDelivery ? 'Menu' : 'Catalog'}
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
                className="hidden lg:inline-flex items-center gap-2 px-4 py-2 bg-[#39FF14] text-black text-sm font-bold rounded-lg hover:brightness-110 transition-all"
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
                {/* Mobile mode toggle */}
                <div className="flex items-center gap-2 mb-3 p-1 bg-white/[0.04] rounded-lg border border-white/[0.06]">
                  <button
                    onClick={() => { handleModeSwitch('delivery'); setMobileOpen(false) }}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-medium transition-all ${
                      isDelivery
                        ? 'bg-[#39FF14]/15 text-[#39FF14] border border-[#39FF14]/30'
                        : 'text-gray-500 border border-transparent'
                    }`}
                  >
                    <Truck className="w-3 h-3" />
                    Delivery
                  </button>
                  <button
                    onClick={() => { handleModeSwitch('wholesale'); setMobileOpen(false) }}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-medium transition-all ${
                      !isDelivery
                        ? 'bg-[#39FF14]/15 text-[#39FF14] border border-[#39FF14]/30'
                        : 'text-gray-500 border border-transparent'
                    }`}
                  >
                    <Package className="w-3 h-3" />
                    Wholesale
                  </button>
                </div>

                {[{ to: '/home', label: 'Home' }, { to: '/menu', label: isDelivery ? 'Menu' : 'Catalog' }, { to: '/about', label: 'About' }, { to: '/contact', label: 'Contact' }].map(l => (
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
