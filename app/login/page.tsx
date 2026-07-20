'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Eye, EyeOff } from 'lucide-react';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import styles from './page.module.css';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
  };

  return (
    <div className={styles.container}>
      {/* Left Panel - Brand */}
      <div className={styles.leftPanel}>
        <div className={styles.brand}>
          <div className={styles.logo}>ScrapMatch</div>
          <div className={styles.tagline}>India’s industrial materials exchange</div>
          
          <div className={styles.trustList}>
            <div className={styles.trustItem}>
              <CheckCircle2 className={styles.trustIcon} size={20} />
              <span>GST-verified business network</span>
            </div>
            <div className={styles.trustItem}>
              <CheckCircle2 className={styles.trustIcon} size={20} />
              <span>280+ verified companies</span>
            </div>
            <div className={styles.trustItem}>
              <CheckCircle2 className={styles.trustIcon} size={20} />
              <span>Secure escrow payments</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>
          <div className={styles.header}>
            <h1 className={styles.heading}>Welcome back</h1>
            <p className={styles.subtext}>Sign in to your ScrapMatch account</p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.label}>Business Email</label>
              <div className={styles.inputWrapper}>
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  placeholder="you@company.com"
                  required
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.label}>Password</label>
              <div className={styles.inputWrapper}>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`${styles.input} ${styles.passwordInput}`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className={styles.toggleButton}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <Link href="/forgot-password" className={styles.forgotLink}>
                Forgot password?
              </Link>
            </div>

            <div className={styles.submitWrapper}>
              <SpecularButton type="submit">
                <span style={{ display: 'block', width: '100%', textAlign: 'center' }}>
                  Sign In
                </span>
              </SpecularButton>
            </div>
          </form>

          <div className={styles.divider}>or</div>

          <button type="button" className={styles.googleButton}>
            <svg className={styles.googleIcon} viewBox="0 0 24 24">
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

          <div className={styles.footer}>
            Don&apos;t have an account? 
            <Link href="/signup" className={styles.signupLink}>
              Get started &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
