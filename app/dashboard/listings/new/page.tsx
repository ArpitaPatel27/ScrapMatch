'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Upload, TrendingUp } from 'lucide-react';
import styles from './page.module.css';

const MATERIAL_CATEGORIES = [
  { label: 'Metals', icon: '⚙️' }, { label: 'Plastics', icon: '♻️' }, { label: 'Paper', icon: '📄' },
  { label: 'Construction', icon: '🏗️' }, { label: 'Electronics', icon: '💻' }, { label: 'Chemicals', icon: '🧪' },
  { label: 'Textiles', icon: '🧵' }, { label: 'Automotive', icon: '🚗' }, { label: 'Agricultural', icon: '🌾' },
];

const INDIAN_STATES = ['Andhra Pradesh', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'];

const STEPS = ['Material Type', 'Specifications', 'Quantity', 'Location', 'Images', 'AI Pricing', 'Review'];

interface FormData {
  category: string; materialName: string; grade: string; description: string;
  quantity: string; unit: string; availableFrom: string;
  city: string; state: string; pincode: string;
  price: string;
}

const INITIAL: FormData = {
  category: '', materialName: '', grade: '', description: '',
  quantity: '', unit: 'Tonnes', availableFrom: '',
  city: '', state: '', pincode: '', price: '',
};

function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <motion.div className={styles.toast} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}>
      <Check size={16} /> {msg}
    </motion.div>
  );
}

