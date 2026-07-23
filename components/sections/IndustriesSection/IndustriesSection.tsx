'use client';

import React, { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './IndustriesSection.module.css';

const industries = [
  {
    name: 'Steel & Metals',
    slug: 'steel',
    desc: 'Steel offcuts, cast iron scrap, copper wire, aluminium extrusions',
    color: 'hsl(210, 45%, 42%)',
    // Steel coils in a factory
    image: 'https://images.unsplash.com/photo-1507209575474-fa0d5a4e8c47?w=600&q=75&auto=format&fit=crop',
    imageAlt: 'Steel coils and metal processing',
  },
  {
    name: 'Plastics',
    slug: 'plastics',
    desc: 'HDPE regrind, PET flake, PP scrap, ABS waste',
    color: 'hsl(260, 38%, 48%)',
    // Plastic recycling / pellets
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=75&auto=format&fit=crop',
    imageAlt: 'Plastic recycling and polymer processing',
  },
  {
    name: 'Paper & Packaging',
    slug: 'paper',
    desc: 'OCC cardboard, kraft paper, newsprint, tissue off-cuts',
    color: 'hsl(35, 58%, 40%)',
    // Paper bales / warehouse
    image: 'https://images.unsplash.com/photo-1586769852044-692d6e3703f0?w=600&q=75&auto=format&fit=crop',
    imageAlt: 'Paper bales in a recycling facility',
  },
  {
    name: 'Textiles',
    slug: 'textiles',
    desc: 'Cotton waste, polyester offcuts, fabric trimmings, yarn ends',
    color: 'hsl(340, 45%, 45%)',
    // Textile factory / fabric
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=600&q=75&auto=format&fit=crop',
    imageAlt: 'Textile manufacturing and fabric sorting',
  },
  {
    name: 'Chemicals',
    slug: 'chemicals',
    desc: 'Solvent residues, catalyst waste, chemical by-products',
    color: 'hsl(55, 55%, 38%)',
    // Industrial chemical tanks
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=75&auto=format&fit=crop',
    imageAlt: 'Industrial chemical storage and processing',
  },
  {
    name: 'Construction',
    slug: 'construction',
    desc: 'Fly ash, slag, aggregate waste, steel rebar offcuts',
    color: 'hsl(15, 45%, 38%)',
    // Construction materials / aggregate
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=75&auto=format&fit=crop',
    imageAlt: 'Construction aggregates and building materials',
  },
  {
    name: 'Electronics',
    slug: 'electronics',
    desc: 'PCB scrap, cable waste, component stock, E-waste',
    color: 'hsl(155, 48%, 24%)',
    // Circuit boards / PCB
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=75&auto=format&fit=crop',
    imageAlt: 'Electronic circuit boards and e-waste',
  },
  {
    name: 'Automotive',
    slug: 'automotive',
    desc: 'Stamping offcuts, coolant waste, rubber trim, battery scrap',
    color: 'hsl(220, 42%, 40%)',
    // Auto parts / metal stamping
    image: 'https://images.unsplash.com/photo-1565043666747-69f6646db940?w=600&q=75&auto=format&fit=crop',
    imageAlt: 'Automotive metal components and stamping',
  },
  {
    name: 'Packaging',
    slug: 'packaging',
    desc: 'Corrugated board, stretch film, BOPP, aluminium foil',
    color: 'hsl(295, 35%, 42%)',
    // Cardboard / packaging waste
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=75&auto=format&fit=crop',
    imageAlt: 'Cardboard packaging and corrugated waste',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.44, ease: 'easeOut' as const } },
};

function IndustriesSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.55 }}
        >
          <span className={styles.eyebrow}>Industries We Serve</span>
          <h2 className={styles.headline}>
            Whatever your industry produces,<br />ScrapMatch finds it a buyer.
          </h2>
          <p className={styles.subheadline}>
            We work with manufacturers across 9 major industrial sectors.
          </p>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.name}
              variants={cardAnim}
              className={styles.cardWrapper}
              style={{ '--cat-color': industry.color } as CSSProperties}
            >
              <Link href={`/industries/${industry.slug}`} className={styles.card}>
                {/* Image */}
                <div className={styles.cardImageWrap}>
                  <Image
                    src={industry.image}
                    alt={industry.imageAlt}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 33vw, 25vw"
                  />
                  <div className={styles.cardImageOverlay} />
                  {/* Category chip on top of image */}
                  <span className={styles.categoryChip}>{industry.name}</span>
                </div>

                {/* Text content */}
                <div className={styles.cardBody}>
                  <p className={styles.cardDesc}>{industry.desc}</p>
                  <span className={styles.cardCta}>
                    Explore industry <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default IndustriesSection;
