'use client';

import React from 'react';
import { motion } from 'framer-motion';
import styles from './WhySection.module.css';

const WhySection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.left}>
            <span className={styles.eyebrow}>The Problem</span>
            <motion.h2 
              className={styles.headline}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              India's factories discard ₹2.4 trillion worth of recoverable material every year.
            </motion.h2>
            <motion.p 
              className={styles.body}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Most industrial waste is not truly waste. HDPE scrap, steel offcuts, fly ash, and rubber byproducts all have buyers. The problem is no one knows who they are, or what the material is worth.
            </motion.p>
            <motion.p 
              className={styles.fix}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              ScrapMatch fixes this.
            </motion.p>
          </div>
          <div className={styles.right}>
            <motion.div 
              className={styles.statCard}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className={styles.statValue}>₹2.4T</div>
              <div className={styles.statLabel}>recoverable value lost to landfills annually</div>
            </motion.div>
            <motion.div 
              className={styles.statCard}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className={styles.statValue}>62%</div>
              <div className={styles.statLabel}>of manufacturers have no process for surplus material disposal</div>
            </motion.div>
            <motion.div 
              className={styles.statCard}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className={styles.statValue}>34%</div>
              <div className={styles.statLabel}>average reduction in raw material cost when switching to secondary materials</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
