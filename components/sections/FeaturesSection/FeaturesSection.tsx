'use client';

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ScanLine, TrendingUp, Users, ShieldCheck, FileCheck, Store,
  Factory, Upload, Tag, Handshake, RotateCcw, Play,
} from 'lucide-react';
import GlareHover from '@/components/ui/GlareHover/GlareHover';
import styles from './FeaturesSection.module.css';

/* ════════════════════════════════════════════════════════════════
   AI Recognition mini-preview
════════════════════════════════════════════════════════════════ */
function AIMiniPreview() {
  return (
    <div className={styles.aiPreview}>
      <div className={styles.aiPreviewHeader}>
        <span className={styles.aiPreviewDot} />
        <span className={styles.aiPreviewLabel}>AI Analysis</span>
        <span className={styles.aiPreviewStatus}>Running…</span>
      </div>
      <div className={styles.aiPreviewResult}>
        {[
          { k: 'Material', v: 'HDPE Regrind' },
          { k: 'Grade',    v: 'Grade A Natural' },
          { k: 'Purity',   v: '94%',         brand: true },
          { k: 'Est. Value', v: '₹34–38 / kg', brand: true },
        ].map(({ k, v, brand }) => (
          <div key={k} className={styles.aiPreviewRow}>
            <span className={styles.aiPreviewKey}>{k}</span>
            <span
              className={styles.aiPreviewVal}
              style={brand ? { color: 'var(--color-brand)' } : undefined}
            >
              {v}
            </span>
          </div>
        ))}
      </div>
      <div className={styles.aiPreviewBar}>
        <div className={styles.aiPreviewBarFill} />
      </div>
      <p className={styles.aiPreviewCaption}>Confidence: 96% · Processed in 2.1s</p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Buyer match mini-preview
════════════════════════════════════════════════════════════════ */
function MatchMiniPreview() {
  const buyers = [
    { name: 'Agro Polymers Pvt Ltd', dist: '42 km',  score: 98 },
    { name: 'Supreme Industries',    dist: '87 km',  score: 94 },
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

/* ════════════════════════════════════════════════════════════════
   LIVE DEAL FLOW  — interactive pipeline animation
════════════════════════════════════════════════════════════════ */

const PIPELINE = [
  {
    id: 'list',
    icon: Upload,
    label: 'Listed',
    color: 'hsl(215,40%,38%)',
    bg: 'hsl(215,40%,95%)',
    title: 'Seller lists material',
    body: 'Plant manager uploads photo + quantity. Takes under 2 minutes.',
    meta: 'HDPE Regrind · 8T · Pune',
  },
  {
    id: 'ai',
    icon: ScanLine,
    label: 'AI Classified',
    color: 'hsl(155,48%,24%)',
    bg: 'hsl(155,48%,93%)',
    title: 'AI classifies & prices',
    body: 'Model identifies grade, purity score, and live market price in 2.1 seconds.',
    meta: 'Grade A · 94% purity · ₹34–38/kg',
  },
  {
    id: 'match',
    icon: Users,
    label: 'Matched',
    color: 'hsl(255,38%,45%)',
    bg: 'hsl(255,38%,95%)',
    title: 'Buyers matched instantly',
    body: '3 verified buyers ranked by proximity, volume fit and deal history.',
    meta: '3 buyers · Nearest 42 km',
  },
  {
    id: 'price',
    icon: Tag,
    label: 'Price Agreed',
    color: 'hsl(38,82%,40%)',
    bg: 'hsl(38,82%,93%)',
    title: 'Price negotiated',
    body: 'Buyer and seller agree on ₹36/kg via in-platform chat. No phone calls.',
    meta: '₹36/kg · ₹2.88L total',
  },
  {
    id: 'deal',
    icon: Handshake,
    label: 'Deal Closed',
    color: 'hsl(142,50%,30%)',
    bg: 'hsl(142,50%,93%)',
    title: 'Deal closed · Docs auto-generated',
    body: 'GST invoice, digital contract, and ESG diversion report generated automatically.',
    meta: 'Total time: 4h 12m',
  },
] as const;

type PipelineId = (typeof PIPELINE)[number]['id'];

function LiveDealFlow() {
  const [active, setActive]     = useState<PipelineId | null>(null);
  const [done, setDone]         = useState<Set<PipelineId>>(new Set());
  const [playing, setPlaying]   = useState(false);
  const timerRef                = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idxRef                  = useRef(0);

  const stop = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  }, []);

  const tick = useCallback(() => {
    const i = idxRef.current;
    if (i >= PIPELINE.length) {
      setDone((p) => { const n = new Set(p); n.add(PIPELINE[PIPELINE.length - 1].id); return n; });
      setPlaying(false);
      return;
    }
    if (i > 0) setDone((p) => { const n = new Set(p); n.add(PIPELINE[i - 1].id); return n; });
    setActive(PIPELINE[i].id);
    idxRef.current = i + 1;
    timerRef.current = setTimeout(tick, 700);
  }, []);

  const play = useCallback(() => {
    stop();
    idxRef.current = 0;
    setDone(new Set());
    setActive(null);
    setPlaying(true);
    timerRef.current = setTimeout(tick, 200);
  }, [stop, tick]);

  const reset = useCallback(() => {
    stop();
    setPlaying(false);
    setActive(null);
    setDone(new Set());
    idxRef.current = 0;
  }, [stop]);

  useEffect(() => () => stop(), [stop]);

  const activeData = PIPELINE.find((s) => s.id === active) ?? null;
  const allDone    = done.size === PIPELINE.length;

  return (
    <div className={styles.pipeline}>
      {/* ── header row ── */}
      <div className={styles.pipelineTop}>
        <div className={styles.pipelineMeta}>
          <span className={styles.pipelineEyebrow}>Live deal simulation</span>
          <span className={styles.pipelineTitle}>Watch a deal close in real time</span>
        </div>
        <div className={styles.pipelineControls}>
          {!playing && (
            <motion.button
              className={styles.pipelinePlayBtn}
              onClick={play}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              <Play size={13} strokeWidth={2.5} />
              {allDone ? 'Replay' : 'Run simulation'}
            </motion.button>
          )}
          {playing && (
            <button className={`${styles.pipelinePlayBtn} ${styles.pipelinePlayBtnStop}`} onClick={reset}>
              <RotateCcw size={13} />
              Stop
            </button>
          )}
          {!playing && (active || allDone) && (
            <button className={styles.pipelineResetBtn} onClick={reset} aria-label="Reset">
              <RotateCcw size={13} />
            </button>
          )}
        </div>
      </div>

      {/* ── pipeline nodes ── */}
      <div className={styles.pipelineTrack}>
        {PIPELINE.map((stage, idx) => {
          const Icon    = stage.icon;
          const isActive = active === stage.id;
          const isDone   = done.has(stage.id);
          const isLast   = idx === PIPELINE.length - 1;

          return (
            <div key={stage.id} className={styles.pipelineStageWrap}>
              {/* connector */}
              {!isLast && (
                <div className={styles.pipelineConn}>
                  <div className={styles.pipelineConnBase} />
                  <motion.div
                    className={styles.pipelineConnFill}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isDone ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </div>
              )}

              {/* node */}
              <div className={styles.pipelineNodeCol}>
                <motion.button
                  className={`${styles.pipelineNode}
                    ${isActive ? styles.pipelineNodeActive : ''}
                    ${isDone   ? styles.pipelineNodeDone   : ''}`}
                  style={{ '--nc': stage.color, '--nb': stage.bg } as React.CSSProperties}
                  onClick={() => { stop(); setPlaying(false); setActive(stage.id); }}
                  onMouseEnter={() => { if (!playing) setActive(stage.id); }}
                  whileHover={playing ? {} : { scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.92 }}
                  aria-label={stage.title}
                  aria-pressed={isActive}
                >
                  {isActive && !isDone && (
                    <motion.span
                      className={styles.pipelinePulse}
                      initial={{ scale: 1, opacity: 0.6 }}
                      animate={{ scale: 1.8, opacity: 0 }}
                      transition={{ duration: 0.85, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                  <Icon size={18} strokeWidth={1.8} />
                </motion.button>

                <motion.span
                  className={styles.pipelineLabel}
                  animate={{ opacity: isActive || isDone ? 1 : 0.45 }}
                >
                  {stage.label}
                </motion.span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── detail panel ── */}
      <div className={styles.pipelineDetail}>
        <AnimatePresence mode="wait">
          {activeData ? (
            <motion.div
              key={activeData.id}
              className={styles.pipelineCard}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <div
                className={styles.pipelineCardAccent}
                style={{ background: activeData.color }}
              />
              <div className={styles.pipelineCardInner}>
                <div
                  className={styles.pipelineCardIcon}
                  style={{ background: activeData.bg, color: activeData.color }}
                >
                  <activeData.icon size={20} strokeWidth={1.7} />
                </div>
                <div className={styles.pipelineCardText}>
                  <strong className={styles.pipelineCardTitle}>{activeData.title}</strong>
                  <p className={styles.pipelineCardBody}>{activeData.body}</p>
                  <span className={styles.pipelineCardMeta}>→ {activeData.meta}</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="hint"
              className={styles.pipelineHint}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Hover a stage or press <strong>Run simulation</strong> to see a real deal flow.
            </motion.div>
          )}
        </AnimatePresence>

        {/* success */}
        <AnimatePresence>
          {allDone && (
            <motion.div
              className={styles.pipelineSuccess}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              ✓ Deal closed · HDPE Regrind · 8T · ₹2.88L · Total time: 4h 12m
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   Main section
════════════════════════════════════════════════════════════════ */
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

        {/* ── Bento grid ── */}
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
                <div className={styles.iconWrapLg}><ScanLine size={26} strokeWidth={1.5} /></div>
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
                <div className={styles.iconWrapLg}><Users size={26} strokeWidth={1.5} /></div>
                <h3 className={styles.cardTitleLg}>Smart Buyer Matching</h3>
                <p className={styles.cardDescLg}>
                  We match your surplus to verified buyers who need exactly what you have —
                  ranked by proximity, volume fit, and deal history.
                </p>
              </div>
              <MatchMiniPreview />
            </GlareHover>
          </motion.div>

          {/* FULL WIDTH — Live Deal Flow animation */}
          <motion.div
            className={`${styles.cell} ${styles.cellFull}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <LiveDealFlow />
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
