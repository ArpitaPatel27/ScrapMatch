'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, BadgeCheck, Star, Package, MessageSquare, Bookmark } from 'lucide-react';
import { MARKETPLACE_LISTINGS } from '@/lib/mock-data';
import styles from './page.module.css';

export default function MarketplaceDetailPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const listing = MARKETPLACE_LISTINGS.find(l => l.id === id);
  const [activeImg, setActiveImg] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [quoteQty, setQuoteQty] = useState('');
  const [quoteMsg, setQuoteMsg] = useState('');
  const [quoteSent, setQuoteSent] = useState(false);

  if (!listing) {
    return (
      <div className={styles.notFound}>
        <Package size={48} />
        <h2>Material not found</h2>
        <Link href="/dashboard/marketplace" className={styles.backLink}>← Back to Marketplace</Link>
      </div>
    );
  }

  const related = MARKETPLACE_LISTINGS.filter(l => l.category === listing.category && l.id !== listing.id).slice(0, 3);

  function sendQuote(e: React.FormEvent) {
    e.preventDefault();
    setQuoteSent(true);
  }

  return (
    <>
      <div className={styles.topBar}>
        <Link href="/dashboard/marketplace" className={styles.backBtn}><ArrowLeft size={16} /> Back to Marketplace</Link>
        <button className={`${styles.bookmarkBtn} ${bookmarked ? styles.bookmarkActive : ''}`} onClick={() => setBookmarked(p => !p)}>
          <Bookmark size={16} /> {bookmarked ? 'Saved' : 'Save'}
        </button>
      </div>

      <div className={styles.layout}>
        {/* Left */}
        <div className={styles.leftCol}>
          {/* Gallery */}
          <div className={styles.galleryCard}>
            <div className={styles.mainImgWrap}>
              <img src={listing.images[0]} alt={listing.material} className={styles.mainImg} />
            </div>
            <div className={styles.thumbnails}>
              {listing.images.map((img, i) => (
                <button key={i} className={`${styles.thumb} ${i === activeImg ? styles.thumbActive : ''}`} onClick={() => setActiveImg(i)}>
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* AI Analysis */}
          <div className={styles.card}>
            <h3 className={styles.sectionTitle}>AI Quality Analysis</h3>
            <div className={styles.aiItems}>
              {[
                { label: 'Purity Score', value: 94, color: 'var(--color-success)' },
                { label: 'Grade Confidence', value: 88, color: 'var(--color-brand)' },
                { label: 'Market Position', value: 76, color: 'var(--color-accent)' },
              ].map(item => (
                <div key={item.label} className={styles.aiItem}>
                  <div className={styles.aiItemHeader}>
                    <span className={styles.aiItemLabel}>{item.label}</span>
                    <span className={styles.aiItemValue}>{item.value}%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <motion.div
                      className={styles.progressFill}
                      initial={{ width: 0 }} whileInView={{ width: `${item.value}%` }}
                      viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                      style={{ background: item.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className={styles.card}>
              <h3 className={styles.sectionTitle}>Related Materials</h3>
              <div className={styles.relatedGrid}>
                {related.map(r => (
                  <Link key={r.id} href={`/dashboard/marketplace/${r.id}`} className={styles.relatedCard}>
                    <img src={r.images[0]} alt={r.material} className={styles.relatedImg} />
                    <div className={styles.relatedInfo}>
                      <span className={styles.relatedName}>{r.material}</span>
                      <span className={styles.relatedPrice}>₹{r.price.toLocaleString('en-IN')} {r.priceUnit}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right */}
        <div className={styles.rightCol}>
          <div className={styles.card}>
            <div className={styles.titleRow}>
              <h1 className={styles.title}>{listing.material}</h1>
              {listing.sellerVerified && <span className={styles.verifiedBadge}><BadgeCheck size={14} /> Verified</span>}
            </div>
            <span className={styles.catBadge}>{listing.category}</span>
            <div className={styles.price}>₹{listing.price.toLocaleString('en-IN')}<span className={styles.priceUnit}> {listing.priceUnit}</span></div>

            <div className={styles.specsGrid}>
              {[
                { label: 'Grade', val: listing.grade },
                { label: 'Quantity', val: `${listing.quantity} ${listing.unit}` },
                { label: 'Location', val: `${listing.city}, ${listing.state}` },
                { label: 'Available', val: 'Immediate' },
              ].map(s => (
                <div key={s.label} className={styles.specItem}>
                  <span className={styles.specLabel}>{s.label}</span>
                  <span className={styles.specVal}>{s.val}</span>
                </div>
              ))}
            </div>

            <p className={styles.description}>{listing.description}</p>

            {/* Seller card */}
            <div className={styles.sellerCard}>
              <div className={styles.sellerAvatar}>{listing.sellerCompany.slice(0, 2).toUpperCase()}</div>
              <div className={styles.sellerInfo}>
                <div className={styles.sellerRow}>
                  <span className={styles.sellerName}>{listing.sellerName}</span>
                  {listing.sellerVerified && <BadgeCheck size={14} className={styles.verifiedIcon} />}
                </div>
                <span className={styles.sellerCompany}>{listing.sellerCompany}</span>
                <div className={styles.sellerStats}>
                  <Star size={13} className={styles.star} /> {listing.sellerRating}
                  <span className={styles.sellerDeals}>{listing.sellerDeals} deals</span>
                  <span className={styles.gstBadge}>GST ✓</span>
                </div>
              </div>
            </div>

            {/* Quote form */}
            {!quoteSent ? (
              <form className={styles.quoteForm} onSubmit={sendQuote}>
                <h3 className={styles.formTitle}>Request a Quote</h3>
                <div className={styles.field}>
                  <label className={styles.label}>Quantity Required</label>
                  <input className={styles.input} type="number" placeholder={`e.g. 5 ${listing.unit}`} value={quoteQty} onChange={e => setQuoteQty(e.target.value)} required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Message</label>
                  <textarea className={styles.textarea} rows={3} placeholder="Describe your requirements…" value={quoteMsg} onChange={e => setQuoteMsg(e.target.value)} />
                </div>
                <button type="submit" className={styles.quoteBtn}>Send Quote Request</button>
                <Link href="/dashboard/messages" className={styles.chatBtn}><MessageSquare size={16} /> Chat with Seller</Link>
              </form>
            ) : (
              <motion.div className={styles.quoteSent} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <span className={styles.quoteSentEmoji}>✅</span>
                <h3>Quote Request Sent!</h3>
                <p>The seller will respond within 24 hours.</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
