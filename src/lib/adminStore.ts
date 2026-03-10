import { supabase } from '@/lib/supabase'
import { PRODUCTS, type Product } from '@/data/products'
import { WHOLESALE_PRODUCTS, type WholesaleProduct } from '@/data/wholesaleProducts'

const KEYS = {
  deliveryProducts: 'wct-admin-delivery-products',
  wholesaleProducts: 'wct-admin-wholesale-products',
} as const

// ── Auth (Supabase) ──

export async function adminLogin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function isAdminLoggedIn(): Promise<boolean> {
  const { data: { session } } = await supabase.auth.getSession()
  return session !== null
}

export async function adminLogout(): Promise<void> {
  await supabase.auth.signOut()
}

// ── DB ↔ TypeScript mapping ──

function wholesaleToDb(p: WholesaleProduct) {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    strain: p.strain,
    retail: p.retail,
    wholesale: p.wholesale,
    thc: p.thc,
    description: p.description,
    image_url: p.image_url,
    in_stock: p.in_stock,
    badge: p.badge || null,
    min_order: p.minOrder,
    brand: p.brand || null,
  }
}

function wholesaleFromDb(row: Record<string, unknown>): WholesaleProduct {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as WholesaleProduct['category'],
    strain: row.strain as WholesaleProduct['strain'],
    retail: Number(row.retail),
    wholesale: row.wholesale as WholesaleProduct['wholesale'],
    thc: row.thc as string,
    description: row.description as string,
    image_url: row.image_url as string,
    in_stock: row.in_stock as boolean,
    badge: (row.badge as string) || undefined,
    minOrder: Number(row.min_order),
    brand: (row.brand as string) || undefined,
  }
}

function deliveryToDb(p: Product) {
  return {
    id: p.id,
    name: p.name,
    category: p.category,
    terpene_profile: p.terpene_profile,
    price: p.price,
    thc: p.thc,
    description: p.description,
    image_url: p.image_url || null,
    in_stock: p.in_stock,
    badge: p.badge || null,
    weights: p.weights || null,
    quantity_pricing: p.quantityPricing || null,
    flavors: p.flavors || null,
    brand: p.brand || null,
    max_quantity: p.maxQuantity || null,
  }
}

function deliveryFromDb(row: Record<string, unknown>): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as Product['category'],
    terpene_profile: row.terpene_profile as Product['terpene_profile'],
    price: Number(row.price),
    thc: row.thc as string,
    description: row.description as string,
    image_url: (row.image_url as string) || undefined,
    in_stock: row.in_stock as boolean,
    badge: (row.badge as string) || undefined,
    weights: (row.weights as Product['weights']) || undefined,
    quantityPricing: (row.quantity_pricing as Product['quantityPricing']) || undefined,
    flavors: (row.flavors as Product['flavors']) || undefined,
    brand: (row.brand as string) || undefined,
    maxQuantity: (row.max_quantity as number) || undefined,
  }
}

// ── Product Read (synchronous — localStorage cache) ──

export function getDeliveryProducts(): Product[] {
  try {
    const raw = localStorage.getItem(KEYS.deliveryProducts)
    if (raw) return JSON.parse(raw) as Product[]
  } catch { /* fall through */ }
  return PRODUCTS
}

export function getWholesaleProducts(): WholesaleProduct[] {
  try {
    const raw = localStorage.getItem(KEYS.wholesaleProducts)
    if (raw) return JSON.parse(raw) as WholesaleProduct[]
  } catch { /* fall through */ }
  return WHOLESALE_PRODUCTS
}

// ── Product Write (localStorage + Supabase) ──

export async function saveDeliveryProducts(products: Product[]): Promise<void> {
  localStorage.setItem(KEYS.deliveryProducts, JSON.stringify(products))
  try {
    const rows = products.map(deliveryToDb)
    await supabase.from('delivery_products').upsert(rows, { onConflict: 'id' })
  } catch { /* Supabase write failed, localStorage is still updated */ }
}

