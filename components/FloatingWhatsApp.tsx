'use client';

import { MessageCircle } from 'lucide-react';
import { generateGeneralWhatsAppUrl } from '@/lib/whatsapp';

export default function FloatingWhatsApp() {
  return (
    <a
      id="floating-whatsapp-btn"
      href={generateGeneralWhatsAppUrl()}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      aria-label="Chat on WhatsApp"
      style={{
        position: 'fixed',
        bottom: 28, right: 28,
        zIndex: 999,
        width: 58, height: 58,
        borderRadius: '50%',
        background: '#25D366',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'none',
        transition: 'transform 0.2s, background 0.2s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1.12)';
        (e.currentTarget as HTMLAnchorElement).style.background = '#1fb859';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.transform = 'scale(1)';
        (e.currentTarget as HTMLAnchorElement).style.background = '#25D366';
      }}
    >
      <MessageCircle style={{ width: 28, height: 28, color: '#fff' }} />
    </a>
  );
}
