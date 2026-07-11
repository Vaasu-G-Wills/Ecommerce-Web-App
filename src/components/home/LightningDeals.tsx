import React, { useState, useEffect } from 'react';
import { Zap, Clock, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { PriceDisplay } from '../common/PriceDisplay';
import { StarRating } from '../common/StarRating';

export const LightningDeals: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { addToCart } = useCart();
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 12, seconds: 38 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 15, seconds: 0 }; // reset loop
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = PRODUCTS.filter((p) => p.isLightningDeal);

  if (dealProducts.length === 0) return null;

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <div
      className="glass-panel"
      style={{
        borderRadius: '16px',
        padding: '1.8rem 1.5rem',
        margin: '2.5rem auto',
        maxWidth: '1280px',
        border: '1px solid rgba(218, 54, 51, 0.4)',
        boxShadow: '0 0 30px rgba(218, 54, 51, 0.15)',
      }}
    >
      {/* Header with Live Countdown Timer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.8rem',
          borderBottom: '1px solid #30363d',
          paddingBottom: '1rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              backgroundColor: '#da3633',
              padding: '8px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Zap size={22} color="#fff" className="badge-pulse" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>
              Lightning Tech Deals
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#8b949e' }}>
              Exclusive limited-time Indian discounts on computer systems and monitors.
            </p>
          </div>
        </div>

        {/* Live Countdown Box */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(218, 54, 51, 0.15)', border: '1px solid #da3633', padding: '8px 14px', borderRadius: '8px' }}>
          <Clock size={18} color="#da3633" />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>Ends in:</span>
          <div style={{ display: 'flex', gap: '4px', fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: '#da3633', fontSize: '1rem' }}>
            <span>{formatTime(timeLeft.hours)}</span>
            <span>:</span>
            <span>{formatTime(timeLeft.minutes)}</span>
            <span>:</span>
            <span>{formatTime(timeLeft.seconds)}</span>
          </div>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="grid-3" style={{ gap: '1.5rem' }}>
        {dealProducts.map((prod) => {
          const claimed = prod.lightningDealClaimedPercentage || 75;
          return (
            <div
              key={prod.id}
              className="card-hover"
              style={{
                backgroundColor: '#161b22',
                borderRadius: '12px',
                border: '1px solid #30363d',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                {/* Image & Quick View Link */}
                <div
                  onClick={() => onNavigate(`/product/${prod.id}`)}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '210px',
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
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '8px',
                      backgroundColor: '#da3633',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '3px 8px',
                      borderRadius: '4px',
                    }}
                  >
                    LIGHTNING DEAL
                  </div>
                </div>

                {/* Title */}
                <h3
                  onClick={() => onNavigate(`/product/${prod.id}`)}
                  style={{
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: '#f0f6fc',
                    cursor: 'pointer',
                    marginBottom: '6px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {prod.title}
                </h3>

                <StarRating rating={prod.rating} count={prod.reviewsCount} />

                <div style={{ marginTop: '10px' }}>
                  <PriceDisplay price={prod.price} originalPrice={prod.originalPrice} size="lg" />
                </div>
              </div>

              {/* Progress Bar & Quick Add */}
              <div style={{ marginTop: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px', color: '#c9d1d9' }}>
                  <span>{claimed}% Claimed</span>
                  <span style={{ color: '#ff9900' }}>Only {prod.stockCount} left</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#30363d', borderRadius: '99px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${claimed}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #ff9900 0%, #da3633 100%)',
                      borderRadius: '99px',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                  <button
                    onClick={() => addToCart(prod)}
                    className="btn-primary"
                    style={{ flex: 1, padding: '0.6rem 1rem', fontSize: '0.88rem' }}
                  >
                    <ShoppingBag size={16} />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={() => onNavigate(`/product/${prod.id}`)}
                    className="btn-secondary"
                    style={{ padding: '0.6rem 1rem', fontSize: '0.88rem' }}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
