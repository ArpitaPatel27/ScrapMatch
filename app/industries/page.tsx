'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Building2,
  Package,
  Files,
  Shirt,
  FlaskConical,
  HardHat,
  Cpu,
  Car,
  Box,
  ArrowRight,
} from 'lucide-react';
import MarketingNav from '@/components/organisms/MarketingNav/MarketingNav';
import MarketingFooter from '@/components/organisms/MarketingFooter/MarketingFooter';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import styles from './page.module.css';

const industries = [
  {
    name: 'Steel & Metals',
    slug: 'steel',
    icon: <Building2 size={24} />,
    desc: 'Steel offcuts, copper wire, aluminium extrusions, cast iron scrap',
    color: 'hsl(210, 45%, 42%)',
    highlight: '40+ material categories',
  },
  {
    name: 'Plastics',
    slug: 'plastics',
    icon: <Package size={24} />,
    desc: 'HDPE regrind, PET flake, PP scrap, ABS waste, recycled polymers',
    color: 'hsl(260, 38%, 48%)',
    highlight: '30+ grades tracked',
  },
  {
    name: 'Paper & Packaging',
    slug: 'paper',
    icon: <Files size={24} />,
    desc: 'OCC cardboard, kraft paper, newsprint, tissue off-cuts',
    color: 'hsl(35, 58%, 42%)',
    highlight: 'Daily price updates',
  },
  {
    name: 'Construction',
    slug: 'construction',
    icon: <HardHat size={24} />,
    desc: 'Fly ash, GGBFS slag, aggregate waste, steel rebar offcuts',
    color: 'hsl(15, 45%, 38%)',
    highlight: 'Bulk quantities',
  },
  {
    name: 'Electronics',
    slug: 'electronics',
    icon: <Cpu size={24} />,
    desc: 'PCB scrap, cable waste, component stock, E-waste streams',
    color: 'hsl(155, 42%, 28%)',
    highlight: 'Certified e-waste',
  },
  {
    name: 'Chemicals',
    slug: 'chemicals',
    icon: <FlaskConical size={24} />,
    desc: 'Solvent residues, catalyst waste, acid effluents, chemical by-products',
    color: 'hsl(55, 55%, 38%)',
    highlight: 'PCB compliant',
  },
  {
    name: 'Textiles',
    slug: 'textiles',
    icon: <Shirt size={24} />,
    desc: 'Cotton waste, polyester offcuts, yarn ends, denim trimmings',
    color: 'hsl(340, 45%, 45%)',
    highlight: 'Fibre to fibre',
  },
  {
    name: 'Automotive',
    slug: 'automotive',
    icon: <Car size={24} />,
    desc: 'Stamping offcuts, coolant waste, rubber components, battery scrap',
    color: 'hsl(220, 42%, 40%)',
    highlight: 'OEM verified',
  },
  {
    name: 'Packaging',
    slug: 'packaging',
    icon: <Box size={24} />,
    desc: 'Corrugated board, stretch film, BOPP, shrink wrap, aluminium foil',
    color: 'hsl(295, 35%, 42%)',
    highlight: 'EPR compliant',
  },
];

const stats = [
  { value: '9', label: 'Industries supported' },
  { value: '400+', label: 'Material categories' },
  { value: '280+', label: 'Verified companies' },
  { value: '₹12Cr+', label: 'Materials traded' },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
};

const cardAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

export default function IndustriesPage() {
  return (
    <>
      <MarketingNav />

      <main>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <motion.span
              className={styles.heroEyebrow}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Industries
            </motion.span>
            <motion.h1
              className={styles.heroTitle}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              Whatever you make,<br />we find a buyer for what&apos;s left over.
            </motion.h1>
            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22 }}
            >
              9 industrial sectors. 400+ material categories. One AI-powered marketplace.
            </motion.p>

            {/* Stats row */}
            <motion.div
              className={styles.statsRow}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              {stats.map((s) => (
                <div key={s.label} className={styles.statItem}>
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* INDUSTRIES GRID */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <motion.div
              className={styles.grid}
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
            >
              {industries.map((industry) => (
                <motion.div key={industry.slug} variants={cardAnim}>
                  <Link href={`/industries/${industry.slug}`} className={styles.card}>
                    <div className={styles.cardTop}>
                      <div
                        className={styles.cardIcon}
                        style={{
                          backgroundColor: industry.color + '1a',
                          color: industry.color,
                        }}
                      >
                        {industry.icon}
                      </div>
                      <span className={styles.cardHighlight}>{industry.highlight}</span>
                    </div>
                    <h2 className={styles.cardTitle}>{industry.name}</h2>
                    <p className={styles.cardDesc}>{industry.desc}</p>
                    <span className={styles.cardCta}>
                      Explore industry <ArrowRight size={14} />
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Process</span>
              <h2 className={styles.sectionTitle}>From surplus to sale in three steps</h2>
            </div>

            <div className={styles.stepsGrid}>
              {[
                { title: 'Pick your industry', desc: 'Select from 9 supported sectors and browse hundreds of material categories relevant to your operations.' },
                { title: 'List your material', desc: 'Provide quantity, condition and expected price. AI classifies and prices your listing automatically.' },
                { title: 'Get matched', desc: 'ScrapMatch connects you with verified buyers actively looking for your specific materials in real time.' },
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className={styles.stepCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, delay: index * 0.12, ease: 'easeOut' }}
                >
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <motion.div
              className={styles.ctaWrapper}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <h2 className={styles.ctaTitle}>Start selling your industrial materials today</h2>
              <p className={styles.ctaSubtitle}>No setup fee. GST-verified onboarding. Cancel anytime.</p>
              <div className={styles.ctaButtons}>
                <SpecularButton href="/signup?intent=sell" size="lg">List Materials</SpecularButton>
                <Link href="/marketplace" className={styles.secondaryBtn}>
                  Browse Marketplace
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <MarketingFooter />
    </>
  );
}
