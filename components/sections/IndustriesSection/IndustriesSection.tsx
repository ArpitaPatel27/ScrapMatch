'use client';

import React, { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import { Layers, Box, FileText, FlaskConical, Building2, Cpu, Zap, Wrench } from 'lucide-react';
import GlareHover from '@/components/ui/GlareHover/GlareHover';
import styles from './IndustriesSection.module.css';

const industries = [
  {
    name: 'Steel & Metals',
    icon: Zap,
    desc: 'Steel offcuts, cast iron scrap, copper wire, aluminium extrusions',
    color: 'hsl(220, 22%, 44%)',
  },
  {
    name: 'Plastics',
    icon: Box,
    desc: 'HDPE regrind, PET flake, PP scrap, ABS waste',
    color: 'hsl(200, 55%, 38%)',
  },
  {
    name: 'Paper & Packaging',
    icon: FileText,
    desc: 'OCC cardboard, kraft paper, newsprint, tissue off-cuts',
    color: 'hsl(35, 58%, 40%)',
  },
  {
    name: 'Textiles',
    icon: Layers,
    desc: 'Cotton waste, polyester offcuts, fabric trimmings, yarn ends',
    color: 'hsl(280, 35%, 42%)',
  },
  {
    name: 'Chemicals',
    icon: FlaskConical,
    desc: 'Solvent residues, catalyst waste, chemical by-products',
    color: 'hsl(160, 42%, 33%)',
  },
  {
    name: 'Construction',
    icon: Building2,
    desc: 'Fly ash, slag, aggregate waste, steel rebar offcuts',
    color: 'hsl(24, 58%, 38%)',
  },
  {
    name: 'Electronics',
    icon: Cpu,
    desc: 'PCB scrap, cable waste, component stock, E-waste',
    color: 'hsl(155, 42%, 28%)',
  },
  {
    name: 'Industrial Rubber',
    icon: Wrench,
    desc: 'Rubber buffings, tyre crumb, conveyor belt offcuts, seal waste',
    color: 'hsl(30, 28%, 35%)',
  },
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
            We work with manufacturers across 8 major industrial sectors.
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
                <GlareHover className={styles.card}>
                  <div className={styles.iconWrapper} style={{ backgroundColor: industry.color + '1a' }}>
                    <Icon size={22} style={{ color: industry.color }} strokeWidth={1.5} />
                  </div>
                  <h3 className={styles.cardTitle}>{industry.name}</h3>
                  <p className={styles.cardDesc}>{industry.desc}</p>
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
