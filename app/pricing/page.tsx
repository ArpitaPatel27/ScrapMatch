'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Minus, Plus } from 'lucide-react';
import MarketingNav from '@/components/organisms/MarketingNav/MarketingNav';
import MarketingFooter from '@/components/organisms/MarketingFooter/MarketingFooter';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import styles from './page.module.css';

const faqs = [
  {
    question: 'Is there a free trial?',
    answer: 'Yes — Starter is always free. Professional includes a 14-day trial.'
  },
  {
    question: 'Do you charge commission?',
    answer: 'No commission on deals. Monthly subscription only.'
  },
  {
    question: 'Can I cancel anytime?',
    answer: 'Yes. No lock-in.'
  },
  {
    question: 'Do you offer discounts for large volumes?',
    answer: 'Yes — contact our sales team.'
  }
];

const features = [
  { name: 'AI Classification', starter: true, pro: true, enterprise: true },
  { name: 'Buyer Matching', starter: true, pro: true, enterprise: true },
  { name: 'Price Alerts', starter: false, pro: true, enterprise: true },
  { name: 'Market Index Access', starter: false, pro: true, enterprise: true },
  { name: 'Digital Contracts', starter: false, pro: true, enterprise: true },
  { name: 'ESG Reports', starter: false, pro: true, enterprise: true },
  { name: 'Multi-plant Support', starter: false, pro: false, enterprise: true },
  { name: 'API Access', starter: false, pro: false, enterprise: true },
  { name: 'Custom Integrations', starter: false, pro: false, enterprise: true },
  { name: 'Account Manager', starter: false, pro: false, enterprise: true },
  { name: 'SLA', starter: false, pro: false, enterprise: true },
  { name: 'Phone Support', starter: false, pro: true, enterprise: true },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className={styles.page}>
      <MarketingNav />
      <main className={styles.main}>
        {/* HERO SECTION */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.hero}>
              <motion.span 
                className={styles.eyebrow}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Pricing
              </motion.span>
              <motion.h1 
                className={styles.headline}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                Simple pricing. No surprises.
              </motion.h1>
              <motion.p 
                className={styles.subhead}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Start for free. Pay only when you close a deal.
              </motion.p>
              
              <motion.div 
                className={styles.toggleContainer}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className={styles.toggleLabel}>Monthly</span>
                <div 
                  className={`${styles.toggleSwitch} ${isYearly ? styles.toggleSwitchActive : ''}`}
                  onClick={() => setIsYearly(!isYearly)}
                >
                  <div className={`${styles.toggleKnob} ${isYearly ? styles.toggleKnobActive : ''}`} />
                </div>
                <span className={styles.toggleLabel}>
                  Yearly
                  <span className={styles.badge}>2 months free</span>
                </span>
              </motion.div>
            </div>

            {/* PRICING TIERS */}
            <div className={styles.pricingGrid}>
              <motion.div 
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5 }}
              >
                <h3 className={styles.cardName}>Starter</h3>
                <div className={styles.cardPrice}>
                  <span className={styles.priceAmount}>Free</span>
                </div>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}><Check className={styles.featureIcon} size={18} /> Up to 3 active listings</li>
                  <li className={styles.featureItem}><Check className={styles.featureIcon} size={18} /> AI material classification</li>
                  <li className={styles.featureItem}><Check className={styles.featureIcon} size={18} /> Buyer matching</li>
                  <li className={styles.featureItem}><Check className={styles.featureIcon} size={18} /> Email support</li>
                  <li className={styles.featureItem}><Check className={styles.featureIcon} size={18} /> No credit card required</li>
                </ul>
                <SpecularButton>Get Started Free</SpecularButton>
              </motion.div>

              <motion.div 
                className={`${styles.card} ${styles.cardProfessional}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className={styles.popularBadge}>Most Popular</div>
                <h3 className={styles.cardName}>Professional</h3>
                <div className={styles.cardPrice}>
                  <span className={styles.priceAmount}>
                    {isYearly ? '₹49,999' : '₹4,999'}
                  </span>
                  <span className={styles.pricePeriod}>{isYearly ? '/year' : '/month'}</span>
                </div>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}><Check className={styles.featureIcon} size={18} /> Unlimited listings</li>
                  <li className={styles.featureItem}><Check className={styles.featureIcon} size={18} /> Priority buyer matching</li>
                  <li className={styles.featureItem}><Check className={styles.featureIcon} size={18} /> Live market pricing</li>
                  <li className={styles.featureItem}><Check className={styles.featureIcon} size={18} /> Digital contracts</li>
                  <li className={styles.featureItem}><Check className={styles.featureIcon} size={18} /> ESG impact reports</li>
                  <li className={styles.featureItem}><Check className={styles.featureIcon} size={18} /> Phone support</li>
                </ul>
                <SpecularButton>Start Free Trial</SpecularButton>
              </motion.div>

              <motion.div 
                className={styles.card}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className={styles.cardName}>Enterprise</h3>
                <div className={styles.cardPrice}>
                  <span className={styles.priceAmount}>Custom</span>
                </div>
                <ul className={styles.featureList}>
                  <li className={styles.featureItem}><Check className={styles.featureIcon} size={18} /> Multi-plant dashboard</li>
                  <li className={styles.featureItem}><Check className={styles.featureIcon} size={18} /> API access</li>
                  <li className={styles.featureItem}><Check className={styles.featureIcon} size={18} /> Custom integrations</li>
                  <li className={styles.featureItem}><Check className={styles.featureIcon} size={18} /> Dedicated account manager</li>
                  <li className={styles.featureItem}><Check className={styles.featureIcon} size={18} /> GST-compliant invoicing</li>
                  <li className={styles.featureItem}><Check className={styles.featureIcon} size={18} /> SLA guarantee</li>
                </ul>
                <SpecularButton>Contact Sales</SpecularButton>
              </motion.div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className={styles.sectionAlt}>
          <div className={styles.container}>
            <div className={styles.tableSection}>
              <h2 className={styles.headline} style={{ fontSize: '2rem', marginBottom: 'var(--space-12)' }}>Compare Plans</h2>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Starter</th>
                      <th>Professional</th>
                      <th>Enterprise</th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((feature, i) => (
                      <tr key={i}>
                        <td>{feature.name}</td>
                        <td>{feature.starter ? <Check size={20} className={styles.checkIcon} /> : <Minus size={20} className={styles.dashIcon} />}</td>
                        <td>{feature.pro ? <Check size={20} className={styles.checkIcon} /> : <Minus size={20} className={styles.dashIcon} />}</td>
                        <td>{feature.enterprise ? <Check size={20} className={styles.checkIcon} /> : <Minus size={20} className={styles.dashIcon} />}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ & CTA */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.faqSection}>
              <div className={styles.faqHeader}>
                <h2 className={styles.headline} style={{ fontSize: '2rem' }}>Frequently Asked Questions</h2>
              </div>
              <div className={styles.accordion}>
                {faqs.map((faq, index) => (
                  <div key={index} className={styles.accordionItem}>
                    <button 
                      className={styles.accordionButton}
                      onClick={() => toggleFaq(index)}
                    >
                      {faq.question}
                      {openFaqIndex === index ? (
                        <Minus size={20} className={styles.accordionIcon} />
                      ) : (
                        <Plus size={20} className={styles.accordionIcon} />
                      )}
                    </button>
                    <AnimatePresence>
                      {openFaqIndex === index && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          style={{ overflow: 'hidden' }}
                        >
                          <div className={styles.accordionContent}>
                            {faq.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              
              <div className={styles.ctaBox}>
                <h2 className={styles.cardName} style={{ fontSize: '1.5rem' }}>Still have questions?</h2>
                <p className={styles.subhead} style={{ fontSize: '1rem', marginTop: 'var(--space-2)' }}>Our team is ready to help you find the right plan for your business.</p>
                <div className={styles.ctaButtons}>
                  <SpecularButton>Start Free</SpecularButton>
                  <button className={styles.outlineBtn}>Contact Sales</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
