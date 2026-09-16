export type DietaryType = 'veg' | 'non-veg';

export type SpiceLevel = 0 | 1 | 2 | 3; // 0=Mild, 1=Medium, 2=Spicy, 3=Extra Spicy

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description: string;
  price: number;
  dietary: DietaryType;
  spiceLevel: SpiceLevel;
  isChefSpecial?: boolean;
  isBestseller?: boolean;
  available: boolean;
  image: string;
  preparationTime?: string;
  calories?: number;
}

export interface CartItem {
  item: MenuItem;
  quantity: number;
  portion?: 'Regular' | 'Family Pack' | 'Full';
  selectedSpice?: SpiceLevel;
  notes?: string;
}

export type OrderType = 'dine-in' | 'pickup';

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  orderType: OrderType;
  tableNumber?: string;
  pickupTime?: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  serviceFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: 'Cash / UPI at Table' | 'Online UPI' | 'Card';
  specialInstructions?: string;
}

export type SeatingZone = 
  | 'Open Garden Gazebo' 
  | 'Royal AC Dining Hall' 
  | 'Private Celebration Lawn' 
  | 'Highway Travellers Cabana' 
  | 'Sports Turf Lounge';

export type ReservationStatus = 'pending' | 'confirmed' | 'seated' | 'completed' | 'cancelled';

export interface Reservation {
  id: string;
  createdAt: string;
  guestName: string;
  guestPhone: string;
  guestEmail?: string;
  guestsCount: number;
  reservationDate: string;
  timeSlot: string;
  seatingZone: SeatingZone;
  specialRequests?: string;
  status: ReservationStatus;
}

export interface Review {
  id: string;
  userName: string;
  userLocation: string;
  rating: number;
  diningType: 'Family Dinner' | 'Highway Stopover' | 'Celebration / Party' | 'Weekend Outing';
  comment: string;
  favoriteDish: string;
  date: string;
  isVerified: boolean;
}
