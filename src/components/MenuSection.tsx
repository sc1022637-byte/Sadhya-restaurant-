import React, { useState, useMemo } from 'react';
import { Search, Star, Flame, CheckCircle2, ShoppingCart, Plus, Minus, Filter, Sparkles, AlertCircle } from 'lucide-react';
import { MENU_ITEMS } from '../data/menu';
import { MenuItem, CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface MenuSectionProps {
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (item: MenuItem) => void;
}

export default function MenuSection({ cart, onAddToCart, onRemoveFromCart }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterVeg, setFilterVeg] = useState<boolean>(false);
  const [filterSpicy, setFilterSpicy] = useState<boolean>(false);
  const [filterPopular, setFilterPopular] = useState<boolean>(false);

  // Categories list
  const categories = [
    { id: 'all', name: 'All Dishes' },
    { id: 'starters', name: 'Starters' },
    { id: 'tea-coffee', name: 'Tea & Coffee' },
    { id: 'soups', name: 'Soups' },
    { id: 'shakes', name: 'Surprise Shakes' },
    { id: 'beverages', name: 'Beverages Taji' },
    { id: 'sandwiches', name: 'Sandwiches' },
  ];

  // Map category IDs to cute display icons
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'starters': return '🍢';
      case 'tea-coffee': return '☕';
      case 'soups': return '🥣';
      case 'shakes': return '🥤';
      case 'beverages': return '🍹';
      case 'sandwiches': return '🥪';
      default: return '🍽️';
    }
  };

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesVeg = !filterVeg || item.isVeg;
      const matchesSpicy = !filterSpicy || item.isSpicy;
      const matchesPopular = !filterPopular || item.isPopular;

      return matchesCategory && matchesSearch && matchesVeg && matchesSpicy && matchesPopular;
    });
  }, [selectedCategory, searchQuery, filterVeg, filterSpicy, filterPopular]);

  // Helper to get quantity of item in cart
  const getItemQuantity = (itemId: string) => {
    const item = cart.find((i) => i.menuItem.id === itemId);
    return item ? item.quantity : 0;
  };

  return (
    <section id="menu" className="py-24 bg-neutral-900 relative">
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-500 font-mono text-xs font-bold uppercase tracking-widest block mb-2">
            The Culinary Catalogue
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight mb-4">
            Explore Our Exquisite Menu
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed">
            Every dish is prepared using fresh locally-sourced ingredients, secret spice mixtures, and unmatched dedication to pure vegetarian flavor profiles.
          </p>
        </div>

        {/* Search, Categorization and Filtering Bar */}
        <div className="bg-neutral-950/60 backdrop-blur-md border border-neutral-800 rounded-3xl p-6 mb-12 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <input
                id="menu-search-input"
                type="text"
                placeholder="Search Paneer Tikka, Shakes, Soup..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl pl-12 pr-4 py-3 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all"
              />
            </div>

            {/* Quick Filter Badges */}
            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider">
              <span className="text-neutral-400 flex items-center mr-1 text-[11px]">
                <Filter className="h-3.5 w-3.5 mr-1" /> Filters:
              </span>
              
              <button
                id="filter-veg-btn"
                onClick={() => setFilterVeg(!filterVeg)}
                className={`flex items-center space-x-1 px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                  filterVeg
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Pure Veg</span>
              </button>

              <button
                id="filter-spicy-btn"
                onClick={() => setFilterSpicy(!filterSpicy)}
                className={`flex items-center space-x-1 px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                  filterSpicy
                    ? 'bg-red-500/10 border-red-500/30 text-red-400'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <Flame className="h-3.5 w-3.5" />
                <span>Spicy Special</span>
              </button>

              <button
                id="filter-popular-btn"
                onClick={() => setFilterPopular(!filterPopular)}
                className={`flex items-center space-x-1 px-4 py-2 rounded-xl border transition-all cursor-pointer ${
                  filterPopular
                    ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                <Star className="h-3.5 w-3.5" />
                <span>Popular</span>
              </button>
            </div>
          </div>

          {/* Categories Tab Bar */}
          <div className="mt-6 border-t border-neutral-800 pt-6 overflow-x-auto scrollbar-hide">
            <div className="flex space-x-2 pb-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  id={`cat-tab-${cat.id}`}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center space-x-2 px-5 py-3 rounded-2xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-amber-500 text-neutral-950 font-bold shadow-lg shadow-amber-500/10'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  <span className="text-base">{getCategoryIcon(cat.id)}</span>
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Grid Results count */}
        <div className="flex justify-between items-center mb-6 px-1">
          <span className="text-xs text-neutral-400 font-mono">
            SHOWING <span className="text-amber-500 font-bold">{filteredItems.length}</span> DELICIOUS CHOICES
          </span>
          {(searchQuery || filterVeg || filterSpicy || filterPopular || selectedCategory !== 'all') && (
            <button
              id="clear-all-filters-btn"
              onClick={() => {
                setSearchQuery('');
                setFilterVeg(false);
                setFilterSpicy(false);
                setFilterPopular(false);
                setSelectedCategory('all');
              }}
              className="text-xs text-amber-500 hover:text-amber-400 font-medium underline cursor-pointer"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Menu Grid */}
        <AnimatePresence mode="popLayout">
          {filteredItems.length > 0 ? (
            <motion.div
              layout
              id="menu-items-grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredItems.map((item) => {
                const qty = getItemQuantity(item.id);
                return (
                  <motion.div
                    layout
                    id={`menu-item-card-${item.id}`}
                    key={item.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-neutral-950 border border-neutral-800/80 hover:border-amber-500/30 rounded-3xl overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300"
                  >
                    {/* Item Body */}
                    <div>
                      {/* Image Frame (if exists) */}
                      {item.image ? (
                        <div className="relative h-48 overflow-hidden bg-neutral-900">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          
                          {/* Tags floating on image */}
                          <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                            {item.isPopular && (
                              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-amber-500 text-neutral-950 font-bold text-[9px] uppercase tracking-wider shadow-md">
                                <Star className="h-2.5 w-2.5 fill-neutral-950" />
                                <span>Popular</span>
                              </span>
                            )}
                            {item.isSpicy && (
                              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-red-600 text-white font-bold text-[9px] uppercase tracking-wider shadow-md">
                                <Flame className="h-2.5 w-2.5 fill-white" />
                                <span>Spicy</span>
                              </span>
                            )}
                          </div>
                        </div>
                      ) : (
                        /* Minimalist text fallback frame */
                        <div className="p-6 pb-2 flex justify-between items-start">
                          <div className="flex gap-1.5">
                            {item.isPopular && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold text-[9px] uppercase tracking-wider">
                                Popular
                              </span>
                            )}
                            {item.isSpicy && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-red-400 font-bold text-[9px] uppercase tracking-wider">
                                Spicy
                              </span>
                            )}
                          </div>
                          <span className="text-xl">{getCategoryIcon(item.category)}</span>
                        </div>
                      )}

                      {/* Content details */}
                      <div className="p-6 pt-4">
                        <div className="flex items-start justify-between gap-4 mb-2">
                          <h3 className="font-sans font-bold text-lg text-white group-hover:text-amber-500 transition-colors leading-tight">
                            {item.name}
                          </h3>
                          <div className="flex items-center space-x-1 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded-xl">
                            <span className="text-amber-500 text-[11px] font-bold">₹</span>
                            <span className="text-sm font-bold text-white font-mono">{item.price.toFixed(2)}</span>
                          </div>
                        </div>
                        
                        <p className="text-neutral-400 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-4 min-h-[40px]">
                          {item.description || 'Delicately cooked by our premium chefs using authentic Indian style recipes.'}
                        </p>
                      </div>
                    </div>

                    {/* Actions bar at bottom */}
                    <div className="px-6 pb-6 pt-2 border-t border-neutral-900 flex items-center justify-between">
                      <span className="text-[11px] font-mono font-medium tracking-wide text-neutral-500 uppercase flex items-center space-x-1">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block mr-1" />
                        <span>{item.categoryLabel}</span>
                      </span>

                      {/* Add/Quantity Buttons */}
                      {qty > 0 ? (
                        <div className="flex items-center bg-amber-500 text-neutral-950 rounded-xl overflow-hidden shadow-md shadow-amber-500/10">
                          <button
                            id={`decrease-qty-${item.id}`}
                            onClick={() => onRemoveFromCart(item)}
                            className="px-3 py-1.5 hover:bg-amber-400 transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3 stroke-[3px]" />
                          </button>
                          <span className="px-1 text-sm font-black font-mono select-none w-5 text-center">
                            {qty}
                          </span>
                          <button
                            id={`increase-qty-${item.id}`}
                            onClick={() => onAddToCart(item)}
                            className="px-3 py-1.5 hover:bg-amber-400 transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3 stroke-[3px]" />
                          </button>
                        </div>
                      ) : (
                        <button
                          id={`add-to-cart-${item.id}`}
                          onClick={() => onAddToCart(item)}
                          className="inline-flex items-center justify-center space-x-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider bg-neutral-900 hover:bg-amber-500 hover:text-neutral-950 text-neutral-300 border border-neutral-800 hover:border-amber-600 rounded-xl transition-all cursor-pointer group/btn"
                        >
                          <Plus className="h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div
              id="menu-no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 bg-neutral-950 rounded-3xl border border-neutral-800 max-w-md mx-auto"
            >
              <AlertCircle className="h-12 w-12 text-amber-500/60 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">No dishes found</h3>
              <p className="text-neutral-400 text-xs px-6">
                We couldn't find any dishes matching your filters or search query. Try resetting your choices or checking spelling.
              </p>
              <button
                id="reset-filter-fallback-btn"
                onClick={() => {
                  setSearchQuery('');
                  setFilterVeg(false);
                  setFilterSpicy(false);
                  setFilterPopular(false);
                  setSelectedCategory('all');
                }}
                className="mt-6 px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
              >
                Show All Dishes
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
