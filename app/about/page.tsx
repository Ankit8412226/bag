'use client';

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { generateGeneralWhatsAppUrl } from '@/lib/whatsapp';
import { MessageCircle, ShieldCheck, Award, Heart, Sparkles, CheckCircle, Truck, RefreshCw } from 'lucide-react';

export default function AboutPage() {
  const whatsappUrl = generateGeneralWhatsAppUrl();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#faf7f2', color: '#1a1a1a' }}>
      <Header />

      <main style={{ flex: 1, paddingTop: 96, paddingBottom: 80 }}>
        {/* Hero Section */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px 60px' }}>
          <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
            <span style={{
              display: 'inline-block',
              background: '#f0ece3', color: '#8c6d3b',
              padding: '6px 16px', borderRadius: 100,
              fontSize: 12, fontWeight: 700, letterSpacing: '0.12em',
              textTransform: 'uppercase', marginBottom: 20,
            }}>
              Our Story
            </span>
            <h1 style={{
              fontFamily: 'var(--font-playfair-loaded), "Playfair Display", Georgia, serif',
              fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 800,
              lineHeight: 1.15, color: '#1a1a1a', marginBottom: 24, letterSpacing: '-0.02em',
            }}>
              Crafting Elegance for <span style={{ color: '#c8a876', fontStyle: 'italic' }}>Every Journey</span>
            </h1>
            <p style={{ fontSize: 18, color: '#666', lineHeight: 1.8 }}>
              At <strong>BagCorner</strong> (sabagcorner.com), we believe a bag is not just an accessory—it is your everyday companion. Founded with a passion for functional luxury, we curate premium backpacks, handbags, and travel gear that elevate your personal style.
            </p>
          </div>
        </section>

        {/* Brand Banner Image */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{
            position: 'relative', height: 420, borderRadius: 24, overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
          }}>
            <Image
              src="/hero.png"
              alt="BagCorner Heritage & Craftsmanship"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 100%)',
              display: 'flex', alignItems: 'center', padding: '0 48px',
            }}>
              <div style={{ maxWidth: 480, color: '#fff' }}>
                <span style={{ color: '#c8a876', fontWeight: 700, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                  Handpicked Perfection
                </span>
                <h2 style={{
                  fontFamily: 'var(--font-playfair-loaded), "Playfair Display", Georgia, serif',
                  fontSize: 32, fontWeight: 700, marginTop: 8, marginBottom: 16, color: '#fff',
                }}>
                  Zero Compromise on Quality
                </h2>
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.85)', lineHeight: 1.6 }}>
                  Every piece in our store is thoroughly inspected for stitching density, zipper smoothness, and material durability before reaching you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our 4 Core Pillars */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{
              fontFamily: 'var(--font-playfair-loaded), "Playfair Display", Georgia, serif',
              fontSize: 32, fontWeight: 700, color: '#1a1a1a',
            }}>
              Why Customers Love BagCorner
            </h2>
            <p style={{ color: '#666', fontSize: 16, marginTop: 8 }}>The values that set us apart</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 28,
          }}>
            {[
              {
                icon: ShieldCheck,
                title: 'Premium Materials',
                desc: 'Top-grain genuine leathers, high-grade water-resistant canvases, and heavy-duty reinforced zippers built to endure.',
              },
              {
                icon: Heart,
                title: 'Direct-to-Customer',
                desc: 'By eliminating middleman markups and high marketplace commissions, we pass the savings directly on to you.',
              },
              {
                icon: MessageCircle,
                title: 'Instant WhatsApp Service',
                desc: 'Skip tedious web checkouts! Order directly on WhatsApp, request real product videos, and track your delivery seamlessly.',
              },
              {
                icon: Award,
                title: 'Curated Designs',
                desc: 'Minimalist aesthetics paired with intelligent organization—pockets for laptops, water bottles, keys, and daily tech.',
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{
                background: '#fff', padding: 32, borderRadius: 20,
                border: '1px solid #e5ddd2',
                boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: '#faf7f2', color: '#c8a876',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 20, border: '1px solid #e5ddd2',
                }}>
                  <Icon style={{ width: 24, height: 24 }} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Craftsmanship Detail Split Section */}
        <section style={{ background: '#111', color: '#fff', padding: '80px 0', marginTop: 20 }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: 48, alignItems: 'center',
            }}>
              <div>
                <span style={{ color: '#c8a876', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  Behind the Craft
                </span>
                <h2 style={{
                  fontFamily: 'var(--font-playfair-loaded), "Playfair Display", Georgia, serif',
                  fontSize: 36, fontWeight: 700, marginTop: 12, marginBottom: 20, color: '#fff', lineHeight: 1.2,
                }}>
                  Designed for Modern Professionals & Travelers
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, lineHeight: 1.7, marginBottom: 28 }}>
                  Whether you are commuting to the office, boarding an international flight, or heading out for a weekend getaway, BagCorner bags combine refined aesthetics with functional utility.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
                  {[
                    'Ergonomic padded shoulder straps for all-day comfort',
                    'Dedicated padded laptop compartments fitting up to 16" MacBooks',
                    'Water-repellent coatings to protect your belongings',
                    'Anti-theft hidden zipper pockets for travel security',
                  ].map(item => (
                    <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.9)' }}>
                      <CheckCircle style={{ width: 18, height: 18, color: '#c8a876', flexShrink: 0 }} />
                      <span style={{ fontSize: 15 }}>{item}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    background: '#25D366', color: '#fff',
                    padding: '14px 28px', borderRadius: 100,
                    fontSize: 15, fontWeight: 600, textDecoration: 'none',
                    transition: 'opacity 0.2s',
                  }}
                >
                  <MessageCircle style={{ width: 18, height: 18 }} />
                  Chat with Our Team
                </a>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div style={{ position: 'relative', height: 260, borderRadius: 20, overflow: 'hidden' }}>
                  <Image src="/p1.png" alt="Leather Detail" fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'relative', height: 260, borderRadius: 20, overflow: 'hidden', marginTop: 24 }}>
                  <Image src="/p2.png" alt="Duffel Detail" fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'relative', height: 260, borderRadius: 20, overflow: 'hidden', marginTop: -24 }}>
                  <Image src="/p4.png" alt="Handbag Detail" fill style={{ objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'relative', height: 260, borderRadius: 20, overflow: 'hidden' }}>
                  <Image src="/p8.png" alt="Backpack Detail" fill style={{ objectFit: 'cover' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section style={{ maxWidth: 1280, margin: '80px auto 0', padding: '0 24px' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f0ece3 0%, #e5ddd2 100%)',
            borderRadius: 24, padding: '48px 36px', textAlign: 'center',
            border: '1px solid #d8ccbd',
          }}>
            <h2 style={{
              fontFamily: 'var(--font-playfair-loaded), "Playfair Display", Georgia, serif',
              fontSize: 30, fontWeight: 700, color: '#1a1a1a', marginBottom: 12,
            }}>
              Ready to Upgrade Your Carry?
            </h2>
            <p style={{ color: '#555', fontSize: 16, marginBottom: 28, maxWidth: 540, margin: '0 auto 28px' }}>
              Explore our full collection today or ask us on WhatsApp for custom recommendations and real product photos.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/products" style={{
                background: '#1a1a1a', color: '#fff',
                padding: '14px 32px', borderRadius: 100,
                fontSize: 15, fontWeight: 600, textDecoration: 'none',
              }}>
                Browse All Products
              </Link>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{
                background: '#25D366', color: '#fff',
                padding: '14px 32px', borderRadius: 100,
                fontSize: 15, fontWeight: 600, textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: 8,
              }}>
                <MessageCircle style={{ width: 18, height: 18 }} />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
