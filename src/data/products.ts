export type TerpeneProfile = 'relaxed' | 'euphoric' | 'creative' | 'heavy'
export type Category = 'flower' | 'vapes' | 'edibles' | 'concentrates' | 'pre-rolls'

export interface Product {
  id: string
  name: string
  category: Category
  terpene_profile: TerpeneProfile
  price: number
  thc: string
  description: string
  image_url: string
  in_stock: boolean
}

export const TERPENE_PROFILES: Record<TerpeneProfile, { label: string; color: string; description: string }> = {
  relaxed: { label: 'Relaxed', color: '#8B5CF6', description: 'Calming effects, great for unwinding' },
  euphoric: { label: 'Euphoric', color: '#F59E0B', description: 'Uplifting mood enhancement' },
  creative: { label: 'Creative', color: '#EC4899', description: 'Inspiring and imaginative effects' },
  heavy: { label: 'Heavy', color: '#10B981', description: 'Strong, sedating effects' },
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
  {
    id: '1',
    name: 'Blue Dream',
    category: 'flower',
    terpene_profile: 'euphoric',
    price: 45,
    thc: '28%',
    description: 'A legendary sativa-dominant hybrid with sweet berry aroma. Known for balanced full-body relaxation and gentle cerebral invigoration.',
    image_url: '',
    in_stock: true,
  },
  {
    id: '2',
    name: 'Gelato Vape',
    category: 'vapes',
    terpene_profile: 'creative',
    price: 40,
    thc: '90%',
    description: 'Premium live resin cartridge with sweet, dessert-like flavor. Smooth hits with creative and uplifting effects.',
    image_url: '',
    in_stock: true,
  },
  {
    id: '3',
    name: 'Purple Punch',
    category: 'flower',
    terpene_profile: 'relaxed',
    price: 50,
    thc: '25%',
    description: 'Dense purple buds with grape candy aroma. A heavy indica that melts away stress and promotes deep relaxation.',
    image_url: '',
    in_stock: true,
  },
  {
    id: '4',
    name: 'Sour Diesel',
    category: 'flower',
    terpene_profile: 'euphoric',
    price: 45,
    thc: '26%',
    description: 'Classic sativa strain with pungent fuel aroma. Delivers energizing, dreamy cerebral effects perfect for daytime use.',
    image_url: '',
    in_stock: true,
  },
  {
    id: '5',
    name: 'OG Kush Pre-Roll',
    category: 'pre-rolls',
    terpene_profile: 'heavy',
    price: 15,
    thc: '24%',
    description: 'Hand-rolled with premium OG Kush flower. Earthy pine notes with heavy body effects for deep relaxation.',
    image_url: '',
    in_stock: true,
  },
  {
    id: '6',
    name: 'Mango Gummies',
    category: 'edibles',
    terpene_profile: 'euphoric',
    price: 25,
    thc: '100mg',
    description: 'Tropical mango flavored gummies, 10mg per piece. Lab tested for consistent dosing and maximum enjoyment.',
    image_url: '',
    in_stock: true,
  },
  {
    id: '7',
    name: 'Live Rosin',
    category: 'concentrates',
    terpene_profile: 'creative',
    price: 60,
    thc: '82%',
    description: 'Solventless live rosin pressed from fresh-frozen premium flower. Full spectrum terpene profile for connoisseurs.',
    image_url: '',
    in_stock: true,
  },
  {
    id: '8',
    name: 'Wedding Cake',
    category: 'flower',
    terpene_profile: 'relaxed',
    price: 55,
    thc: '30%',
    description: 'Top-shelf indica-leaning hybrid with rich, tangy flavor. Delivers calming euphoria with a relaxing body high.',
    image_url: '',
    in_stock: true,
  },
  {
    id: '9',
    name: 'Strawberry Cough',
    category: 'flower',
    terpene_profile: 'creative',
    price: 42,
    thc: '23%',
    description: 'Sweet strawberry flavor with a skunky finish. An uplifting sativa that sparks creativity and focus.',
    image_url: '',
    in_stock: true,
  },
  {
    id: '10',
    name: 'Granddaddy Purple Pre-Roll',
    category: 'pre-rolls',
    terpene_profile: 'heavy',
    price: 12,
    thc: '22%',
    description: 'Classic GDP in a perfectly rolled joint. Sweet grape and berry aroma with sedating full-body effects.',
    image_url: '',
    in_stock: true,
  },
  {
    id: '11',
    name: 'Pineapple Express Cart',
    category: 'vapes',
    terpene_profile: 'euphoric',
    price: 35,
    thc: '88%',
    description: 'Tropical pineapple flavor in a full gram cart. Buzzy, energetic high perfect for social settings.',
    image_url: '',
    in_stock: true,
  },
  {
    id: '12',
    name: 'Dark Chocolate Bar',
    category: 'edibles',
    terpene_profile: 'relaxed',
    price: 30,
    thc: '100mg',
    description: 'Artisan dark chocolate infused with premium extract. 10 perfectly dosed squares for controlled relaxation.',
    image_url: '',
    in_stock: true,
  },
]
