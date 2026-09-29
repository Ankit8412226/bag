'use client';

import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { notFound } from 'next/navigation';
import { ArrowLeft, Package, Tag, CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { generateProductWhatsAppUrl } from '@/lib/whatsapp';

interface Product {
  _id: string; name: string; price: number; description: string;
  imageUrl: string; category?: string; stock?: number; isActive: boolean;
}

const DUMMY_MAP: Record<string, Product> = {
  '1': { _id: '1', name: 'Classic Leather Backpack', price: 1499, category: 'Backpacks', stock: 15, isActive: true, imageUrl: '/p1.png', description: 'A timeless brown leather backpack with gold hardware and multiple compartments. Crafted from genuine full-grain leather, designed to age beautifully. Features a padded laptop sleeve, multiple organizer pockets, and comfortable padded shoulder straps.' },
  '2': { _id: '2', name: 'Premium Travel Backpack', price: 2299, category: 'Backpacks', stock: 10, isActive: true, imageUrl: '/p2.png', description: 'Sleek black travel backpack with dedicated laptop compartment. Waterproof and built for modern professionals. Includes USB charging port, anti-theft hidden pocket, and ergonomic back support system. Fits up to 15.6" laptops.' },
  '3': { _id: '3', name: "Women's Tote Bag", price: 1899, category: 'Tote Bags', stock: 20, isActive: true, imageUrl: '/p3.png', description: 'Elegant tan leather tote with gold hardware and spacious interior. Perfect for work or weekend outings. Features multiple internal pockets, a secure zip closure, and comfortable top handles with optional crossbody strap.' },
  '4': { _id: '4', name: 'Casual Sling Bag', price: 799, category: 'Sling Bags', stock: 25, isActive: true, imageUrl: '/p4.png', description: 'Lightweight olive green canvas sling bag for daily essentials. Compact, stylish, and comfortable for all-day wear. Adjustable strap, zip closure, and front quick-access pocket.' },
  '5': { _id: '5', name: 'Laptop Backpack', price: 1699, category: 'Backpacks', stock: 12, isActive: true, imageUrl: '/p5.png', description: 'Anti-theft charcoal laptop backpack with USB charging port and padded straps. Fits up to 15.6" laptop. Water-resistant fabric, multiple compartments for ultimate organization.' },
  '6': { _id: '6', name: 'Canvas Backpack', price: 999, category: 'Backpacks', stock: 18, isActive: true, imageUrl: '/p6.png', description: 'Vintage-inspired khaki canvas rucksack with leather trim accents. Great for outdoor adventures and casual daily use. Drawstring top closure with leather buckle straps for a classic look.' },
  '7': { _id: '7', name: 'Office Messenger Bag', price: 2099, category: 'Messenger Bags', stock: 8, isActive: true, imageUrl: '/p7.png', description: 'Dark chocolate leather messenger bag with brass buckles and dedicated laptop sleeve. Professional, functional, and stylish. Ideal for the modern office professional.' },
  '8': { _id: '8', name: 'Travel Duffel Bag', price: 2499, category: 'Duffel Bags', stock: 6, isActive: true, imageUrl: '/p8.png', description: 'Navy blue waxed canvas duffel with tan leather handles. Perfect weekend bag for the modern traveller. Large main compartment, end pocket for shoes, and detachable shoulder strap.' },
  '9': { _id: '9', name: 'Mini Crossbody Bag', price: 1199, category: 'Crossbody Bags', stock: 22, isActive: true, imageUrl: '/p9.png', description: 'Chic blush pink mini crossbody with gold chain strap and turn-lock closure. Perfect for evenings out or light daily carry. Compact yet spacious enough for essentials.' },
  '10': { _id: '10', name: 'Premium Handbag', price: 3499, category: 'Handbags', stock: 5, isActive: true, imageUrl: '/p10.png', description: 'Structured black leather handbag with gold hardware and top handle. A timeless statement piece for every wardrobe. Features suede interior, multiple pockets, and comes with a dust bag.' },
};

const serif: React.CSSProperties = {
  fontFamily: 'var(--font-playfair-loaded),"Playfair Display",Georgia,serif',
};

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = DUMMY_MAP[id];
  if (!product) notFound();

  const waUrl = generateProductWhatsAppUrl(product.name, product.price);
  const inStock = product.stock === undefined || product.stock > 0;

  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh', background: '#faf7f2', paddingTop: 96, paddingBottom: 80 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 36 }}>
            <Link href="/products" style={{
              display: 'flex', alignItems: 'center', gap: 6,
              color: 'rgba(26,26,26,0.4)', fontSize: 13.5, textDecoration: 'none',
            }}>
              <ArrowLeft style={{ width: 14, height: 14 }} />
              All Bags
            </Link>
            <span style={{ color: 'rgba(26,26,26,0.22)' }}>/</span>
            <span style={{ color: '#1a1a1a', fontSize: 13.5, fontWeight: 600 }}>{product.name}</span>
          </div>

          {/* Two-column layout */}
          <div className="detail-grid" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

            {/* Image */}
            <div style={{
              position: 'relative', aspectRatio: '1 / 1',
              borderRadius: 24, overflow: 'hidden',
              background: '#fff', border: '1px solid #e8e0d4',
              flexShrink: 0,
            }}>
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                priority
                loading="eager"
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 1024px) 100vw, 560px"
              />
              {!inStock && (
                <div style={{
                  position: 'absolute', inset: 0, background: 'rgba(26,26,26,0.45)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ background: '#fff', color: '#1a1a1a', fontWeight: 700, fontSize: 16, padding: '10px 28px', borderRadius: 100 }}>
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* Details */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {product.category && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  color: '#a0824e', fontSize: 11.5, fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14,
                }}>
                  <Tag style={{ width: 12, height: 12 }} />
                  {product.category}
                </div>
              )}

              <h1 style={{
                ...serif,
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: 800, color: '#1a1a1a',
                lineHeight: 1.15, marginBottom: 16, letterSpacing: '-0.02em',
              }}>
                {product.name}
              </h1>

              <div style={{ ...serif, fontSize: 38, fontWeight: 800, color: '#1a1a1a', marginBottom: 20 }}>
                ₹{product.price.toLocaleString('en-IN')}
              </div>

              <p style={{ fontSize: 15.5, color: 'rgba(26,26,26,0.62)', lineHeight: 1.78, marginBottom: 28 }}>
                {product.description}
              </p>

              {/* Stock */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
                {inStock ? (
                  <>
                    <CheckCircle style={{ width: 18, height: 18, color: '#16a34a' }} />
                    <span style={{ color: '#16a34a', fontWeight: 600, fontSize: 14 }}>
                      {product.stock !== undefined ? `${product.stock} units in stock` : 'In Stock'}
                    </span>
                  </>
                ) : (
                  <>
                    <XCircle style={{ width: 18, height: 18, color: '#dc2626' }} />
                    <span style={{ color: '#dc2626', fontWeight: 600, fontSize: 14 }}>Out of Stock</span>
                  </>
                )}
              </div>

              {/* WhatsApp Buy Button */}
              <a
                href={inStock ? waUrl : undefined}
                target={inStock ? '_blank' : undefined}
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  background: inStock ? '#25D366' : 'rgba(37,211,102,0.35)',
                  color: '#fff', padding: '17px 28px',
                  borderRadius: 16, fontSize: 17, fontWeight: 700,
                  textDecoration: 'none', marginBottom: 10,
                  transition: 'background 0.2s, transform 0.2s',
                  cursor: inStock ? 'pointer' : 'not-allowed',
                }}
                onMouseEnter={e => { if (inStock) { e.currentTarget.style.background = '#1fb859'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
                onMouseLeave={e => { e.currentTarget.style.background = inStock ? '#25D366' : 'rgba(37,211,102,0.35)'; e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <MessageCircle style={{ width: 22, height: 22 }} />
                Buy Now on WhatsApp
              </a>

              <p style={{ textAlign: 'center', color: 'rgba(26,26,26,0.35)', fontSize: 12.5, marginBottom: 28 }}>
                You&apos;ll be redirected to WhatsApp to complete your purchase
              </p>

              {/* Details box */}
              <div style={{ padding: '20px 22px', background: '#fff', borderRadius: 16, border: '1px solid #e8e0d4' }}>
                <h3 style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  fontSize: 12, fontWeight: 700, color: '#1a1a1a',
                  marginBottom: 14, letterSpacing: '0.06em', textTransform: 'uppercase',
                }}>
                  <Package style={{ width: 13, height: 13, color: '#c8a876' }} />
                  Product Details
                </h3>
                {[
                  ...(product.category ? [['Category', product.category, false]] : []),
                  ['Availability', inStock ? 'Available' : 'Out of Stock', true],
                  ['Purchase via', 'WhatsApp', false],
                ].map(([k, v, isStock]) => (
                  <div key={String(k)} style={{
                    display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '9px 0',
                    borderBottom: '1px solid #f5f0e8',
                    fontSize: 13.5,
                  }}>
                    <span style={{ color: 'rgba(26,26,26,0.42)' }}>{k}</span>
                    <span style={{
                      fontWeight: 600,
                      color: isStock ? (inStock ? '#16a34a' : '#dc2626') : '#1a1a1a',
                    }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
