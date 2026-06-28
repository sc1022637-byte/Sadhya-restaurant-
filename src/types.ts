export interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: 'starters' | 'soups' | 'shakes' | 'beverages' | 'sandwiches' | 'tea-coffee';
  categoryLabel: string;
  description?: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  isVeg?: boolean;
  image?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

export type OrderType = 'dine-in' | 'pickup' | 'delivery';

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  email?: string;
  date: string;
  timeSlot: string;
  guests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed';
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}
