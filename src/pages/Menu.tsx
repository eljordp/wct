import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { useCart } from '@/context/CartContext'
import { PRODUCTS, CATEGORIES, TERPENE_PROFILES, type TerpeneProfile, type Category } from '@/data/products'

const PROFILE_FILTERS: { name: TerpeneProfile | 'all'; label: string; color: string }[] = [
  { name: 'all', label: 'All', color: '#ffffff' },
  { name: 'relaxed', label: 'Relaxed', color: '#8B5CF6' },
  { name: 'euphoric', label: 'Euphoric', color: '#F59E0B' },
  { name: 'creative', label: 'Creative', color: '#EC4899' },
  { name: 'heavy', label: 'Heavy', color: '#10B981' },
]

export default function MenuPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [profile, setProfile] = useState<TerpeneProfile | 'all'>('all')
  const { addToCart } = useCart()

  const filtered = PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'all' || p.category === category
    const matchProfile = profile === 'all' || p.terpene_profile === profile
    return matchSearch && matchCategory && matchProfile && p.in_stock
  })

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Our Menu</h1>
          <p className="text-gray-400">Explore our curated menu filtered by terpene profiles. Find the perfect match for your needs.</p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/50 focus:border-[#39FF14]/50 transition-all"
          />
        </div>

        {/* Terpene profile filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <SlidersHorizontal className="w-4 h-4 text-[#39FF14]" />
            <span className="text-sm font-medium text-gray-300">Terpene Profile</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PROFILE_FILTERS.map(f => (
              <button
                key={f.name}
                onClick={() => setProfile(f.name)}
                className="px-4 py-2 rounded-xl text-sm font-medium border transition-all"
                style={{
                  borderColor: profile === f.name ? f.color : 'rgba(255,255,255,0.1)',
                  backgroundColor: profile === f.name ? `${f.color}10` : 'rgba(255,255,255,0.03)',
                  color: profile === f.name ? f.color : '#a3a3a3',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
          {profile !== 'all' && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs mt-2 ml-1"
              style={{ color: TERPENE_PROFILES[profile].color }}
            >
              {TERPENE_PROFILES[profile].description}
            </motion.p>
          )}
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => (
            <button
              key={c.value}
              onClick={() => setCategory(c.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                category === c.value
                  ? 'border-[#39FF14]/50 bg-[#39FF14]/5 text-[#39FF14]'
                  : 'border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                index={i}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-500">No products match your filters</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <p className="text-xs text-gray-600 text-center leading-relaxed">
            GOVERNMENT WARNING: THIS PRODUCT CONTAINS CANNABIS, A SCHEDULE I CONTROLLED SUBSTANCE. KEEP OUT OF REACH OF CHILDREN AND ANIMALS.
          </p>
        </div>
      </div>
    </div>
  )
}
