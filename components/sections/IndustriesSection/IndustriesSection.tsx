'use client';

import React, { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Layers, Box, FileText, FlaskConical, Building2, Cpu, Zap, Wrench, Car, Package } from 'lucide-react';
import GlareHover from '@/components/ui/GlareHover/GlareHover';
import styles from './IndustriesSection.module.css';

const industries = [
  { name: 'Steel & Metals',    slug: 'steel',        icon: Zap,         desc: 'Steel offcuts, cast iron scrap, copper wire, aluminium extrusions', color: 'hsl(210, 45%, 42%)' },
  { name: 'Plastics',          slug: 'plastics',     icon: Box,         desc: 'HDPE regrind, PET flake, PP scrap, ABS waste', color: 'hsl(260, 38%, 48%)' },
  { name: 'Paper & Packaging', slug: 'paper',        icon: FileText,    desc: 'OCC cardboard, kraft paper, newsprint, tissue off-cuts', color: 'hsl(35, 58%, 40%)' },
  { name: 'Textiles',          slug: 'textiles',     icon: Layers,      desc: 'Cotton waste, polyester offcuts, fabric trimmings, yarn ends', color: 'hsl(340, 45%, 45%)' },
  { name: 'Chemicals',         slug: 'chemicals',    icon: FlaskConical,desc: 'Solvent residues, catalyst waste, chemical by-products', color: 'hsl(55, 55%, 38%)' },
  { name: 'Construction',      slug: 'construction', icon: Building2,   desc: 'Fly ash, slag, aggregate waste, steel rebar offcuts', color: 'hsl(15, 45%, 38%)' },
  { name: 'Electronics',       slug: 'electronics',  icon: Cpu,         desc: 'PCB scrap, cable waste, component stock, E-waste', color: 'hsl(155, 48%, 24%)' },
  { name: 'Automotive',        slug: 'automotive',   icon: Car,         desc: 'Stamping offcuts, coolant waste, rubber trim, battery scrap', color: 'hsl(220, 42%, 40%)' },
  { name: 'Packaging',         slug: 'packaging',    icon: Package,     desc: 'Corrugated board, stretch film, BOPP, aluminium foil', color: 'hsl(295, 35%, 42%)' },
];

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

        <div className={styles.grid}>
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <motion.div
                key={industry.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: index * 0.065 }}
                className={styles.cardWrapper}
                style={{ '--cat-color': industry.color } as CSSProperties}
              >
                <GlareHover className={styles.glareWrapper}>
                  <Link href={`/industries/${industry.slug}`} className={styles.card}>
                    <div className={styles.iconWrapper} style={{ backgroundColor: industry.color + '1a' }}>
                      <Icon size={22} style={{ color: industry.color }} strokeWidth={1.5} />
                    </div>
                    <h3 className={styles.cardTitle}>{industry.name}</h3>
                    <p className={styles.cardDesc}>{industry.desc}</p>
                  </Link>
                </GlareHover>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default IndustriesSection;
