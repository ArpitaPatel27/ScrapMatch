'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Factory,
  Upload,
  ScanLine,
  ShieldCheck,
  TrendingUp,
  Users,
  CheckCircle2,
  RotateCcw,
  Play,
} from 'lucide-react';
import styles from './MaterialJourney.module.css';

/* ── Stage definitions ───────────────────────────────────────── */
const STAGES = [
  {
    id: 'factory',
    icon: Factory,
    label: 'Factory',
    title: 'Material Generated',
    tooltip: 'Industrial manufacturers produce surplus as a natural by-product — steel offcuts, plastic scrap, fly ash — with no ready buyer.',
    detail: 'Steel offcuts IS2062-B · 14T · Surat, Gujarat',
    color: 'hsl(215, 40%, 38%)',
    bg: 'hsl(215, 40%, 95%)',
  },
  {
    id: 'upload',
    icon: Upload,
    label: 'Upload',
    title: 'Material Listed',
    tooltip: 'Sellers photograph or describe their surplus. ScrapMatch accepts photos, text descriptions, or CSV batch uploads for high-volume operations.',
    detail: 'Photo + description submitted · 90 seconds',
    color: 'hsl(28, 44%, 46%)',
    bg: 'hsl(28, 55%, 95%)',
  },
  {
    id: 'ai',
    icon: ScanLine,
    label: 'AI Analysis',
    title: 'AI Recognition',
    tooltip: 'Our model — trained on 400+ industrial categories — identifies material type, grade, purity, and contaminants. No expert required.',
    detail: 'Grade A · Purity 98% · Confidence 96% · 2.1s',
    color: 'hsl(155, 48%, 24%)',
    bg: 'hsl(155, 48%, 93%)',
  },
  {
    id: 'quality',
    icon: ShieldCheck,
    label: 'Quality Check',
    title: 'Quality Verified',
    tooltip: 'Grade and compliance are cross-checked against IS standards. GST, PCB, and quality certificates are attached automatically.',
    detail: 'IS 2062 certified · GST verified · PCB compliant',
    color: 'hsl(142, 50%, 30%)',
    bg: 'hsl(142, 50%, 93%)',
  },
  {
    id: 'pricing',
    icon: TrendingUp,
    label: 'Market Pricing',
    title: 'Price Set',
    tooltip: 'ScrapMatch benchmarks against live MCX prices, recent comparable transactions, and regional demand curves — giving you a fair, defensible price.',
    detail: '₹28–32/kg · MCX-aligned · Updated daily',
    color: 'hsl(38, 82%, 40%)',
    bg: 'hsl(38, 82%, 93%)',
  },
  {
    id: 'matching',
    icon: Users,
    label: 'Buyer Match',
    title: 'Buyers Matched',
    tooltip: 'Verified buyers are ranked by proximity, volume fit, deal history, and price alignment — then notified instantly with your listing.',
    detail: '5 verified buyers · Nearest 18 km away',
    color: 'hsl(255, 38%, 45%)',
    bg: 'hsl(255, 38%, 95%)',
  },
  {
    id: 'deal',
    icon: CheckCircle2,
    label: 'Deal Closed',
    title: 'Deal Complete',
    tooltip: 'Buyer and seller agree on terms. Digital contracts, GST invoices, and ESG diversion reports are generated automatically — no paperwork.',
    detail: 'Bharat Steel Works · ₹4.3L · Total time: 43s',
    color: 'hsl(155, 48%, 24%)',
    bg: 'hsl(155, 48%, 93%)',
  },
] as const;

type StageId = (typeof STAGES)[number]['id'];

interface Props {
  /** Auto-play the walkthrough on mount */
  autoPlay?: boolean;
}

const PLAY_DELAY_MS = 750; // ms between each stage advancing

