'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  FileText, Shield, Bell, LayoutDashboard, Layers, Code, CheckCircle, Lock, ShieldCheck
} from 'lucide-react';
import MarketingNav from '@/components/organisms/MarketingNav/MarketingNav';
import MarketingFooter from '@/components/organisms/MarketingFooter/MarketingFooter';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import styles from './page.module.css';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' as const }
};

export default function ProductPage() {
  return (
    <>
      <MarketingNav />
      
      <main className={styles.main}>
        {/* HERO */}
        <section className={styles.hero}>
          <motion.div 
            className={styles.heroContainer}
            {...fadeIn}
          >
            <span className={styles.eyebrow}>The Platform</span>
            <h1 className={styles.title}>ScrapMatch does the hard work.<br/>You close the deal.</h1>
            <p className={styles.subtitle}>
              An AI-powered platform that handles material identification, market pricing, buyer matching, and GST-compliant documentation automatically.
            </p>
          </motion.div>
        </section>

        {/* HOW AI WORKS */}
        <section className={styles.ai}>
          <div className={styles.aiContainer}>
            <motion.div {...fadeIn}>
              <span className={styles.eyebrow}>Powered by AI</span>
              <h2 className={styles.aiTitle}>AI that understands industrial materials</h2>
              <p className={styles.aiBody}>
                Our model is trained on 400+ industrial material categories. It identifies what you have, grades it accurately, and sets a fair market price — without needing an expert on your team.
              </p>
            </motion.div>
            <motion.div 
              className={styles.aiVisual}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className={styles.aiRow}>
                <span style={{color: 'var(--color-text-muted)', marginRight: 'var(--space-2)'}}>Input &rarr;</span> Photo + description
              </div>
              <div className={styles.aiRow}>
                <span style={{color: 'var(--color-text-muted)', marginRight: 'var(--space-2)'}}>Processing &rarr;</span> Material type identified
              </div>
              <div className={styles.aiRow}>
                <span style={{color: 'var(--color-text-muted)', marginRight: 'var(--space-2)'}}>Output &rarr;</span> Grade A HDPE &middot; Purity 94% &middot; ₹34/kg
              </div>
            </motion.div>
          </div>
        </section>

        {/* MARKETPLACE */}
        <section className={styles.marketplace}>
          <div className={styles.marketplaceContainer}>
            <motion.div {...fadeIn}>
              <h2 className={styles.marketplaceTitle}>A marketplace built for industry</h2>
            </motion.div>
            <motion.div 
              className={styles.tableWrapper}
              {...fadeIn}
            >
              <div className={`${styles.tableRow} ${styles.tableHeader}`}>
                <div>Material</div>
                <div>Grade</div>
                <div>Qty</div>
                <div>Location</div>
                <div>Price</div>
                <div className={styles.cellAction}>Action</div>
              </div>
              <div className={styles.tableRow}>
                <div className={styles.cellMaterial}>Steel Offcuts</div>
                <div className={styles.cellGrade}>IS2062-B</div>
                <div className={styles.cellQty}>14T</div>
                <div className={styles.cellLocation}>Surat</div>
                <div className={styles.cellPrice}>₹31/kg</div>
                <div className={styles.cellAction}><button className={styles.viewDeal}>View Deal</button></div>
              </div>
              <div className={styles.tableRow}>
                <div className={styles.cellMaterial}>HDPE Regrind</div>
                <div className={styles.cellGrade}>Grade A</div>
                <div className={styles.cellQty}>8T</div>
                <div className={styles.cellLocation}>Pune</div>
                <div className={styles.cellPrice}>₹36/kg</div>
                <div className={styles.cellAction}><button className={styles.viewDeal}>View Deal</button></div>
              </div>
              <div className={styles.tableRow}>
                <div className={styles.cellMaterial}>Copper Scrap</div>
                <div className={styles.cellGrade}>Cat2</div>
                <div className={styles.cellQty}>1.2T</div>
                <div className={styles.cellLocation}>Jaipur</div>
                <div className={styles.cellPrice}>₹435/kg</div>
                <div className={styles.cellAction}><button className={styles.viewDeal}>View Deal</button></div>
              </div>
              <div className={styles.tableRow}>
                <div className={styles.cellMaterial}>OCC Paper</div>
                <div className={styles.cellGrade}>N/A</div>
                <div className={styles.cellQty}>22T</div>
                <div className={styles.cellLocation}>Hyderabad</div>
                <div className={styles.cellPrice}>₹9/kg</div>
                <div className={styles.cellAction}><button className={styles.viewDeal}>View Deal</button></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* WORKFLOW */}
        <section className={styles.workflow}>
          <div className={styles.workflowContainer}>
            <motion.h2 className={styles.workflowTitle} {...fadeIn}>How it works</motion.h2>
            <div className={styles.workflowGrid}>
              {[
                "List your material",
                "AI classifies and prices it",
                "Buyers are matched",
                "You negotiate and agree",
                "Documents and payment handled automatically"
              ].map((step, idx) => (
                <motion.div 
                  key={idx} 
                  className={styles.workflowStep}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className={styles.workflowNumber}>{idx + 1}</div>
                  <div className={styles.workflowText}>{step}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className={styles.features}>
          <div className={styles.featuresContainer}>
            <motion.h2 className={styles.featuresTitle} {...fadeIn}>Built for scale</motion.h2>
            <div className={styles.featuresGrid}>
              {[
                { icon: <FileText size={24} />, name: "GST Invoicing", desc: "Auto-generated, compliant invoices for every trade." },
                { icon: <CheckCircle size={24} />, name: "ESG Reporting", desc: "Track diversion from landfill and carbon offset." },
                { icon: <Bell size={24} />, name: "Price Alerts", desc: "Get notified when market prices hit your target." },
                { icon: <LayoutDashboard size={24} />, name: "Multi-plant Dashboard", desc: "Manage materials across all your manufacturing sites." },
                { icon: <Layers size={24} />, name: "Batch Listings", desc: "Upload spreadsheets to list hundreds of items instantly." },
                { icon: <Code size={24} />, name: "API Access", desc: "Integrate directly with your ERP like SAP or Tally." }
              ].map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  className={styles.featureCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: idx * 0.08 }}
                >
                  <div className={styles.featureIcon}>{feature.icon}</div>
                  <h3 className={styles.featureName}>{feature.name}</h3>
                  <p className={styles.featureDesc}>{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SECURITY */}
        <section className={styles.security}>
          <div className={styles.securityContainer}>
            <motion.div {...fadeIn}>
              <span className={styles.eyebrow}>Enterprise Grade</span>
              <h2 className={styles.securityTitle}>Your data is safe</h2>
              <p className={styles.aiBody}>
                We take security seriously. ScrapMatch is built on secure, scalable infrastructure with strict access controls to ensure your industrial data remains confidential.
              </p>
            </motion.div>
            <motion.div 
              className={styles.securityGrid}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className={styles.securityBadge}>
                <ShieldCheck className={styles.securityIcon} size={20} />
                GST Verification
              </div>
              <div className={styles.securityBadge}>
                <Lock className={styles.securityIcon} size={20} />
                Bank-grade Encryption
              </div>
              <div className={styles.securityBadge}>
                <Shield className={styles.securityIcon} size={20} />
                DPDP Compliant
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
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
