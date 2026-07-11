import React from 'react';
import { useCart } from '../../context/CartContext';
import { CartItemCard } from './CartItemCard';
import { formatINR } from '../../utils/formatters';
import { X, ShoppingBag, ArrowRight, Truck } from 'lucide-react';

interface CartDrawerProps {
  onNavigate: (path: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onNavigate }) => {
  const { cartItems, isCartDrawerOpen, closeCartDrawer, subtotal, itemCount } = useCart();

  if (!isCartDrawerOpen) return null;

  const freeShippingThreshold = 5000;
  const neededForFree = Math.max(0, freeShippingThreshold - subtotal);
  const progressPct = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', justifyContent: 'flex-end' }}>
      {/* Backdrop */}
      <div
        onClick={closeCartDrawer}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Drawer Panel */}
      <div
        className="animate-slide-in"
        style={{
          position: 'relative',
          width: '420px',
          maxWidth: '92vw',
          height: '100%',
          backgroundColor: '#0d1117',
          color: '#f0f6fc',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.85)',
          borderLeft: '1px solid #30363d',
          zIndex: 3001,
        }}
      >
        {/* Header */}
        <div
          style={{
            backgroundColor: '#232f3e',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #30363d',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', fontWeight: 800 }}>
            <ShoppingBag size={22} color="#ff9900" />
            <span>Shopping Cart ({itemCount})</span>
          </div>
          <button onClick={closeCartDrawer} style={{ color: '#fff', padding: '4px' }}>
            <X size={22} />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div style={{ backgroundColor: '#161b22', padding: '12px 20px', borderBottom: '1px solid #30363d', fontSize: '0.82rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Truck size={16} color="#00f2fe" />
            {neededForFree === 0 ? (
              <span style={{ color: '#2ea043', fontWeight: 700 }}>✓ Your order qualifies for FREE India Delivery!</span>
            ) : (
              <span>
                Add <span style={{ color: '#ff9900', fontWeight: 700 }}>{formatINR(neededForFree)}</span> more of eligible hardware for FREE delivery.
              </span>
            )}
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: '#30363d', borderRadius: '99px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${progressPct}%`,
                height: '100%',
                backgroundColor: neededForFree === 0 ? '#2ea043' : '#ff9900',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Items Scroll List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#8b949e' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff' }}>Your PrimeTech Cart is empty</div>
              <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>Explore PC components, GPUs, and Laptops to add items.</p>
              <button
                onClick={() => { closeCartDrawer(); onNavigate('/'); }}
                className="btn-primary"
                style={{ marginTop: '1.4rem', padding: '0.65rem 1.4rem' }}
              >
                Start Shopping Hardware
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItemCard
                key={item.cartItemId}
                item={item}
                onNavigate={(path) => { closeCartDrawer(); onNavigate(path); }}
                compact={true}
              />
            ))
          )}
        </div>

        {/* Footer Subtotal & Action Buttons */}
        {cartItems.length > 0 && (
          <div
            style={{
              backgroundColor: '#161b22',
              padding: '18px 20px',
              borderTop: '1px solid #30363d',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.95rem', color: '#c9d1d9', fontWeight: 600 }}>Subtotal:</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', fontFamily: "'JetBrains Mono', monospace" }}>
                {formatINR(subtotal)}
              </span>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => { closeCartDrawer(); onNavigate('/cart'); }}
                className="btn-secondary"
                style={{ flex: 1, padding: '0.8rem', fontSize: '0.92rem' }}
              >
                View Full Cart
              </button>

              <button
                onClick={() => { closeCartDrawer(); onNavigate('/checkout'); }}
                className="btn-primary"
                style={{ flex: 1.2, padding: '0.8rem', fontSize: '0.92rem', gap: '6px' }}
              >
                <span>Checkout</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
