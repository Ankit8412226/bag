import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { isAdminAuthenticated } from '@/lib/auth';
import { DUMMY_PRODUCTS } from '@/lib/productsData';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '0');
    const category = searchParams.get('category');
    const all = searchParams.get('all') === 'true';
    const showAll = all && (await isAdminAuthenticated());

    const db = await connectDB();
    if (!db) {
      let filtered = [...DUMMY_PRODUCTS];
      if (category) {
        filtered = filtered.filter(p => p.category.toLowerCase() === category.toLowerCase());
      }
      if (limit > 0) {
        filtered = filtered.slice(0, limit);
      }
      return NextResponse.json({ products: filtered });
    }

    const filter: Record<string, unknown> = showAll ? {} : { isActive: true };
    if (category) filter.category = category;

    let query = Product.find(filter).sort({ createdAt: -1 });
    if (limit > 0) query = query.limit(limit);

    const products = await query.lean();
    return NextResponse.json({ products: products.length > 0 ? products : DUMMY_PRODUCTS });
  } catch (error) {
    console.warn('GET /api/products using fallback data:', error);
    return NextResponse.json({ products: DUMMY_PRODUCTS });
  }
}

export async function POST(request: Request) {
  const isAuthenticated = await isAdminAuthenticated();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    }

    const body = await request.json();
    const { name, price, description, imageUrl, category, stock, isActive } = body;

    if (!name || !price || !description || !imageUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const product = await Product.create({
      name,
      price: Number(price),
      description,
      imageUrl,
      category,
      stock: stock !== undefined ? Number(stock) : undefined,
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error('POST /api/products error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
