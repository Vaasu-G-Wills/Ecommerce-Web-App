import React from 'react';
import { calculateDiscount, formatINR } from '../../utils/formatters';

interface PriceDisplayProps {
  price: number; // in INR (₹)
  originalPrice?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showDiscountBadge?: boolean;
  inline?: boolean;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  price,
  originalPrice,
  size = 'md',
  showDiscountBadge = true,
  inline = false,
}) => {
  const discount = originalPrice ? calculateDiscount(originalPrice, price) : 0;

  const getFontSize = () => {
    switch (size) {
      case 'sm':
        return { price: '1rem', orig: '0.8rem', badge: '0.7rem' };
      case 'md':
        return { price: '1.25rem', orig: '0.9rem', badge: '0.75rem' };
      case 'lg':
        return { price: '1.65rem', orig: '1.05rem', badge: '0.85rem' };
      case 'xl':
        return { price: '2.25rem', orig: '1.25rem', badge: '0.95rem' };
      default:
        return { price: '1.25rem', orig: '0.9rem', badge: '0.75rem' };
    }
  };

  const fonts = getFontSize();

  return (
    <div
      style={{
        display: inline ? 'inline-flex' : 'flex',
        alignItems: 'baseline',
        gap: '8px',
        flexWrap: 'wrap',
      }}
    >
      {/* Discount Badge */}
      {showDiscountBadge && discount > 0 && (
        <span
          style={{
            fontSize: fonts.badge,
            fontWeight: 800,
            color: '#da3633',
            backgroundColor: 'rgba(218, 54, 51, 0.15)',
            padding: '2px 6px',
            borderRadius: '4px',
            letterSpacing: '-0.3px',
          }}
        >
          -{discount}%
        </span>
      )}

      {/* Main Indian Price */}
      <span
        style={{
          fontSize: fonts.price,
          fontWeight: 800,
          fontFamily: "'JetBrains Mono', 'Outfit', monospace",
          color: '#f0f6fc',
        }}
      >
        {formatINR(price)}
      </span>

      {/* Strike-through Original Price */}
      {originalPrice && originalPrice > price && (
        <span
          style={{
            fontSize: fonts.orig,
            textDecoration: 'line-through',
            color: '#8b949e',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          {formatINR(originalPrice)}
        </span>
      )}
    </div>
  );
};
