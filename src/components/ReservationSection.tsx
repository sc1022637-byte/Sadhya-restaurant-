import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Users, User, Phone, MessageSquare, Check, Sparkles, Award } from 'lucide-react';
import { Reservation } from '../types';
import { motion, AnimatePresence } from 'motion/react';

export default function ReservationSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('07:30 PM');
  const [guests, setGuests] = useState(2);
  const [requests, setRequests] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');

  // Set default date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  const timeSlots = [
    '11:30 AM', '12:30 PM', '01:30 PM', '02:30 PM', '03:30 PM',
    '05:30 PM', '06:30 PM', '07:30 PM', '08:30 PM', '09:30 PM', '10:15 PM'
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date) return;

    setIsSubmitting(true);

    // Simulate database insertion
    setTimeout(() => {
      const bId = 'RES-' + Math.floor(10000 + Math.random() * 90000);
      const newReservation: Reservation = {
        id: bId,
        name,
        phone,
        date,
        timeSlot,
        guests,
        specialRequests: requests,
        status: 'confirmed'
      };

      // Save to localStorage list
      const existing: Reservation[] = JSON.parse(localStorage.getItem('sadhya_reservations') || '[]');
      existing.push(newReservation);
      localStorage.setItem('sadhya_reservations', JSON.stringify(existing));

      setIsSubmitting(false);
      setBookingId(bId);
      setBookingSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setGuests(2);
    setRequests('');
    setTimeSlot('07:30 PM');
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
    setBookingSuccess(false);
  };

  return (
    <section id="reservation" className="py-24 bg-neutral-950 relative overflow-hidden">
      {/* Visual background decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-500 font-mono text-xs font-bold uppercase tracking-widest block mb-2">
            Priority Seating
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight mb-4">
            Book Your Table Online
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Reserve your luxury dining spot in advance to avoid waiting. Special arrangements for anniversaries, birthdays, and family banquets can be requested.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-neutral-900/60 backdrop-blur-md border border-neutral-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 rounded-t-3xl" />

          <AnimatePresence mode="wait">
            {!bookingSuccess ? (
              <motion.form
                id="reservation-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleBookingSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <User className="h-3.5 w-3.5 text-amber-500" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      id="reserve-name"
                      type="text"
                      required
                      placeholder="e.g. Ramesh Chandra"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800/80 rounded-2xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <Phone className="h-3.5 w-3.5 text-amber-500" />
                      <span>Phone Number *</span>
                    </label>
                    <input
                      id="reserve-phone"
                      type="tel"
                      required
                      placeholder="e.g. 98xxxxxxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800/80 rounded-2xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all"
                    />
                  </div>

                  {/* Date Picker */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <Calendar className="h-3.5 w-3.5 text-amber-500" />
                      <span>Select Date *</span>
                    </label>
                    <input
                      id="reserve-date"
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800/80 rounded-2xl px-4 py-3 text-sm text-neutral-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all"
                    />
                  </div>

                  {/* Time Slot Select */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <Clock className="h-3.5 w-3.5 text-amber-500" />
                      <span>Preferred Time *</span>
                    </label>
                    <select
                      id="reserve-time"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800/80 rounded-2xl px-4 py-3 text-sm text-neutral-200 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all cursor-pointer"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot} className="bg-neutral-900 text-white">
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Guest Count */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <Users className="h-3.5 w-3.5 text-amber-500" />
                      <span>Number of Guests *</span>
                    </label>
                    <div className="flex items-center space-x-3 bg-neutral-950 border border-neutral-800/80 px-4 py-2.5 rounded-2xl">
                      <button
                        type="button"
                        id="reserve-guests-dec"
                        disabled={guests <= 1}
                        onClick={() => setGuests(guests - 1)}
                        className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-850 rounded-lg disabled:opacity-30 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center text-sm font-bold text-white font-mono">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                      <button
                        type="button"
                        id="reserve-guests-inc"
                        disabled={guests >= 20}
                        onClick={() => setGuests(guests + 1)}
                        className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-850 rounded-lg disabled:opacity-30 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Special note */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center space-x-1.5">
                      <MessageSquare className="h-3.5 w-3.5 text-amber-500" />
                      <span>Special Food / Seating Requests</span>
                    </label>
                    <textarea
                      id="reserve-requests"
                      rows={3}
                      placeholder="e.g. Birthday celebration, Candlelight table, High chair for child, Non-spicy options needed..."
                      value={requests}
                      onChange={(e) => setRequests(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800/80 rounded-2xl px-4 py-3 text-sm text-neutral-200 placeholder-neutral-600 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    id="reservation-submit-btn"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-widest rounded-2xl transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/20"
                  >
                    {isSubmitting ? (
                      <span className="h-5 w-5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Confirm Reservation</span>
                        <Award className="h-4.5 w-4.5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              /* Success confirmation panel */
              <motion.div
                id="reservation-success-panel"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 space-y-6"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  <Check className="h-8 w-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white tracking-tight">Table Booked & Confirmed!</h3>
                  <p className="text-neutral-400 text-sm max-w-md mx-auto">
                    We look forward to hosting you, <span className="text-white font-bold">{name}</span>. A premium spot has been locked for your group.
                  </p>
                </div>

                {/* Elegant Ticket / Pass representation */}
                <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-6 max-w-md mx-auto space-y-4 font-mono text-xs text-neutral-400 relative overflow-hidden">
                  <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-amber-500" />
                  <div className="flex justify-between items-center text-white border-b border-neutral-900 pb-3">
                    <span className="font-bold text-amber-500 font-sans text-sm">SADHYA PASS</span>
                    <span className="font-bold">{bookingId}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-3 text-left pt-1">
                    <div>
                      <span className="text-neutral-600 block text-[10px]">DATE</span>
                      <span className="text-neutral-200 text-sm font-semibold">{date}</span>
                    </div>
                    <div>
                      <span className="text-neutral-600 block text-[10px]">TIME</span>
                      <span className="text-neutral-200 text-sm font-semibold">{timeSlot}</span>
                    </div>
                    <div>
                      <span className="text-neutral-600 block text-[10px]">PARTY SIZE</span>
                      <span className="text-neutral-200 text-sm font-semibold">{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
                    </div>
                    <div>
                      <span className="text-neutral-600 block text-[10px]">STATUS</span>
                      <span className="text-emerald-500 text-xs font-black uppercase tracking-widest flex items-center gap-1">
                        <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
                        <span>CONFIRMED</span>
                      </span>
                    </div>
                  </div>

                  {requests && (
                    <div className="border-t border-neutral-900 pt-3 text-left">
                      <span className="text-neutral-600 block text-[10px]">SPECIAL NOTE</span>
                      <span className="text-neutral-300 font-sans italic text-xs block">{requests}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    id="new-booking-btn"
                    onClick={handleReset}
                    className="w-full sm:w-auto px-6 py-3 bg-neutral-950 hover:bg-neutral-900 border border-neutral-800 text-neutral-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Book another Table
                  </button>
                  <button
                    id="view-menu-post-booking-btn"
                    onClick={() => {
                      const menuEl = document.getElementById('menu');
                      if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full sm:w-auto px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-1.5"
                  >
                    <span>Pre-order Food</span>
                    <Sparkles className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
