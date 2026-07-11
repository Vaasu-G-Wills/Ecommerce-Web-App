import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, Wishlist } from '../types';
import { useCart } from './CartContext';

interface WishlistContextType {
  wishlists: Wishlist[];
  activeWishlistId: string;
  createWishlist: (name: string, isPrivate?: boolean) => void;
  deleteWishlist: (id: string) => void;
  addToWishlist: (product: Product, wishlistId?: string) => void;
  removeFromWishlist: (productId: string, wishlistId?: string) => void;
  moveItemToCart: (productId: string, wishlistId?: string) => void;
  isProductInWishlist: (productId: string) => boolean;
  setActiveWishlistId: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { addToCart, showToast } = useCart();

  const [wishlists, setWishlists] = useState<Wishlist[]>(() => {
    const saved = localStorage.getItem('primetech_wishlists');
    if (saved) return JSON.parse(saved);
    return [
      {
        id: 'wl-default',
        name: 'My PC Build 2026',
        isPrivate: false,
        items: [],
      },
      {
        id: 'wl-dream',
        name: 'Dream OLED Monitor Setup',
        isPrivate: true,
        items: [],
      },
    ];
  });

  const [activeWishlistId, setActiveWishlistId] = useState<string>(() => {
    const saved = localStorage.getItem('primetech_active_wl_id');
    return saved || 'wl-default';
  });

  useEffect(() => {
    localStorage.setItem('primetech_wishlists', JSON.stringify(wishlists));
  }, [wishlists]);

  useEffect(() => {
    localStorage.setItem('primetech_active_wl_id', activeWishlistId);
  }, [activeWishlistId]);

  const createWishlist = (name: string, isPrivate = false) => {
    const newWl: Wishlist = {
      id: `wl-${Date.now()}`,
      name,
      isPrivate,
      items: [],
    };
    setWishlists((prev) => [...prev, newWl]);
    setActiveWishlistId(newWl.id);
    showToast(`Wishlist "${name}" created.`, 'success');
  };

  const deleteWishlist = (id: string) => {
    if (wishlists.length <= 1) {
      showToast('You must have at least one wishlist.', 'warning');
      return;
    }
    const next = wishlists.filter((w) => w.id !== id);
    setWishlists(next);
    if (activeWishlistId === id) {
      setActiveWishlistId(next[0].id);
    }
    showToast('Wishlist deleted.', 'info');
  };

  const addToWishlist = (product: Product, wishlistId = activeWishlistId) => {
    setWishlists((prev) =>
      prev.map((wl) => {
        if (wl.id === wishlistId) {
          if (wl.items.some((item) => item.product.id === product.id)) {
            return wl; // already inside
          }
          return {
            ...wl,
            items: [
              ...wl.items,
              { id: `witem-${Date.now()}`, product, addedAt: new Date().toISOString() },
            ],
          };
        }
        return wl;
      })
    );
    showToast(`Added "${product.title.substring(0, 35)}..." to your wishlist!`, 'success');
  };

  const removeFromWishlist = (productId: string, wishlistId = activeWishlistId) => {
    setWishlists((prev) =>
      prev.map((wl) => {
        if (wl.id === wishlistId) {
          return {
            ...wl,
            items: wl.items.filter((item) => item.product.id !== productId),
          };
        }
        return wl;
      })
    );
    showToast('Item removed from wishlist.', 'info');
  };

  const moveItemToCart = (productId: string, wishlistId = activeWishlistId) => {
    const wl = wishlists.find((w) => w.id === wishlistId);
    if (!wl) return;
    const item = wl.items.find((i) => i.product.id === productId);
    if (!item) return;

    addToCart(item.product, 1);
    removeFromWishlist(productId, wishlistId);
  };

  const isProductInWishlist = (productId: string): boolean => {
    return wishlists.some((wl) => wl.items.some((i) => i.product.id === productId));
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlists,
        activeWishlistId,
        createWishlist,
        deleteWishlist,
        addToWishlist,
        removeFromWishlist,
        moveItemToCart,
        isProductInWishlist,
        setActiveWishlistId,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
