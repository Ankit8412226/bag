'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Eye, Tag } from 'lucide-react';
import { generateProductWhatsAppUrl } from '@/lib/whatsapp';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category?: string;
  stock?: number;
  isActive: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  const waUrl = generateProductWhatsAppUrl(product.name, product.price);
  const inStock = product.stock === undefined || product.stock > 0;

  return (
    <div className="product-card" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* Image container */}
      <div
        className="card-image"
        style={{
          position: 'relative',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          background: '#f5f0e8',
        }}
      >
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />

        {/* Out of stock overlay */}
        {!inStock && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'rgba(26,26,26,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{
              background: '#fff', color: '#1a1a1a',
              fontSize: 12, fontWeight: 700,
              padding: '6px 16px', borderRadius: 100,
              letterSpacing: '0.04em',
            }}>Out of Stock</span>
          </div>
        )}

        {/* Category badge */}
        {product.category && (
          <div style={{
            position: 'absolute', top: 12, left: 12,
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(8px)',
            padding: '4px 10px', borderRadius: 100,
            display: 'flex', alignItems: 'center', gap: 5,
            fontSize: 11, fontWeight: 600, color: '#1a1a1a',
          }}>
            <Tag style={{ width: 10, height: 10 }} />
            {product.category}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, gap: 0 }}>
        <h3 style={{
          fontSize: 14, fontWeight: 600, color: '#1a1a1a',
          lineHeight: 1.35, marginBottom: 5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {product.name}
        </h3>

        <p style={{
          fontSize: 12, color: 'rgba(26,26,26,0.5)',
          lineHeight: 1.5, marginBottom: 12,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {product.description}
        </p>

        {/* Price row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <span style={{
            fontFamily: 'var(--font-playfair-loaded), "Playfair Display", Georgia, serif',
            fontSize: 20, fontWeight: 700, color: '#1a1a1a',
          }}>
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {inStock && product.stock !== undefined && (
            <span style={{ fontSize: 11, color: '#16a34a', fontWeight: 600 }}>In Stock</span>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
          <Link
            href={`/products/${product._id}`}
            id={`view-product-${product._id}`}
            style={{
              flex: 1, display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 5,
              border: '1.5px solid #e5ddd2', borderRadius: 12,
              fontSize: 13, fontWeight: 600, color: '#1a1a1a',
              padding: '9px 8px', textDecoration: 'none',
              transition: 'border-color 0.2s, background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = '#1a1a1a';
              el.style.background = '#1a1a1a';
              el.style.color = '#fff';
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = '#e5ddd2';
              el.style.background = 'transparent';
              el.style.color = '#1a1a1a';
            }}
          >
            <Eye style={{ width: 13, height: 13 }} />
            View
          </Link>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            id={`buy-whatsapp-${product._id}`}
            style={{
              flex: 1, display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 5,
              background: '#25D366', borderRadius: 12,
              fontSize: 13, fontWeight: 600, color: '#fff',
              padding: '9px 8px', textDecoration: 'none',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#1fb859')}
            onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = '#25D366')}
          >
            <MessageCircle style={{ width: 13, height: 13 }} />
            Buy
          </a>
        </div>
      </div>
    </div>
  );
}
