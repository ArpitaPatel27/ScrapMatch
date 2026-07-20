'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ScanLine, Network, FileSignature } from 'lucide-react';
import styles from './HowItWorks.module.css';

const STEPS = [
  {
    num: '01',
    icon: ScanLine,
    title: 'Classify',
    body: 'List your material. Our AI identifies it, grades it, and prices it against real market data — in under 60 seconds.',
    detail: 'Photo upload · Text description · Auto-grade · Price benchmark',
  },
  {
    num: '02',
    icon: Network,
    title: 'Match',
    body: 'VEDA instantly finds the right buyer or seller from our verified network of 280+ industrial companies.',
    detail: 'AI scoring · Geographic matching · Compliance check · Volume fit',
  },
  {
    num: '03',
    icon: FileSignature,
    title: 'Deal',
    body: 'Negotiate, generate contracts, and track delivery — all on the platform. Auto-generated compliance documents included.',
    detail: 'In-platform messaging · Contract templates · CO₂ reporting · Document vault',
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className={styles.section} ref={ref} aria-label="How ScrapMatch works">
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.sectionLabel}>How It Works</span>
          <h2 className={styles.title}>From waste to revenue in three steps</h2>
          <p className={styles.subtitle}>The AI does the heavy lifting. You confirm, negotiate, and close.</p>
        </motion.div>

        <div className={styles.steps}>
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                className={styles.step}
                initial={{ opacity: 0, y: 32 }}
                animate={visible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
              >
                {/* Connector line */}
                {i < STEPS.length - 1 && (
                  <div className={styles.connector} aria-hidden="true">
                    <motion.div
                      className={styles.connectorLine}
                      initial={{ scaleX: 0 }}
                      animate={visible ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
                    />
                  </div>
                )}

                <div className={styles.stepNum}>{step.num}</div>
                <div className={styles.iconWrapper}>
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepBody}>{step.body}</p>
                <p className={styles.stepDetail}>{step.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
