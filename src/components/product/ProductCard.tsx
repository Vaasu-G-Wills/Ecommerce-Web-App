import React from 'react';
import { ShoppingBag, Heart, Check } from 'lucide-react';
import type { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { PriceDisplay } from '../common/PriceDisplay';
import { StarRating } from '../common/StarRating';
import { Badge } from '../common/Badge';

interface ProductCardProps {
  product: Product;
  onNavigate: (path: string) => void;
  viewMode?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate, viewMode = 'grid' }) => {
  const { addToCart } = useCart();
  const { isProductInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const inWishlist = isProductInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  if (viewMode === 'list') {
    return (
      <div
        onClick={() => onNavigate(`/product/${product.id}`)}
        className="glass-panel card-hover"
        style={{
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          gap: '1.5rem',
          cursor: 'pointer',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {/* Left Image Box */}
        <div
          style={{
            position: 'relative',
            width: '210px',
            height: '160px',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#0d1117',
            flexShrink: 0,
          }}
        >
          <img
            src={product.images[0]}
            alt={product.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <button
            onClick={toggleWishlist}
            style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              padding: '6px',
              borderRadius: '50%',
              backgroundColor: 'rgba(13, 17, 23, 0.75)',
              color: inWishlist ? '#da3633' : '#c9d1d9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Heart size={16} fill={inWishlist ? '#da3633' : 'none'} />
          </button>
        </div>

        {/* Center Details */}
        <div style={{ flex: 1, minWidth: '260px' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
            {product.isAmazonChoice && <Badge variant="amazon-choice" />}
            {product.isBestSeller && <Badge variant="best-seller" />}
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ff9900', textTransform: 'uppercase' }}>
              {product.brand}
            </span>
          </div>

          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#fff', lineHeight: 1.4, marginBottom: '6px' }}>
            {product.title}
          </h3>

          <StarRating rating={product.rating} count={product.reviewsCount} />

          <p style={{ fontSize: '0.82rem', color: '#8b949e', marginTop: '8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {product.shortDescription}
          </p>
        </div>

        {/* Right Price & Buy Column */}
        <div
          style={{
            minWidth: '200px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            borderLeft: '1px solid #30363d',
            paddingLeft: '1.5rem',
          }}
        >
          <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="lg" />

          {product.isPrime && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <Badge variant="prime" />
              <span style={{ fontSize: '0.75rem', color: '#c9d1d9' }}>FREE One-Day Delivery tomorrow by 9 PM</span>
            </div>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#2ea043', fontWeight: 700 }}>
            <Check size={14} />
            <span>In Stock ({product.stockCount} left)</span>
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-primary"
            style={{ width: '100%', padding: '0.65rem 1rem', fontSize: '0.88rem' }}
          >
            <ShoppingBag size={16} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    );
  }

  // Grid Mode (Default)
  return (
    <div
      onClick={() => onNavigate(`/product/${product.id}`)}
      className="glass-panel card-hover"
      style={{
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: 'pointer',
        height: '100%',
      }}
    >
      <div>
        {/* Thumbnail Box */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '210px',
            borderRadius: '8px',
            overflow: 'hidden',
            backgroundColor: '#0d1117',
            marginBottom: '1rem',
          }}
        >
          <img
            src={product.images[0]}
            alt={product.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.06)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          />
          <button
            onClick={toggleWishlist}
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              padding: '8px',
              borderRadius: '50%',
              backgroundColor: 'rgba(13, 17, 23, 0.85)',
              color: inWishlist ? '#da3633' : '#c9d1d9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
            }}
          >
            <Heart size={18} fill={inWishlist ? '#da3633' : 'none'} />
          </button>

          <div style={{ position: 'absolute', bottom: '8px', left: '8px', display: 'flex', gap: '4px' }}>
            {product.isAmazonChoice && <Badge variant="amazon-choice" />}
            {product.isBestSeller && <Badge variant="best-seller" />}
          </div>
        </div>

        {/* Brand & Category */}
        <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#ff9900', textTransform: 'uppercase' }}>
          {product.brand} • {product.subCategory.split(' ')[0]}
        </span>

        {/* Title */}
        <h3
          style={{
            fontSize: '0.98rem',
            fontWeight: 700,
            color: '#f0f6fc',
            lineHeight: 1.4,
            margin: '6px 0',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            height: '2.8rem',
          }}
        >
          {product.title}
        </h3>

        {/* Rating */}
        <StarRating rating={product.rating} count={product.reviewsCount} size={15} />

        {/* Indian Price */}
        <div style={{ marginTop: '10px' }}>
          <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="lg" />
        </div>
      </div>

      {/* Bottom section: Delivery / Stock / Action Button */}
      <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(48, 54, 61, 0.4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          {product.isPrime ? (
            <Badge variant="prime" />
          ) : (
            <span style={{ fontSize: '0.75rem', color: '#8b949e' }}>Standard Delivery</span>
          )}
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#2ea043' }}>In Stock</span>
        </div>

        <button
          onClick={handleAddToCart}
          className="btn-primary"
          style={{ width: '100%', padding: '0.65rem', fontSize: '0.88rem' }}
        >
          <ShoppingBag size={16} />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};
