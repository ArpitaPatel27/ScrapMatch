'use client';

import { useEffect, useRef } from 'react';

interface Streak {
  x: number;
  y: number;
  len: number;
  speed: number;
  opacity: number;
  width: number;
  progress: number; // 0→1 through its lifetime
}

const NUM_STREAKS = 6;
const OPACITY_MAX = 0.14; // Very subtle — users notice it on second look

function randomStreak(canvasW: number, canvasH: number): Streak {
  return {
    x:       Math.random() * canvasW,
    y:       -(Math.random() * canvasH * 0.5), // start above viewport
    len:     40 + Math.random() * 80,
    speed:   0.18 + Math.random() * 0.22,  // px per frame (very slow)
    opacity: 0.04 + Math.random() * OPACITY_MAX,
    width:   0.5 + Math.random() * 0.8,
    progress: 0,
  };
}

export default function LightfallCanvas({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Use a non-null alias to satisfy TypeScript inside nested functions
    const c = ctx;

    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width  = W;
    canvas.height = H;

    // Initialise streaks at random points in their lifecycle
    const streaks: Streak[] = Array.from({ length: NUM_STREAKS }, () => {
      const s = randomStreak(W, H);
      s.y = Math.random() * H; // already partially into frame
      return s;
    });

    let animId: number;
    let prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function draw() {
      c.clearRect(0, 0, W, H);

      if (prefersReduced) return; // honour reduced-motion

      for (const s of streaks) {
        // Fade in/out at head and tail of streak
        const fade = Math.min(s.progress * 3, 1) * Math.min((1 - s.progress) * 3, 1);
        const alpha = s.opacity * fade;

        if (alpha > 0.002) {
          const grad = c.createLinearGradient(s.x, s.y, s.x, s.y + s.len);
          grad.addColorStop(0, `hsla(155, 40%, 25%, 0)`);
          grad.addColorStop(0.5, `hsla(155, 40%, 32%, ${alpha})`);
          grad.addColorStop(1, `hsla(40, 30%, 60%, 0)`);

          c.beginPath();
          c.moveTo(s.x, s.y);
          c.lineTo(s.x, s.y + s.len);
          c.strokeStyle = grad;
          c.lineWidth = s.width;
          c.stroke();
        }

        // Advance streak
        s.y        += s.speed;
        s.progress  = (s.y + s.len) / (H + s.len);

        // Recycle when off-screen
        if (s.y > H + s.len) {
          Object.assign(s, randomStreak(W, H));
        }
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    // Resize observer
    const ro = new ResizeObserver(() => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W;
      canvas.height = H;
    });
    ro.observe(canvas);

    // Reduced motion listener
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onMq = (e: MediaQueryListEvent) => { prefersReduced = e.matches; };
    mq.addEventListener('change', onMq);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      mq.removeEventListener('change', onMq);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
