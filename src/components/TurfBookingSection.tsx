import React, { useState, useCallback, useMemo } from "react";
import {
  Calendar, Clock, User, Phone, CheckCircle2, AlertCircle,
  Sun, Moon, CreditCard, Trophy, ChevronRight, Zap, Users, Timer,
  MapPin, Star, ShieldCheck, HelpCircle, ArrowRight, Share2, Sparkles,
  Check, RefreshCw, Info
} from "lucide-react";

// Types
export interface TurfBooking {
  id: string;
  createdAt: string;
  date: string;          // "2026-09-09"
  sport: string;         // "Box Cricket" | "5v5 Football"
  court: string;         // "Court 1 (Main Arena)" | "Court 2 (Box 2)"
  startHour: number;     // 6
  durationHours: number; // 1 | 2 | 3 | 4
  endHour: number;       // 8
  startLabel: string;    // "06:00 AM"
  endLabel: string;      // "08:00 AM"
  timeRange: string;     // "06:00 AM - 08:00 AM"
  name: string;
  phone: string;
  players: string;
  notes: string;
  total: number;
  paymentId: string;
  status: "confirmed" | "cancelled";
}

// Razorpay declaration
declare global { interface Window { Razorpay: any; } }
const loadRazorpay = (): Promise<boolean> =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

