import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { PriceDisplay } from '../common/PriceDisplay';
import { StarRating } from '../common/StarRating';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: Product[];
  onNavigate: (path: string) => void;
}

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ title, subtitle, products, onNavigate }) => {
  const { addToCart } = useCart();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -650 : 650;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (products.length === 0) return null;

  return (
    <div style={{ maxWidth: '1280px', margin: '3rem auto', padding: '0 1.5rem' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.2rem',
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>
            {title}
          </h2>
          {subtitle && <p style={{ fontSize: '0.85rem', color: '#8b949e', marginTop: '2px' }}>{subtitle}</p>}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => scroll('left')}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#161b22',
              border: '1px solid #30363d',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: '#161b22',
              border: '1px solid #30363d',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          gap: '1.2rem',
          overflowX: 'auto',
          scrollBehavior: 'smooth',
          paddingBottom: '16px',
        }}
      >
        {products.map((prod) => (
          <div
            key={prod.id}
            className="glass-panel card-hover"
            style={{
              flex: '0 0 280px',
              borderRadius: '12px',
              padding: '14px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                onClick={() => onNavigate(`/product/${prod.id}`)}
                style={{
                  width: '100%',
                  height: '180px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  marginBottom: '1rem',
                  backgroundColor: '#0d1117',
                }}
              >
                <img
                  src={prod.images[0]}
                  alt={prod.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </div>

              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#ff9900', textTransform: 'uppercase' }}>
                {prod.brand} • {prod.subCategory.split(' ')[0]}
              </span>

              <h3
                onClick={() => onNavigate(`/product/${prod.id}`)}
                style={{
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  color: '#f0f6fc',
                  cursor: 'pointer',
                  margin: '6px 0',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {prod.title}
              </h3>

              <StarRating rating={prod.rating} count={prod.reviewsCount} size={14} />

              <div style={{ marginTop: '8px' }}>
                <PriceDisplay price={prod.price} originalPrice={prod.originalPrice} size="md" />
              </div>
            </div>

            <button
              onClick={() => addToCart(prod)}
              className="btn-primary"
              style={{ width: '100%', marginTop: '14px', padding: '0.6rem', fontSize: '0.85rem' }}
            >
              <ShoppingBag size={16} />
              <span>Add to Cart</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
