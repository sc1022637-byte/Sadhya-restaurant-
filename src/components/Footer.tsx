import React from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink, Instagram, Facebook, ShieldCheck } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-neutral-950 border-t border-neutral-900 pt-20 pb-8 text-neutral-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Symmetrical grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Logo / Brand Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-amber-500 p-2 rounded-xl">
                <span className="text-xl font-black text-neutral-950">S</span>
              </div>
              <div>
                <span className="text-lg font-sans font-black text-white tracking-tight uppercase block leading-none">
                  Sadhya
                </span>
                <span className="text-[10px] font-mono text-amber-500 tracking-widest block uppercase">
                  RESTAURANT
                </span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
              Providing exquisite, authentic vegetarian tandoori specialties, thick milkshakes, and premium hot beverages in the historic city of Hathras, Uttar Pradesh.
            </p>

            <div className="flex items-center space-x-3.5 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-900 border border-neutral-800 rounded-xl hover:text-amber-500 hover:border-amber-500/30 transition-all"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-900 border border-neutral-800 rounded-xl hover:text-amber-500 hover:border-amber-500/30 transition-all"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Our Menu Highlights</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li><span className="hover:text-amber-500 transition-colors cursor-pointer" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>Tandoori Paneer Tikka</span></li>
              <li><span className="hover:text-amber-500 transition-colors cursor-pointer" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>Surprise Milkshakes</span></li>
              <li><span className="hover:text-amber-500 transition-colors cursor-pointer" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>Aromatic Masala Shikanji</span></li>
              <li><span className="hover:text-amber-500 transition-colors cursor-pointer" onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}>Cheese Grilled Sandwiches</span></li>
            </ul>
          </div>

          {/* Timings */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Business Hours</h4>
            <ul className="space-y-3.5 text-xs sm:text-sm">
              <li className="flex items-start space-x-3">
                <Clock className="h-4.5 w-4.5 text-amber-500 mt-0.5" />
                <div>
                  <span className="font-bold text-neutral-300 block">Everyday Timings</span>
                  <span className="text-neutral-500">11:00 AM — 11:00 PM</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <ShieldCheck className="h-4.5 w-4.5 text-emerald-500 mt-0.5" />
                <div>
                  <span className="font-bold text-neutral-300 block">FSSAI Certified</span>
                  <span className="text-neutral-500">Reg No: 22724451000542</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Location details */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">Find Our Restaurant</h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-4.5 w-4.5 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-bold text-neutral-300 block">Location Coordinates</span>
                  <span className="text-neutral-500">Chauraha, Chawar Gate, Hathras, Uttar Pradesh 204101</span>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="h-4.5 w-4.5 text-amber-500 mt-0.5" />
                <div>
                  <span className="font-bold text-neutral-300 block">WhatsApp / Phone</span>
                  <span className="text-neutral-500">+91 99999 99999</span>
                </div>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=SADHYA+RESTAURANT+Chawar+Gate+Hathras"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-neutral-900 border border-neutral-800 hover:border-amber-500 hover:text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all"
              >
                <span>Navigate on Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600 font-mono">
          <p>© {currentYear} Sadhya Restaurant Hathras. All Rights Reserved.</p>
          <div className="flex space-x-4">
            <a href="#hero" className="hover:text-amber-500 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#hero" className="hover:text-amber-500 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
