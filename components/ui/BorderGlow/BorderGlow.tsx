'use client';

import styles from './BorderGlow.module.css';

interface BorderGlowProps {
  children: React.ReactNode;
  className?: string;
  color?: string; // CSS color value, default brand green
}

export default function BorderGlow({
  children,
  className = '',
  color,
}: BorderGlowProps) {
  return (
    <div
      className={`${styles.wrapper} ${className}`}
      style={color ? { '--glow-color': color } as React.CSSProperties : undefined}
    >
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>{children}</div>
    </div>
  );
}
