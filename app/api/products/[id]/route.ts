import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import { isAdminAuthenticated } from '@/lib/auth';
import { DUMMY_PRODUCTS } from '@/lib/productsData';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = await connectDB();

    if (!db) {
      const dummy = DUMMY_PRODUCTS.find(p => p._id === id);
      if (!dummy) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json({ product: dummy });
    }

    const product = await Product.findById(id).lean();
    if (!product) {
      const dummy = DUMMY_PRODUCTS.find(p => p._id === id);
      if (dummy) return NextResponse.json({ product: dummy });
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch {
    const { id } = await params;
    const dummy = DUMMY_PRODUCTS.find(p => p._id === id);
    if (dummy) return NextResponse.json({ product: dummy });
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuthenticated = await isAdminAuthenticated();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    }
    const { id } = await params;
    const body = await request.json();
    const { name, price, description, imageUrl, category, stock, isActive } = body;

    const product = await Product.findByIdAndUpdate(
      id,
      {
        ...(name && { name }),
        ...(price !== undefined && { price: Number(price) }),
        ...(description && { description }),
        ...(imageUrl && { imageUrl }),
        ...(category !== undefined && { category }),
        ...(stock !== undefined && { stock: stock === '' ? undefined : Number(stock) }),
        ...(isActive !== undefined && { isActive }),
      },
      { new: true, runValidators: true }
    );

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (error) {
    console.error('PUT /api/products/[id] error:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuthenticated = await isAdminAuthenticated();
  if (!isAuthenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ error: 'Database unavailable' }, { status: 503 });
    }
    const { id } = await params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product deleted' });
  } catch {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