export default function NewListingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [toast, setToast] = useState('');
  const hasStartedAnalysis = useRef(false);

  function update(key: keyof FormData, value: string) { setForm(prev => ({ ...prev, [key]: value })); }

  function canAdvance() {
    if (step === 1) return !!form.category;
    if (step === 2) return !!form.materialName && !!form.grade;
    if (step === 3) return !!form.quantity;
    if (step === 4) return !!form.city && !!form.state;
    return true;
  }

  function goNext() { if (canAdvance()) setStep(s => Math.min(s + 1, 7)); }
  function goBack() { setStep(s => Math.max(s - 1, 1)); }

  // Step 6: AI analysis simulation
  useEffect(() => {
    if (step === 6 && !analyzed && !hasStartedAnalysis.current) {
      hasStartedAnalysis.current = true;
      setAnalyzing(true);
      setTimeout(() => {
        setAnalyzing(false);
        setAnalyzed(true);
        if (!form.price) update('price', '34000');
      }, 1800);
    }
  }, [step, analyzed, form.price]);

  async function publish() {
    setPublishing(true);
    await new Promise(r => setTimeout(r, 1200));
    setPublishing(false);
    setToast('Listing published successfully!');
    setTimeout(() => router.push('/dashboard/listings'), 1500);
  }

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Add New Listing</h1>
        <p className={styles.pageSubtitle}>Step {step} of {STEPS.length}</p>
      </div>

      {/* Step progress */}
      <div className={styles.stepProgress}>
        {STEPS.map((s, i) => (
          <div key={i} className={`${styles.stepDot} ${i + 1 < step ? styles.stepDone : ''} ${i + 1 === step ? styles.stepCurrent : ''}`}>
            <div className={styles.stepDotInner}>
              {i + 1 < step ? <Check size={12} /> : <span>{i + 1}</span>}
            </div>
            <span className={styles.stepLabel}>{s}</span>
          </div>
        ))}
      </div>

      {/* Step card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step} className={styles.card}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.22 }}
        >
          {/* STEP 1 */}
          {step === 1 && (
            <div>
              <h2 className={styles.stepTitle}>Select Material Category</h2>
              <p className={styles.stepDesc}>Choose the type of material you want to list.</p>
              <div className={styles.categoryGrid}>
                {MATERIAL_CATEGORIES.map(cat => (
                  <button
                    key={cat.label}
                    className={`${styles.categoryCard} ${form.category === cat.label ? styles.categoryCardActive : ''}`}
                    onClick={() => update('category', cat.label)}
                  >
                    <span className={styles.categoryEmoji}>{cat.icon}</span>
                    <span className={styles.categoryLabel}>{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className={styles.formFields}>
              <h2 className={styles.stepTitle}>Grade &amp; Specifications</h2>
              <div className={styles.field}>
                <label className={styles.label}>Material Name *</label>
                <input className={styles.input} placeholder="e.g. Steel Offcuts IS2062" value={form.materialName} onChange={e => update('materialName', e.target.value)} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Grade *</label>
                <input className={styles.input} placeholder="e.g. IS2062 E250, Grade A Regrind" value={form.grade} onChange={e => update('grade', e.target.value)} />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Description</label>
                <textarea className={styles.textarea} rows={4} placeholder="Describe the material, condition, and any relevant specifications…" value={form.description} onChange={e => update('description', e.target.value)} />
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className={styles.formFields}>
              <h2 className={styles.stepTitle}>Quantity &amp; Availability</h2>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label}>Quantity *</label>
                  <input type="number" className={styles.input} placeholder="e.g. 14" value={form.quantity} onChange={e => update('quantity', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Unit</label>
                  <select className={styles.select} value={form.unit} onChange={e => update('unit', e.target.value)}>
                    {['kg', 'Tonnes', 'Litres', 'Units'].map(u => <option key={u}>{u}</option>)}
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Available From</label>
                <input type="date" className={styles.input} value={form.availableFrom} onChange={e => update('availableFrom', e.target.value)} />
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && (
            <div className={styles.formFields}>
              <h2 className={styles.stepTitle}>Location</h2>
              <div className={styles.fieldRow}>
                <div className={styles.field}>
                  <label className={styles.label}>City *</label>
                  <input className={styles.input} placeholder="e.g. Pune" value={form.city} onChange={e => update('city', e.target.value)} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>State *</label>
                  <select className={styles.select} value={form.state} onChange={e => update('state', e.target.value)}>
                    <option value="">Select state</option>
                    {INDIAN_STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Pincode</label>
                <input className={styles.input} placeholder="e.g. 411001" maxLength={6} value={form.pincode} onChange={e => update('pincode', e.target.value)} />
              </div>
            </div>
          )}

          {/* STEP 5 */}
          {step === 5 && (
            <div className={styles.formFields}>
              <h2 className={styles.stepTitle}>Upload Images</h2>
              <div className={styles.uploadArea}>
                <Upload size={36} className={styles.uploadIcon} />
                <p className={styles.uploadTitle}>Drag &amp; drop images here</p>
                <p className={styles.uploadSubtitle}>or click to browse (PNG, JPG, WEBP up to 10MB each)</p>
              </div>
              <div className={styles.imagePlaceholders}>
                {[1, 2, 3].map(n => (
                  <div key={n} className={styles.imagePlaceholder}>
                    <span className={styles.imagePlaceholderNum}>Image {n}</span>
                  </div>
                ))}
              </div>
              <div className={styles.uploadNote}>
                📋 Images will be uploaded after account verification by our team.
              </div>
            </div>
          )}

          {/* STEP 6 — AI Pricing */}
          {step === 6 && (
            <div className={styles.formFields}>
              <h2 className={styles.stepTitle}>AI Price Estimate</h2>
              {analyzing && (
                <div className={styles.analyzingWrap}>
                  <div className={styles.spinner} />
                  <p className={styles.analyzingText}>Analysing market data…</p>
                  <p className={styles.analyzingSubtext}>Checking 500+ recent transactions and live market indices.</p>
                </div>
              )}
              {analyzed && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                  <div className={styles.aiResults}>
                    <div className={styles.aiResultCard}>
                      <span className={styles.aiResultLabel}>Suggested Price Range</span>
                      <span className={styles.aiResultValue}>₹30,000 – ₹36,000 per Tonne</span>
                    </div>
                    <div className={styles.aiResultCard}>
                      <div className={styles.aiResultLabel}>Market Trend</div>
                      <div className={styles.aiTrend}><TrendingUp size={16} /> Rising (+4.2% this week)</div>
                    </div>
                    <div className={styles.aiResultCard}>
                      <span className={styles.aiResultLabel}>Comparable Listings</span>
                      <span className={styles.aiResultValue}>12 active</span>
                    </div>
                  </div>
                  <div className={styles.field} style={{ marginTop: 'var(--space-5)' }}>
                    <label className={styles.label}>Your Price (₹)</label>
                    <input type="number" className={styles.input} placeholder="Override AI suggestion" value={form.price} onChange={e => update('price', e.target.value)} />
                    <span className={styles.inputHint}>AI suggested: ₹34,000/Tonne</span>
                  </div>
                </motion.div>
              )}
            </div>
          )}

          {/* STEP 7 — Review */}
          {step === 7 && (
            <div className={styles.formFields}>
              <h2 className={styles.stepTitle}>Review &amp; Publish</h2>
              <p className={styles.stepDesc}>Review your listing details before publishing.</p>
              <div className={styles.reviewGrid}>
                {[
                  ['Category', form.category || '—'],
                  ['Material', form.materialName || '—'],
                  ['Grade', form.grade || '—'],
                  ['Quantity', form.quantity ? `${form.quantity} ${form.unit}` : '—'],
                  ['Location', form.city && form.state ? `${form.city}, ${form.state}` : '—'],
                  ['Price', form.price ? `₹${Number(form.price).toLocaleString('en-IN')}/Tonne` : '—'],
                  ['Available From', form.availableFrom || '—'],
                ].map(([k, v]) => (
                  <div key={k} className={styles.reviewRow}>
                    <span className={styles.reviewKey}>{k}</span>
                    <span className={styles.reviewVal}>{v}</span>
                  </div>
                ))}
                {form.description && (
                  <div className={`${styles.reviewRow} ${styles.reviewRowFull}`}>
                    <span className={styles.reviewKey}>Description</span>
                    <span className={styles.reviewVal}>{form.description}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className={styles.navBtns}>
            <button className={styles.backBtn} onClick={goBack} disabled={step === 1}>
              <ArrowLeft size={16} /> Back
            </button>
            {step < 7 ? (
              <button className={styles.nextBtn} onClick={goNext} disabled={!canAdvance()}>
                Next <ArrowRight size={16} />
              </button>
            ) : (
              <button className={styles.publishBtn} onClick={publish} disabled={publishing}>
                {publishing ? 'Publishing…' : 'Publish Listing'}
              </button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {toast && <Toast msg={toast} onClose={() => setToast('')} />}
      </AnimatePresence>
    </>
  );
}
