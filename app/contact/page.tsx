'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import { generateGeneralWhatsAppUrl } from '@/lib/whatsapp';
import {
  MessageCircle, Mail, Phone, MapPin, Clock, Send, CheckCircle2,
  ChevronDown, HelpCircle, ShieldCheck, Truck, ArrowRight
} from 'lucide-react';

export default function ContactPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const whatsappUrl = generateGeneralWhatsAppUrl();

  const faqs = [
    {
      q: 'How do I place an order?',
      a: 'Simply click "Buy Now on WhatsApp" on any product page. You will be connected directly with our team on WhatsApp to confirm item availability, shipping address, and payment method.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept UPI (GPay, PhonePe, Paytm), Netbanking, Credit/Debit cards, and Cash on Delivery (COD) in select pincodes.',
    },
    {
      q: 'How long does shipping take?',
      a: 'Orders are dispatched within 24 hours. Delivery typically takes 2-4 business days for metro cities and 4-6 business days for rest of India.',
    },
    {
      q: 'What is your return & exchange policy?',
      a: 'We offer a 7-day hassle-free replacement guarantee if the product is damaged, defective, or different from what you ordered.',
    },
    {
      q: 'Can I request actual photos or videos before buying?',
      a: 'Yes! Send us a quick WhatsApp message specifying the bag model, and our staff will share unedited high-resolution video clips of the bag.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;
    setFormSubmitted(true);

    // Also construct WhatsApp pre-filled message as direct backup option
    const text = encodeURIComponent(`Hi BagCorner! My name is ${formData.name}. ${formData.message} (Contact: ${formData.phone || formData.email})`);
    setTimeout(() => {
      window.open(`https://wa.me/919999999999?text=${text}`, '_blank');
    }, 1200);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#faf7f2', color: '#1a1a1a' }}>
      <Header />

      <main style={{ flex: 1, paddingTop: 96, paddingBottom: 80 }}>
        {/* Header Title */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px 48px', textAlign: 'center' }}>
          <span style={{
            display: 'inline-block',
            background: '#f0ece3', color: '#8c6d3b',
            padding: '6px 16px', borderRadius: 100,
            fontSize: 12, fontWeight: 700, letterSpacing: '0.12em',
            textTransform: 'uppercase', marginBottom: 16,
          }}>
            We're Here to Help
          </span>
          <h1 style={{
            fontFamily: 'var(--font-playfair-loaded), "Playfair Display", Georgia, serif',
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 800,
            color: '#1a1a1a', marginBottom: 16, letterSpacing: '-0.02em',
          }}>
            Contact <span style={{ color: '#c8a876', fontStyle: 'italic' }}>BagCorner</span>
          </h1>
          <p style={{ fontSize: 17, color: '#666', maxWidth: 580, margin: '0 auto', lineHeight: 1.6 }}>
            Have a question about a product, shipping, or custom bulk orders? Get in touch with us directly.
          </p>
        </section>

        {/* Contact Grid: Form + Direct Options */}
        <section style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 64px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 40,
          }}>

            {/* Form Side */}
            <div style={{
              background: '#fff', padding: '40px 32px', borderRadius: 24,
              border: '1px solid #e5ddd2', boxShadow: '0 8px 30px rgba(0,0,0,0.04)',
            }}>
              <h2 style={{
                fontFamily: 'var(--font-playfair-loaded), "Playfair Display", Georgia, serif',
                fontSize: 24, fontWeight: 700, marginBottom: 8, color: '#1a1a1a',
              }}>
                Send Us a Message
              </h2>
              <p style={{ fontSize: 14, color: '#666', marginBottom: 28 }}>
                Fill out the form below and we will redirect you directly to our WhatsApp support chat.
              </p>

              {formSubmitted ? (
                <div style={{
                  background: '#f0fdf4', border: '1px solid #bbf7d0',
                  padding: 32, borderRadius: 20, textAlign: 'center',
                }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: '50%', background: '#25D366',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 16px', color: '#fff',
                  }}>
                    <CheckCircle2 style={{ width: 30, height: 30 }} />
                  </div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: '#166534', marginBottom: 8 }}>
                    Opening WhatsApp...
                  </h3>
                  <p style={{ fontSize: 14, color: '#15803d', lineHeight: 1.6 }}>
                    Thank you, {formData.name}! Redirecting you to WhatsApp so our team can assist you right away.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%', padding: '12px 16px', borderRadius: 12,
                        border: '1px solid #dcd4c8', background: '#faf7f2', fontSize: 14,
                        outline: 'none', transition: 'border-color 0.2s',
                      }}
                      onFocus={e => e.target.style.borderColor = '#c8a876'}
                      onBlur={e => e.target.style.borderColor = '#dcd4c8'}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        style={{
                          width: '100%', padding: '12px 16px', borderRadius: 12,
                          border: '1px solid #dcd4c8', background: '#faf7f2', fontSize: 14,
                          outline: 'none', transition: 'border-color 0.2s',
                        }}
                        onFocus={e => e.target.style.borderColor = '#c8a876'}
                        onBlur={e => e.target.style.borderColor = '#dcd4c8'}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="rahul@example.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        style={{
                          width: '100%', padding: '12px 16px', borderRadius: 12,
                          border: '1px solid #dcd4c8', background: '#faf7f2', fontSize: 14,
                          outline: 'none', transition: 'border-color 0.2s',
                        }}
                        onFocus={e => e.target.style.borderColor = '#c8a876'}
                        onBlur={e => e.target.style.borderColor = '#dcd4c8'}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6 }}>
                      How can we help you? *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Specify bag model, inquiry, or custom bulk order details..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      style={{
                        width: '100%', padding: '12px 16px', borderRadius: 12,
                        border: '1px solid #dcd4c8', background: '#faf7f2', fontSize: 14,
                        outline: 'none', transition: 'border-color 0.2s', resize: 'vertical',
                      }}
                      onFocus={e => e.target.style.borderColor = '#c8a876'}
                      onBlur={e => e.target.style.borderColor = '#dcd4c8'}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: '#1a1a1a', color: '#fff',
                      padding: '14px 28px', borderRadius: 14,
                      fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#333'}
                    onMouseLeave={e => e.currentTarget.style.background = '#1a1a1a'}
                  >
                    <Send style={{ width: 16, height: 16 }} />
                    Submit & Open WhatsApp
                  </button>
                </form>
              )}
            </div>

            {/* Direct Cards & Details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* Instant WhatsApp Priority Card */}
              <div style={{
                background: 'linear-gradient(135deg, #111 0%, #222 100%)',
                color: '#fff', padding: 32, borderRadius: 24,
                boxShadow: '0 12px 32px rgba(0,0,0,0.15)',
              }}>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  background: 'rgba(37, 211, 102, 0.15)', color: '#25D366',
                  padding: '4px 12px', borderRadius: 100, fontSize: 12, fontWeight: 700,
                  marginBottom: 16,
                }}>
                  <MessageCircle style={{ width: 14, height: 14 }} />
                  Fastest Response (Under 5 Mins)
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-playfair-loaded), "Playfair Display", Georgia, serif',
                  fontSize: 24, fontWeight: 700, marginBottom: 12, color: '#fff',
                }}>
                  Direct WhatsApp Support
                </h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
                  Need real pictures, video demos, or quick tracking updates? Message our sales representative live on WhatsApp.
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    background: '#25D366', color: '#fff',
                    padding: '14px', borderRadius: 14,
                    fontSize: 15, fontWeight: 600, textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}
                >
                  <MessageCircle style={{ width: 18, height: 18 }} />
                  Start WhatsApp Chat Now
                </a>
              </div>

              {/* Info Badges */}
              <div style={{
                background: '#fff', padding: 28, borderRadius: 24,
                border: '1px solid #e5ddd2', display: 'flex', flexDirection: 'column', gap: 20,
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: '#faf7f2', color: '#c8a876', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #e5ddd2' }}>
                    <Mail style={{ width: 20, height: 20 }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 12, color: '#888', fontWeight: 600, textTransform: 'uppercase' }}>Email Support</p>
                    <a href="mailto:hello@sabagcorner.com" style={{ fontSize: 15, color: '#1a1a1a', fontWeight: 600, textDecoration: 'none' }}>
                      hello@sabagcorner.com
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: '#faf7f2', color: '#c8a876', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #e5ddd2' }}>
                    <Phone style={{ width: 20, height: 20 }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 12, color: '#888', fontWeight: 600, textTransform: 'uppercase' }}>Call Us</p>
                    <a href="tel:+919999999999" style={{ fontSize: 15, color: '#1a1a1a', fontWeight: 600, textDecoration: 'none' }}>
                      +91 99999 99999
                    </a>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, background: '#faf7f2', color: '#c8a876', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, border: '1px solid #e5ddd2' }}>
                    <Clock style={{ width: 20, height: 20 }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 12, color: '#888', fontWeight: 600, textTransform: 'uppercase' }}>Support Hours</p>
                    <p style={{ fontSize: 14, color: '#333', fontWeight: 500 }}>
                      Monday – Saturday: 9:00 AM – 9:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* FAQs Accordion Section */}
        <section style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px 64px' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{
              fontFamily: 'var(--font-playfair-loaded), "Playfair Display", Georgia, serif',
              fontSize: 32, fontWeight: 700, color: '#1a1a1a',
            }}>
              Frequently Asked Questions
            </h2>
            <p style={{ color: '#666', fontSize: 15, marginTop: 8 }}>Got questions? We've got answers.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={faq.q}
                  style={{
                    background: '#fff', borderRadius: 16,
                    border: '1px solid #e5ddd2', overflow: 'hidden',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    style={{
                      width: '100%', padding: '20px 24px',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      background: 'none', border: 'none', cursor: 'pointer',
                      textAlign: 'left', color: '#1a1a1a', fontSize: 16, fontWeight: 600,
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown style={{
                      width: 18, height: 18, color: '#c8a876',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.3s', flexShrink: 0, marginLeft: 16,
                    }} />
                  </button>
                  {isOpen && (
                    <div style={{
                      padding: '0 24px 20px', fontSize: 14, color: '#555',
                      lineHeight: 1.7, borderTop: '1px solid #f5eee6', paddingTop: 16,
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
