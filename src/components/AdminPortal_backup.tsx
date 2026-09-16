import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  X, 
  Lock, 
  LogOut, 
  ShoppingBag, 
  CalendarDays, 
  Utensils, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Plus, 
  ToggleLeft, 
  ToggleRight,
  IndianRupee,
  Search
} from 'lucide-react';
import { OrderStatus, ReservationStatus, MenuItem } from '../types';

export const AdminPortal: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    isAdmin, 
    loginAdmin, 
    logoutAdmin,
    orders,
    updateOrderStatus,
    reservations,
    updateReservationStatus,
    menuItems,
    updateItemAvailability,
    updateItemPrice,
    addNewMenuItem
  } = useStore();

  const [pin, setPin] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'orders' | 'reservations' | 'menu'>('orders');
  const [menuSearch, setMenuSearch] = useState('');
  
  // New dish form state
  const [isAddingDish, setIsAddingDish] = useState(false);
  const [newDishName, setNewDishName] = useState('');
  const [newDishCategory, setNewDishCategory] = useState("Chef's Specials");
  const [newDishPrice, setNewDishPrice] = useState(290);
  const [newDishDietary, setNewDishDietary] = useState<'veg' | 'non-veg'>('non-veg');
  const [newDishDesc, setNewDishDesc] = useState('');

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const success = loginAdmin(pin);
    if (!success) {
      setAuthError('Invalid Master PIN. Default PIN is: eden2026');
    } else {
      setPin('');
    }
  };

  const handleCreateDish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDishName.trim()) return;

    const newItem: MenuItem = {
      id: `custom-${Date.now()}`,
      name: newDishName,
      category: newDishCategory,
      description: newDishDesc || 'Signature delicacy crafted by our master chefs.',
      price: Number(newDishPrice),
      dietary: newDishDietary,
      spiceLevel: 2,
      isChefSpecial: true,
      available: true,
      image: newDishDietary === 'veg' 
        ? 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80'
        : 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=800&q=80',
    };

    addNewMenuItem(newItem);
    setIsAddingDish(false);
    setNewDishName('');
    setNewDishDesc('');
  };

  const filteredMenuItems = menuItems.filter((it) =>
    it.name.toLowerCase().includes(menuSearch.toLowerCase()) ||
    it.category.toLowerCase().includes(menuSearch.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-lg animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl rounded-3xl overflow-hidden glass-card border border-gold-500/40 shadow-2xl bg-eden-surface flex flex-col h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Admin Header */}
        <div className="p-5 border-b border-white/10 bg-eden-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gold-500/10 text-gold-400 border border-gold-500/30">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-lg text-white">
                  Eden Park Manager Command Desk
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-gold-500 text-black">
                  Admin Active
                </span>
              </div>
              <span className="text-xs text-gray-400">
                Live Kitchen Dispatch · Table Floor Plan · Real-Time Inventory Control
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAdmin && (
              <button
                onClick={logoutAdmin}
                className="text-xs text-red-400 hover:text-red-300 font-semibold flex items-center gap-1.5 p-2 rounded-lg bg-red-950/40 border border-red-500/20"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Not Authenticated View */}
        {!isAdmin ? (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-sm glass-card p-8 rounded-3xl border border-gold-500/30 text-center space-y-6">
              <div className="w-14 h-14 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mx-auto text-gold-400">
                <Lock className="w-7 h-7" />
              </div>

              <div>
                <h4 className="font-serif font-bold text-xl text-white">Manager Authentication</h4>
                <p className="text-xs text-gray-400 mt-1">
                  Enter your restaurant security PIN to access incoming orders and live controls.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter Security PIN (e.g. eden2026)"
                    className="w-full text-center tracking-widest text-lg font-mono bg-eden-card border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-gold-500"
                    autoFocus
                  />
                </div>

                {authError && (
                  <div className="text-xs text-red-400 bg-red-950/40 p-2 rounded-lg border border-red-500/30">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold uppercase tracking-widest text-xs text-black bg-gold-gradient shadow-gold-sm hover:shadow-gold-lg transition-all"
                >
                  Unlock Manager Portal
                </button>

                <div className="text-[11px] text-gray-400">
                  Demo PIN: <strong className="text-gold-400 font-mono">eden2026</strong>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex border-b border-white/10 px-6 bg-eden-card/60 gap-4">
              <button
                onClick={() => setActiveTab('orders')}
                className={`py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all ${
                  activeTab === 'orders'
                    ? 'border-gold-500 text-gold-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Live Orders ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('reservations')}
                className={`py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all ${
                  activeTab === 'reservations'
                    ? 'border-gold-500 text-gold-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <CalendarDays className="w-4 h-4" />
                <span>Table Bookings ({reservations.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('menu')}
                className={`py-3.5 text-xs font-bold uppercase tracking-wider border-b-2 flex items-center gap-2 transition-all ${
                  activeTab === 'menu'
                    ? 'border-gold-500 text-gold-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                <Utensils className="w-4 h-4" />
                <span>Menu & Stock Control ({menuItems.length})</span>
              </button>
            </div>

            {/* Dashboard Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* ORDERS TAB */}
              {activeTab === 'orders' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                      Active Customer Dispatch Feed
                    </span>
                    <span className="text-xs font-mono text-gold-400">
                      Auto-syncing to kitchen tablets
                    </span>
                  </div>

                  {orders.length === 0 ? (
                    <div className="text-center py-12 text-gray-400 text-xs">
                      No customer orders placed yet.
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {orders.map((ord) => (
                        <div
                          key={ord.id}
                          className="glass-card p-4 rounded-2xl border border-white/10 space-y-3"
                        >
                          <div className="flex items-center justify-between border-b border-white/5 pb-2">
                            <div>
                              <span className="font-mono font-bold text-sm text-gold-400">
                                {ord.id}
                              </span>
                              <div className="text-[11px] text-gray-400">
                                {ord.customerName} · {ord.customerPhone}
                              </div>
                            </div>

                            <span className="text-xs px-2.5 py-1 rounded-full uppercase font-bold tracking-wider font-mono bg-white/5 border border-white/10 text-white">
                              {ord.orderType === 'dine-in' ? ord.tableNumber : 'Highway Pickup'}
                            </span>
                          </div>

                          {/* Items summary */}
                          <div className="space-y-1 text-xs">
                            {ord.items.map((ci, i) => (
                              <div key={i} className="flex justify-between text-gray-300">
                                <span>{ci.quantity}x {ci.item.name} ({ci.portion})</span>
                                <span className="text-gray-500 font-mono">Lvl {ci.selectedSpice}</span>
                              </div>
                            ))}
                          </div>

                          {ord.specialInstructions && (
                            <div className="text-[10px] text-gold-400 italic bg-gold-500/10 p-1.5 rounded-lg">
                              Note: {ord.specialInstructions}
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                            <span className="font-mono font-bold text-white">
                              Total: ₹{ord.total}
                            </span>

                            {/* Status Changer Buttons */}
                            <div className="flex gap-1.5">
                              {(['pending', 'preparing', 'ready', 'completed'] as OrderStatus[]).map((st) => (
                                <button
                                  key={st}
                                  onClick={() => updateOrderStatus(ord.id, st)}
                                  className={`px-2 py-1 rounded text-[10px] uppercase font-bold tracking-wider transition-all ${
                                    ord.status === st
                                      ? 'bg-gold-500 text-black shadow'
                                      : 'bg-white/5 text-gray-400 hover:text-white'
                                  }`}
                                >
                                  {st}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* RESERVATIONS TAB */}
              {activeTab === 'reservations' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                      Table Booking Master Queue
                    </span>
                  </div>

                  <div className="divide-y divide-white/10 border border-white/10 rounded-2xl overflow-hidden glass-card">
                    {reservations.map((res) => (
                      <div key={res.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-xs text-gold-400">
                              {res.id}
                            </span>
                            <span className="font-bold text-sm text-white">
                              {res.guestName} ({res.guestsCount} Guests)
                            </span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                              res.status === 'confirmed' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' :
                              res.status === 'seated' ? 'bg-blue-950 text-blue-400 border border-blue-500/30' :
                              'bg-amber-950 text-amber-400 border border-amber-500/30'
                            }`}>
                              {res.status}
                            </span>
                          </div>

                          <div className="text-xs text-gray-400 mt-1 flex flex-wrap items-center gap-2">
                            <span>Phone: {res.guestPhone}</span>
                            <span>•</span>
                            <span className="text-gold-300 font-semibold">{res.seatingZone}</span>
                            <span>•</span>
                            <span>{res.reservationDate} at {res.timeSlot}</span>
                          </div>

                          {res.specialRequests && (
                            <div className="text-[11px] text-gray-300 italic mt-1">
                              "{res.specialRequests}"
                            </div>
                          )}
                        </div>

                        {/* Status Actions */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateReservationStatus(res.id, 'confirmed')}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600/30 text-emerald-300 hover:bg-emerald-600 hover:text-white"
                          >
                            Confirm Table
                          </button>
                          <button
                            onClick={() => updateReservationStatus(res.id, 'seated')}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600/30 text-blue-300 hover:bg-blue-600 hover:text-white"
                          >
                            Mark Seated
                          </button>
                          <button
                            onClick={() => updateReservationStatus(res.id, 'completed')}
                            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gray-700/40 text-gray-300 hover:bg-gray-700 hover:text-white"
                          >
                            Completed
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MENU MANAGEMENT TAB */}
              {activeTab === 'menu' && (
                <div className="space-y-5">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="relative w-full sm:w-72">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={menuSearch}
                        onChange={(e) => setMenuSearch(e.target.value)}
                        placeholder="Search menu item to edit..."
                        className="w-full pl-9 pr-3 py-2 bg-eden-card border border-white/10 rounded-xl text-xs text-white"
                      />
                    </div>

                    <button
                      onClick={() => setIsAddingDish(!isAddingDish)}
                      className="px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-gold-gradient text-black flex items-center gap-1.5 shadow-gold-sm"
                    >
                      <Plus className="w-4 h-4" />
                      <span>{isAddingDish ? 'Close Form' : 'Add New Specialty'}</span>
                    </button>
                  </div>

                  {/* Add New Dish Form */}
                  {isAddingDish && (
                    <form onSubmit={handleCreateDish} className="glass-card p-5 rounded-2xl border border-gold-500/30 space-y-4">
                      <h4 className="font-serif font-bold text-white text-sm">Add New Specialty to Menu</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                        <div>
                          <label className="text-gray-400 block mb-1">Dish Name</label>
                          <input
                            type="text"
                            value={newDishName}
                            onChange={(e) => setNewDishName(e.target.value)}
                            placeholder="e.g. Royal Bamboo Mutton Biryani"
                            className="w-full bg-eden-surface border border-white/10 rounded-xl px-3 py-2 text-white"
                          />
                        </div>
                        <div>
                          <label className="text-gray-400 block mb-1">Category</label>
                          <select
                            value={newDishCategory}
                            onChange={(e) => setNewDishCategory(e.target.value)}
                            className="w-full bg-eden-surface border border-white/10 rounded-xl px-3 py-2 text-white"
                          >
                            <option value="Chef's Specials">Chef's Specials</option>
                            <option value="Biryanis">Biryanis</option>
                            <option value="Tandoori Starters">Tandoori Starters</option>
                            <option value="Curries & Gravies">Curries & Gravies</option>
                            <option value="Beverages & Desserts">Beverages & Desserts</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-gray-400 block mb-1">Price (INR)</label>
                          <input
                            type="number"
                            value={newDishPrice}
                            onChange={(e) => setNewDishPrice(Number(e.target.value))}
                            className="w-full bg-eden-surface border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                          />
                        </div>
                      </div>

                      <div className="flex gap-4 items-center text-xs">
                        <label className="flex items-center gap-2 text-gray-300">
                          <input
                            type="radio"
                            name="dietary"
                            checked={newDishDietary === 'non-veg'}
                            onChange={() => setNewDishDietary('non-veg')}
                          />
                          Non-Veg
                        </label>
                        <label className="flex items-center gap-2 text-gray-300">
                          <input
                            type="radio"
                            name="dietary"
                            checked={newDishDietary === 'veg'}
                            onChange={() => setNewDishDietary('veg')}
                          />
                          Pure Veg
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-xl bg-gold-gradient text-black font-bold uppercase tracking-wider text-xs"
                      >
                        Publish Specialty
                      </button>
                    </form>
                  )}

                  {/* Menu Table */}
                  <div className="glass-card rounded-2xl border border-white/10 overflow-hidden divide-y divide-white/5">
                    {filteredMenuItems.slice(0, 30).map((it) => (
                      <div key={it.id} className="p-3.5 flex items-center justify-between gap-4 text-xs">
                        <div className="flex items-center gap-3">
                          <span className={`w-2.5 h-2.5 rounded-full ${it.dietary === 'veg' ? 'bg-green-500' : 'bg-red-500'}`} />
                          <div>
                            <span className="font-bold text-white text-sm">{it.name}</span>
                            <span className="text-gray-400 text-xs block">{it.category}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 font-mono text-gold-400 font-bold">
                            <span>₹</span>
                            <input
                              type="number"
                              defaultValue={it.price}
                              onBlur={(e) => updateItemPrice(it.id, Number(e.target.value))}
                              className="w-16 bg-eden-card border border-white/10 rounded px-1.5 py-0.5 text-right text-white"
                            />
                          </div>

                          <button
                            onClick={() => updateItemAvailability(it.id, !it.available)}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold ${
                              it.available
                                ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                                : 'bg-red-950 text-red-400 border border-red-500/30'
                            }`}
                          >
                            {it.available ? (
                              <>
                                <ToggleRight className="w-4 h-4" /> In Stock
                              </>
                            ) : (
                              <>
                                <ToggleLeft className="w-4 h-4" /> Sold Out
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

