export type MealCategory = 'lunch-box' | 'cloud-kitchen' | 'party-orders' | 'groceries';

export type MealType = 'chicken' | 'vegetarian' | 'egg';

export interface Meal {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MealCategory;
  type: MealType;
  featured?: boolean;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Grocery {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  quantity: string;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  type: 'meal' | 'grocery';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'user';
  name?: string;
  createdAt: string;
}

export interface AdminStats {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  popularItems: {
    id: string;
    name: string;
    count: number;
  }[];
}