// Helpers
const hourToLabel = (h: number): string => {
  const suffix = h < 12 ? "AM" : "PM";
  const h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${String(h12).padStart(2, "0")}:00 ${suffix}`;
};

const calcPrice = (startHour: number, durationHours: number): number => {
  let total = 0;
  for (let i = 0; i < durationHours; i++) {
    const h = startHour + i;
    total += h < 18 ? 600 : 700; // Day: 600, Night (after 6 PM): 700
  }
  return total;
};

const todayStr = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const formatDisplayDate = (dateStr: string): string => {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
};

// Generate next 7 days for quick date pills (Playo style)
const getNextDays = (count: number = 7) => {
  const list = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const val = `${yyyy}-${mm}-${dd}`;
    const dayName = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-IN", { weekday: "short" });
    const dateFormatted = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" });
    list.push({ val, dayName, dateFormatted });
  }
  return list;
};

// Available time slots (6 AM to 10 PM)
const MORNING_SLOTS = [6, 7, 8, 9, 10, 11];     // 6 AM - 12 PM
const AFTERNOON_SLOTS = [12, 13, 14, 15, 16, 17]; // 12 PM - 6 PM
const EVENING_SLOTS = [18, 19, 20, 21];          // 6 PM - 10 PM

const DURATION_OPTIONS = [
  { hours: 1, label: "1 hr" },
  { hours: 2, label: "2 hrs" },
  { hours: 3, label: "3 hrs" },
  { hours: 4, label: "4 hrs" }
];

const STORAGE_KEY = "eden_turf_bookings";
const loadBookings = (): TurfBooking[] => {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
};

interface Props {
  externalBookings?: TurfBooking[];
  onNewBooking?: (b: TurfBooking) => void;
}

export const TurfBookingSection: React.FC<Props> = ({ externalBookings, onNewBooking }) => {
  const [sport, setSport] = useState<"Box Cricket" | "5v5 Football">("Box Cricket");
  const [court, setCourt] = useState<string>("Court 1 (Main Arena)");
  const [date, setDate] = useState<string>(todayStr());
  const [duration, setDuration] = useState<number>(1);
  const [startHour, setStartHour] = useState<number | null>(null);

  // Customer form details
  const [form, setForm] = useState({
    name: "",
    phone: "",
    players: "10-14 Players",
    notes: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState<TurfBooking | null>(null);
  const [paymentMode, setPaymentMode] = useState<"venue" | "online">("venue");

  const daysList = useMemo(() => getNextDays(7), []);

  // Bookings list
  const allBookings: TurfBooking[] = useMemo(() => externalBookings ?? loadBookings(), [externalBookings]);

  // Booked hours set for current date & court
  const bookedHoursForDate = useMemo(() => {
    const set = new Set<number>();
    allBookings
      .filter(b => b.date === date && b.status !== "cancelled" && (!b.court || b.court === court))
      .forEach(b => {
        for (let i = 0; i < (b.durationHours || 1); i++) {
          set.add(b.startHour + i);
        }
      });
    return set;
  }, [allBookings, date, court]);

  // Check slot status: 'available' | 'booked' | 'passed'
  const getSlotStatus = useCallback((h: number): 'available' | 'booked' | 'passed' => {
    if (h + duration > 22) return 'booked';
    const now = new Date();
    const isToday = date === todayStr();
    if (isToday && h <= now.getHours()) return 'passed';
    for (let i = 0; i < duration; i++) {
      if (bookedHoursForDate.has(h + i)) return 'booked';
    }
    return 'available';
  }, [date, duration, bookedHoursForDate]);

  const isSlotAvailable = useCallback((h: number): boolean => {
    return getSlotStatus(h) === 'available';
  }, [getSlotStatus]);

  const endHour = startHour !== null ? startHour + duration : null;
  const price = startHour !== null ? calcPrice(startHour, duration) : 0;
  const startLabel = startHour !== null ? hourToLabel(startHour) : "";
  const endLabel = endHour !== null ? hourToLabel(endHour) : "";

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleBooking = useCallback(async () => {
    if (startHour === null) {
      setError("Please select a time slot first.");
      return;
    }
    if (!form.name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    setError("");

    const bookingId = `TRF-${Math.floor(10000 + Math.random() * 90000)}`;

    const finalize = (paymentId: string) => {
      const b: TurfBooking = {
        id: bookingId,
        createdAt: new Date().toISOString(),
        date,
        sport,
        court,
        startHour: startHour!,
        durationHours: duration,
        endHour: startHour! + duration,
        startLabel: hourToLabel(startHour!),
        endLabel: hourToLabel(startHour! + duration),
        timeRange: `${hourToLabel(startHour!)} - ${hourToLabel(startHour! + duration)}`,
        name: form.name,
        phone: form.phone,
        players: form.players,
        notes: form.notes,
        total: price,
        paymentId,
        status: "confirmed",
      };

      const prev = loadBookings();
      localStorage.setItem(STORAGE_KEY, JSON.stringify([b, ...prev]));
      onNewBooking?.(b);
      setConfirmed(b);
      setLoading(false);
    };

    // If customer chooses Pay on Arrival / UPI at Venue
    if (paymentMode === "venue") {
      finalize(`PAY-AT-TURF-${Date.now().toString().slice(-6)}`);
      return;
    }

    // Online Payment via Razorpay
    const loaded = await loadRazorpay();
    if (!loaded) {
      finalize(`UPI-COUNTER-${Date.now().toString().slice(-6)}`);
      return;
    }

    const options = {
      key: (import.meta as any).env?.VITE_RAZORPAY_KEY_ID || "rzp_test_YourRazorpayKeyHere",
      amount: price * 100,
      currency: "INR",
      name: "The Eden Park Arena",
      description: `${sport} (${court}) • ${formatDisplayDate(date)} (${hourToLabel(startHour)} - ${hourToLabel(startHour + duration)})`,
      prefill: {
        name: form.name,
        contact: form.phone,
      },
      notes: {
        bookingId,
        date,
        sport,
        court,
        slot: `${hourToLabel(startHour)} - ${hourToLabel(startHour + duration)}`,
      },
      theme: { color: "#10b981" },
      handler: (response: any) => {
        finalize(response.razorpay_payment_id || `PAY-${Date.now()}`);
      },
      modal: {
        ondismiss: () => {
          setLoading(false);
          setError("Payment window closed. You can also select 'Pay at Turf' to confirm instantly.");
        }
      }
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      finalize(`PAY-OFFLINE-${Date.now().toString().slice(-6)}`);
    }
  }, [form, startHour, duration, date, sport, court, price, paymentMode, onNewBooking]);

  const resetSelection = () => {
    setConfirmed(null);
    setStartHour(null);
    setForm({ name: "", phone: "", players: "10-14 Players", notes: "" });
  };

  return (
    <section id="turf" className="relative py-16 bg-[#0a0f0d] text-gray-200 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 left-1/3 w-[550px] h-[550px] bg-emerald-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-10 w-[400px] h-[400px] bg-teal-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">

        {/* Playo-Style Venue Header Bar */}
        <div className="bg-[#121915] border border-emerald-900/40 rounded-3xl p-6 sm:p-8 mb-8 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Trophy className="w-3.5 h-3.5" /> Chittoor Sports Landmark
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> 4.9 (420+ Reviews)
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-300">
                  <Clock className="w-3.5 h-3.5 text-gray-400" /> Open 06:00 AM – 10:00 PM
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                The Eden Park <span className="text-emerald-400">Turf Arena</span>
              </h2>

              <p className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                Bangalore–Tirupati National Highway, Patnam, Chittoor (Next to AC Restro)
              </p>

              {/* Amenity tags */}
              <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-white/5 text-xs text-gray-300">
                <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">🏏 Free Bats, Balls & Stumps</span>
                <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">💡 High-Mast LED Floodlights</span>
                <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">🌧️ FIFA Grade 50mm AstroTurf</span>
                <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">🚗 Spacious Highway Car Parking</span>
                <span className="px-2.5 py-1 bg-white/5 rounded-lg border border-white/10">🚿 Changing Rooms & Cafe</span>
              </div>
            </div>

            {/* Pricing Badges */}
            <div className="flex flex-row sm:flex-col lg:flex-row gap-3 self-start lg:self-center">
              <div className="p-3.5 sm:px-5 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-center min-w-[140px]">
                <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400 font-semibold uppercase">
                  <Sun className="w-3.5 h-3.5" /> Day Slots
                </div>
                <div className="text-2xl font-black text-white mt-1">₹600<span className="text-xs text-gray-400 font-normal">/hr</span></div>
                <div className="text-[10px] text-gray-400 mt-0.5">06:00 AM – 06:00 PM</div>
              </div>

              <div className="p-3.5 sm:px-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center min-w-[140px]">
                <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-semibold uppercase">
                  <Moon className="w-3.5 h-3.5" /> Night Floodlights
                </div>
                <div className="text-2xl font-black text-emerald-400 mt-1">₹700<span className="text-xs text-gray-400 font-normal">/hr</span></div>
                <div className="text-[10px] text-gray-400 mt-0.5">06:00 PM – 10:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* CONFIRMED STATE */}
        {confirmed ? (
          <div className="max-w-2xl mx-auto bg-[#121915] border border-emerald-500/40 rounded-3xl p-8 shadow-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <span className="inline-block px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 rounded-full text-xs font-bold text-emerald-300 uppercase tracking-widest mb-2">
              Booking Confirmed
            </span>

            <h3 className="text-2xl sm:text-3xl font-black text-white">Your Turf Slot is Locked!</h3>
            <p className="text-gray-400 text-sm mt-1">
              Receipt and booking pass generated. Please show this at the turf reception counter.
            </p>

            <div className="mt-6 p-6 rounded-2xl bg-[#090d0b] border border-white/10 text-left space-y-3 font-sans">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-xs text-gray-400 uppercase font-semibold">Booking ID</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">{confirmed.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Sport & Pitch</span>
                <span className="text-white text-sm font-semibold">{confirmed.sport} • {confirmed.court}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Date</span>
                <span className="text-white text-sm font-semibold">{formatDisplayDate(confirmed.date)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Time Slot</span>
                <span className="text-emerald-400 text-sm font-bold">{confirmed.timeRange} ({confirmed.durationHours} hr{confirmed.durationHours > 1 ? "s" : ""})</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Booked By</span>
                <span className="text-white text-sm font-semibold">{confirmed.name} ({confirmed.phone})</span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-white/10">
                <span className="text-xs text-gray-400 uppercase font-bold">Total Paid Online</span>
                <span className="text-xl font-black text-emerald-400">₹{confirmed.total}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-gray-500">Transaction ID</span>
                <span className="text-[11px] font-mono text-gray-400">{confirmed.paymentId}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={`https://wa.me/919603308999?text=Hi%20The%20Eden%20Park,%20I%20have%20booked%20turf%20slot%20${confirmed.id}%20on%20${confirmed.date}%20at%20${confirmed.timeRange}.`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Share2 className="w-4 h-4" /> WhatsApp Pass
              </a>
              <button
                onClick={resetSelection}
                className="flex-1 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all"
              >
                Book Another Slot
              </button>
            </div>
          </div>
        ) : (

          /* Playo-Style 2-Column Booking Flow */
          <div className="grid lg:grid-cols-12 gap-8 items-start">

            {/* LEFT 7 COLUMNS: Playo Slot Selector */}
            <div className="lg:col-span-7 space-y-6">

              {/* Step 1: Sport & Court Tabs */}
              <div className="bg-[#121915] border border-white/10 rounded-2xl p-5 shadow-lg">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Sport selector */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                      1. Select Sport
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => { setSport("Box Cricket"); setStartHour(null); }}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          sport === "Box Cricket"
                            ? "bg-emerald-600 border-emerald-400 text-white shadow-md"
                            : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300"
                        }`}
                      >
                        🏏 Box Cricket
                      </button>
                      <button
                        type="button"
                        onClick={() => { setSport("5v5 Football"); setStartHour(null); }}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                          sport === "5v5 Football"
                            ? "bg-emerald-600 border-emerald-400 text-white shadow-md"
                            : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300"
                        }`}
                      >
                        ⚽ 5v5 Football
                      </button>
                    </div>
                  </div>

                  {/* Court / Pitch selector */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">
                      2. Select Court
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => { setCourt("Court 1 (Main Arena)"); setStartHour(null); }}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center truncate ${
                          court.includes("Court 1")
                            ? "bg-emerald-600 border-emerald-400 text-white shadow-md"
                            : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300"
                        }`}
                      >
                        Court 1 (Main)
                      </button>
                      <button
                        type="button"
                        onClick={() => { setCourt("Court 2 (Box 2)"); setStartHour(null); }}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all text-center truncate ${
                          court.includes("Court 2")
                            ? "bg-emerald-600 border-emerald-400 text-white shadow-md"
                            : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300"
                        }`}
                      >
                        Court 2 (Box 2)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Date Selector (Playo Day-Pills Strip + Date Picker) */}
              <div className="bg-[#121915] border border-white/10 rounded-2xl p-5 shadow-lg">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-400" /> 3. Select Date
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={date}
                      min={todayStr()}
                      onChange={(e) => { setDate(e.target.value); setStartHour(null); }}
                      className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/15 rounded-lg text-xs text-white focus:outline-none focus:border-emerald-400 cursor-pointer [color-scheme:dark]"
                    />
                  </div>
                </div>

                {/* Horizontal Day Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                  {daysList.map((d) => {
                    const isSelected = date === d.val;
                    return (
                      <button
                        key={d.val}
                        type="button"
                        onClick={() => { setDate(d.val); setStartHour(null); }}
                        className={`flex-shrink-0 px-3.5 py-2.5 rounded-xl border text-center transition-all min-w-[85px] ${
                          isSelected
                            ? "bg-emerald-600 border-emerald-400 text-white shadow-lg"
                            : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300"
                        }`}
                      >
                        <div className="text-[11px] font-semibold opacity-80 uppercase">{d.dayName}</div>
                        <div className="text-sm font-extrabold mt-0.5">{d.dateFormatted}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Duration Selector */}
              <div className="bg-[#121915] border border-white/10 rounded-2xl p-5 shadow-lg">
                <label className="block text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2 flex items-center gap-1.5">
                  <Timer className="w-3.5 h-3.5 text-emerald-400" /> 4. Select Duration
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {DURATION_OPTIONS.map((opt) => {
                    const isSelected = duration === opt.hours;
                    return (
                      <button
                        key={opt.hours}
                        type="button"
                        onClick={() => { setDuration(opt.hours); setStartHour(null); }}
                        className={`py-2.5 px-3 rounded-xl border text-center transition-all font-bold text-xs ${
                          isSelected
                            ? "bg-emerald-600 border-emerald-400 text-white shadow-lg"
                            : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Available Time Slots (Categorized like Playo) */}
              <div className="bg-[#121915] border border-white/10 rounded-2xl p-5 sm:p-6 shadow-lg space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-gray-400 font-semibold flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" /> 5. Select Available Time Slot
                    </label>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Slots show dynamic pricing for {duration} hr{duration > 1 ? "s" : ""} booking.
                    </p>
                  </div>
                  {/* Legend */}
                  <div className="flex items-center gap-3 text-[11px] text-gray-400">
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-emerald-600"></span> Selected</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-white/10 border border-white/20"></span> Available</span>
                    <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-red-950 border border-red-800"></span> Booked</span>
                  </div>
                </div>

                {/* Section A: Morning Slots */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-3">
                    <span className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5" /> Morning Slots (06:00 AM – 12:00 PM)</span>
                    <span className="text-[11px] text-gray-400 font-normal">₹600 / hr</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {MORNING_SLOTS.map((h) => {
                      const status = getSlotStatus(h);
                      const avail = status === 'available';
                      const isSelected = startHour === h;
                      const slotPrice = calcPrice(h, duration);
                      const endH = h + duration;

                      return (
                        <button
                          key={h}
                          type="button"
                          disabled={!avail}
                          onClick={() => avail && setStartHour(h)}
                          className={`p-3 rounded-xl border text-left transition-all relative ${
                            status === 'passed'
                              ? "bg-white/[0.02] border-white/5 opacity-35 cursor-not-allowed text-gray-500"
                              : status === 'booked'
                              ? "bg-red-950/20 border-red-900/30 opacity-45 cursor-not-allowed text-gray-500"
                              : isSelected
                              ? "bg-emerald-600 border-emerald-400 text-white shadow-lg ring-2 ring-emerald-400/40"
                              : "bg-white/5 border-white/10 hover:border-emerald-500/50 hover:bg-white/10 text-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-mono">{hourToLabel(h)}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <div className="text-[11px] text-gray-400 mt-1">
                            to {hourToLabel(endH)}
                          </div>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                            <span className="text-[10px] font-semibold text-emerald-400">
                              {status === 'passed' ? "Passed" : status === 'booked' ? "Sold Out" : `₹${slotPrice}`}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {status === 'passed' ? "Expired" : status === 'booked' ? "Booked" : "Available"}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section B: Afternoon Slots */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-3">
                    <span className="flex items-center gap-1.5"><Sun className="w-3.5 h-3.5" /> Afternoon Slots (12:00 PM – 06:00 PM)</span>
                    <span className="text-[11px] text-gray-400 font-normal">₹600 / hr</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {AFTERNOON_SLOTS.map((h) => {
                      const status = getSlotStatus(h);
                      const avail = status === 'available';
                      const isSelected = startHour === h;
                      const slotPrice = calcPrice(h, duration);
                      const endH = h + duration;

                      return (
                        <button
                          key={h}
                          type="button"
                          disabled={!avail}
                          onClick={() => avail && setStartHour(h)}
                          className={`p-3 rounded-xl border text-left transition-all relative ${
                            status === 'passed'
                              ? "bg-white/[0.02] border-white/5 opacity-35 cursor-not-allowed text-gray-500"
                              : status === 'booked'
                              ? "bg-red-950/20 border-red-900/30 opacity-45 cursor-not-allowed text-gray-500"
                              : isSelected
                              ? "bg-emerald-600 border-emerald-400 text-white shadow-lg ring-2 ring-emerald-400/40"
                              : "bg-white/5 border-white/10 hover:border-emerald-500/50 hover:bg-white/10 text-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-mono">{hourToLabel(h)}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <div className="text-[11px] text-gray-400 mt-1">
                            to {hourToLabel(endH)}
                          </div>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                            <span className="text-[10px] font-semibold text-emerald-400">
                              {status === 'passed' ? "Passed" : status === 'booked' ? "Sold Out" : `₹${slotPrice}`}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {status === 'passed' ? "Expired" : status === 'booked' ? "Booked" : "Available"}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Section C: Evening & Night Floodlit Slots */}
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-teal-400 mb-3">
                    <span className="flex items-center gap-1.5"><Moon className="w-3.5 h-3.5" /> Evening & Floodlights (06:00 PM – 10:00 PM)</span>
                    <span className="text-[11px] text-gray-400 font-normal">₹700 / hr</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {EVENING_SLOTS.map((h) => {
                      const status = getSlotStatus(h);
                      const avail = status === 'available';
                      const isSelected = startHour === h;
                      const slotPrice = calcPrice(h, duration);
                      const endH = h + duration;

                      return (
                        <button
                          key={h}
                          type="button"
                          disabled={!avail}
                          onClick={() => avail && setStartHour(h)}
                          className={`p-3 rounded-xl border text-left transition-all relative ${
                            status === 'passed'
                              ? "bg-white/[0.02] border-white/5 opacity-35 cursor-not-allowed text-gray-500"
                              : status === 'booked'
                              ? "bg-red-950/20 border-red-900/30 opacity-45 cursor-not-allowed text-gray-500"
                              : isSelected
                              ? "bg-emerald-600 border-emerald-400 text-white shadow-lg ring-2 ring-emerald-400/40"
                              : "bg-white/5 border-white/10 hover:border-emerald-500/50 hover:bg-white/10 text-gray-200"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold font-mono">{hourToLabel(h)}</span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                          <div className="text-[11px] text-gray-400 mt-1">
                            to {hourToLabel(endH)}
                          </div>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/10">
                            <span className="text-[10px] font-semibold text-emerald-400">
                              {status === 'passed' ? "Passed" : status === 'booked' ? "Sold Out" : `₹${slotPrice}`}
                            </span>
                            <span className="text-[10px] text-gray-400">
                              {status === 'passed' ? "Expired" : status === 'booked' ? "Booked" : "Available"}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT 5 COLUMNS: Playo-Style Sticky Booking Summary & Cart Panel */}
            <div id="turf-checkout" className="lg:col-span-5 sticky top-24 space-y-5 scroll-mt-24">
              <div className="bg-[#121915] border border-emerald-900/50 rounded-3xl p-6 shadow-2xl backdrop-blur-xl">

                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-400" /> Booking Summary
                  </h3>
                  <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                    Instant Pass
                  </span>
                </div>

                {/* Selected Slot Information */}
                <div className="mt-4 p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Sport & Pitch:</span>
                    <span className="text-white font-bold">{sport} ({court})</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Date:</span>
                    <span className="text-emerald-400 font-bold">{formatDisplayDate(date)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white font-bold">{duration} Hour{duration > 1 ? "s" : ""}</span>
                  </div>
                  <div className="flex justify-between text-xs items-center pt-2 border-t border-white/5">
                    <span className="text-gray-400">Slot Time:</span>
                    {startHour !== null ? (
                      <span className="text-white font-mono font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-700/50 text-xs">
                        {startLabel} – {endLabel}
                      </span>
                    ) : (
                      <span className="text-amber-400 text-xs font-semibold animate-pulse">
                        👉 Pick a slot from left
                      </span>
                    )}
                  </div>
                </div>

                {/* Pricing Breakdown (Playo style) */}
                {startHour !== null && (
                  <div className="mt-4 p-4 rounded-2xl bg-[#0d1511] border border-emerald-800/30 space-y-2">
                    <div className="flex justify-between text-xs text-gray-300">
                      <span>Turf Slot Charge ({duration} hr{duration > 1 ? "s" : ""})</span>
                      <span className="font-mono">₹{price}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Cricket Equipment Kit (Bats & Balls)</span>
                      <span className="text-emerald-400 font-semibold">FREE Included</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span>Convenience & Platform Fee</span>
                      <span className="text-emerald-400 font-semibold">₹0 (Waived)</span>
                    </div>
                    <div className="flex justify-between items-center pt-2.5 border-t border-white/10 text-sm font-bold">
                      <span className="text-white">Total Amount Payable</span>
                      <span className="text-2xl font-black text-emerald-400 font-mono">₹{price}</span>
                    </div>
                  </div>
                )}

                {/* Player Contact Details Form */}
                <div className="mt-5 space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Player / Team Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleFormChange}
                        placeholder="Your full name"
                        className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Mobile Number (For WhatsApp Pass) *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleFormChange}
                        placeholder="10-digit mobile number"
                        maxLength={10}
                        className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1">Team Size</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                      <select
                        name="players"
                        value={form.players}
                        onChange={handleFormChange}
                        className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/15 rounded-xl text-xs text-white focus:outline-none focus:border-emerald-400 [color-scheme:dark]"
                      >
                        <option value="6-8 Players">6-8 Players</option>
                        <option value="10-14 Players">10-14 Players (Standard Match)</option>
                        <option value="15-20 Players">15-20 Players (Tournament)</option>
                      </select>
                    </div>
                  </div>
                  {/* Payment Mode Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-400 mb-1.5">Payment Method</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMode("venue")}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                          paymentMode === "venue"
                            ? "bg-emerald-600 border-emerald-400 text-white shadow-md ring-1 ring-emerald-400"
                            : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        <span>💵 Pay at Turf</span>
                        <span className="text-[10px] font-normal opacity-80">UPI / Cash on Counter</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMode("online")}
                        className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                          paymentMode === "online"
                            ? "bg-emerald-600 border-emerald-400 text-white shadow-md ring-1 ring-emerald-400"
                            : "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10"
                        }`}
                      >
                        <span>💳 Pay Online</span>
                        <span className="text-[10px] font-normal opacity-80">Razorpay / NetBanking</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Error Banner */}
                {error && (
                  <div className="mt-4 flex items-center gap-2 p-3 rounded-xl bg-red-950/50 border border-red-700/50 text-red-300 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Book & Pay Button */}
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleBooking}
                  className="mt-5 w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-extrabold text-sm rounded-xl transition-all shadow-xl shadow-emerald-950/50 flex items-center justify-center gap-2 tracking-wide cursor-pointer"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" /> Confirming Booking...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4" />
                      {startHour !== null 
                        ? (paymentMode === "venue" ? `Confirm & Reserve Slot (₹${price})` : `Proceed to Pay ₹${price} Online`)
                        : "Select a Time Slot to Book"}
                    </>
                  )}
                </button>

                {/* Trust Badges */}
                <div className="mt-4 pt-4 border-t border-white/5 text-center text-[11px] text-gray-400 space-y-1">
                  <div className="flex items-center justify-center gap-2 text-gray-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Secure Checkout with Razorpay & UPI
                  </div>
                  <p>Instant SMS/WhatsApp pass confirmation • Free reschedule for rain</p>
                </div>

              </div>

              {/* Need Help Card */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs text-gray-300">
                <div>
                  <span className="font-semibold text-white block">Need assistance or offline booking?</span>
                  <span className="text-gray-400">Call turf manager directly 24/7</span>
                </div>
                <a
                  href="tel:+919603308999"
                  className="px-3 py-1.5 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 rounded-lg font-bold transition-all"
                >
                  +91 96033 08999
                </a>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* Mobile Floating Sticky Action Bar (Playo Style) */}
      {startHour !== null && !confirmed && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#121915]/95 backdrop-blur-xl border-t border-emerald-500/40 p-3 px-4 shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
          <div className="flex flex-col">
            <span className="text-[11px] text-gray-300 font-mono">
              {startLabel} – {endLabel} ({duration}h)
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-emerald-400 font-mono">₹{price}</span>
              <span className="text-[10px] text-gray-400 font-medium">({court.includes("Court 1") ? "Court 1" : "Court 2"})</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              document.getElementById("turf-checkout")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-950/60 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <span>Fill Details</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
};
