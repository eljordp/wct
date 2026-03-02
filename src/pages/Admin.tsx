import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Lock, LogOut, ArrowLeft, Save, RotateCcw, Plus, Trash2,
  Upload, X, ChevronDown, ChevronUp, Package, Leaf, AlertTriangle,
  Check,
} from 'lucide-react'
import type { Product, Category, TerpeneProfile, WeightOption } from '@/data/products'
import type { WholesaleProduct, WholesaleCategory, Strain, WholesaleTier } from '@/data/wholesaleProducts'
import {
  adminLogin, isAdminLoggedIn, adminLogout,
  getDeliveryProducts, getWholesaleProducts,
  saveDeliveryProducts, saveWholesaleProducts,
  resetDeliveryProducts, resetWholesaleProducts,
  compressImage, getStorageUsage,
} from '@/lib/adminStore'

// ── Styles ──

const inputClass =
  'w-full px-3 py-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#39FF14]/30 focus:border-[#39FF14]/30 transition-all'
const labelClass = 'block text-xs text-gray-500 mb-1'
const btnGreen =
  'inline-flex items-center gap-2 px-6 py-3 bg-[#39FF14] text-black font-bold rounded-xl hover:brightness-110 transition-all text-sm'
const btnGray =
  'inline-flex items-center gap-2 px-5 py-2.5 bg-white/[0.04] border border-white/[0.08] text-gray-400 rounded-xl hover:text-white hover:bg-white/[0.08] transition-all text-sm'

// ── Login Component ──

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminLogin(password)) {
      onLogin()
    } else {
      setError(true)
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#050505]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="p-8 rounded-2xl bg-[#0a0a0a] border border-white/[0.06]">
          <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#39FF14]/50 to-transparent -mt-8 mb-8 rounded-full" />
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#39FF14]/[0.08] border border-[#39FF14]/15 flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#39FF14]" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Admin Login</h1>
              <p className="text-xs text-gray-500">West Coast Terpz</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError(false) }}
              className={inputClass}
              placeholder="Enter admin password"
              autoFocus
            />
            {error && <p className="text-red-400 text-xs mt-2">Wrong password</p>}
            <button type="submit" className={`${btnGreen} w-full justify-center mt-4`}>
              <Lock className="w-4 h-4" /> Enter
            </button>
          </form>
        </div>
        <Link to="/home" className="flex items-center justify-center gap-2 text-xs text-gray-600 mt-4 hover:text-gray-400 transition-colors">
          <ArrowLeft className="w-3 h-3" /> Back to site
        </Link>
      </motion.div>
    </div>
  )
}

// ── Image Upload ──

function ImageUpload({ value, onChange }: { value?: string; onChange: (url: string | undefined) => void }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    try {
      const dataUrl = await compressImage(file)
      onChange(dataUrl)
    } catch {
      // ignore
    } finally {
      setLoading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <div>
      <label className={labelClass}>Product Image</label>
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
      {value ? (
        <div className="relative w-full h-32 rounded-lg overflow-hidden border border-white/[0.06]">
          <img src={value} alt="" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/70 border border-white/10 flex items-center justify-center text-white hover:bg-red-500/80 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={loading}
          className="w-full h-24 rounded-lg border-2 border-dashed border-white/[0.08] flex flex-col items-center justify-center gap-1.5 text-gray-500 hover:border-[#39FF14]/20 hover:text-gray-400 transition-all"
        >
          <Upload className="w-5 h-5" />
          <span className="text-xs">{loading ? 'Compressing...' : 'Upload image'}</span>
        </button>
      )}
    </div>
  )
}

// ── Toggle Switch ──

