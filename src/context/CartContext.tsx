import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, ConfigOption, Coupon, Product, SavedForLaterItem } from '../types';
import { useAuth } from './AuthContext';
import { useAdmin } from './AdminContext';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

interface CartContextType {
  cartItems: CartItem[];
  savedItems: SavedForLaterItem[];
  isCartDrawerOpen: boolean;
  appliedCoupon: Coupon | null;
  couponError: string | null;
  toasts: ToastMessage[];
  
  // Totals
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  taxAmount: number;
  totalAmount: number;
  itemCount: number;
  
  // Actions
  addToCart: (product: Product, quantity?: number, selectedConfigs?: ConfigOption[]) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  moveToSavedForLater: (cartItemId: string) => void;
  moveToCartFromSaved: (savedId: string) => void;
  removeSavedItem: (savedId: string) => void;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  clearCart: () => void;
  showToast: (message: string, type?: ToastMessage['type']) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { coupons } = useAdmin();
  
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('primetech_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [savedItems, setSavedItems] = useState<SavedForLaterItem[]>(() => {
    const saved = localStorage.getItem('primetech_saved_later');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponError, setCouponError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    localStorage.setItem('primetech_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('primetech_saved_later', JSON.stringify(savedItems));
  }, [savedItems]);

  const showToast = (message: string, type: ToastMessage['type'] = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const calculateUnitPrice = (product: Product, configs: ConfigOption[]): number => {
    const deltaSum = configs.reduce((acc, c) => acc + (c.priceDelta || 0), 0);
    return product.price + deltaSum;
  };

  const addToCart = (product: Product, quantity = 1, selectedConfigs: ConfigOption[] = []) => {
    // If no configs specified but product has default configs, use defaults
    let configsToUse = selectedConfigs;
    if (configsToUse.length === 0 && product.configurations) {
      configsToUse = product.configurations.filter((c) => c.isDefault);
    }

    const unitPrice = calculateUnitPrice(product, configsToUse);
    const configKey = configsToUse.map((c) => c.id).sort().join('-');
    const cartItemId = `${product.id}_${configKey || 'default'}`;

    setCartItems((prev) => {
      const existingIdx = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            product,
            quantity,
            selectedConfigs: configsToUse,
            unitPrice,
          },
        ];
      }
    });

    showToast(`Added "${product.title.substring(0, 45)}..." to cart!`, 'success');
    setIsCartDrawerOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
    showToast('Item removed from cart.', 'info');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.cartItemId === cartItemId ? { ...i, quantity } : i))
    );
  };

  const moveToSavedForLater = (cartItemId: string) => {
    const item = cartItems.find((i) => i.cartItemId === cartItemId);
    if (!item) return;

    setCartItems((prev) => prev.filter((i) => i.cartItemId !== cartItemId));
    setSavedItems((prev) => [
      ...prev,
      {
        savedId: `saved-${Date.now()}`,
        product: item.product,
        selectedConfigs: item.selectedConfigs,
        unitPrice: item.unitPrice,
      },
    ]);
    showToast('Moved item to Saved for Later.', 'info');
  };

  const moveToCartFromSaved = (savedId: string) => {
    const item = savedItems.find((s) => s.savedId === savedId);
    if (!item) return;

    setSavedItems((prev) => prev.filter((s) => s.savedId !== savedId));
    addToCart(item.product, 1, item.selectedConfigs);
  };

  const removeSavedItem = (savedId: string) => {
    setSavedItems((prev) => prev.filter((s) => s.savedId !== savedId));
    showToast('Removed item from Saved for Later.', 'info');
  };

  const openCartDrawer = () => setIsCartDrawerOpen(true);
  const closeCartDrawer = () => setIsCartDrawerOpen(false);

  const applyCoupon = (code: string): boolean => {
    setCouponError(null);
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode);

    if (!found) {
      setCouponError('Invalid coupon code. Check active codes in Admin Portal or try TECHPRO10.');
      return false;
    }

    if (subtotal < found.minOrderValue) {
      setCouponError(`Minimum order value ₹${found.minOrderValue.toLocaleString('en-IN')} required for this coupon.`);
      return false;
    }

    setAppliedCoupon(found);
    showToast(`Coupon "${found.code}" applied! You save ${found.discountPercentage}%.`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
    showToast('Coupon removed.', 'info');
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedCoupon(null);
    localStorage.removeItem('primetech_cart');
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon) {
    discountAmount = Math.round((subtotal * appliedCoupon.discountPercentage) / 100);
    if (appliedCoupon.code === 'PRIME2026' && discountAmount > 15000) {
      discountAmount = 15000; // max cap
    }
  }

  // Shipping fee calculation: FREE if Prime or subtotal > ₹5000, otherwise ₹99
  const shippingFee = user.isPrimeMember || subtotal > 5000 || subtotal === 0 ? 0 : 99;

  // Tax calculation: 18% GST (assuming it's already integrated in product price, we show breakout for transparency)
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = Math.round(taxableAmount * (18 / 118)); // breakout of inclusive 18% GST

  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        savedItems,
        isCartDrawerOpen,
        appliedCoupon,
        couponError,
        toasts,
        subtotal,
        discountAmount,
        shippingFee,
        taxAmount,
        totalAmount,
        itemCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        moveToSavedForLater,
        moveToCartFromSaved,
        removeSavedItem,
        openCartDrawer,
        closeCartDrawer,
        applyCoupon,
        removeCoupon,
        clearCart,
        showToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
