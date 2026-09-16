import React, { useState } from "react";
import { BedDouble, Wifi, Coffee, Star, Bell, CheckCircle2, Sparkles, Clock } from "lucide-react";

export const RoomBookingSection: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) return;
    setSubmitted(true);
  };

  const rooms = [
    { name: "Garden Suite", desc: "Overlooking lush lawns with private balcony & open-air seating", price: "₹2,499", icon: "🌿", tag: "Most Popular" },
    { name: "Highway Premium", desc: "Spacious king-size room with highway view & work desk", price: "₹1,999", icon: "🛣️", tag: "Business" },
    { name: "Family Cottage", desc: "Two-room cottage for families with kitchenette & garden access", price: "₹3,499", icon: "🏡", tag: "Family" },
  ];

  return (
    <section id="rooms" className="relative py-20 overflow-hidden bg-gradient-to-b from-[#1a1205] via-[#1f1507] to-[#111]">
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-80 bg-amber-900/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-yellow-950/25 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-950/50 border border-amber-700/40 text-amber-400 text-xs font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" /> Coming Soon
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-700/30 text-red-400 text-xs font-semibold mb-5 ml-2">
            <Clock className="w-3 h-3" /> Launching Soon
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-3 leading-tight">
            Eden Park <span className="text-amber-400">Travellers Stays</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base">
            Premium highway stays designed for pilgrims, business travellers & families on the Bangalore–Tirupati route.
            Clean, comfortable, and Leela-inspired hospitality at every room.
          </p>
        </div>

        {/* Room preview cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-14">
          {rooms.map((room) => (
            <div key={room.name} className="relative group bg-white/5 border border-white/10 rounded-2xl p-6 overflow-hidden hover:border-amber-700/40 transition-all">
              {/* Coming soon overlay */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] rounded-2xl z-10 flex flex-col items-center justify-center gap-2">
                <div className="px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <Clock className="w-3 h-3" /> Coming Soon
                </div>
                <p className="text-gray-400 text-xs">Bookings opening shortly</p>
              </div>
              {/* Card content (blurred behind overlay) */}
              <div className="text-3xl mb-3">{room.icon}</div>
              <div className="inline-block px-2 py-0.5 rounded-full bg-amber-900/40 border border-amber-700/30 text-amber-400 text-[10px] font-bold mb-2">{room.tag}</div>
              <h3 className="text-white font-bold text-lg mb-1">{room.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{room.desc}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-amber-400">{room.price}</span>
                <span className="text-gray-500 text-xs">/ night</span>
              </div>
            </div>
          ))}
        </div>

        {/* Amenities strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
          {[
            { icon: <Wifi className="w-5 h-5"/>, label: "High-Speed WiFi", sub: "All rooms" },
            { icon: <Coffee className="w-5 h-5"/>, label: "24/7 Café Access", sub: "Filter coffee & snacks" },
            { icon: <Star className="w-5 h-5"/>, label: "Leela-Style Service", sub: "Premium hospitality" },
            { icon: <BedDouble className="w-5 h-5"/>, label: "King-Size Beds", sub: "Premium mattresses" },
          ].map((a) => (
            <div key={a.label} className="flex items-start gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-amber-400 mt-0.5 shrink-0">{a.icon}</div>
              <div>
                <p className="text-white font-semibold text-sm">{a.label}</p>
                <p className="text-gray-500 text-xs">{a.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Notify form */}
        <div className="max-w-xl mx-auto text-center">
          <div className="bg-gradient-to-b from-amber-950/40 to-transparent border border-amber-800/30 rounded-2xl p-8">
            <Bell className="w-10 h-10 text-amber-400 mx-auto mb-4" />
            <h3 className="text-white text-xl font-bold mb-2">Get Notified When We Launch</h3>
            <p className="text-gray-400 text-sm mb-6">
              Be the first to book. Subscribers get exclusive early-bird rates.
            </p>
            {submitted ? (
              <div className="flex items-center justify-center gap-2 py-4">
                <CheckCircle2 className="w-6 h-6 text-green-400" />
                <p className="text-green-400 font-semibold">You're on the list! We'll notify you at launch.</p>
              </div>
            ) : (
              <form onSubmit={handleNotify} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/15 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-amber-500 transition-colors"
                />
                <button type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-white font-bold rounded-xl transition-all shadow-lg whitespace-nowrap">
                  Notify Me
                </button>
              </form>
            )}
            <p className="text-gray-600 text-xs mt-4">
              📞 Or call <a href="tel:+919603308999" className="text-amber-600 hover:text-amber-400 underline">+91 96033 08999</a> for advance room enquiries
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
