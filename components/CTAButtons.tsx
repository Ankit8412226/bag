'use client';

import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';

interface HeroCTAProps {
  waUrl: string;
}

export function HeroCTA({ waUrl }: HeroCTAProps) {
  return (
    <div className="anim-fade-up anim-d3" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
      <Link href="/products" id="hero-shop-bags-btn"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#1a1a1a', color: '#fff',
          padding: '15px 32px', borderRadius: 100,
          fontWeight: 700, fontSize: 15,
          textDecoration: 'none', letterSpacing: '-0.01em',
          transition: 'background 0.2s, transform 0.2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background='#0d0d0d'; (e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background='#1a1a1a'; (e.currentTarget as HTMLAnchorElement).style.transform='translateY(0)'; }}
      >
        Shop Bags <ArrowRight style={{ width: 17, height: 17 }} />
      </Link>
      <a href={waUrl} target="_blank" rel="noopener noreferrer" id="hero-whatsapp-btn"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#25D366', color: '#fff',
          padding: '15px 28px', borderRadius: 100,
          fontWeight: 700, fontSize: 15,
          textDecoration: 'none',
          transition: 'background 0.2s, transform 0.2s',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background='#1fb859'; (e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'; }}
        onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background='#25D366'; (e.currentTarget as HTMLAnchorElement).style.transform='translateY(0)'; }}
      >
        <MessageCircle style={{ width: 17, height: 17 }} />
        WhatsApp Us
      </a>
    </div>
  );
}

export function ViewAllBtn() {
  return (
    <Link href="/products" id="view-all-products-btn"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        border: '2px solid #1a1a1a', color: '#1a1a1a',
        padding: '14px 32px', borderRadius: 100,
        fontWeight: 700, fontSize: 15,
        textDecoration: 'none',
        transition: 'background 0.2s, color 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background='#1a1a1a'; el.style.color='#fff'; el.style.transform='translateY(-2px)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.background='transparent'; el.style.color='#1a1a1a'; el.style.transform='translateY(0)';
      }}
    >
      View All Bags <ArrowRight style={{ width: 16, height: 16 }} />
    </Link>
  );
}

export function CTAWhatsApp({ waUrl }: { waUrl: string }) {
  return (
    <a href={waUrl} target="_blank" rel="noopener noreferrer" id="cta-whatsapp-btn"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        background: '#25D366', color: '#fff',
        padding: '16px 36px', borderRadius: 100,
        fontWeight: 700, fontSize: 16,
        textDecoration: 'none',
        transition: 'background 0.2s, transform 0.2s',
      }}
      onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background='#1fb859'; (e.currentTarget as HTMLAnchorElement).style.transform='translateY(-2px)'; }}
      onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background='#25D366'; (e.currentTarget as HTMLAnchorElement).style.transform='translateY(0)'; }}
    >
      <MessageCircle style={{ width: 20, height: 20 }} />
      Chat on WhatsApp
    </a>
  );
}
