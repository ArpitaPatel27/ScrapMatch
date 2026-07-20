'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Upload, Cpu, Users, CheckCircle } from 'lucide-react';
import BorderGlow from '@/components/ui/BorderGlow/BorderGlow';
import styles from './HowItWorksSection.module.css';

const steps = [
  {
    icon: <Upload className={styles.iconSVG} />,
    title: 'Upload Your Material',
    description: 'Take a photo or describe your surplus material. Tell us the quantity and location.',
  },
  {
    icon: <Cpu className={styles.iconSVG} />,
    title: 'AI Identifies and Values It',
    description: 'Our AI recognises the material type, estimates the grade and purity, and gives you an instant market price.',
  },
  {
    icon: <Users className={styles.iconSVG} />,
    title: 'Get Matched with Verified Buyers',
    description: 'ScrapMatch shows you verified industrial buyers who need exactly what you have. No cold calls.',
  },
  {
    icon: <CheckCircle className={styles.iconSVG} />,
    title: 'Complete the Transaction',
    description: 'Negotiate, agree on a price, and complete the deal securely on the platform. Get paid directly.',
  }
];

const HowItWorksSection = () => {
  return (
    <section className={styles.section}>
      <BorderGlow>
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <span className={styles.eyebrow}>How It Works</span>
            <motion.h2 
              className={styles.headline}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              From surplus material to revenue in 4 steps.
            </motion.h2>
            <motion.p 
              className={styles.sub}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              No complex setup. No long contracts. Start listing in minutes.
            </motion.p>
          </div>

          <div className={styles.grid}>
            {steps.map((step, idx) => (
              <motion.div 
                key={idx} 
                className={styles.stepCard}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
              >
                <div className={styles.stepHeader}>
                  <div className={styles.stepNumber}>0{idx + 1}</div>
                  <div className={styles.iconWrapper}>{step.icon}</div>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
                {idx < steps.length - 1 && (
                  <div className={styles.connector} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </BorderGlow>
    </section>
  );
};


export default HowItWorksSection;
