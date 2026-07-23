'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { LISTINGS } from '@/lib/mock-data';
import styles from './page.module.css';

export default function EditListingPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : '';
  const listing = LISTINGS.find(l => l.id === id);

  if (!listing) {
    return (
      <div className={styles.notFound}>
        <h2>Listing not found</h2>
        <Link href="/dashboard/listings" className={styles.backLink}>← Back to Listings</Link>
      </div>
    );
  }

  return (
    <>
      <div className={styles.topBar}>
        <Link href={`/dashboard/listings/${id}`} className={styles.backBtn}>
          <ArrowLeft size={16} /> Back to Listing
        </Link>
      </div>
      <div className={styles.card}>
        <h1 className={styles.title}>Edit Listing</h1>
        <p className={styles.subtitle}>Update the details for: <strong>{listing.material}</strong></p>
        <form className={styles.form} onSubmit={e => { e.preventDefault(); window.history.back(); }}>
          <div className={styles.field}>
            <label className={styles.label}>Material Name</label>
            <input className={styles.input} defaultValue={listing.material} />
          </div>
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label className={styles.label}>Grade</label>
              <input className={styles.input} defaultValue={listing.grade} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Category</label>
              <input className={styles.input} defaultValue={listing.category} />
            </div>
          </div>
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label className={styles.label}>Quantity</label>
              <input type="number" className={styles.input} defaultValue={listing.quantity} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Unit</label>
              <input className={styles.input} defaultValue={listing.unit} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Price (₹)</label>
              <input type="number" className={styles.input} defaultValue={listing.price} />
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <textarea className={styles.textarea} rows={4} defaultValue={listing.description} />
          </div>
          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label className={styles.label}>City</label>
              <input className={styles.input} defaultValue={listing.city} />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>State</label>
              <input className={styles.input} defaultValue={listing.state} />
            </div>
          </div>
          <div className={styles.formActions}>
            <Link href={`/dashboard/listings/${id}`} className={styles.cancelBtn}>Cancel</Link>
            <button type="submit" className={styles.saveBtn}>Save Changes</button>
          </div>
        </form>
      </div>
    </>
  );
}
