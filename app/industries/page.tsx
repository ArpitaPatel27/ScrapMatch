'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import MarketingNav from '@/components/organisms/MarketingNav/MarketingNav';
import MarketingFooter from '@/components/organisms/MarketingFooter/MarketingFooter';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import styles from './page.module.css';

/* ── Industry data with real Unsplash images ──────────────────── */
const industries = [
  {
    name: 'Steel & Metals',
    slug: 'steel',
    desc: 'Steel offcuts, copper wire, aluminium extrusions, cast iron scrap',
    color: 'hsl(210, 45%, 42%)',
    highlight: '40+ material categories',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=75&auto=format&fit=crop',
    imageAlt: 'Steel plant with molten steel and industrial equipment',
  },
  {
    name: 'Plastics',
    slug: 'plastics',
    desc: 'HDPE regrind, PET flake, PP scrap, ABS waste, recycled polymers',
    color: 'hsl(260, 38%, 48%)',
    highlight: '30+ grades tracked',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75&auto=format&fit=crop',
    imageAlt: 'Plastic recycling facility with sorted polymer materials',
  },
  {
    name: 'Paper & Packaging',
    slug: 'paper',
    desc: 'OCC cardboard, kraft paper, newsprint, tissue off-cuts',
    color: 'hsl(35, 58%, 42%)',
    highlight: 'Daily price updates',
    image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=600&q=75&auto=format&fit=crop',
    imageAlt: 'Paper bales stacked in a recycling facility',
  },
  {
    name: 'Construction',
    slug: 'construction',
    desc: 'Fly ash, GGBFS slag, aggregate waste, steel rebar offcuts',
    color: 'hsl(15, 45%, 38%)',
    highlight: 'Bulk quantities',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=75&auto=format&fit=crop',
    imageAlt: 'Construction aggregates and concrete materials on site',
  },
  {
    name: 'Electronics',
    slug: 'electronics',
    desc: 'PCB scrap, cable waste, component stock, E-waste streams',
    color: 'hsl(155, 48%, 24%)',
    highlight: 'Certified e-waste',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=75&auto=format&fit=crop',
    imageAlt: 'Electronic circuit boards and e-waste components',
  },
  {
    name: 'Chemicals',
    slug: 'chemicals',
    desc: 'Solvent residues, catalyst waste, acid effluents, chemical by-products',
    color: 'hsl(55, 55%, 38%)',
    highlight: 'PCB compliant',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=75&auto=format&fit=crop',
    imageAlt: 'Industrial chemical storage tanks and processing facility',
  },
  {
    name: 'Textiles',
    slug: 'textiles',
    desc: 'Cotton waste, polyester offcuts, yarn ends, denim trimmings',
    color: 'hsl(340, 45%, 45%)',
    highlight: 'Fibre to fibre',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=75&auto=format&fit=crop',
    imageAlt: 'Textile manufacturing with fabric rolls and machinery',
  },
  {
    name: 'Automotive',
    slug: 'automotive',
    desc: 'Stamping offcuts, coolant waste, rubber components, battery scrap',
    color: 'hsl(220, 42%, 40%)',
    highlight: 'OEM verified',
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&q=75&auto=format&fit=crop',
    imageAlt: 'Automotive manufacturing components and metal stampings',
  },
  {
    name: 'Packaging',
    slug: 'packaging',
    desc: 'Corrugated board, stretch film, BOPP, shrink wrap, aluminium foil',
    color: 'hsl(295, 35%, 42%)',
    highlight: 'EPR compliant',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=75&auto=format&fit=crop',
    imageAlt: 'Cardboard and packaging waste ready for recycling',
  },
];

const stats = [
  { value: '9',     label: 'Industries supported' },
  { value: '400+',  label: 'Material categories' },
  { value: '280+',  label: 'Verified companies' },
  { value: '₹12Cr+',label: 'Materials traded' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

export default function IndustriesPage() {
  return (
    <>
      <MarketingNav />

      <main>
        {/* ── HERO ─────────────────────────────────────────────── */}
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

        {/* ── INDUSTRIES GRID ──────────────────────────────────── */}
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
                  <Link
                    href={`/industries/${industry.slug}`}
                    className={styles.card}
                    style={{ '--accent': industry.color } as React.CSSProperties}
                  >
                    {/* Image area */}
                    <div className={styles.cardImageWrap}>
                      <Image
                        src={industry.image}
                        alt={industry.imageAlt}
                        fill
                        style={{ objectFit: 'cover', objectPosition: 'center' }}
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      {/* Gradient overlay */}
                      <div className={styles.cardImageOverlay} />
                      {/* Highlight chip on image */}
                      <span
                        className={styles.cardChip}
                        style={{ background: industry.color + 'dd' }}
                      >
                        {industry.highlight}
                      </span>
                    </div>

                    {/* Text content */}
                    <div className={styles.cardBody}>
                      <h2 className={styles.cardTitle}>{industry.name}</h2>
                      <p className={styles.cardDesc}>{industry.desc}</p>
                      <span className={styles.cardCta}>
                        Explore industry <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────── */}
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

        {/* ── CTA ──────────────────────────────────────────────── */}
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
