'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { IndianRupee, Clock, ShieldCheck } from 'lucide-react';
import styles from './SocialProof.module.css';

/* ── Animated counter ─────────────────────────────────────────── */
const Counter = ({
  value,
  prefix = '',
  suffix = '',
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' });

  useEffect(() => {
    if (!isInView) return;
    let frame: number;
    const duration = 1800;
    const start = performance.now();

    function update(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      setCount(Math.round(ease * value));
      if (progress < 1) frame = requestAnimationFrame(update);
    }

    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [isInView, value]);

  return (
    <span ref={ref} className={styles.counterValue}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

/* ── Main metrics ─────────────────────────────────────────────── */
const metrics = [
  { value: 47000, label: 'Tonnes matched',      prefix: '',  suffix: '+' },
  { value: 120,   label: 'in transactions',      prefix: '₹', suffix: 'Cr+' },
  { value: 280,   label: 'Verified companies',   prefix: '',  suffix: '+' },
  { value: 12,    label: 'States covered',        prefix: '',  suffix: '' },
];

/* ── 3 benefit cards (replace the fake company strip) ─────────── */
const benefits = [
  {
    Icon: IndianRupee,
    title: 'Better prices',
    desc: 'Sellers earn 18–34% more than scrap dealers offer. Buyers save on raw material costs.',
  },
  {
    Icon: Clock,
    title: 'Faster deals',
    desc: 'Average time from listing to confirmed deal: under 4 hours. No back-and-forth.',
  },
  {
    Icon: ShieldCheck,
    title: 'Zero risk',
    desc: 'GST-verified businesses, digital contracts, and escrow-protected payments. No surprises.',
  },
];

const SocialProof = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Section label */}
        <motion.div
          className={styles.sectionLabel}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.eyebrow}>By the numbers</span>
          <h2 className={styles.headline}>
            Real results from real manufacturers.
          </h2>
        </motion.div>

        {/* ── Metrics bar ──────────────────────────────────────── */}
        <motion.div
          className={styles.metricsGrid}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {metrics.map((metric, idx) => (
            <React.Fragment key={idx}>
              <div className={styles.metricCard}>
                <Counter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                <span className={styles.metricLabel}>{metric.label}</span>
              </div>
              {idx < metrics.length - 1 && <div className={styles.divider} />}
            </React.Fragment>
          ))}
        </motion.div>

        {/* ── 3 benefit cards ──────────────────────────────────── */}
        <div className={styles.benefitsGrid}>
          {benefits.map((b, idx) => {
            const Icon = b.Icon;
            return (
              <motion.div
                key={b.title}
                className={styles.benefitCard}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: 0.15 + idx * 0.1 }}
              >
                <div className={styles.benefitIcon}>
                  <Icon size={20} strokeWidth={1.5} />
                </div>
                <div className={styles.benefitText}>
                  <h3 className={styles.benefitTitle}>{b.title}</h3>
                  <p className={styles.benefitDesc}>{b.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default SocialProof;
