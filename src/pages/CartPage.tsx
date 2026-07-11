import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CartItemCard } from '../components/cart/CartItemCard';
import { SavedForLater } from '../components/cart/SavedForLater';
import { formatINR } from '../utils/formatters';
import { ShoppingBag, ArrowRight, Tag, ShieldCheck, Trash2, CheckCircle, AlertCircle } from 'lucide-react';

export const CartPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const {
    cartItems,
    subtotal,
    discountAmount,
    shippingFee,
    taxAmount,
    totalAmount,
    itemCount,
    appliedCoupon,
    couponError,
    applyCoupon,
    removeCoupon,
    clearCart,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const success = applyCoupon(couponCode);
    if (success) setCouponCode('');
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '2rem auto', padding: '0 1.5rem' }}>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <ShoppingBag size={28} color="#ff9900" />
        <span>Shopping Cart ({itemCount} items)</span>
      </h1>

      {cartItems.length === 0 ? (
        <div
          className="glass-panel"
          style={{
            textAlign: 'center',
            padding: '4.5rem 2rem',
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.2rem',
          }}
        >
          <div style={{ padding: '20px', borderRadius: '50%', backgroundColor: 'rgba(255, 153, 0, 0.15)', color: '#ff9900' }}>
            <ShoppingBag size={44} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>Your PrimeTech India Cart is empty</h2>
          <p style={{ color: '#8b949e', maxWidth: '520px', lineHeight: 1.5 }}>
            You have no computer hardware or electronics in your active cart right now. Browse our catalog of RTX 5090 GPUs, Apple M4 Laptops, and OLED displays.
          </p>
          <button
            onClick={() => onNavigate('/')}
            className="btn-primary"
            style={{ padding: '0.8rem 2.2rem', fontSize: '1rem', marginTop: '1rem' }}
          >
            Explore Hardware Storefront
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 380px', gap: '2.5rem', alignItems: 'flex-start' }}>
          {/* Left Column: Items List */}
          <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.8rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #30363d', paddingBottom: '14px', marginBottom: '6px' }}>
              <span style={{ fontSize: '0.88rem', color: '#8b949e' }}>Price</span>
              <button
                onClick={clearCart}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#da3633', fontWeight: 700 }}
              >
                <Trash2 size={15} />
                <span>Clear All Items</span>
              </button>
            </div>

            <div>
              {cartItems.map((item) => (
                <CartItemCard key={item.cartItemId} item={item} onNavigate={onNavigate} />
              ))}
            </div>

            <div style={{ textAlign: 'right', marginTop: '1.5rem', fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>
              Subtotal ({itemCount} items):{' '}
              <span style={{ color: '#ff9900', fontFamily: "'JetBrains Mono', monospace", fontWeight: 800 }}>
                {formatINR(subtotal)}
              </span>
            </div>
          </div>

          {/* Right Column: Order Summary & Coupon */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: '90px' }}>
            <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.6rem', border: '1px solid #30363d' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', marginBottom: '1.2rem', borderBottom: '1px solid #30363d', paddingBottom: '10px' }}>
                Order Summary (India)
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#c9d1d9' }}>
                  <span>Items Subtotal:</span>
                  <span style={{ color: '#fff', fontWeight: 600, fontFamily: 'monospace' }}>{formatINR(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2ea043', fontWeight: 700 }}>
                    <span>Coupon Discount ({appliedCoupon?.code}):</span>
                    <span style={{ fontFamily: 'monospace' }}>-{formatINR(discountAmount)}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#c9d1d9' }}>
                  <span>Shipping & Delivery:</span>
                  <span style={{ color: shippingFee === 0 ? '#00f2fe' : '#fff', fontWeight: 600, fontFamily: 'monospace' }}>
                    {shippingFee === 0 ? 'FREE (Prime VIP / >₹5K)' : formatINR(shippingFee)}
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8b949e', fontSize: '0.8rem' }}>
                  <span>Estimated GST Breakdown (18% inclusive):</span>
                  <span style={{ fontFamily: 'monospace' }}>{formatINR(taxAmount)}</span>
                </div>

                <div style={{ height: '1px', backgroundColor: '#30363d', margin: '8px 0' }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.35rem', fontWeight: 800, color: '#fff' }}>
                  <span>Total Amount:</span>
                  <span style={{ color: '#ff9900', fontFamily: "'JetBrains Mono', monospace" }}>
                    {formatINR(totalAmount)}
                  </span>
                </div>
              </div>

              {/* Proceed Button */}
              <button
                onClick={() => onNavigate('/checkout')}
                className="btn-primary"
                style={{
                  width: '100%',
                  marginTop: '1.6rem',
                  padding: '0.9rem',
                  fontSize: '1.05rem',
                  borderRadius: '99px',
                }}
              >
                <span>Proceed to Buy ({itemCount} items)</span>
                <ArrowRight size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2ea043', fontSize: '0.78rem', fontWeight: 600, marginTop: '14px', justifyContent: 'center' }}>
                <ShieldCheck size={16} />
                <span>Encrypted local-first transaction simulation</span>
              </div>
            </div>

            {/* Coupon Box */}
            <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.4rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>
                <Tag size={18} color="#ff9900" />
                <span>Apply Indian Coupon / Voucher</span>
              </div>

              {appliedCoupon ? (
                <div style={{ backgroundColor: 'rgba(46, 160, 67, 0.15)', border: '1px solid #238636', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2ea043', fontWeight: 700, fontSize: '0.88rem' }}>
                    <CheckCircle size={18} />
                    <div>
                      <div>{appliedCoupon.code} Applied</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 500 }}>{appliedCoupon.description}</div>
                    </div>
                  </div>
                  <button onClick={removeCoupon} style={{ fontSize: '0.78rem', color: '#da3633', fontWeight: 700 }}>
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Enter TECHPRO10 or PRIME2026"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      backgroundColor: '#161b22',
                      border: '1px solid #30363d',
                      color: '#fff',
                      borderRadius: '8px',
                      fontSize: '0.88rem',
                      fontFamily: 'monospace',
                    }}
                  />
                  <button type="submit" className="btn-secondary" style={{ padding: '0 1.2rem', fontWeight: 700 }}>
                    Apply
                  </button>
                </form>
              )}

              {couponError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#da3633', fontSize: '0.8rem', marginTop: '8px' }}>
                  <AlertCircle size={14} />
                  <span>{couponError}</span>
                </div>
              )}

              <div style={{ fontSize: '0.75rem', color: '#8b949e', marginTop: '10px' }}>
                Try <span style={{ color: '#ff9900', fontWeight: 700 }}>TECHPRO10</span> (10% off on all hardware) or <span style={{ color: '#00f2fe', fontWeight: 700 }}>PRIME2026</span> (15% off over ₹1,00,000).
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Saved For Later Section */}
      <SavedForLater onNavigate={onNavigate} />
    </div>
  );
};
