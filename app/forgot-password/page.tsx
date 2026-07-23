'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Mail, Loader2, ArrowLeft } from 'lucide-react';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import styles from './page.module.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [shake, setShake] = useState(false);
  const [resending, setResending] = useState(false);

  const validate = () => {
    if (!email.trim()) return 'Please enter your business email';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address';
    return '';
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setEmailError(err);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    setEmailError('');
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1000));
    setLoading(false);
    setSent(true);
  };

  const handleResend = async () => {
    setResending(true);
    await new Promise((res) => setTimeout(res, 1000));
    setResending(false);
  };

  const slideVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  return (
    <div className={styles.container}>
      {/* ── LEFT PANEL ──────────────────────────────────────── */}
      <div className={styles.leftPanel}>
        <div className={styles.leftInner}>
          <div className={styles.logo}>
            <div className={styles.logoIcon}><Zap size={20} fill="currentColor" /></div>
            <span className={styles.logoText}>ScrapMatch</span>
          </div>

          <h1 className={styles.headline}>
            Secure account recovery for India&rsquo;s industrial network.
          </h1>

          <p className={styles.subtext}>
            Your account is protected with industry-grade encryption. Password reset
            links expire in 15 minutes for your security.
          </p>

          <div className={styles.securityBadges}>
            <div className={styles.badge}>🔒 256-bit SSL</div>
            <div className={styles.badge}>🛡️ GST-verified</div>
            <div className={styles.badge}>✅ PCB Compliant</div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ─────────────────────────────────────── */}
      <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>
          <AnimatePresence mode="wait">
            {/* State 1 — Email entry */}
            {!sent && (
              <motion.div
                key="email-entry"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <div className={styles.formHeader}>
                  <h2 className={styles.formTitle}>Reset your password</h2>
                  <p className={styles.formSubtitle}>
                    Enter your business email and we&rsquo;ll send you a reset link.
                  </p>
                </div>

                <form className={styles.form} onSubmit={handleSend} noValidate>
                  <div className={styles.fieldGroup}>
                    <label htmlFor="reset-email" className={styles.label}>
                      Business Email
                    </label>
                    <input
                      id="reset-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (emailError) setEmailError('');
                      }}
                      className={`${styles.input} ${emailError ? styles.inputError : ''} ${shake ? styles.shake : ''}`}
                    />
                    {emailError && (
                      <span className={styles.errorText}>{emailError}</span>
                    )}
                  </div>

                  <div className={styles.btnFull}>
                    <SpecularButton type="submit" disabled={loading}>
                      {loading ? (
                        <span className={styles.loadingRow}>
                          <Loader2 size={16} className={styles.spinner} />
                          Sending…
                        </span>
                      ) : (
                        'Send Reset Link'
                      )}
                    </SpecularButton>
                  </div>
                </form>

                <div className={styles.backRow}>
                  <Link href="/login" className={styles.backLink}>
                    <ArrowLeft size={15} />
                    Back to Sign In
                  </Link>
                </div>
              </motion.div>
            )}

            {/* State 2 — Email sent */}
            {sent && (
              <motion.div
                key="email-sent"
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={styles.sentWrap}
              >
                <motion.div
                  className={styles.mailIconWrap}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.1 }}
                >
                  <Mail size={36} />
                </motion.div>

                <motion.h2
                  className={styles.formTitle}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  Check your inbox
                </motion.h2>

                <motion.p
                  className={styles.sentText}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.36 }}
                >
                  We&rsquo;ve sent a password reset link to{' '}
                  <strong className={styles.emailHighlight}>{email}</strong>.
                  The link expires in 15 minutes.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.46 }}
                  className={styles.btnFull}
                >
                  <SpecularButton
                    variant="secondary"
                    onClick={handleResend}
                    disabled={resending}
                  >
                    {resending ? (
                      <span className={styles.loadingRow}>
                        <Loader2 size={15} className={styles.spinner} />
                        Resending…
                      </span>
                    ) : (
                      'Resend email'
                    )}
                  </SpecularButton>
                </motion.div>

                <motion.p
                  className={styles.spamNote}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.56 }}
                >
                  Didn&rsquo;t receive it? Check your spam folder.
                </motion.p>

                <motion.div
                  className={styles.backRow}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.64 }}
                >
                  <Link href="/login" className={styles.backLink}>
                    <ArrowLeft size={15} />
                    Back to Sign In
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
