'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import styles from './ImpactSection.module.css';

const CountUp = ({ end, duration = 2000, prefix = "", suffix = "", decimals = 0 }: { end: number, duration?: number, prefix?: string, suffix?: string, decimals?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    let animationFrame: number;

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      const easedProgress = easeOut(percentage);
      const currentCount = easedProgress * end;
      
      setCount(currentCount);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, inView]);

  return (
    <span ref={ref}>
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

const metrics = [
  { prefix: "₹", end: 480, suffix: "Cr+", text: "in surplus material value recovered", decimals: 0 },
  { prefix: "", end: 47000, suffix: "+", text: "Tonnes of industrial material matched", decimals: 0 },
  { prefix: "", end: 82, suffix: "%", text: "of listings matched within 48 hours", decimals: 0 },
  { prefix: "", end: 2.1, suffix: "M", text: "Tonnes CO₂ emissions reduced through circular reuse", decimals: 1 },
];

const benefits = [
  "Increase revenue from materials you currently discard",
  "Reduce raw material procurement costs by up to 34%",
  "Meet your sustainability goals with automated ESG reporting",
];

function ImpactSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.eyebrow}>Business Impact</span>
          <h2 className={styles.headline}>Real results for manufacturers across India.</h2>
        </motion.div>

        <div className={styles.metricsGrid}>
          {metrics.map((metric, index) => (
            <motion.div
              key={index}
              className={styles.metricCard}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={styles.metricValue}>
                <CountUp 
                  end={metric.end} 
                  prefix={metric.prefix} 
                  suffix={metric.suffix} 
                  decimals={metric.decimals}
                />
              </div>
              <p className={styles.metricText}>{metric.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={styles.benefitsRow}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {benefits.map((benefit, index) => (
            <div key={index} className={styles.benefitItem}>
              <CheckCircle2 className={styles.benefitIcon} size={24} />
              <span className={styles.benefitText}>{benefit}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ImpactSection;
