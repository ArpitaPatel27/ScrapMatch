'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Factory, ShoppingBag, Building, TrendingUp, ChevronRight } from 'lucide-react';
import MarketingNav from '@/components/organisms/MarketingNav/MarketingNav';
import MarketingFooter from '@/components/organisms/MarketingFooter/MarketingFooter';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import styles from './page.module.css';

export default function SolutionsPage() {
  const [activeTab, setActiveTab] = useState<'sell' | 'buy'>('sell');

  const sellSteps = [
    'List material with photo or description',
    'AI classifies and prices it automatically',
    'Verified buyers receive instant notification',
    'Confirm deal, documents auto-generated'
  ];

  const buySteps = [
    'Set material requirements and budget',
    'Browse matched listings or receive alerts',
    'Review seller credentials and material details',
    'Place order, payment handled securely'
  ];

  return (
    <div className={styles.main}>
      <MarketingNav />
      
      <main>
        {/* HERO SECTION */}
        <section className={styles.hero}>
          <motion.div 
            className={styles.heroContainer}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <span className={styles.eyebrow}>Solutions</span>
            <h1 className={styles.headline}>Built for every role in the supply chain.</h1>
            <p className={styles.subhead}>
              Whether you produce waste, source materials, or manage procurement — ScrapMatch has a workflow designed for you.
            </p>
          </motion.div>
        </section>

        {/* ROLE CARDS SECTION */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <div className={styles.rolesGrid}>
              <motion.div 
                className={styles.roleCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0 * 0.08 }}
              >
                <div className={styles.iconWrapper}>
                  <Factory size={24} />
                </div>
                <h3 className={styles.roleTitle}>For Sellers: You produce it. We sell it.</h3>
                <p className={styles.roleDesc}>
                  Plant managers and operations teams can list surplus in minutes. AI handles the grading, pricing, and buyer matching. You just approve the deal.
                </p>
                <a href="#" className={styles.roleCta}>
                  Start Selling <ChevronRight size={16} />
                </a>
              </motion.div>

              <motion.div 
                className={styles.roleCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 1 * 0.08 }}
              >
                <div className={styles.iconWrapper}>
                  <ShoppingBag size={24} />
                </div>
                <h3 className={styles.roleTitle}>For Buyers: Better prices on secondary materials.</h3>
                <p className={styles.roleDesc}>
                  Source verified secondary raw materials at 18-34% below virgin material costs. Filter by grade, quantity, location.
                </p>
                <a href="#" className={styles.roleCta}>
                  Start Sourcing <ChevronRight size={16} />
                </a>
              </motion.div>

              <motion.div 
                className={styles.roleCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 2 * 0.08 }}
              >
                <div className={styles.iconWrapper}>
                  <Building size={24} />
                </div>
                <h3 className={styles.roleTitle}>For Enterprise: Multi-plant visibility and ESG reporting.</h3>
                <p className={styles.roleDesc}>
                  Track surplus and procurement across every facility. Export ESG reports. Manage team access.
                </p>
                <a href="#" className={styles.roleCta}>
                  Contact Sales <ChevronRight size={16} />
                </a>
              </motion.div>

              <motion.div 
                className={styles.roleCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 3 * 0.08 }}
              >
                <div className={styles.iconWrapper}>
                  <TrendingUp size={24} />
                </div>
                <h3 className={styles.roleTitle}>For Traders: Scale your trading operations.</h3>
                <p className={styles.roleDesc}>
                  Source materials from 280+ verified suppliers. List your inventory. Close deals faster with AI valuation.
                </p>
                <a href="#" className={styles.roleCta}>
                  Talk to us <ChevronRight size={16} />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CASE STUDIES SECTION */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Success Stories</span>
              <h2 className={styles.sectionHeadline}>Proven results across industries.</h2>
            </div>

            <div className={styles.caseGrid}>
              <motion.div 
                className={styles.caseCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0 }}
              >
                <div className={styles.caseCompany}>Plastics manufacturer, Maharashtra</div>
                <div className={styles.caseStat}>Recovered ₹14L</div>
                <p className={styles.caseQuote}>
                  &quot;We used to sell to scrap dealers at half price. Now we get market rate from verified buyers.&quot;
                </p>
              </motion.div>

              <motion.div 
                className={styles.caseCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.1 }}
              >
                <div className={styles.caseCompany}>Steel plant, Gujarat</div>
                <div className={styles.caseStat}>Cut costs by 22%</div>
                <p className={styles.caseQuote}>
                  &quot;We source IS2062 offcuts from ScrapMatch instead of buying virgin steel. It has fundamentally changed our cost structure.&quot;
                </p>
              </motion.div>

              <motion.div 
                className={styles.caseCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ delay: 0.2 }}
              >
                <div className={styles.caseCompany}>Paper recycler, Hyderabad</div>
                <div className={styles.caseStat}>4 new buyers</div>
                <p className={styles.caseQuote}>
                  &quot;Matched with 4 new buyers in the first week. The AI classified our OCC grade correctly. No more guessing.&quot;
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <span className={styles.eyebrow}>Workflow</span>
              <h2 className={styles.sectionHeadline}>How it works for you.</h2>
            </div>

            <div className={styles.tabsNav}>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'sell' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('sell')}
              >
                I want to sell
              </button>
              <button 
                className={`${styles.tabBtn} ${activeTab === 'buy' ? styles.tabBtnActive : ''}`}
                onClick={() => setActiveTab('buy')}
              >
                I want to buy
              </button>
            </div>

            <div className={styles.stepsGrid}>
              {(activeTab === 'sell' ? sellSteps : buySteps).map((step, index) => (
                <motion.div 
                  key={`${activeTab}-${index}`}
                  className={styles.stepCard}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className={styles.stepNum}>{index + 1}</div>
                  <p className={styles.stepDesc}>{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <h2 className={styles.headline}>Get started today.</h2>
              <div className={styles.ctaActions}>
                <SpecularButton>List Materials</SpecularButton>
                <a href="#" className={styles.secondaryBtn}>Explore Marketplace</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <MarketingFooter />
    </div>
  );
}
