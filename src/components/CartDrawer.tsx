import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  Calculator, 
  Utensils, 
  Car, 
  ArrowRight, 
  Flame, 
  CheckCircle2 
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart,
    cartSubtotal, 
    cartTax, 
    cartTotal,
    placeOrder,
    setIsBillSplitOpen 
  } = useStore();

  const [orderType, setOrderType] = useState<'dine-in' | 'pickup'>('dine-in');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isCartOpen) return null;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!customerName.trim()) {
      setErrorMsg('Please enter your name');
      return;
    }
    if (!customerPhone.trim() || customerPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    if (orderType === 'dine-in' && !tableNumber.trim()) {
      setErrorMsg('Please enter your table or gazebo number (or type "Bar/Lounge")');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      placeOrder(customerName, customerPhone, orderType, tableNumber, instructions);
      setIsSubmitting(false);
      setIsCartOpen(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="absolute inset-0" onClick={() => setIsCartOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-eden-surface border-l border-gold-500/20 shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between bg-eden-card">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg text-white">Your Dining Spread</h2>
                <span className="text-xs text-gray-400 font-mono">
                  {cart.length} unique {cart.length === 1 ? 'item' : 'items'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-[11px] text-gray-400 hover:text-red-400 transition-colors uppercase tracking-wider font-semibold"
                >
                  Clear All
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Drawer Body */}
          <div className="p-5 overflow-y-auto flex-1 space-y-6">
            {cart.length === 0 ? (
              <div className="py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-gray-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-lg text-white mb-1">Your order is empty</h3>
                <p className="text-xs text-gray-400 max-w-xs mx-auto mb-6">
                  Explore our digital menu to add royal biryanis, sizzling tandoori starters, and refreshing drinks.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-black bg-gold-gradient shadow-gold-sm"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              <>
                {/* Order Type Tabs */}
                <div className="grid grid-cols-2 gap-2 bg-eden-card p-1 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setOrderType('dine-in')}
                    className={`py-2 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      orderType === 'dine-in'
                        ? 'bg-gold-500 text-black shadow font-bold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Utensils className="w-3.5 h-3.5" />
                    Dine-in Service
                  </button>

                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-2 rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                      orderType === 'pickup'
                        ? 'bg-gold-500 text-black shadow font-bold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Car className="w-3.5 h-3.5" />
                    Highway Pickup
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-3">
                  {cart.map((ci) => {
                    let multiplier = 1;
                    if (ci.portion === 'Family Pack') multiplier = 1.8;
                    if (ci.portion === 'Full') multiplier = 1.6;
                    const itemUnitPrice = Math.round(ci.item.price * multiplier);

                    return (
                      <div
                        key={`${ci.item.id}-${ci.portion}-${ci.selectedSpice}`}
                        className="glass-card p-3.5 rounded-2xl border border-white/10 flex items-start justify-between gap-3"
                      >
                        <div className="flex gap-3">
                          <img
                            src={ci.item.image}
                            alt={ci.item.name}
                            className="w-14 h-14 rounded-xl object-cover border border-white/10 flex-shrink-0"
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`w-2.5 h-2.5 rounded-full ${
                                  ci.item.dietary === 'veg' ? 'bg-green-500' : 'bg-red-500'
                                }`}
                              />
                              <h4 className="font-serif font-bold text-sm text-white leading-tight">
                                {ci.item.name}
                              </h4>
                            </div>

                            <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-2">
                              <span>{ci.portion}</span>
                              {ci.selectedSpice !== undefined && ci.selectedSpice > 0 && (
                                <span className="flex items-center text-red-400">
                                  <Flame className="w-2.5 h-2.5 fill-red-400" />
                                  Level {ci.selectedSpice}
                                </span>
                              )}
                            </div>

                            {ci.notes && (
                              <div className="text-[10px] text-gold-400 italic mt-0.5">
                                Note: {ci.notes}
                              </div>
                            )}

                            <div className="font-mono text-xs font-bold text-gold-400 mt-1">
                              ₹{itemUnitPrice * ci.quantity}
                            </div>
                          </div>
                        </div>

                        {/* Quantity Counter */}
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => removeFromCart(ci.item.id)}
                            className="text-gray-500 hover:text-red-400 transition-colors p-1"
                            title="Remove Item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="flex items-center gap-2 bg-eden-card border border-white/10 rounded-lg p-0.5">
                            <button
                              onClick={() => updateCartQuantity(ci.item.id, -1)}
                              className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 text-white text-xs font-bold flex items-center justify-center"
                            >
                              -
                            </button>
                            <span className="font-mono text-xs font-bold px-1.5 text-white">
                              {ci.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(ci.item.id, 1)}
                              className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 text-white text-xs font-bold flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bill Split Quick Tool Trigger */}
                <button
                  type="button"
                  onClick={() => setIsBillSplitOpen(true)}
                  className="w-full py-2.5 px-4 rounded-xl border border-gold-500/30 bg-gold-500/5 hover:bg-gold-500/10 text-gold-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Calculator className="w-4 h-4 text-gold-400" />
                  <span>Split Bill Across Dining Guests / Friends</span>
                </button>

                {/* Customer Details Form */}
                <form id="orderForm" onSubmit={handleSubmitOrder} className="space-y-3 pt-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Diner & Table Verification
                  </div>

                  <div>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Your Full Name *"
                      className="w-full bg-eden-card border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="WhatsApp Mobile Number (10 digits) *"
                      className="w-full bg-eden-card border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  {orderType === 'dine-in' ? (
                    <div>
                      <input
                        type="text"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                        placeholder="Table / Gazebo / Cabin Number (e.g. Gazebo 4) *"
                        className="w-full bg-eden-card border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-xl bg-eden-card border border-white/10 text-[11px] text-gray-300 flex items-center gap-2">
                      <Car className="w-4 h-4 text-gold-400 flex-shrink-0" />
                      <span>Ready for curb-side pickup at Highway Entrance counter in ~25 mins.</span>
                    </div>
                  )}

                  <div>
                    <input
                      type="text"
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      placeholder="Special instructions for kitchen..."
                      className="w-full bg-eden-card border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  {errorMsg && (
                    <div className="text-xs text-red-400 bg-red-950/40 p-2 rounded-lg border border-red-500/30">
                      {errorMsg}
                    </div>
                  )}
                </form>
              </>
            )}
          </div>

          {/* Drawer Footer Bill & Submit */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-white/10 bg-eden-card space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="font-mono">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>GST (5% Restaurant)</span>
                  <span className="font-mono">₹{cartTax}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                  <span className="font-serif">Grand Total</span>
                  <span className="font-mono text-gold-gradient text-lg">₹{cartTotal}</span>
                </div>
              </div>

              <button
                type="submit"
                form="orderForm"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs text-black bg-gold-gradient shadow-gold-sm hover:shadow-gold-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Transmitting to Kitchen...</span>
                ) : (
                  <>
                    <span>Confirm & Send to Kitchen</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-[10px] text-center text-gray-500 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                <span>Pay seamlessly at your table or counter via Cash / UPI / Card</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
