'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone } from 'lucide-react';
import HashLink from './HashLink';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
      ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200 h-20'
      : 'bg-gradient-to-b from-slate-900/70 via-slate-900/30 to-transparent h-24'
      }`}>
      <div className="container max-w-7xl mx-auto px-6 flex justify-between items-center h-full">
        <Link href="/" className="flex items-center group" aria-label="Tidy & Fix, back to homepage">
          <img
            src="/logo-transparente.png"
            alt="Tidy & Fix Logo"
            className={`w-auto transition-all duration-500 group-hover:scale-105 ${isScrolled
              ? 'h-20 brightness-100'
              : 'h-32 brightness-0 invert drop-shadow-lg'
              }`}
          />
        </Link>

        <div className="flex items-center gap-8">
          <nav className="hidden md:flex gap-1 items-center">
            {['About', 'Services', 'Gallery', 'Testimonials', 'FAQ'].map((item) => (
              <HashLink
                key={item}
                to={`#${item.toLowerCase()}`}
                className={`px-4 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 font-sans ${isScrolled
                  ? 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                  : 'text-white hover:text-white hover:bg-white/10 drop-shadow-md'
                  }`}
              >
                {item}
              </HashLink>
            ))}
          </nav>

          {/* Phone Number */}
          <a
            href="tel:+19842124247"
            className={`hidden lg:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-300 ${isScrolled
              ? 'text-blue-600 hover:bg-blue-50'
              : 'text-white hover:bg-white/10'
              }`}
          >
            <Phone size={18} />
            (984) 212-4247
          </a>

          <Link
            href="/quote"
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white transition-all duration-200 bg-blue-600 rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/30 font-heading"
          >
            Get Quote
          </Link>

          <button
            onClick={toggleMobileMenu}
            className={`md:hidden p-2 rounded-lg transition-all duration-300 ${isScrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'
              }`}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden fixed inset-0 z-40 bg-slate-900/98 backdrop-blur-xl transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`} style={{ top: '0' }}>
        <div className="flex flex-col h-full pt-24 px-6 pb-6">
          <button
            onClick={closeMobileMenu}
            className="absolute top-6 right-6 p-2 text-white/70 hover:text-white"
          >
            <X size={32} />
          </button>

          <nav className="flex flex-col space-y-6 items-center justify-center flex-grow">
            {['About', 'Services', 'Gallery', 'Testimonials', 'FAQ'].map((item) => (
              <HashLink
                key={item}
                to={`#${item.toLowerCase()}`}
                onClick={closeMobileMenu}
                className="text-2xl font-heading font-medium text-white hover:text-blue-400 transition-colors"
              >
                {item}
              </HashLink>
            ))}
          </nav>

          <Link
            href="/quote"
            onClick={closeMobileMenu}
            className="w-full py-4 text-center font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg font-heading text-lg"
          >
            Get Quote
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;