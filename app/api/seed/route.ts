import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import Admin from '@/models/Admin';

const sampleProducts = [
  {
    name: 'Classic Leather Backpack',
    price: 1499,
    description: 'A timeless brown leather backpack with gold hardware and multiple compartments. Perfect for everyday use and travel.',
    imageUrl: '/p1.png',
    category: 'Backpacks',
    stock: 15,
    isActive: true,
  },
  {
    name: 'Premium Travel Backpack',
    price: 2299,
    description: 'Sleek black travel backpack with dedicated laptop compartment. Waterproof and built for modern professionals.',
    imageUrl: '/p2.png',
    category: 'Backpacks',
    stock: 10,
    isActive: true,
  },
  {
    name: "Women's Tote Bag",
    price: 1899,
    description: 'Elegant tan leather tote with gold hardware and spacious interior. Ideal for work and weekend outings.',
    imageUrl: '/p3.png',
    category: 'Tote Bags',
    stock: 20,
    isActive: true,
  },
  {
    name: 'Casual Sling Bag',
    price: 799,
    description: 'Lightweight olive green canvas sling bag for daily essentials. Compact, stylish, and comfortable.',
    imageUrl: '/p4.png',
    category: 'Sling Bags',
    stock: 25,
    isActive: true,
  },
  {
    name: 'Laptop Backpack',
    price: 1699,
    description: 'Anti-theft charcoal laptop backpack with USB charging port and padded straps. Fits up to 15.6" laptop.',
    imageUrl: '/p5.png',
    category: 'Backpacks',
    stock: 12,
    isActive: true,
  },
  {
    name: 'Canvas Backpack',
    price: 999,
    description: 'Vintage-inspired khaki canvas rucksack with leather trim accents. Great for outdoor adventures.',
    imageUrl: '/p6.png',
    category: 'Backpacks',
    stock: 18,
    isActive: true,
  },
  {
    name: 'Office Messenger Bag',
    price: 2099,
    description: 'Dark chocolate leather messenger bag with brass buckles and dedicated laptop sleeve. Professional and stylish.',
    imageUrl: '/p7.png',
    category: 'Messenger Bags',
    stock: 8,
    isActive: true,
  },
  {
    name: 'Travel Duffel Bag',
    price: 2499,
    description: 'Navy blue waxed canvas duffel with tan leather handles. Perfect weekend bag for the modern traveller.',
    imageUrl: '/p8.png',
    category: 'Duffel Bags',
    stock: 6,
    isActive: true,
  },
  {
    name: 'Mini Crossbody Bag',
    price: 1199,
    description: 'Chic blush pink mini crossbody with gold chain strap and turn-lock closure. Perfect for evenings out.',
    imageUrl: '/p9.png',
    category: 'Crossbody Bags',
    stock: 22,
    isActive: true,
  },
  {
    name: 'Premium Handbag',
    price: 3499,
    description: 'Structured black leather handbag with gold hardware. A timeless statement piece for every wardrobe.',
    imageUrl: '/p10.png',
    category: 'Handbags',
    stock: 5,
    isActive: true,
  },
];

export async function GET() {
  try {
    await connectDB();

    // Create default admin if none exists
    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      await Admin.create({
        email: 'admin@bagcorner.com',
        password: 'admin123',
      });
    }

    // Seed products
    const productCount = await Product.countDocuments();
    let seeded = 0;
    if (productCount === 0) {
      await Product.insertMany(sampleProducts);
      seeded = sampleProducts.length;
    }

    return NextResponse.json({
      message: 'Seed completed',
      adminCreated: adminCount === 0,
      productsSeeded: seeded,
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Seed failed' }, { status: 500 });
  }
}
