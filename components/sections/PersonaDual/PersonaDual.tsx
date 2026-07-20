'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { TrendingUp, ShieldCheck, FileCheck, Users, BarChart3, Leaf } from 'lucide-react';
import styles from './PersonaDual.module.css';

const SELLER_FEATURES = [
  { icon: TrendingUp, text: 'AI price benchmarking — know your material\'s true market value before listing' },
  { icon: Users, text: 'Instant buyer discovery from 280+ verified industrial companies' },
  { icon: FileCheck, text: 'Auto-generated PCB, GST, and compliance documents' },
  { icon: BarChart3, text: 'Real-time analytics: price achieved vs. market benchmark' },
];

const BUYER_FEATURES = [
  { icon: ShieldCheck, text: 'Verified supplier profiles with transaction history and trust scores' },
  { icon: TrendingUp, text: '20–35% cost reduction vs. virgin raw material procurement' },
  { icon: Leaf, text: 'CO₂ impact data and ESG reporting built into every transaction' },
  { icon: FileCheck, text: 'AI-ranked RFQ matches with quality and compliance scoring' },
];

export default function PersonaDual() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={ref} aria-label="For sellers and buyers">
      <div className={styles.inner}>
        {/* Sellers */}
        <motion.div
          className={`${styles.panel} ${styles.panelSell}`}
          initial={{ opacity: 0, x: -24 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className={styles.panelHeader}>
            <span className={styles.panelRole}>For Operations & Plant Managers</span>
            <h2 className={styles.panelTitle}>Turn by-products into<br/>working capital</h2>
            <p className={styles.panelSub}>Stop leaving money on the table. Get better prices than local dealers, guaranteed.</p>
          </div>
          <ul className={styles.featureList}>
            {SELLER_FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.li
                  key={i}
                  className={styles.feature}
                  initial={{ opacity: 0, x: -12 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.2 + i * 0.08 }}
                >
                  <div className={styles.featureIcon}><Icon size={14} strokeWidth={2} /></div>
                  <span>{f.text}</span>
                </motion.li>
              );
            })}
          </ul>
          <Link href="/solutions/sellers" className={styles.panelCta}>List your first material →</Link>
        </motion.div>

        {/* Buyers */}
        <motion.div
          className={`${styles.panel} ${styles.panelBuy}`}
          initial={{ opacity: 0, x: 24 }}
          animate={visible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <div className={styles.panelHeader}>
            <span className={styles.panelRole}>For Procurement & Sourcing Teams</span>
            <h2 className={styles.panelTitle}>Source secondary raw<br/>materials reliably</h2>
            <p className={styles.panelSub}>Replace volatile virgin material costs with a verified, consistent secondary supply chain.</p>
          </div>
          <ul className={styles.featureList}>
            {BUYER_FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.li
                  key={i}
                  className={styles.feature}
                  initial={{ opacity: 0, x: 12 }}
                  animate={visible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08 }}
                >
                  <div className={styles.featureIcon}><Icon size={14} strokeWidth={2} /></div>
                  <span>{f.text}</span>
                </motion.li>
              );
            })}
          </ul>
          <Link href="/solutions/buyers" className={styles.panelCta}>Source your first material →</Link>
        </motion.div>
      </div>
    </section>
  );
}
