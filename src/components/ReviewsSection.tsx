import React, { useState, useEffect } from 'react';
import { Star, MessageSquare, Plus, Check, StarOff, AlertCircle } from 'lucide-react';
import { Review } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const PRESET_REVIEWS: Review[] = [
  {
    id: 'rev-preset-1',
    name: 'Guddi Chaudhary',
    rating: 5,
    comment: 'The food is absolutely amazing! Highly recommend the Paneer Tikka and Mango Surprise Shake. It actually feels like a luxury fine dining spot in Hathras. Quick service and extremely clean environment.',
    date: '2026-06-15'
  },
  {
    id: 'rev-preset-2',
    name: 'Amit Sharma',
    rating: 5,
    comment: 'Sadhya Restaurant has redefined standard vegetarian dishes. Their Cream of Tomato Soup and Masala Soda Shikanji are delicious. The staff is polite, and the pricing is very reasonable for the premium quality they serve.',
    date: '2026-06-22'
  }
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formRating, setFormRating] = useState(5);
  const [formComment, setFormComment] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  // Load reviews on mount
  useEffect(() => {
    const saved = localStorage.getItem('sadhya_reviews');
    if (saved) {
      setReviews(JSON.parse(saved));
    } else {
      setReviews(PRESET_REVIEWS);
      localStorage.setItem('sadhya_reviews', JSON.stringify(PRESET_REVIEWS));
    }
  }, []);

  // Calculate stats
  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formComment) return;

    const newReview: Review = {
      id: 'rev-' + Math.floor(10000 + Math.random() * 90000),
      name: formName,
      rating: formRating,
      comment: formComment,
      date: new Date().toISOString().split('T')[0]
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem('sadhya_reviews', JSON.stringify(updated));

    setSubmitSuccess(true);
    setTimeout(() => {
      setSubmitSuccess(false);
      setFormName('');
      setFormComment('');
      setFormRating(5);
      setShowForm(false);
    }, 1500);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section id="reviews" className="py-24 bg-neutral-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-amber-500 font-mono text-xs font-bold uppercase tracking-widest block mb-2">
            Guest Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-white tracking-tight mb-4">
            Loved By Hundreds
          </h2>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Our customers rating speaks for itself. Don't take our word for it — read real testimonials left by patrons of Sadhya Restaurant.
          </p>
        </div>

        {/* Stats Grid & Action CTA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-stretch">
          
          {/* Average Rating Card */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-lg">
            <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest block mb-1">
              Overall Score
            </span>
            <span className="text-6xl font-sans font-black text-amber-500 tracking-tight leading-none mb-3">
              {averageRating}
            </span>
            <div className="flex text-amber-500 mb-2.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-5 w-5 fill-amber-500 stroke-amber-600" />
              ))}
            </div>
            <span className="text-xs text-neutral-500 font-mono">
              BASED ON {reviews.length} GUEST RATINGS
            </span>
          </div>

          {/* Sizing Meter Card */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-8 flex flex-col justify-center space-y-3.5 shadow-lg">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block">
              Rating Breakdown
            </span>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = reviews.filter(r => r.rating === stars).length;
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={stars} className="flex items-center space-x-3 text-xs">
                    <span className="text-neutral-400 font-mono font-bold w-3">{stars}★</span>
                    <div className="flex-1 h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-850">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-neutral-500 font-mono w-6 text-right">
                      {percentage.toFixed(0)}%
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Call to Review Button Card */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-8 flex flex-col justify-center items-center text-center shadow-lg">
            <MessageSquare className="h-10 w-10 text-amber-500/80 mb-3" />
            <h4 className="text-white font-bold text-base mb-1.5">Dined with us recently?</h4>
            <p className="text-xs text-neutral-500 max-w-xs mb-5">
              Your feedback is valuable to help us consistently deliver high standard Indian culinary masterworks.
            </p>
            <button
              id="write-review-toggle-btn"
              onClick={() => setShowForm(!showForm)}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center space-x-1.5 shadow-lg shadow-amber-500/10"
            >
              <Plus className="h-4 w-4" />
              <span>Share Your Experience</span>
            </button>
          </div>
        </div>

        {/* Dynamic Review Submission Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              id="review-submission-drawer"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden mb-12"
            >
              <form
                onSubmit={handleSubmitReview}
                className="bg-neutral-950 border border-amber-500/20 rounded-3xl p-6 sm:p-8 space-y-6 max-w-2xl mx-auto shadow-2xl relative"
              >
                <h4 className="text-lg font-bold text-white border-b border-neutral-900 pb-3">
                  Write Your Review
                </h4>

                {submitSuccess ? (
                  <div id="review-success-badge" className="text-center py-6 space-y-3">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <Check className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-bold text-white">Thank you! Review added successfully.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Your Name</label>
                        <input
                          id="review-input-name"
                          type="text"
                          required
                          placeholder="e.g. Rahul Verma"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>

                      {/* Interactive Stars selector */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Rating Star Selection</label>
                        <div className="flex items-center space-x-1.5 py-1.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              id={`select-star-${star}`}
                              onClick={() => setFormRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(null)}
                              className="text-amber-500 hover:scale-110 transition-transform cursor-pointer"
                            >
                              <Star
                                className={`h-6 w-6 ${
                                  (hoverRating !== null ? hoverRating >= star : formRating >= star)
                                    ? 'fill-amber-500'
                                    : 'text-neutral-700'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Review Comments text box */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-neutral-400 uppercase tracking-wider block">Detailed Comment</label>
                      <textarea
                        id="review-input-comment"
                        rows={3}
                        required
                        placeholder="Tell us what you loved! e.g. The Paneer Tikka Malai was absolutely out of this world, melts in your mouth..."
                        value={formComment}
                        onChange={(e) => setFormComment(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                      />
                    </div>

                    <div className="flex items-center justify-end space-x-3 pt-2">
                      <button
                        type="button"
                        id="cancel-review-btn"
                        onClick={() => setShowForm(false)}
                        className="px-4 py-2 text-xs font-bold text-neutral-400 hover:text-white uppercase tracking-wider"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        id="submit-review-btn"
                        className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                      >
                        Submit Feedback
                      </button>
                    </div>
                  </>
                )}
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Lists Display */}
        <div id="reviews-list-container" className="space-y-4 max-w-4xl mx-auto">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              id={`review-item-card-${rev.id}`}
              className="bg-neutral-950/60 border border-neutral-800/80 hover:border-neutral-800 rounded-2xl p-6 flex flex-col sm:flex-row gap-5 transition-all"
            >
              {/* User Avatar Circle */}
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold font-mono text-sm self-start">
                {getInitials(rev.name)}
              </div>

              {/* Review details */}
              <div className="flex-1 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="space-y-0.5">
                    <h5 className="font-bold text-white text-sm sm:text-base leading-tight">
                      {rev.name}
                    </h5>
                    <div className="flex text-amber-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-3.5 w-3.5 ${
                            rev.rating >= star ? 'fill-amber-500' : 'text-neutral-800'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-neutral-500 font-mono">
                    {rev.date}
                  </span>
                </div>
                
                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
