import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, Leaf, Package } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import WholesaleProductCard from '@/components/WholesaleProductCard'
import { useCart } from '@/context/CartContext'
import { useMode } from '@/context/ModeContext'
import { PRODUCTS, CATEGORIES, TERPENE_PROFILES, type TerpeneProfile, type Category } from '@/data/products'
import { WHOLESALE_PRODUCTS, WHOLESALE_CATEGORIES, type Strain, type WholesaleCategory } from '@/data/wholesaleProducts'

const PROFILE_FILTERS: { name: TerpeneProfile | 'all'; label: string; color: string }[] = [
  { name: 'all', label: 'All', color: '#ffffff' },
  { name: 'relaxed', label: 'Relaxed', color: '#8B5CF6' },
  { name: 'euphoric', label: 'Euphoric', color: '#F59E0B' },
  { name: 'creative', label: 'Creative', color: '#EC4899' },
  { name: 'heavy', label: 'Heavy', color: '#10B981' },
]

const STRAIN_FILTERS: { name: Strain | 'all'; label: string; color: string }[] = [
  { name: 'all', label: 'All', color: '#ffffff' },
  { name: 'indica', label: 'Indica', color: '#8B5CF6' },
  { name: 'sativa', label: 'Sativa', color: '#F59E0B' },
  { name: 'hybrid', label: 'Hybrid', color: '#10B981' },
]

export default function MenuPage() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category | WholesaleCategory | 'all'>('all')
  const [profile, setProfile] = useState<TerpeneProfile | 'all'>('all')
  const [strain, setStrain] = useState<Strain | 'all'>('all')
  const { addToCart, addWholesaleToCart } = useCart()
  const { isDelivery } = useMode()

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (isDelivery) {
      if (cat && CATEGORIES.some(c => c.value === cat)) setCategory(cat as Category)
    } else {
      if (cat && WHOLESALE_CATEGORIES.some(c => c.value === cat)) setCategory(cat as WholesaleCategory)
    }
    const prof = searchParams.get('profile')
    if (prof && Object.keys(TERPENE_PROFILES).includes(prof)) setProfile(prof as TerpeneProfile)
  }, [searchParams, isDelivery])

  // Reset filters when mode changes
  useEffect(() => {
    setCategory('all')
    setProfile('all')
    setStrain('all')
    setSearch('')
  }, [isDelivery])

  const filteredDelivery = PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'all' || p.category === category
    const matchProfile = profile === 'all' || p.terpene_profile === profile
    return matchSearch && matchCategory && matchProfile && p.in_stock
  })

  const filteredWholesale = WHOLESALE_PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'all' || p.category === category
    const matchStrain = strain === 'all' || p.strain === strain
    return matchSearch && matchCategory && matchStrain && p.in_stock
  })

  const filtered = isDelivery ? filteredDelivery : filteredWholesale

  return (
    <div className="min-h-screen pt-8 pb-16 px-4 grain">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            {isDelivery ? <Leaf className="w-6 h-6 text-[#39FF14]" /> : <Package className="w-6 h-6 text-[#39FF14]" />}
            <h1 className="text-3xl sm:text-4xl font-bold">{isDelivery ? 'Our Menu' : 'Wholesale Catalog'}</h1>
          </div>
          <p className="text-gray-500">
            {isDelivery
              ? 'Explore our curated menu filtered by terpene profiles. Find the perfect match for your vibe.'
              : 'Browse our full product line with tiered wholesale pricing. All prices shown are per unit.'}
          </p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#0e0e0e] border border-white/[0.06] text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/30 focus:border-[#39FF14]/30 transition-all text-sm"
          />
        </div>

        {/* Filter by terpene (delivery) or strain (wholesale) */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <SlidersHorizontal className="w-4 h-4 text-[#39FF14]" />
            <span className="text-sm font-medium text-gray-400">
              {isDelivery ? 'Terpene Profile' : 'Strain Type'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {isDelivery
              ? PROFILE_FILTERS.map(f => (
                  <button
                    key={f.name}
                    onClick={() => setProfile(f.name)}
                    className="px-4 py-2 rounded-xl text-sm font-medium border transition-all"
                    style={{
                      borderColor: profile === f.name ? `${f.color}60` : 'rgba(255,255,255,0.06)',
                      backgroundColor: profile === f.name ? `${f.color}12` : 'rgba(255,255,255,0.02)',
                      color: profile === f.name ? f.color : '#6b7280',
                    }}
                  >
                    {f.label}
                  </button>
                ))
              : STRAIN_FILTERS.map(f => (
                  <button
                    key={f.name}
                    onClick={() => setStrain(f.name)}
                    className="px-4 py-2 rounded-xl text-sm font-medium border transition-all"
                    style={{
                      borderColor: strain === f.name ? `${f.color}60` : 'rgba(255,255,255,0.06)',
                      backgroundColor: strain === f.name ? `${f.color}12` : 'rgba(255,255,255,0.02)',
                      color: strain === f.name ? f.color : '#6b7280',
                    }}
                  >
                    {f.label}
                  </button>
                ))
            }
          </div>
          {isDelivery && profile !== 'all' && (
            <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-xs mt-2 ml-1" style={{ color: TERPENE_PROFILES[profile].color }}>
              {TERPENE_PROFILES[profile].description}
            </motion.p>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(isDelivery ? CATEGORIES : WHOLESALE_CATEGORIES).map(c => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                category === c.value
                  ? 'border-[#39FF14]/40 bg-[#39FF14]/8 text-[#39FF14]'
                  : 'border-white/[0.06] bg-white/[0.02] text-gray-500 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <span className="text-sm text-gray-600">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {isDelivery
              ? filteredDelivery.map((product, i) => (
                  <ProductCard key={product.id} product={product} index={i} onAddToCart={addToCart} />
                ))
              : filteredWholesale.map((product, i) => (
                  <WholesaleProductCard key={product.id} product={product} index={i} onAddToCart={addWholesaleToCart} />
                ))
            }
          </div>
        ) : (
          <div className="text-center py-20">
            {isDelivery ? <Leaf className="w-12 h-12 text-gray-700 mx-auto mb-4" /> : <Package className="w-12 h-12 text-gray-700 mx-auto mb-4" />}
            <p className="text-gray-500 mb-2">No products match your filters</p>
            <button onClick={() => { setSearch(''); setCategory('all'); setProfile('all'); setStrain('all') }} className="text-sm text-[#39FF14] hover:underline">Clear filters</button>
          </div>
        )}

        <div className="mt-16 pt-8 border-t border-white/[0.04]">
          <p className="text-[11px] text-gray-700 text-center leading-relaxed">
            {isDelivery
              ? 'Licensed cannabis delivery. Must be 21+ with valid ID. Delivery from Santa Barbara to La Jolla.'
              : 'All products comply with the 2018 Farm Bill and contain less than 0.3% Delta-9 THC. Wholesale accounts only. Must be 21+ to purchase.'}
          </p>
        </div>
      </div>
    </div>
  )
}
