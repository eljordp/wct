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

// ── Product Read/Write ──

export function getDeliveryProducts(): Product[] {
  try {
    const raw = localStorage.getItem(KEYS.deliveryProducts)
    if (raw) return JSON.parse(raw) as Product[]
  } catch { /* fall through */ }
  return PRODUCTS
}

export function getWholesaleProducts(): WholesaleProduct[] {
  let products: WholesaleProduct[]
  try {
    const raw = localStorage.getItem(KEYS.wholesaleProducts)
    products = raw ? JSON.parse(raw) as WholesaleProduct[] : WHOLESALE_PRODUCTS
  } catch { products = WHOLESALE_PRODUCTS }
  // Keep retail in sync with the base wholesale tier price
  for (const p of products) {
    if (p.wholesale.length) p.retail = p.wholesale[0].price
  }
  return products
}

export function saveDeliveryProducts(products: Product[]): void {
  localStorage.setItem(KEYS.deliveryProducts, JSON.stringify(products))
}

export function saveWholesaleProducts(products: WholesaleProduct[]): void {
  // Sync retail to base wholesale tier price before saving
  for (const p of products) {
    if (p.wholesale.length) p.retail = p.wholesale[0].price
  }
  localStorage.setItem(KEYS.wholesaleProducts, JSON.stringify(products))
}

export function resetDeliveryProducts(): void {
  localStorage.removeItem(KEYS.deliveryProducts)
}

export function resetWholesaleProducts(): void {
  localStorage.removeItem(KEYS.wholesaleProducts)
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
