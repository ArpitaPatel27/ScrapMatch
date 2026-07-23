'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Bell, LayoutDashboard, Package, ShoppingCart,
  MessageSquare, BarChart2, Settings, Star, ChevronDown,
  User, LogOut, CheckCheck,
} from 'lucide-react';
import { NOTIFICATIONS } from '@/lib/mock-data';
import styles from './DashboardShell.module.css';

const NAV_LINKS = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Listings', href: '/dashboard/listings' },
  { label: 'Marketplace', href: '/dashboard/marketplace' },
  { label: 'ESG Reports', href: '/dashboard/esg' },
];

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Package, label: 'My Listings', href: '/dashboard/listings' },
  { icon: ShoppingCart, label: 'Buy Materials', href: '/dashboard/marketplace' },
  { icon: MessageSquare, label: 'Messages', href: '/dashboard/messages' },
  { icon: BarChart2, label: 'ESG Reports', href: '/dashboard/esg' },
  { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
];

function formatTime(iso: string): string {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${Math.floor(diffHours / 24)}d ago`;
}

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const [bellOpen, setBellOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  function markAllRead() {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  }

  const notifTypeIcon: Record<string, string> = {
    match: '🔗',
    message: '💬',
    price: '📈',
    system: '⚙️',
  };

  return (
    <div className={styles.root}>
      {/* ── TOP NAV ─────────────────────────────────────────── */}
      <header className={styles.topNav}>
        <div className={styles.navLeft}>
          <Link href="/dashboard" className={styles.navLogo}>
            <div className={styles.navLogoIcon}>
              <Zap size={18} fill="currentColor" />
            </div>
            <span className={styles.navLogoText}>ScrapMatch</span>
          </Link>
          <nav className={styles.navLinks}>
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className={styles.navRight}>
          {/* Bell */}
          <div className={styles.bellWrap}>
            <button
              className={styles.bellBtn}
              aria-label="Notifications"
              onClick={() => { setBellOpen(p => !p); setAvatarOpen(false); }}
            >
              <Bell size={20} />
              {unreadCount > 0 && <span className={styles.bellBadge}>{unreadCount}</span>}
            </button>
            <AnimatePresence>
              {bellOpen && (
                <motion.div
                  className={styles.notifDropdown}
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.16 }}
                >
                  <div className={styles.notifHeader}>
                    <span className={styles.notifTitle}>Notifications</span>
                    <button className={styles.markReadBtn} onClick={markAllRead}>
                      <CheckCheck size={14} /> Mark all read
                    </button>
                  </div>
                  <div className={styles.notifList}>
                    {notifications.map(n => (
                      <div key={n.id} className={`${styles.notifItem} ${!n.read ? styles.notifUnread : ''}`}>
                        <span className={styles.notifEmoji}>{notifTypeIcon[n.type]}</span>
                        <div className={styles.notifBody}>
                          <p className={styles.notifItemTitle}>{n.title}</p>
                          <p className={styles.notifItemBody}>{n.body}</p>
                          <span className={styles.notifTime}>{formatTime(n.time)}</span>
                        </div>
                        {!n.read && <span className={styles.notifDot} />}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {/* Avatar */}
          <div className={styles.avatarWrap}>
            <button
              className={styles.avatarBtn}
              onClick={() => { setAvatarOpen(p => !p); setBellOpen(false); }}
              aria-label="User menu"
            >
              <div className={styles.avatar}>RS</div>
              <ChevronDown size={14} className={styles.chevron} />
            </button>
            <AnimatePresence>
              {avatarOpen && (
                <motion.div
                  className={styles.avatarDropdown}
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  transition={{ duration: 0.16 }}
                >
                  <div className={styles.avatarProfile}>
                    <div className={styles.avatarLg}>RS</div>
                    <div>
                      <p className={styles.avatarName}>Rahul Sharma</p>
                      <p className={styles.avatarEmail}>rahul@techmanufacturing.in</p>
                    </div>
                  </div>
                  <div className={styles.avatarMenu}>
                    <Link href="/dashboard/settings" className={styles.avatarMenuItem} onClick={() => setAvatarOpen(false)}>
                      <User size={15} /> Profile
                    </Link>
                    <Link href="/dashboard/settings" className={styles.avatarMenuItem} onClick={() => setAvatarOpen(false)}>
                      <Settings size={15} /> Settings
                    </Link>
                    <Link href="/login" className={`${styles.avatarMenuItem} ${styles.avatarMenuLogout}`} onClick={() => setAvatarOpen(false)}>
                      <LogOut size={15} /> Logout
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* overlay to close dropdowns */}
      {(bellOpen || avatarOpen) && (
        <div className={styles.overlay} onClick={() => { setBellOpen(false); setAvatarOpen(false); }} />
      )}

      {/* ── BODY ─────────────────────────────────────────────── */}
      <div className={styles.body}>
        {/* ── SIDEBAR ──────────────────────────────────────── */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarProfile}>
            <div className={styles.sidebarAvatar}>RS</div>
            <div className={styles.sidebarProfileText}>
              <span className={styles.sidebarName}>Rahul Sharma</span>
              <span className={styles.sidebarCompany}>Tech Manufacturing Ltd.</span>
            </div>
          </div>
          <nav className={styles.sidebarNav}>
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.sidebarItem} ${isActive ? styles.sidebarItemActive : ''}`}
                >
                  <item.icon size={18} className={styles.sidebarIcon} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className={styles.upgradeCard}>
            <Star size={18} className={styles.upgradeIcon} />
            <p className={styles.upgradeTitle}>Upgrade to Pro</p>
            <p className={styles.upgradeDesc}>
              Unlock AI-powered matching, priority listings, and advanced ESG reports.
            </p>
            <Link href="/dashboard/settings" className={styles.upgradeBtn}>
              Upgrade →
            </Link>
          </div>
        </aside>

        {/* ── MAIN ─────────────────────────────────────────── */}
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}
