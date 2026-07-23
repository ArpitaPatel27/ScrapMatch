'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Edit2, Trash2, Eye, MapPin, Package, X, MessageSquare } from 'lucide-react';
import { LISTINGS } from '@/lib/mock-data';
import styles from './page.module.css';

const STATUS_STYLE: Record<string, string> = {
  active: styles.badgeActive, pending: styles.badgePending, matched: styles.badgeMatched,
  sold: styles.badgeSold, paused: styles.badgePaused,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
}

const MOCK_INQUIRIES = [
  { name: 'Vikram Joshi', company: 'Joshi Steel Works', message: 'Hi, I am very interested in this material. Can you share a test certificate and confirm availability?', time: '2 hours ago', initials: 'VJ' },
  { name: 'Nisha Patel', company: 'Patel Recyclers', message: 'What is the minimum order quantity? We need approximately 5 tonnes urgently.', time: '5 hours ago', initials: 'NP' },
];

export default function ListingDetailPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const listing = LISTINGS.find(l => l.id === id);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState(0);

  if (!listing) {
    return (
      <div className={styles.notFound}>
        <Package size={48} className={styles.notFoundIcon} />
        <h2>Listing not found</h2>
        <Link href="/dashboard/listings" className={styles.backLink}>← Back to Listings</Link>
      </div>
    );
  }

  return (
    <>
      {/* Back + actions */}
      <div className={styles.topBar}>
        <Link href="/dashboard/listings" className={styles.backBtn}><ArrowLeft size={16} /> Back to Listings</Link>
        <div className={styles.topActions}>
          <Link href={`/dashboard/listings/${listing.id}/edit`} className={styles.editBtn}><Edit2 size={15} /> Edit</Link>
          <button className={styles.deleteBtn}><Trash2 size={15} /> Delete</button>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Left col */}
        <div className={styles.leftCol}>
          {/* Image gallery */}
          <div className={styles.galleryCard}>
            <div className={styles.mainImageWrap} onClick={() => setLightboxImg(listing.images[activeImg])}>
              <img src={listing.images[activeImg]} alt={listing.material} className={styles.mainImage} />
              <span className={styles.zoomHint}>Click to enlarge</span>
            </div>
            <div className={styles.thumbnails}>
              {listing.images.map((img, i) => (
                <button key={i} className={`${styles.thumb} ${i === activeImg ? styles.thumbActive : ''}`} onClick={() => setActiveImg(i)}>
                  <img src={img} alt={`${listing.material} ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Inquiries */}
          <div className={styles.card}>
            <h3 className={styles.cardTitle}><MessageSquare size={18} /> Messages from Buyers</h3>
            <div className={styles.inquiries}>
              {MOCK_INQUIRIES.map((inq, i) => (
                <div key={i} className={styles.inquiryItem}>
                  <div className={styles.inquiryAvatar}>{inq.initials}</div>
                  <div className={styles.inquiryBody}>
                    <div className={styles.inquiryHeader}>
                      <span className={styles.inquiryName}>{inq.name}</span>
                      <span className={styles.inquiryCompany}>{inq.company}</span>
                      <span className={styles.inquiryTime}>{inq.time}</span>
                    </div>
                    <p className={styles.inquiryMsg}>{inq.message}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/messages" className={styles.viewAllMsgs}>View all messages →</Link>
          </div>
        </div>

        {/* Right col */}
        <div className={styles.rightCol}>
          <div className={styles.card}>
            <div className={styles.detailHeader}>
              <div className={styles.detailTitleRow}>
                <h1 className={styles.detailTitle}>{listing.material}</h1>
                <span className={`${styles.badge} ${STATUS_STYLE[listing.status]}`}>
                  {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                </span>
              </div>
              <div className={styles.detailMeta}>
                <span className={styles.categoryBadge}>{listing.category}</span>
                <span className={styles.gradeBadge}>{listing.grade}</span>
              </div>
            </div>

            <p className={styles.description}>{listing.description}</p>

            {/* Specs grid */}
            <div className={styles.specsGrid}>
              <div className={styles.specItem}>
                <Package size={16} className={styles.specIcon} />
                <div>
                  <span className={styles.specLabel}>Quantity</span>
                  <span className={styles.specValue}>{listing.quantity} {listing.unit}</span>
                </div>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specIcon}>₹</span>
                <div>
                  <span className={styles.specLabel}>Price</span>
                  <span className={styles.specValue}>₹{listing.price.toLocaleString('en-IN')} {listing.priceUnit}</span>
                </div>
              </div>
              <div className={styles.specItem}>
                <MapPin size={16} className={styles.specIcon} />
                <div>
                  <span className={styles.specLabel}>Location</span>
                  <span className={styles.specValue}>{listing.city}, {listing.state}</span>
                </div>
              </div>
            </div>

            {/* Buyer interest */}
            <div className={styles.buyerRow}>
              <Eye size={16} />
              <span><strong>{listing.buyerInterest}</strong> buyers interested</span>
            </div>

            <div className={styles.dateRow}>
              <span className={styles.dateLabel}>Listed on</span>
              <span className={styles.dateVal}>{formatDate(listing.createdAt)}</span>
            </div>

            {/* Action buttons */}
            <div className={styles.actionBtns}>
              <Link href={`/dashboard/listings/${listing.id}/edit`} className={styles.btnPrimary}>Edit Listing</Link>
              <button className={styles.btnSecondary}>Pause Listing</button>
              <button className={styles.btnSuccess}>Mark as Sold</button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div
            className={styles.lightboxOverlay}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightboxImg(null)}
          >
            <button className={styles.lightboxClose} onClick={() => setLightboxImg(null)}><X size={24} /></button>
            <motion.img
              src={lightboxImg} alt="Enlarged view" className={styles.lightboxImg}
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
