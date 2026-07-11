import React from 'react';
import { Zap, Award, TrendingUp, CheckCircle2 } from 'lucide-react';

export type BadgeVariant = 'amazon-choice' | 'best-seller' | 'lightning-deal' | 'prime' | 'in-stock' | 'custom';

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant, label, className = '' }) => {
  const getBadgeContent = () => {
    switch (variant) {
      case 'amazon-choice':
        return {
          text: label || "Amazon's Choice",
          bg: '#232f3e',
          color: '#ff9900',
          border: '1px solid #ff9900',
          icon: <Award size={13} color="#ff9900" />,
        };
      case 'best-seller':
        return {
          text: label || '#1 Best Seller',
          bg: '#ff9900',
          color: '#0d1117',
          border: 'none',
          icon: <TrendingUp size={13} color="#0d1117" />,
        };
      case 'lightning-deal':
        return {
          text: label || 'Lightning Deal',
          bg: '#da3633',
          color: '#ffffff',
          border: 'none',
          icon: <Zap size={13} color="#ffffff" className="badge-pulse" />,
        };
      case 'prime':
        return {
          text: label || 'prime tech',
          bg: 'transparent',
          color: '#00f2fe',
          border: '1px solid #00f2fe',
          icon: null,
        };
      case 'in-stock':
        return {
          text: label || 'In Stock',
          bg: 'rgba(35, 134, 54, 0.2)',
          color: '#2ea043',
          border: '1px solid #238636',
          icon: <CheckCircle2 size={13} color="#2ea043" />,
        };
      default:
        return {
          text: label || 'Badge',
          bg: '#21262d',
          color: '#f0f6fc',
          border: '1px solid #30363d',
          icon: null,
        };
    }
  };

  const styleInfo = getBadgeContent();

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        padding: '3px 8px',
        borderRadius: '4px',
        fontSize: '0.75rem',
        fontWeight: 700,
        textTransform: variant === 'prime' ? 'lowercase' : 'none',
        letterSpacing: variant === 'prime' ? '0.5px' : 'normal',
        backgroundColor: styleInfo.bg,
        color: styleInfo.color,
        border: styleInfo.border,
        boxShadow: variant === 'lightning-deal' ? '0 0 10px rgba(218, 54, 51, 0.4)' : 'none',
      }}
    >
      {styleInfo.icon}
      <span>{styleInfo.text}</span>
    </span>
  );
};
