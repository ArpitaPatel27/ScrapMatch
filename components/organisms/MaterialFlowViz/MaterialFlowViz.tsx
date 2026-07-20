'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, ScanLine, Tag, TrendingUp, Users, CheckCircle2,
} from 'lucide-react';
import styles from './MaterialFlowViz.module.css';

/* ── Material examples — each plays once then stays completed ─── */
const MATERIALS = [
  {
    txId:     'SM-2847',
    name:     'HDPE Regrind — Grade A',
    category: 'Plastics',
    catColor: 'copper',
    stages: [
      { label: 'Material Uploaded',      detail: '8 Tonnes · Pune, Maharashtra',        color: 'copper' },
      { label: 'AI Analysis Running',    detail: 'Scanning composition & grade…',       color: 'green'  },
      { label: 'Material Classified',    detail: 'Grade A Natural · Purity 94%',        color: 'green'  },
      { label: 'Market Price Estimated', detail: '₹34–38 per kg · +4.2% this week',    color: 'green'  },
      { label: 'Buyers Matched',         detail: '3 verified buyers · Nearest 42 km',  color: 'green'  },
      { label: 'Deal Confirmed',         detail: 'Agro Polymers Pvt Ltd · ₹2,72,000', color: 'copper' },
    ],
    revenue: '₹2,72,000',
    time:    '57s',
  },
  {
    txId:     'SM-3041',
    name:     'Steel Offcuts — IS 2062 B',
    category: 'Metals',
    catColor: 'blue',
    stages: [
      { label: 'Material Uploaded',      detail: '14 Tonnes · Surat, Gujarat',          color: 'copper' },
      { label: 'AI Analysis Running',    detail: 'Identifying grade & alloy…',          color: 'green'  },
      { label: 'Material Classified',    detail: 'IS 2062 Grade B · Purity 98%',        color: 'green'  },
      { label: 'Market Price Estimated', detail: '₹28–32 per kg · Market peak',         color: 'green'  },
      { label: 'Buyers Matched',         detail: '5 verified buyers · Nearest 18 km',  color: 'green'  },
      { label: 'Deal Confirmed',         detail: 'Bharat Steel Works · ₹8,96,000',     color: 'copper' },
    ],
    revenue: '₹8,96,000',
    time:    '43s',
  },
  {
    txId:     'SM-3198',
    name:     'Copper Scrap — Cat 2',
    category: 'Metals',
    catColor: 'copper',
    stages: [
      { label: 'Material Uploaded',      detail: '1.2 Tonnes · Jaipur, Rajasthan',     color: 'copper' },
      { label: 'AI Analysis Running',    detail: 'Measuring purity & wire gauge…',     color: 'green'  },
      { label: 'Material Classified',    detail: 'Cat 2 Copper · Purity 96%',          color: 'green'  },
      { label: 'Market Price Estimated', detail: '₹420–450 per kg · LME aligned',      color: 'green'  },
      { label: 'Buyers Matched',         detail: '2 verified buyers · Nearest 92 km',  color: 'green'  },
      { label: 'Deal Confirmed',         detail: 'Rajasthan Cables Ltd · ₹13,50,000', color: 'copper' },
    ],
    revenue: '₹13,50,000',
    time:    '61s',
  },
  {
    txId:     'SM-3315',
    name:     'OCC Paper Waste',
    category: 'Paper',
    catColor: 'green',
    stages: [
      { label: 'Material Uploaded',      detail: '22 Tonnes · Hyderabad, TS',          color: 'copper' },
      { label: 'AI Analysis Running',    detail: 'Checking fibre quality & grade…',    color: 'green'  },
      { label: 'Material Classified',    detail: 'OCC Grade · Moisture 9%',            color: 'green'  },
      { label: 'Market Price Estimated', detail: '₹8–11 per kg · Stable demand',       color: 'green'  },
      { label: 'Buyers Matched',         detail: '4 verified buyers · Nearest 35 km',  color: 'green'  },
      { label: 'Deal Confirmed',         detail: 'Pune Paper Mills · ₹1,98,000',       color: 'copper' },
    ],
    revenue: '₹1,98,000',
    time:    '38s',
  },
  {
    txId:     'SM-3442',
    name:     'Fly Ash — Class F',
    category: 'Construction',
    catColor: 'green',
    stages: [
      { label: 'Material Uploaded',      detail: '90 Tonnes · Nagpur, Maharashtra',    color: 'copper' },
      { label: 'AI Analysis Running',    detail: 'Testing SiO₂ / Al₂O₃ ratio…',       color: 'green'  },
      { label: 'Material Classified',    detail: 'Class F IS 3812 · LOI 2.8%',         color: 'green'  },
      { label: 'Market Price Estimated', detail: '₹1.2–1.8 per kg · Bulk rate',        color: 'green'  },
      { label: 'Buyers Matched',         detail: '6 verified buyers · Nearest 27 km',  color: 'green'  },
      { label: 'Deal Confirmed',         detail: 'GreenBuild Materials · ₹1,44,000',  color: 'copper' },
    ],
    revenue: '₹1,44,000',
    time:    '49s',
  },
];

