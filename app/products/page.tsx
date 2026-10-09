'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ProductCard from '@/components/ProductCard';
import { DUMMY_PRODUCTS } from '@/lib/productsData';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock?: number;
  isActive: boolean;
  imageUrl: string;
  description: string;
}

const serif: React.CSSProperties = {
  fontFamily: 'var(--font-playfair-loaded),"Playfair Display",Georgia,serif',
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCat, setActiveCat] = useState('All');

  useEffect(() => {
    fetch('/api/products')
      .then(r => r.json())
      .then(data => {
        const list = data.products ?? [];
        setProducts(list.length > 0 ? list : DUMMY_PRODUCTS);
      })
      .catch(() => setProducts(DUMMY_PRODUCTS as unknown as Product[]))
      .finally(() => setLoading(false));
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];
  const filtered = activeCat === 'All' ? products : products.filter(p => p.category === activeCat);

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
              {loading ? 'Loading collection…' : `${filtered.length} premium bags — crafted for every journey`}
            </p>
          </div>

          {/* Category Filters */}
          {!loading && (
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: 8,
              justifyContent: 'center', marginBottom: 44,
            }}>
              {categories.map(cat => {
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
          )}

          {/* Loading skeleton */}
          {loading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 18 }} className="md-grid-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} style={{
                  background: '#fff', borderRadius: 20,
                  border: '1px solid #e8e0d4', overflow: 'hidden',
                  animation: 'pulse 1.5s ease-in-out infinite',
                }}>
                  <div style={{ aspectRatio: '1 / 1', background: '#f0ebe3' }} />
                  <div style={{ padding: 16 }}>
                    <div style={{ height: 14, background: '#f0ebe3', borderRadius: 8, marginBottom: 8 }} />
                    <div style={{ height: 14, background: '#f0ebe3', borderRadius: 8, width: '60%' }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {!loading && (
            <div
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 18 }}
              className="md-grid-4"
            >
              {filtered.map(product => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}

          {!loading && filtered.length === 0 && (
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
