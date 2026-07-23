'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Send, Paperclip, Image, BadgeCheck, CheckCheck, Check } from 'lucide-react';
import { CONVERSATIONS, Conversation, Message } from '@/lib/mock-data';
import styles from './page.module.css';

function timeStr(iso: string) {
  const d = new Date(iso);
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}
function dateStr(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
}

export default function MessagesPage() {
  const [convs, setConvs] = useState<Conversation[]>(CONVERSATIONS);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const activeConv = convs.find(c => c.id === activeId) ?? null;

  const filteredConvs = convs.filter(c =>
    c.partnerName.toLowerCase().includes(search.toLowerCase()) ||
    c.partnerCompany.toLowerCase().includes(search.toLowerCase()) ||
    c.listingName.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages.length]);

  function selectConv(id: string) {
    setActiveId(id);
    setConvs(prev => prev.map(c => c.id === id ? { ...c, unread: 0 } : c));
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    setInput(e.target.value);
    setTyping(true);
    if (typingTimer.current) clearTimeout(typingTimer.current);
    typingTimer.current = setTimeout(() => setTyping(false), 2000);
  }

  function sendMessage() {
    if (!input.trim() || !activeId) return;
    const newMsg: Message = {
      id: `msg-${Date.now()}`, senderId: 'me', text: input.trim(),
      timestamp: new Date().toISOString(), read: false, type: 'text',
    };
    setConvs(prev => prev.map(c => c.id === activeId
      ? { ...c, messages: [...c.messages, newMsg], lastMessage: input.trim(), lastMessageTime: newMsg.timestamp }
      : c
    ));
    setInput('');
    setTyping(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  }

  const negoBadgeStyle: Record<string, string> = {
    open: styles.negoOpen, negotiating: styles.negoNegotiating,
    agreed: styles.negoAgreed, closed: styles.negoClosed,
  };

  return (
    <>
      <h1 className={styles.pageTitle}>Messages</h1>
      <div className={styles.layout}>
        {/* Left panel */}
        <div className={styles.leftPanel}>
          <div className={styles.searchWrap}>
            <Search size={15} className={styles.searchIcon} />
            <input className={styles.searchInput} placeholder="Search conversations…" value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div className={styles.convList}>
            {filteredConvs.map(c => (
              <button
                key={c.id}
                className={`${styles.convItem} ${c.id === activeId ? styles.convItemActive : ''}`}
                onClick={() => selectConv(c.id)}
              >
                <div className={styles.convAvatar}>{c.partnerInitials}</div>
                <div className={styles.convInfo}>
                  <div className={styles.convHeader}>
                    <span className={styles.convName}>{c.partnerName}</span>
                    <span className={styles.convTime}>{dateStr(c.lastMessageTime)}</span>
                  </div>
                  <span className={styles.convCompany}>{c.partnerCompany}</span>
                  <p className={styles.convLast}>{c.lastMessage}</p>
                  <span className={styles.listingChip}>{c.listingName}</span>
                </div>
                {c.unread > 0 && <span className={styles.unreadBadge}>{c.unread}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div className={styles.rightPanel}>
          {!activeConv ? (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>💬</div>
              <h3 className={styles.emptyTitle}>Select a conversation</h3>
              <p className={styles.emptyDesc}>Choose a conversation from the left to start messaging.</p>
            </div>
          ) : (
            <>
              {/* Chat header */}
              <div className={styles.chatHeader}>
                <div className={styles.chatPartnerInfo}>
                  <div className={styles.chatAvatar}>{activeConv.partnerInitials}</div>
                  <div>
                    <div className={styles.chatNameRow}>
                      <span className={styles.chatName}>{activeConv.partnerName}</span>
                      {activeConv.partnerVerified && <BadgeCheck size={15} className={styles.verifiedIcon} />}
                    </div>
                    <span className={styles.chatCompany}>{activeConv.partnerCompany}</span>
                  </div>
                </div>
                <div className={styles.chatHeaderRight}>
                  <span className={styles.listingChipLg}>{activeConv.listingName}</span>
                  <span className={`${styles.negoBadge} ${negoBadgeStyle[activeConv.negotiationStatus]}`}>
                    {activeConv.negotiationStatus.charAt(0).toUpperCase() + activeConv.negotiationStatus.slice(1)}
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div className={styles.messages}>
                {activeConv.messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`${styles.messageBubble} ${msg.senderId === 'me' ? styles.myMessage : styles.theirMessage}`}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className={styles.bubbleText}>{msg.text}</div>
                    <div className={styles.bubbleMeta}>
                      <span className={styles.bubbleTime}>{timeStr(msg.timestamp)}</span>
                      {msg.senderId === 'me' && (
                        msg.read ? <CheckCheck size={13} className={styles.readIcon} /> : <Check size={13} className={styles.sentIcon} />
                      )}
                    </div>
                  </motion.div>
                ))}
                <AnimatePresence>
                  {typing && (
                    <motion.div className={styles.typingIndicator} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <span />  <span /> <span />
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className={styles.inputBar}>
                <button className={styles.attachBtn} aria-label="Attach file"><Paperclip size={18} /></button>
                <button className={styles.attachBtn} aria-label="Send image"><Image size={18} /></button>
                <input
                  className={styles.messageInput}
                  placeholder="Type a message…"
                  value={input}
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                />
                <button className={styles.sendBtn} onClick={sendMessage} disabled={!input.trim()} aria-label="Send">
                  <Send size={18} />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
