'use client';

import { useRef, useCallback, MouseEvent } from 'react';
import Link from 'next/link';
import styles from './SpecularButton.module.css';

interface SpecularButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  id?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export default function SpecularButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  id,
  type = 'button',
  disabled = false,
}: SpecularButtonProps) {
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--sx', `${x}%`);
    el.style.setProperty('--sy', `${y}%`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = btnRef.current;
    if (!el) return;
    el.style.setProperty('--sx', '50%');
    el.style.setProperty('--sy', '30%');
  }, []);

  const cls = [
    styles.btn,
    styles[`btn--${variant}`],
    styles[`btn--${size}`],
    disabled ? styles['btn--disabled'] : '',
  ].filter(Boolean).join(' ');

  if (href) {
    return (
      <Link
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        href={href}
        id={id}
        className={cls}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <span className={styles.specular} aria-hidden="true" />
        <span className={styles.label}>{children}</span>
      </Link>
    );
  }

  return (
    <button
      ref={btnRef as React.Ref<HTMLButtonElement>}
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cls}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <span className={styles.specular} aria-hidden="true" />
      <span className={styles.label}>{children}</span>
    </button>
  );
}
