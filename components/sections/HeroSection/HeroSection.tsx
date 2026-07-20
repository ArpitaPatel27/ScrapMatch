'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import styles from './HeroSection.module.css';

const MaterialFlowViz = dynamic(
  () => import('@/components/organisms/MaterialFlowViz/MaterialFlowViz'),
  { ssr: false }
);

const TRUST_LOGOS = [
  'Tata Industries', 'Reliance', 'Aditya Birla', 'ITC Limited', 'Mahindra',
];

export default function HeroSection() {
  return (
    <section className={styles.hero} aria-label="Hero">
      {/* Very subtle dot-grid texture */}
      <div className={styles.grid} aria-hidden="true" />

      {/* ── Full-width container ── */}
      <div className={styles.container}>

        {/* ── Left: Content (55%) ── */}
        <div className={styles.content}>

          {/* Eyebrow badge */}
          <motion.div
            className={styles.eyebrow}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 }}
          >
            <span className={styles.eyebrowDot} />
            Industrial Materials Exchange — Powered by AI
          </motion.div>

          {/* Headline — two lines, large editorial */}
          <motion.h1
            className={styles.headline}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            One company&apos;s waste.
            <br />
            <span className={styles.headlineAccent}>
              Another&apos;s raw material.
            </span>
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            className={styles.sub}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.28 }}
          >
            ScrapMatch helps manufacturers identify, value and sell surplus
            industrial materials using AI — while connecting them with verified
            industrial buyers across India.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.4 }}
          >
            <SpecularButton href="/signup?intent=sell" size="lg" id="hero-cta-primary">
              List Materials
              <ArrowRight size={16} strokeWidth={2} />
            </SpecularButton>

            <Link href="/marketplace" className={styles.ctaSecondary} id="hero-cta-secondary">
              Explore Marketplace
              <ChevronRight size={15} strokeWidth={2} />
            </Link>
          </motion.div>

          {/* Trust social proof */}
          <motion.div
            className={styles.trust}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.58 }}
          >
            <p className={styles.trustLabel}>Trusted by manufacturers across India</p>
            <div className={styles.trustLogos}>
              {TRUST_LOGOS.map((name) => (
                <span key={name} className={styles.trustLogo}>{name}</span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Right: Product visualization (45%) ── */}
        <motion.div
          className={styles.visual}
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Decorative background ring */}
          <div className={styles.visualRing} aria-hidden="true" />
          <MaterialFlowViz />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className={styles.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        aria-hidden="true"
      >
        <div className={styles.scrollLine} />
      </motion.div>
    </section>
  );
}
