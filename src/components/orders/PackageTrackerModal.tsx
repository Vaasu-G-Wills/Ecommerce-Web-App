import React from 'react';
import type { Order } from '../../types';
import { useOrder } from '../../context/OrderContext';
import { formatINR } from '../../utils/formatters';
import { X, Package, Truck, CheckCircle2, Zap, MapPin } from 'lucide-react';

interface PackageTrackerModalProps {
  order: Order;
  onClose: () => void;
}

export const PackageTrackerModal: React.FC<PackageTrackerModalProps> = ({ order, onClose }) => {
  const { simulateNextStatus } = useOrder();

  const isDelivered = order.currentStatus === 'Delivered';

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 4000, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)', padding: '1rem' }}>
      <div
        className="glass-panel animate-fade-in"
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '16px',
          padding: '24px',
          boxShadow: '0 24px 64px rgba(0,0,0,0.85)',
          border: '1px solid #30363d',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #30363d', paddingBottom: '16px', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Package size={24} color="#ff9900" />
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>Live Indian Package Journey</h2>
            </div>
            <div style={{ fontSize: '0.85rem', color: '#8b949e', marginTop: '4px' }}>
              Order #{order.orderNumber} • Placed on {order.date}
            </div>
          </div>
          <button onClick={onClose} style={{ color: '#8b949e', padding: '4px' }}>
            <X size={24} />
          </button>
        </div>

        {/* Current Status Banner */}
        <div
          style={{
            backgroundColor: isDelivered ? 'rgba(46, 160, 67, 0.15)' : 'rgba(255, 153, 0, 0.15)',
            border: `1px solid ${isDelivered ? '#238636' : '#ff9900'}`,
            borderRadius: '12px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '2rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isDelivered ? <CheckCircle2 size={28} color="#2ea043" /> : <Truck size={28} color="#ff9900" className="badge-pulse" />}
            <div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: isDelivered ? '#2ea043' : '#ff9900' }}>
                Status: {order.currentStatus}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#fff' }}>
                {isDelivered ? 'Delivered securely with OTP verification.' : `Estimated Arrival: ${order.estimatedDeliveryDate}`}
              </div>
            </div>
          </div>

          {!isDelivered && (
            <button
              onClick={() => simulateNextStatus(order.id)}
              style={{
                backgroundColor: '#ff9900',
                color: '#0d1117',
                fontWeight: 800,
                padding: '10px 16px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(255, 153, 0, 0.4)',
              }}
            >
              <Zap size={16} fill="#0d1117" />
              <span>Simulate Next Status</span>
            </button>
          )}
        </div>

        {/* Timeline Journey */}
        <div style={{ position: 'relative', paddingLeft: '28px', display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '2rem' }}>
          {/* Vertical Connecting Line */}
          <div style={{ position: 'absolute', top: '10px', bottom: '10px', left: '11px', width: '3px', backgroundColor: '#30363d', zIndex: 1 }} />

          {order.timeline.map((evt, idx) => (
            <div key={idx} style={{ position: 'relative', zIndex: 2, display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              {/* Timeline Dot */}
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: evt.completed ? '#2ea043' : '#161b22',
                  border: `3px solid ${evt.completed ? '#2ea043' : '#30363d'}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  flexShrink: 0,
                  marginLeft: '-28px',
                  boxShadow: evt.completed ? '0 0 10px rgba(46, 160, 67, 0.6)' : 'none',
                }}
              >
                {evt.completed && <CheckCircle2 size={14} color="#0d1117" strokeWidth={3} />}
              </div>

              {/* Event Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                  <span style={{ fontSize: '1.02rem', fontWeight: 800, color: evt.completed ? '#fff' : '#8b949e' }}>
                    {evt.status}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: evt.completed ? '#00f2fe' : '#8b949e', fontWeight: 600 }}>
                    {evt.timestamp}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#c9d1d9', marginTop: '4px' }}>
                  <MapPin size={14} color="#ff9900" />
                  <span>{evt.location}</span>
                </div>

                <p style={{ fontSize: '0.85rem', color: '#8b949e', marginTop: '4px', lineHeight: 1.4 }}>
                  {evt.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Shipping Address & Order Items Summary */}
        <div style={{ borderTop: '1px solid #30363d', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '0.88rem', color: '#c9d1d9' }}>
            <span style={{ color: '#fff', fontWeight: 700 }}>Shipping Destination:</span> {order.shippingAddress.fullName} — {order.shippingAddress.street}, {order.shippingAddress.city} - {order.shippingAddress.pinCode}
          </div>

          <div style={{ fontSize: '0.88rem', color: '#c9d1d9' }}>
            <span style={{ color: '#fff', fontWeight: 700 }}>Payment Method:</span> {order.paymentMethod} (Total: <span style={{ color: '#ff9900', fontWeight: 800 }}>{formatINR(order.totalAmount)}</span>)
          </div>
        </div>
      </div>
    </div>
  );
};
