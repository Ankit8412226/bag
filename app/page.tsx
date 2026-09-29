'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  MessageCircle, ArrowRight, ShieldCheck, Star, Truck, Sparkles,
  Package, Heart, Award, Users, MapPin, Phone, Mail,
  CheckCircle, TrendingUp, Zap
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ProductCard from '@/components/ProductCard';
import { generateGeneralWhatsAppUrl } from '@/lib/whatsapp';

const PRODUCTS = [
  { _id: '1', name: 'Classic Leather Backpack', price: 1499, category: 'Backpacks', stock: 15, isActive: true, imageUrl: '/p1.png', description: 'Timeless brown leather backpack with gold hardware and multiple compartments.' },
  { _id: '2', name: 'Premium Travel Backpack', price: 2299, category: 'Backpacks', stock: 10, isActive: true, imageUrl: '/p2.png', description: 'Sleek black travel backpack with laptop compartment. Waterproof, built for modern professionals.' },
  { _id: '3', name: "Women's Tote Bag", price: 1899, category: 'Tote Bags', stock: 20, isActive: true, imageUrl: '/p3.png', description: 'Elegant tan leather tote with gold hardware and spacious interior.' },
  { _id: '4', name: 'Casual Sling Bag', price: 799, category: 'Sling Bags', stock: 25, isActive: true, imageUrl: '/p4.png', description: 'Lightweight olive canvas sling bag for daily essentials.' },
  { _id: '5', name: 'Laptop Backpack', price: 1699, category: 'Backpacks', stock: 12, isActive: true, imageUrl: '/p5.png', description: 'Anti-theft charcoal laptop backpack with USB charging port.' },
  { _id: '6', name: 'Canvas Backpack', price: 999, category: 'Backpacks', stock: 18, isActive: true, imageUrl: '/p6.png', description: 'Vintage khaki canvas rucksack with leather trim.' },
];

const waUrl = generateGeneralWhatsAppUrl();

const sf: React.CSSProperties = {
  fontFamily: 'var(--font-playfair-loaded),"Playfair Display",Georgia,serif',
};

const categories = [
  { name: 'Backpacks', emoji: '🎒', count: 4, color: '#fdf3e3' },
  { name: 'Tote Bags', emoji: '👜', count: 3, color: '#f3e8ff' },
  { name: 'Sling Bags', emoji: '👝', count: 3, color: '#e8f5e9' },
  { name: 'Handbags', emoji: '💼', count: 2, color: '#fce4ec' },
  { name: 'Duffel Bags', emoji: '🧳', count: 2, color: '#e3f2fd' },
  { name: 'Crossbody', emoji: '👛', count: 3, color: '#fff8e1' },
];

const stats = [
  { value: '1,200+', label: 'Happy Customers', icon: Users },
  { value: '50+', label: 'Bag Styles', icon: Package },
  { value: '4.9★', label: 'Average Rating', icon: Star },
  { value: '3 Days', label: 'Avg Delivery', icon: Truck },
];

