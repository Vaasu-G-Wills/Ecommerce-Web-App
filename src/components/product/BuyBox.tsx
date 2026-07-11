import React, { useState } from 'react';
import { ShoppingBag, Zap, MapPin, Heart, Lock, CheckCircle2 } from 'lucide-react';
import type { Product, ConfigOption } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { formatINR, getDeliveryDate } from '../../utils/formatters';

interface BuyBoxProps {
  product: Product;
  selectedConfigs: ConfigOption[];
  unitPrice: number;
  onNavigate: (path: string) => void;
}

export const BuyBox: React.FC<BuyBoxProps> = ({ product, selectedConfigs, unitPrice, onNavigate }) => {
  const { addToCart } = useCart();
  const { wishlists, activeWishlistId, addToWishlist, setActiveWishlistId } = useWishlist();
  const { selectedAddress } = useAuth();

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedWl, setSelectedWl] = useState<string>(activeWishlistId);

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedConfigs);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity, selectedConfigs);
    onNavigate('/checkout');
  };

  const handleAddToWishlist = () => {
    setActiveWishlistId(selectedWl);
    addToWishlist(product, selectedWl);
  };

  return (
    <div
      className="glass-panel"
      style={{
        borderRadius: '16px',
        padding: '1.6rem',
        border: '1px solid #30363d',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      }}
    >
      {/* Dynamic Total Price in ₹ INR */}
      <div>
        <span style={{ fontSize: '1.9rem', fontWeight: 800, color: '#fff', fontFamily: "'JetBrains Mono', monospace" }}>
          {formatINR(unitPrice * quantity)}
        </span>
        {quantity > 1 && (
          <div style={{ fontSize: '0.8rem', color: '#8b949e', marginTop: '2px' }}>
            ({formatINR(unitPrice)} each for {quantity} items)
          </div>
        )}
      </div>

      {/* Prime Delivery & Location */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.86rem' }}>
        {product.isPrime ? (
          <div style={{ color: '#00f2fe', fontWeight: 700 }}>
            ⚡ FREE One-Day Prime Delivery {getDeliveryDate(1)}
          </div>
        ) : (
          <div style={{ color: '#c9d1d9' }}>
            Standard Delivery {getDeliveryDate(3)} (₹99 or FREE over ₹5,000)
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#8b949e' }}>
          <MapPin size={16} color="#ff9900" />
          <span>Deliver to {selectedAddress.city} - {selectedAddress.pinCode}</span>
        </div>
      </div>

      {/* Stock Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '1rem', fontWeight: 700, color: '#2ea043' }}>
        <CheckCircle2 size={18} />
        <span>In Stock ({product.stockCount} left)</span>
      </div>

      {/* Quantity Dropdown */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#c9d1d9' }}>Quantity:</span>
        <select
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          style={{
            padding: '8px 16px',
            backgroundColor: '#161b22',
            color: '#fff',
            border: '1px solid #30363d',
            borderRadius: '6px',
            fontWeight: 700,
            fontSize: '0.95rem',
            cursor: 'pointer',
          }}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Primary Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={handleAddToCart}
          className="btn-primary"
          style={{ width: '100%', padding: '0.85rem', fontSize: '1rem', borderRadius: '99px' }}
        >
          <ShoppingBag size={18} />
          <span>Add to Cart</span>
        </button>

        <button
          onClick={handleBuyNow}
          style={{
            width: '100%',
            padding: '0.85rem',
            fontSize: '1rem',
            fontWeight: 800,
            backgroundColor: '#ffa41c',
            color: '#0d1117',
            border: 'none',
            borderRadius: '99px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(255, 164, 28, 0.4)',
            transition: 'transform 0.15s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <Zap size={18} fill="#0d1117" />
          <span>Buy Now (Direct Checkout)</span>
        </button>
      </div>

      {/* Seller & Protection Metadata */}
      <div style={{ fontSize: '0.78rem', color: '#8b949e', display: 'flex', flexDirection: 'column', gap: '4px', borderTop: '1px solid #30363d', paddingTop: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Ships from</span>
          <span style={{ color: '#fff', fontWeight: 600 }}>PrimeTech India Hub</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Sold by</span>
          <span style={{ color: '#fff', fontWeight: 600 }}>PrimeTech Retail Pvt. Ltd.</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#2ea043', marginTop: '4px', fontWeight: 600 }}>
          <Lock size={13} />
          <span>Secure local-first encrypted transaction</span>
        </div>
      </div>

      {/* Add to Wishlist Dropdown + Button */}
      <div style={{ borderTop: '1px solid #30363d', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <select
            value={selectedWl}
            onChange={(e) => setSelectedWl(e.target.value)}
            style={{
              flex: 1,
              padding: '6px 10px',
              backgroundColor: '#161b22',
              border: '1px solid #30363d',
              color: '#c9d1d9',
              borderRadius: '6px',
              fontSize: '0.8rem',
            }}
          >
            {wishlists.map((wl) => (
              <option key={wl.id} value={wl.id}>
                {wl.name} {wl.isPrivate ? '(Private)' : ''}
              </option>
            ))}
          </select>
          <button
            onClick={handleAddToWishlist}
            style={{
              padding: '6px 12px',
              backgroundColor: '#232f3e',
              color: '#00f2fe',
              border: '1px solid #30363d',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Heart size={14} />
            <span>Add to List</span>
          </button>
        </div>
      </div>
    </div>
  );
};
