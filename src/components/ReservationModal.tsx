import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SeatingZone } from '../types';
import { 
  CalendarDays, 
  Clock, 
  Users, 
  MapPin, 
  CheckCircle2, 
  X, 
  Sparkles, 
  HeartHandshake,
  PhoneCall
} from 'lucide-react';

export const ReservationModal: React.FC = () => {
  const { isReservationOpen, setIsReservationOpen, bookReservation } = useStore();

  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestsCount, setGuestsCount] = useState(4);
  const [reservationDate, setReservationDate] = useState('Tonight');
  const [timeSlot, setTimeSlot] = useState('8:00 PM');
  const [seatingZone, setSeatingZone] = useState<SeatingZone>('Open Garden Gazebo');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedReservation, setConfirmedReservation] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isReservationOpen) return null;

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!guestName.trim()) {
      setErrorMsg('Please enter your full name');
      return;
    }
    if (!guestPhone.trim() || guestPhone.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }

    const res = bookReservation({
      guestName,
      guestPhone,
      guestEmail: guestEmail || undefined,
      guestsCount,
      reservationDate,
      timeSlot,
      seatingZone,
      specialRequests: specialRequests || undefined,
    });

    setConfirmedReservation(res);
  };

  const handleClose = () => {
    setConfirmedReservation(null);
    setIsReservationOpen(false);
  };

  const seatingZones: { zone: SeatingZone; desc: string }[] = [
    { zone: 'Open Garden Gazebo', desc: 'Breezy garden dining with starry fairy lights' },
    { zone: 'Royal AC Dining Hall', desc: 'Glass-walled luxury climate-controlled seating' },
    { zone: 'Private Celebration Lawn', desc: 'For anniversaries, birthdays & reunions' },
    { zone: 'Highway Travellers Cabana', desc: 'Quick turnaround seating with luggage space' },
    { zone: 'Sports Turf Lounge', desc: 'Overlooking the turf field, vibrant & casual' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl rounded-3xl overflow-hidden glass-card border border-gold-500/40 shadow-2xl bg-eden-surface flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 p-5 sm:p-6 text-black flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-black border border-gold-400 overflow-hidden shrink-0 shadow-md">
              <img src="/assets/images/logo.png" alt="The Eden Park" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-black/80 font-mono">
                The Eden Park Restro
              </div>
              <h2 className="font-serif font-black text-xl sm:text-2xl text-black">
                Table Reservation
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {confirmedReservation ? (
            /* Confirmation Pass View */
            <div className="py-4 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold font-mono">
                  Reservation Confirmed · Instant Table Hold
                </span>
                <h3 className="font-serif font-bold text-3xl text-white mt-1">
                  Pass {confirmedReservation.id}
                </h3>
              </div>

              <div className="bg-eden-card p-5 rounded-2xl border border-gold-500/30 text-left space-y-3 max-w-md mx-auto text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Guest Name</span>
                  <span className="font-bold text-white">{confirmedReservation.guestName}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Date & Slot</span>
                  <span className="font-mono text-gold-300 font-bold">
                    {confirmedReservation.reservationDate} at {confirmedReservation.timeSlot}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Seating Zone</span>
                  <span className="text-white font-semibold">{confirmedReservation.seatingZone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Party Size</span>
                  <span className="text-gold-400 font-mono font-bold">
                    {confirmedReservation.guestsCount} Guests
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-400 max-w-sm mx-auto leading-relaxed">
                A warm welcome awaits you! Please arrive 10 minutes prior to your time slot.
                Our maître d' will escort you directly to your reserved pavilion.
              </p>

              <div className="flex gap-3 max-w-sm mx-auto pt-2">
                <a
                  href="https://maps.google.com/?q=Eden+Park+Family+Resto+Chittoor"
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3 rounded-xl border border-gold-500/30 bg-gold-500/10 text-gold-300 font-bold text-xs flex items-center justify-center gap-1.5"
                >
                  <MapPin className="w-4 h-4" /> Get Directions
                </a>
                <button
                  onClick={handleClose}
                  className="flex-1 py-3 rounded-xl bg-gold-gradient text-black font-bold text-xs uppercase tracking-wider shadow-sm"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form id="resForm" onSubmit={handleBooking} className="space-y-5">
              {/* Seating Zone Preference */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                  1. Choose Your Preferred Seating Zone
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {seatingZones.map((item) => (
                    <button
                      key={item.zone}
                      type="button"
                      onClick={() => setSeatingZone(item.zone)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        seatingZone === item.zone
                          ? 'border-gold-500 bg-gold-500/15 text-white shadow-gold-sm'
                          : 'border-white/10 bg-eden-card text-gray-400 hover:border-white/20'
                      }`}
                    >
                      <div className="font-semibold text-xs text-white">{item.zone}</div>
                      <div className="text-[11px] text-gray-400 mt-0.5">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Guests & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Date */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Dining Date
                  </label>
                  <select
                    value={reservationDate}
                    onChange={(e) => setReservationDate(e.target.value)}
                    className="w-full bg-eden-card border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                  >
                    <option value="Tonight">Tonight</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Weekend (Saturday)">This Saturday</option>
                    <option value="This Weekend (Sunday)">This Sunday</option>
                    <option value="Next Week">Custom Upcoming Date</option>
                  </select>
                </div>

                {/* Time Slot */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full bg-eden-card border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-gold-500"
                  >
                    <optgroup label="Lunch (11:30 AM – 4:00 PM)">
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="1:00 PM">1:00 PM</option>
                      <option value="2:00 PM">2:00 PM</option>
                      <option value="3:00 PM">3:00 PM</option>
                    </optgroup>
                    <optgroup label="Dinner (6:30 PM – 11:30 PM)">
                      <option value="7:00 PM">7:00 PM</option>
                      <option value="7:45 PM">7:45 PM</option>
                      <option value="8:30 PM">8:30 PM</option>
                      <option value="9:15 PM">9:15 PM</option>
                      <option value="10:00 PM">10:00 PM</option>
                    </optgroup>
                  </select>
                </div>

                {/* Number of Guests */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Guests Count
                  </label>
                  <div className="flex items-center bg-eden-card border border-white/10 rounded-xl px-2 py-1">
                    <button
                      type="button"
                      onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                      className="w-7 h-7 rounded bg-white/5 hover:bg-white/10 text-white font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="flex-1 text-center font-mono font-bold text-gold-400 text-xs">
                      {guestsCount} Guests
                    </span>
                    <button
                      type="button"
                      onClick={() => setGuestsCount(guestsCount + 1)}
                      className="w-7 h-7 rounded bg-white/5 hover:bg-white/10 text-white font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Guest Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="e.g. Anand Varma"
                    className="w-full bg-eden-card border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full bg-eden-card border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                  Special Occasion or Hospitality Request (Optional)
                </label>
                <input
                  type="text"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Birthday table decor, quiet corner, baby high chair..."
                  className="w-full bg-eden-card border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                />
              </div>

              {errorMsg && (
                <div className="text-xs text-red-400 bg-red-950/40 p-2.5 rounded-xl border border-red-500/30">
                  {errorMsg}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs text-black bg-gold-gradient shadow-gold-sm hover:shadow-gold-lg hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Confirm Royal Reservation (Zero Booking Fee)</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400">
                <PhoneCall className="w-3.5 h-3.5 text-gold-400" />
                <span>Need an immediate party booking for 20+ guests? Call +91 96033 08999</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
