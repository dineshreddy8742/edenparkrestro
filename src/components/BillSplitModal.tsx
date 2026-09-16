import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Calculator, Users, DollarSign, Copy, Check } from 'lucide-react';

export const BillSplitModal: React.FC = () => {
  const { isBillSplitOpen, setIsBillSplitOpen, cartTotal, cartSubtotal } = useStore();
  const [persons, setPersons] = useState(4);
  const [tipPercent, setTipPercent] = useState(0); // 0, 5%, 10%
  const [copied, setCopied] = useState(false);

  if (!isBillSplitOpen) return null;

  const tipAmount = Math.round(cartSubtotal * (tipPercent / 100));
  const finalPayable = cartTotal + tipAmount;
  const perPersonShare = Math.ceil(finalPayable / persons);

  const handleCopyShare = () => {
    const text = `The Eden Park Resto Dining Bill:\nTotal: ₹${finalPayable} (incl taxes)\nSplit across ${persons} persons: ₹${perPersonShare} per person.\nPay via UPI to group host!`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md rounded-3xl overflow-hidden glass-card border border-gold-500/30 shadow-2xl bg-eden-surface p-6 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-white">Bill Split Calculator</h3>
              <span className="text-xs text-gray-400">Share total evenly with dinner companions</span>
            </div>
          </div>

          <button
            onClick={() => setIsBillSplitOpen(false)}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bill Summary */}
        <div className="bg-eden-card p-4 rounded-2xl border border-white/10 space-y-2 text-xs">
          <div className="flex justify-between text-gray-400">
            <span>Bill with 5% GST</span>
            <span className="font-mono text-white">₹{cartTotal}</span>
          </div>

          {/* Tip Options */}
          <div className="pt-2">
            <label className="text-[11px] text-gray-400 block mb-1.5 font-semibold uppercase tracking-wider">
              Add Staff Appreciation Tip (Optional)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[0, 5, 10, 15].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setTipPercent(pct)}
                  className={`py-1.5 rounded-lg text-xs font-semibold font-mono transition-all ${
                    tipPercent === pct
                      ? 'bg-gold-500 text-black font-bold shadow-sm'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {pct === 0 ? 'No Tip' : `${pct}%`}
                </button>
              ))}
            </div>
          </div>

          {tipAmount > 0 && (
            <div className="flex justify-between text-gold-400 pt-1">
              <span>Gratuity Tip ({tipPercent}%)</span>
              <span className="font-mono">+₹{tipAmount}</span>
            </div>
          )}

          <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-white/10">
            <span>Total Payable</span>
            <span className="font-mono text-gold-gradient text-base">₹{finalPayable}</span>
          </div>
        </div>

        {/* Persons Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold">
            <span className="text-gray-300 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-gold-400" />
              Number of Guests Paying:
            </span>
            <span className="text-gold-400 font-mono font-bold text-sm">{persons} Persons</span>
          </div>

          <input
            type="range"
            min="2"
            max="20"
            value={persons}
            onChange={(e) => setPersons(Number(e.target.value))}
            className="w-full accent-gold-500 bg-eden-card cursor-pointer"
          />
        </div>

        {/* Big Per-Person Result Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-gold-500/10 via-eden-card to-eden-surface border border-gold-500/40 text-center">
          <div className="text-xs uppercase tracking-widest text-gold-300 font-semibold mb-1">
            Individual Share
          </div>
          <div className="text-4xl font-serif font-black text-gold-gradient font-mono">
            ₹{perPersonShare}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">
            Each person pays ₹{perPersonShare} for a total of ₹{finalPayable}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleCopyShare}
            className="flex-1 py-3 rounded-xl border border-gold-500/30 bg-gold-500/10 hover:bg-gold-500/20 text-gold-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy WhatsApp Share Text</span>
              </>
            )}
          </button>

          <button
            onClick={() => setIsBillSplitOpen(false)}
            className="px-5 py-3 rounded-xl bg-eden-card text-white text-xs font-semibold hover:bg-white/10 transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
