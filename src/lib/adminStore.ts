import { PRODUCTS, type Product } from '@/data/products'
import { WHOLESALE_PRODUCTS, type WholesaleProduct } from '@/data/wholesaleProducts'

const KEYS = {
  deliveryProducts: 'wct-admin-delivery-products',
  wholesaleProducts: 'wct-admin-wholesale-products',
  session: 'wct-admin-session',
} as const

// ── Auth ──

export function adminLogin(password: string): boolean {
  const expected = import.meta.env.VITE_ADMIN_PASS
  if (!expected || password !== expected) return false
  localStorage.setItem(
    KEYS.session,
    JSON.stringify({ token: crypto.randomUUID(), timestamp: Date.now() }),
  )
  return true
}

export function isAdminLoggedIn(): boolean {
  try {
    const raw = localStorage.getItem(KEYS.session)
    if (!raw) return false
    const session = JSON.parse(raw)
    const hoursSince = (Date.now() - session.timestamp) / 1000 / 60 / 60
    return hoursSince < 24
  } catch {
    return false
  }
}

export function adminLogout(): void {
  localStorage.removeItem(KEYS.session)
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
  try {
    const raw = localStorage.getItem(KEYS.wholesaleProducts)
    if (raw) return JSON.parse(raw) as WholesaleProduct[]
  } catch { /* fall through */ }
  return WHOLESALE_PRODUCTS
}

export function saveDeliveryProducts(products: Product[]): void {
  localStorage.setItem(KEYS.deliveryProducts, JSON.stringify(products))
}

export function saveWholesaleProducts(products: WholesaleProduct[]): void {
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
