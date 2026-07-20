'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Factory, Cpu, Tag, Users, FileCheck, IndianRupee, Leaf
} from 'lucide-react';
import styles from './FlowStoryDiagram.module.css';

/* ── Story stages — the entire ScrapMatch value chain ─────────── */
const STAGES = [
  {
    id:    'waste',
    Icon:  Factory,
    label: 'Industrial Waste',
    sub:   'Material enters the system',
    tag:   'Input',
    color: 'copper',
  },
  {
    id:    'ai',
    Icon:  Cpu,
    label: 'VEDA Analyzes',
    sub:   'AI classifies in seconds',
    tag:   'AI',
    color: 'green',
  },
  {
    id:    'grade',
    Icon:  Tag,
    label: 'Grade & Price Set',
    sub:   '94% confidence · ₹32–38/kg',
    tag:   'Intelligence',
    color: 'green',
  },
  {
    id:    'match',
    Icon:  Users,
    label: 'Buyers Matched',
    sub:   '3 verified buyers found',
    tag:   'Network',
    color: 'green',
  },
  {
    id:    'deal',
    Icon:  FileCheck,
    label: 'Deal Closed',
    sub:   'Contract auto-generated',
    tag:   'Commerce',
    color: 'neutral',
  },
  {
    id:    'revenue',
    Icon:  IndianRupee,
    label: '₹48,000 Revenue',
    sub:   '18% above local rates',
    tag:   'Value',
    color: 'copper',
  },
  {
    id:    'carbon',
    Icon:  Leaf,
    label: '2.4T CO₂ Saved',
    sub:   'ESG impact verified & logged',
    tag:   'Impact',
    color: 'green',
  },
] as const;

const STAGE_DURATION = 720;   // ms between each stage appearing
const HOLD_DURATION  = 3200;  // ms to hold full diagram before reset
const FADE_DURATION  = 600;   // ms for fade-out before reset

export default function FlowStoryDiagram() {
  const [active, setActive]     = useState(-1);   // index of last visible stage
  const [fading, setFading]     = useState(false);
  const timerRef                = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function runSequence() {
      // Reveal stages one by one
      for (let i = 0; i < STAGES.length; i++) {
        await new Promise<void>((res) => {
          timerRef.current = setTimeout(() => {
            if (!cancelled) setActive(i);
            res();
          }, STAGE_DURATION);
        });
      }

      // Hold full diagram
      await new Promise<void>((res) => {
        timerRef.current = setTimeout(res, HOLD_DURATION);
      });

      // Fade out, then reset
      if (!cancelled) setFading(true);
      await new Promise<void>((res) => {
        timerRef.current = setTimeout(res, FADE_DURATION);
      });
      if (!cancelled) {
        setFading(false);
        setActive(-1);
      }

      // Brief pause then restart
      await new Promise<void>((res) => {
        timerRef.current = setTimeout(res, 400);
      });
      if (!cancelled) runSequence();
    }

    runSequence();
    return () => {
      cancelled = true;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className={styles.diagram} aria-hidden="true" role="presentation">
      {/* Header label */}
      <div className={styles.diagramLabel}>
        <span className={styles.labelDot} />
        Live transaction flow
      </div>

      {/* Stages */}
      <div className={`${styles.stages} ${fading ? styles.fadeOut : ''}`}>
        {STAGES.map((stage, i) => {
          const { Icon } = stage;
          const isVisible = active >= i;

          return (
            <div key={stage.id} className={styles.stageWrapper}>
              {/* Stage node */}
              <motion.div
                className={`${styles.stage} ${styles[`stage--${stage.color}`]} ${isVisible ? styles.stageVisible : ''}`}
                initial={false}
                animate={isVisible
                  ? { opacity: 1, x: 0, filter: 'blur(0px)' }
                  : { opacity: 0, x: 16, filter: 'blur(4px)' }
                }
                transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Icon */}
                <div className={`${styles.stageIcon} ${styles[`icon--${stage.color}`]}`}>
                  <Icon size={14} strokeWidth={1.8} />
                </div>

                {/* Text */}
                <div className={styles.stageText}>
                  <span className={styles.stageLabel}>{stage.label}</span>
                  <span className={styles.stageSub}>{stage.sub}</span>
                </div>

                {/* Tag */}
                <span className={`${styles.stageTag} ${styles[`tag--${stage.color}`]}`}>
                  {stage.tag}
                </span>
              </motion.div>

              {/* Connector line between stages */}
              {i < STAGES.length - 1 && (
                <div className={styles.connector}>
                  <motion.div
                    className={styles.connectorLine}
                    initial={false}
                    animate={active > i
                      ? { scaleY: 1, opacity: 1 }
                      : { scaleY: 0, opacity: 0 }
                    }
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                  />
                  <motion.div
                    className={styles.connectorDot}
                    initial={false}
                    animate={active > i ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, delay: 0.15 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom metric strip — appears when all stages shown */}
      <motion.div
        className={styles.metricStrip}
        initial={false}
        animate={active >= STAGES.length - 1 && !fading
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 8 }
        }
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className={styles.metric}>
          <span className={styles.metricValue}>₹48K</span>
          <span className={styles.metricLabel}>Revenue</span>
        </div>
        <div className={styles.metricDivider} />
        <div className={styles.metric}>
          <span className={styles.metricValue}>2.4T</span>
          <span className={styles.metricLabel}>CO₂ Saved</span>
        </div>
        <div className={styles.metricDivider} />
        <div className={styles.metric}>
          <span className={styles.metricValue}>57s</span>
          <span className={styles.metricLabel}>Total Time</span>
        </div>
      </motion.div>
    </div>
  );
}
