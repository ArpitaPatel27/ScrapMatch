'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Eye, EyeOff } from 'lucide-react';
import styles from './page.module.css';

const TABS = ['Profile', 'Company', 'Verification', 'Password', 'Notifications', 'Privacy', 'Billing', 'Delete Account'];

function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <motion.div className={styles.toast} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}>
      <Check size={16} /> {msg}
    </motion.div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <button role="switch" aria-checked={checked} className={`${styles.toggle} ${checked ? styles.toggleOn : ''}`} onClick={() => onChange(!checked)}>
      <span className={styles.toggleThumb} />
    </button>
  );
}

export default function SettingsPage() {
  const [tab, setTab] = useState('Profile');
  const [toast, setToast] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [notifs, setNotifs] = useState({ inquiry: true, price: true, deal: true, weekly: false, marketing: false });
  const [privacy, setPrivacy] = useState({ publicDir: true, directContact: true });
  const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
  const [pwError, setPwError] = useState('');

  function showToast(msg: string) { setToast(msg); }

  function handlePwChange(e: React.FormEvent) {
    e.preventDefault();
    if (pwForm.newPw !== pwForm.confirm) { setPwError('New passwords do not match.'); return; }
    if (pwForm.newPw.length < 8) { setPwError('Password must be at least 8 characters.'); return; }
    setPwError('');
    showToast('Password changed successfully!');
    setPwForm({ current: '', newPw: '', confirm: '' });
  }

  function pwStrength(pw: string) {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  }

  const strength = pwStrength(pwForm.newPw);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', 'var(--color-danger)', 'var(--color-warning)', 'var(--color-accent)', 'var(--color-success)'][strength];

  return (
    <>
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>Settings</h1>
      </div>

      <div className={styles.layout}>
        {/* Tab nav */}
        <nav className={styles.tabNav}>
          {TABS.map(t => (
            <button
              key={t}
              className={`${styles.tabBtn} ${tab === t ? styles.tabBtnActive : ''} ${t === 'Delete Account' ? styles.tabBtnDanger : ''}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </nav>

        {/* Tab content */}
        <div className={styles.tabContent}>
          {/* PROFILE */}
          {tab === 'Profile' && (
            <form className={styles.form} onSubmit={e => { e.preventDefault(); showToast('Profile saved!'); }}>
              <h2 className={styles.sectionTitle}>Profile Settings</h2>
              <div className={styles.photoRow}>
                <div className={styles.photoAvatar}>RS</div>
                <button type="button" className={styles.uploadPhotoBtn}>Upload Photo</button>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.field}><label className={styles.label}>Full Name</label><input className={styles.input} defaultValue="Rahul Sharma" /></div>
                <div className={styles.field}><label className={styles.label}>Email</label><input className={styles.input} type="email" defaultValue="rahul@techmanufacturing.in" /></div>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.field}><label className={styles.label}>Phone</label><input className={styles.input} defaultValue="+91 98765 43210" /></div>
                <div className={styles.field}><label className={styles.label}>Designation</label><input className={styles.input} defaultValue="Materials Manager" /></div>
              </div>
              <button type="submit" className={styles.saveBtn}>Save Changes</button>
            </form>
          )}

          {/* COMPANY */}
          {tab === 'Company' && (
            <form className={styles.form} onSubmit={e => { e.preventDefault(); showToast('Company info saved!'); }}>
              <h2 className={styles.sectionTitle}>Company Details</h2>
              <div className={styles.field}><label className={styles.label}>Company Name</label><input className={styles.input} defaultValue="Tech Manufacturing Ltd." /></div>
              <div className={styles.fieldRow}>
                <div className={styles.field}><label className={styles.label}>Business Type</label>
                  <select className={styles.select}><option>Manufacturer</option><option>Trader</option><option>Recycler</option><option>Waste Generator</option></select>
                </div>
                <div className={styles.field}><label className={styles.label}>Industry</label><input className={styles.input} defaultValue="Automotive Components" /></div>
              </div>
              <div className={styles.fieldRow}>
                <div className={styles.field}><label className={styles.label}>Company Size</label>
                  <select className={styles.select}><option>1–10</option><option>11–50</option><option selected>51–200</option><option>200+</option></select>
                </div>
                <div className={styles.field}><label className={styles.label}>Website</label><input className={styles.input} defaultValue="https://techmanufacturing.in" /></div>
              </div>
              <div className={styles.field}><label className={styles.label}>Address</label><input className={styles.input} defaultValue="Plot 14, MIDC Industrial Area, Pimpri" /></div>
              <div className={styles.fieldRow}>
                <div className={styles.field}><label className={styles.label}>City</label><input className={styles.input} defaultValue="Pune" /></div>
                <div className={styles.field}><label className={styles.label}>State</label><input className={styles.input} defaultValue="Maharashtra" /></div>
                <div className={styles.field}><label className={styles.label}>Pincode</label><input className={styles.input} defaultValue="411018" /></div>
              </div>
              <button type="submit" className={styles.saveBtn}>Save Changes</button>
            </form>
          )}

          {/* VERIFICATION */}
          {tab === 'Verification' && (
            <div className={styles.form}>
              <h2 className={styles.sectionTitle}>Business Verification</h2>
              <div className={styles.verifyRow}>
                <div className={styles.field} style={{ flex: 1 }}><label className={styles.label}>GST Number</label><input className={styles.input} defaultValue="27AABCT3518Q1ZV" /></div>
                <button className={styles.verifyBtn} onClick={() => showToast('GST verification initiated!')}>Verify</button>
                <span className={styles.verifiedBadge}>✅ Verified</span>
              </div>
              <div className={styles.uploadDocArea}>
                <p className={styles.uploadDocTitle}>Upload Documents</p>
                <p className={styles.uploadDocSub}>PAN Card, COI, GST Certificate, PCB Authorisation</p>
                <button className={styles.uploadDocBtn} onClick={() => showToast('Document upload coming soon!')}>Upload Documents</button>
              </div>
              <div className={styles.complianceRow}>
                <span className={styles.complianceLabel}>PCB Compliance Status</span>
                <span className={styles.complianceStatus}>🔄 Under Review</span>
              </div>
            </div>
          )}

          {/* PASSWORD */}
          {tab === 'Password' && (
            <form className={styles.form} onSubmit={handlePwChange}>
              <h2 className={styles.sectionTitle}>Change Password</h2>
              <div className={styles.field}>
                <label className={styles.label}>Current Password</label>
                <div className={styles.pwWrap}>
                  <input className={styles.input} type={showPw ? 'text' : 'password'} value={pwForm.current} onChange={e => setPwForm(p => ({ ...p, current: e.target.value }))} />
                  <button type="button" className={styles.eyeBtn} onClick={() => setShowPw(p => !p)}>{showPw ? <EyeOff size={16} /> : <Eye size={16} />}</button>
                </div>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>New Password</label>
                <input className={styles.input} type="password" value={pwForm.newPw} onChange={e => setPwForm(p => ({ ...p, newPw: e.target.value }))} />
                {pwForm.newPw && (
                  <div className={styles.strengthBar}>
                    <div className={styles.strengthFill} style={{ width: `${strength * 25}%`, background: strengthColor }} />
                  </div>
                )}
                {pwForm.newPw && <span className={styles.strengthLabel} style={{ color: strengthColor }}>{strengthLabel}</span>}
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Confirm New Password</label>
                <input className={styles.input} type="password" value={pwForm.confirm} onChange={e => setPwForm(p => ({ ...p, confirm: e.target.value }))} />
              </div>
              {pwError && <p className={styles.errorMsg}>{pwError}</p>}
              <button type="submit" className={styles.saveBtn}>Change Password</button>
            </form>
          )}

          {/* NOTIFICATIONS */}
          {tab === 'Notifications' && (
            <div className={styles.form}>
              <h2 className={styles.sectionTitle}>Notification Preferences</h2>
              {[
                { key: 'inquiry' as const, label: 'New Buyer Inquiry', desc: 'When a buyer sends an inquiry about your listing' },
                { key: 'price' as const, label: 'Price Alerts', desc: 'When market prices change significantly for your materials' },
                { key: 'deal' as const, label: 'Deal Updates', desc: 'Status updates on your ongoing deals and negotiations' },
                { key: 'weekly' as const, label: 'Weekly Market Report', desc: 'Summary of market activity every Monday morning' },
                { key: 'marketing' as const, label: 'Marketing Emails', desc: 'Product updates, tips, and promotional offers' },
              ].map(n => (
                <div key={n.key} className={styles.notifRow}>
                  <div>
                    <p className={styles.notifLabel}>{n.label}</p>
                    <p className={styles.notifDesc}>{n.desc}</p>
                  </div>
                  <Toggle checked={notifs[n.key]} onChange={v => { setNotifs(p => ({ ...p, [n.key]: v })); showToast('Preference saved!'); }} />
                </div>
              ))}
            </div>
          )}

          {/* PRIVACY */}
          {tab === 'Privacy' && (
            <div className={styles.form}>
              <h2 className={styles.sectionTitle}>Privacy Settings</h2>
              <div className={styles.notifRow}>
                <div>
                  <p className={styles.notifLabel}>Show company in public directory</p>
                  <p className={styles.notifDesc}>Allow buyers to discover your company on the marketplace.</p>
                </div>
                <Toggle checked={privacy.publicDir} onChange={v => setPrivacy(p => ({ ...p, publicDir: v }))} />
              </div>
              <div className={styles.notifRow}>
                <div>
                  <p className={styles.notifLabel}>Allow buyers to contact directly</p>
                  <p className={styles.notifDesc}>Buyers can message you directly without going through a listing.</p>
                </div>
                <Toggle checked={privacy.directContact} onChange={v => setPrivacy(p => ({ ...p, directContact: v }))} />
              </div>
              <button className={styles.exportDataBtn} onClick={() => showToast('Data export request submitted!')}>
                Export My Data
              </button>
            </div>
          )}

          {/* BILLING */}
          {tab === 'Billing' && (
            <div className={styles.form}>
              <h2 className={styles.sectionTitle}>Billing & Subscription</h2>
              <div className={styles.planCard}>
                <div className={styles.planInfo}>
                  <span className={styles.planName}>Starter Plan</span>
                  <span className={styles.planPrice}>Free</span>
                  <span className={styles.planDesc}>Up to 5 active listings, basic matching, email support.</span>
                </div>
                <span className={styles.planBadge}>Current Plan</span>
              </div>
              <div className={styles.upgradeBanner}>
                <div>
                  <p className={styles.upgradeTitle}>Upgrade to Professional</p>
                  <p className={styles.upgradeDesc}>Unlimited listings, AI-powered matching, priority support, advanced ESG reports and verified seller badge.</p>
                </div>
                <button className={styles.upgradeNowBtn} onClick={() => showToast('Upgrade feature coming soon!')}>Upgrade — ₹2,999/mo</button>
              </div>
              <div className={styles.paymentPlaceholder}>
                <p className={styles.paymentTitle}>Payment Method</p>
                <p className={styles.paymentEmpty}>No payment method added. Add one when upgrading to a paid plan.</p>
              </div>
            </div>
          )}

          {/* DELETE ACCOUNT */}
          {tab === 'Delete Account' && (
            <div className={styles.form}>
              <h2 className={`${styles.sectionTitle} ${styles.dangerTitle}`}>Delete Account</h2>
              <div className={styles.dangerZone}>
                <p className={styles.dangerText}>
                  ⚠️ This action is <strong>permanent and irreversible</strong>. All your listings, messages, and transaction history will be permanently deleted. Your company profile will be removed from the marketplace.
                </p>
                <p className={styles.dangerText}>
                  Please make sure you have exported any data you need before proceeding.
                </p>
                <button className={styles.deleteAccountBtn} onClick={() => setDeleteModal(true)}>
                  Delete My Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      {deleteModal && (
        <div className={styles.modalOverlay}>
          <motion.div className={styles.modal} initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <h3 className={styles.modalTitle}>Are you absolutely sure?</h3>
            <p className={styles.modalDesc}>This will permanently delete your account and all associated data. This cannot be undone.</p>
            <div className={styles.modalActions}>
              <button className={styles.modalCancel} onClick={() => setDeleteModal(false)}>Cancel</button>
              <button className={styles.modalDelete} onClick={() => { setDeleteModal(false); showToast('Account deletion requested.'); }}>Yes, Delete Account</button>
            </div>
          </motion.div>
        </div>
      )}

      <AnimatePresence>{toast && <Toast msg={toast} onClose={() => setToast('')} />}</AnimatePresence>
    </>
  );
}
