'use client';

import { motion } from 'framer-motion';
import MarketingNav from '@/components/organisms/MarketingNav/MarketingNav';
import MarketingFooter from '@/components/organisms/MarketingFooter/MarketingFooter';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';

export default function MarketplacePage() {
  return (
    <>
      <MarketingNav />
      <main style={{ minHeight: '100vh', background: 'var(--color-bg-base)' }}>
        <section style={{ padding: 'var(--space-20) 0' }}>
          <motion.div
            style={{ maxWidth: 1160, margin: '0 auto', padding: '0 var(--space-8)' }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
              Marketplace
            </span>
            <h1 style={{ marginTop: '1rem', fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: 1.05, color: 'var(--color-text-primary)' }}>
              Live industrial materials listings across categories.
            </h1>
            <p style={{ marginTop: '1rem', maxWidth: 760, color: 'var(--color-text-secondary)', fontSize: '1rem', lineHeight: 1.8 }}>
              Browse verified live listings for steel, plastics, paper, construction materials, and more. Filter by grade, location, and quantity to find exactly what you need.
            </p>

            <div style={{ marginTop: '2.5rem', display: 'grid', gap: 'var(--space-6)', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
              {[
                { title: 'Verified sellers', detail: 'Buy from businesses that are GST-verified and approved by ScrapMatch.' },
                { title: 'Market insights', detail: 'Price ranges are updated weekly from actual matched transactions.' },
                { title: 'Smart filters', detail: 'Search by material type, quantity, location and buyer preferences.' },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  style={{ padding: 'var(--space-6)', background: 'var(--color-bg-elevated)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-sm)' }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.25 }}
                >
                  <h2 style={{ margin: 0, fontSize: '1.125rem', color: 'var(--color-text-primary)' }}>{item.title}</h2>
                  <p style={{ marginTop: '0.75rem', color: 'var(--color-text-secondary)', lineHeight: 1.75 }}>{item.detail}</p>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: '2.5rem', display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
              <SpecularButton href="/signup?intent=buy" size="lg">Start sourcing</SpecularButton>
              <SpecularButton href="/signup?intent=sell" variant="secondary" size="lg">List materials</SpecularButton>
            </div>
          </motion.div>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}
