"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', path: '#beranda' },
    { name: 'Profil Desa', path: '#profil' },
    { name: 'Struktur', path: '#struktur' },
    { name: 'Geografi', path: '#geografi' },
    { name: 'Aktivitas & Budaya', path: '#aktivitas' },
    { name: 'Berita', path: '#berita' },
    { name: 'UMKM', path: '#umkm' },
    { name: 'Kontak', path: '#kontak' },
  ];

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo-container">
          <div className="logo-icon"></div>
          <img src="/logo%20cikalong.jpeg" alt="Logo Desa Cikalong" className="logo-village" />
          <div className="logo-text">
            <h1>Desa Cikalong</h1>
          </div>
        </div>

        <nav className="desktop-nav">
          <ul>
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link href={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
          <span className={`bar ${mobileMenuOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
        <ul>
          {navLinks.map((link, index) => (
            <li key={index}>
              <Link href={link.path} onClick={() => setMobileMenuOpen(false)}>
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
