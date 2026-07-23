'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap,
  Check,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import styles from './page.module.css';

/* ── PASSWORD STRENGTH ─────────────────────────────────────── */
type Requirement = { label: string; test: (p: string) => boolean };
const REQUIREMENTS: Requirement[] = [
  { label: 'At least 8 characters', test: (p) => p.length >= 8 },
  { label: 'Uppercase letter', test: (p) => /[A-Z]/.test(p) },
  { label: 'Lowercase letter', test: (p) => /[a-z]/.test(p) },
  { label: 'Number', test: (p) => /\d/.test(p) },
  { label: 'Special character', test: (p) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(p) },
];

/* ── FIELD TYPES ───────────────────────────────────────────── */
interface Step1Fields {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface Step2Fields {
  companyName: string;
  businessType: string;
  industry: string;
  companySize: string;
  city: string;
  state: string;
  gst: string;
}

const INDIAN_STATES = [
  'Maharashtra', 'Gujarat', 'Rajasthan', 'Tamil Nadu', 'Karnataka',
  'Uttar Pradesh', 'Telangana', 'Punjab', 'West Bengal', 'Delhi', 'Other',
];

const STEP_LABELS = [
  { title: 'Your Account', desc: 'Email, password & contact' },
  { title: 'Business Details', desc: 'Company information' },
  { title: 'Complete', desc: 'Account ready' },
];

/* ── MAIN COMPONENT ────────────────────────────────────────── */
export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ── Step 1 state ── */
  const [s1, setS1] = useState<Step1Fields>({
    fullName: '', email: '', phone: '', password: '', confirmPassword: '',
  });
  const [e1, setE1] = useState<Partial<Step1Fields>>({});
  const [shake1, setShake1] = useState(false);

  /* ── Step 2 state ── */
  const [s2, setS2] = useState<Step2Fields>({
    companyName: '', businessType: '', industry: '', companySize: '', city: '', state: '', gst: '',
  });
  const [e2, setE2] = useState<Partial<Step2Fields>>({});
  const [shake2, setShake2] = useState(false);

  /* ── Password strength ── */
  const pwResults = useMemo(
    () => REQUIREMENTS.map((r) => r.test(s1.password)),
    [s1.password]
  );
  const pwScore = pwResults.filter(Boolean).length;
  const pwColor =
    pwScore <= 1 ? 'var(--color-danger)' :
    pwScore <= 3 ? 'var(--color-warning)' :
    'var(--color-success)';

  /* ── Validate step 1 ── */
  const validateStep1 = () => {
    const errs: Partial<Step1Fields> = {};
    if (!s1.fullName.trim()) errs.fullName = 'Full name is required';
    if (!s1.email.trim()) errs.email = 'Business email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s1.email)) errs.email = 'Enter a valid email';
    if (!s1.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(s1.phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid 10-digit Indian number';
    if (pwScore < 5) errs.password = 'Password must meet all requirements';
    if (!s1.confirmPassword) errs.confirmPassword = 'Please confirm your password';
    else if (s1.confirmPassword !== s1.password) errs.confirmPassword = 'Passwords do not match';
    return errs;
  };

  const handleStep1Continue = () => {
    const errs = validateStep1();
    if (Object.keys(errs).length > 0) {
      setE1(errs);
      setShake1(true);
      setTimeout(() => setShake1(false), 600);
      return;
    }
    setE1({});
    setStep(2);
  };

  /* ── Validate step 2 ── */
  const validateStep2 = () => {
    const errs: Partial<Step2Fields> = {};
    if (!s2.companyName.trim()) errs.companyName = 'Company name is required';
    if (!s2.businessType) errs.businessType = 'Please select a business type';
    if (!s2.industry) errs.industry = 'Please select an industry';
    if (!s2.companySize) errs.companySize = 'Please select company size';
    if (!s2.city.trim()) errs.city = 'City is required';
    if (!s2.state) errs.state = 'Please select a state';
    return errs;
  };

  const handleStep2Submit = async () => {
    const errs = validateStep2();
    if (Object.keys(errs).length > 0) {
      setE2(errs);
      setShake2(true);
      setTimeout(() => setShake2(false), 600);
      return;
    }
    setE2({});
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    setStep(3);
  };

  /* ── Helpers ── */
  const f1 = (k: keyof Step1Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setS1((p) => ({ ...p, [k]: e.target.value }));
    if (e1[k]) setE1((p) => ({ ...p, [k]: undefined }));
  };
  const f2text = (k: keyof Step2Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setS2((p) => ({ ...p, [k]: e.target.value }));
    if (e2[k]) setE2((p) => ({ ...p, [k]: undefined }));
  };
  const f2sel = (k: keyof Step2Fields) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setS2((p) => ({ ...p, [k]: e.target.value }));
    if (e2[k]) setE2((p) => ({ ...p, [k]: undefined }));
  };

  const shakeClass = (shake: boolean, hasErr: boolean) =>
    shake && hasErr ? styles.shake : '';

  /* ── STEP TRANSITIONS ── */
  const variants = {
    enter: (dir: number) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir: number) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  };

