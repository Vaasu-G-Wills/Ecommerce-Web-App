import React, { useState, useMemo } from 'react';
import { useAdmin } from '../context/AdminContext';
import type { ConfigOption } from '../types';
import { ImageGallery } from '../components/product/ImageGallery';
import { ConfigSelector } from '../components/product/ConfigSelector';
import { BuyBox } from '../components/product/BuyBox';
import { SpecsTable } from '../components/product/SpecsTable';
import { ReviewsAndQnA } from '../components/product/ReviewsAndQnA';
import { StarRating } from '../components/common/StarRating';
import { Badge } from '../components/common/Badge';
import { ProductCarousel } from '../components/home/ProductCarousel';
import { formatINR } from '../utils/formatters';
import { useCart } from '../context/CartContext';
import { ChevronRight } from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (path: string, queryParams?: Record<string, string>) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId, onNavigate }) => {
  const { addToCart } = useCart();
  const { products } = useAdmin();
  const product = products.find((p) => p.id === productId);

  const [selectedConfigs, setSelectedConfigs] = useState<ConfigOption[]>(() => {
    if (!product || !product.configurations) return [];
    return product.configurations.filter((c) => c.isDefault);
  });

  const handleSelectConfig = (config: ConfigOption) => {
    setSelectedConfigs((prev) => {
      const next = prev.filter((c) => c.type !== config.type);
      return [...next, config];
    });
  };

  const dynamicUnitPrice = useMemo(() => {
    if (!product) return 0;
    const deltas = selectedConfigs.reduce((acc, c) => acc + (c.priceDelta || 0), 0);
    return product.price + deltas;
  }, [product, selectedConfigs]);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '5rem 1.5rem', color: '#fff' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Product not found</h2>
        <p style={{ color: '#8b949e', marginTop: '1rem' }}>The hardware model or item ID does not exist in our catalog.</p>
        <button onClick={() => onNavigate('/')} className="btn-primary" style={{ marginTop: '1.5rem', padding: '0.8rem 2rem' }}>
          Return to Storefront
        </button>
      </div>
    );
  }

  // Frequently Bought Together Bundle calculation
  const relatedBundleProduct = products.find((p) => p.id !== product.id && p.category === product.category) || products[0];
  const bundleTotal = dynamicUnitPrice + relatedBundleProduct.price;

  const handleAddBundleToCart = () => {
    addToCart(product, 1, selectedConfigs);
    addToCart(relatedBundleProduct, 1);
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '2rem auto', padding: '0 1.5rem' }}>
      {/* Breadcrumb Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#8b949e', marginBottom: '1.5rem' }}>
        <span onClick={() => onNavigate('/')} style={{ cursor: 'pointer', color: '#c9d1d9' }}>Home</span>
        <ChevronRight size={14} />
        <span onClick={() => onNavigate('/search', { category: product.category })} style={{ cursor: 'pointer', color: '#c9d1d9' }}>
          {product.category.toUpperCase()}
        </span>
        <ChevronRight size={14} />
        <span style={{ color: '#ff9900', fontWeight: 600 }}>{product.brand}</span>
      </div>

      {/* Main 3-Column Layout: Gallery | Info & Configs | BuyBox */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(380px, 1fr) minmax(400px, 1.2fr) minmax(320px, 360px)', gap: '2.5rem', alignItems: 'flex-start' }}>
        {/* Column 1: Image Gallery */}
        <ImageGallery images={product.images} title={product.title} />

        {/* Column 2: Details & Config Picker */}
        <div>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
            {product.isAmazonChoice && <Badge variant="amazon-choice" />}
            {product.isBestSeller && <Badge variant="best-seller" />}
            <span
              onClick={() => onNavigate('/search', { q: product.brand })}
              style={{ fontSize: '0.88rem', fontWeight: 700, color: '#00f2fe', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Visit the {product.brand} Official Store
            </span>
          </div>

          <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#fff', lineHeight: 1.35, marginBottom: '12px' }}>
            {product.title}
          </h1>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #30363d', paddingBottom: '14px', marginBottom: '14px' }}>
            <StarRating rating={product.rating} count={product.reviewsCount} size={18} interactive={false} />
            <span style={{ color: '#30363d' }}>|</span>
            <span style={{ fontSize: '0.85rem', color: '#2ea043', fontWeight: 700 }}>1000+ bought in past month across India</span>
          </div>

          {/* Configuration Selector */}
          <ConfigSelector
            configurations={product.configurations || []}
            selectedConfigs={selectedConfigs}
            onSelectConfig={handleSelectConfig}
          />

          <div style={{ height: '1px', backgroundColor: '#30363d', margin: '16px 0' }} />

          {/* Key Bullet Points */}
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#fff', marginBottom: '12px' }}>About this hardware item:</h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '1.4rem', display: 'flex', flexDirection: 'column', gap: '8px', color: '#c9d1d9', fontSize: '0.92rem', lineHeight: 1.5 }}>
              {product.bulletPoints.map((bullet, idx) => (
                <li key={idx}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Column 3: BuyBox */}
        <BuyBox
          product={product}
          selectedConfigs={selectedConfigs}
          unitPrice={dynamicUnitPrice}
          onNavigate={onNavigate}
        />
      </div>

      {/* Frequently Bought Together Bundle Box */}
      <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.8rem', marginTop: '3.5rem', border: '1px solid #30363d' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '1.2rem' }}>
          Frequently bought together
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img src={product.images[0]} alt="" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #ff9900' }} />
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#8b949e' }}>+</span>
            <img
              src={relatedBundleProduct.images[0]}
              alt=""
              onClick={() => onNavigate(`/product/${relatedBundleProduct.id}`)}
              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #30363d', cursor: 'pointer' }}
            />
          </div>

          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ fontSize: '0.92rem', color: '#c9d1d9', lineHeight: 1.4 }}>
              <span style={{ color: '#fff', fontWeight: 700 }}>This item: </span> {product.title} +{' '}
              <span onClick={() => onNavigate(`/product/${relatedBundleProduct.id}`)} style={{ color: '#00f2fe', cursor: 'pointer', fontWeight: 600 }}>
                {relatedBundleProduct.title}
              </span>
            </div>
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', fontFamily: 'monospace' }}>
                Total Bundle: {formatINR(bundleTotal)}
              </span>
              <button onClick={handleAddBundleToCart} className="btn-primary" style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}>
                Add both to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Technical Specifications */}
      <SpecsTable product={product} />

      {/* Reviews and Q&A */}
      <ReviewsAndQnA product={product} />

      {/* Related Products Carousel */}
      <ProductCarousel
        title={`More high-performance gear from ${product.brand}`}
        products={products.filter((p) => p.brand === product.brand && p.id !== product.id)}
        onNavigate={onNavigate}
      />
    </div>
  );
};
