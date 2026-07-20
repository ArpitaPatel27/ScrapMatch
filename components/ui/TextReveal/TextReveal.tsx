'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './TextReveal.module.css';

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;       // ms before animation starts
  stagger?: number;     // ms between each word
  threshold?: number;   // IntersectionObserver threshold
  once?: boolean;       // animate once only
}

export default function TextReveal({
  children,
  as: Tag = 'p',
  className = '',
  delay = 0,
  stagger = 60,
  threshold = 0.2,
  once = true,
}: TextRevealProps) {
  const ref   = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (once) observer.disconnect();
          setRevealed(true);
        } else if (!once) {
          setRevealed(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  // Split on spaces, preserve line breaks via \n
  const words = children.split(' ');

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`${styles.container} ${className}`} aria-label={children}>
      {words.map((word, i) => (
        <span key={i} className={styles.wordOuter} aria-hidden="true">
          <span
            className={`${styles.wordInner} ${revealed ? styles.revealed : ''}`}
            style={{ transitionDelay: `${delay + i * stagger}ms` }}
          >
            {word}
          </span>
          {/* Space between words */}
          {i < words.length - 1 && (
            <span className={styles.space}> </span>
          )}
        </span>
      ))}
    </Tag>
  );
}
