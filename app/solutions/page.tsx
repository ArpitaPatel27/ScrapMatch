'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import MarketingNav from '@/components/organisms/MarketingNav/MarketingNav';
import MarketingFooter from '@/components/organisms/MarketingFooter/MarketingFooter';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import styles from './page.module.css';

const roles = [
  {
    id: 'sellers',
    eyebrow: 'For Sellers',
    title: 'You produce it. We sell it.',
    desc: 'Plant managers and operations teams can list surplus in minutes. AI handles the grading, pricing, and buyer matching. You just approve the deal.',
    cta: 'Start Selling',
    href: '/signup?intent=sell',
    // Industrial manufacturing / steel plant
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=75&auto=format&fit=crop',
    imageAlt: 'Industrial manufacturing facility producing surplus materials',
  },
  {
    id: 'buyers',
    eyebrow: 'For Buyers',
    title: 'Better prices on secondary materials.',
    desc: 'Source verified secondary raw materials at 18–34% below virgin material costs. Filter by grade, quantity, and location. Receive instant alerts.',
    cta: 'Start Sourcing',
    href: '/signup?intent=buy',
    // Warehouse / material sorting
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=75&auto=format&fit=crop',
    imageAlt: 'Industrial warehouse with material sorting and logistics',
  },
  {
    id: 'enterprise',
    eyebrow: 'For Enterprise',
    title: 'Multi-plant visibility and ESG reporting.',
    desc: 'Track surplus and procurement across every facility. Export ESG diversion reports. Manage team access, integrate with SAP or Tally via API.',
    cta: 'Contact Sales',
    href: '/contact',
    // Modern industrial dashboard / circular economy
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&q=75&auto=format&fit=crop',
    imageAlt: 'Circular economy and sustainable industrial production',
  },
  {
    id: 'traders',
    eyebrow: 'For Traders',
    title: 'Scale your trading operations.',
    desc: 'Source materials from 280+ verified suppliers across India. List your inventory. Close deals faster with AI valuation and instant buyer matching.',
    cta: 'Talk to Us',
    href: '/contact',
    // Industrial logistics / freight
    image: 'https://images.unsplash.com/photo-1565792441875-5b7f5a5f1a9f?w=800&q=75&auto=format&fit=crop',
    imageAlt: 'Industrial logistics and material freight operations',
  },
];

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState<'sell' | 'buy'>('sell');

  const sellSteps = [
    'List material with photo or description',
    'AI classifies and prices it automatically',
    'Verified buyers receive instant notification',
    'Confirm deal, documents auto-generated',
  ];

  const buySteps = [
    'Set material requirements and budget',
    'Browse matched listings or receive alerts',
    'Review seller credentials and material details',
    'Place order, payment handled securely',
  ];

  return (
    <div className={styles.main}>
      <MarketingNav />

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className={styles.hero}>
          <motion.div
            className={styles.heroContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className={styles.eyebrow}>Solutions</span>
            <h1 className={styles.headline}>Built for every role in the supply chain.</h1>
            <p className={styles.subhead}>
              Whether you produce waste, source materials, or manage procurement —
              ScrapMatch has a workflow designed for you.
            </p>
          </motion.div>
        </section>

        {/* ── ROLE CARDS ───────────────────────────────────────── */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <div className={styles.rolesGrid}>
              {roles.map((role, idx) => (
                <motion.div
                  key={role.id}
                  className={styles.roleCard}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: idx * 0.09, duration: 0.45, ease: 'easeOut' }}
                >
                  {/* Image */}
                  <div className={styles.roleImageWrap}>
                    <Image
                      src={role.image}
                      alt={role.imageAlt}
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'center' }}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className={styles.roleImageOverlay} />
                    <span className={styles.roleEyebrow}>{role.eyebrow}</span>
                  </div>

                  {/* Content */}
                  <div className={styles.roleContent}>
                    <h3 className={styles.roleTitle}>{role.title}</h3>
                    <p className={styles.roleDesc}>{role.desc}</p>
                    <a href={role.href} className={styles.roleCta}>
                      {role.cta} <ChevronRight size={15} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CASE STUDIES ─────────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Success Stories</span>
              <h2 className={styles.sectionHeadline}>Proven results across industries.</h2>
            </div>

            <div className={styles.caseGrid}>
              {[
                {
                  company: 'Plastics manufacturer, Maharashtra',
                  stat: 'Recovered ₹14L',
                  quote: 'We used to sell to scrap dealers at half price. Now we get market rate from verified buyers.',
                },
                {
                  company: 'Steel plant, Gujarat',
                  stat: 'Cut costs by 22%',
                  quote: 'We source IS2062 offcuts from ScrapMatch instead of buying virgin steel. It has fundamentally changed our cost structure.',
                },
                {
                  company: 'Paper recycler, Hyderabad',
                  stat: '4 new buyers',
                  quote: 'Matched with 4 new buyers in the first week. The AI classified our OCC grade correctly. No more guessing.',
                },
              ].map((c, i) => (
                <motion.div
                  key={i}
                  className={styles.caseCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className={styles.caseCompany}>{c.company}</div>
                  <div className={styles.caseStat}>{c.stat}</div>
                  <p className={styles.caseQuote}>&ldquo;{c.quote}&rdquo;</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────── */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Workflow</span>
              <h2 className={styles.sectionHeadline}>How it works for you.</h2>
            </div>

            <div className={styles.tabsNav}>
              <button
                className={`${styles.tabBtn} ${activeTab === 'sell' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('sell')}
              >
                I want to sell
              </button>
              <button
                className={`${styles.tabBtn} ${activeTab === 'buy' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('buy')}
              >
                I want to buy
              </button>
            </div>

            <div className={styles.stepsGrid}>
              {(activeTab === 'sell' ? sellSteps : buySteps).map((step, index) => (
                <motion.div
                  key={`${activeTab}-${index}`}
                  className={styles.stepCard}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={styles.stepNum}>{index + 1}</div>
                  <p className={styles.stepDesc}>{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <h2 className={styles.headline}>Get started today.</h2>
              <div className={styles.ctaActions}>
                <SpecularButton href="/signup">List Materials</SpecularButton>
                <a href="/marketplace" className={styles.secondaryBtn}>Explore Marketplace</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </div>
  );
}
