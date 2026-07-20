'use client';

import { useEffect, useRef } from 'react';
import styles from './NetworkGraph.module.css';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  type: 'company' | 'material';
  color: string;
}

interface Edge {
  from: number;
  to: number;
  progress: number;
  speed: number;
  active: boolean;
}

const COMPANIES = ['Tata Steel', 'Reliance', 'HDFC Mfg', 'ITC Ltd', 'Mahindra', 'ONGC', 'Godrej', 'UltraTech'];
const MATERIALS = ['HDPE', 'PET', 'Steel', 'Copper', 'PP', 'Glass', 'Rubber'];

const COMPANY_COLORS = [
  'hsl(162, 80%, 45%)',  // brand green
  'hsl(210, 80%, 60%)',  // accent blue
  'hsl(162, 60%, 35%)',  // darker green
  'hsl(210, 60%, 50%)',
  'hsl(162, 80%, 55%)',
  'hsl(220, 60%, 60%)',
  'hsl(162, 70%, 40%)',
  'hsl(200, 70%, 55%)',
];

export default function NetworkGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const edgesRef = useRef<Edge[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      initNodes(canvas.width, canvas.height);
    };

    function initNodes(w: number, h: number) {
      const nodes: Node[] = [];
      // Company nodes (larger)
      for (let i = 0; i < 8; i++) {
        nodes.push({
          x: (w * 0.1) + Math.random() * (w * 0.8),
          y: (h * 0.1) + Math.random() * (h * 0.8),
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          radius: 5 + Math.random() * 4,
          label: COMPANIES[i],
          type: 'company',
          color: COMPANY_COLORS[i],
        });
      }
      // Material nodes (smaller)
      for (let i = 0; i < 7; i++) {
        nodes.push({
          x: (w * 0.15) + Math.random() * (w * 0.7),
          y: (h * 0.15) + Math.random() * (h * 0.7),
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: 3 + Math.random() * 2,
          label: MATERIALS[i],
          type: 'material',
          color: 'hsl(220, 5%, 60%)',
        });
      }
      nodesRef.current = nodes;

      // Create edges
      const edges: Edge[] = [];
      for (let i = 0; i < 12; i++) {
        edges.push({
          from: Math.floor(Math.random() * nodes.length),
          to: Math.floor(Math.random() * nodes.length),
          progress: Math.random(),
          speed: 0.002 + Math.random() * 0.004,
          active: Math.random() > 0.3,
        });
      }
      edgesRef.current = edges;
    }

    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);

    function draw() {
      if (!canvas || !ctx) return;
      const w = canvas.width;
      const h = canvas.height;
      timeRef.current += 0.01;
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const edges = edgesRef.current;

      // Update node positions
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < n.radius || n.x > w - n.radius) n.vx *= -1;
        if (n.y < n.radius || n.y > h - n.radius) n.vy *= -1;
        n.x = Math.max(n.radius, Math.min(w - n.radius, n.x));
        n.y = Math.max(n.radius, Math.min(h - n.radius, n.y));
      });

      // Draw edges
      edges.forEach((edge) => {
        if (!edge.active || edge.from >= nodes.length || edge.to >= nodes.length) return;
        const fromNode = nodes[edge.from];
        const toNode = nodes[edge.to];
        const dx = toNode.x - fromNode.x;
        const dy = toNode.y - fromNode.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > 300 || dist < 20) return;

        const opacity = 0.08 + 0.06 * Math.sin(timeRef.current + edge.from);
        ctx.strokeStyle = `hsla(162, 80%, 45%, ${opacity})`;
        ctx.lineWidth = 0.5;
        ctx.setLineDash([]);
        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);
        ctx.stroke();

        // Animated particle along edge
        edge.progress += edge.speed;
        if (edge.progress > 1) edge.progress = 0;
        const px = fromNode.x + dx * edge.progress;
        const py = fromNode.y + dy * edge.progress;
        const grad = ctx.createRadialGradient(px, py, 0, px, py, 4);
        grad.addColorStop(0, 'hsla(162, 80%, 45%, 0.9)');
        grad.addColorStop(1, 'hsla(162, 80%, 45%, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const pulseFactor = 1 + 0.1 * Math.sin(timeRef.current * 1.5 + i);
        const r = node.radius * pulseFactor;

        // Glow
        if (node.type === 'company') {
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4);
          const alpha = 0.12 + 0.06 * Math.sin(timeRef.current + i);
          const color = node.color.replace('hsl', 'hsla').replace(')', `, ${alpha})`);
          glow.addColorStop(0, color);
          glow.addColorStop(1, 'transparent');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Node core
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright dot
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.beginPath();
        ctx.arc(node.x - r * 0.25, node.y - r * 0.25, r * 0.3, 0, Math.PI * 2);
        ctx.fill();

        // Label for company nodes
        if (node.type === 'company' && node.radius > 6) {
          ctx.fillStyle = `hsla(0, 0%, 96%, ${0.4 + 0.2 * Math.sin(timeRef.current + i)})`;
          ctx.font = `500 9px ${COMPANIES[0] ? "'Inter', sans-serif" : 'sans-serif'}`;
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y + r + 10);
        }
      });

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, []);

  return (
    <div className={styles.wrapper} aria-hidden="true">
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
}
