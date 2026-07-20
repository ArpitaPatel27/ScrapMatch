'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Menu, X, Zap } from 'lucide-react';
import styles from './MarketingNav.module.css';

const solutions = [
  { label: 'For Sellers', href: '/solutions/sellers', desc: 'List materials, find buyers, get better prices' },
  { label: 'For Buyers', href: '/solutions/buyers', desc: 'Source secondary raw materials reliably' },
  { label: 'For Enterprise', href: '/solutions/enterprise', desc: 'Multi-plant dashboard and ESG reporting' },
  { label: 'For Traders', href: '/solutions/traders', desc: 'Scale your trading operations with AI' },
];

const industries = [
  { label: 'Plastics', href: '/industries/plastics' },
  { label: 'Metals', href: '/industries/metals' },
  { label: 'Textiles', href: '/industries/textiles' },
  { label: 'Chemicals', href: '/industries/chemicals' },
  { label: 'Construction', href: '/industries/construction' },
];

export default function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const pathname = usePathname();
  const isActiveLink = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={styles.inner}>
          {/* Logo */}
          <Link href="/" className={styles.logo} aria-label="ScrapMatch — Home">
            <div className={styles.logoMark}>
              <Zap size={16} strokeWidth={2.5} />
            </div>
            <span className={styles.logoText}>ScrapMatch</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className={styles.links} ref={dropdownRef}>
            <Link
              href="/product"
              className={`${styles.navLink} ${isActiveLink('/product') ? styles.navLinkActive : ''}`}
              aria-current={isActiveLink('/product') ? 'page' : undefined}
            >
              Product
            </Link>

            {/* Solutions Dropdown */}
            <div className={styles.dropdownWrapper}>
              <button
                className={`${styles.navLink} ${styles.dropdownTrigger} ${openDropdown === 'solutions' ? styles.dropdownOpen : ''} ${isActiveLink('/solutions') ? styles.navLinkActive : ''}`}
                onClick={() => setOpenDropdown(openDropdown === 'solutions' ? null : 'solutions')}
                aria-expanded={openDropdown === 'solutions'}
                aria-haspopup="true"
              >
                Solutions
                <ChevronDown
                  size={14}
                  className={`${styles.chevron} ${openDropdown === 'solutions' ? styles.chevronOpen : ''}`}
                />
              </button>
              <AnimatePresence>
                {openDropdown === 'solutions' && (
                  <motion.div
                    className={styles.dropdown}
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                    role="menu"
                  >
                    {solutions.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={styles.dropdownItem}
                        role="menuitem"
                        onClick={() => setOpenDropdown(null)}
                      >
                        <span className={styles.dropdownItemLabel}>{item.label}</span>
                        <span className={styles.dropdownItemDesc}>{item.desc}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Industries Dropdown */}
            <div className={styles.dropdownWrapper}>
              <button
                className={`${styles.navLink} ${styles.dropdownTrigger} ${openDropdown === 'industries' ? styles.dropdownOpen : ''} ${isActiveLink('/industries') ? styles.navLinkActive : ''}`}
                onClick={() => setOpenDropdown(openDropdown === 'industries' ? null : 'industries')}
                aria-expanded={openDropdown === 'industries'}
                aria-haspopup="true"
              >
                Industries
                <ChevronDown
                  size={14}
                  className={`${styles.chevron} ${openDropdown === 'industries' ? styles.chevronOpen : ''}`}
                />
              </button>
              <AnimatePresence>
                {openDropdown === 'industries' && (
                  <motion.div
                    className={`${styles.dropdown} ${styles.dropdownSm}`}
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                    role="menu"
                  >
                    {industries.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`${styles.dropdownItem} ${styles.dropdownItemSimple}`}
                        role="menuitem"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/pricing"
              className={`${styles.navLink} ${isActiveLink('/pricing') ? styles.navLinkActive : ''}`}
              aria-current={isActiveLink('/pricing') ? 'page' : undefined}
            >
              Pricing
            </Link>
            <Link
              href="/resources/market-index"
              className={`${styles.navLink} ${isActiveLink('/resources/market-index') ? styles.navLinkActive : ''}`}
              aria-current={isActiveLink('/resources/market-index') ? 'page' : undefined}
            >
              Market Index
            </Link>
          </div>

          {/* CTA Group */}
          <div className={styles.ctas}>
            <Link href="/login" className={styles.signInBtn}>Sign In</Link>
            <Link href="/signup" className={styles.getStartedBtn}>
              Get Started
              <span className={styles.ctaArrow}>→</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={styles.mobileToggle}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.mobileLinks}>
              <Link
                href="/product"
                className={`${styles.mobileLink} ${isActiveLink('/product') ? styles.mobileLinkActive : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                Product
              </Link>
              <div className={styles.mobileDivider}>Solutions</div>
              {solutions.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.mobileLinkIndented} ${isActiveLink(item.href) ? styles.mobileLinkActive : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className={styles.mobileDivider}>Industries</div>
              {industries.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.mobileLinkIndented} ${isActiveLink(item.href) ? styles.mobileLinkActive : ''}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/pricing"
                className={`${styles.mobileLink} ${isActiveLink('/pricing') ? styles.mobileLinkActive : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="/resources/market-index"
                className={`${styles.mobileLink} ${isActiveLink('/resources/market-index') ? styles.mobileLinkActive : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                Market Index
              </Link>
            </div>
            <div className={styles.mobileCtas}>
              <Link href="/login" className={styles.mobileSignIn} onClick={() => setMobileOpen(false)}>Sign In</Link>
              <Link href="/signup" className={styles.mobileGetStarted} onClick={() => setMobileOpen(false)}>Get Started →</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
