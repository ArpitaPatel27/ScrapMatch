import Link from 'next/link';
import { Zap } from 'lucide-react';
import styles from './MarketingFooter.module.css';

const NAV_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Overview', href: '/product' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Market Index', href: '/resources/market-index' },
      { label: 'Marketplace', href: '/marketplace' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Steel & Metals', href: '/industries/steel' },
      { label: 'Plastics', href: '/industries/plastics' },
      { label: 'Paper & Packaging', href: '/industries/paper' },
      { label: 'Construction', href: '/industries/construction' },
      { label: 'Electronics', href: '/industries/electronics' },
      { label: 'Chemicals', href: '/industries/chemicals' },
      { label: 'Textiles', href: '/industries/textiles' },
      { label: 'Automotive', href: '/industries/automotive' },
      { label: 'Packaging', href: '/industries/packaging' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/resources/blog' },
      { label: 'Case Studies', href: '/customers' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms of Service', href: '/legal/terms' },
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Compliance', href: '/legal/compliance' },
    ],
  },
];

export default function MarketingFooter() {
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.top}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo} aria-label="ScrapMatch">
              <div className={styles.logoMark}><Zap size={14} strokeWidth={2.5} /></div>
              <span className={styles.logoText}>ScrapMatch</span>
            </Link>
            <p className={styles.tagline}>
              AI-powered B2B circular materials exchange.
              One company&apos;s waste becomes another&apos;s raw material.
            </p>
            <div className={styles.badges}>
              <span className={styles.badge}>GST Verified</span>
              <span className={styles.badge}>PCB Compliant</span>
              <span className={styles.badge}>ISO 14001</span>
            </div>
          </div>

          {/* Nav Columns */}
          <nav className={styles.navColumns} aria-label="Footer navigation">
            {NAV_COLUMNS.map((col) => (
              <div key={col.title} className={styles.navColumn}>
                <h3 className={styles.columnTitle}>{col.title}</h3>
                <ul className={styles.columnLinks}>
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className={styles.columnLink}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} ScrapMatch Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p className={styles.madeIn}>Made in India 🇮🇳</p>
        </div>
      </div>
    </footer>
  );
}
