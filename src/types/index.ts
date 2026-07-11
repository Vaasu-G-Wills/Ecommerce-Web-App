export interface SpecItem {
  label: string;
  value: string;
}

export interface ConfigOption {
  id: string;
  name: string;
  label?: string;
  type: string;
  priceDelta: number; // in INR (₹)
  isDefault?: boolean;
}

export interface ProductReview {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
  featureRatings?: {
    gaming?: number;
    valueForMoney?: number;
    performance?: number;
    buildQuality?: number;
  };
}

export interface ProductQuestion {
  id: string;
  productId: string;
  userName: string;
  question: string;
  date: string;
  answers: {
    id: string;
    userName: string;
    answer: string;
    date: string;
    upvotes: number;
  }[];
}

export interface Product {
  id: string;
  title: string;
  shortDescription: string;
  brand: string;
  category: string; // 'laptops' | 'components' | 'monitors' | 'peripherals' | 'storage' | 'networking'
  subCategory: string;
  price: number; // in INR (₹)
  originalPrice?: number; // for discount calculation
  rating: number; // e.g. 4.7
  reviewsCount: number;
  images: string[];
  inStock: boolean;
  stockCount: number;
  isPrime: boolean;
  isAmazonChoice?: boolean;
  isBestSeller?: boolean;
  isLightningDeal?: boolean;
  lightningDealEndsAt?: string; // ISO timestamp
  lightningDealClaimedPercentage?: number; // e.g. 78%
  isNewRelease?: boolean;
  
  // Tech Specs Matrix
  specs: SpecItem[];
  
  // Dynamic Configuration options (RAM, Storage, etc.)
  configurations?: ConfigOption[];
  
  // Frequently Bought Together product IDs
  bundleProductIds?: string[];
  
  // Overview bullet points (`About this item` on Amazon)
  bulletPoints: string[];
}

export interface CartItem {
  cartItemId: string; // unique combo of productId + selected configuration
  product: Product;
  quantity: number;
  selectedConfigs: ConfigOption[];
  unitPrice: number; // product base price + sum of selectedConfigs priceDelta
}

export interface SavedForLaterItem {
  savedId: string;
  product: Product;
  selectedConfigs: ConfigOption[];
  unitPrice: number;
}

export interface WishlistItem {
  id: string;
  product: Product;
  addedAt: string;
}

export interface Wishlist {
  id: string;
  name: string;
  isPrivate: boolean;
  items: WishlistItem[];
}

export interface UserAddress {
  id: string;
  fullName: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
  isDefault: boolean;
  addressType: 'Home' | 'Work' | 'Office';
}

export type Address = UserAddress;

export type OrderStatus = 'Order Placed' | 'Payment Verified' | 'Shipped' | 'Out for Delivery' | 'Delivered';

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  location: string;
  description: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. ORD-IND-84920-2026
  date: string;
  items: CartItem[];
  subtotal: number;
  shippingFee: number;
  taxAmount: number; // GST 18%
  discountAmount: number;
  totalAmount: number;
  shippingAddress: UserAddress;
  paymentMethod: 'UPI / QR Code' | 'Credit / Debit Card' | 'Credit/Debit Card (RuPay/Visa/MC)' | 'Net Banking' | 'Cash on Delivery (COD)' | 'Cash on Delivery';
  currentStatus: OrderStatus;
  timeline: OrderTimelineEvent[];
  estimatedDeliveryDate: string;
}

export interface FilterState {
  category: string;
  subCategory: string;
  brand: string[];
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStockOnly: boolean;
  primeOnly: boolean;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  searchQuery: string;
  specFilters?: {
    [key: string]: string[];
  };
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  description: string;
  minOrderValue: number;
}
