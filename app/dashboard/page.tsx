'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Zap,
  Bell,
  LayoutDashboard,
  Package,
  ShoppingCart,
  MessageSquare,
  BarChart2,
  Settings,
  Star,
  TrendingUp,
  TrendingDown,
  Eye,
  Sparkles,
  ArrowRight,
  Leaf,
  DollarSign,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import styles from './page.module.css';

/* ── DATA ──────────────────────────────────────────────────── */
const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Listings', href: '/dashboard/listings' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'ESG Reports', href: '/dashboard/esg' },
];

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Package, label: 'My Listings' },
  { icon: ShoppingCart, label: 'Buy Materials' },
  { icon: MessageSquare, label: 'Messages' },
  { icon: BarChart2, label: 'ESG Reports' },
  { icon: Settings, label: 'Settings' },
];

const STATS = [
  {
    icon: Package,
    value: '4',
    label: 'Active Listings',
    trend: '+2',
    up: true,
    color: 'var(--color-brand)',
    bg: 'var(--color-brand-muted)',
  },
  {
    icon: Clock,
    value: '7',
    label: 'Pending Matches',
    trend: '+3',
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

const LISTINGS = [
  { name: 'Steel Offcuts IS2062', category: 'Metals', qty: '14T', status: 'Matched', statusType: 'matched' as const },
  { name: 'HDPE Regrind Grade A', category: 'Plastics', qty: '8T', status: 'Pending', statusType: 'pending' as const },
  { name: 'OCC Cardboard', category: 'Paper', qty: '22T', status: 'Active', statusType: 'active' as const },
];

const AI_INSIGHTS = [
  {
    icon: TrendingUp,
    text: 'Steel prices up 4.2% this week — good time to list offcuts',
    color: 'var(--color-success)',
  },
  {
    icon: CheckCircle2,
    text: '3 new buyers registered for HDPE in your region',
    color: 'var(--color-brand)',
  },
  {
    icon: BarChart2,
    text: 'Market demand for OCC paper is high — 12 active buyers nearby',
    color: 'var(--color-accent)',
  },
];

// Bar chart heights (% of max) — 7 weeks
const CHART_BARS = [42, 58, 35, 72, 65, 88, 55];

/* ── ANIMATION VARIANTS ────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.36, ease: 'easeOut' as const },
  }),
};

/* ── COMPONENT ─────────────────────────────────────────────── */
export default function DashboardPage() {
  return (
    <div className={styles.root}>
      {/* ── TOP NAV ───────────────────────────────────────── */}
      <header className={styles.topNav}>
        <div className={styles.navLeft}>
          <div className={styles.navLogo}>
            <div className={styles.navLogoIcon}>
              <Zap size={18} fill="currentColor" />
            </div>
            <span className={styles.navLogoText}>ScrapMatch</span>
          </div>
          <nav className={styles.navLinks}>
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`${styles.navLink} ${item.href === '/dashboard' ? styles.navLinkActive : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className={styles.navRight}>
          <button className={styles.bellBtn} aria-label="Notifications">
            <Bell size={20} />
            <span className={styles.bellDot} />
          </button>
          <div className={styles.avatar} title="Rahul Sharma">
            RS
          </div>
        </div>
      </header>

      {/* ── BODY ──────────────────────────────────────────── */}
      <div className={styles.body}>
        {/* ── SIDEBAR ─────────────────────────────────────── */}
        <aside className={styles.sidebar}>
          {/* Profile */}
          <div className={styles.sidebarProfile}>
            <div className={styles.sidebarAvatar}>RS</div>
            <div className={styles.sidebarProfileText}>
              <span className={styles.sidebarName}>Rahul Sharma</span>
              <span className={styles.sidebarCompany}>Tech Manufacturing Ltd.</span>
            </div>
          </div>

          {/* Nav */}
          <nav className={styles.sidebarNav}>
            {SIDEBAR_ITEMS.map((item) => (
              <button
                key={item.label}
                className={`${styles.sidebarItem} ${item.active ? styles.sidebarItemActive : ''}`}
              >
                <item.icon size={18} className={styles.sidebarIcon} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Upgrade card */}
          <div className={styles.upgradeCard}>
            <Star size={18} className={styles.upgradeIcon} />
            <p className={styles.upgradeTitle}>Upgrade to Pro</p>
            <p className={styles.upgradeDesc}>
              Unlock AI-powered matching, priority listings, and advanced ESG reports.
            </p>
            <div className={styles.upgradeBtnWrap}>
              <SpecularButton size="sm">Upgrade →</SpecularButton>
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ────────────────────────────────── */}
        <main className={styles.main}>
          {/* Welcome banner */}
          <motion.section
            className={styles.welcomeBanner}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.38, ease: 'easeOut' as const }}
          >
            <div className={styles.welcomeText}>
              <h1 className={styles.welcomeHeading}>Good morning, Rahul 👋</h1>
              <p className={styles.welcomeSub}>
                Your materials are actively being matched. 3 new buyer inquiries this week.
              </p>
            </div>
            <div className={styles.welcomeActions}>
              <div className={styles.btnMd}>
                <SpecularButton href="/dashboard/listings/new">
                  List New Material
                </SpecularButton>
              </div>
              <div className={styles.btnMd}>
                <SpecularButton href="/marketplace" variant="secondary">
                  Browse Marketplace
                </SpecularButton>
              </div>
            </div>
          </motion.section>

          {/* Stats row */}
          <section className={styles.statsRow}>
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={styles.statCard}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ translateY: -2 }}
              >
                <div
                  className={styles.statIconWrap}
                  style={{ background: stat.bg, color: stat.color }}
                >
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
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.38, ease: 'easeOut' as const }}
            >
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>Recent Listings</h2>
                <Link href="/dashboard/listings" className={styles.cardViewAll}>
                  View all <ArrowRight size={13} />
                </Link>
              </div>
              <div className={styles.table}>
                <div className={styles.tableHead}>
                  <span>Material</span>
                  <span>Qty</span>
                  <span>Status</span>
                  <span></span>
                </div>
                {LISTINGS.map((row) => (
                  <div key={row.name} className={styles.tableRow}>
                    <div className={styles.tableCell}>
                      <span className={styles.materialName}>{row.name}</span>
                      <span className={styles.materialCategory}>{row.category}</span>
                    </div>
                    <span className={styles.tableQty}>{row.qty}</span>
                    <span className={`${styles.badge} ${styles[`badge${row.statusType.charAt(0).toUpperCase() + row.statusType.slice(1)}`]}`}>
                      {row.status}
                    </span>
                    <button className={styles.viewBtn}>
                      <Eye size={14} /> View
                    </button>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* AI Insights */}
            <motion.section
              className={styles.card}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42, duration: 0.38, ease: 'easeOut' as const }}
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
                    <div
                      className={styles.insightIcon}
                      style={{ color: insight.color, opacity: 0.9 }}
                    >
                      <insight.icon size={16} />
                    </div>
                    <p className={styles.insightText}>{insight.text}</p>
                  </div>
                ))}
              </div>
              <Link href="/dashboard/market-report" className={styles.insightLink}>
                View full market report →
              </Link>
            </motion.section>
          </div>

          {/* Market Trends chart */}
          <motion.section
            className={styles.card}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.52, duration: 0.38, ease: 'easeOut' as const }}
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
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ delay: 0.6 + i * 0.06, duration: 0.4, ease: 'easeOut' as const }}
                      style={{ height: `${h}%` }}
                    />
                    <span className={styles.barLabel}>W{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>
        </main>
      </div>
    </div>
  );
}

