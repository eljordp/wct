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
    id: 'w1',
    name: 'Blue Dream THCa Flower',
    category: 'flower',
    strain: 'hybrid',
    retail: 45,
    wholesale: [
      { minQty: 10, price: 28, label: '10+ units' },
      { minQty: 50, price: 22, label: '50+ units' },
      { minQty: 100, price: 18, label: '100+ units' },
    ],
    thc: '28%',
    description: 'Premium THCa flower with sweet berry aroma. Lab tested, hand-trimmed nugs. Top seller for retail.',
    image_url: '',
    in_stock: true,
    badge: 'Best Seller',
    minOrder: 10,
  },
  {
    id: 'w2',
    name: 'Gelato Live Resin Cart',
    category: 'vapes',
    strain: 'hybrid',
    retail: 40,
    wholesale: [
      { minQty: 25, price: 18, label: '25+ units' },
      { minQty: 100, price: 14, label: '100+ units' },
      { minQty: 250, price: 11, label: '250+ units' },
    ],
    thc: '90%',
    description: 'Full gram live resin cartridge. Rich dessert-like flavor with premium hardware. High margin product.',
    image_url: '',
    in_stock: true,
    badge: 'Hot',
    minOrder: 25,
  },
  {
    id: 'w3',
    name: 'Purple Punch THCa Flower',
    category: 'flower',
    strain: 'indica',
    retail: 50,
    wholesale: [
      { minQty: 10, price: 32, label: '10+ units' },
      { minQty: 50, price: 26, label: '50+ units' },
      { minQty: 100, price: 22, label: '100+ units' },
    ],
    thc: '25%',
    description: 'Dense purple nugs with grape candy aroma. Eye-catching bag appeal that sells itself on display.',
    image_url: '',
    in_stock: true,
    minOrder: 10,
  },
  {
    id: 'w4',
    name: 'Sour Diesel THCa Flower',
    category: 'flower',
    strain: 'sativa',
    retail: 45,
    wholesale: [
      { minQty: 10, price: 28, label: '10+ units' },
      { minQty: 50, price: 22, label: '50+ units' },
      { minQty: 100, price: 18, label: '100+ units' },
    ],
    thc: '26%',
    description: 'Classic sativa with pungent fuel aroma. Consistently high demand strain among consumers.',
    image_url: '',
    in_stock: true,
    minOrder: 10,
  },
  {
    id: 'w5',
    name: 'OG Kush Pre-Roll 5pk',
    category: 'pre-rolls',
    strain: 'indica',
    retail: 25,
    wholesale: [
      { minQty: 20, price: 12, label: '20+ packs' },
      { minQty: 100, price: 9, label: '100+ packs' },
      { minQty: 500, price: 7, label: '500+ packs' },
    ],
    thc: '24%',
    description: '5-pack of premium pre-rolls. Branded packaging included. Great impulse buy for checkout counters.',
    image_url: '',
    in_stock: true,
    badge: 'Popular',
    minOrder: 20,
  },
  {
    id: 'w6',
    name: 'Tropical Gummies 10pk',
    category: 'edibles',
    strain: 'sativa',
    retail: 25,
    wholesale: [
      { minQty: 50, price: 10, label: '50+ units' },
      { minQty: 200, price: 7.50, label: '200+ units' },
      { minQty: 500, price: 6, label: '500+ units' },
    ],
    thc: '100mg',
    description: 'Tropical mango & pineapple gummies. Vibrant retail packaging, 10mg per gummy. Consistent dosing.',
    image_url: '',
    in_stock: true,
    badge: 'Best Seller',
    minOrder: 50,
  },
  {
    id: 'w7',
    name: 'Live Rosin Badder',
    category: 'concentrates',
    strain: 'hybrid',
    retail: 60,
    wholesale: [
      { minQty: 10, price: 35, label: '10+ units' },
      { minQty: 50, price: 28, label: '50+ units' },
      { minQty: 100, price: 24, label: '100+ units' },
    ],
    thc: '82%',
    description: 'Solventless live rosin pressed from fresh-frozen flower. Premium product for connoisseur customers.',
    image_url: '',
    in_stock: true,
    minOrder: 10,
  },
  {
    id: 'w8',
    name: 'Wedding Cake THCa Flower',
    category: 'flower',
    strain: 'hybrid',
    retail: 55,
    wholesale: [
      { minQty: 10, price: 34, label: '10+ units' },
      { minQty: 50, price: 28, label: '50+ units' },
      { minQty: 100, price: 24, label: '100+ units' },
    ],
    thc: '30%',
    description: 'Top-shelf flower with rich tangy flavor. 30% THCa — premium product with premium margins.',
    image_url: '',
    in_stock: true,
    badge: 'Premium',
    minOrder: 10,
  },
  {
    id: 'w9',
    name: 'Strawberry Cough THCa',
    category: 'flower',
    strain: 'sativa',
    retail: 42,
    wholesale: [
      { minQty: 10, price: 26, label: '10+ units' },
      { minQty: 50, price: 20, label: '50+ units' },
      { minQty: 100, price: 16, label: '100+ units' },
    ],
    thc: '23%',
    description: 'Sweet strawberry flavor with a skunky finish. Customers keep coming back for this one.',
    image_url: '',
    in_stock: true,
    minOrder: 10,
  },
  {
    id: 'w10',
    name: 'GDP Pre-Roll 3pk',
    category: 'pre-rolls',
    strain: 'indica',
    retail: 18,
    wholesale: [
      { minQty: 20, price: 8, label: '20+ packs' },
      { minQty: 100, price: 6, label: '100+ packs' },
      { minQty: 500, price: 4.50, label: '500+ packs' },
    ],
    thc: '22%',
    description: '3-pack Granddaddy Purple pre-rolls. Compact retail packaging. Sweet grape & berry aroma.',
    image_url: '',
    in_stock: true,
    minOrder: 20,
  },
  {
    id: 'w11',
    name: 'Pineapple Express Cart',
    category: 'vapes',
    strain: 'sativa',
    retail: 35,
    wholesale: [
      { minQty: 25, price: 15, label: '25+ units' },
      { minQty: 100, price: 12, label: '100+ units' },
      { minQty: 250, price: 9, label: '250+ units' },
    ],
    thc: '88%',
    description: 'Full gram cart with tropical pineapple flavor. Ceramic coil hardware, leak-proof design.',
    image_url: '',
    in_stock: true,
    minOrder: 25,
  },
  {
    id: 'w12',
    name: 'Dark Chocolate Bar 100mg',
    category: 'edibles',
    strain: 'indica',
    retail: 30,
    wholesale: [
      { minQty: 50, price: 12, label: '50+ units' },
      { minQty: 200, price: 9, label: '200+ units' },
      { minQty: 500, price: 7, label: '500+ units' },
    ],
    thc: '100mg',
    description: 'Artisan dark chocolate, 10 scored squares at 10mg each. Elegant packaging, long shelf life.',
    image_url: '',
    in_stock: true,
    minOrder: 50,
  },
  {
    id: 'w13',
    name: 'Diamond Sauce Cart',
    category: 'vapes',
    strain: 'hybrid',
    retail: 45,
    wholesale: [
      { minQty: 25, price: 22, label: '25+ units' },
      { minQty: 100, price: 18, label: '100+ units' },
      { minQty: 250, price: 14, label: '250+ units' },
    ],
    thc: '95%',
    description: 'THCa diamond-infused liquid cart. Premium tier product with 95% potency. Luxury packaging.',
    image_url: '',
    in_stock: true,
    badge: 'New',
    minOrder: 25,
  },
  {
    id: 'w14',
    name: 'Watermelon Gummies 10pk',
    category: 'edibles',
    strain: 'hybrid',
    retail: 25,
    wholesale: [
      { minQty: 50, price: 10, label: '50+ units' },
      { minQty: 200, price: 7.50, label: '200+ units' },
      { minQty: 500, price: 6, label: '500+ units' },
    ],
    thc: '100mg',
    description: 'Watermelon-flavored gummies. Compliant packaging and labeling. Ready for retail shelves.',
    image_url: '',
    in_stock: true,
    minOrder: 50,
  },
  {
    id: 'w15',
    name: 'Shatter - Mixed Strains',
    category: 'concentrates',
    strain: 'hybrid',
    retail: 35,
    wholesale: [
      { minQty: 20, price: 16, label: '20+ units' },
      { minQty: 100, price: 12, label: '100+ units' },
      { minQty: 250, price: 9, label: '250+ units' },
    ],
    thc: '85%',
    description: 'Premium shatter in assorted popular strains. Stable consistency, great shelf display.',
    image_url: '',
    in_stock: true,
    minOrder: 20,
  },
  {
    id: 'w16',
    name: 'Runtz THCa Flower',
    category: 'flower',
    strain: 'hybrid',
    retail: 50,
    wholesale: [
      { minQty: 10, price: 32, label: '10+ units' },
      { minQty: 50, price: 26, label: '50+ units' },
      { minQty: 100, price: 22, label: '100+ units' },
    ],
    thc: '29%',
    description: 'Candy-like aroma with colorful bag appeal. One of the most in-demand strains on the market.',
    image_url: '',
    in_stock: true,
    badge: 'Trending',
    minOrder: 10,
  },
]

export function getWholesaleUnitPrice(product: WholesaleProduct, quantity: number): number {
  const tiers = [...product.wholesale].sort((a, b) => b.minQty - a.minQty)
  for (const tier of tiers) {
    if (quantity >= tier.minQty) return tier.price
  }
  return product.wholesale[0].price
}
