import React from 'react';
import type { Product } from '../../types';

export const SpecsTable: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.8rem', marginTop: '2.5rem' }}>
      <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '1.4rem', borderBottom: '1px solid #30363d', paddingBottom: '12px' }}>
        Technical Specifications ({product.brand})
      </h3>

      <div className="grid-2" style={{ gap: '1px', backgroundColor: '#30363d', borderRadius: '8px', overflow: 'hidden', border: '1px solid #30363d' }}>
        {product.specs.map((spec, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              backgroundColor: '#161b22',
              padding: '12px 16px',
            }}
          >
            <span style={{ width: '45%', fontSize: '0.86rem', color: '#8b949e', fontWeight: 600 }}>{spec.label}</span>
            <span style={{ width: '55%', fontSize: '0.88rem', color: '#f0f6fc', fontWeight: 700 }}>{spec.value}</span>
          </div>
        ))}
        {/* Additional BIS India standard rows */}
        <div style={{ display: 'flex', backgroundColor: '#161b22', padding: '12px 16px' }}>
          <span style={{ width: '45%', fontSize: '0.86rem', color: '#8b949e', fontWeight: 600 }}>Country of Origin</span>
          <span style={{ width: '55%', fontSize: '0.88rem', color: '#f0f6fc', fontWeight: 700 }}>India / Taiwan / Vietnam</span>
        </div>
        <div style={{ display: 'flex', backgroundColor: '#161b22', padding: '12px 16px' }}>
          <span style={{ width: '45%', fontSize: '0.86rem', color: '#8b949e', fontWeight: 600 }}>Indian BIS Safety Certification</span>
          <span style={{ width: '55%', fontSize: '0.88rem', color: '#2ea043', fontWeight: 700 }}>✓ Compliant (IS 13252:2010)</span>
        </div>
      </div>
    </div>
  );
};
