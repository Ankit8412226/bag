'use client';

import Image from 'next/image';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { ArrowLeft, Package, Tag, CheckCircle, XCircle, MessageCircle, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { generateProductWhatsAppUrl } from '@/lib/whatsapp';

interface Product {
  _id: string; name: string; price: number; description: string;
  imageUrl: string; category?: string; stock?: number; isActive: boolean;
}

const serif: React.CSSProperties = {
  fontFamily: 'var(--font-playfair-loaded),"Playfair Display",Georgia,serif',
};

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    fetch(`/api/products/${id}`)
      .then(r => {
        if (r.status === 404) { setMissing(true); return null; }
        return r.json();
      })
      .then(data => {
        if (data) setProduct(data.product ?? null);
      })
      .catch(() => setMissing(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <main style={{ minHeight: '100vh', background: '#faf7f2', paddingTop: 96, paddingBottom: 80 }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <Loader2 style={{ width: 36, height: 36, color: '#c8a876', animation: 'spin 1s linear infinite' }} />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (missing || !product) {
    notFound();
  }

  const waUrl = generateProductWhatsAppUrl(product!.name, product!.price);
  const inStock = product!.stock === undefined || product!.stock > 0;

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
            <span style={{ color: '#1a1a1a', fontSize: 13.5, fontWeight: 600 }}>{product!.name}</span>
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
                src={product!.imageUrl}
                alt={product!.name}
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
              {product!.category && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  color: '#a0824e', fontSize: 11.5, fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14,
                }}>
                  <Tag style={{ width: 12, height: 12 }} />
                  {product!.category}
                </div>
              )}

              <h1 style={{
                ...serif,
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                fontWeight: 800, color: '#1a1a1a',
                lineHeight: 1.15, marginBottom: 16, letterSpacing: '-0.02em',
              }}>
                {product!.name}
              </h1>

              <div style={{ ...serif, fontSize: 38, fontWeight: 800, color: '#1a1a1a', marginBottom: 20 }}>
                ₹{product!.price.toLocaleString('en-IN')}
              </div>

              <p style={{ fontSize: 15.5, color: 'rgba(26,26,26,0.62)', lineHeight: 1.78, marginBottom: 28 }}>
                {product!.description}
              </p>

              {/* Stock */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
                {inStock ? (
                  <>
                    <CheckCircle style={{ width: 18, height: 18, color: '#16a34a' }} />
                    <span style={{ color: '#16a34a', fontWeight: 600, fontSize: 14 }}>
                      {product!.stock !== undefined ? `${product!.stock} units in stock` : 'In Stock'}
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
                  ...(product!.category ? [['Category', product!.category, false]] : []),
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
