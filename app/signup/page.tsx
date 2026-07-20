'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Recycle,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  Factory,
  ShoppingBag,
  Package,
  Users
} from 'lucide-react';
import SpecularButton from '@/components/ui/SpecularButton/SpecularButton';
import styles from './page.module.css';

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'sell' | 'buy' | null>(null);

  const nextStep = () => setStep((s) => Math.min(4, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const renderLeftPanel = () => (
    <div className={styles.leftPanel}>
      <div>
        <div className={styles.logo}>
          <Recycle className={styles.logoIcon} size={32} />
          <span>ScrapMatch</span>
        </div>
        
        <h1 className={styles.headline}>Start turning waste into revenue.</h1>
        
        <div className={styles.stepList}>
          <div className={`${styles.stepItem} ${step > 1 ? styles.completed : step === 1 ? styles.active : ''}`}>
            <div className={styles.stepCircle}>
              {step > 1 ? <Check size={16} /> : '1'}
            </div>
            <div className={styles.stepText}>
              <span className={styles.stepTitle}>Account Details</span>
              <span className={styles.stepDesc}>Basic business info</span>
            </div>
          </div>
          <div className={`${styles.stepItem} ${step > 2 ? styles.completed : step === 2 ? styles.active : ''}`}>
            <div className={styles.stepCircle}>
              {step > 2 ? <Check size={16} /> : '2'}
            </div>
            <div className={styles.stepText}>
              <span className={styles.stepTitle}>Business Role</span>
              <span className={styles.stepDesc}>Buying or selling</span>
            </div>
          </div>
          <div className={`${styles.stepItem} ${step > 3 ? styles.completed : step === 3 ? styles.active : ''}`}>
            <div className={styles.stepCircle}>
              {step > 3 ? <Check size={16} /> : '3'}
            </div>
            <div className={styles.stepText}>
              <span className={styles.stepTitle}>Initial Setup</span>
              <span className={styles.stepDesc}>Your first listing or requirement</span>
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        className={styles.previewCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className={styles.previewHeader}>
          <CheckCircle2 size={18} className={styles.previewIcon} />
          <span>First listing submitted</span>
        </div>
        <div className={styles.previewBody}>
          <div className={styles.previewTitle}>HDPE Regrind</div>
          <div className={styles.previewTag}>Plastics</div>
          <div className={styles.previewMatch}>
            <Users size={16} className={styles.previewMatchIcon} />
            <span>3 buyers matched instantly</span>
          </div>
        </div>
      </motion.div>
    </div>
  );

  const renderStep1 = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Create your account</h2>
        <p className={styles.formSubtitle}>Tell us about your business</p>
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Full Name</label>
          <input type="text" className={styles.input} placeholder="Rahul Sharma" />
        </div>
        
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Business Email</label>
          <input type="email" className={styles.input} placeholder="rahul@company.com" />
        </div>
        
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Password</label>
          <div className={styles.passwordInput}>
            <input 
              type={showPassword ? 'text' : 'password'} 
              className={styles.input} 
              placeholder="••••••••" 
            />
            <button 
              type="button" 
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className={styles.inputWrapper}>
          <label className={styles.label}>GST Number (Optional for now)</label>
          <input type="text" className={styles.input} placeholder="22AAAAA0000A1Z5" />
        </div>
      </div>

      <div className={styles.formFooter}>
        <div onClick={nextStep}>
          <SpecularButton>Continue →</SpecularButton>
        </div>
        <p className={styles.loginLink}>
          Already have an account? <Link href="/login">Sign in</Link>
        </p>
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>How will you use ScrapMatch?</h2>
        <p className={styles.formSubtitle}>What do you want to do?</p>
      </div>

      <div className={styles.roleCards}>
        <div 
          className={`${styles.roleCard} ${role === 'sell' ? styles.selected : ''}`}
          onClick={() => setRole('sell')}
        >
          <div className={styles.roleIcon}>
            <Factory size={24} />
          </div>
          <div className={styles.roleText}>
            <span className={styles.roleTitle}>SELL MATERIALS</span>
            <span className={styles.roleDesc}>I have industrial waste or surplus to sell to verified buyers.</span>
          </div>
        </div>

        <div 
          className={`${styles.roleCard} ${role === 'buy' ? styles.selected : ''}`}
          onClick={() => setRole('buy')}
        >
          <div className={styles.roleIcon}>
            <ShoppingBag size={24} />
          </div>
          <div className={styles.roleText}>
            <span className={styles.roleTitle}>BUY MATERIALS</span>
            <span className={styles.roleDesc}>I want to source secondary raw materials for my manufacturing.</span>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.backBtn} onClick={prevStep}>
          Back
        </button>
        <div onClick={() => role && nextStep()} style={{ opacity: role ? 1 : 0.5, pointerEvents: role ? 'auto' : 'none' }}>
          <SpecularButton>Continue →</SpecularButton>
        </div>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>
          {role === 'sell' ? 'What material do you have?' : 'What do you need?'}
        </h2>
        <p className={styles.formSubtitle}>
          {role === 'sell' ? 'Your first material listing' : 'Your requirements'}
        </p>
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Material Name</label>
          <input type="text" className={styles.input} placeholder={role === 'sell' ? "e.g. HDPE Regrind" : "e.g. Copper Scrap"} />
        </div>
        
        <div className={styles.inputWrapper}>
          <label className={styles.label}>Category</label>
          <select className={styles.select}>
            <option value="">Select category...</option>
            <option value="plastics">Plastics</option>
            <option value="metals">Metals</option>
            <option value="paper">Paper & Cardboard</option>
            <option value="textiles">Textiles</option>
            <option value="chemicals">Chemicals</option>
            <option value="construction">Construction & Demolition</option>
            <option value="electronics">E-Waste / Electronics</option>
            <option value="rubber">Rubber</option>
          </select>
        </div>
        
        <div className={styles.inputRow}>
          <div className={styles.inputWrapper} style={{ flex: 2 }}>
            <label className={styles.label}>{role === 'sell' ? 'Approximate Quantity' : 'Required Quantity'}</label>
            <input type="number" className={styles.input} placeholder="1000" />
          </div>
          <div className={styles.inputWrapper} style={{ flex: 1 }}>
            <label className={styles.label}>Unit</label>
            <select className={styles.select}>
              <option value="kg">kg</option>
              <option value="tonnes">Tonnes</option>
            </select>
          </div>
        </div>

        {role === 'buy' && (
          <div className={styles.inputWrapper}>
            <label className={styles.label}>Target Price per Unit (₹) - Optional</label>
            <input type="number" className={styles.input} placeholder="150" />
          </div>
        )}

        <div className={styles.inputWrapper}>
          <label className={styles.label}>Location (City, State)</label>
          <input type="text" className={styles.input} placeholder="e.g. Pune, Maharashtra" />
        </div>
      </div>

      <div className={styles.actions}>
        <button type="button" className={styles.backBtn} onClick={prevStep}>
          Back
        </button>
        <div onClick={nextStep}>
          <SpecularButton>{role === 'sell' ? 'Submit Listing →' : 'Set Up Alerts →'}</SpecularButton>
        </div>
      </div>
    </motion.div>
  );

  const renderSuccess = () => (
    <motion.div
      key="success"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={styles.successState}
    >
      <div className={styles.successIcon}>
        <Check size={40} />
      </div>
      <h2 className={styles.successTitle}>You're all set!</h2>
      <p className={styles.successDesc}>
        Your account has been created successfully. Welcome to ScrapMatch.
      </p>
      <Link href="/dashboard" style={{ textDecoration: 'none' }}>
        <SpecularButton>Go to your dashboard →</SpecularButton>
      </Link>
    </motion.div>
  );

  return (
    <div className={styles.container}>
      {renderLeftPanel()}
      <div className={styles.rightPanel}>
        <div className={styles.formContainer}>
          <AnimatePresence mode="wait">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderSuccess()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