export default function HomePage() {
  return (
    <>
      <Header />
      <main>

        {/* ═══════════ HERO ═══════════ */}
        <section style={{
          position: 'relative', minHeight: '100vh',
          display: 'flex', alignItems: 'center',
          background: 'linear-gradient(145deg, #faf7f2 0%, #f0e8d8 100%)',
          overflow: 'hidden',
        }}>
          <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: 600, height: 600, borderRadius: '50%', background: 'rgba(200,168,118,0.07)', filter: 'blur(80px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '0%', left: '-5%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(160,130,78,0.05)', filter: 'blur(60px)', pointerEvents: 'none' }} />

          {/* Right image — desktop */}
          <div className="hero-img-right" style={{ display: 'none', position: 'absolute', right: 0, top: 0, bottom: 0, width: '50%' }}>
            <Image src="/hero.png" alt="BagCorner bags" fill priority loading="eager" style={{ objectFit: 'cover' }} sizes="50vw" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #faf7f2 0%, rgba(250,247,242,0) 50%)' }} />
          </div>

          {/* Mobile bg */}
          <div style={{ position: 'absolute', inset: 0 }}>
            <Image src="/hero.png" alt="" fill aria-hidden priority loading="eager" style={{ objectFit: 'cover', opacity: 0.06 }} sizes="100vw" />
          </div>

          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '128px 24px 80px', position: 'relative', zIndex: 1, width: '100%' }}>
            <div style={{ maxWidth: 560 }}>
              <div className="anim-fade-up" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(200,168,118,0.15)', border: '1px solid rgba(160,130,78,0.3)',
                color: '#8a6a30', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                padding: '7px 18px', borderRadius: 100, marginBottom: 28,
              }}>
                <Sparkles style={{ width: 12, height: 12 }} /> New Collection 2025
              </div>

              <h1 className="anim-fade-up anim-d1" style={{
                ...sf, fontSize: 'clamp(50px, 7vw, 80px)',
                fontWeight: 800, lineHeight: 1.08, color: '#1a1a1a',
                marginBottom: 22, letterSpacing: '-0.025em',
              }}>
                Carry Your<br />
                <em style={{ fontStyle: 'italic', background: 'linear-gradient(135deg, #c8a876, #a0824e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Style</em><br />
                Everywhere.
              </h1>

              <p className="anim-fade-up anim-d2" style={{ fontSize: 18, color: 'rgba(26,26,26,0.58)', lineHeight: 1.75, marginBottom: 36, maxWidth: 420 }}>
                Discover premium bags crafted for every journey — from everyday essentials to weekend adventures.
              </p>

              <div className="anim-fade-up anim-d3" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1a1a1a', color: '#fff', padding: '15px 30px', borderRadius: 100, fontWeight: 700, fontSize: 15, textDecoration: 'none', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#000')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#1a1a1a')}
                >
                  Shop Now <ArrowRight style={{ width: 16, height: 16 }} />
                </Link>
                <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#25D366', color: '#fff', padding: '15px 28px', borderRadius: 100, fontWeight: 700, fontSize: 15, textDecoration: 'none', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#1fb859')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#25D366')}
                >
                  <MessageCircle style={{ width: 16, height: 16 }} /> WhatsApp Us
                </a>
              </div>

              <div className="anim-fade-up anim-d4" style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 36, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} style={{ width: 16, height: 16, fill: '#c8a876', color: '#c8a876' }} />)}
                </div>
                <p style={{ fontSize: 13.5, color: 'rgba(26,26,26,0.5)', fontWeight: 500 }}>
                  <strong style={{ color: '#1a1a1a' }}>1,200+</strong> happy customers
                </p>
                <span style={{ fontSize: 12, background: 'rgba(37,211,102,0.12)', color: '#158a3e', fontWeight: 700, padding: '3px 10px', borderRadius: 100 }}>In Stock</span>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ STATS ═══════════ */}
        <section style={{ background: '#1a1a1a' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 1 }} className="md-grid-4">
              {stats.map(({ value, label, icon: Icon }, idx) => (
                <div key={label} style={{
                  textAlign: 'center', padding: '28px 20px',
                  borderRight: idx < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                }}>
                  <Icon style={{ width: 22, height: 22, color: '#c8a876', marginBottom: 10, margin: '0 auto 10px' }} />
                  <div style={{ ...sf, fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 4 }}>{value}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', fontWeight: 500 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ TRUST BAR ═══════════ */}
        <section style={{ background: '#fff', borderBottom: '1px solid #e8e0d4' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24 }}>
              {[
                { icon: ShieldCheck, title: 'Premium Quality', desc: 'Finest materials for lasting durability.' },
                { icon: Zap, title: 'Lightning Fast', desc: 'Same-day dispatch on most orders.' },
                { icon: Truck, title: 'Free Delivery', desc: 'On orders above ₹999 across India.' },
                { icon: MessageCircle, title: 'WhatsApp Support', desc: 'Chat with us 9am–9pm daily.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(200,168,118,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon style={{ width: 20, height: 20, color: '#a0824e' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a', marginBottom: 2 }}>{title}</p>
                    <p style={{ fontSize: 12.5, color: 'rgba(26,26,26,0.5)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ CATEGORIES ═══════════ */}
        <section style={{ background: '#faf7f2', padding: '80px 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#a0824e', marginBottom: 10 }}>Shop by Category</p>
              <h2 style={{ ...sf, fontSize: 'clamp(30px,4vw,44px)', fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.02em' }}>Find Your Style</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }} className="md-grid-6">
              {categories.map(cat => (
                <Link key={cat.name} href={`/products?category=${encodeURIComponent(cat.name)}`}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '24px 12px', background: cat.color, borderRadius: 20, border: '1.5px solid transparent', textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1)'; e.currentTarget.style.borderColor = 'rgba(200,168,118,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = 'transparent'; }}
                >
                  <span style={{ fontSize: 36 }}>{cat.emoji}</span>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>{cat.name}</p>
                    <p style={{ fontSize: 11, color: 'rgba(26,26,26,0.4)', marginTop: 2 }}>{cat.count} items</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ FEATURED PRODUCTS ═══════════ */}
        <section style={{ background: '#fff', padding: '80px 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 44 }}>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#a0824e', marginBottom: 10 }}>Our Collection</p>
                <h2 style={{ ...sf, fontSize: 'clamp(30px,4vw,44px)', fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.02em' }}>Featured Bags</h2>
              </div>
              <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#a0824e', fontSize: 14, fontWeight: 600, textDecoration: 'none', borderBottom: '1.5px solid rgba(160,130,78,0.4)', paddingBottom: 2 }}>
                View All <ArrowRight style={{ width: 15, height: 15 }} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 18 }} className="md-grid-3">
              {PRODUCTS.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        </section>

        {/* ═══════════ WHY BAGCORNER (Split) ═══════════ */}
        <section style={{ background: '#faf7f2', padding: '80px 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <div className="detail-grid" style={{ display: 'flex', flexDirection: 'column', gap: 40, alignItems: 'center' }}>
              {/* Image side */}
              <div style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', background: '#e8ddd0', flexShrink: 0 }}>
                <Image src="/p7.png" alt="Premium bag craftsmanship" width={560} height={480}
                  style={{ objectFit: 'cover', display: 'block', width: '100%', height: 'auto' }}
                />
                {/* Floating card */}
                <div style={{
                  position: 'absolute', bottom: 24, left: 24,
                  background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)',
                  borderRadius: 16, padding: '16px 20px',
                  display: 'flex', alignItems: 'center', gap: 12,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #c8a876, #a0824e)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Award style={{ width: 22, height: 22, color: '#fff' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 800, color: '#1a1a1a', lineHeight: 1 }}>Premium Grade</p>
                    <p style={{ fontSize: 12, color: 'rgba(26,26,26,0.5)', marginTop: 3 }}>Certified leather quality</p>
                  </div>
                </div>
              </div>

              {/* Text side */}
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#a0824e', marginBottom: 14 }}>Why Choose Us</p>
                <h2 style={{ ...sf, fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.02em', marginBottom: 20, lineHeight: 1.2 }}>
                  More Than Just a Bag.<br />It&apos;s a Statement.
                </h2>
                <p style={{ fontSize: 16, color: 'rgba(26,26,26,0.6)', lineHeight: 1.75, marginBottom: 32 }}>
                  At BagCorner, every piece is handpicked for exceptional quality, durability, and style. We believe what you carry says a lot about who you are.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {[
                    { icon: CheckCircle, title: 'Genuine Materials', desc: 'Full-grain leather, waxed canvas, and premium hardware.' },
                    { icon: CheckCircle, title: 'Tested for Durability', desc: 'Every bag goes through quality checks before it reaches you.' },
                    { icon: CheckCircle, title: 'Easy WhatsApp Ordering', desc: 'No checkout hassle — just chat and we handle the rest.' },
                    { icon: CheckCircle, title: 'Pan-India Delivery', desc: 'We ship to every corner of India, fast and safe.' },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} style={{ display: 'flex', gap: 14 }}>
                      <Icon style={{ width: 20, height: 20, color: '#25D366', marginTop: 2, flexShrink: 0 }} />
                      <div>
                        <p style={{ fontSize: 15, fontWeight: 700, color: '#1a1a1a', marginBottom: 3 }}>{title}</p>
                        <p style={{ fontSize: 13.5, color: 'rgba(26,26,26,0.55)', lineHeight: 1.5 }}>{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/about" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, background: '#1a1a1a', color: '#fff', padding: '13px 26px', borderRadius: 100, fontWeight: 600, fontSize: 14, textDecoration: 'none', marginTop: 32, transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#000')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#1a1a1a')}
                >
                  Our Story <ArrowRight style={{ width: 15, height: 15 }} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ HOW IT WORKS ═══════════ */}
        <section style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2316 100%)', padding: '80px 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 52 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#c8a876', marginBottom: 10 }}>Simple Process</p>
              <h2 style={{ ...sf, fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em' }}>How It Works</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
              {[
                { n: '01', icon: Package, title: 'Browse Collection', desc: 'Explore our curated selection of premium bags on our website.' },
                { n: '02', icon: Heart, title: 'Pick Your Favourite', desc: 'Find the perfect bag that matches your style and requirements.' },
                { n: '03', icon: MessageCircle, title: 'Order via WhatsApp', desc: 'Tap "Buy Now" and chat with us — we\'ll confirm and ship fast.' },
                { n: '04', icon: Truck, title: 'Receive at Doorstep', desc: 'Get your bag delivered safely, usually within 2–4 days.' },
              ].map(({ n, icon: Icon, title, desc }) => (
                <div key={n} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '32px 28px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 16, right: 16, fontSize: 44, fontWeight: 900, color: 'rgba(200,168,118,0.1)', ...sf, lineHeight: 1 }}>{n}</div>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: 'rgba(200,168,118,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <Icon style={{ width: 24, height: 24, color: '#c8a876' }} />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.48)', lineHeight: 1.65 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ TRENDING NOW (Image Grid) ═══════════ */}
        <section style={{ background: '#fff', padding: '80px 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#a0824e', marginBottom: 10 }}>Hot Right Now</p>
              <h2 style={{ ...sf, fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.02em' }}>
                Trending Picks
              </h2>
            </div>

            {/* Asymmetric image grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto', gap: 12 }} className="trending-grid">
              {/* Large left */}
              <Link href="/products/8" style={{ textDecoration: 'none', gridRow: 'span 2', position: 'relative', borderRadius: 20, overflow: 'hidden', display: 'block', background: '#f0ebe0' }}
                onMouseEnter={e => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1.06)'; }}
                onMouseLeave={e => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1)'; }}
              >
                <Image src="/p8.png" alt="Travel Duffel Bag" fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} sizes="50vw" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)' }} />
                <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
                  <span style={{ display: 'inline-block', background: '#c8a876', color: '#fff', fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 100, marginBottom: 8 }}>🔥 Best Seller</span>
                  <p style={{ ...sf, fontSize: 20, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>Travel Duffel Bag</p>
                  <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.85)', fontWeight: 600, marginTop: 4 }}>₹2,499</p>
                </div>
              </Link>

              {/* Top right */}
              <Link href="/products/9" style={{ textDecoration: 'none', position: 'relative', borderRadius: 20, overflow: 'hidden', display: 'block', background: '#f5f0e8', aspectRatio: '4/3' }}
                onMouseEnter={e => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1.06)'; }}
                onMouseLeave={e => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1)'; }}
              >
                <Image src="/p9.png" alt="Mini Crossbody Bag" fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} sizes="50vw" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
                  <p style={{ ...sf, fontSize: 16, fontWeight: 800, color: '#fff' }}>Mini Crossbody</p>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: 600, marginTop: 2 }}>₹1,199</p>
                </div>
              </Link>

              {/* Bottom right */}
              <Link href="/products/10" style={{ textDecoration: 'none', position: 'relative', borderRadius: 20, overflow: 'hidden', display: 'block', background: '#f5f0e8', aspectRatio: '4/3' }}
                onMouseEnter={e => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1.06)'; }}
                onMouseLeave={e => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1)'; }}
              >
                <Image src="/p10.png" alt="Premium Handbag" fill style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }} sizes="50vw" />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: 16, left: 16 }}>
                  <p style={{ ...sf, fontSize: 16, fontWeight: 800, color: '#fff' }}>Premium Handbag</p>
                  <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)', fontWeight: 600, marginTop: 2 }}>₹3,499</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════ TESTIMONIALS ═══════════ */}
        <section style={{ background: '#faf7f2', padding: '80px 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <div style={{ textAlign: 'center', marginBottom: 48 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#a0824e', marginBottom: 10 }}>Customer Love</p>
              <h2 style={{ ...sf, fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.02em' }}>
                What They&apos;re Saying
              </h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
              {[
                { name: 'Priya Sharma', city: 'Mumbai', img: '/p3.png', text: 'Absolutely love my leather backpack! Quality is incredible, looks even better in person. Super fast delivery too!', rating: 5, product: 'Classic Leather Backpack' },
                { name: 'Rahul Gupta', city: 'Delhi', img: '/p1.png', text: 'Ordered via WhatsApp, super smooth process. Got my bag in 3 days. Perfect for daily office commute.', rating: 5, product: 'Travel Backpack' },
                { name: 'Sneha Patel', city: 'Bangalore', img: '/p7.png', text: 'The messenger bag is stunning! Premium feel, great quality. The WhatsApp ordering was so easy.', rating: 5, product: 'Office Messenger Bag' },
              ].map(({ name, city, img, text, rating, product }) => (
                <div key={name} style={{ background: '#fff', borderRadius: 20, border: '1px solid #e8e0d4', padding: '28px 24px', position: 'relative' }}>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 16 }}>
                    {[...Array(rating)].map((_, i) => <Star key={i} style={{ width: 14, height: 14, fill: '#c8a876', color: '#c8a876' }} />)}
                  </div>
                  <p style={{ fontSize: 14.5, color: 'rgba(26,26,26,0.7)', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>
                    &ldquo;{text}&rdquo;
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 42, height: 42, borderRadius: '50%', overflow: 'hidden', position: 'relative', border: '2px solid #e8e0d4', flexShrink: 0 }}>
                      <Image src={img} alt={name} fill style={{ objectFit: 'cover' }} sizes="42px" />
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>{name}</p>
                      <p style={{ fontSize: 12, color: 'rgba(26,26,26,0.4)' }}>{city} · {product}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ NEWSLETTER / PROMO BANNER ═══════════ */}
        <section style={{ background: 'linear-gradient(135deg, #c8a876 0%, #a0824e 100%)', padding: '64px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 540, margin: '0 auto' }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 12 }}>Limited Time</p>
            <h2 style={{ ...sf, fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.02em', marginBottom: 12 }}>
              Free Delivery on Your First Order
            </h2>
            <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: 32 }}>
              Mention &quot;<strong>FIRSTBAG</strong>&quot; on WhatsApp and get free delivery anywhere in India.
            </p>
            <a href={waUrl} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', color: '#a0824e', padding: '15px 32px', borderRadius: 100, fontWeight: 800, fontSize: 15, textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.15)'; }}
            >
              <MessageCircle style={{ width: 18, height: 18 }} />
              Claim on WhatsApp
            </a>
          </div>
        </section>

        {/* ═══════════ CTA ═══════════ */}
        <section style={{ background: '#fff', padding: '80px 24px', textAlign: 'center', borderTop: '1px solid #e8e0d4' }}>
          <div style={{ maxWidth: 540, margin: '0 auto' }}>
            <TrendingUp style={{ width: 40, height: 40, color: '#c8a876', margin: '0 auto 20px' }} />
            <h2 style={{ ...sf, fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.02em', marginBottom: 14 }}>Ready to Order?</h2>
            <p style={{ fontSize: 16, color: 'rgba(26,26,26,0.55)', lineHeight: 1.75, marginBottom: 36 }}>
              Not sure which bag to pick? Chat with us on WhatsApp — we&apos;ll find the perfect one for you!
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={waUrl} target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#25D366', color: '#fff', padding: '15px 30px', borderRadius: 100, fontWeight: 700, fontSize: 15, textDecoration: 'none', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#1fb859')}
                onMouseLeave={e => (e.currentTarget.style.background = '#25D366')}
              >
                <MessageCircle style={{ width: 18, height: 18 }} /> Chat on WhatsApp
              </a>
              <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '2px solid #1a1a1a', color: '#1a1a1a', padding: '13px 26px', borderRadius: 100, fontWeight: 700, fontSize: 15, textDecoration: 'none', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#1a1a1a'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1a1a1a'; }}
              >
                Browse Bags <ArrowRight style={{ width: 15, height: 15 }} />
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
