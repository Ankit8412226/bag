'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag, Eye, EyeOff, Lock } from 'lucide-react';

const S = {
  serif: { fontFamily: 'var(--font-playfair-loaded),"Playfair Display",Georgia,serif' } as React.CSSProperties,
};

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Login failed'); }
      else { router.push('/admin'); router.refresh(); }
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#faf7f2',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 20,
            background: '#1a1a1a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <ShoppingBag style={{ width: 30, height: 30, color: '#fff' }} />
          </div>
          <h1 style={{ ...S.serif, fontSize: 28, fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.02em' }}>
            BagCorner
          </h1>
          <p style={{ color: 'rgba(26,26,26,0.4)', fontSize: 13.5, marginTop: 4 }}>Admin Dashboard</p>
        </div>

        {/* Card */}
        <div style={{
          background: '#fff', borderRadius: 24,
          border: '1px solid #e5ddd2',
          padding: '36px 32px',
          boxShadow: '0 4px 32px rgba(0,0,0,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
            <Lock style={{ width: 18, height: 18, color: '#c8a876' }} />
            <h2 style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a' }}>Sign In</h2>
          </div>

          {error && (
            <div style={{
              background: '#fef2f2', border: '1px solid #fecaca',
              color: '#dc2626', padding: '12px 16px',
              borderRadius: 12, fontSize: 13.5, marginBottom: 20,
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <label htmlFor="admin-email" style={{
                display: 'block', fontSize: 13, fontWeight: 600,
                color: 'rgba(26,26,26,0.65)', marginBottom: 6,
              }}>Email</label>
              <input
                id="admin-email" type="email"
                value={email} onChange={e => setEmail(e.target.value)}
                required placeholder="admin@bagcorner.com"
                className="adm-input"
              />
            </div>

            <div>
              <label htmlFor="admin-password" style={{
                display: 'block', fontSize: 13, fontWeight: 600,
                color: 'rgba(26,26,26,0.65)', marginBottom: 6,
              }}>Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  id="admin-password"
                  type={showPw ? 'text' : 'password'}
                  value={password} onChange={e => setPassword(e.target.value)}
                  required placeholder="••••••••"
                  className="adm-input"
                  style={{ paddingRight: 44 }}
                />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(26,26,26,0.35)', padding: 4,
                }}>
                  {showPw ? <EyeOff style={{ width: 18, height: 18 }} /> : <Eye style={{ width: 18, height: 18 }} />}
                </button>
              </div>
            </div>

            <button
              id="admin-login-btn" type="submit" disabled={loading}
              style={{
                width: '100%', padding: '14px', borderRadius: 12,
                background: loading ? 'rgba(26,26,26,0.5)' : '#1a1a1a',
                color: '#fff', fontWeight: 700, fontSize: 15,
                border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                marginTop: 4, transition: 'background 0.2s',
                fontFamily: 'inherit',
              }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <p style={{
            textAlign: 'center', fontSize: 12,
            color: 'rgba(26,26,26,0.3)', marginTop: 20,
          }}>
            Default: admin@bagcorner.com / admin123
          </p>
        </div>

        <p style={{ textAlign: 'center', color: 'rgba(26,26,26,0.25)', fontSize: 12, marginTop: 20 }}>
          BagCorner Admin · Authorized personnel only
        </p>
      </div>
    </div>
  );
}
