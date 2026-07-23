'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Loader2 } from 'lucide-react';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import styles from './page.module.css';

export default function VerifyEmailPage() {
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const email = 'your@email.com';

  const handleResend = async () => {
    setResending(true);
    setResent(false);
    await new Promise((res) => setTimeout(res, 1200));
    setResending(false);
    setResent(true);
    setTimeout(() => setResent(false), 4000);
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* Icon */}
        <motion.div
          className={styles.iconWrap}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
        >
          <Mail size={36} strokeWidth={1.75} />
        </motion.div>

        {/* Heading */}
        <motion.h1
          className={styles.heading}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
        >
          Verify your email
        </motion.h1>

        {/* Body text */}
        <motion.p
          className={styles.body}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
        >
          We sent a verification link to{' '}
          <strong className={styles.emailHighlight}>{email}</strong>. Click the
          link in the email to activate your account.
        </motion.p>

        {/* Status indicator */}
        <motion.div
          className={styles.statusRow}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.48 }}
        >
          <span className={styles.pulseDot} />
          <span className={styles.statusText}>Pending verification…</span>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.56 }}
        >
          <div className={styles.btnFull}>
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
              ) : resent ? (
                '✓ Email resent!'
              ) : (
                'Resend verification email'
              )}
            </SpecularButton>
          </div>

          <div className={styles.btnFull}>
            <SpecularButton
              href="mailto:"
            >
              Open Gmail
            </SpecularButton>
          </div>
        </motion.div>

        {/* Secondary notes */}
        <motion.div
          className={styles.notes}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.68 }}
        >
          <p className={styles.noteText}>
            Wrong email?{' '}
            <Link href="/signup" className={styles.noteLink}>
              Go back to sign up
            </Link>
          </p>

          <div className={styles.divider} />

          <Link href="/dashboard" className={styles.dashLink}>
            Continue to Dashboard →
          </Link>

          <Link href="/login" className={styles.backLink}>
            ← Back to sign in
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
