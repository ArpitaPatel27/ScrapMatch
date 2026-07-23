'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Users, ShoppingCart, BarChart3, ArrowUpRight } from 'lucide-react';
import MarketingNav from '@/components/organisms/MarketingNav/MarketingNav';
import MarketingFooter from '@/components/organisms/MarketingFooter/MarketingFooter';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import styles from './IndustryPageTemplate.module.css';

export interface MaterialItem {
  name: string;
  grade?: string;
  qty: string;
  price: string;
  trend?: 'up' | 'down' | 'stable';
}

export interface TransactionItem {
  seller: string;
  material: string;
  buyer: string;
  qty: string;
  value: string;
}

export interface IndustryPageData {
  name: string;
  slug: string;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  overview: string;
  accentColor: string;
  materials: MaterialItem[];
  buyers: string[];
  sellers: string[];
  transactions: TransactionItem[];
  insights: { stat: string; label: string }[];
  relatedIndustries: { name: string; slug: string }[];
}

interface Props {
  data: IndustryPageData;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function IndustryPageTemplate({ data }: Props) {
  return (
    <>
      <MarketingNav />

      <main>
        {/* ── HERO ───────────────────────────────────────────────── */}
        <section className={styles.hero} style={{ '--industry-color': data.accentColor } as React.CSSProperties}>
          <div className={styles.heroInner}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <div className={styles.breadcrumb}>
                <Link href="/industries">Industries</Link>
                <span>/</span>
                <span>{data.name}</span>
              </div>

              <span className={styles.heroEyebrow}>{data.eyebrow}</span>
              <h1 className={styles.heroTitle}>{data.heroTitle}</h1>
              <p className={styles.heroSubtitle}>{data.heroSubtitle}</p>

              <div className={styles.heroCtas}>
                <SpecularButton href="/signup?intent=sell" size="lg">
                  List Your Materials
                  <ArrowRight size={16} strokeWidth={2} />
                </SpecularButton>
                <Link href="/marketplace" className={styles.heroCtaSecondary}>
                  Browse Listings
                </Link>
              </div>
            </motion.div>

            {/* Market Insights Bar */}
            <motion.div
              className={styles.insightsBar}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {data.insights.map((insight, i) => (
                <div key={i} className={styles.insightItem}>
                  <span className={styles.insightStat}>{insight.stat}</span>
                  <span className={styles.insightLabel}>{insight.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── OVERVIEW ────────────────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.overviewGrid}>
              <motion.div
                className={styles.overviewContent}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
              >
                <span className={styles.eyebrow}>Overview</span>
                <h2 className={styles.sectionTitle}>
                  How ScrapMatch serves<br />the {data.name} sector
                </h2>
                <p className={styles.overviewText}>{data.overview}</p>
              </motion.div>

              <motion.div
                className={styles.overviewStats}
                variants={stagger}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
              >
                {data.insights.slice(0, 4).map((insight, i) => (
                  <motion.div key={i} className={styles.statCard} variants={fadeUp} transition={{ duration: 0.45 }}>
                    <span className={styles.statValue}>{insight.stat}</span>
                    <span className={styles.statLabel}>{insight.label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── MATERIALS ───────────────────────────────────────────── */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <motion.div
              className={styles.sectionHeader}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <span className={styles.eyebrow}>Common Materials</span>
              <h2 className={styles.sectionTitle}>Recyclable materials in this sector</h2>
              <p className={styles.sectionSubtitle}>
                Live price data updated daily from verified buyers and sellers across India.
              </p>
            </motion.div>

            <motion.div
              className={styles.materialsTable}
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              <div className={styles.tableHeader}>
                <span>Material</span>
                <span>Grade / Type</span>
                <span>Typical Qty</span>
                <span>Indicative Price</span>
                <span></span>
              </div>
              {data.materials.map((mat, i) => (
                <motion.div key={i} className={styles.tableRow} variants={fadeUp} transition={{ duration: 0.4 }}>
                  <span className={styles.matName}>{mat.name}</span>
                  <span className={styles.matGrade}>{mat.grade ?? '—'}</span>
                  <span className={styles.matQty}>{mat.qty}</span>
                  <span className={styles.matPrice}>
                    {mat.price}
                    {mat.trend === 'up' && <TrendingUp size={13} className={styles.trendUp} />}
                  </span>
                  <Link href="/marketplace" className={styles.tableAction}>
                    View <ArrowUpRight size={13} />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── BUYERS & SELLERS ────────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.container}>
            <motion.div
              className={styles.sectionHeader}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <span className={styles.eyebrow}>Market Participants</span>
              <h2 className={styles.sectionTitle}>Who buys and who sells</h2>
            </motion.div>

            <div className={styles.bsGrid}>
              <motion.div
                className={styles.bsCard}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.bsHeader}>
                  <ShoppingCart size={18} className={styles.bsIcon} />
                  <h3 className={styles.bsTitle}>Typical Buyers</h3>
                </div>
                <ul className={styles.bsList}>
                  {data.buyers.map((b, i) => (
                    <li key={i} className={styles.bsItem}>
                      <span className={styles.bsDot} />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className={styles.bsCard}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className={styles.bsHeader}>
                  <Users size={18} className={styles.bsIcon} />
                  <h3 className={styles.bsTitle}>Typical Sellers</h3>
                </div>
                <ul className={styles.bsList}>
                  {data.sellers.map((s, i) => (
                    <li key={i} className={styles.bsItem}>
                      <span className={styles.bsDot} />
                      {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── EXAMPLE TRANSACTIONS ────────────────────────────────── */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <motion.div
              className={styles.sectionHeader}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <span className={styles.eyebrow}>Example Transactions</span>
              <h2 className={styles.sectionTitle}>Real deals closed on ScrapMatch</h2>
              <p className={styles.sectionSubtitle}>
                Representative transactions. Names changed for confidentiality.
              </p>
            </motion.div>

            <motion.div
              className={styles.txGrid}
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              {data.transactions.map((tx, i) => (
                <motion.div key={i} className={styles.txCard} variants={fadeUp} transition={{ duration: 0.4 }}>
                  <div className={styles.txFlow}>
                    <div className={styles.txParty}>
                      <span className={styles.txRole}>Seller</span>
                      <span className={styles.txName}>{tx.seller}</span>
                    </div>
                    <div className={styles.txArrow}>→</div>
                    <div className={styles.txMaterial}>
                      <span className={styles.txMaterialName}>{tx.material}</span>
                      <span className={styles.txQty}>{tx.qty}</span>
                    </div>
                    <div className={styles.txArrow}>→</div>
                    <div className={styles.txParty}>
                      <span className={styles.txRole}>Buyer</span>
                      <span className={styles.txName}>{tx.buyer}</span>
                    </div>
                  </div>
                  <div className={styles.txValue}>{tx.value}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── MARKET INSIGHTS ─────────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.container}>
            <motion.div
              className={styles.sectionHeader}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <span className={styles.eyebrow}>Market Insights</span>
              <h2 className={styles.sectionTitle}>What the market looks like</h2>
            </motion.div>

            <motion.div
              className={styles.insightsGrid}
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              {data.insights.map((insight, i) => (
                <motion.div key={i} className={styles.insightCard} variants={fadeUp} transition={{ duration: 0.4 }}>
                  <BarChart3 size={20} className={styles.insightIcon} />
                  <span className={styles.insightCardStat}>{insight.stat}</span>
                  <span className={styles.insightCardLabel}>{insight.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── RELATED INDUSTRIES ──────────────────────────────────── */}
        {data.relatedIndustries.length > 0 && (
          <section className={styles.sectionAlt}>
            <div className={styles.container}>
              <motion.div
                className={styles.sectionHeader}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5 }}
              >
                <span className={styles.eyebrow}>Explore More</span>
                <h2 className={styles.sectionTitle}>Related industries</h2>
              </motion.div>
              <div className={styles.relatedGrid}>
                {data.relatedIndustries.map((ind, i) => (
                  <motion.div
                    key={ind.slug}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                  >
                    <Link href={`/industries/${ind.slug}`} className={styles.relatedCard}>
                      {ind.name}
                      <ArrowRight size={15} />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── CTA ─────────────────────────────────────────────────── */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <motion.div
              className={styles.ctaCard}
              initial={{ opacity: 0, scale: 0.97, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55 }}
            >
              <span className={styles.ctaEyebrow}>Get Started</span>
              <h2 className={styles.ctaTitle}>
                Ready to monetise your {data.name.toLowerCase()} surplus?
              </h2>
              <p className={styles.ctaSubtitle}>
                Join hundreds of {data.name.toLowerCase()} companies already trading on ScrapMatch.
                No setup fee. No commissions.
              </p>
              <div className={styles.ctaButtons}>
                <SpecularButton href="/signup?intent=sell" size="lg">
                  List Materials Free
                </SpecularButton>
                <Link href="/contact" className={styles.ctaSecondary}>
                  Talk to Sales
                </Link>
              </div>
              <p className={styles.ctaTrust}>
                GST-verified onboarding · Cancel anytime · Enterprise plans available
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </>
  );
}
