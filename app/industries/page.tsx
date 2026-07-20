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
  Tractor,
  ArrowRight
} from 'lucide-react';
import MarketingNav from '@/components/organisms/MarketingNav/MarketingNav';
import MarketingFooter from '@/components/organisms/MarketingFooter/MarketingFooter';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import styles from './page.module.css';

const industries = [
  {
    name: 'Steel & Metals',
    icon: <Building2 size={24} />,
    materials: [
      { name: 'Steel offcuts IS2062', qty: '1–50T', price: '₹28–35/kg' },
      { name: 'Copper wire scrap Cat1', qty: '100kg–5T', price: '₹420–460/kg' },
      { name: 'Aluminium extrusions', qty: '500kg–10T', price: '₹105–120/kg' }
    ]
  },
  {
    name: 'Plastics',
    icon: <Package size={24} />,
    materials: [
      { name: 'HDPE Regrind Grade A', qty: '1–20T', price: '₹33–38/kg' },
      { name: 'PET flake food-grade', qty: '500kg–5T', price: '₹28–34/kg' },
      { name: 'PP scrap natural', qty: '2–15T', price: '₹22–28/kg' }
    ]
  },
  {
    name: 'Paper & Packaging',
    icon: <Files size={24} />,
    materials: [
      { name: 'OCC Cardboard', qty: '5–100T', price: '₹7–11/kg' },
      { name: 'Kraft paper waste', qty: '1–30T', price: '₹5–9/kg' },
      { name: 'Mixed office paper', qty: '1–10T', price: '₹3–6/kg' }
    ]
  },
  {
    name: 'Textiles',
    icon: <Shirt size={24} />,
    materials: [
      { name: 'Cotton waste yarn', qty: '500kg–5T', price: '₹18–26/kg' },
      { name: 'Polyester offcuts', qty: '200kg–3T', price: '₹12–18/kg' },
      { name: 'Denim trimmings', qty: '100kg–2T', price: '₹14–20/kg' }
    ]
  },
  {
    name: 'Chemicals',
    icon: <FlaskConical size={24} />,
    materials: [
      { name: 'IPA solvent residue', qty: '200L–5,000L', price: '₹18–24/L' },
      { name: 'Spent catalyst', qty: '100kg–2T', price: 'Market rate' },
      { name: 'Acid waste (treated)', qty: '500L–10,000L', price: '₹4–9/L' }
    ]
  },
  {
    name: 'Construction',
    icon: <HardHat size={24} />,
    materials: [
      { name: 'Class F Fly Ash', qty: '10–500T', price: '₹1.2–1.8/kg' },
      { name: 'GGBFS slag', qty: '10–200T', price: '₹1.5–2.2/kg' },
      { name: 'M-Sand aggregate', qty: '10–100T', price: '₹2.4–3.0/kg' }
    ]
  },
  {
    name: 'Electronics',
    icon: <Cpu size={24} />,
    materials: [
      { name: 'PCB scrap mixed', qty: '50kg–2T', price: '₹80–120/kg' },
      { name: 'Cable scrap (copper)', qty: '100kg–5T', price: '₹180–240/kg' },
      { name: 'Component stock', qty: '10–500kg', price: 'Negotiable' }
    ]
  },
  {
    name: 'Industrial Rubber',
    icon: <Tractor size={24} />,
    materials: [
      { name: 'Rubber buffings', qty: '500kg–10T', price: '₹14–20/kg' },
      { name: 'Tyre crumb 40 mesh', qty: '1–20T', price: '₹18–24/kg' },
      { name: 'Conveyor belt scrap', qty: '200kg–5T', price: '₹12–16/kg' }
    ]
  }
];

const steps = [
  {
    title: 'Pick your industry',
    desc: 'Select from our 8 supported industrial sectors and hundreds of material categories.'
  },
  {
    title: 'List your material',
    desc: 'Provide details like quantity, condition, and expected price to create a listing.'
  },
  {
    title: 'Get matched',
    desc: 'We connect you with verified buyers actively looking for your specific materials.'
  }
];

export default function IndustriesPage() {
  return (
    <>
      <MarketingNav />
      
      <main>
        {/* HERO SECTION */}
        <section className={styles.hero}>
          <motion.div 
            className={styles.heroContent}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className={styles.heroEyebrow}>Industries</span>
            <h1 className={styles.heroTitle}>
              Whatever you make, we find a buyer for what’s left over.
            </h1>
            <p className={styles.heroSubtitle}>
              8 industrial sectors. 400+ material categories. One marketplace.
            </p>
          </motion.div>
        </section>

        {/* INDUSTRIES GRID */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <div className={styles.grid}>
              {industries.map((industry, index) => (
                <motion.div
                  key={industry.name}
                  className={styles.card}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}>
                      {industry.icon}
                    </div>
                    <h2 className={styles.cardTitle}>{industry.name}</h2>
                  </div>
                  
                  <div className={styles.materialList}>
                    {industry.materials.map((mat, i) => (
                      <div key={i} className={styles.materialItem}>
                        <span className={styles.materialName}>{mat.name}</span>
                        <div className={styles.materialTags}>
                          <span className={styles.tag}>{mat.qty}</span>
                          <span className={`${styles.tag} ${styles.tagHighlight}`}>{mat.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link href="/marketplace" className={styles.cardLink}>
                    View listings <ArrowRight size={16} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW LISTING WORKS */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.sectionEyebrow}>Process</span>
              <h2 className={styles.sectionTitle}>How listing works</h2>
            </div>
            
            <div className={styles.stepsGrid}>
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  className={styles.stepCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                >
                  <div className={styles.stepNumber}>{index + 1}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <motion.div 
              className={styles.ctaWrapper}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5 }}
            >
              <h2 className={styles.ctaTitle}>Start selling your industrial materials</h2>
              <div className={styles.ctaButtons}>
                <SpecularButton>List Materials</SpecularButton>
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
