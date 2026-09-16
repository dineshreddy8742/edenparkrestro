import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem, CartItem, Order, OrderStatus, Reservation, ReservationStatus, Review } from '../types';
import { INITIAL_MENU_ITEMS } from '../data/menuData';
import { INITIAL_REVIEWS } from '../data/reviewsData';

interface StoreContextType {
  // Menu State
  menuItems: MenuItem[];
  updateItemAvailability: (id: string, available: boolean) => void;
  updateItemPrice: (id: string, newPrice: number) => void;
  addNewMenuItem: (item: MenuItem) => void;

  // Cart State
  cart: CartItem[];
  addToCart: (item: MenuItem, quantity?: number, portion?: 'Regular' | 'Family Pack' | 'Full', spice?: number, notes?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartQuantity: (itemId: string, delta: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartTax: number;
  cartTotal: number;
  cartCount: number;

  // Orders State
  orders: Order[];
  placeOrder: (customerName: string, customerPhone: string, orderType: 'dine-in' | 'pickup', tableNumber?: string, instructions?: string) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;

  // Reservations State
  reservations: Reservation[];
  bookReservation: (data: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => Reservation;
  updateReservationStatus: (reservationId: string, status: ReservationStatus) => void;

  // Reviews State
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'date' | 'isVerified'>) => void;

  // Admin State
  isAdmin: boolean;
  loginAdmin: (pin: string) => boolean;
  logoutAdmin: () => void;

  // Modals
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isReservationOpen: boolean;
  setIsReservationOpen: (open: boolean) => void;
  isBillSplitOpen: boolean;
  setIsBillSplitOpen: (open: boolean) => void;
  isAddReviewOpen: boolean;
  setIsAddReviewOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isMenuOriginalOpen: boolean;
  setIsMenuOriginalOpen: (open: boolean) => void;
  activeReceiptOrder: Order | null;
  setActiveReceiptOrder: (order: Order | null) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  MENU: 'eden_menu_v2',
  ORDERS: 'eden_orders_v1',
  RESERVATIONS: 'eden_reservations_v1',
  REVIEWS: 'eden_reviews_v1',
  ADMIN_AUTH: 'eden_admin_auth_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Menu - Always sync latest fresh images and dish details from INITIAL_MENU_ITEMS
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MENU);
      if (!saved) return INITIAL_MENU_ITEMS;
      const parsed: MenuItem[] = JSON.parse(saved);
      const initialMap = new Map(INITIAL_MENU_ITEMS.map((item) => [item.id, item]));
      return parsed.map((item) => {
        const fresh = initialMap.get(item.id);
        if (fresh) {
          return {
            ...fresh,
            available: item.available ?? fresh.available,
            price: item.price ?? fresh.price,
          };
        }
        return item;
      });
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'EDN-8921',
          createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
          customerName: 'Vikram Varma',
          customerPhone: '+91 98480 12345',
          orderType: 'dine-in',
          tableNumber: 'Garden Gazebo T-4',
          items: [
            {
              item: INITIAL_MENU_ITEMS[0],
              quantity: 2,
              portion: 'Regular',
              selectedSpice: 3,
            },
            {
              item: INITIAL_MENU_ITEMS[8],
              quantity: 2,
              portion: 'Regular',
            }
          ],
          subtotal: 1040,
          tax: 52,
          serviceFee: 0,
          total: 1092,
          status: 'preparing',
          paymentMethod: 'Cash / UPI at Table',
          specialInstructions: 'Extra spicy, well roasted.'
        },
        {
          id: 'EDN-8920',
          createdAt: new Date(Date.now() - 65 * 60 * 1000).toISOString(),
          customerName: 'Priya Sundaram',
          customerPhone: '+91 94401 54321',
          orderType: 'pickup',
          pickupTime: '8:45 PM Express Highway Pick',
          items: [
            {
              item: INITIAL_MENU_ITEMS[9],
              quantity: 3,
              portion: 'Regular',
            },
            {
              item: INITIAL_MENU_ITEMS[23],
              quantity: 4,
              portion: 'Regular',
            }
          ],
          subtotal: 1030,
          tax: 51,
          serviceFee: 0,
          total: 1081,
          status: 'ready',
          paymentMethod: 'Online UPI',
          specialInstructions: 'Highway traveler, please pack in heat-sealed containers.'
        }
      ];
    } catch {
      return [];
    }
  });

  // Reservations
  const [reservations, setReservations] = useState<Reservation[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      return saved ? JSON.parse(saved) : [
        {
          id: 'RES-401',
          createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
          guestName: 'Balaji & Family',
          guestPhone: '+91 99887 76655',
          guestEmail: 'balaji@example.com',
          guestsCount: 6,
          reservationDate: 'Tonight',
          timeSlot: '8:30 PM',
          seatingZone: 'Open Garden Gazebo',
          specialRequests: 'Near garden fountain with low music for birthday celebration.',
          status: 'confirmed'
        },
        {
          id: 'RES-402',
          createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
          guestName: 'Anil Chowdary',
          guestPhone: '+91 98490 33221',
          guestsCount: 12,
          reservationDate: 'Tomorrow',
          timeSlot: '7:45 PM',
          seatingZone: 'Royal AC Dining Hall',
          specialRequests: 'Corporate delegation dinner. Need projector screen ready.',
          status: 'pending'
        }
      ];
    } catch {
      return [];
    }
  });

  // Reviews
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Admin Auth
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
  });

  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isBillSplitOpen, setIsBillSplitOpen] = useState(false);
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMenuOriginalOpen, setIsMenuOriginalOpen] = useState(false);
  const [activeReceiptOrder, setActiveReceiptOrder] = useState<Order | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MENU, JSON.stringify(menuItems));
  }, [menuItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
  }, [reservations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
  }, [reviews]);

  // Cart operations
  const addToCart = (
    item: MenuItem,
    quantity = 1,
    portion: 'Regular' | 'Family Pack' | 'Full' = 'Regular',
    spice?: number,
    notes?: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.item.id === item.id && ci.portion === portion && ci.selectedSpice === (spice ?? item.spiceLevel)
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex].quantity += quantity;
        if (notes) next[existingIndex].notes = notes;
        return next;
      } else {
        return [
          ...prev,
          {
            item,
            quantity,
            portion,
            selectedSpice: (spice !== undefined ? spice : item.spiceLevel) as any,
            notes,
          },
        ];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((ci) => ci.item.id !== itemId));
  };

  const updateCartQuantity = (itemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((ci) => {
          if (ci.item.id === itemId) {
            const nextQ = ci.quantity + delta;
            return nextQ > 0 ? { ...ci, quantity: nextQ } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const cartSubtotal = cart.reduce((acc, ci) => {
    let multiplier = 1;
    if (ci.portion === 'Family Pack') multiplier = 1.8;
    if (ci.portion === 'Full') multiplier = 1.6;
    return acc + Math.round(ci.item.price * multiplier) * ci.quantity;
  }, 0);

  const cartTax = Math.round(cartSubtotal * 0.05); // 5% GST
  const cartTotal = cartSubtotal + cartTax;
  const cartCount = cart.reduce((acc, ci) => acc + ci.quantity, 0);

  // Orders
  const placeOrder = (
    customerName: string,
    customerPhone: string,
    orderType: 'dine-in' | 'pickup',
    tableNumber?: string,
    instructions?: string
  ): Order => {
    const orderId = `EDN-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customerName,
      customerPhone,
      orderType,
      tableNumber: orderType === 'dine-in' ? (tableNumber || 'Table assigned on arrival') : undefined,
      pickupTime: orderType === 'pickup' ? 'Ready in approx 25 mins' : undefined,
      items: [...cart],
      subtotal: cartSubtotal,
      tax: cartTax,
      serviceFee: 0,
      total: cartTotal,
      status: 'pending',
      paymentMethod: 'Cash / UPI at Table',
      specialInstructions: instructions,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setActiveReceiptOrder(newOrder);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );
  };

  // Reservations
  const bookReservation = (data: Omit<Reservation, 'id' | 'createdAt' | 'status'>): Reservation => {
    const resId = `RES-${Math.floor(100 + Math.random() * 900)}`;
    const newRes: Reservation = {
      ...data,
      id: resId,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };
    setReservations((prev) => [newRes, ...prev]);
    return newRes;
  };

  const updateReservationStatus = (reservationId: string, status: ReservationStatus) => {
    setReservations((prev) =>
      prev.map((res) => (res.id === reservationId ? { ...res, status } : res))
    );
  };

  // Menu Updates
  const updateItemAvailability = (id: string, available: boolean) => {
    setMenuItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, available } : it))
    );
  };

  const updateItemPrice = (id: string, newPrice: number) => {
    setMenuItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, price: newPrice } : it))
    );
  };

  const addNewMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => [item, ...prev]);
  };

  // Reviews
  const addReview = (newRev: Omit<Review, 'id' | 'date' | 'isVerified'>) => {
    const rev: Review = {
      ...newRev,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      isVerified: true,
    };
    setReviews((prev) => [rev, ...prev]);
  };

  // Admin Auth
  const loginAdmin = (pin: string): boolean => {
    if (pin === 'eden2026' || pin === '1234' || pin === 'admin') {
      setIsAdmin(true);
      localStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
  };

  return (
    <StoreContext.Provider
      value={{
        menuItems,
        updateItemAvailability,
        updateItemPrice,
        addNewMenuItem,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        cartTax,
        cartTotal,
        cartCount,
        orders,
        placeOrder,
        updateOrderStatus,
        reservations,
        bookReservation,
        updateReservationStatus,
        reviews,
        addReview,
        isAdmin,
        loginAdmin,
        logoutAdmin,
        isCartOpen,
        setIsCartOpen,
        isReservationOpen,
        setIsReservationOpen,
        isBillSplitOpen,
        setIsBillSplitOpen,
        isAddReviewOpen,
        setIsAddReviewOpen,
        isAdminOpen,
        setIsAdminOpen,
        isMenuOriginalOpen,
        setIsMenuOriginalOpen,
        activeReceiptOrder,
        setActiveReceiptOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) throw new Error('useStore must be used within a StoreProvider');
  return context;
};
