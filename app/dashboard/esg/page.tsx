'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, TrendingUp, TrendingDown, Award } from 'lucide-react';
import { LISTINGS } from '@/lib/mock-data';
import styles from './page.module.css';

const MONTHLY_DATA = [
  { month: 'Jan', co2: 0.28, waste: 6, revenue: 48000 },
  { month: 'Feb', co2: 0.35, waste: 8, revenue: 62000 },
  { month: 'Mar', co2: 0.41, waste: 9, revenue: 71000 },
  { month: 'Apr', co2: 0.38, waste: 7, revenue: 58000 },
  { month: 'May', co2: 0.52, waste: 11, revenue: 84000 },
  { month: 'Jun', co2: 0.56, waste: 6, revenue: 77000 },
];
const maxCo2 = Math.max(...MONTHLY_DATA.map(d => d.co2));

const BADGES = [
  { icon: '🌱', title: 'Carbon Neutral Trader', desc: 'Offset more than 2T CO₂ through circular supply chain activities.' },
  { icon: '♻️', title: 'Zero Waste Champion', desc: 'Diverted 47+ tonnes of industrial waste from landfill.' },
  { icon: '🔄', title: 'Circular Economy Leader', desc: 'Completed 25+ transactions in the circular economy ecosystem.' },
];

const TRENDS = [
  { label: 'CO₂ Saved', value: '+18%', up: true, desc: 'vs last month' },
  { label: 'Waste Diverted', value: '+7T', up: true, desc: 'vs last month' },
  { label: 'Revenue Impact', value: '+12%', up: true, desc: 'month-over-month' },
];

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>(0);
  useEffect(() => {
    const start = performance.now();
    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(progress * target * 10) / 10);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
    }
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);
  return count;
}

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const v = useCountUp(value);
  return <>{v}{suffix}</>;
}

const IMPACT_ROWS = LISTINGS.slice(0, 5).map(l => ({
  material: l.material, qty: `${l.quantity} ${l.unit}`,
  co2: `${(l.quantity * 0.05).toFixed(2)}T`,
  revenue: `₹${(l.price * l.quantity * 0.001).toFixed(0)}K`,
  status: l.status,
}));

export default function ESGPage() {
  return (
    <>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>ESG Impact Reports</h1>
          <p className={styles.pageSubtitle}>Your environmental, social and governance performance</p>
        </div>
        <div className={styles.exportBtns}>
          <button className={styles.exportBtn} onClick={() => alert('Export feature coming soon')}>
            <Download size={16} /> Export PDF
          </button>
          <button className={styles.exportBtnAlt} onClick={() => alert('Export feature coming soon')}>
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className={styles.statsGrid}>
        {[
          { label: 'CO₂ Saved', value: 2.3, suffix: 'T', color: 'var(--color-success)', bg: 'var(--color-success-muted)', emoji: '🌿' },
          { label: 'Waste Diverted', value: 47, suffix: 'T', color: 'var(--color-brand)', bg: 'var(--color-brand-muted)', emoji: '♻️' },
          { label: 'Revenue Generated', value: 340, suffix: 'K', color: 'var(--color-accent)', bg: 'var(--color-accent-muted)', emoji: '💰' },
          { label: 'Circular Score', value: 84, suffix: '/100', color: 'var(--color-info)', bg: 'var(--color-info-muted)', emoji: '🔄' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label} className={styles.statCard}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.35 }}
            whileHover={{ translateY: -2 }}
          >
            <div className={styles.statEmoji}>{stat.emoji}</div>
            <div className={styles.statValue} style={{ color: stat.color }}>
              ₹<AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </div>
            <div className={styles.statLabel}>{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Monthly CO₂ chart */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.35 }}
      >
        <h2 className={styles.cardTitle}>Monthly CO₂ Savings (Tonnes)</h2>
        <div className={styles.chartContainer}>
          <div className={styles.barChart}>
            {MONTHLY_DATA.map((d, i) => (
              <div key={d.month} className={styles.barCol}>
                <span className={styles.barValue}>{d.co2}T</span>
                <motion.div
                  className={styles.bar}
                  initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5, ease: 'easeOut' }}
                  style={{ height: `${(d.co2 / maxCo2) * 100}%` }}
                />
                <span className={styles.barLabel}>{d.month}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Impact table */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.35, delay: 0.1 }}
      >
        <h2 className={styles.cardTitle}>Impact Breakdown by Material</h2>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tableHead}>
                <th>Material</th><th>Qty Traded</th><th>CO₂ Saved</th><th>Revenue</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {IMPACT_ROWS.map((row, i) => (
                <tr key={i} className={styles.tableRow}>
                  <td className={styles.materialName}>{row.material}</td>
                  <td>{row.qty}</td>
                  <td className={styles.co2Val}>{row.co2}</td>
                  <td className={styles.revVal}>{row.revenue}</td>
                  <td><span className={`${styles.badge} ${styles['badge_' + row.status]}`}>{row.status.charAt(0).toUpperCase() + row.status.slice(1)}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Environmental badges */}
      <div className={styles.twoCol}>
        <div className={styles.badgesSection}>
          <h2 className={styles.sectionTitle}>Achievement Badges</h2>
          <div className={styles.badgesList}>
            {BADGES.map((b, i) => (
              <motion.div
                key={b.title} className={styles.badgeCard}
                initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.35 }}
                whileHover={{ translateY: -2 }}
              >
                <div className={styles.badgeEmoji}>{b.icon}</div>
                <div>
                  <div className={styles.badgeTitle}><Award size={15} /> {b.title}</div>
                  <p className={styles.badgeDesc}>{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trends */}
        <div className={styles.trendsSection}>
          <h2 className={styles.sectionTitle}>Month-over-Month Trends</h2>
          <div className={styles.trendsList}>
            {TRENDS.map((t, i) => (
              <motion.div
                key={t.label} className={styles.trendCard}
                initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.35 }}
              >
                <span className={styles.trendLabel}>{t.label}</span>
                <div className={`${styles.trendValue} ${t.up ? styles.trendUp : styles.trendDown}`}>
                  {t.up ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  {t.value}
                </div>
                <span className={styles.trendDesc}>{t.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
