'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, TrendingUp, TrendingDown, MapPin, Users, ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import styles from './AIHeroDemoWidget.module.css';

/* ── Material classification logic ───────────────────────────── */
interface MockResult {
  material: string;
  grade: string;
  purity: string;
  price: string;
  trend: string;
  trendUp: boolean;
  buyers: number;
  region: string;
  confidence: number;
  category: string;
  co2Saved: string;
}

function classifyInput(input: string): MockResult {
  const s = input.toLowerCase();
  if (s.includes('hdpe') || s.includes('polyethylene'))
    return { material: 'HDPE Regrind', grade: 'Natural — Grade A', purity: '92–96%', price: '₹32–38 / kg', trend: '+4.2%', trendUp: true, buyers: 3, region: 'Maharashtra', confidence: 94, category: 'Plastics', co2Saved: '1.8T' };
  if (s.includes('pet') || s.includes('polyester') || s.includes('bottle'))
    return { material: 'PET Flake', grade: 'Clear — Grade A', purity: '96–99%', price: '₹58–65 / kg', trend: '+2.1%', trendUp: true, buyers: 5, region: 'Gujarat', confidence: 91, category: 'Plastics', co2Saved: '2.2T' };
  if (s.includes('steel') || s.includes('iron') || s.includes('ferrous'))
    return { material: 'Ferrous Scrap (HMS)', grade: 'Heavy Melting Steel 1', purity: '98%+', price: '₹28–33 / kg', trend: '-1.5%', trendUp: false, buyers: 7, region: 'Punjab', confidence: 97, category: 'Metals', co2Saved: '4.1T' };
  if (s.includes('copper') || s.includes(' cu '))
    return { material: 'Copper Wire Scrap', grade: 'Bare Bright — Grade 1', purity: '99%+', price: '₹480–510 / kg', trend: '+0.8%', trendUp: true, buyers: 4, region: 'Delhi NCR', confidence: 89, category: 'Metals', co2Saved: '3.6T' };
  if (s.includes('alumin') || s.includes(' al '))
    return { material: 'Aluminium Extrusion', grade: '6063 Alloy — Clean', purity: '97%+', price: '₹115–130 / kg', trend: '+3.1%', trendUp: true, buyers: 6, region: 'Ahmedabad', confidence: 88, category: 'Metals', co2Saved: '2.9T' };
  if (s.includes('pp') || s.includes('polypropylene'))
    return { material: 'PP Regrind', grade: 'Natural Mixed — Grade B', purity: '88–93%', price: '₹22–28 / kg', trend: '+1.4%', trendUp: true, buyers: 4, region: 'Tamil Nadu', confidence: 85, category: 'Plastics', co2Saved: '1.4T' };
  if (s.includes('rubber') || s.includes('tyre') || s.includes('tire'))
    return { material: 'Rubber Crumb (30 Mesh)', grade: 'Tyre-Derived — Clean', purity: '95%+', price: '₹18–24 / kg', trend: '+0.5%', trendUp: true, buyers: 2, region: 'Karnataka', confidence: 82, category: 'Rubber', co2Saved: '1.1T' };
  if (s.includes('paper') || s.includes('cardboard') || s.includes('kraft'))
    return { material: 'OCC Kraft Cardboard', grade: 'Grade 1 — Dry', purity: '95%+', price: '₹8–12 / kg', trend: '-0.8%', trendUp: false, buyers: 8, region: 'Multiple', confidence: 96, category: 'Paper & Pulp', co2Saved: '0.9T' };
  if (s.includes('fly ash') || s.includes('ash'))
    return { material: 'Fly Ash (Class C)', grade: 'ASTM C618 — Certified', purity: '85%+', price: '₹1.5–3 / kg', trend: '+6.0%', trendUp: true, buyers: 11, region: 'Chhattisgarh', confidence: 93, category: 'Industrial By-Products', co2Saved: '5.2T' };
  if (s.includes('glass') || s.includes('cullet'))
    return { material: 'Glass Cullet (Clear)', grade: 'Container Glass — Sorted', purity: '99%+', price: '₹4–7 / kg', trend: '+2.0%', trendUp: true, buyers: 3, region: 'Rajasthan', confidence: 90, category: 'Glass', co2Saved: '0.7T' };
  return { material: 'Industrial Material', grade: 'Classification Pending', purity: 'Lab test recommended', price: 'Price on inquiry', trend: '—', trendUp: true, buyers: 2, region: 'Pan India', confidence: 62, category: 'Other', co2Saved: '—' };
}

/* ── VEDA processing steps (appear sequentially) ─────────────── */
const STEPS = [
  'Identifying material family…',
  'Estimating grade and purity…',
  'Querying price benchmarks…',
  'Finding buyer matches…',
  'Calculating CO₂ impact…',
];

const PLACEHOLDERS = [
  'HDPE scrap, 10 tonnes, Pune',
  'Copper wire scrap, Mumbai',
  'PET bottle flake, Gujarat',
  'Fly ash, 500T, Chhattisgarh',
  'Steel scrap, Punjab',
];

/* ── Result stat item — progressive reveal ───────────────────── */
function ResultStat({
  label, value, delay, mono = false,
}: { label: string; value: React.ReactNode; delay: number; mono?: boolean }) {
  return (
    <motion.div
      className={styles.stat}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: 'easeOut' }}
    >
      <span className={styles.statLabel}>{label}</span>
      <span className={`${styles.statValue} ${mono ? styles.statMono : ''}`}>{value}</span>
    </motion.div>
  );
}

