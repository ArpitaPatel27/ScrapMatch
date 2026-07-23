'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
  FileText, Shield, Bell, LayoutDashboard, Layers, Code, CheckCircle, Lock, ShieldCheck,
} from 'lucide-react';
import MarketingNav from '@/components/organisms/MarketingNav/MarketingNav';
import MarketingFooter from '@/components/organisms/MarketingFooter/MarketingFooter';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import styles from './page.module.css';

const MaterialJourney = dynamic(
  () => import('@/components/organisms/MaterialJourney/MaterialJourney'),
  { ssr: false },
);

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' as const },
};

export default function ProductPage() {
  return (
    <>
      <MarketingNav />

      <main className={styles.main}>
        {/* ── HERO ─────────────────────────────────────────────── */}
        <section className={styles.hero}>
          <div className={styles.heroImageWrap} aria-hidden="true">
            <Image
              src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=1600&q=75&auto=format&fit=crop"
              alt="Modern industrial manufacturing facility"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center' }}
              priority
              sizes="100vw"
            />
            <div className={styles.heroOverlay} />
          </div>
          <motion.div
            className={styles.heroContainer}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <span className={styles.eyebrow}>The Platform</span>
            <h1 className={styles.title}>
              ScrapMatch does the hard work.<br />You close the deal.
            </h1>
            <p className={styles.subtitle}>
              An AI-powered platform that handles material identification, market pricing,
              buyer matching, and GST-compliant documentation automatically.
            </p>
          </motion.div>
        </section>

        {/* ── MATERIAL JOURNEY ─────────────────────────────────── */}
        <section className={styles.journey}>
          <div className={styles.journeyContainer}>
            <MaterialJourney />
          </div>
        </section>

        {/* ── HOW AI WORKS ─────────────────────────────────────── */}
        <section className={styles.ai}>
          <div className={styles.aiContainer}>
            <motion.div {...fadeIn}>
              <span className={styles.eyebrow}>Powered by AI</span>
              <h2 className={styles.aiTitle}>AI that understands industrial materials</h2>
              <p className={styles.aiBody}>
                Our model is trained on 400+ industrial material categories. It identifies
                what you have, grades it accurately, and sets a fair market price — without
                needing an expert on your team.
              </p>
              <div className={styles.aiPoints}>
                {[
                  'Upload a photo or paste a description',
                  'AI classifies material type, grade and purity in seconds',
                  'Instant market price estimate benchmarked to live data',
                ].map((point, i) => (
                  <div key={i} className={styles.aiPoint}>
                    <span className={styles.aiPointNum}>{i + 1}</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Industrial image replacing the plain text mock */}
            <motion.div
              className={styles.aiImageWrap}
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55 }}
            >
              <Image
                src="https://images.unsplash.com/photo-1565799585-c0a7abd07ec3?w=900&q=80&auto=format&fit=crop"
                alt="Industrial material inspection and quality control"
                fill
                style={{ objectFit: 'cover', objectPosition: 'center' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className={styles.aiImageBadge}>
                <span className={styles.aiImageBadgeDot} />
                <span>AI analysis running…</span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── MARKETPLACE ──────────────────────────────────────── */}
        <section className={styles.marketplace}>
          <div className={styles.marketplaceContainer}>
            <motion.div {...fadeIn}>
              <h2 className={styles.marketplaceTitle}>A marketplace built for industry</h2>
            </motion.div>
            <motion.div className={styles.tableWrapper} {...fadeIn}>
              <div className={`${styles.tableRow} ${styles.tableHeader}`}>
                <div>Material</div>
                <div>Grade</div>
                <div>Qty</div>
                <div>Location</div>
                <div>Price</div>
                <div className={styles.cellAction}>Action</div>
              </div>
              {[
                { mat: 'Steel Offcuts', grade: 'IS2062-B', qty: '14T', loc: 'Surat',     price: '₹31/kg' },
                { mat: 'HDPE Regrind',  grade: 'Grade A',  qty: '8T',  loc: 'Pune',      price: '₹36/kg' },
                { mat: 'Copper Scrap',  grade: 'Cat2',     qty: '1.2T',loc: 'Jaipur',    price: '₹435/kg' },
                { mat: 'OCC Paper',     grade: 'Clean',    qty: '22T', loc: 'Hyderabad', price: '₹9/kg' },
              ].map((row) => (
                <div key={row.mat} className={styles.tableRow}>
                  <div className={styles.cellMaterial}>{row.mat}</div>
                  <div className={styles.cellGrade}>{row.grade}</div>
                  <div className={styles.cellQty}>{row.qty}</div>
                  <div className={styles.cellLocation}>{row.loc}</div>
                  <div className={styles.cellPrice}>{row.price}</div>
                  <div className={styles.cellAction}>
                    <button className={styles.viewDeal}>View Deal</button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── FEATURES GRID ────────────────────────────────────── */}
        <section className={styles.features}>
          <div className={styles.featuresContainer}>
            <motion.h2 className={styles.featuresTitle} {...fadeIn}>Built for scale</motion.h2>
            <div className={styles.featuresGrid}>
              {[
                { icon: <FileText size={24} />,    name: 'GST Invoicing',        desc: 'Auto-generated, compliant invoices for every trade.' },
                { icon: <CheckCircle size={24} />, name: 'ESG Reporting',        desc: 'Track diversion from landfill and carbon offset.' },
                { icon: <Bell size={24} />,        name: 'Price Alerts',         desc: 'Get notified when market prices hit your target.' },
                { icon: <LayoutDashboard size={24}/>,name:'Multi-plant Dashboard',desc: 'Manage materials across all your manufacturing sites.' },
                { icon: <Layers size={24} />,      name: 'Batch Listings',       desc: 'Upload spreadsheets to list hundreds of items instantly.' },
                { icon: <Code size={24} />,        name: 'API Access',           desc: 'Integrate directly with your ERP like SAP or Tally.' },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  className={styles.featureCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: idx * 0.07 }}
                >
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureName}>{feature.name}</h3>
                  <p className={styles.featureDesc}>{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SECURITY ─────────────────────────────────────────── */}
        <section className={styles.security}>
          <div className={styles.securityContainer}>
            <motion.div {...fadeIn}>
              <span className={styles.eyebrow}>Enterprise Grade</span>
              <h2 className={styles.securityTitle}>Your data is safe</h2>
              <p className={styles.aiBody}>
                We take security seriously. ScrapMatch is built on secure, scalable
                infrastructure with strict access controls to ensure your industrial
                data remains confidential.
              </p>
            </motion.div>
            <motion.div
              className={styles.securityGrid}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              {[
                { icon: <ShieldCheck size={20} />, label: 'GST Verification' },
                { icon: <Lock size={20} />,        label: 'Bank-grade Encryption' },
                { icon: <Shield size={20} />,      label: 'DPDP Compliant' },
              ].map(({ icon, label }) => (
                <div key={label} className={styles.securityBadge}>
                  <span className={styles.securityIcon}>{icon}</span>
                  {label}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────────────── */}
        <section className={styles.cta}>
          <motion.div className={styles.ctaContainer} {...fadeIn}>
            <h2 className={styles.ctaTitle}>Ready to start?</h2>
            <div className={styles.ctaButtons}>
              <SpecularButton href="/signup?intent=sell">List Materials</SpecularButton>
              <Link href="/contact" className={styles.contactLink}>Contact Sales</Link>
            </div>
          </motion.div>
        </section>
      </main>

      <MarketingFooter />
    </>
  );
}
