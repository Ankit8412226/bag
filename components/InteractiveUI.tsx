'use client';

export function CategoryPill({ cat, href }: { cat: string; href: string }) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-block',
        padding: '8px 20px',
        borderRadius: 100,
        border: '1.5px solid #e5ddd2',
        fontSize: 13, fontWeight: 500,
        color: 'rgba(26,26,26,0.65)',
        textDecoration: 'none',
        background: '#fff',
        transition: 'all 0.2s',
        whiteSpace: 'nowrap',
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
        el.style.background = '#fff';
        el.style.color = 'rgba(26,26,26,0.65)';
      }}
    >
      {cat}
    </a>
  );
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} style={{
      display: 'flex', alignItems: 'center', gap: 5,
      color: 'rgba(26,26,26,0.45)', fontSize: 13.5,
      textDecoration: 'none', transition: 'color 0.2s',
    }}
      onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = '#1a1a1a')}
      onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = 'rgba(26,26,26,0.45)')}
    >
      {label}
    </a>
  );
}

export function BuyWhatsAppBtn({ href, disabled }: { href: string; disabled?: boolean }) {
  return (
    <a
      href={disabled ? '#' : href}
      target={disabled ? undefined : '_blank'}
      rel="noopener noreferrer"
      id="product-buy-whatsapp-btn"
      style={{
        display: 'flex', alignItems: 'center',
        justifyContent: 'center', gap: 10,
        background: disabled ? 'rgba(37,211,102,0.4)' : '#25D366',
        color: '#fff', padding: '17px 28px',
        borderRadius: 16, fontSize: 17, fontWeight: 700,
        textDecoration: 'none', marginBottom: 12,
        transition: 'background 0.2s, transform 0.2s',
        cursor: disabled ? 'not-allowed' : 'pointer',
        pointerEvents: disabled ? 'none' : 'auto',
      }}
      onMouseEnter={e => {
        if (!disabled) {
          (e.currentTarget as HTMLAnchorElement).style.background = '#1fb859';
          (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
        }
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLAnchorElement).style.background = disabled ? 'rgba(37,211,102,0.4)' : '#25D366';
        (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
      Buy Now on WhatsApp
    </a>
  );
}
