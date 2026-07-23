'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MapPin, Star, BadgeCheck, Bookmark, Search, X } from 'lucide-react';
import { MARKETPLACE_LISTINGS } from '@/lib/mock-data';
import styles from './page.module.css';

const CATS = ['Metals', 'Plastics', 'Paper', 'Construction', 'Electronics', 'Chemicals', 'Textiles', 'Automotive', 'Agricultural'];
const STATES = ['All States', 'Maharashtra', 'Gujarat', 'Karnataka', 'Tamil Nadu', 'Uttar Pradesh', 'Telangana', 'Punjab', 'Haryana', 'West Bengal', 'Chhattisgarh', 'Madhya Pradesh', 'Delhi', 'Rajasthan'];

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [state, setState] = useState('All States');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  function toggleCat(cat: string) {
    setSelectedCats(prev => prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]);
  }
  function toggleBookmark(id: string) {
    setBookmarks(prev => { const s = new Set(prev); s.has(id) ? s.delete(id) : s.add(id); return s; });
  }
  function clearFilters() { setSearch(''); setSelectedCats([]); setMinPrice(''); setMaxPrice(''); setState('All States'); setVerifiedOnly(false); }

  const filtered = useMemo(() => {
    return MARKETPLACE_LISTINGS.filter(l => {
      if (search && !l.material.toLowerCase().includes(search.toLowerCase()) && !l.category.toLowerCase().includes(search.toLowerCase())) return false;
      if (selectedCats.length > 0 && !selectedCats.includes(l.category)) return false;
      if (minPrice && l.price < Number(minPrice)) return false;
      if (maxPrice && l.price > Number(maxPrice)) return false;
      if (state !== 'All States' && l.state !== state) return false;
      if (verifiedOnly && !l.sellerVerified) return false;
      return true;
    });
  }, [search, selectedCats, minPrice, maxPrice, state, verifiedOnly]);

  return (
    <>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Buy Materials</h1>
          <p className={styles.pageSubtitle}>{filtered.length} materials available</p>
        </div>
      </div>

      <div className={styles.layout}>
        {/* Sidebar Filters */}
        <aside className={styles.filterSidebar}>
          <div className={styles.filterHeader}>
            <span className={styles.filterTitle}>Filters</span>
            <button className={styles.clearBtn} onClick={clearFilters}><X size={14} /> Clear</button>
          </div>

          <div className={styles.filterSection}>
            <div className={styles.searchWrap}>
              <Search size={15} className={styles.searchIcon} />
              <input className={styles.searchInput} placeholder="Search materials…" value={search} onChange={e => setSearch(e.target.value)} />
            </div>
          </div>

          <div className={styles.filterSection}>
            <p className={styles.filterSectionTitle}>Category</p>
            {CATS.map(cat => (
              <label key={cat} className={styles.checkLabel}>
                <input type="checkbox" className={styles.checkbox} checked={selectedCats.includes(cat)} onChange={() => toggleCat(cat)} />
                <span>{cat}</span>
              </label>
            ))}
          </div>

          <div className={styles.filterSection}>
            <p className={styles.filterSectionTitle}>Price Range (₹/unit)</p>
            <div className={styles.priceRow}>
              <input className={styles.priceInput} type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} />
              <span className={styles.priceDash}>–</span>
              <input className={styles.priceInput} type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
            </div>
          </div>

          <div className={styles.filterSection}>
            <p className={styles.filterSectionTitle}>Location</p>
            <select className={styles.filterSelect} value={state} onChange={e => setState(e.target.value)}>
              {STATES.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>

          <div className={styles.filterSection}>
            <label className={styles.checkLabel}>
              <input type="checkbox" className={styles.checkbox} checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)} />
              <span>Verified sellers only</span>
            </label>
          </div>
        </aside>

        {/* Cards grid */}
        <div className={styles.cardsArea}>
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyTitle}>No materials found</p>
              <button className={styles.clearBtn2} onClick={clearFilters}>Clear filters</button>
            </div>
          ) : (
            <div className={styles.grid}>
              {filtered.map((listing, i) => (
                <motion.div
                  key={listing.id} className={styles.card}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.3 }}
                  whileHover={{ translateY: -3, boxShadow: 'var(--shadow-lg)' }}
                >
                  <Link href={`/dashboard/marketplace/${listing.id}`} className={styles.cardLink}>
                    <div className={styles.cardImgWrap}>
                      <img src={listing.images[0]} alt={listing.material} className={styles.cardImg} />
                      <span className={styles.catBadge}>{listing.category}</span>
                    </div>
                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle}>{listing.material}</h3>
                      <p className={styles.cardMeta}>{listing.grade} · {listing.quantity} {listing.unit}</p>
                      <div className={styles.cardPrice}>
                        ₹{listing.price.toLocaleString('en-IN')}
                        <span className={styles.cardPriceUnit}> {listing.priceUnit}</span>
                      </div>
                      <div className={styles.cardLocation}>
                        <MapPin size={13} /> {listing.city}, {listing.state}
                      </div>
                      <div className={styles.sellerRow}>
                        <div className={styles.sellerAvatar}>{listing.sellerCompany.slice(0, 2).toUpperCase()}</div>
                        <div className={styles.sellerInfo}>
                          <span className={styles.sellerCompany}>{listing.sellerCompany}</span>
                          <div className={styles.sellerMeta}>
                            {listing.sellerVerified && <BadgeCheck size={13} className={styles.verifiedIcon} />}
                            <Star size={12} className={styles.starIcon} />
                            <span className={styles.sellerRating}>{listing.sellerRating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className={styles.cardFooter}>
                    <Link href={`/dashboard/marketplace/${listing.id}`} className={styles.quoteBtn}>Request Quote</Link>
                    <button
                      className={`${styles.bookmarkBtn} ${bookmarks.has(listing.id) ? styles.bookmarkActive : ''}`}
                      onClick={() => toggleBookmark(listing.id)} aria-label="Bookmark"
                    >
                      <Bookmark size={16} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
