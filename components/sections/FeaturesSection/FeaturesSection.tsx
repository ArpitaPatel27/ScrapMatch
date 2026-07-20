'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ScanLine, TrendingUp, Users, ShieldCheck, FileCheck, Store } from 'lucide-react';
import GlareHover from '@/components/ui/GlareHover/GlareHover';
import styles from './FeaturesSection.module.css';

/* ── AI Recognition mini-UI preview (CSS-only, no images) ──────── */
function AIMiniPreview() {
  return (
    <div className={styles.aiPreview}>
      <div className={styles.aiPreviewHeader}>
        <span className={styles.aiPreviewDot} />
        <span className={styles.aiPreviewLabel}>AI Analysis</span>
        <span className={styles.aiPreviewStatus}>Running…</span>
      </div>
      <div className={styles.aiPreviewResult}>
        <div className={styles.aiPreviewRow}>
          <span className={styles.aiPreviewKey}>Material</span>
          <span className={styles.aiPreviewVal}>HDPE Regrind</span>
        </div>
        <div className={styles.aiPreviewRow}>
          <span className={styles.aiPreviewKey}>Grade</span>
          <span className={styles.aiPreviewVal}>Grade A Natural</span>
        </div>
        <div className={styles.aiPreviewRow}>
          <span className={styles.aiPreviewKey}>Purity</span>
          <span className={styles.aiPreviewVal} style={{ color: 'var(--color-brand)' }}>94%</span>
        </div>
        <div className={styles.aiPreviewRow}>
          <span className={styles.aiPreviewKey}>Est. Value</span>
          <span className={styles.aiPreviewVal} style={{ color: 'var(--color-brand)' }}>₹34–38 / kg</span>
        </div>
      </div>
      <div className={styles.aiPreviewBar}>
        <div className={styles.aiPreviewBarFill} />
      </div>
      <p className={styles.aiPreviewCaption}>Confidence: 96% · Processed in 2.1s</p>
    </div>
  );
}

/* ── Buyer match mini-UI preview ────────────────────────────────── */
function MatchMiniPreview() {
  const buyers = [
    { name: 'Agro Polymers Pvt Ltd', dist: '42 km', score: 98 },
    { name: 'Supreme Industries',    dist: '87 km', score: 94 },
    { name: 'Sintex Industries',     dist: '130 km', score: 91 },
  ];
  return (
    <div className={styles.matchPreview}>
      {buyers.map((b) => (
        <div key={b.name} className={styles.matchRow}>
          <div className={styles.matchAvatar}>{b.name[0]}</div>
          <div className={styles.matchInfo}>
            <span className={styles.matchName}>{b.name}</span>
            <span className={styles.matchDist}>{b.dist} away</span>
          </div>
          <span className={styles.matchScore}>{b.score}%</span>
        </div>
      ))}
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.55 }}
        >
          <span className={styles.eyebrow}>Platform Features</span>
          <h2 className={styles.headline}>
            Everything you need to turn surplus into revenue.
          </h2>
          <p className={styles.subheadline}>
            Built for procurement teams, plant managers, and sustainability officers.
          </p>
        </motion.div>

        {/* ── Bento grid ─────────────────────────────────────────── */}
        <div className={styles.bento}>

          {/* LARGE — AI Material Recognition */}
          <motion.div
            className={`${styles.cell} ${styles.cellLarge}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <GlareHover className={styles.cardLarge}>
              <div className={styles.cardBody}>
                <div className={styles.iconWrapLg}>
                  <ScanLine size={26} strokeWidth={1.5} />
                </div>
                <h3 className={styles.cardTitleLg}>AI Material Recognition</h3>
                <p className={styles.cardDescLg}>
                  Upload a photo or a description. Our model identifies the material type, grade,
                  purity and market value — in seconds.
                </p>
              </div>
              <AIMiniPreview />
            </GlareHover>
          </motion.div>

          {/* LARGE — Smart Buyer Matching */}
          <motion.div
            className={`${styles.cell} ${styles.cellLarge}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <GlareHover className={styles.cardLarge}>
              <div className={styles.cardBody}>
                <div className={styles.iconWrapLg}>
                  <Users size={26} strokeWidth={1.5} />
                </div>
                <h3 className={styles.cardTitleLg}>Smart Buyer Matching</h3>
                <p className={styles.cardDescLg}>
                  We match your surplus to verified buyers who need exactly what you have —
                  ranked by proximity, volume fit, and deal history.
                </p>
              </div>
              <MatchMiniPreview />
            </GlareHover>
          </motion.div>

          {/* SMALL — Market Valuation */}
          <motion.div
            className={`${styles.cell} ${styles.cellSm}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.12 }}
          >
            <GlareHover className={styles.cardSm}>
              <div className={styles.iconWrapSm}><TrendingUp size={20} strokeWidth={1.5} /></div>
              <h3 className={styles.cardTitleSm}>Live Market Valuation</h3>
              <p className={styles.cardDescSm}>
                Real-time price estimates from live market feeds. Know what your material is worth
                before you list it.
              </p>
            </GlareHover>
          </motion.div>

          {/* SMALL — Verified Network */}
          <motion.div
            className={`${styles.cell} ${styles.cellSm}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.18 }}
          >
            <GlareHover className={styles.cardSm}>
              <div className={styles.iconWrapSm}><ShieldCheck size={20} strokeWidth={1.5} /></div>
              <h3 className={styles.cardTitleSm}>Verified Business Network</h3>
              <p className={styles.cardDescSm}>
                Every buyer and seller is GST-verified and vetted. No anonymous buyers.
                No price surprises.
              </p>
            </GlareHover>
          </motion.div>

          {/* SMALL — Compliance & Docs */}
          <motion.div
            className={`${styles.cell} ${styles.cellSm}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.24 }}
          >
            <GlareHover className={styles.cardSm}>
              <div className={styles.iconWrapSm}><FileCheck size={20} strokeWidth={1.5} /></div>
              <h3 className={styles.cardTitleSm}>Compliance & Documentation</h3>
              <p className={styles.cardDescSm}>
                Automated contracts, digital invoicing, and ESG impact reports.
                Everything documented automatically.
              </p>
            </GlareHover>
          </motion.div>

          {/* SMALL — Marketplace */}
          <motion.div
            className={`${styles.cell} ${styles.cellSm}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.3 }}
          >
            <GlareHover className={styles.cardSm}>
              <div className={styles.iconWrapSm}><Store size={20} strokeWidth={1.5} /></div>
              <h3 className={styles.cardTitleSm}>Materials Marketplace</h3>
              <p className={styles.cardDescSm}>
                Browse and list materials across all categories. Search by type, grade,
                quantity, and location.
              </p>
            </GlareHover>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
