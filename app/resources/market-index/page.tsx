'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import MarketingNav from '@/components/organisms/MarketingNav/MarketingNav';
import MarketingFooter from '@/components/organisms/MarketingFooter/MarketingFooter';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import styles from './page.module.css';

const categories = [
  'All',
  'Steel & Metals',
  'Plastics',
  'Paper',
  'Construction',
  'Textiles',
  'Rubber',
  'Electronics'
];

const priceData = [
  { material: 'Steel offcuts IS2062-B', category: 'Steel & Metals', grade: 'High', price: '₹28–32/kg', trend: 'up', change: '+2.1%' },
  { material: 'Copper scrap Cat1', category: 'Steel & Metals', grade: 'Cat1', price: '₹435–460/kg', trend: 'flat', change: '+0.3%' },
  { material: 'Copper scrap Cat2', category: 'Steel & Metals', grade: 'Cat2', price: '₹410–440/kg', trend: 'up', change: '+1.8%' },
  { material: 'Aluminium extrusions 6063', category: 'Steel & Metals', grade: '6063', price: '₹108–122/kg', trend: 'down', change: '-1.2%' },
  { material: 'Cast iron scrap', category: 'Steel & Metals', grade: 'Standard', price: '₹18–22/kg', trend: 'flat', change: '0%' },
  { material: 'HDPE Regrind Grade A', category: 'Plastics', grade: 'Grade A', price: '₹33–38/kg', trend: 'up', change: '+4.2%' },
  { material: 'PET Flake food-grade', category: 'Plastics', grade: 'Food-grade', price: '₹28–34/kg', trend: 'up', change: '+2.8%' },
  { material: 'PP natural scrap', category: 'Plastics', grade: 'Natural', price: '₹21–27/kg', trend: 'flat', change: '+0.5%' },
  { material: 'ABS black scrap', category: 'Plastics', grade: 'Black', price: '₹24–30/kg', trend: 'down', change: '-0.8%' },
  { material: 'OCC Grade 11', category: 'Paper', grade: 'Grade 11', price: '₹7.5–10.5/kg', trend: 'up', change: '+3.1%' },
  { material: 'Kraft paper waste', category: 'Paper', grade: 'Standard', price: '₹5.0–8.0/kg', trend: 'flat', change: '0%' },
  { material: 'Newsprint waste', category: 'Paper', grade: 'Standard', price: '₹3.5–5.5/kg', trend: 'down', change: '-2.0%' },
  { material: 'Class F Fly Ash IS3812', category: 'Construction', grade: 'IS3812', price: '₹1.20–1.75/kg', trend: 'flat', change: '+0.2%' },
  { material: 'GGBFS slag', category: 'Construction', grade: 'Standard', price: '₹1.50–2.20/kg', trend: 'up', change: '+1.5%' },
  { material: 'M-Sand Type II', category: 'Construction', grade: 'Type II', price: '₹2.40–2.90/kg', trend: 'flat', change: '0%' },
  { material: 'Cotton yarn waste', category: 'Textiles', grade: 'Mixed', price: '₹18–26/kg', trend: 'down', change: '-1.5%' },
  { material: 'Polyester offcuts', category: 'Textiles', grade: 'Standard', price: '₹12–18/kg', trend: 'flat', change: '+0.1%' },
  { material: 'Tyre crumb 40 mesh', category: 'Rubber', grade: '40 mesh', price: '₹18–24/kg', trend: 'up', change: '+2.2%' },
  { material: 'Rubber buffings', category: 'Rubber', grade: 'Standard', price: '₹14–20/kg', trend: 'flat', change: '0%' },
  { material: 'PCB scrap mixed', category: 'Electronics', grade: 'Mixed', price: '₹80–120/kg', trend: 'up', change: '+5.1%' }
];

