import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Utensils, Award, BookOpen, MessageSquare, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export default function Header({ cartCount, onCartClick, activeSection, scrollToSection }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', name: 'Home', icon: Utensils },
    { id: 'menu', name: 'Our Menu', icon: BookOpen },
    { id: 'reservation', name: 'Book Table', icon: Award },
    { id: 'reviews', name: 'Reviews', icon: MessageSquare },
    { id: 'contact', name: 'Find Us', icon: MapPin },
  ];

  const handleNavClick = (id: string) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-neutral-900/90 backdrop-blur-md border-b border-amber-500/20 shadow-lg py-3'
          : 'bg-gradient-to-b from-black/80 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <div
            id="brand-logo"
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => handleNavClick('hero')}
          >
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-2 rounded-xl shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Utensils className="h-6 w-6 text-neutral-950" />
            </div>
            <div>
              <span className="text-xl font-sans font-bold text-white tracking-tight uppercase block leading-none">
                Sadhya
              </span>
              <span className="text-xs font-mono text-amber-500 tracking-widest block uppercase">
                RESTAURANT
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center space-x-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'text-amber-500 bg-amber-500/10'
                      : 'text-neutral-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-amber-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions: Cart, CTA Button, Mobile Toggle */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <button
              id="header-cart-btn"
              onClick={onCartClick}
              className="relative p-2.5 rounded-xl bg-neutral-800 text-amber-500 hover:text-white hover:bg-neutral-700/80 border border-neutral-700 transition-all cursor-pointer group"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-neutral-950 animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* CTA Table Reservation Button */}
            <button
              id="header-cta-btn"
              onClick={() => handleNavClick('reservation')}
              className="hidden sm:inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-amber-500 text-neutral-950 hover:bg-amber-400 border border-amber-600 transition-all cursor-pointer shadow-md shadow-amber-500/10 hover:shadow-amber-500/25"
            >
              Book Table
            </button>

            {/* Mobile menu toggle */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-xl bg-neutral-800 text-neutral-400 hover:text-white transition-all border border-neutral-700"
              aria-label="Toggle main menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-neutral-950 border-b border-neutral-800 shadow-xl overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-btn-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-left font-medium transition-all ${
                      isActive
                        ? 'text-amber-500 bg-amber-500/10 font-semibold'
                        : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
                    }`}
                  >
                    <Icon className="h-5 w-5 text-amber-500/70" />
                    <span>{item.name}</span>
                  </button>
                );
              })}
              <button
                id="mobile-nav-cta-btn"
                onClick={() => handleNavClick('reservation')}
                className="w-full mt-4 flex items-center justify-center py-3 rounded-xl text-sm font-bold uppercase tracking-widest bg-amber-500 text-neutral-950 hover:bg-amber-400 transition-all border border-amber-600 shadow-lg shadow-amber-500/20"
              >
                Book Table
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
