'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import styles from './FAQSection.module.css';

const faqs = [
  {
    question: "What materials can I sell on ScrapMatch?",
    answer: "You can sell any industrial by-product, surplus, or waste material. This includes plastics (HDPE, PET, PP), metals (steel, copper, aluminium), paper and cardboard, rubber, chemicals, fly ash, construction aggregate, and electronic scrap. If your factory produces it and you don't need it, there's likely a buyer for it."
  },
  {
    question: "How does the AI identify my material?",
    answer: "You describe or upload a photo of the material. Our AI analyses the visual properties and your description to identify the material type, estimate its grade and purity, and compare it against our database of 400+ industrial material categories. You get a classification result with a confidence score in under a minute."
  },
  {
    question: "Who buys the materials?",
    answer: "Verified industrial businesses — manufacturers who use secondary raw materials in their production processes. This includes recyclers, reprocessors, processors, and manufacturers who source secondary raw materials to reduce costs. All buyers are GST-verified before they can place any orders."
  },
  {
    question: "Is ScrapMatch only for large companies?",
    answer: "No. ScrapMatch works for businesses of any size. Whether you're a small plastics recycler with 500kg of material or a large steel plant with 500 tonnes of offcuts, the platform handles both. There's no minimum quantity required to list."
  },
  {
    question: "How are buyers verified?",
    answer: "Every buyer on ScrapMatch goes through a verification process that includes GST registration check, business registration validation, and a review of their buying history and category. Verified buyers receive a badge on their profile. You can always see who is interested in your material before agreeing to a transaction."
  },
  {
    question: "How do I get paid?",
    answer: "Once a deal is confirmed, payment is handled securely through the platform. Funds are released to you after the buyer confirms receipt and material quality. We support bank transfer, UPI, and business payment methods."
  }
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.eyebrow}>Common Questions</span>
          <h2 className={styles.headline}>Everything you need to know.</h2>
        </motion.div>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            
            return (
              <motion.div 
                key={index}
                className={`${styles.faqItem} ${isOpen ? styles.open : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <button 
                  className={styles.questionButton}
                  onClick={() => toggleOpen(index)}
                  aria-expanded={isOpen}
                >
                  <span className={styles.questionText}>{faq.question}</span>
                  <motion.div
                    className={styles.iconWrapper}
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className={styles.answerWrapper}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className={styles.answerText}>
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQSection;
