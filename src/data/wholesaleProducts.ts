export type Strain = 'indica' | 'sativa' | 'hybrid'
export type WholesaleCategory = 'flower' | 'vapes' | 'edibles' | 'concentrates' | 'pre-rolls'

export interface WholesaleTier {
  minQty: number
  price: number
  label: string
}

export interface WholesaleProduct {
  id: string
  name: string
  category: WholesaleCategory
  strain: Strain
  retail: number
  wholesale: WholesaleTier[]
  thc: string
  description: string
  image_url: string
  in_stock: boolean
  badge?: string
  minOrder: number
  brand?: string
}

export const STRAIN_INFO: Record<Strain, { label: string; color: string }> = {
  indica: { label: 'Indica', color: '#A78BCA' },
  sativa: { label: 'Sativa', color: '#D4A84B' },
  hybrid: { label: 'Hybrid', color: '#6B9F8B' },
}

export const WHOLESALE_CATEGORIES: { value: WholesaleCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Products' },
  { value: 'flower', label: 'THCa Flower' },
  { value: 'vapes', label: 'Vape Carts' },
  { value: 'edibles', label: 'Edibles' },
  { value: 'concentrates', label: 'Concentrates' },
  { value: 'pre-rolls', label: 'Pre-Rolls' },
]

export const WHOLESALE_PRODUCTS: WholesaleProduct[] = [
  {
    id: 'w-gmo-smalls',
    name: 'GMO Indoor Exotic Smalls',
    category: 'flower',
    strain: 'indica',
    retail: 100,
    brand: 'WCT',
    wholesale: [
      { minQty: 10, price: 70, label: '10+ units' },
      { minQty: 50, price: 55, label: '50+ units' },
      { minQty: 100, price: 45, label: '100+ units' },
    ],
    thc: '26%+',
    description: 'GMO Indoor Exotic Smalls: same fire, smaller nugs, better price. Classic garlic-gas funk with indoor-grown potency. Top-tier quality at a value price point. Moves fast in any shop.',
    image_url: '/images/gmo-smalls.jpg',
    in_stock: true,
    badge: 'Value',
    minOrder: 10,
  },
  {
    id: 'w-oface',
    name: 'OFace',
    category: 'flower',
    strain: 'hybrid',
    retail: 140,
    wholesale: [
      { minQty: 10, price: 100, label: '10+ units' },
      { minQty: 50, price: 85, label: '50+ units' },
      { minQty: 100, price: 75, label: '100+ units' },
    ],
    thc: '28%+',
    description: 'OFace hits different. Dense, frosty nugs with a loud nose that fills the room. One of the most sought-after strains in the game, premium bag appeal and potency to match.',
    image_url: '/images/oface.jpg',
    in_stock: true,
    badge: 'Best Seller',
    minOrder: 10,
  },
  {
    id: 'w-gushers',
    name: 'Gushers',
    category: 'flower',
    strain: 'hybrid',
    retail: 160,
    wholesale: [
      { minQty: 10, price: 115, label: '10+ units' },
      { minQty: 50, price: 95, label: '50+ units' },
      { minQty: 100, price: 85, label: '100+ units' },
    ],
    thc: '29%+',
    description: 'Gushers brings that fruity, candy-like flavor with every hit. Dense, trichome-loaded buds with tropical and sweet notes. Heavy euphoria and full-body relaxation, sells itself on bag appeal alone.',
    image_url: '/images/gushers.jpg',
    in_stock: true,
    minOrder: 10,
  },
  {
    id: 'w-sherblato',
    name: 'Sherblato',
    category: 'flower',
    strain: 'hybrid',
    retail: 160,
    wholesale: [
      { minQty: 10, price: 115, label: '10+ units' },
      { minQty: 50, price: 95, label: '50+ units' },
      { minQty: 100, price: 85, label: '100+ units' },
    ],
    thc: '30%+',
    description: 'Sherblato is that perfect cross: creamy, sweet, and gassy all at once. Tight, colorful buds coated in trichomes. This strain moves fast and locks in repeat buyers. Top-tier quality.',
    image_url: '/images/sherblato.jpg',
    in_stock: true,
    badge: 'Premium',
    minOrder: 10,
  },
  {
    id: 'w-sakura',
    name: 'Sakura',
    category: 'flower',
    strain: 'sativa',
    retail: 180,
    wholesale: [
      { minQty: 10, price: 130, label: '10+ units' },
      { minQty: 50, price: 110, label: '50+ units' },
      { minQty: 100, price: 95, label: '100+ units' },
    ],
    thc: '31%+',
    description: 'Sakura is a rare exotic with a smooth, floral terpene profile. Beautiful frosty nugs with a sweet, cherry-blossom finish. Cerebral and uplifting, connoisseur grade.',
    image_url: '/images/sakura.jpg',
    in_stock: true,
    brand: 'Foreign',
    minOrder: 10,
  },
  {
    id: 'w-lcg',
    name: 'LCG',
    category: 'flower',
    strain: 'indica',
    retail: 180,
    wholesale: [
      { minQty: 10, price: 130, label: '10+ units' },
      { minQty: 50, price: 110, label: '50+ units' },
      { minQty: 100, price: 95, label: '100+ units' },
    ],
    thc: '32%+',
    description: 'LCG is straight gas. Heavy indica-leaning effects with a pungent, earthy aroma. Rock-hard nugs dripping in resin, top-shelf exotic. Connoisseur grade, no debate.',
    image_url: '/images/lcg.jpg',
    in_stock: true,
    badge: 'Hot',
    minOrder: 10,
  },
  {
    id: 'w-wendy',
    name: 'Wendy',
    category: 'flower',
    strain: 'sativa',
    retail: 200,
    wholesale: [
      { minQty: 10, price: 145, label: '10+ units' },
      { minQty: 50, price: 125, label: '50+ units' },
      { minQty: 100, price: 110, label: '100+ units' },
    ],
    thc: '34%+',
    description: 'Wendy is an exclusive drop: limited supply, heavy demand. Exotic terpene profile with an electric high that stands out from everything else on the market.',
    image_url: '/images/wendy.jpg',
    in_stock: true,
    badge: 'Exclusive',
    brand: 'Foreign',
    minOrder: 10,
  },
  {
    id: 'w-lean-cup-cart',
    name: 'Lean Cup Cart',
    category: 'vapes',
    strain: 'indica',
    retail: 30,
    wholesale: [
      { minQty: 100, price: 18, label: '100+ units' },
      { minQty: 500, price: 14, label: '500+ units' },
      { minQty: 1000, price: 11, label: '1000+ units' },
    ],
    thc: '85%+',
    description: 'Lean Cup Cart: smooth, syrupy flavor in a premium vape cart. Relaxing effects that hit like the real thing. High margin product, moves fast.',
    image_url: '',
    in_stock: true,
    minOrder: 100,
  },
  {
    id: 'w-seedless-carts',
    name: 'Seedless Carts',
    category: 'vapes',
    strain: 'hybrid',
    retail: 30,
    wholesale: [
      { minQty: 100, price: 18, label: '100+ units' },
      { minQty: 500, price: 14, label: '500+ units' },
      { minQty: 1000, price: 11, label: '1000+ units' },
    ],
    thc: '90%+',
    description: 'Seedless Carts: smooth, potent, and built different. Premium oil in a sleek cart that delivers every time. High margin product, moves fast.',
    image_url: '/images/seedless-carts.jpg',
    in_stock: true,
    minOrder: 100,
  },
]

export function getWholesaleUnitPrice(product: WholesaleProduct, quantity: number): number {
  const tiers = [...product.wholesale].sort((a, b) => b.minQty - a.minQty)
  for (const tier of tiers) {
    if (quantity >= tier.minQty) return tier.price
  }
  return product.wholesale[0].price
}