export default function MaterialJourney({ autoPlay = false }: Props) {
  const [activeStage, setActiveStage] = useState<StageId | null>(null);
  const [completedSet, setCompletedSet] = useState<Set<StageId>>(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indexRef = useRef(0);

  /* ── helpers ─────────────────────────────────────────────── */
  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  }, []);

  const markComplete = useCallback((id: StageId) => {
    setCompletedSet((prev) => { const n = new Set(prev); n.add(id); return n; });
  }, []);

  /* ── auto-advance ────────────────────────────────────────── */
  const tick = useCallback(() => {
    const i = indexRef.current;
    if (i >= STAGES.length) {
      // All done — mark last stage completed
      markComplete(STAGES[STAGES.length - 1].id);
      setIsPlaying(false);
      return;
    }
    const stage = STAGES[i];
    // Mark previous as complete
    if (i > 0) markComplete(STAGES[i - 1].id);
    setActiveStage(stage.id);
    indexRef.current = i + 1;
    timerRef.current = setTimeout(tick, PLAY_DELAY_MS);
  }, [markComplete]);

  const startPlay = useCallback(() => {
    clearTimer();
    indexRef.current = 0;
    setCompletedSet(new Set());
    setActiveStage(null);
    setIsPlaying(true);
    timerRef.current = setTimeout(tick, 200);
  }, [clearTimer, tick]);

  const handleReset = useCallback(() => {
    clearTimer();
    setIsPlaying(false);
    setActiveStage(null);
    setCompletedSet(new Set());
    indexRef.current = 0;
  }, [clearTimer]);

  // Auto-play on mount
  useEffect(() => {
    if (autoPlay) {
      const t = setTimeout(startPlay, 800);
      return () => clearTimeout(t);
    }
  }, [autoPlay, startPlay]);

  useEffect(() => () => clearTimer(), [clearTimer]);

  /* ── manual stage click ──────────────────────────────────── */
  const handleStageClick = useCallback((id: StageId) => {
    clearTimer();
    setIsPlaying(false);
    setActiveStage(id);
  }, [clearTimer]);

  /* ── derived ─────────────────────────────────────────────── */
  const activeData = STAGES.find((s) => s.id === activeStage) ?? null;
  const allDone = completedSet.size === STAGES.length;

  return (
    <div className={styles.root} role="region" aria-label="Material Journey interactive diagram">

      {/* ── TOP HEADER ───────────────────────────────────────── */}
      <div className={styles.topBar}>
        <div>
          <p className={styles.eyebrow}>Interactive Walkthrough</p>
          <h2 className={styles.heading}>From surplus to sale — in 7 steps</h2>
          <p className={styles.subheading}>
            Click any stage to explore it, or watch the full flow automatically.
          </p>
        </div>
        <div className={styles.controls}>
          {!isPlaying && (
            <motion.button
              className={styles.playBtn}
              onClick={startPlay}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              aria-label={allDone ? 'Replay animation' : 'Play animation'}
            >
              <Play size={14} strokeWidth={2.5} />
              {allDone ? 'Replay' : 'Watch Flow'}
            </motion.button>
          )}
          {isPlaying && (
            <motion.button
              className={`${styles.playBtn} ${styles.playBtnActive}`}
              onClick={handleReset}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              aria-label="Stop animation"
            >
              <RotateCcw size={14} strokeWidth={2.5} />
              Stop
            </motion.button>
          )}
          {!isPlaying && (activeStage || allDone) && (
            <motion.button
              className={styles.resetBtn}
              onClick={handleReset}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              aria-label="Reset"
            >
              <RotateCcw size={14} />
            </motion.button>
          )}
        </div>
      </div>

      {/* ── JOURNEY TRACK ────────────────────────────────────── */}
      <div className={styles.track} role="list">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isActive = activeStage === stage.id;
          const isDone = completedSet.has(stage.id);
          const isLast = idx === STAGES.length - 1;

          return (
            <div key={stage.id} className={styles.stageWrap} role="listitem">
              {/* ── NODE ── */}
              <div className={styles.nodeCol}>
                <motion.button
                  className={`${styles.node} ${isActive ? styles.nodeActive : ''} ${isDone ? styles.nodeDone : ''}`}
                  style={{ '--c': stage.color, '--bg': stage.bg } as React.CSSProperties}
                  onClick={() => handleStageClick(stage.id)}
                  onMouseEnter={() => { if (!isPlaying) setActiveStage(stage.id); }}
                  whileHover={isPlaying ? {} : { scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.93 }}
                  aria-label={`Stage ${idx + 1}: ${stage.title}`}
                  aria-pressed={isActive}
                >
                  {/* pulse ring when active but not done */}
                  {isActive && !isDone && (
                    <motion.span
                      className={styles.pulse}
                      initial={{ scale: 1, opacity: 0.7 }}
                      animate={{ scale: 1.7, opacity: 0 }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: 'easeOut' }}
                      aria-hidden="true"
                    />
                  )}

                  <AnimatePresence mode="wait">
                    {isDone ? (
                      <motion.span
                        key="done"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                        className={styles.doneIcon}
                        aria-hidden="true"
                      >
                        <CheckCircle2 size={20} strokeWidth={2.2} />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="icon"
                        initial={{ scale: 0.7, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                        aria-hidden="true"
                      >
                        <Icon size={20} strokeWidth={1.7} />
                      </motion.span>
                    )}
                  </AnimatePresence>

                  <span className={styles.stepNum}>{String(idx + 1).padStart(2, '0')}</span>
                </motion.button>

                <motion.span
                  className={`${styles.label} ${isActive || isDone ? styles.labelOn : ''}`}
                  animate={{ opacity: isActive || isDone ? 1 : 0.48 }}
                  transition={{ duration: 0.2 }}
                >
                  {stage.label}
                </motion.span>
              </div>

              {/* ── CONNECTOR ── */}
              {!isLast && (
                <div className={styles.connector} aria-hidden="true">
                  <div className={styles.connectorBase} />
                  <motion.div
                    className={styles.connectorFill}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isDone ? 1 : 0 }}
                    transition={{ duration: 0.3, ease: 'easeOut', delay: 0.05 }}
                  />
                  {/* Arrow chevron */}
                  <span className={styles.connectorArrow}>›</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── DETAIL PANEL ─────────────────────────────────────── */}
      <div className={styles.panelWrap} aria-live="polite" aria-atomic="true">
        <AnimatePresence mode="wait">
          {activeData ? (
            <motion.div
              key={activeData.id}
              className={styles.panel}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              {/* Accent bar */}
              <div
                className={styles.panelAccent}
                style={{ background: activeData.color }}
                aria-hidden="true"
              />

              <div className={styles.panelBody}>
                {/* Icon + title */}
                <div className={styles.panelHeader}>
                  <div
                    className={styles.panelIcon}
                    style={{ background: activeData.bg, color: activeData.color }}
                    aria-hidden="true"
                  >
                    <activeData.icon size={22} strokeWidth={1.7} />
                  </div>
                  <div>
                    <span className={styles.panelStep}>
                      Step {String(STAGES.findIndex((s) => s.id === activeData.id) + 1).padStart(2, '0')}
                    </span>
                    <h3 className={styles.panelTitle}>{activeData.title}</h3>
                  </div>
                </div>

                {/* Tooltip text */}
                <p className={styles.panelTooltip}>{activeData.tooltip}</p>

                {/* Example detail */}
                <div className={styles.panelDetail}>
                  <span className={styles.panelDetailArrow} aria-hidden="true">→</span>
                  <span>{activeData.detail}</span>
                </div>
              </div>

              {/* Dot progress */}
              <div className={styles.dots} aria-hidden="true">
                {STAGES.map((s) => (
                  <span
                    key={s.id}
                    className={`${styles.dot} ${s.id === activeData.id ? styles.dotActive : ''} ${completedSet.has(s.id) ? styles.dotDone : ''}`}
                  />
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              className={styles.panelEmpty}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <span>
                Hover or click any stage above — or press{' '}
                <strong>Watch Flow</strong> to see the full journey.
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── SUCCESS BANNER ───────────────────────────────────── */}
      <AnimatePresence>
        {allDone && (
          <motion.div
            className={styles.successBanner}
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.32 }}
            role="status"
          >
            <CheckCircle2 size={17} className={styles.successIcon} aria-hidden="true" />
            <span>
              <strong>Deal closed in 43 seconds.</strong>
              {' '}₹4.3L · Steel Offcuts IS2062 · Bharat Steel Works, Surat
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
