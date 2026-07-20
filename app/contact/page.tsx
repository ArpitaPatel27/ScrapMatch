'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import MarketingNav from '@/components/organisms/MarketingNav/MarketingNav';
import MarketingFooter from '@/components/organisms/MarketingFooter/MarketingFooter';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';

export default function ContactPage() {
  return (
    <>
      <MarketingNav />
      <main style={{ minHeight: '100vh', background: 'var(--color-bg-base)' }}>
        <section style={{ padding: 'var(--space-20) 0', display: 'grid', placeItems: 'center' }}>
          <motion.div
            style={{ maxWidth: 840, margin: '0 auto', padding: '0 var(--space-6)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.18em', fontSize: '0.75rem', fontWeight: 600 }}>
              Contact
            </span>
            <h1 style={{ marginTop: '1rem', fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1.05, color: 'var(--color-text-primary)' }}>
              Get expert help with your ScrapMatch onboarding.
            </h1>
            <p style={{ marginTop: '1rem', maxWidth: 680, color: 'var(--color-text-secondary)', lineHeight: 1.75, fontSize: '1rem' }}>
              Our team is here to help you list materials, source buyers, or build an enterprise workflow tailored to your plant. Reach out and we’ll respond within one business day.
            </p>

            <div style={{ marginTop: '2rem', display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
              {[
                { icon: <Mail size={18} />, title: 'Sales enquiries', detail: 'sales@scrapmatch.in' },
                { icon: <Phone size={18} />, title: 'Support', detail: '+91 22 1234 5678' },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  style={{ background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-xl)', padding: 'var(--space-6)', boxShadow: 'var(--shadow-md)', display: 'grid', gap: '0.75rem' }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', color: 'var(--color-brand)' }}>
                    {item.icon}
                    <span style={{ fontWeight: 700 }}>{item.title}</span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--color-text-primary)', lineHeight: 1.5 }}>{item.detail}</p>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)' }}>
              <SpecularButton href="/signup" size="lg">Start Your Trial</SpecularButton>
              <Link href="/product" style={{ alignSelf: 'center', color: 'var(--color-brand)', fontWeight: 600 }}>
                Learn how ScrapMatch works →
              </Link>
            </div>
          </motion.div>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}
