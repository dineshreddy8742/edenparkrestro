import React, { useState } from 'react';
import { MenuItem, SpiceLevel } from '../types';
import { useStore } from '../context/StoreContext';
import { X, Flame, Clock, Sparkles, Check, ShoppingBag } from 'lucide-react';

interface Props {
  item: MenuItem | null;
  onClose: () => void;
}

export const ItemCustomizeModal: React.FC<Props> = ({ item, onClose }) => {
  const { addToCart, setIsCartOpen } = useStore();
  if (!item) return null;

  const [portion, setPortion] = useState<'Regular' | 'Family Pack' | 'Full'>('Regular');
  const [spice, setSpice] = useState<SpiceLevel>(item.spiceLevel);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');

  const calculatePrice = () => {
    let multiplier = 1;
    if (portion === 'Family Pack') multiplier = 1.8;
    if (portion === 'Full') multiplier = 1.6;
    return Math.round(item.price * multiplier) * quantity;
  };

  const handleAddToCart = () => {
    addToCart(item, quantity, portion, spice, notes);
    onClose();
    setIsCartOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-3xl overflow-hidden glass-card border border-gold-500/30 shadow-2xl bg-eden-surface flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-gray-300 hover:text-white border border-white/10 hover:border-gold-500 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Image */}
        <div className="relative h-52 w-full overflow-hidden bg-eden-card">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-eden-surface via-transparent to-black/40" />

          <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span 
                  className={`w-4 h-4 rounded-sm flex items-center justify-center border ${
                    item.dietary === 'veg' ? 'border-green-500' : 'border-red-500'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${item.dietary === 'veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                </span>
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold font-mono">
                  {item.category}
                </span>
              </div>
              <h2 className="font-serif font-bold text-2xl text-white">
                {item.name}
              </h2>
            </div>
            <div className="text-2xl font-bold font-mono text-gold-gradient">
              ₹{calculatePrice()}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          <p className="text-sm text-gray-300 font-light leading-relaxed">
            {item.description}
          </p>

          {/* Portion Size */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Select Portion Size
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setPortion('Regular')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  portion === 'Regular'
                    ? 'border-gold-500 bg-gold-500/10 text-white shadow-gold-sm'
                    : 'border-white/10 bg-eden-card text-gray-400 hover:border-white/20'
                }`}
              >
                <div className="font-semibold text-sm">Regular Serving</div>
                <div className="text-xs text-gold-400 font-mono mt-0.5">₹{item.price}</div>
              </button>

              <button
                type="button"
                onClick={() => setPortion('Family Pack')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  portion === 'Family Pack'
                    ? 'border-gold-500 bg-gold-500/10 text-white shadow-gold-sm'
                    : 'border-white/10 bg-eden-card text-gray-400 hover:border-white/20'
                }`}
              >
                <div className="font-semibold text-sm">Family Pack (Serves 3-4)</div>
                <div className="text-xs text-gold-400 font-mono mt-0.5">₹{Math.round(item.price * 1.8)}</div>
              </button>
            </div>
          </div>

          {/* Spice Level Adjuster */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Kitchen Spice Preference
            </label>
            <div className="grid grid-cols-4 gap-2">
              {[
                { lvl: 0, label: 'Mild' },
                { lvl: 1, label: 'Medium' },
                { lvl: 2, label: 'Spicy' },
                { lvl: 3, label: 'Rayalaseema Extra' },
              ].map((sp) => (
                <button
                  key={sp.lvl}
                  type="button"
                  onClick={() => setSpice(sp.lvl as SpiceLevel)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    spice === sp.lvl
                      ? 'border-red-500 bg-red-950/40 text-red-200'
                      : 'border-white/10 bg-eden-card text-gray-400 hover:border-white/20'
                  }`}
                >
                  <div className="flex justify-center mb-1">
                    <Flame className={`w-3.5 h-3.5 ${spice === sp.lvl ? 'text-red-500 fill-red-500' : 'text-gray-500'}`} />
                  </div>
                  <div className="text-[11px] font-semibold">{sp.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Special Cooking Instructions */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
              Special Chef Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Less oil, crispy roasted, extra lemons..."
              className="w-full bg-eden-card border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-gold-500 transition-colors"
            />
          </div>

          {/* Quantity Counter */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm font-semibold text-gray-300">Quantity</span>
            <div className="flex items-center gap-3 bg-eden-card border border-white/10 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold flex items-center justify-center transition-colors"
              >
                -
              </button>
              <span className="font-mono font-bold text-base px-2 text-gold-400">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer CTA */}
        <div className="p-5 border-t border-white/10 bg-eden-card flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-gray-400 uppercase tracking-wider">Total Item Price</div>
            <div className="text-xl font-bold font-mono text-gold-gradient">
              ₹{calculatePrice()}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className="flex-1 py-3.5 px-6 rounded-xl font-bold uppercase tracking-widest text-xs text-black bg-gold-gradient shadow-gold-sm hover:shadow-gold-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Order</span>
          </button>
        </div>
      </div>
    </div>
  );
};
