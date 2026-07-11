import React, { useState } from 'react';
import { useOrder } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { PackageTrackerModal } from '../components/orders/PackageTrackerModal';
import { formatINR } from '../utils/formatters';
import type { Order } from '../types';
import { Package, Truck, RotateCcw, ChevronRight, FileText } from 'lucide-react';

export const OrdersPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { orders } = useOrder();
  const { addToCart } = useCart();

  const [trackingOrder, setTrackingOrder] = useState<Order | null>(null);

  const handleBuyAgain = (order: Order) => {
    order.items.forEach((item) => {
      addToCart(item.product, item.quantity, item.selectedConfigs);
    });
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '2rem auto', padding: '0 1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#8b949e', marginBottom: '1.2rem' }}>
        <span onClick={() => onNavigate('/account')} style={{ cursor: 'pointer', color: '#c9d1d9' }}>Your Account</span>
        <ChevronRight size={14} />
        <span style={{ color: '#ff9900', fontWeight: 600 }}>Your Orders & Live Tracking</span>
      </div>

      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '1.8rem', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Package size={28} color="#ff9900" />
        <span>Your Indian Orders ({orders.length})</span>
      </h1>

      {orders.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4.5rem 2rem', borderRadius: '16px' }}>
          <Package size={48} style={{ margin: '0 auto 14px', opacity: 0.3 }} />
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>No Orders Placed Yet</h2>
          <p style={{ color: '#8b949e', marginTop: '8px' }}>Once you checkout with PC hardware or laptops, your live drone tracking will appear here.</p>
          <button onClick={() => onNavigate('/')} className="btn-primary" style={{ marginTop: '1.5rem', padding: '0.8rem 2rem' }}>
            Start Shopping Hardware
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
          {orders.map((order) => {
            const isDelivered = order.currentStatus === 'Delivered';

            return (
              <div
                key={order.id}
                className="glass-panel"
                style={{
                  borderRadius: '16px',
                  border: '1px solid #30363d',
                  overflow: 'hidden',
                }}
              >
                {/* Top Banner Box */}
                <div
                  style={{
                    backgroundColor: '#232f3e',
                    padding: '14px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    borderBottom: '1px solid #30363d',
                    fontSize: '0.86rem',
                  }}
                >
                  <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                    <div>
                      <span style={{ color: '#8b949e', display: 'block', fontSize: '0.75rem' }}>ORDER PLACED</span>
                      <span style={{ fontWeight: 700, color: '#fff' }}>{order.date}</span>
                    </div>

                    <div>
                      <span style={{ color: '#8b949e', display: 'block', fontSize: '0.75rem' }}>TOTAL AMOUNT</span>
                      <span style={{ fontWeight: 800, color: '#ff9900', fontFamily: 'monospace' }}>
                        {formatINR(order.totalAmount)}
                      </span>
                    </div>

                    <div>
                      <span style={{ color: '#8b949e', display: 'block', fontSize: '0.75rem' }}>SHIP TO</span>
                      <span style={{ fontWeight: 700, color: '#00f2fe' }}>{order.shippingAddress.fullName} ({order.shippingAddress.city})</span>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ color: '#8b949e', display: 'block', fontSize: '0.75rem' }}>ORDER NUMBER</span>
                    <span style={{ fontWeight: 700, color: '#fff', fontFamily: 'monospace' }}>{order.orderNumber}</span>
                  </div>
                </div>

                {/* Status & Action Buttons Bar */}
                <div
                  style={{
                    padding: '16px 20px',
                    backgroundColor: '#161b22',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    borderBottom: '1px solid rgba(48, 54, 61, 0.4)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Truck size={22} color={isDelivered ? '#2ea043' : '#ff9900'} className={!isDelivered ? 'badge-pulse' : ''} />
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '1.05rem', color: isDelivered ? '#2ea043' : '#ff9900' }}>
                        {order.currentStatus}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#c9d1d9' }}>
                        {isDelivered ? 'Delivered with Indian Doorstep OTP' : `Estimated Delivery: ${order.estimatedDeliveryDate}`}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button
                      onClick={() => setTrackingOrder(order)}
                      className="btn-primary"
                      style={{ padding: '0.65rem 1.2rem', fontSize: '0.88rem', gap: '6px' }}
                    >
                      <Truck size={16} />
                      <span>Track Package / Simulate Status</span>
                    </button>

                    <button
                      onClick={() => handleBuyAgain(order)}
                      className="btn-secondary"
                      style={{ padding: '0.65rem 1.2rem', fontSize: '0.88rem', gap: '6px' }}
                    >
                      <RotateCcw size={16} />
                      <span>Buy Again</span>
                    </button>

                    <button
                      onClick={() => alert(`Simulated Invoice generation for ${order.orderNumber} with GST breakup downloaded!`)}
                      style={{
                        padding: '0.65rem 1rem',
                        backgroundColor: '#0d1117',
                        border: '1px solid #30363d',
                        color: '#c9d1d9',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                      }}
                    >
                      <FileText size={16} />
                      <span>Invoice</span>
                    </button>
                  </div>
                </div>

                {/* Items in Order */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div
                        onClick={() => onNavigate(`/product/${item.product.id}`)}
                        style={{ width: '80px', height: '80px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#0d1117', cursor: 'pointer', flexShrink: 0 }}
                      >
                        <img src={item.product.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>

                      <div style={{ flex: 1, minWidth: '240px' }}>
                        <h4
                          onClick={() => onNavigate(`/product/${item.product.id}`)}
                          style={{ fontWeight: 700, color: '#fff', cursor: 'pointer', fontSize: '0.98rem' }}
                        >
                          {item.product.title}
                        </h4>

                        {item.selectedConfigs && item.selectedConfigs.length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '4px' }}>
                            {item.selectedConfigs.map((c) => (
                              <span key={c.id} style={{ fontSize: '0.72rem', backgroundColor: '#0d1117', padding: '2px 6px', borderRadius: '4px', color: '#8b949e' }}>
                                {c.label}
                              </span>
                            ))}
                          </div>
                        )}

                        <div style={{ fontSize: '0.85rem', color: '#ff9900', fontWeight: 700, marginTop: '6px', fontFamily: 'monospace' }}>
                          {formatINR(item.unitPrice)} × {item.quantity}
                        </div>
                      </div>

                      <button
                        onClick={() => onNavigate(`/product/${item.product.id}`)}
                        className="btn-secondary"
                        style={{ padding: '0.6rem 1rem', fontSize: '0.85rem' }}
                      >
                        Write a product review
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Package Tracker Modal */}
      {trackingOrder && <PackageTrackerModal order={trackingOrder} onClose={() => setTrackingOrder(null)} />}
    </div>
  );
};
