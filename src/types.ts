export interface Book {
  id: string;
  title: string;
  author: string;
  publisher: string;
  category: string;
  subcategory?: string;
  isbn: string;
  edition: string;
  language: string;
  pages: number;
  description: string;
  price: number;
  oldPrice?: number;
  offerBadge?: string;
  rating: number;
  coverColor: string; // Gradient starting color (e.g. 'from-blue-600 to-indigo-900')
  coverEmoji: string; // Dynamic icon or emoji
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isRecommended?: boolean;
  salesCount?: number;
  rank?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  gradient: string;
  subcategories?: string[];
}

export interface Publisher {
  id: string;
  name: string;
  logoText: string; // Short logo display
  description: string;
  count: number;
  bgColor: string;
}

export interface Review {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  rating: number;
  text: string;
  bookTitle?: string;
}

export interface Branch {
  name: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  timing: string;
}
