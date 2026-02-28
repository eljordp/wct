export type TerpeneProfile = 'relaxed' | 'euphoric' | 'creative' | 'heavy'
export type Category = 'flower' | 'vapes'
export type WeightOption = 'eighth' | 'q' | 'h' | 'oz'

export const WEIGHT_OPTIONS: { value: WeightOption; label: string; short: string }[] = [
  { value: 'eighth', label: '⅛ oz', short: '3.5g' },
  { value: 'q', label: '¼ oz', short: '7g' },
  { value: 'h', label: '½ oz', short: '14g' },
  { value: 'oz', label: '1 oz', short: '28g' },
]

export interface Flavor {
  name: string
  description: string
  thc: string
  emoji: string
  terpene_profile: TerpeneProfile
}

export interface Product {
  id: string
  name: string
  category: Category
  terpene_profile: TerpeneProfile
  price: number
  thc: string
  description: string
  in_stock: boolean
  badge?: string
  weights?: Record<WeightOption, number>
  flavors?: Flavor[]
  brand?: string
  maxQuantity?: number
}

export const TERPENE_PROFILES: Record<TerpeneProfile, { label: string; color: string; description: string }> = {
  relaxed: { label: 'Relaxed', color: '#A78BCA', description: 'Calming effects, great for unwinding' },
  euphoric: { label: 'Euphoric', color: '#D4A84B', description: 'Uplifting mood enhancement' },
  creative: { label: 'Creative', color: '#C77D99', description: 'Inspiring and imaginative effects' },
  heavy: { label: 'Heavy', color: '#6B9F8B', description: 'Deep, full-body relaxation' },
}

export const CATEGORIES: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All Products' },
  { value: 'flower', label: 'Flower' },
  { value: 'vapes', label: 'Carts' },
]

export const PRODUCTS: Product[] = [
  {
    id: 'oface',
    name: 'OFace',
    category: 'flower',
    terpene_profile: 'euphoric',
    price: 35,
    thc: '28%+',
    description: 'OFace hits different. Dense, frosty nugs with a loud nose that fills the room. Smooth smoke with heavy-hitting effects that keep you coming back. One of the most sought-after strains in the game right now — premium bag appeal and potency to match.',
    in_stock: true,
    badge: 'Best Seller',
    weights: { eighth: 35, q: 65, h: 120, oz: 220 },
  },
  {
    id: 'sherblato',
    name: 'Sherblato',
    category: 'flower',
    terpene_profile: 'creative',
    price: 40,
    thc: '30%+',
    description: 'Sherblato is that perfect cross — creamy, sweet, and gassy all at once. Tight, colorful buds coated in trichomes with a flavor profile that speaks for itself. This strain moves fast and locks in repeat buyers. Top-tier quality.',
    in_stock: true,
    badge: 'Premium',
    weights: { eighth: 40, q: 75, h: 140, oz: 260 },
  },
  {
    id: 'lcg',
    name: 'LCG',
    category: 'flower',
    terpene_profile: 'heavy',
    price: 45,
    thc: '32%+',
    description: 'LCG is straight gas. Heavy indica-leaning effects with a pungent, earthy aroma that announces itself the second you open the bag. Rock-hard nugs dripping in resin — this is top-shelf exotic. Connoisseur grade, no debate.',
    in_stock: true,
    badge: 'Hot',
    weights: { eighth: 45, q: 85, h: 160, oz: 300 },
  },
  {
    id: 'foreign-wendy',
    name: 'Foreign Wendy',
    category: 'flower',
    terpene_profile: 'euphoric',
    price: 55,
    thc: '34%+',
    description: 'Foreign Wendy is an exclusive drop — limited supply, heavy demand. Exotic terpene profile with an electric high that stands out from everything else on the market. This one sells itself. Limited availability, max 1 oz per order.',
    in_stock: true,
    badge: 'Exclusive',
    weights: { eighth: 55, q: 100, h: 190, oz: 350 },
  },
  {
    id: 'gmo-smalls',
    name: 'GMO Indoor Exotic Smalls',
    category: 'flower',
    terpene_profile: 'relaxed',
    price: 25,
    thc: '26%+',
    description: 'GMO Indoor Exotic Smalls — same fire, smaller nugs, better price. Grown indoors under full control for maximum potency and flavor. That classic garlic-gas funk GMO is known for, just in a more affordable format. Top-tier quality without the top-tier ticket.',
    in_stock: true,
    badge: 'Value',
    weights: { eighth: 25, q: 45, h: 80, oz: 150 },
  },
  {
    id: 'lean-cup-cart',
    name: 'Lean Cup Cart',
    category: 'vapes',
    terpene_profile: 'relaxed',
    price: 80,
    thc: '90%+',
    description: 'The Lean Cup Cart — smooth, potent, and built different. Premium oil in a sleek cart that delivers every time. Limited to 1 per customer. If you know, you know.',
    in_stock: true,
    badge: 'Limited',
    maxQuantity: 1,
  },
]
