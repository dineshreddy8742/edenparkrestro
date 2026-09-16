import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Star, MessageSquarePlus, CheckCircle2 } from 'lucide-react';

export const AddReviewModal: React.FC = () => {
  const { isAddReviewOpen, setIsAddReviewOpen, addReview } = useStore();

  const [userName, setUserName] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [diningType, setDiningType] = useState<'Family Dinner' | 'Highway Stopover' | 'Celebration / Party' | 'Weekend Outing'>('Family Dinner');
  const [favoriteDish, setFavoriteDish] = useState('');
  const [comment, setComment] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isAddReviewOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!userName.trim()) {
      setErrorMsg('Please enter your name');
      return;
    }
    if (!comment.trim() || comment.length < 10) {
      setErrorMsg('Please write a brief feedback comment (min 10 characters)');
      return;
    }

    addReview({
      userName,
      userLocation: userLocation || 'Chittoor Patron',
      rating,
      diningType,
      favoriteDish: favoriteDish || 'Hyderabadi Dum Biryani',
      comment,
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setIsAddReviewOpen(false);
      setUserName('');
      setUserLocation('');
      setFavoriteDish('');
      setComment('');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-3xl overflow-hidden bg-white border border-[#E8DCB8] shadow-2xl flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-700 p-5 sm:p-6 text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <MessageSquarePlus className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-amber-100 font-mono">
                Customer Testimonials
              </div>
              <h3 className="font-serif font-bold text-xl text-white">
                Share Your Dining Experience
              </h3>
            </div>
          </div>

          <button
            onClick={() => setIsAddReviewOpen(false)}
            className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-4 bg-white">
          {isSuccess ? (
            <div className="py-12 text-center space-y-3 animate-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-emerald-100 border border-emerald-500 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="font-serif font-bold text-2xl text-leela-heading">
                Thank You for Your Review!
              </h4>
              <p className="text-xs text-leela-muted">
                Your feedback has been published to our community testimonial showcase.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {/* Rating Stars */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-leela-muted mb-2">
                  Your Overall Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-gold-500 hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating ? 'fill-gold-500 text-gold-500' : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-mono text-sm font-bold text-gold-700 ml-2">
                    {rating} / 5 Stars
                  </span>
                </div>
              </div>

              {/* Occasion */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-leela-muted mb-1.5">
                  Dining Occasion
                </label>
                <select
                  value={diningType}
                  onChange={(e) => setDiningType(e.target.value as any)}
                  className="w-full bg-[#FAF7F2] border border-[#DFCDAB] rounded-xl px-3.5 py-2.5 text-xs text-leela-heading font-semibold focus:outline-none focus:border-gold-500"
                >
                  <option value="Family Dinner">Family Dinner</option>
                  <option value="Highway Stopover">Highway Stopover (Commuter)</option>
                  <option value="Celebration / Party">Celebration / Party / Anniversary</option>
                  <option value="Weekend Outing">Weekend Outing</option>
                </select>
              </div>

              {/* Name and Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase tracking-wider text-leela-muted mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Ramesh Naidu"
                    className="w-full bg-[#FAF7F2] border border-[#DFCDAB] rounded-xl px-3.5 py-2.5 text-xs text-leela-heading placeholder-gray-400 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase tracking-wider text-leela-muted mb-1.5">
                    Your City / Town
                  </label>
                  <input
                    type="text"
                    value={userLocation}
                    onChange={(e) => setUserLocation(e.target.value)}
                    placeholder="e.g. Bangalore, Tirupati, Chittoor"
                    className="w-full bg-[#FAF7F2] border border-[#DFCDAB] rounded-xl px-3.5 py-2.5 text-xs text-leela-heading placeholder-gray-400 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Favorite Dish */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-leela-muted mb-1.5">
                  Favorite Dish Ordered
                </label>
                <input
                  type="text"
                  value={favoriteDish}
                  onChange={(e) => setFavoriteDish(e.target.value)}
                  placeholder="e.g. Mutton Ghee Roast, Hyderabad Dum Biryani, Malai Broccoli"
                  className="w-full bg-[#FAF7F2] border border-[#DFCDAB] rounded-xl px-3.5 py-2.5 text-xs text-leela-heading placeholder-gray-400 focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Comment */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-leela-muted mb-1.5">
                  Your Thoughts & Feedback *
                </label>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell others about the food flavour, lawn ambiance, service, and hospitality..."
                  className="w-full bg-[#FAF7F2] border border-[#DFCDAB] rounded-xl px-3.5 py-2.5 text-xs text-leela-heading placeholder-gray-400 focus:outline-none focus:border-gold-500"
                />
              </div>

              {errorMsg && (
                <div className="text-xs text-red-700 bg-red-50 p-2.5 rounded-xl border border-red-200 font-semibold">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs text-white bg-gradient-to-r from-gold-600 to-gold-700 shadow-gold-sm hover:shadow-gold-md transition-all"
              >
                Post Diner Review
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
