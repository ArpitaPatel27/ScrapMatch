'use client';

import { useRef, useCallback, MouseEvent } from 'react';
import styles from './GlareHover.module.css';

interface GlareHoverProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number; // 0–1, default 0.08
}

export default function GlareHover({
  children,
  className = '',
  intensity = 0.08,
}: GlareHoverProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--gx', `${x}%`);
      el.style.setProperty('--gy', `${y}%`);
      el.style.setProperty('--gi', `${intensity}`);
    },
    [intensity]
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (el) {
      el.style.setProperty('--gi', '0');
    }
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.glare} ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      <span className={styles.overlay} aria-hidden="true" />
    </div>
  );
}
