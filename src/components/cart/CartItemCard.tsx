import React from 'react';
import type { CartItem } from '../../types';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/formatters';
import { Trash2, Bookmark, Plus, Minus } from 'lucide-react';

interface CartItemCardProps {
  item: CartItem;
  onNavigate?: (path: string) => void;
  compact?: boolean;
}

export const CartItemCard: React.FC<CartItemCardProps> = ({ item, onNavigate, compact = false }) => {
  const { updateQuantity, removeFromCart, moveToSavedForLater } = useCart();
  const { product, quantity, selectedConfigs, unitPrice, cartItemId } = item;

  return (
    <div
      style={{
        display: 'flex',
        gap: compact ? '12px' : '18px',
        padding: compact ? '12px 0' : '18px 0',
        borderBottom: '1px solid rgba(48, 54, 61, 0.5)',
        alignItems: 'flex-start',
      }}
    >
      {/* Thumbnail */}
      <div
        onClick={() => onNavigate && onNavigate(`/product/${product.id}`)}
        style={{
          width: compact ? '70px' : '110px',
          height: compact ? '70px' : '110px',
          borderRadius: '8px',
          overflow: 'hidden',
          backgroundColor: '#0d1117',
          cursor: onNavigate ? 'pointer' : 'default',
          flexShrink: 0,
        }}
      >
        <img src={product.images[0]} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Details Area */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
          <h4
            onClick={() => onNavigate && onNavigate(`/product/${product.id}`)}
            style={{
              fontSize: compact ? '0.88rem' : '1.02rem',
              fontWeight: 700,
              color: '#fff',
              cursor: onNavigate ? 'pointer' : 'default',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.title}
          </h4>

          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <span
              style={{
                fontSize: compact ? '0.95rem' : '1.15rem',
                fontWeight: 800,
                color: '#fff',
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {formatINR(unitPrice * quantity)}
            </span>
            {quantity > 1 && (
              <div style={{ fontSize: '0.72rem', color: '#8b949e' }}>
                {formatINR(unitPrice)} ea
              </div>
            )}
          </div>
        </div>

        {/* Selected Configurations summary */}
        {selectedConfigs && selectedConfigs.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
            {selectedConfigs.map((c) => (
              <span
                key={c.id}
                style={{
                  fontSize: '0.72rem',
                  backgroundColor: '#161b22',
                  border: '1px solid #30363d',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  color: '#00f2fe',
                  fontWeight: 600,
                }}
              >
                {c.type}: {c.label}
              </span>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '6px', fontSize: '0.75rem', color: '#2ea043', fontWeight: 600 }}>
          <span>In Stock</span>
          {product.isPrime && <span style={{ color: '#00f2fe' }}>• ⚡ Prime Tech Delivery</span>}
        </div>

        {/* Actions & Quantity Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: compact ? '10px' : '16px', marginTop: compact ? '10px' : '14px', flexWrap: 'wrap' }}>
          {/* Qty Counter */}
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#161b22', border: '1px solid #30363d', borderRadius: '6px' }}>
            <button
              onClick={() => updateQuantity(cartItemId, quantity - 1)}
              style={{ padding: compact ? '4px 8px' : '6px 10px', color: '#c9d1d9', cursor: 'pointer' }}
            >
              <Minus size={14} />
            </button>
            <span style={{ padding: '0 8px', fontWeight: 700, fontSize: compact ? '0.85rem' : '0.92rem', color: '#fff' }}>
              {quantity}
            </span>
            <button
              onClick={() => updateQuantity(cartItemId, quantity + 1)}
              style={{ padding: compact ? '4px 8px' : '6px 10px', color: '#c9d1d9', cursor: 'pointer' }}
            >
              <Plus size={14} />
            </button>
          </div>

          <span style={{ color: '#30363d' }}>|</span>

          {/* Delete Button */}
          <button
            onClick={() => removeFromCart(cartItemId)}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#da3633', cursor: 'pointer', fontWeight: 600 }}
          >
            <Trash2 size={14} />
            <span>Delete</span>
          </button>

          {!compact && (
            <>
              <span style={{ color: '#30363d' }}>|</span>
              {/* Save for Later */}
              <button
                onClick={() => moveToSavedForLater(cartItemId)}
                style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: '#00f2fe', cursor: 'pointer', fontWeight: 600 }}
              >
                <Bookmark size={14} />
                <span>Save for Later</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
