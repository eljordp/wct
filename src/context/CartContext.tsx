import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Product, WeightOption } from '@/data/products'
import type { WholesaleProduct } from '@/data/wholesaleProducts'
import { getWholesaleUnitPrice } from '@/data/wholesaleProducts'

export interface CartItem {
  // Delivery items
  product?: Product
  weight?: WeightOption
  flavor?: string
  // Wholesale items
  wholesaleProduct?: WholesaleProduct
  // Common
  quantity: number
  mode: 'delivery' | 'wholesale'
}

function getItemKey(item: CartItem): string {
  if (item.mode === 'wholesale' && item.wholesaleProduct) {
    return `w-${item.wholesaleProduct.id}`
  }
  const parts = [item.product?.id ?? 'unknown']
  if (item.flavor) parts.push(item.flavor)
  if (item.weight) parts.push(item.weight)
  return parts.join('-')
}

export function getItemPrice(item: CartItem): number {
  if (item.mode === 'wholesale' && item.wholesaleProduct) {
    return getWholesaleUnitPrice(item.wholesaleProduct, item.quantity)
  }
  if (item.product && item.weight && item.product.weights) {
    return item.product.weights[item.weight]
  }
  return item.product?.price ?? 0
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, quantity?: number, weight?: WeightOption, flavor?: string) => void
  addWholesaleToCart: (product: WholesaleProduct) => void
  removeFromCart: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void
  clearCart: () => void
  clearMode: (mode: 'delivery' | 'wholesale') => void
  total: number
  itemCount: number
  getKey: (item: CartItem) => string
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (product: Product, quantity: number = 1, weight?: WeightOption, flavor?: string) => {
    setItems(prev => {
      const newItem: CartItem = { product, quantity, weight, flavor, mode: 'delivery' }
      const key = getItemKey(newItem)
      const existing = prev.find(i => getItemKey(i) === key)
      if (existing) {
        const max = product.maxQuantity
        return prev.map(i => {
          if (getItemKey(i) !== key) return i
          const newQty = i.quantity + quantity
          return { ...i, quantity: max ? Math.min(newQty, max) : newQty }
        })
      }
      const max = product.maxQuantity
      return [...prev, { ...newItem, quantity: max ? Math.min(quantity, max) : quantity }]
    })
  }

  const addWholesaleToCart = (product: WholesaleProduct) => {
    setItems(prev => {
      const newItem: CartItem = { wholesaleProduct: product, quantity: product.minOrder, mode: 'wholesale' }
      const key = getItemKey(newItem)
      const existing = prev.find(i => getItemKey(i) === key)
      if (existing) {
        return prev.map(i =>
          getItemKey(i) === key ? { ...i, quantity: i.quantity + product.minOrder } : i
        )
      }
      return [...prev, newItem]
    })
  }

  const removeFromCart = (key: string) => {
    setItems(prev => prev.filter(i => getItemKey(i) !== key))
  }

  const updateQuantity = (key: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(key)
      return
    }
    setItems(prev =>
      prev.map(i => {
        if (getItemKey(i) !== key) return i
        if (i.mode === 'delivery' && i.product?.maxQuantity) {
          return { ...i, quantity: Math.min(quantity, i.product.maxQuantity) }
        }
        return { ...i, quantity }
      })
    )
  }

  const clearCart = () => setItems([])
  const clearMode = (mode: 'delivery' | 'wholesale') => setItems(prev => prev.filter(i => i.mode !== mode))

  const total = items.reduce((sum, i) => sum + getItemPrice(i) * i.quantity, 0)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, addWholesaleToCart, removeFromCart, updateQuantity, clearCart, clearMode, total, itemCount, getKey: getItemKey }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
