import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, Coupon } from '../types';
import { PRODUCTS } from '../data/products';
import { AVAILABLE_COUPONS } from '../data/categories';

interface AdminContextType {
  products: Product[];
  coupons: Coupon[];
  isAdminMode: boolean;
  setIsAdminMode: (val: boolean) => void;
  
  // Product actions
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updatedData: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  updateStock: (id: string, newStock: number) => void;
  toggleLightningDeal: (id: string, isDeal: boolean) => void;
  
  // Coupon actions
  addCoupon: (coupon: Coupon) => void;
  deleteCoupon: (code: string) => void;
  toggleCouponStatus: (code: string) => void;
  
  // Quick Templates helper
  applyProductTemplate: (templateType: 'gaming-laptop' | 'custom-pc' | 'mechanical-keyboard') => Product;
  
  // Reset demo data
  resetToDefaultSeeds: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdminMode, setIsAdminMode] = useState<boolean>(() => {
    return localStorage.getItem('primetech_admin_mode') === 'true';
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('primetech_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing primetech_products', e);
      }
    }
    return PRODUCTS;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('primetech_coupons');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing primetech_coupons', e);
      }
    }
    return AVAILABLE_COUPONS;
  });

  useEffect(() => {
    localStorage.setItem('primetech_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('primetech_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('primetech_admin_mode', isAdminMode ? 'true' : 'false');
  }, [isAdminMode]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const updateProduct = (id: string, updatedData: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedData } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateStock = (id: string, newStock: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        return {
          ...p,
          stockCount: Math.max(0, newStock),
          inStock: newStock > 0,
        };
      })
    );
  };

  const toggleLightningDeal = (id: string, isDeal: boolean) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        return {
          ...p,
          isLightningDeal: isDeal,
          lightningDealClaimedPercentage: isDeal ? 65 : undefined,
          lightningDealEndsAt: isDeal ? new Date(Date.now() + 86400000).toISOString() : undefined,
        };
      })
    );
  };

  const addCoupon = (coupon: Coupon) => {
    setCoupons((prev) => {
      const filtered = prev.filter((c) => c.code.toUpperCase() !== coupon.code.toUpperCase());
      return [coupon, ...filtered];
    });
  };

  const deleteCoupon = (code: string) => {
    setCoupons((prev) => prev.filter((c) => c.code.toUpperCase() !== code.toUpperCase()));
  };

  const toggleCouponStatus = (code: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.code.toUpperCase() === code.toUpperCase() ? { ...c, discountPercentage: c.discountPercentage === 0 ? 15 : 0 } : c))
    );
  };

  const applyProductTemplate = (templateType: 'gaming-laptop' | 'custom-pc' | 'mechanical-keyboard'): Product => {
    const timestamp = Date.now();
    if (templateType === 'gaming-laptop') {
      return {
        id: `laptop-${timestamp}`,
        title: 'ASUS ROG Strix G16 (2026) Core i9 14900HX, RTX 4070 8GB VRAM Gaming Laptop',
        shortDescription: '16" QHD+ 240Hz Nebula Display, 32GB DDR5 RAM, 1TB PCIe 4.0 NVMe SSD, RGB Keyboard, Windows 11',
        brand: 'ASUS',
        category: 'laptops',
        subCategory: 'Gaming Laptops',
        price: 159990,
        originalPrice: 189990,
        rating: 4.8,
        reviewsCount: 142,
        images: [
          'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=1200&q=80',
        ],
        inStock: true,
        stockCount: 15,
        isPrime: true,
        isBestSeller: true,
        isNewRelease: true,
        specs: [
          { label: 'Processor', value: 'Intel Core i9-14900HX (24 Cores, up to 5.8 GHz)' },
          { label: 'Graphics', value: 'NVIDIA GeForce RTX 4070 8GB GDDR6 (140W TGP)' },
          { label: 'Display', value: '16" 2.5K QHD+ (2560x1600) 240Hz, 3ms, 100% DCI-P3' },
          { label: 'Memory', value: '32GB DDR5 5600MHz (Dual Channel)' },
          { label: 'Storage', value: '1TB PCIe 4.0 NVMe M.2 SSD' },
          { label: 'Warranty', value: '2 Years ASUS India Premium Warranty' },
        ],
        configurations: [
          { id: `cfg-1-${timestamp}`, name: '16GB RAM + 1TB SSD', type: 'RAM & Storage', priceDelta: 0, isDefault: true },
          { id: `cfg-2-${timestamp}`, name: '32GB RAM + 2TB SSD Extreme', type: 'RAM & Storage', priceDelta: 18000 },
        ],
        bulletPoints: [
          'Powered by 14th Gen Intel Core i9 processor for extreme multi-tasking and competitive esports gaming.',
          'NVIDIA GeForce RTX 4070 GPU with full DLSS 3.5 Frame Generation and Ray Tracing support.',
          'ROG Intelligent Cooling with Thermal Grizzly Conductonaut Extreme liquid metal and Tri-Fan technology.',
          'BIS India Certified power adapter and full localized RGB keyboard layout.',
        ],
      };
    }

    if (templateType === 'custom-pc') {
      return {
        id: `pc-${timestamp}`,
        title: 'PrimeTech Custom Titan Liquid Cooled Gaming PC — Core i9 14900K, RTX 4090 24GB',
        shortDescription: 'Z790 Motherboard, 64GB DDR5 6400MHz, 4TB Gen4 NVMe, 1200W 80+ Platinum PSU, Lian Li O11 Dynamic EVO Glass Case',
        brand: 'PrimeTech Builds',
        category: 'components',
        subCategory: 'Pre-Built PCs',
        price: 349990,
        originalPrice: 389990,
        rating: 5.0,
        reviewsCount: 38,
        images: [
          'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
        ],
        inStock: true,
        stockCount: 5,
        isPrime: true,
        isLightningDeal: true,
        lightningDealEndsAt: new Date(Date.now() + 43200000).toISOString(),
        lightningDealClaimedPercentage: 80,
        specs: [
          { label: 'CPU', value: 'Intel Core i9-14900K Unlocked 24 Cores' },
          { label: 'GPU', value: 'NVIDIA GeForce RTX 4090 24GB GDDR6X Founders Edition' },
          { label: 'Cooling', value: 'NZXT Kraken Elite 360mm RGB AIO Liquid Cooler' },
          { label: 'RAM', value: '64GB (2x32GB) Corsair Vengeance RGB DDR5 6400MHz' },
          { label: 'Storage', value: '4TB Samsung 990 PRO Gen4 NVMe SSD' },
          { label: 'Power Supply', value: '1200W ATX 3.0 PCIe 5.0 Fully Modular Platinum PSU' },
        ],
        configurations: [
          { id: `cfg-pc1-${timestamp}`, name: 'RTX 4080 Super + 32GB RAM', type: 'GPU & RAM Tier', priceDelta: 0, isDefault: true },
          { id: `cfg-pc2-${timestamp}`, name: 'RTX 4090 Ultimate + 64GB RAM', type: 'GPU & RAM Tier', priceDelta: 65000 },
        ],
        bulletPoints: [
          'Hand-built and stress-tested for 48 hours by certified PrimeTech India overclocking technicians.',
          'Extreme 4K 144Hz and AI workload powerhouse optimized for Unreal Engine 5, Blender, and AAA Gaming.',
          'Tempered glass dual-chamber chassis with customizable addressable RGB infinity loop fans.',
          'Includes 3 Years On-Site India Advanced Replacement Warranty.',
        ],
      };
    }

    // mechanical keyboard
    return {
      id: `periph-${timestamp}`,
      title: 'Keychron Q1 Pro Wireless Custom Mechanical Keyboard (75% Layout, Full Aluminum)',
      shortDescription: 'QMK/VIA Programmable, Hot-Swappable RGB Backlit, Double-Shot PBT Keycaps, Bluetooth 5.1 & Type-C',
      brand: 'Keychron',
      category: 'peripherals',
      subCategory: 'Keyboards',
      price: 16999,
      originalPrice: 19999,
      rating: 4.9,
      reviewsCount: 310,
      images: [
        'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=80',
      ],
      inStock: true,
      stockCount: 42,
      isPrime: true,
      specs: [
        { label: 'Layout', value: '75% Compact (81 Keys + CNC Rotary Knob)' },
        { label: 'Body Material', value: 'Full CNC Machined 6063 Aluminum Chassis' },
        { label: 'Switches', value: 'Keychron K Pro Tactile Brown (Pre-Lubed)' },
        { label: 'Connectivity', value: 'Bluetooth 5.1 (3 Devices) & Wired USB Type-C' },
      ],
      configurations: [
        { id: `sw-1-${timestamp}`, name: 'Tactile Brown Switches', type: 'Switch Type', priceDelta: 0, isDefault: true },
        { id: `sw-2-${timestamp}`, name: 'Linear Red Switches', type: 'Switch Type', priceDelta: 0 },
        { id: `sw-3-${timestamp}`, name: 'Clicky Blue Switches', type: 'Switch Type', priceDelta: 0 },
      ],
      bulletPoints: [
        'Full acoustic gasket mount design providing a satisfying thocky typing experience.',
        'Supports complete QMK and VIA key remapping across Windows, Mac, and Linux systems.',
        'Hot-swappable sockets compatible with all 3-pin and 5-pin mechanical switches (Cherry, Gateron, Kailh).',
      ],
    };
  };

  const resetToDefaultSeeds = () => {
    setProducts(PRODUCTS);
    setCoupons(AVAILABLE_COUPONS);
    localStorage.removeItem('primetech_products');
    localStorage.removeItem('primetech_coupons');
  };

  return (
    <AdminContext.Provider
      value={{
        products,
        coupons,
        isAdminMode,
        setIsAdminMode,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock,
        toggleLightningDeal,
        addCoupon,
        deleteCoupon,
        toggleCouponStatus,
        applyProductTemplate,
        resetToDefaultSeeds,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
