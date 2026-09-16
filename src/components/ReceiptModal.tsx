import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  CheckCircle2, 
  X, 
  Clock, 
  MapPin, 
  UtensilsCrossed, 
  Car, 
  Phone, 
  Share2,
  Printer
} from 'lucide-react';

export const ReceiptModal: React.FC = () => {
  const { activeReceiptOrder, setActiveReceiptOrder } = useStore();
  if (!activeReceiptOrder) return null;

  const handlePrint = () => {
    window.print();
  };

  const statusProgress = {
    pending: { label: 'Transmitted to Kitchen', color: 'text-amber-400', step: 1 },
    confirmed: { label: 'Captain Confirmed', color: 'text-blue-400', step: 2 },
    preparing: { label: 'Chef Cooking on Clay Dum', color: 'text-amber-500', step: 3 },
    ready: { label: 'Ready for Service', color: 'text-emerald-400', step: 4 },
    completed: { label: 'Served & Completed', color: 'text-emerald-500', step: 5 },
    cancelled: { label: 'Order Cancelled', color: 'text-red-400', step: 0 },
  }[activeReceiptOrder.status] || { label: 'Order Processing', color: 'text-gold-400', step: 1 };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg rounded-3xl overflow-hidden glass-card border border-gold-500/40 shadow-2xl bg-eden-surface flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 p-6 text-black flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-black border border-gold-400 overflow-hidden shrink-0 shadow-md">
              <img src="/assets/images/logo.png" alt="Eden Park Resto" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-black/80 font-mono">
                The Eden Park Resto
              </div>
              <h3 className="font-serif font-black text-2xl text-black">
                {activeReceiptOrder.id}
              </h3>
            </div>
          </div>

          <button
            onClick={() => setActiveReceiptOrder(null)}
            className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-gray-300">
          
          {/* Status Tracker */}
          <div className="p-4 rounded-2xl bg-eden-card border border-gold-500/20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                Kitchen Live Status
              </span>
              <span className={`text-xs font-bold uppercase tracking-wider ${statusProgress.color}`}>
                ● {statusProgress.label}
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gold-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${(statusProgress.step / 4) * 100}%` }}
              />
            </div>

            <div className="flex justify-between text-[10px] text-gray-400 mt-2 font-mono">
              <span>Order Sent</span>
              <span>Kitchen Prepping</span>
              <span>Ready for Table</span>
            </div>
          </div>

          {/* Dining Details Card */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-eden-card/60 p-3.5 rounded-xl border border-white/5">
            <div>
              <span className="text-gray-500 block">Diner Name</span>
              <span className="text-white font-semibold">{activeReceiptOrder.customerName}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Mobile Verification</span>
              <span className="text-white font-mono">{activeReceiptOrder.customerPhone}</span>
            </div>
            <div>
              <span className="text-gray-500 block">Service Method</span>
              <span className="text-gold-400 font-semibold flex items-center gap-1">
                {activeReceiptOrder.orderType === 'dine-in' ? (
                  <>
                    <UtensilsCrossed className="w-3.5 h-3.5" /> Table: {activeReceiptOrder.tableNumber}
                  </>
                ) : (
                  <>
                    <Car className="w-3.5 h-3.5" /> Express Pickup (~25m)
                  </>
                )}
              </span>
            </div>
            <div>
              <span className="text-gray-500 block">Payment Mode</span>
              <span className="text-white font-semibold">{activeReceiptOrder.paymentMethod}</span>
            </div>
          </div>

          {/* Items Summary */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold mb-2">
              Items Ordered
            </h4>
            <div className="divide-y divide-white/5 border-t border-b border-white/5 py-1">
              {activeReceiptOrder.items.map((ci, idx) => {
                let multiplier = 1;
                if (ci.portion === 'Family Pack') multiplier = 1.8;
                if (ci.portion === 'Full') multiplier = 1.6;
                const unitPrice = Math.round(ci.item.price * multiplier);

                return (
                  <div key={idx} className="py-2.5 flex justify-between items-center text-xs">
                    <div>
                      <span className="font-semibold text-white">
                        {ci.quantity}x {ci.item.name}
                      </span>
                      <span className="text-gray-400 text-[11px] block">
                        Portion: {ci.portion} {ci.notes && `• Note: ${ci.notes}`}
                      </span>
                    </div>
                    <span className="font-mono text-gold-400 font-semibold">
                      ₹{unitPrice * ci.quantity}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bill Total Breakdown */}
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>Subtotal</span>
              <span className="font-mono">₹{activeReceiptOrder.subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Restaurant GST (5%)</span>
              <span className="font-mono">₹{activeReceiptOrder.tax}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
              <span className="font-serif">Total Payable</span>
              <span className="font-mono text-gold-gradient text-lg">
                ₹{activeReceiptOrder.total}
              </span>
            </div>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="p-4 border-t border-white/10 bg-eden-card flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
          >
            <Printer className="w-4 h-4 text-gold-400" />
            <span>Print Receipt</span>
          </button>

          <a
            href="https://wa.me/919603308999"
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
          >
            <Phone className="w-4 h-4" />
            <span>WhatsApp Kitchen</span>
          </a>
        </div>
      </div>
    </div>
  );
};
