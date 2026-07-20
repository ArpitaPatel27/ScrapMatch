'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './ProblemStats.module.css';

const STATS = [
  { value: '₹2.4T', label: 'worth of industrial materials landfilled annually in India', sub: 'recoverable value lost' },
  { value: '34%', label: 'reduction in raw material cost when switching to secondary materials', sub: 'avg. across categories' },
  { value: '62%', label: 'of companies have no digital process for surplus material disposal', sub: 'operating blind' },
];

export default function ProblemStats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={ref} aria-label="The problem with industrial waste">
      <div className={styles.inner}>
        <motion.div
          className={styles.label}
          initial={{ opacity: 0, y: 8 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          The Problem
        </motion.div>
        <div className={styles.grid}>
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.value}
              className={styles.statCard}
              initial={{ opacity: 0, y: 24 }}
              animate={visible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className={styles.statValue}>{stat.value}</div>
              <p className={styles.statLabel}>{stat.label}</p>
              <span className={styles.statSub}>{stat.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
