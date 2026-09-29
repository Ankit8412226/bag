'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ShoppingBag, MessageCircle } from 'lucide-react';
import { generateGeneralWhatsAppUrl } from '@/lib/whatsapp';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500`}
        style={{
          background: scrolled ? 'rgba(250,247,242,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(229,221,210,0.8)' : '1px solid transparent',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{
                width: 38, height: 38, borderRadius: '50%',
                background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.25s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = '#c8a876')}
                onMouseLeave={e => (e.currentTarget.style.background = '#1a1a1a')}
              >
                <ShoppingBag style={{ width: 18, height: 18, color: '#fff' }} />
              </div>
              <span style={{
                fontFamily: 'var(--font-playfair-loaded), "Playfair Display", Georgia, serif',
                fontWeight: 700, fontSize: 20, color: '#1a1a1a', letterSpacing: '-0.01em',
              }}>BagCorner</span>
            </Link>

            {/* Desktop Nav */}
            <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="hidden md:flex">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="nav-link">{link.label}</Link>
              ))}
              <a
                href={generateGeneralWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  background: '#25D366', color: '#fff',
                  padding: '9px 20px', borderRadius: 100,
                  fontSize: 13.5, fontWeight: 600,
                  textDecoration: 'none', transition: 'background 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#1fb859'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#25D366'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}
              >
                <MessageCircle style={{ width: 15, height: 15 }} />
                WhatsApp
              </a>
            </nav>

            {/* Mobile hamburger */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
              style={{
                padding: 8, borderRadius: 10, border: 'none',
                background: 'transparent', cursor: 'pointer', color: '#1a1a1a',
              }}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X style={{ width: 22, height: 22 }} /> : <Menu style={{ width: 22, height: 22 }} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 40,
            background: 'rgba(250,247,242,0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex', flexDirection: 'column',
            padding: '96px 24px 32px',
          }}
          className="md:hidden"
        >
          <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontSize: 28,
                  fontFamily: 'var(--font-playfair-loaded), "Playfair Display", Georgia, serif',
                  fontWeight: 700, color: '#1a1a1a', textDecoration: 'none',
                  padding: '12px 0',
                  borderBottom: '1px solid rgba(229,221,210,0.5)',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <a
            href={generateGeneralWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            style={{
              marginTop: 32, display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: 10,
              background: '#25D366', color: '#fff',
              padding: '16px', borderRadius: 16,
              fontSize: 16, fontWeight: 600, textDecoration: 'none',
            }}
          >
            <MessageCircle style={{ width: 20, height: 20 }} />
            WhatsApp Us
          </a>
        </div>
      )}
    </>
  );
}
