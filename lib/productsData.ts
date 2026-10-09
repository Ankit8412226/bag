export interface ProductType {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  stock: number;
  isActive: boolean;
  rating?: number;
  badge?: string;
  material?: string;
  dimensions?: string;
}

export function normalizeImageUrl(url?: string): string {
  if (!url) return '/p1.png';
  const legacyMap: Record<string, string> = {
    '/leather-backpack.png': '/p1.png',
    '/duffel-bag.png': '/p2.png',
    '/messenger-bag.png': '/p3.png',
    '/handbag-premium.png': '/p4.png',
    '/sling-bag.png': '/p5.png',
    '/tote-bag.png': '/p6.png',
    '/canvas-backpack.png': '/p7.png',
    '/laptop-backpack.png': '/p8.png',
    '/crossbody-bag.png': '/p9.png',
    '/travel-backpack.png': '/p10.png',
    '/hero-bags.png': '/hero.png',
  };
  return legacyMap[url] || url;
}

export const DUMMY_PRODUCTS: ProductType[] = [
  {
    _id: '1',
    name: 'Classic Leather Executive Backpack',
    price: 3499,
    description: 'Crafted from premium top-grain genuine leather with a dedicated 16-inch padded laptop compartment, ergonomic padded shoulder straps, and quick-access magnetic flap pockets.',
    imageUrl: '/p1.png',
    category: 'Backpacks',
    stock: 15,
    isActive: true,
    rating: 4.9,
    badge: 'Bestseller',
    material: 'Full-grain Leather & Brass Hardware',
    dimensions: '44cm x 30cm x 15cm',
  },
  {
    _id: '2',
    name: 'Vintage Canvas Adventurer Duffel',
    price: 2899,
    description: 'Heavy-duty water-repellent canvas weekend duffel featuring reinforced leather trim, spacious main compartment, separate shoe tunnel, and detachable padded shoulder strap.',
    imageUrl: '/p2.png',
    category: 'Travel',
    stock: 8,
    isActive: true,
    rating: 4.8,
    badge: 'Trending',
    material: 'Waxed Canvas & Crazy Horse Leather',
    dimensions: '52cm x 28cm x 25cm',
  },
  {
    _id: '3',
    name: 'Minimalist Urban Messenger Bag',
    price: 2299,
    description: 'Sleek weatherproof cross-body messenger designed for modern commuters. Fits up to a 14-inch laptop with quick-release magnetic buckles and internal organizer slots.',
    imageUrl: '/p3.png',
    category: 'Crossbody',
    stock: 20,
    isActive: true,
    rating: 4.7,
    badge: 'New',
    material: 'Waterproof 900D Nylon',
    dimensions: '38cm x 27cm x 10cm',
  },
  {
    _id: '4',
    name: 'Elegance Premium Leather Handbag',
    price: 3999,
    description: 'Sophisticated structured tote handbag crafted with smooth genuine leather, golden metallic accents, dual top handles, and detachable leather cross-body strap.',
    imageUrl: '/p4.png',
    category: 'Handbags',
    stock: 12,
    isActive: true,
    rating: 4.9,
    badge: 'Premium',
    material: 'Genuine Italian Calfskin Leather',
    dimensions: '34cm x 26cm x 14cm',
  },
  {
    _id: '5',
    name: 'Compact Travel Sling Bag',
    price: 1499,
    description: 'Ultra-lightweight anti-theft body sling with USB charging port, hidden back RFID zipper pocket, and ambidextrous strap attachment for easy chest or back wear.',
    imageUrl: '/p5.png',
    category: 'Crossbody',
    stock: 25,
    isActive: true,
    rating: 4.6,
    material: 'Ripstop Ballistic Polyester',
    dimensions: '30cm x 18cm x 8cm',
  },
  {
    _id: '6',
    name: 'Everyday Canvas Tote Bag',
    price: 1199,
    description: 'Eco-friendly organic cotton canvas tote with interior zippered phone pocket, key leash, and sturdy double-stitched handles built for daily shopping or college life.',
    imageUrl: '/p6.png',
    category: 'Handbags',
    stock: 30,
    isActive: true,
    rating: 4.8,
    material: '100% Organic Heavyweight Canvas',
    dimensions: '40cm x 35cm x 12cm',
  },
  {
    _id: '7',
    name: 'Rugged Canvas Heritage Backpack',
    price: 2699,
    description: 'Vintage-inspired roll-top backpack with bronze buckle closures, twin side water bottle pockets, and breathable mesh back paneling.',
    imageUrl: '/p7.png',
    category: 'Backpacks',
    stock: 10,
    isActive: true,
    rating: 4.7,
    material: 'Heavy Canvas & Antique Brass',
    dimensions: '46cm x 32cm x 16cm',
  },
  {
    _id: '8',
    name: 'Pro Tech Commuter Laptop Backpack',
    price: 3199,
    description: 'Engineered for tech enthusiasts with TSA-friendly 180° opening, dual laptop & tablet sleeves, luggage trolley strap, and hidden anti-theft pocket.',
    imageUrl: '/p8.png',
    category: 'Backpacks',
    stock: 18,
    isActive: true,
    rating: 4.9,
    badge: 'Hot',
    material: 'Waterproof Oxford Polyester',
    dimensions: '45cm x 31cm x 17cm',
  },
  {
    _id: '9',
    name: 'Leather Crossbody Shoulder Pouch',
    price: 1799,
    description: 'Compact genuine leather pouch ideal for phone, wallet, passport, and daily essentials. Slim profile with adjustable soft leather strap.',
    imageUrl: '/p9.png',
    category: 'Crossbody',
    stock: 22,
    isActive: true,
    rating: 4.6,
    material: 'Top-grain Nappa Leather',
    dimensions: '22cm x 16cm x 5cm',
  },
  {
    _id: '10',
    name: 'Weekender Expandable Duffel Bag',
    price: 3299,
    description: 'High-capacity expandable travel bag with separate wet/dry compartment, suitcase sleeve attachment, and padded shoulder cushion.',
    imageUrl: '/p10.png',
    category: 'Travel',
    stock: 14,
    isActive: true,
    rating: 4.8,
    material: 'High-Density Water-Resistant Nylon',
    dimensions: '50cm x 30cm x 22cm',
  },
];
