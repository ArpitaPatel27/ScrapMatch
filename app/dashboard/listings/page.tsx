'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Search, Eye, Edit2, Pause, Play, Trash2, Package } from 'lucide-react';
import { LISTINGS, Listing } from '@/lib/mock-data';
import styles from './page.module.css';

const CATEGORIES = ['All', 'Metals', 'Plastics', 'Paper', 'Construction', 'Electronics', 'Chemicals', 'Textiles', 'Automotive'];
const STATUSES = ['All', 'Active', 'Pending', 'Matched', 'Sold', 'Paused'];
const SORTS = ['Newest', 'Oldest', 'Price High-Low', 'Price Low-High'];

const STATUS_STYLE: Record<string, string> = {
  active: styles.badgeActive, pending: styles.badgePending, matched: styles.badgeMatched,
  sold: styles.badgeSold, paused: styles.badgePaused,
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export default function ListingsPage() {
  const [listings, setListings] = useState<Listing[]>(LISTINGS);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [sort, setSort] = useState('Newest');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let arr = [...listings];
    if (search) {
      const q = search.toLowerCase();
      arr = arr.filter(l => l.material.toLowerCase().includes(q) || l.category.toLowerCase().includes(q) || l.location.toLowerCase().includes(q));
    }
    if (category !== 'All') arr = arr.filter(l => l.category === category);
    if (status !== 'All') arr = arr.filter(l => l.status === status.toLowerCase());
    if (sort === 'Newest') arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    else if (sort === 'Oldest') arr.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    else if (sort === 'Price High-Low') arr.sort((a, b) => b.price - a.price);
    else if (sort === 'Price Low-High') arr.sort((a, b) => a.price - b.price);
    return arr;
  }, [listings, search, category, status, sort]);

  function togglePause(id: string) {
    setListings(prev => prev.map(l => l.id === id
      ? { ...l, status: l.status === 'paused' ? 'active' : 'paused' } : l));
  }

  function confirmDelete(id: string) { setDeleteId(id); }
  function doDelete() {
    if (deleteId) setListings(prev => prev.filter(l => l.id !== deleteId));
    setDeleteId(null);
  }

  return (
    <>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>My Listings</h1>
          <p className={styles.pageSubtitle}>{listings.length} listings total · {listings.filter(l => l.status === 'active').length} active</p>
        </div>
        <Link href="/dashboard/listings/new" className={styles.addBtn}>
          <Plus size={18} /> Add Listing
        </Link>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <Search size={16} className={styles.searchIcon} />
          <input
            className={styles.searchInput} placeholder="Search listings…"
            value={search} onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className={styles.select} value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <select className={styles.select} value={status} onChange={e => setStatus(e.target.value)}>
          {STATUSES.map(s => <option key={s}>{s}</option>)}
        </select>
        <select className={styles.select} value={sort} onChange={e => setSort(e.target.value)}>
          {SORTS.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className={styles.emptyState}>
          <Package size={48} className={styles.emptyIcon} />
          <p className={styles.emptyTitle}>No listings found</p>
          <p className={styles.emptyDesc}>Try adjusting your filters or add a new listing.</p>
          <Link href="/dashboard/listings/new" className={styles.emptyBtn}>Add your first listing</Link>
        </div>
      ) : (
        <motion.div className={styles.tableCard} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className={styles.tableScroll}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHead}>
                  <th>Material</th>
                  <th>Grade / Qty</th>
                  <th>Location</th>
                  <th>Price</th>
                  <th>Buyers</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((listing) => (
                  <tr key={listing.id} className={styles.tableRow}>
                    <td className={styles.materialCell}>
                      <span className={styles.materialName}>{listing.material}</span>
                      <span className={styles.categoryBadge}>{listing.category}</span>
                    </td>
                    <td>
                      <span className={styles.cellPrimary}>{listing.grade}</span>
                      <span className={styles.cellSub}>{listing.quantity} {listing.unit}</span>
                    </td>
                    <td><span className={styles.cellSub}>{listing.city}, {listing.state}</span></td>
                    <td>
                      <span className={styles.cellPrimary}>₹{listing.price.toLocaleString('en-IN')}</span>
                      <span className={styles.cellSub}>{listing.priceUnit}</span>
                    </td>
                    <td>
                      <div className={styles.buyerInterest}>
                        <Eye size={13} /> {listing.buyerInterest}
                      </div>
                    </td>
                    <td>
                      <span className={`${styles.badge} ${STATUS_STYLE[listing.status]}`}>
                        {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                      </span>
                    </td>
                    <td><span className={styles.cellSub}>{formatDate(listing.createdAt)}</span></td>
                    <td>
                      <div className={styles.actions}>
                        <Link href={`/dashboard/listings/${listing.id}`} className={styles.actionBtn} title="View">
                          <Eye size={15} />
                        </Link>
                        <Link href={`/dashboard/listings/${listing.id}/edit`} className={styles.actionBtn} title="Edit">
                          <Edit2 size={15} />
                        </Link>
                        <button className={styles.actionBtn} title={listing.status === 'paused' ? 'Activate' : 'Pause'} onClick={() => togglePause(listing.id)}>
                          {listing.status === 'paused' ? <Play size={15} /> : <Pause size={15} />}
                        </button>
                        <button className={`${styles.actionBtn} ${styles.actionBtnDanger}`} title="Delete" onClick={() => confirmDelete(listing.id)}>
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Delete confirm modal */}
      {deleteId && (
        <div className={styles.modalOverlay}>
          <motion.div className={styles.modal} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <h3 className={styles.modalTitle}>Delete Listing?</h3>
            <p className={styles.modalDesc}>This action cannot be undone. The listing will be permanently removed.</p>
            <div className={styles.modalActions}>
              <button className={styles.modalCancel} onClick={() => setDeleteId(null)}>Cancel</button>
              <button className={styles.modalDelete} onClick={doDelete}>Delete</button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
