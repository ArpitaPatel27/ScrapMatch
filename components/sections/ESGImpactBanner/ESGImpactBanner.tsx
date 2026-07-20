'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, Package, TrendingUp } from 'lucide-react';
import styles from './ESGImpactBanner.module.css';

function useCounter(target: number, started: boolean, duration = 1800) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [started, target, duration]);
  return count;
}

const STATS = [
  { icon: Package, value: 47000, format: (v: number) => `${(v/1000).toFixed(0)}K+`, unit: 'tonnes', label: 'Diverted from Landfill' },
  { icon: Leaf, value: 82000, format: (v: number) => `${(v/1000).toFixed(0)}K+`, unit: 'tonnes CO₂', label: 'Emissions Saved' },
  { icon: TrendingUp, value: 120, format: (v: number) => `₹${v} Cr+`, unit: '', label: 'Circular Economy Value Created' },
];

function Stat({ item, started }: { item: typeof STATS[0]; started: boolean }) {
  const count = useCounter(item.value, started);
  const Icon = item.icon;
  return (
    <div className={styles.stat}>
      <div className={styles.statIcon}><Icon size={20} strokeWidth={1.5} /></div>
      <div className={styles.statValue}>{item.format(count)}</div>
      <div className={styles.statUnit}>{item.unit}</div>
      <div className={styles.statLabel}>{item.label}</div>
    </div>
  );
}

export default function ESGImpactBanner() {
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
    <section className={styles.banner} ref={ref} aria-label="Environmental impact">
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.sectionLabel}>Impact</span>
          <h2 className={styles.title}>Measurable circular economy impact</h2>
          <p className={styles.subtitle}>Every deal on ScrapMatch generates verified environmental and economic data.</p>
        </motion.div>
        <motion.div
          className={styles.stats}
          initial={{ opacity: 0, y: 24 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {STATS.map((item) => (
            <Stat key={item.label} item={item} started={visible} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
