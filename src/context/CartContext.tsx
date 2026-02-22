import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Product, WeightOption } from '@/data/products'

export interface CartItem {
  product: Product
  quantity: number
  weight?: WeightOption
  flavor?: string
}

function getItemKey(item: CartItem): string {
  const parts = [item.product.id]
  if (item.flavor) parts.push(item.flavor)
  if (item.weight) parts.push(item.weight)
  return parts.join('-')
}

export function getItemPrice(item: CartItem): number {
  if (item.weight && item.product.weights) {
    return item.product.weights[item.weight]
  }
  return item.product.price
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product, quantity?: number, weight?: WeightOption, flavor?: string) => void
  removeFromCart: (key: string) => void
  updateQuantity: (key: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (product: Product, quantity: number = 1, weight?: WeightOption, flavor?: string) => {
    setItems(prev => {
      const newItem: CartItem = { product, quantity, weight, flavor }
      const key = getItemKey(newItem)
      const existing = prev.find(i => getItemKey(i) === key)
      if (existing) {
        return prev.map(i =>
          getItemKey(i) === key ? { ...i, quantity: i.quantity + quantity } : i
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
      prev.map(i => (getItemKey(i) === key ? { ...i, quantity } : i))
    )
  }

  const clearCart = () => setItems([])

  const total = items.reduce((sum, i) => sum + getItemPrice(i) * i.quantity, 0)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