export default function AIHeroDemoWidget() {
  const [input, setInput]               = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [stepIdx, setStepIdx]           = useState(0);
  const [result, setResult]             = useState<MockResult | null>(null);
  const [phIdx, setPhIdx]               = useState(0);
  const inputRef                        = useRef<HTMLInputElement>(null);

  /* Rotate placeholder */
  useEffect(() => {
    const id = setInterval(() => setPhIdx((i) => (i + 1) % PLACEHOLDERS.length), 3200);
    return () => clearInterval(id);
  }, []);

  const analyze = async () => {
    if (!input.trim() || isProcessing) return;
    setResult(null);
    setIsProcessing(true);
    setStepIdx(0);

    for (let i = 0; i < STEPS.length; i++) {
      await new Promise<void>((r) => setTimeout(() => { setStepIdx(i); r(); }, i === 0 ? 0 : 260));
    }
    await new Promise<void>((r) => setTimeout(r, 300));

    setIsProcessing(false);
    setResult(classifyInput(input));
  };

  const reset = () => { setResult(null); setInput(''); inputRef.current?.focus(); };

  return (
    <div className={styles.widget} role="region" aria-label="VEDA AI Material Analysis Demo">

      {/* Header */}
      <div className={styles.header}>
        <div className={styles.badge}>
          <Zap size={10} strokeWidth={2.5} aria-hidden="true" />
          VEDA — Live Analysis
        </div>
        <span className={styles.noSignup}>No signup needed</span>
      </div>

      {/* Input */}
      <div className={styles.inputRow}>
        <div className={styles.inputWrap}>
          <Search size={14} className={styles.inputIcon} aria-hidden="true" />
          <input
            ref={inputRef}
            className={styles.input}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && analyze()}
            placeholder={PLACEHOLDERS[phIdx]}
            disabled={isProcessing}
            aria-label="Describe your material"
            autoComplete="off"
          />
        </div>
        <button
          className={styles.btn}
          onClick={analyze}
          disabled={!input.trim() || isProcessing}
          aria-busy={isProcessing}
        >
          {isProcessing
            ? <Loader2 size={14} className={styles.spin} aria-hidden="true" />
            : 'Analyze'
          }
        </button>
      </div>

      {/* Processing state */}
      <AnimatePresence mode="wait">
        {isProcessing && (
          <motion.div
            className={styles.processing}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            aria-live="polite"
          >
            <div className={styles.processingPulse} aria-hidden="true">
              {STEPS.map((_, i) => (
                <motion.div
                  key={i}
                  className={styles.pulseDot}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18 }}
                />
              ))}
            </div>
            <div className={styles.processingSteps}>
              {STEPS.map((step, i) => (
                <div
                  key={step}
                  className={`${styles.step} ${i <= stepIdx ? styles.stepActive : ''}`}
                >
                  <span className={styles.stepDot} />
                  {step}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Result — progressive reveal */}
        {result && !isProcessing && (
          <motion.div
            className={styles.result}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            aria-live="polite"
          >
            {/* Classification header */}
            <motion.div
              className={styles.resultHeader}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.25 }}
            >
              <div className={styles.materialInfo}>
                <span className={styles.category}>{result.category}</span>
                <p className={styles.materialName}>{result.material}</p>
                <p className={styles.grade}>{result.grade}</p>
              </div>
              <motion.div
                className={styles.confidence}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <span className={styles.confidenceValue}>{result.confidence}%</span>
                <span className={styles.confidenceLabel}>match</span>
              </motion.div>
            </motion.div>

            {/* Stats — staggered */}
            <div className={styles.statsGrid}>
              <ResultStat label="Est. Purity" value={result.purity} delay={0.08} />
              <ResultStat label="Market Price" value={result.price} delay={0.15} mono />
              <ResultStat
                label="Price Trend"
                delay={0.22}
                value={
                  <span className={result.trendUp ? styles.trendUp : styles.trendDown}>
                    {result.trendUp
                      ? <TrendingUp size={11} aria-hidden="true" />
                      : <TrendingDown size={11} aria-hidden="true" />
                    }
                    {result.trend}
                  </span>
                }
              />
              <ResultStat label="CO₂ Saved" value={result.co2Saved} delay={0.30} />
            </div>

            {/* Buyer matches */}
            <motion.div
              className={styles.buyers}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.38 }}
            >
              <div className={styles.buyerLeft}>
                <Users size={13} className={styles.buyerIcon} aria-hidden="true" />
                <p className={styles.buyerText}>
                  <strong>{result.buyers} verified buyers</strong> interested in this material
                </p>
              </div>
              <span className={styles.buyerRegion}>
                <MapPin size={11} aria-hidden="true" />
                {result.region}
              </span>
            </motion.div>

            {/* Blurred buyer avatars — showing locked state */}
            <motion.div
              className={styles.avatarRow}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.46 }}
              aria-hidden="true"
            >
              {Array.from({ length: Math.min(result.buyers, 3) }).map((_, i) => (
                <div key={i} className={styles.avatar}>
                  <div className={styles.avatarBlur} />
                </div>
              ))}
              {result.buyers > 3 && (
                <span className={styles.avatarMore}>+{result.buyers - 3} more</span>
              )}
              <span className={styles.avatarLock}>Sign in to view</span>
            </motion.div>

            {/* Action row */}
            <motion.div
              className={styles.actions}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.54 }}
            >
              <Link href="/signup" className={styles.actionPrimary}>
                See full buyer list
                <ArrowRight size={13} strokeWidth={2} aria-hidden="true" />
              </Link>
              <button className={styles.actionReset} onClick={reset}>
                Try another
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Default hint */}
      {!isProcessing && !result && (
        <p className={styles.hint}>
          Try: &quot;HDPE scrap&quot; · &quot;copper wire&quot; · &quot;fly ash&quot; · &quot;steel scrap&quot;
        </p>
      )}
    </div>
  );
}
