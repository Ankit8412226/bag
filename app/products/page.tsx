'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ProductCard from '@/components/ProductCard';

const ALL_PRODUCTS = [
  { _id: '1', name: 'Classic Leather Backpack', price: 1499, category: 'Backpacks', stock: 15, isActive: true, imageUrl: '/p1.png', description: 'Timeless brown leather backpack with gold hardware and multiple compartments. Perfect for everyday use.' },
  { _id: '2', name: 'Premium Travel Backpack', price: 2299, category: 'Backpacks', stock: 10, isActive: true, imageUrl: '/p2.png', description: 'Sleek black travel backpack with laptop compartment. Waterproof, built for modern professionals.' },
  { _id: '3', name: "Women's Tote Bag", price: 1899, category: 'Tote Bags', stock: 20, isActive: true, imageUrl: '/p3.png', description: 'Elegant tan leather tote with gold hardware and spacious interior.' },
  { _id: '4', name: 'Casual Sling Bag', price: 799, category: 'Sling Bags', stock: 25, isActive: true, imageUrl: '/p4.png', description: 'Lightweight olive canvas sling bag for daily essentials. Compact and comfortable.' },
  { _id: '5', name: 'Laptop Backpack', price: 1699, category: 'Backpacks', stock: 12, isActive: true, imageUrl: '/p5.png', description: 'Anti-theft charcoal laptop backpack with USB charging port. Fits up to 15.6".' },
  { _id: '6', name: 'Canvas Backpack', price: 999, category: 'Backpacks', stock: 18, isActive: true, imageUrl: '/p6.png', description: 'Vintage khaki canvas rucksack with leather trim. Great for outdoor adventures.' },
  { _id: '7', name: 'Office Messenger Bag', price: 2099, category: 'Messenger Bags', stock: 8, isActive: true, imageUrl: '/p7.png', description: 'Dark chocolate leather messenger bag with brass buckles and dedicated laptop sleeve.' },
  { _id: '8', name: 'Travel Duffel Bag', price: 2499, category: 'Duffel Bags', stock: 6, isActive: true, imageUrl: '/p8.png', description: 'Navy blue waxed canvas duffel with tan leather handles. Perfect weekend bag.' },
  { _id: '9', name: 'Mini Crossbody Bag', price: 1199, category: 'Crossbody Bags', stock: 22, isActive: true, imageUrl: '/p9.png', description: 'Chic blush pink mini crossbody with gold chain strap and turn-lock closure.' },
  { _id: '10', name: 'Premium Handbag', price: 3499, category: 'Handbags', stock: 5, isActive: true, imageUrl: '/p10.png', description: 'Structured black leather handbag with gold hardware. A timeless statement piece.' },
];

const ALL_CATS = ['All', ...Array.from(new Set(ALL_PRODUCTS.map(p => p.category)))];

const serif: React.CSSProperties = {
  fontFamily: 'var(--font-playfair-loaded),"Playfair Display",Georgia,serif',
};

export default function ProductsPage() {
  const [activeCat, setActiveCat] = useState('All');

  const filtered = activeCat === 'All'
    ? ALL_PRODUCTS
    : ALL_PRODUCTS.filter(p => p.category === activeCat);

  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh', background: '#faf7f2', paddingTop: 96, paddingBottom: 96 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>

          {/* Page Header */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.16em',
              textTransform: 'uppercase', color: '#a0824e', marginBottom: 12,
            }}>Our Collection</p>
            <h1 style={{
              ...serif,
              fontSize: 'clamp(36px, 5vw, 56px)',
              fontWeight: 800, color: '#1a1a1a',
              letterSpacing: '-0.02em', marginBottom: 12,
            }}>All Bags</h1>
            <p style={{ fontSize: 16, color: 'rgba(26,26,26,0.5)', maxWidth: 380, margin: '0 auto' }}>
              {filtered.length} premium bags — crafted for every journey
            </p>
          </div>

          {/* Category Filters */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 8,
            justifyContent: 'center', marginBottom: 44,
          }}>
            {ALL_CATS.map(cat => {
              const isActive = activeCat === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  style={{
                    padding: '8px 20px',
                    borderRadius: 100,
                    border: `1.5px solid ${isActive ? '#1a1a1a' : '#e8e0d4'}`,
                    fontSize: 13, fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#fff' : 'rgba(26,26,26,0.65)',
                    background: isActive ? '#1a1a1a' : '#fff',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap',
                    fontFamily: 'inherit',
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Products Grid */}
          <div
            style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 18 }}
            className="md-grid-4"
          >
            {filtered.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '64px 0' }}>
              <p style={{ fontSize: 48, marginBottom: 12 }}>🎒</p>
              <p style={{ color: 'rgba(26,26,26,0.4)', fontSize: 16 }}>No bags in this category yet.</p>
            </div>
          )}

        </div>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