export default function MarketIndex() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredData = activeCategory === 'All' 
    ? priceData 
    : priceData.filter(item => item.category === activeCategory);

  const getTrendIcon = (trend: string, change: string) => {
    if (trend === 'up') return <span className={styles.trendUp}><TrendingUp size={16} /> {change}</span>;
    if (trend === 'down') return <span className={styles.trendDown}><TrendingDown size={16} /> {change}</span>;
    return <span className={styles.trendFlat}><Minus size={16} /> {change}</span>;
  };

  return (
    <>
      <MarketingNav />
      <main>
        {/* HERO SECTION */}
        <section className={styles.section}>
          <div className={styles.container}>
            <motion.div 
              className={styles.hero}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className={styles.eyebrow}>Market Index</div>
              <h1 className={styles.headline}>Indian Industrial Material Prices</h1>
              <p className={styles.subhead}>
                Reference pricing updated weekly from verified ScrapMatch transactions.
              </p>
              <div className={styles.badge}>
                <Clock size={14} /> Updated: July 2026
              </div>
            </motion.div>
          </div>
        </section>

        {/* MAIN PRICE TABLE SECTION */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <div className={styles.filterScroll}>
              {categories.map((category) => (
                <button
                  key={category}
                  className={`${styles.filterPill} ${activeCategory === category ? styles.filterPillActive : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <motion.div 
              className={styles.tableContainer}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th className={styles.th}>Material</th>
                    <th className={styles.th}>Category</th>
                    <th className={styles.th}>Grade/Spec</th>
                    <th className={styles.th}>Price Range</th>
                    <th className={styles.th}>Change</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index} className={styles.tr}>
                      <td className={styles.td}><strong>{item.material}</strong></td>
                      <td className={styles.td}>{item.category}</td>
                      <td className={styles.td}>{item.grade}</td>
                      <td className={styles.td}>{item.price}</td>
                      <td className={styles.td}>
                        {getTrendIcon(item.trend, item.change)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
        </section>

        {/* TRENDING SECTION */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.eyebrow}>Trending</div>
            <h2 className={styles.headline} style={{ fontSize: '2rem', marginTop: 'var(--space-2)' }}>
              Most Active Materials This Week
            </h2>
            
            <div className={styles.trendGrid}>
              {[
                { name: 'HDPE Regrind', listings: 847, price: '₹36/kg avg', demand: 'HIGH' },
                { name: 'Steel Offcuts', listings: 632, price: '₹30/kg avg', demand: 'MEDIUM' },
                { name: 'OCC Paper', listings: 511, price: '₹9/kg avg', demand: 'HIGH' }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className={styles.trendCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: index * 0.08 }}
                >
                  <div className={styles.trendCardTitle}>{item.name}</div>
                  <div className={styles.trendStat}>
                    <span>Listings</span>
                    <span className={styles.trendStatValue}>{item.listings}</span>
                  </div>
                  <div className={styles.trendStat}>
                    <span>Avg Price</span>
                    <span className={styles.trendStatValue}>{item.price}</span>
                  </div>
                  <div className={styles.trendStat}>
                    <span>Demand</span>
                    <span className={styles.trendStatValue} style={{ color: item.demand === 'HIGH' ? '#16a34a' : '#d97706' }}>
                      {item.demand}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* REGIONAL PRICING */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <motion.div 
              className={styles.regionSection}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <div className={styles.regionText}>
                <div className={styles.eyebrow}>Regional Insights</div>
                <h2>Prices vary by region. Here’s a snapshot across Indian states.</h2>
                <p>Transportation costs and local industrial clusters significantly impact material prices across India.</p>
              </div>
              <div className={styles.regionTableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th className={styles.th}>Region</th>
                      <th className={styles.th}>Variance</th>
                      <th className={styles.th}>Key Driver</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={styles.tr}>
                      <td className={styles.td}><strong>Maharashtra</strong></td>
                      <td className={styles.td}><span className={styles.trendUp}>+4%</span></td>
                      <td className={styles.td}>Highest for Plastics</td>
                    </tr>
                    <tr className={styles.tr}>
                      <td className={styles.td}><strong>Gujarat</strong></td>
                      <td className={styles.td}><span className={styles.trendUp}>+2%</span></td>
                      <td className={styles.td}>Steel hub</td>
                    </tr>
                    <tr className={styles.tr}>
                      <td className={styles.td}><strong>Rajasthan</strong></td>
                      <td className={styles.td}><span className={styles.trendDown}>-1%</span></td>
                      <td className={styles.td}>Paper and Textiles</td>
                    </tr>
                    <tr className={styles.tr}>
                      <td className={styles.td}><strong>Tamil Nadu</strong></td>
                      <td className={styles.td}><span className={styles.trendUp}>+3%</span></td>
                      <td className={styles.td}>Electronics</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.section}>
          <div className={styles.container}>
            <motion.div 
              className={styles.ctaSection}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
            >
              <h2 className={styles.headline}>List your material at the right price</h2>
              <SpecularButton>Get AI Valuation</SpecularButton>
            </motion.div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </>
  );
}
