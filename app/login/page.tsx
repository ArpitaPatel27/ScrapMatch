'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Zap, CheckCircle2, Eye, EyeOff, Loader2 } from 'lucide-react';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [shake, setShake] = useState(false);

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email.trim()) {
      newErrors.email = 'Please enter your email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!password) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShake(true);
      setTimeout(() => setShake(false), 600);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1200));
    setLoading(false);
    router.push('/dashboard');
  };

  return (
    <div className={styles.container}>
      {/* ── LEFT BRAND PANEL ─────────────────────────────────── */}
      <div className={styles.leftPanel}>
        <div className={styles.leftInner}>
          {/* Logo */}
          <div className={styles.logo}>
            <div className={styles.logoIcon}>
              <Zap size={22} fill="currentColor" />
            </div>
            <span className={styles.logoText}>ScrapMatch</span>
          </div>

          {/* Headline */}
          <h1 className={styles.headline}>
            Welcome back to India&rsquo;s industrial materials exchange.
          </h1>

          {/* Trust items */}
          <ul className={styles.trustList}>
            {[
              '280+ verified industrial companies',
              '₹120Cr+ in materials traded',
              'GST-verified · PCB compliant',
            ].map((item) => (
              <li key={item} className={styles.trustItem}>
                <CheckCircle2 size={18} className={styles.trustIcon} />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Live transaction card */}
          <div className={styles.txCard}>
            <div className={styles.txCardHeader}>
              <span className={styles.txDot} />
              <span className={styles.txLive}>Live transaction</span>
            </div>
            <div className={styles.txBody}>
              <span className={styles.txMaterial}>Steel Offcuts</span>
              <span className={styles.txMeta}>14T &nbsp;·&nbsp; ₹4.3L</span>
              <span className={styles.txMatch}>Matched in 43s</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT FORM PANEL ──────────────────────────────────── */}
      <div className={styles.rightPanel}>
        <motion.div
          className={styles.formWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0, 0, 0.2, 1] }}
        >
          {/* Header */}
          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>Sign In</h2>
            <p className={styles.formSubtitle}>
              Don&rsquo;t have an account?{' '}
              <Link href="/signup" className={styles.headerLink}>
                Create one →
              </Link>
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            {/* Email */}
            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>
                Business Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                }}
                className={`${styles.input} ${errors.email ? styles.inputError : ''} ${shake && errors.email ? styles.shake : ''}`}
              />
              {errors.email && (
                <span className={styles.errorText}>{errors.email}</span>
              )}
            </div>

            {/* Password */}
            <div className={styles.fieldGroup}>
              <label htmlFor="password" className={styles.label}>
                Password
              </label>
              <div className={styles.inputWrap}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
                  }}
                  className={`${styles.input} ${styles.inputWithToggle} ${errors.password ? styles.inputError : ''} ${shake && errors.password ? styles.shake : ''}`}
                />
                <button
                  type="button"
                  className={styles.toggleBtn}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {errors.password && (
                <span className={styles.errorText}>{errors.password}</span>
              )}
            </div>

            {/* Remember me + Forgot */}
            <div className={styles.rememberRow}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className={styles.checkbox}
                />
                <span>Remember me</span>
              </label>
              <Link href="/forgot-password" className={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <div className={styles.btnFull}>
              <SpecularButton type="submit" disabled={loading}>
                {loading ? (
                  <span className={styles.loadingRow}>
                    <Loader2 size={16} className={styles.spinner} />
                    Signing in…
                  </span>
                ) : (
                  'Sign In'
                )}
              </SpecularButton>
            </div>
          </form>

          {/* OR divider */}
          <div className={styles.divider}>
            <span>or</span>
          </div>

          {/* Google SSO */}
          <button type="button" className={styles.googleBtn}>
            <svg className={styles.googleIcon} viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          {/* Security note */}
          <p className={styles.securityNote}>
            🔒 Your data is encrypted and never shared without consent.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
