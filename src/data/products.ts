export type TerpeneProfile = 'relaxed' | 'euphoric' | 'creative' | 'heavy'
export type Category = 'flower' | 'vapes' | 'edibles' | 'concentrates' | 'pre-rolls'
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
}

export const TERPENE_PROFILES: Record<TerpeneProfile, { label: string; color: string; description: string }> = {
  relaxed: { label: 'Relaxed', color: '#8B5CF6', description: 'Calming effects, great for unwinding' },
  euphoric: { label: 'Euphoric', color: '#F59E0B', description: 'Uplifting mood enhancement' },
  creative: { label: 'Creative', color: '#EC4899', description: 'Inspiring and imaginative effects' },
  heavy: { label: 'Heavy', color: '#10B981', description: 'Deep, full-body relaxation' },
}

export const CATEGORIES: { value: Category | 'all'; label: string }[] = [
  { value: 'all', label: 'All Products' },
  { value: 'flower', label: 'Flower' },
  { value: 'vapes', label: 'Vapes' },
  { value: 'edibles', label: 'Edibles' },
  { value: 'concentrates', label: 'Concentrates' },
  { value: 'pre-rolls', label: 'Pre-Rolls' },
]

export const PRODUCTS: Product[] = [
  // ── FLOWER: Seedless ($35/8th) ──
  {
    id: 'seedless',
    name: 'Seedless',
    brand: 'Seedless',
    category: 'flower',
    terpene_profile: 'euphoric',
    price: 35,
    thc: '28%',
    description: 'Quality indoor flower at the best price on the coast. Always seedless, always fire.',
    in_stock: true,
    badge: 'Best Seller',
    weights: { eighth: 35, q: 65, h: 120, oz: 220 },
    flavors: [
      { name: 'Blue Dream', description: 'Sweet berry aroma with balanced full-body relaxation and gentle cerebral invigoration.', thc: '28%', emoji: '💙', terpene_profile: 'euphoric' },
      { name: 'Sour Diesel', description: 'Classic energizing strain with pungent diesel aroma. Great for daytime use.', thc: '26%', emoji: '⛽', terpene_profile: 'euphoric' },
      { name: 'Strawberry Cough', description: 'Sweet strawberry flavor with a smooth, uplifting high. Customer favorite.', thc: '23%', emoji: '🍓', terpene_profile: 'euphoric' },
      { name: 'OG Kush', description: 'Earthy pine aroma with a potent kick. The original California classic.', thc: '24%', emoji: '🌲', terpene_profile: 'heavy' },
    ],
  },

  // ── FLOWER: FJ420 ($45/8th) ──
  {
    id: 'fj420',
    name: 'FJ420',
    brand: 'FJ420',
    category: 'flower',
    terpene_profile: 'creative',
    price: 45,
    thc: '29%',
    description: 'Premium exotic strains. Dense, frosty nugs with loud terps and bag appeal.',
    in_stock: true,
    badge: 'Premium',
    weights: { eighth: 45, q: 80, h: 150, oz: 280 },
    flavors: [
      { name: 'Purple Punch', description: 'Dense purple nugs with grape candy aroma. Perfect for evening relaxation.', thc: '25%', emoji: '🍇', terpene_profile: 'relaxed' },
      { name: 'Runtz', description: 'Candy-like aroma with colorful bag appeal. One of the most in-demand strains.', thc: '29%', emoji: '🍬', terpene_profile: 'creative' },
      { name: 'Wedding Cake', description: 'Top-shelf flower with rich tangy flavor. Dense, frosty nugs with potent effects.', thc: '30%', emoji: '🎂', terpene_profile: 'relaxed' },
      { name: 'Gelato', description: 'Smooth dessert-like flavor profile. Creamy inhale with a euphoric, relaxing finish.', thc: '27%', emoji: '🍨', terpene_profile: 'creative' },
    ],
  },

  // ── FLOWER: Foreign ($55/8th) ──
  {
    id: 'foreign',
    name: 'Foreign',
    brand: 'Foreign',
    category: 'flower',
    terpene_profile: 'creative',
    price: 55,
    thc: '32%',
    description: 'Ultra-premium LA cannabis. Small-batch, hand-trimmed, top 1% quality.',
    in_stock: true,
    badge: 'Foreign',
    weights: { eighth: 55, q: 100, h: 190, oz: 360 },
    flavors: [
      { name: 'Lemon Cherry Gelato', description: 'Citrus meets cherry with creamy gelato finish. Dense, purple-green nugs coated in trichomes.', thc: '32%', emoji: '🍋', terpene_profile: 'euphoric' },
      { name: 'Biscotti', description: 'Cookie dough and earthy spice aroma. Heavy-hitting indica-dominant with long-lasting effects.', thc: '30%', emoji: '🍪', terpene_profile: 'heavy' },
      { name: 'London Pound Cake', description: 'Sweet berry cake flavor with a smooth, sedating body high. True connoisseur grade.', thc: '31%', emoji: '🧁', terpene_profile: 'relaxed' },
      { name: 'Zushi', description: 'Rare exotic with fruity gas terps. Extremely limited small-batch runs only.', thc: '33%', emoji: '⚡', terpene_profile: 'creative' },
    ],
  },

  // ── VAPES ──
  {
    id: 'v1',
    name: 'Gelato Live Resin Cart',
    category: 'vapes',
    terpene_profile: 'creative',
    price: 40,
    thc: '90%',
    description: 'Full gram live resin cartridge with rich dessert-like flavor and smooth draw.',
    in_stock: true,
    badge: 'Popular',
  },
  {
    id: 'v2',
    name: 'Pineapple Express Cart',
    category: 'vapes',
    terpene_profile: 'euphoric',
    price: 35,
    thc: '88%',
    description: 'Full gram cart with tropical pineapple flavor. Ceramic coil, smooth hits.',
    in_stock: true,
  },
  {
    id: 'v3',
    name: 'Diamond Sauce Cart',
    category: 'vapes',
    terpene_profile: 'heavy',
    price: 45,
    thc: '95%',
    description: 'THCa diamond-infused liquid cart. Maximum potency, smooth flavor.',
    in_stock: true,
    badge: 'New',
  },

  // ── PRE-ROLLS ──
  {
    id: 'pr1',
    name: 'OG Kush Pre-Roll 5pk',
    category: 'pre-rolls',
    terpene_profile: 'heavy',
    price: 25,
    thc: '24%',
    description: 'Five premium pre-rolls of classic OG Kush. Earthy pine with a potent kick.',
    in_stock: true,
    badge: 'Value Pack',
  },
  {
    id: 'pr2',
    name: 'GDP Pre-Roll 3pk',
    category: 'pre-rolls',
    terpene_profile: 'heavy',
    price: 18,
    thc: '22%',
    description: 'Granddaddy Purple 3-pack. Sweet grape & berry aroma with deep body relaxation.',
    in_stock: true,
  },

  // ── EDIBLES ──
  {
    id: 'e1',
    name: 'Tropical Gummies 10pk',
    category: 'edibles',
    terpene_profile: 'euphoric',
    price: 25,
    thc: '100mg',
    description: 'Tropical mango & pineapple gummies. 10mg per piece, precise dosing.',
    in_stock: true,
    badge: 'Best Seller',
  },
  {
    id: 'e2',
    name: 'Dark Chocolate Bar',
    category: 'edibles',
    terpene_profile: 'relaxed',
    price: 30,
    thc: '100mg',
    description: 'Artisan dark chocolate with 10 scored squares at 10mg each. Precise and delicious.',
    in_stock: true,
  },
  {
    id: 'e3',
    name: 'Watermelon Gummies 10pk',
    category: 'edibles',
    terpene_profile: 'creative',
    price: 25,
    thc: '100mg',
    description: 'Watermelon-flavored gummies with precise 10mg dosing per piece.',
    in_stock: true,
  },

  // ── CONCENTRATES ──
  {
    id: 'c1',
    name: 'Live Rosin Badder',
    category: 'concentrates',
    terpene_profile: 'creative',
    price: 60,
    thc: '82%',
    description: 'Solventless live rosin pressed from fresh-frozen flower. Connoisseur grade.',
    in_stock: true,
  },
  {
    id: 'c2',
    name: 'Shatter - Mixed Strains',
    category: 'concentrates',
    terpene_profile: 'heavy',
    price: 35,
    thc: '85%',
    description: 'Premium shatter in assorted popular strains. Stable, glassy consistency.',
    in_stock: true,
  },
]
