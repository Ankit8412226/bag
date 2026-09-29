'use client';

import Link from 'next/link';
import { ShoppingBag, Mail, Phone, MessageCircle, ExternalLink } from 'lucide-react';
import { generateGeneralWhatsAppUrl } from '@/lib/whatsapp';

export default function Footer() {
  return (
    <footer id="contact" style={{ background: '#111111', color: '#ffffff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px 24px 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 48,
          marginBottom: 56,
        }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: '#c8a876', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <ShoppingBag style={{ width: 18, height: 18, color: '#fff' }} />
              </div>
              <span style={{
                fontFamily: 'var(--font-playfair-loaded), "Playfair Display", Georgia, serif',
                fontWeight: 700, fontSize: 20, color: '#fff',
              }}>BagCorner</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 14, lineHeight: 1.7, maxWidth: 240 }}>
              Premium bags curated for every occasion. Quality you can feel, style you carry everywhere.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              {['FB', 'IG', 'TW'].map(s => (
                <div key={s} style={{
                  width: 36, height: 36, borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: 700, cursor: 'pointer',
                  transition: 'border-color 0.2s, color 0.2s',
                }}>
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
              marginBottom: 20,
            }}>Quick Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { href: '/', label: 'Home' },
                { href: '/products', label: 'All Products' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact Us' },
              ].map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: 'rgba(255,255,255,0.5)', fontSize: 14,
                    textDecoration: 'none', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#c8a876')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 style={{
              fontSize: 11, fontWeight: 700, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)',
              marginBottom: 20,
            }}>Get in Touch</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { icon: MessageCircle, text: 'WhatsApp Us', href: generateGeneralWhatsAppUrl(), external: true },
                { icon: Mail, text: 'hello@sabagcorner.com', href: 'mailto:hello@sabagcorner.com', external: false },
                { icon: Phone, text: '+91 99999 99999', href: 'tel:+919999999999', external: false },
                { icon: ExternalLink, text: '@bagcorner', href: 'https://instagram.com/bagcorner', external: true },
              ].map(({ icon: Icon, text, href, external }) => (
                <a
                  key={href}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    color: 'rgba(255,255,255,0.5)', fontSize: 14,
                    textDecoration: 'none', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#c8a876')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  <Icon style={{ width: 15, height: 15, flexShrink: 0 }} />
                  {text}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: 28,
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between', gap: 12,
        }}>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>
            © {new Date().getFullYear()} BagCorner. All rights reserved.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: 13 }}>
            sabagcorner.com
          </p>
        </div>
      </div>
    </footer>
  );
}