function Toggle({ value, onChange, label }: { value: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`relative w-10 h-5 rounded-full transition-colors ${value ? 'bg-[#39FF14]/40' : 'bg-white/[0.08]'}`}
      >
        <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-all ${value ? 'translate-x-5 bg-[#39FF14]' : 'bg-gray-500'}`} />
      </button>
      <span className="text-xs text-gray-400">{label}</span>
    </label>
  )
}

// ── Delivery Product Editor ──

function DeliveryEditor({
  product,
  onChange,
  onDelete,
}: {
  product: Product
  onChange: (p: Product) => void
  onDelete: () => void
}) {
  const [open, setOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const update = (fields: Partial<Product>) => onChange({ ...product, ...fields })

  return (
    <div className="rounded-xl bg-[#0e0e0e] border border-white/[0.06] overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          {product.image_url ? (
            <img src={product.image_url} alt="" className="w-8 h-8 rounded object-cover" />
          ) : (
            <div className="w-8 h-8 rounded bg-white/[0.04] flex items-center justify-center">
              <Leaf className="w-4 h-4 text-gray-600" />
            </div>
          )}
          <div className="text-left">
            <span className="text-sm font-medium">{product.name || 'Untitled'}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-600">{product.category} &bull; {product.terpene_profile}</span>
              {!product.in_stock && <span className="text-[10px] text-red-400">Out of stock</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#39FF14] font-medium">${product.price}</span>
          {open ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </div>
      </button>

      {/* Body */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 space-y-4 border-t border-white/[0.04]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Name *</label>
                  <input className={inputClass} value={product.name} onChange={e => update({ name: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>ID</label>
                  <input className={inputClass} value={product.id} onChange={e => update({ id: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>Category</label>
                  <select className={inputClass} value={product.category} onChange={e => update({ category: e.target.value as Category })}>
                    <option value="flower" className="bg-[#0e0e0e]">Flower</option>
                    <option value="vapes" className="bg-[#0e0e0e]">Vapes</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Terpene Profile</label>
                  <select className={inputClass} value={product.terpene_profile} onChange={e => update({ terpene_profile: e.target.value as TerpeneProfile })}>
                    <option value="relaxed" className="bg-[#0e0e0e]">Relaxed</option>
                    <option value="euphoric" className="bg-[#0e0e0e]">Euphoric</option>
                    <option value="creative" className="bg-[#0e0e0e]">Creative</option>
                    <option value="heavy" className="bg-[#0e0e0e]">Heavy</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Base Price ($)</label>
                  <input className={inputClass} type="number" value={product.price} onChange={e => update({ price: Number(e.target.value) })} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>THC %</label>
                  <input className={inputClass} value={product.thc} onChange={e => update({ thc: e.target.value })} placeholder="28%+" />
                </div>
                <div>
                  <label className={labelClass}>Badge</label>
                  <input className={inputClass} value={product.badge || ''} onChange={e => update({ badge: e.target.value || undefined })} placeholder="Best Seller" />
                </div>
                <div>
                  <label className={labelClass}>Max Qty</label>
                  <input className={inputClass} type="number" value={product.maxQuantity || ''} onChange={e => update({ maxQuantity: e.target.value ? Number(e.target.value) : undefined })} placeholder="No limit" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={3}
                  value={product.description}
                  onChange={e => update({ description: e.target.value })}
                />
              </div>

              {/* Weight Prices */}
              {product.category === 'flower' && (
                <div>
                  <label className={labelClass}>Weight Prices</label>
                  <div className="grid grid-cols-4 gap-2">
                    {(['eighth', 'q', 'h', 'oz'] as WeightOption[]).map(w => (
                      <div key={w}>
                        <span className="text-[10px] text-gray-600 block mb-1">
                          {w === 'eighth' ? '⅛ oz' : w === 'q' ? '¼ oz' : w === 'h' ? '½ oz' : '1 oz'}
                        </span>
                        <input
                          className={inputClass}
                          type="number"
                          value={product.weights?.[w] ?? ''}
                          onChange={e => {
                            const weights = { ...(product.weights || { eighth: 0, q: 0, h: 0, oz: 0 }), [w]: Number(e.target.value) }
                            update({ weights })
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Brand</label>
                  <input className={inputClass} value={product.brand || ''} onChange={e => update({ brand: e.target.value || undefined })} placeholder="Optional" />
                </div>
                <div className="flex items-end pb-1">
                  <Toggle value={product.in_stock} onChange={v => update({ in_stock: v })} label="In Stock" />
                </div>
              </div>

              <ImageUpload value={product.image_url} onChange={url => update({ image_url: url })} />

              {/* Delete */}
              <div className="pt-2 border-t border-white/[0.04]">
                {confirmDelete ? (
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-red-400">Delete this product?</span>
                    <button type="button" onClick={onDelete} className="text-xs text-red-400 font-medium hover:text-red-300">Yes, delete</button>
                    <button type="button" onClick={() => setConfirmDelete(false)} className="text-xs text-gray-500 hover:text-gray-300">Cancel</button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setConfirmDelete(true)} className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> Delete product
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Wholesale Product Editor ──

function WholesaleEditor({
  product,
  onChange,
  onDelete,
}: {
  product: WholesaleProduct
  onChange: (p: WholesaleProduct) => void
  onDelete: () => void
}) {
  const [open, setOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const update = (fields: Partial<WholesaleProduct>) => onChange({ ...product, ...fields })

  const updateTier = (i: number, fields: Partial<WholesaleTier>) => {
    const tiers = product.wholesale.map((t, j) => (j === i ? { ...t, ...fields } : t))
    update({ wholesale: tiers })
  }

  const addTier = () => {
    update({ wholesale: [...product.wholesale, { minQty: 100, price: 10, label: '100+ units' }] })
  }

  const removeTier = (i: number) => {
    update({ wholesale: product.wholesale.filter((_, j) => j !== i) })
  }

  return (
    <div className="rounded-xl bg-[#0e0e0e] border border-white/[0.06] overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex items-center gap-3">
          {product.image_url ? (
            <img src={product.image_url} alt="" className="w-8 h-8 rounded object-cover" />
          ) : (
            <div className="w-8 h-8 rounded bg-white/[0.04] flex items-center justify-center">
              <Package className="w-4 h-4 text-gray-600" />
            </div>
          )}
          <div className="text-left">
            <span className="text-sm font-medium">{product.name || 'Untitled'}</span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-gray-600">{product.category} &bull; {product.strain}</span>
              {!product.in_stock && <span className="text-[10px] text-red-400">Out of stock</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#39FF14] font-medium">${product.retail}</span>
          {open ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
        </div>
      </button>

      {/* Body */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 space-y-4 border-t border-white/[0.04]">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Name *</label>
                  <input className={inputClass} value={product.name} onChange={e => update({ name: e.target.value })} />
                </div>
                <div>
                  <label className={labelClass}>ID</label>
                  <input className={inputClass} value={product.id} onChange={e => update({ id: e.target.value })} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>Category</label>
                  <select className={inputClass} value={product.category} onChange={e => update({ category: e.target.value as WholesaleCategory })}>
                    <option value="flower" className="bg-[#0e0e0e]">Flower</option>
                    <option value="vapes" className="bg-[#0e0e0e]">Vapes</option>
                    <option value="edibles" className="bg-[#0e0e0e]">Edibles</option>
                    <option value="concentrates" className="bg-[#0e0e0e]">Concentrates</option>
                    <option value="pre-rolls" className="bg-[#0e0e0e]">Pre-Rolls</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Strain</label>
                  <select className={inputClass} value={product.strain} onChange={e => update({ strain: e.target.value as Strain })}>
                    <option value="indica" className="bg-[#0e0e0e]">Indica</option>
                    <option value="sativa" className="bg-[#0e0e0e]">Sativa</option>
                    <option value="hybrid" className="bg-[#0e0e0e]">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Retail Price ($)</label>
                  <input className={inputClass} type="number" value={product.retail} onChange={e => update({ retail: Number(e.target.value) })} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className={labelClass}>THC</label>
                  <input className={inputClass} value={product.thc} onChange={e => update({ thc: e.target.value })} placeholder="28%" />
                </div>
                <div>
                  <label className={labelClass}>Badge</label>
                  <input className={inputClass} value={product.badge || ''} onChange={e => update({ badge: e.target.value || undefined })} placeholder="Best Seller" />
                </div>
                <div>
                  <label className={labelClass}>Min Order</label>
                  <input className={inputClass} type="number" value={product.minOrder} onChange={e => update({ minOrder: Number(e.target.value) })} />
                </div>
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  className={`${inputClass} resize-none`}
                  rows={3}
                  value={product.description}
                  onChange={e => update({ description: e.target.value })}
                />
              </div>

              {/* Wholesale Tiers */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={labelClass}>Wholesale Tiers</label>
                  <button type="button" onClick={addTier} className="text-[10px] text-[#39FF14] hover:underline">+ Add tier</button>
                </div>
                <div className="space-y-2">
                  {product.wholesale.map((tier, i) => (
                    <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-end">
                      <div>
                        <span className="text-[10px] text-gray-600 block mb-1">Min Qty</span>
                        <input className={inputClass} type="number" value={tier.minQty} onChange={e => updateTier(i, { minQty: Number(e.target.value) })} />
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-600 block mb-1">Price ($)</span>
                        <input className={inputClass} type="number" step="0.01" value={tier.price} onChange={e => updateTier(i, { price: Number(e.target.value) })} />
                      </div>
                      <div>
                        <span className="text-[10px] text-gray-600 block mb-1">Label</span>
                        <input className={inputClass} value={tier.label} onChange={e => updateTier(i, { label: e.target.value })} />
                      </div>
                      <button type="button" onClick={() => removeTier(i)} className="w-8 h-[38px] flex items-center justify-center text-gray-600 hover:text-red-400 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-end gap-4">
                <Toggle value={product.in_stock} onChange={v => update({ in_stock: v })} label="In Stock" />
              </div>

              <ImageUpload value={product.image_url || undefined} onChange={url => update({ image_url: url || '' })} />

              {/* Delete */}
              <div className="pt-2 border-t border-white/[0.04]">
                {confirmDelete ? (
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-red-400">Delete this product?</span>
                    <button type="button" onClick={onDelete} className="text-xs text-red-400 font-medium hover:text-red-300">Yes, delete</button>
                    <button type="button" onClick={() => setConfirmDelete(false)} className="text-xs text-gray-500 hover:text-gray-300">Cancel</button>
                  </div>
                ) : (
                  <button type="button" onClick={() => setConfirmDelete(true)} className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" /> Delete product
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main Admin Page ──

type Tab = 'delivery' | 'wholesale'

export default function Admin() {
  const [loggedIn, setLoggedIn] = useState(isAdminLoggedIn)
  const [tab, setTab] = useState<Tab>('delivery')
  const [delivery, setDelivery] = useState<Product[]>([])
  const [wholesale, setWholesale] = useState<WholesaleProduct[]>([])
  const [dirty, setDirty] = useState(false)
  const [saved, setSaved] = useState(false)
  const [confirmReset, setConfirmReset] = useState(false)
  const [storage, setStorage] = useState(getStorageUsage())

  useEffect(() => {
    if (loggedIn) {
      setDelivery(getDeliveryProducts())
      setWholesale(getWholesaleProducts())
    }
  }, [loggedIn])

  const markDirty = () => { setDirty(true); setSaved(false) }

  const handleSave = () => {
    saveDeliveryProducts(delivery)
    saveWholesaleProducts(wholesale)
    setDirty(false)
    setSaved(true)
    setStorage(getStorageUsage())
    setTimeout(() => setSaved(false), 2500)
  }

  const handleReset = () => {
    resetDeliveryProducts()
    resetWholesaleProducts()
    setDelivery(getDeliveryProducts())
    setWholesale(getWholesaleProducts())
    setDirty(false)
    setConfirmReset(false)
    setStorage(getStorageUsage())
  }

  const handleLogout = () => {
    adminLogout()
    setLoggedIn(false)
  }

  // Delivery product handlers
  const updateDeliveryProduct = (i: number, p: Product) => {
    setDelivery(prev => prev.map((item, j) => (j === i ? p : item)))
    markDirty()
  }

  const deleteDeliveryProduct = (i: number) => {
    setDelivery(prev => prev.filter((_, j) => j !== i))
    markDirty()
  }

  const addDeliveryProduct = () => {
    const newProduct: Product = {
      id: `new-${Date.now()}`,
      name: 'New Product',
      category: 'flower',
      terpene_profile: 'relaxed',
      price: 0,
      thc: '',
      description: '',
      in_stock: true,
      weights: { eighth: 0, q: 0, h: 0, oz: 0 },
    }
    setDelivery(prev => [...prev, newProduct])
    markDirty()
  }

  // Wholesale product handlers
  const updateWholesaleProduct = (i: number, p: WholesaleProduct) => {
    setWholesale(prev => prev.map((item, j) => (j === i ? p : item)))
    markDirty()
  }

  const deleteWholesaleProduct = (i: number) => {
    setWholesale(prev => prev.filter((_, j) => j !== i))
    markDirty()
  }

  const addWholesaleProduct = () => {
    const newProduct: WholesaleProduct = {
      id: `w-${Date.now()}`,
      name: 'New Product',
      category: 'flower',
      strain: 'hybrid',
      retail: 0,
      wholesale: [
        { minQty: 10, price: 0, label: '10+ units' },
        { minQty: 50, price: 0, label: '50+ units' },
        { minQty: 100, price: 0, label: '100+ units' },
      ],
      thc: '',
      description: '',
      image_url: '',
      in_stock: true,
      minOrder: 10,
    }
    setWholesale(prev => [...prev, newProduct])
    markDirty()
  }

  // Warn before leaving with unsaved changes
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (dirty) e.preventDefault()
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [dirty])

  if (!loggedIn) return <LoginForm onLogin={() => setLoggedIn(true)} />

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Toast */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#39FF14]/15 border border-[#39FF14]/30 text-[#39FF14] text-sm font-medium"
          >
            <Check className="w-4 h-4" /> Changes saved
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top Bar */}
      <div className="sticky top-0 z-40 bg-[#050505]/95 backdrop-blur border-b border-white/[0.04]">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#39FF14]/[0.08] border border-[#39FF14]/15 flex items-center justify-center">
              <Lock className="w-4 h-4 text-[#39FF14]" />
            </div>
            <div>
              <h1 className="font-bold text-sm">Admin Dashboard</h1>
              <span className="text-[10px] text-gray-600">{storage.percentLabel}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/home" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5 inline mr-1" />Back to site
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-400 transition-colors">
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setTab('delivery')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all ${
              tab === 'delivery'
                ? 'border-[#39FF14]/40 bg-[#39FF14]/8 text-[#39FF14]'
                : 'border-white/[0.06] bg-white/[0.02] text-gray-500 hover:text-white'
            }`}
          >
            <Leaf className="w-4 h-4" />
            Delivery ({delivery.length})
          </button>
          <button
            onClick={() => setTab('wholesale')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium border transition-all ${
              tab === 'wholesale'
                ? 'border-[#39FF14]/40 bg-[#39FF14]/8 text-[#39FF14]'
                : 'border-white/[0.06] bg-white/[0.02] text-gray-500 hover:text-white'
            }`}
          >
            <Package className="w-4 h-4" />
            Wholesale ({wholesale.length})
          </button>
        </div>

        {/* Product List */}
        <div className="space-y-3 mb-8">
          {tab === 'delivery'
            ? delivery.map((p, i) => (
                <DeliveryEditor
                  key={p.id}
                  product={p}
                  onChange={updated => updateDeliveryProduct(i, updated)}
                  onDelete={() => deleteDeliveryProduct(i)}
                />
              ))
            : wholesale.map((p, i) => (
                <WholesaleEditor
                  key={p.id}
                  product={p}
                  onChange={updated => updateWholesaleProduct(i, updated)}
                  onDelete={() => deleteWholesaleProduct(i)}
                />
              ))
          }
        </div>

        {/* Add Product */}
        <button
          type="button"
          onClick={tab === 'delivery' ? addDeliveryProduct : addWholesaleProduct}
          className={`${btnGray} w-full justify-center mb-10`}
        >
          <Plus className="w-4 h-4" /> Add {tab === 'delivery' ? 'Delivery' : 'Wholesale'} Product
        </button>

        {/* Bottom Actions */}
        <div className="sticky bottom-0 bg-[#050505]/95 backdrop-blur border-t border-white/[0.04] -mx-4 px-4 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={handleSave} disabled={!dirty} className={`${btnGreen} ${!dirty ? 'opacity-40 cursor-not-allowed' : ''}`}>
                <Save className="w-4 h-4" /> Save Changes
                {dirty && <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />}
              </button>
              {confirmReset ? (
                <div className="flex items-center gap-2 ml-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-xs text-yellow-400">Reset all to defaults?</span>
                  <button onClick={handleReset} className="text-xs text-red-400 font-medium hover:text-red-300">Yes</button>
                  <button onClick={() => setConfirmReset(false)} className="text-xs text-gray-500 hover:text-gray-300">No</button>
                </div>
              ) : (
                <button onClick={() => setConfirmReset(true)} className={btnGray}>
                  <RotateCcw className="w-4 h-4" /> Reset to Defaults
                </button>
              )}
            </div>
            {dirty && <span className="text-xs text-yellow-400">Unsaved changes</span>}
          </div>
        </div>
      </div>
    </div>
  )
}