export async function saveWholesaleProducts(products: WholesaleProduct[]): Promise<void> {
  localStorage.setItem(KEYS.wholesaleProducts, JSON.stringify(products))
  try {
    const rows = products.map(wholesaleToDb)
    await supabase.from('wholesale_products').upsert(rows, { onConflict: 'id' })
  } catch { /* Supabase write failed, localStorage is still updated */ }
}

export function resetDeliveryProducts(): void {
  localStorage.removeItem(KEYS.deliveryProducts)
}

export function resetWholesaleProducts(): void {
  localStorage.removeItem(KEYS.wholesaleProducts)
}

// ── Supabase Sync (background — pull DB into localStorage cache) ──

export async function syncFromSupabase(): Promise<void> {
  try {
    const [{ data: wholesale }, { data: delivery }] = await Promise.all([
      supabase.from('wholesale_products').select('*'),
      supabase.from('delivery_products').select('*'),
    ])
    if (wholesale && wholesale.length > 0) {
      const products = wholesale.map(wholesaleFromDb)
      localStorage.setItem(KEYS.wholesaleProducts, JSON.stringify(products))
    }
    if (delivery && delivery.length > 0) {
      const products = delivery.map(deliveryFromDb)
      localStorage.setItem(KEYS.deliveryProducts, JSON.stringify(products))
    }
  } catch { /* offline — use localStorage cache */ }
}

// ── Seed Supabase (push static data to empty DB) ──

export async function seedSupabase(): Promise<{ wholesale: boolean; delivery: boolean }> {
  const result = { wholesale: false, delivery: false }
  try {
    // Only seed if tables are empty
    const { data: existingW } = await supabase.from('wholesale_products').select('id').limit(1)
    if (!existingW || existingW.length === 0) {
      const rows = WHOLESALE_PRODUCTS.map(wholesaleToDb)
      const { error } = await supabase.from('wholesale_products').insert(rows)
      result.wholesale = !error
    } else {
      result.wholesale = true // already has data
    }

    const { data: existingD } = await supabase.from('delivery_products').select('id').limit(1)
    if (!existingD || existingD.length === 0) {
      const rows = PRODUCTS.map(deliveryToDb)
      const { error } = await supabase.from('delivery_products').insert(rows)
      result.delivery = !error
    } else {
      result.delivery = true
    }
  } catch { /* failed */ }
  return result
}

// ── Orders ──

export async function submitOrder(order: {
  orderNumber: string
  mode: 'delivery' | 'wholesale'
  customerName: string
  customerEmail: string
  customerPhone: string
  address: string
  city: string
  zip: string
  deliveryWindow?: string
  deliveryNotes?: string
  paymentMethod: string
  subtotal: number
  total: number
  items: unknown[]
}): Promise<{ success: boolean; error?: string }> {
  const { error } = await supabase.from('orders').insert({
    order_number: order.orderNumber,
    mode: order.mode,
    status: 'pending',
    customer_name: order.customerName,
    customer_email: order.customerEmail,
    customer_phone: order.customerPhone,
    address: order.address,
    city: order.city,
    zip: order.zip,
    delivery_window: order.deliveryWindow || null,
    delivery_notes: order.deliveryNotes || null,
    payment_method: order.paymentMethod,
    subtotal: order.subtotal,
    total: order.total,
    items: order.items,
  })
  if (error) return { success: false, error: error.message }
  return { success: true }
}

export async function getOrders(): Promise<Record<string, unknown>[]> {
  const { data } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
  return data || []
}

// ── Image Compression ──

export function compressImage(file: File, maxWidth = 800, quality = 0.7): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let { width, height } = img
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')!
        ctx.drawImage(img, 0, 0, width, height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.onerror = reject
      img.src = reader.result as string
    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// ── Storage Usage ──

export function getStorageUsage(): { usedKB: number; percentLabel: string } {
  let total = 0
  for (const key of Object.values(KEYS)) {
    const val = localStorage.getItem(key)
    if (val) total += val.length * 2 // UTF-16 = 2 bytes per char
  }
  const usedKB = Math.round(total / 1024)
  const limitKB = 5120 // ~5MB conservative
  const pct = Math.round((usedKB / limitKB) * 100)
  return { usedKB, percentLabel: `${usedKB.toLocaleString()} KB / 5 MB (${pct}%)` }
}
