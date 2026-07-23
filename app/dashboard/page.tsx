'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Eye, Sparkles, ArrowRight,
  Leaf, DollarSign, Clock, CheckCircle2, BarChart2, Package,
} from 'lucide-react';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import { LISTINGS } from '@/lib/mock-data';
import styles from './page.module.css';

const STATS = [
  {
    icon: Package,
    value: String(LISTINGS.filter(l => l.status === 'active').length),
    label: 'Active Listings',
    trend: '+2',
    up: true,
    color: 'var(--color-brand)',
    bg: 'var(--color-brand-muted)',
  },
  {
    icon: Clock,
    value: String(LISTINGS.filter(l => l.status === 'pending').length),
    label: 'Pending Matches',
    trend: '+1',
    up: true,
    color: 'var(--color-accent)',
    bg: 'var(--color-accent-muted)',
  },
  {
    icon: DollarSign,
    value: '₹3.4L',
    label: 'Revenue This Month',
    trend: '+12%',
    up: true,
    color: 'var(--color-success)',
    bg: 'var(--color-success-muted)',
  },
  {
    icon: Leaf,
    value: '2.3T',
    label: 'CO₂ Saved',
    trend: '+0.4T',
    up: true,
    color: 'hsl(155, 55%, 36%)',
    bg: 'hsl(155, 40%, 93%)',
  },
];

const AI_INSIGHTS = [
  { icon: TrendingUp, text: 'Steel prices up 4.2% this week — good time to list offcuts', color: 'var(--color-success)' },
  { icon: CheckCircle2, text: '3 new buyers registered for HDPE in your region', color: 'var(--color-brand)' },
  { icon: BarChart2, text: 'Market demand for OCC paper is high — 12 active buyers nearby', color: 'var(--color-accent)' },
];

const CHART_BARS = [42, 58, 35, 72, 65, 88, 55];

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.36, ease: 'easeOut' as const },
  }),
};

const STATUS_BADGE: Record<string, string> = {
  active: styles.badgeActive,
  pending: styles.badgePending,
  matched: styles.badgeMatched,
  sold: styles.badgeSold,
  paused: styles.badgePaused,
};

export default function DashboardPage() {
  const recentListings = LISTINGS.slice(0, 5);

  return (
    <>
      {/* Welcome banner */}
      <motion.section
        className={styles.welcomeBanner}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.38, ease: 'easeOut' }}
      >
        <div className={styles.welcomeText}>
          <h1 className={styles.welcomeHeading}>Good morning, Rahul 👋</h1>
          <p className={styles.welcomeSub}>
            Your materials are actively being matched. 3 new buyer inquiries this week.
          </p>
        </div>
        <div className={styles.welcomeActions}>
          <SpecularButton href="/dashboard/listings/new">List New Material</SpecularButton>
          <SpecularButton href="/dashboard/marketplace" variant="secondary">Browse Marketplace</SpecularButton>
        </div>
      </motion.section>

      {/* Stats row */}
      <section className={styles.statsRow}>
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label} className={styles.statCard}
            custom={i} variants={cardVariants} initial="hidden" animate="visible"
            whileHover={{ translateY: -2 }}
          >
            <div className={styles.statIconWrap} style={{ background: stat.bg, color: stat.color }}>
              <stat.icon size={20} />
            </div>
            <div className={styles.statContent}>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
            <div className={`${styles.statTrend} ${stat.up ? styles.statTrendUp : styles.statTrendDown}`}>
              {stat.up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
              {stat.trend}
            </div>
          </motion.div>
        ))}
      </section>

      {/* Two-column grid */}
      <div className={styles.twoCol}>
        {/* Recent Listings */}
        <motion.section
          className={styles.card}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.38, ease: 'easeOut' }}
        >
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Recent Listings</h2>
            <Link href="/dashboard/listings" className={styles.cardViewAll}>
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span>Material</span><span>Qty</span><span>Status</span><span></span>
            </div>
            {recentListings.map((row) => (
              <div key={row.id} className={styles.tableRow}>
                <div className={styles.tableCell}>
                  <span className={styles.materialName}>{row.material}</span>
                  <span className={styles.materialCategory}>{row.category}</span>
                </div>
                <span className={styles.tableQty}>{row.quantity}{row.unit === 'Tonnes' ? 'T' : row.unit === 'kg' ? 'kg' : ''}</span>
                <span className={`${styles.badge} ${STATUS_BADGE[row.status] || ''}`}>
                  {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                </span>
                <Link href={`/dashboard/listings/${row.id}`} className={styles.viewBtn}>
                  <Eye size={14} /> View
                </Link>
              </div>
            ))}
          </div>
        </motion.section>

        {/* AI Insights */}
        <motion.section
          className={styles.card}
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.42, duration: 0.38, ease: 'easeOut' }}
        >
          <div className={styles.cardHeader}>
            <div className={styles.aiCardTitle}>
              <Sparkles size={18} className={styles.sparklesIcon} />
              <h2 className={styles.cardTitle}>AI Market Intelligence</h2>
            </div>
          </div>
          <div className={styles.insightList}>
            {AI_INSIGHTS.map((insight, i) => (
              <div key={i} className={styles.insightItem}>
                <div className={styles.insightIcon} style={{ color: insight.color }}>
                  <insight.icon size={16} />
                </div>
                <p className={styles.insightText}>{insight.text}</p>
              </div>
            ))}
          </div>
          <Link href="/dashboard/esg" className={styles.insightLink}>
            View full market report →
          </Link>
        </motion.section>
      </div>

      {/* Bar chart */}
      <motion.section
        className={styles.card}
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.52, duration: 0.38, ease: 'easeOut' }}
      >
        <div className={styles.cardHeader}>
          <h2 className={styles.cardTitle}>This Month&rsquo;s Activity</h2>
          <span className={styles.chartSubtitle}>Transaction volume (last 7 weeks)</span>
        </div>
        <div className={styles.chartWrap}>
          <div className={styles.barChart}>
            {CHART_BARS.map((h, i) => (
              <div key={i} className={styles.barCol}>
                <motion.div
                  className={styles.bar}
                  initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                  transition={{ delay: 0.6 + i * 0.06, duration: 0.4, ease: 'easeOut' }}
                  style={{ height: `${h}%` }}
                />
                <span className={styles.barLabel}>W{i + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}
