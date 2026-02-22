import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, Package } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { useCart } from '@/context/CartContext'
import { PRODUCTS, CATEGORIES, type Strain, type Category } from '@/data/products'

const STRAIN_FILTERS: { name: Strain | 'all'; label: string; color: string }[] = [
  { name: 'all', label: 'All', color: '#ffffff' },
  { name: 'indica', label: 'Indica', color: '#8B5CF6' },
  { name: 'sativa', label: 'Sativa', color: '#F59E0B' },
  { name: 'hybrid', label: 'Hybrid', color: '#10B981' },
]

export default function ShopPage() {
  const [searchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<Category | 'all'>('all')
  const [strain, setStrain] = useState<Strain | 'all'>('all')
  const { addToCart } = useCart()

  useEffect(() => {
    const cat = searchParams.get('cat')
    if (cat && CATEGORIES.some(c => c.value === cat)) {
      setCategory(cat as Category)
    }
  }, [searchParams])

  const filtered = PRODUCTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchCategory = category === 'all' || p.category === category
    const matchStrain = strain === 'all' || p.strain === strain
    return matchSearch && matchCategory && matchStrain && p.in_stock
  })

  return (
    <div className="min-h-screen pt-8 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <Package className="w-6 h-6 text-[#39FF14]" />
            <h1 className="text-3xl sm:text-4xl font-bold">Wholesale Catalog</h1>
          </div>
          <p className="text-gray-400">Browse our full product line with tiered wholesale pricing. All prices shown are per unit.</p>
        </motion.div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-[#141414] border border-white/8 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/50 focus:border-[#39FF14]/50 transition-all"
          />
        </div>

        {/* Strain filter */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <SlidersHorizontal className="w-4 h-4 text-[#39FF14]" />
            <span className="text-sm font-medium text-gray-300">Strain Type</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {STRAIN_FILTERS.map(f => (
              <button
                key={f.name}
                onClick={() => setStrain(f.name)}
                className="px-4 py-2 rounded-xl text-sm font-medium border transition-all"
                style={{
                  borderColor: strain === f.name ? f.color : 'rgba(255,255,255,0.08)',
                  backgroundColor: strain === f.name ? `${f.color}10` : 'rgba(255,255,255,0.03)',
                  color: strain === f.name ? f.color : '#a3a3a3',
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
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
                  : 'border-white/8 bg-white/3 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <div className="mb-6">
          <span className="text-sm text-gray-500">{filtered.length} product{filtered.length !== 1 ? 's' : ''}</span>
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
            <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No products match your filters</p>
            <button
              onClick={() => { setSearch(''); setCategory('all'); setStrain('all') }}
              className="text-sm text-[#39FF14] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-16 pt-8 border-t border-white/8">
          <p className="text-xs text-gray-600 text-center leading-relaxed">
            All products comply with the 2018 Farm Bill and contain less than 0.3% Delta-9 THC. Wholesale accounts only. Must be 21+ to purchase. Prices and availability subject to change.
          </p>
        </div>
      </div>
    </div>
  )
}
