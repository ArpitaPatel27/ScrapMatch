'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './CTASection.module.css';

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={ref} aria-label="Get started">
      <div className={styles.inner}>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={visible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className={styles.glowBg} aria-hidden="true" />
          <h2 className={styles.title}>Ready to turn waste into working capital?</h2>
          <p className={styles.sub}>
            Join 280+ industrial companies already transforming their
            by-products into revenue on ScrapMatch.
          </p>
          <div className={styles.ctas}>
            <Link href="/signup" className={styles.ctaPrimary}>Get Started Free</Link>
            <Link href="/contact" className={styles.ctaSecondary}>Talk to Sales</Link>
          </div>
          <p className={styles.trust}>
            No credit card required · GST-verified onboarding · Enterprise plans available
          </p>
        </motion.div>
      </div>
    </section>
  );
}
