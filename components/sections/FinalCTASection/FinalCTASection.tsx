'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import dynamic from 'next/dynamic';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import styles from './FinalCTASection.module.css';

const LightfallCanvas = dynamic(
  () => import('@/components/ui/LightfallCanvas/LightfallCanvas'),
  { ssr: false }
);

const trustSignals = [
  'No setup fee',
  'GST-verified network',
  'Cancel anytime',
];

function FinalCTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Ambient lightfall streaks — canvas layer */}
          <LightfallCanvas className={styles.lightfall} />

          {/* Dot texture overlay */}
          <div className={styles.texture} aria-hidden="true" />

          {/* Content sits above canvas + texture */}
          <div className={styles.content}>
            <span className={styles.eyebrow}>Get Started Today</span>

            <h2 className={styles.headline}>
              Turn surplus materials<br />into new business.
            </h2>

            <p className={styles.subheadline}>
              Join hundreds of manufacturers already using ScrapMatch to recover
              value from industrial waste — and buy secondary raw materials at better prices.
            </p>

            <div className={styles.actions}>
              <SpecularButton href="/signup?intent=sell" size="lg" id="cta-list-materials">
                List Your Materials
              </SpecularButton>
              <Link href="/marketplace" className={styles.secondaryAction} id="cta-explore">
                Explore Marketplace
              </Link>
            </div>

            <div className={styles.trustSignals}>
              {trustSignals.map((signal, idx) => (
                <div key={idx} className={styles.signal}>
                  <div className={styles.checkIcon}>
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default FinalCTASection;