  const [direction, setDirection] = useState(1);
  const goNext = () => { setDirection(1); };
  const goBack = () => { setDirection(-1); setStep((s) => s - 1); };

  return (
    <div className={styles.container}>
      {/* ── LEFT PANEL ──────────────────────────────────────── */}
      <div className={styles.leftPanel}>
        {/* Background industrial image */}
        <div className={styles.leftBgImage}>
          <Image
            src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=900&q=75&auto=format&fit=crop"
            alt="Industrial manufacturing and circular economy"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes="42vw"
            priority
          />
          <div className={styles.leftBgOverlay} />
        </div>
        <div className={styles.leftInner}>
          {/* Logo */}
          <div className={styles.logo}>
            <div className={styles.logoIcon}><Zap size={20} fill="currentColor" /></div>
            <span className={styles.logoText}>ScrapMatch</span>
          </div>

          {/* Headline */}
          <h1 className={styles.headline}>
            Start turning industrial surplus into revenue.
          </h1>

          {/* Step indicator */}
          <div className={styles.stepIndicator}>
            {STEP_LABELS.map((s, i) => {
              const num = i + 1;
              const active = step === num;
              const done = step > num;
              return (
                <div
                  key={s.title}
                  className={`${styles.stepItem} ${active ? styles.stepActive : ''} ${done ? styles.stepDone : ''}`}
                >
                  <div className={styles.stepCircle}>
                    {done ? <Check size={14} /> : num}
                  </div>
                  {i < STEP_LABELS.length - 1 && (
                    <div className={`${styles.stepLine} ${done ? styles.stepLineDone : ''}`} />
                  )}
                  <div className={styles.stepLabel}>
                    <span className={styles.stepTitle}>{s.title}</span>
                    <span className={styles.stepDesc}>{s.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Preview card */}
          <div className={styles.previewCard}>
            <div className={styles.previewHeader}>
              <CheckCircle2 size={16} className={styles.previewCheckIcon} />
              <span>Live match preview</span>
            </div>
            <div className={styles.previewBody}>
              <span className={styles.previewMaterial}>HDPE Regrind</span>
              <span className={styles.previewMeta}>8T &nbsp;·&nbsp; ₹2.7L</span>
              <span className={styles.previewMatch}>3 buyers matched</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ─────────────────────────────────────── */}
      <div className={styles.rightPanel}>
        <div className={styles.formBox}>
          <AnimatePresence mode="wait" custom={direction}>
            {/* ── STEP 1 ── */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className={styles.stepHeader}>
                  <h2 className={styles.stepTitle2}>Account Details</h2>
                  <p className={styles.stepSub}>Already have an account? <Link href="/login" className={styles.inlineLink}>Sign in</Link></p>
                </div>

                <div className={styles.fields}>
                  {/* Full Name */}
                  <div className={styles.field}>
                    <label className={styles.lbl}>Full Name</label>
                    <input
                      type="text"
                      placeholder="Rahul Sharma"
                      value={s1.fullName}
                      onChange={f1('fullName')}
                      className={`${styles.inp} ${e1.fullName ? styles.inpErr : ''} ${shakeClass(shake1, !!e1.fullName)}`}
                    />
                    {e1.fullName && <span className={styles.errTxt}>{e1.fullName}</span>}
                  </div>

                  {/* Email */}
                  <div className={styles.field}>
                    <label className={styles.lbl}>Business Email</label>
                    <input
                      type="email"
                      placeholder="rahul@company.com"
                      value={s1.email}
                      onChange={f1('email')}
                      className={`${styles.inp} ${e1.email ? styles.inpErr : ''} ${shakeClass(shake1, !!e1.email)}`}
                    />
                    {e1.email && <span className={styles.errTxt}>{e1.email}</span>}
                  </div>

                  {/* Phone */}
                  <div className={styles.field}>
                    <label className={styles.lbl}>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="9876543210"
                      value={s1.phone}
                      onChange={f1('phone')}
                      className={`${styles.inp} ${e1.phone ? styles.inpErr : ''} ${shakeClass(shake1, !!e1.phone)}`}
                    />
                    {e1.phone && <span className={styles.errTxt}>{e1.phone}</span>}
                  </div>

                  {/* Password */}
                  <div className={styles.field}>
                    <label className={styles.lbl}>Password</label>
                    <div className={styles.inputWrap}>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={s1.password}
                        onChange={f1('password')}
                        className={`${styles.inp} ${styles.inpWithToggle} ${e1.password ? styles.inpErr : ''} ${shakeClass(shake1, !!e1.password)}`}
                      />
                      <button
                        type="button"
                        className={styles.toggleBtn}
                        onClick={() => setShowPassword((v) => !v)}
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {e1.password && <span className={styles.errTxt}>{e1.password}</span>}

                    {/* Strength bar */}
                    {s1.password.length > 0 && (
                      <div className={styles.strengthWrap}>
                        <div className={styles.strengthBar}>
                          {[1,2,3,4,5].map((i) => (
                            <div
                              key={i}
                              className={styles.strengthSegment}
                              style={{
                                backgroundColor: i <= pwScore ? pwColor : 'var(--color-border)',
                                transition: 'background-color 0.2s',
                              }}
                            />
                          ))}
                        </div>
                        <ul className={styles.reqList}>
                          {REQUIREMENTS.map((r, i) => (
                            <li
                              key={r.label}
                              className={`${styles.reqItem} ${pwResults[i] ? styles.reqMet : ''}`}
                            >
                              <span className={styles.reqIcon}>
                                {pwResults[i] ? <Check size={11} /> : '·'}
                              </span>
                              {r.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className={styles.field}>
                    <label className={styles.lbl}>Confirm Password</label>
                    <div className={styles.inputWrap}>
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={s1.confirmPassword}
                        onChange={f1('confirmPassword')}
                        className={`${styles.inp} ${styles.inpWithToggle} ${e1.confirmPassword ? styles.inpErr : ''} ${shakeClass(shake1, !!e1.confirmPassword)}`}
                      />
                      <button
                        type="button"
                        className={styles.toggleBtn}
                        onClick={() => setShowConfirm((v) => !v)}
                      >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {e1.confirmPassword && <span className={styles.errTxt}>{e1.confirmPassword}</span>}
                  </div>
                </div>

                <div className={styles.btnFull}>
                  <SpecularButton onClick={() => { goNext(); handleStep1Continue(); }}>
                    Continue →
                  </SpecularButton>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <motion.div
                key="step2"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className={styles.stepHeader}>
                  <h2 className={styles.stepTitle2}>Business Details</h2>
                  <p className={styles.stepSub}>Tell us about your company</p>
                </div>

                <div className={styles.fields}>
                  {/* Company Name */}
                  <div className={styles.field}>
                    <label className={styles.lbl}>Company Name</label>
                    <input
                      type="text"
                      placeholder="Acme Manufacturing Pvt. Ltd."
                      value={s2.companyName}
                      onChange={f2text('companyName')}
                      className={`${styles.inp} ${e2.companyName ? styles.inpErr : ''} ${shakeClass(shake2, !!e2.companyName)}`}
                    />
                    {e2.companyName && <span className={styles.errTxt}>{e2.companyName}</span>}
                  </div>

                  {/* Business Type */}
                  <div className={styles.field}>
                    <label className={styles.lbl}>Business Type</label>
                    <select
                      value={s2.businessType}
                      onChange={f2sel('businessType')}
                      className={`${styles.sel} ${e2.businessType ? styles.inpErr : ''} ${shakeClass(shake2, !!e2.businessType)}`}
                    >
                      <option value="">Select business type…</option>
                      <option value="manufacturer">Manufacturer</option>
                      <option value="buyer">Buyer</option>
                      <option value="recycler">Recycler</option>
                      <option value="trader">Trader</option>
                      <option value="both">Both Buyer &amp; Seller</option>
                    </select>
                    {e2.businessType && <span className={styles.errTxt}>{e2.businessType}</span>}
                  </div>

                  {/* Industry */}
                  <div className={styles.field}>
                    <label className={styles.lbl}>Industry</label>
                    <select
                      value={s2.industry}
                      onChange={f2sel('industry')}
                      className={`${styles.sel} ${e2.industry ? styles.inpErr : ''} ${shakeClass(shake2, !!e2.industry)}`}
                    >
                      <option value="">Select industry…</option>
                      {['Steel','Plastic','Paper','Construction','Electronics','Chemicals','Textile','Automotive','Packaging','Other'].map((ind) => (
                        <option key={ind} value={ind.toLowerCase()}>{ind}</option>
                      ))}
                    </select>
                    {e2.industry && <span className={styles.errTxt}>{e2.industry}</span>}
                  </div>

                  {/* Company Size */}
                  <div className={styles.field}>
                    <label className={styles.lbl}>Company Size</label>
                    <select
                      value={s2.companySize}
                      onChange={f2sel('companySize')}
                      className={`${styles.sel} ${e2.companySize ? styles.inpErr : ''} ${shakeClass(shake2, !!e2.companySize)}`}
                    >
                      <option value="">Select company size…</option>
                      {['1–10','11–50','51–200','201–1000','1000+'].map((sz) => (
                        <option key={sz} value={sz}>{sz} employees</option>
                      ))}
                    </select>
                    {e2.companySize && <span className={styles.errTxt}>{e2.companySize}</span>}
                  </div>

                  {/* City + State row */}
                  <div className={styles.rowFields}>
                    <div className={styles.field}>
                      <label className={styles.lbl}>City</label>
                      <input
                        type="text"
                        placeholder="Pune"
                        value={s2.city}
                        onChange={f2text('city')}
                        className={`${styles.inp} ${e2.city ? styles.inpErr : ''} ${shakeClass(shake2, !!e2.city)}`}
                      />
                      {e2.city && <span className={styles.errTxt}>{e2.city}</span>}
                    </div>

                    <div className={styles.field}>
                      <label className={styles.lbl}>State</label>
                      <select
                        value={s2.state}
                        onChange={f2sel('state')}
                        className={`${styles.sel} ${e2.state ? styles.inpErr : ''} ${shakeClass(shake2, !!e2.state)}`}
                      >
                        <option value="">Select state…</option>
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>{st}</option>
                        ))}
                      </select>
                      {e2.state && <span className={styles.errTxt}>{e2.state}</span>}
                    </div>
                  </div>

                  {/* GST (optional) */}
                  <div className={styles.field}>
                    <label className={styles.lbl}>GST Number <span className={styles.optional}>(optional)</span></label>
                    <input
                      type="text"
                      placeholder="22AAAAA0000A1Z5"
                      value={s2.gst}
                      onChange={f2text('gst')}
                      className={styles.inp}
                    />
                  </div>
                </div>

                <div className={styles.actions}>
                  <button type="button" className={styles.backBtn} onClick={goBack}>
                    <ArrowLeft size={16} /> Back
                  </button>
                  <div className={styles.btnFull} style={{ flex: 1 }}>
                    <SpecularButton onClick={handleStep2Submit} disabled={loading}>
                      {loading ? (
                        <span className={styles.loadingRow}>
                          <Loader2 size={15} className={styles.spinner} />
                          Creating account…
                        </span>
                      ) : (
                        'Create Account →'
                      )}
                    </SpecularButton>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── STEP 3 — SUCCESS ── */}
            {step === 3 && (
              <motion.div
                key="step3"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={styles.successWrap}
              >
                <motion.div
                  className={styles.successCircle}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.1 }}
                >
                  <Check size={40} strokeWidth={2.5} />
                </motion.div>

                <motion.h2
                  className={styles.successHeading}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Account Created!
                </motion.h2>

                <motion.p
                  className={styles.successText}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42 }}
                >
                  Your ScrapMatch account is ready. Verify your email to start trading.
                </motion.p>

                <motion.div
                  className={styles.btnFull}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.54 }}
                >
                  <SpecularButton href="/dashboard">
                    Go to Dashboard →
                  </SpecularButton>
                </motion.div>

                <motion.p
                  className={styles.verifyNote}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.66 }}
                >
                  Check your inbox for a verification email
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
