import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatINR } from '../../utils/formatters';
import { ShoppingBag, Trash2, Bookmark } from 'lucide-react';

export const SavedForLater: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { savedItems, moveToCartFromSaved, removeSavedItem } = useCart();

  if (savedItems.length === 0) return null;

  return (
    <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.8rem', marginTop: '2.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid #30363d', paddingBottom: '12px', marginBottom: '1.4rem' }}>
        <Bookmark size={22} color="#00f2fe" />
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>
          Saved for Later ({savedItems.length} items)
        </h3>
      </div>

      <div className="grid-3" style={{ gap: '1.4rem' }}>
        {savedItems.map((item) => {
          const { savedId, product, selectedConfigs, unitPrice } = item;
          return (
            <div
              key={savedId}
              style={{
                backgroundColor: '#161b22',
                borderRadius: '12px',
                border: '1px solid #30363d',
                padding: '14px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div
                  onClick={() => onNavigate(`/product/${product.id}`)}
                  style={{
                    width: '100%',
                    height: '160px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundColor: '#0d1117',
                    cursor: 'pointer',
                    marginBottom: '1rem',
                  }}
                >
                  <img src={product.images[0]} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>

                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ff9900', textTransform: 'uppercase' }}>
                  {product.brand}
                </span>

                <h4
                  onClick={() => onNavigate(`/product/${product.id}`)}
                  style={{
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: '#fff',
                    cursor: 'pointer',
                    margin: '4px 0 8px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {product.title}
                </h4>

                {selectedConfigs && selectedConfigs.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '8px' }}>
                    {selectedConfigs.map((c) => (
                      <span key={c.id} style={{ fontSize: '0.72rem', backgroundColor: '#0d1117', padding: '2px 6px', borderRadius: '4px', color: '#8b949e' }}>
                        {c.label}
                      </span>
                    ))}
                  </div>
                )}

                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', fontFamily: "'JetBrains Mono', monospace" }}>
                  {formatINR(unitPrice)}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                <button
                  onClick={() => moveToCartFromSaved(savedId)}
                  className="btn-primary"
                  style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem' }}
                >
                  <ShoppingBag size={15} />
                  <span>Move to Cart</span>
                </button>
                <button
                  onClick={() => removeSavedItem(savedId)}
                  style={{
                    padding: '0.6rem 0.8rem',
                    backgroundColor: '#0d1117',
                    border: '1px solid #30363d',
                    color: '#da3633',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
