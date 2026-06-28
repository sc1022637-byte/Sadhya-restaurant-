import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import CartSection from './components/CartSection';
import ReservationSection from './components/ReservationSection';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import { CartItem, MenuItem } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('sadhya_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart from storage', e);
      }
    }
  }, []);

  // Save cart to localStorage on changes
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('sadhya_cart', JSON.stringify(newCart));
  };

  // Cart operations
  const handleAddToCart = (item: MenuItem) => {
    const existing = cart.find((i) => i.menuItem.id === item.id);
    if (existing) {
      const updated = cart.map((i) =>
        i.menuItem.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      saveCart(updated);
    } else {
      const updated = [...cart, { menuItem: item, quantity: 1 }];
      saveCart(updated);
    }
  };

  const handleRemoveFromCart = (item: MenuItem) => {
    const existing = cart.find((i) => i.menuItem.id === item.id);
    if (!existing) return;

    if (existing.quantity === 1) {
      const updated = cart.filter((i) => i.menuItem.id !== item.id);
      saveCart(updated);
    } else {
      const updated = cart.map((i) =>
        i.menuItem.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
      );
      saveCart(updated);
    }
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  // Scroll to section function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Header height offset
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  // Auto detect active section as we scroll down
  useEffect(() => {
    const sections = ['hero', 'menu', 'reservation', 'reviews', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120; // adding offset

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-100 flex flex-col font-sans selection:bg-amber-500 selection:text-neutral-950">
      {/* Sticky Header Navigation */}
      <Header
        cartCount={totalCartCount}
        onCartClick={() => setIsCartOpen(true)}
        activeSection={activeSection}
        scrollToSection={scrollToSection}
      />

      {/* Main Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMenu={() => scrollToSection('menu')}
          onBookTable={() => scrollToSection('reservation')}
        />

        {/* Menu Section */}
        <MenuSection
          cart={cart}
          onAddToCart={handleAddToCart}
          onRemoveFromCart={handleRemoveFromCart}
        />

        {/* Reservation Section */}
        <ReservationSection />

        {/* Reviews Section */}
        <ReviewsSection />
      </main>

      {/* Footer Contact Details */}
      <Footer />

      {/* Sliding Checkout/Cart Drawer overlay */}
      <CartSection
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onAddToCart={handleAddToCart}
        onRemoveFromCart={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
