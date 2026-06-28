import React from 'react';
import { Star, Clock, MapPin, Sparkles, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onExploreMenu: () => void;
  onBookTable: () => void;
}

export default function Hero({ onExploreMenu, onBookTable }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-neutral-950 overflow-hidden pt-16"
    >
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/sadhya_hero_1782642492538.jpg"
          alt="Sadhya Restaurant Interior"
          className="w-full h-full object-cover object-center scale-105 filter brightness-45 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/80 via-transparent to-neutral-950/80" />
      </div>

      {/* Decorative Symmetrical Lines or Ornaments */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-10 opacity-20">
        <div className="hidden lg:block w-[1px] h-3/4 bg-gradient-to-b from-transparent via-amber-500 to-transparent" />
        <div className="hidden lg:block w-[1px] h-3/4 bg-gradient-to-b from-transparent via-amber-500 to-transparent" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10 pb-20">
        {/* Quality/Award Tagline */}
        <motion.div
          id="hero-tag"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-semibold tracking-wider uppercase mb-6"
        >
          <Sparkles className="h-3.5 w-3.5 animate-pulse" />
          <span>Hathras' Highest Rated Culinary Destination</span>
        </motion.div>

        {/* Main Brand Title */}
        <motion.h1
          id="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-sans font-bold text-white tracking-tight leading-none mb-4"
        >
          SADHYA <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600">RESTAURANT</span>
        </motion.h1>

        {/* Under-title Tagline / Description */}
        <motion.p
          id="hero-desc"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-neutral-300 font-sans tracking-wide leading-relaxed mb-8"
        >
          An elite vegetarian fine-dining experience at the heart of Chawar Gate. Savor our signature Tandoori Platter, freshly ground Shikanji, and magical Surprise Shakes crafted with luxury and love.
        </motion.p>

        {/* Rating and Badges Grid */}
        <motion.div
          id="hero-badges"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-2 sm:flex sm:items-center sm:justify-center gap-4 max-w-xl mx-auto mb-10 text-xs sm:text-sm text-neutral-300 font-medium"
        >
          <div className="flex items-center justify-center space-x-2 bg-neutral-900/60 backdrop-blur-sm border border-neutral-800/80 px-4 py-2.5 rounded-2xl">
            <div className="flex text-amber-500">
              <Star className="h-4 w-4 fill-amber-500" />
              <Star className="h-4 w-4 fill-amber-500" />
              <Star className="h-4 w-4 fill-amber-500" />
              <Star className="h-4 w-4 fill-amber-500" />
              <Star className="h-4 w-4 fill-amber-500" />
            </div>
            <span className="font-semibold text-white">5.0 Star Rated</span>
          </div>

          <div className="flex items-center justify-center space-x-2 bg-neutral-900/60 backdrop-blur-sm border border-neutral-800/80 px-4 py-2.5 rounded-2xl">
            <Clock className="h-4 w-4 text-amber-500" />
            <span>Open: 11 AM - 11 PM</span>
          </div>

          <div className="col-span-2 sm:col-span-1 flex items-center justify-center space-x-2 bg-neutral-900/60 backdrop-blur-sm border border-neutral-800/80 px-4 py-2.5 rounded-2xl">
            <MapPin className="h-4 w-4 text-amber-500" />
            <span>Chawar Gate, Hathras</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          id="hero-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            id="hero-explore-menu-btn"
            onClick={onExploreMenu}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider bg-amber-500 text-neutral-950 hover:bg-amber-400 border border-amber-600 transition-all cursor-pointer shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0"
          >
            Explore Menu
          </button>
          <button
            id="hero-book-table-btn"
            onClick={onBookTable}
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold uppercase tracking-wider bg-neutral-900 text-white border border-neutral-700 hover:bg-neutral-800 hover:border-amber-500/50 transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0"
          >
            Book A Table
          </button>
        </motion.div>

        {/* Features Checklist */}
        <motion.div
          id="hero-features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex items-center justify-center space-x-6 mt-12 text-xs text-neutral-400 font-medium"
        >
          <span className="flex items-center space-x-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Premium Dine-in</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>Kerbside Pickup</span>
          </span>
          <span className="flex items-center space-x-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>No-Contact Delivery</span>
          </span>
        </motion.div>

        {/* Scroll down indicator */}
        <motion.div
          id="hero-scroll-indicator"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-neutral-500 hover:text-amber-500 cursor-pointer transition-colors hidden sm:block"
          onClick={onExploreMenu}
        >
          <ChevronDown className="h-6 w-6 mx-auto" />
        </motion.div>
      </div>
    </section>
  );
}
