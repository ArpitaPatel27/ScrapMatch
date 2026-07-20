'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './MaterialCategories.module.css';

const CATEGORIES = [
  { name: 'Metals', slug: 'metals', color: 'var(--color-cat-metals)', count: 284, icon: '⚙️' },
  { name: 'Plastics', slug: 'plastics', color: 'var(--color-cat-plastics)', count: 412, icon: '🔷' },
  { name: 'Textiles', slug: 'textiles', color: 'var(--color-cat-textiles)', count: 167, icon: '🧵' },
  { name: 'Paper & Pulp', slug: 'paper', color: 'var(--color-cat-paper)', count: 203, icon: '📄' },
  { name: 'Glass', slug: 'glass', color: 'var(--color-cat-glass)', count: 89, icon: '🔵' },
  { name: 'Rubber', slug: 'rubber', color: 'var(--color-cat-rubber)', count: 76, icon: '⚫' },
  { name: 'Wood', slug: 'wood', color: 'var(--color-cat-wood)', count: 134, icon: '🪵' },
  { name: 'Chemicals', slug: 'chemicals', color: 'var(--color-cat-chemicals)', count: 58, icon: '🧪' },
  { name: 'Construction', slug: 'construction', color: 'var(--color-cat-construction)', count: 321, icon: '🏗️' },
  { name: 'Agricultural', slug: 'agricultural', color: 'var(--color-cat-agricultural)', count: 145, icon: '🌾' },
  { name: 'Industrial By-Products', slug: 'industrial', color: 'var(--color-cat-industrial)', count: 192, icon: '🏭' },
  { name: 'Packaging', slug: 'packaging', color: 'var(--color-cat-packaging)', count: 267, icon: '📦' },
];

export default function MaterialCategories() {
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
    <section className={styles.section} ref={ref} aria-label="Material categories">
      <div className={styles.inner}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 16 }}
          animate={visible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <span className={styles.sectionLabel}>Materials</span>
          <h2 className={styles.title}>12 industrial material categories</h2>
          <p className={styles.subtitle}>From ferrous scrap to fly ash — every industrial by-product has a buyer on ScrapMatch.</p>
        </motion.div>

        <div className={styles.grid}>
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={visible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: i * 0.04, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <Link href={`/marketplace?category=${cat.slug}`} className={styles.card} style={{ '--cat-color': cat.color } as React.CSSProperties}>
                <div className={styles.cardIcon}>{cat.icon}</div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardName}>{cat.name}</h3>
                  <span className={styles.cardCount}>{cat.count} listings</span>
                </div>
                <div className={styles.cardArrow}>→</div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
