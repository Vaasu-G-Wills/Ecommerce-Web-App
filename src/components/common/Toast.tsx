import React from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle, Info, AlertTriangle, XCircle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts } = useCart();

  if (toasts.length === 0) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle size={18} color="#2ea043" />;
      case 'warning':
        return <AlertTriangle size={18} color="#ff9900" />;
      case 'error':
        return <XCircle size={18} color="#da3633" />;
      default:
        return <Info size={18} color="#00f2fe" />;
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'success':
        return '#2ea043';
      case 'warning':
        return '#ff9900';
      case 'error':
        return '#da3633';
      default:
        return '#00f2fe';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: '380px',
        width: 'calc(100% - 48px)',
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-fade-in glass-panel"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '14px 18px',
            borderRadius: '10px',
            borderLeft: `4px solid ${getBorderColor(toast.type)}`,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)',
          }}
        >
          {getIcon(toast.type)}
          <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#f0f6fc', flex: 1 }}>
            {toast.message}
          </span>
        </div>
      ))}
    </div>
  );
};