const STAGE_ICONS = [Upload, ScanLine, Tag, TrendingUp, Users, CheckCircle2];

/* ── Timing constants ──────────────────────────────────────────── */
const TICK_MS   = 820;   // ms between each stage reveal
const CYCLE_MS  = 17000; // ms before switching to next material
const FADE_MS   = 350;   // crossfade duration

export default function MaterialFlowViz() {
  const [matIdx,    setMatIdx]    = useState(0);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [completed, setCompleted] = useState(false);
  const [fading,    setFading]    = useState(false);

  const cancelRef = useRef(false);
  const timerRef  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const sleep = (ms: number) =>
    new Promise<void>((res) => { timerRef.current = setTimeout(res, ms); });

  /* ── Animate one full workflow ─────────────────────────────── */
  const runWorkflow = useCallback(async (idx: number) => {
    cancelRef.current = false;
    setCompleted(false);
    setActiveIdx(-1);

    const mat = MATERIALS[idx];
    for (let i = 0; i < mat.stages.length; i++) {
      await sleep(i === 0 ? 500 : TICK_MS);
      if (cancelRef.current) return;
      setActiveIdx(i);
    }
    if (!cancelRef.current) setCompleted(true);
  }, []);

  /* ── Cycle to next material with crossfade ─────────────────── */
  const cycleToNext = useCallback(async () => {
    cancelRef.current = true;
    clearTimeout(timerRef.current);
    setFading(true);
    await sleep(FADE_MS);
    setFading(false);
    setMatIdx((prev) => {
      const next = (prev + 1) % MATERIALS.length;
      return next;
    });
  }, []);

  /* ── On matIdx change: run workflow then schedule next cycle ── */
  useEffect(() => {
    cancelRef.current = false;

    async function go() {
      await runWorkflow(matIdx);
      if (cancelRef.current) return;
      // Wait before cycling to next material
      await sleep(CYCLE_MS);
      if (!cancelRef.current) cycleToNext();
    }

    go();

    return () => {
      cancelRef.current = true;
      clearTimeout(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matIdx]);

  /* ── Replay on hover/click ─────────────────────────────────── */
  const handleReplay = useCallback(() => {
    cancelRef.current = true;
    clearTimeout(timerRef.current);
    setCompleted(false);
    setActiveIdx(-1);
    // Small delay then re-run
    timerRef.current = setTimeout(() => runWorkflow(matIdx), 80);
  }, [matIdx, runWorkflow]);

  const mat = MATERIALS[matIdx];

  return (
    <div
      className={`${styles.panel} ${fading ? styles.panelFade : ''}`}
      onClick={handleReplay}
      onMouseEnter={completed ? handleReplay : undefined}
      title="Click to replay"
      role="button"
      tabIndex={0}
      aria-label="ScrapMatch product demo — click to replay"
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleReplay(); }}
    >
      {/* ── Header bar ─────────────────────────────────────── */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={`${styles.headerDot} ${completed ? styles.headerDotDone : ''}`} />
          <span className={styles.headerTitle}>Live Transaction</span>
        </div>
        <span className={styles.headerId}>{mat.txId}</span>
      </div>

      {/* ── Material identity row (crossfades with material) ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={matIdx}
          className={styles.material}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.3 }}
        >
          <span className={`${styles.materialTag} ${styles[`tag--${mat.catColor}`]}`}>
            {mat.category}
          </span>
          <span className={styles.materialName}>{mat.name}</span>
        </motion.div>
      </AnimatePresence>

      {/* ── Stage timeline ──────────────────────────────────── */}
      <div className={styles.stages}>
        {mat.stages.map((stage, i) => {
          const Icon       = STAGE_ICONS[i];
          const isActive   = activeIdx === i;
          const isDone     = activeIdx > i;
          const isPending  = activeIdx < i;

          return (
            <div key={i} className={styles.stageRow}>
              {/* Connector */}
              {i > 0 && (
                <div className={styles.lineWrapper}>
                  <div className={styles.lineTrack} />
                  <motion.div
                    className={`${styles.lineFill} ${styles[`lineFill--${stage.color}`]}`}
                    initial={false}
                    animate={{ scaleY: isDone || isActive ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                </div>
              )}

              {/* Node */}
              <motion.div
                className={`${styles.stage} ${isActive ? styles.stageActive : ''} ${isDone ? styles.stageComplete : ''} ${isPending ? styles.stagePending : ''}`}
                initial={false}
                animate={{ opacity: isPending ? 0.4 : 1 }}
                transition={{ duration: 0.25 }}
              >
                <div className={`${styles.iconWrap} ${
                  isActive  ? styles[`icon--active-${stage.color}`] :
                  isDone    ? styles[`icon--done-${stage.color}`]   :
                              styles['icon--pending']
                }`}>
                  {isActive ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                    >
                      <Icon size={12} strokeWidth={2} />
                    </motion.div>
                  ) : (
                    <Icon size={12} strokeWidth={2} />
                  )}
                </div>

                <div className={styles.stageText}>
                  <span className={styles.stageLabel}>{stage.label}</span>
                  {(isActive || isDone) && (
                    <motion.span
                      className={styles.stageDetail}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.2 }}
                    >
                      {stage.detail}
                    </motion.span>
                  )}
                </div>

                <span className={`${styles.badge} ${
                  isActive  ? styles.badgeActive :
                  isDone    ? styles.badgeDone   :
                              styles.badgePending
                }`}>
                  {isActive ? 'Running' : isDone ? 'Done' : '—'}
                </span>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ── Summary — appears once complete ─────────────────── */}
      <AnimatePresence>
        {completed && !fading && (
          <motion.div
            className={styles.summary}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
          >
            <div className={styles.summaryItem}>
              <span className={styles.summaryVal}>{mat.revenue}</span>
              <span className={styles.summaryLbl}>Revenue</span>
            </div>
            <div className={styles.summaryDivider} />
            <div className={styles.summaryItem}>
              <span className={styles.summaryVal}>{mat.time}</span>
              <span className={styles.summaryLbl}>Total Time</span>
            </div>
            <div className={styles.summaryDivider} />
            <div className={styles.summaryItem}>
              <span className={styles.summaryVal}>Matched</span>
              <span className={styles.summaryLbl}>Status</span>
            </div>
            {/* Replay hint */}
            <span className={styles.replayHint}>↺ hover to replay</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Material indicator dots ──────────────────────────── */}
      <div className={styles.dots} aria-hidden="true">
        {MATERIALS.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === matIdx ? styles.dotActive : ''}`}
          />
        ))}
      </div>
    </div>
  );
}
