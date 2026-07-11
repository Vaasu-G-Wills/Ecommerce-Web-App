import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { MessageSquare, Star, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';

export const AdminReviewsPage: React.FC = () => {
  const { products } = useAdmin();
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [replyText, setReplyText] = useState<{ [key: string]: string }>({});

  const selectedProduct = products.find((p) => p.id === selectedProductId) || products[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#161b22', padding: '1.4rem', borderRadius: '12px', border: '1px solid #30363d' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MessageSquare size={26} color="#a371f7" />
            <span>Community Reviews & Q&A Moderation Suite</span>
          </h1>
          <p style={{ color: '#8b949e', margin: '4px 0 0', fontSize: '0.88rem' }}>
            Verify customer feedback across all hardware SKUs and post official replies with the verified `PrimeTech India Support 🛡️` badge.
          </p>
        </div>
      </div>

      {/* Product Selector Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#161b22', padding: '12px', borderRadius: '8px', border: '1px solid #30363d' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c9d1d9' }}>Select Hardware SKU:</span>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          style={{ flex: 1, padding: '10px 14px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px', fontWeight: 700 }}
        >
          {products.map((p) => (
            <option key={p.id} value={p.id}>
              {p.title.slice(0, 80)}... ({p.brand}) • ★ {p.rating}
            </option>
          ))}
        </select>
      </div>

      {selectedProduct && (
        <div className="grid-2" style={{ gap: '1.5rem', alignItems: 'flex-start' }}>
          {/* Left: Customer Reviews Feed */}
          <div className="glass-panel" style={{ padding: '1.6rem', borderRadius: '12px', border: '1px solid #30363d', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #30363d', paddingBottom: '12px' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Star size={18} color="#ff9900" fill="#ff9900" />
                <span>Customer Ratings ({selectedProduct.reviewsCount} Total)</span>
              </div>
              <span style={{ backgroundColor: 'rgba(255, 153, 0, 0.15)', color: '#ff9900', padding: '4px 8px', borderRadius: '4px', fontWeight: 800, fontSize: '0.8rem' }}>
                Average ★ {selectedProduct.rating}
              </span>
            </div>

            {/* Simulated Review Cards for the Selected Product */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ backgroundColor: '#0d1117', padding: '14px', borderRadius: '8px', border: '1px solid #30363d' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 800, color: '#fff' }}>Vikramaditya Rao</span>
                      <span style={{ backgroundColor: 'rgba(63, 185, 80, 0.15)', color: '#3fb950', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <CheckCircle2 size={12} />
                        <span>Verified Indian Buyer</span>
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '2px', color: '#ff9900', marginTop: '4px' }}>
                      {'★★★★★'}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#f0f6fc', marginTop: '6px' }}>
                      Exceptional hardware engineering and fast PrimeTech drone delivery!
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#8b949e', margin: '6px 0 0', lineHeight: 1.4 }}>
                      Runs all modern AAA titles like Cyberpunk 2077 and Black Myth: Wukong effortlessly at ultra settings. Temperatures stay well under 72°C even in Mumbai humidity!
                    </p>
                  </div>
                  <button
                    onClick={() => alert('Review verified and marked helpful by Store Admin.')}
                    style={{ padding: '6px 10px', backgroundColor: '#161b22', color: '#3fb950', border: '1px solid #3fb950', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ✔ Verify
                  </button>
                </div>
              </div>

              <div style={{ backgroundColor: '#0d1117', padding: '14px', borderRadius: '8px', border: '1px solid #30363d' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 800, color: '#fff' }}>Ananya Sharma</span>
                      <span style={{ backgroundColor: 'rgba(63, 185, 80, 0.15)', color: '#3fb950', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px' }}>
                        <CheckCircle2 size={12} />
                        <span>Verified Indian Buyer</span>
                      </span>
                    </div>
                    <div style={{ display: 'flex', gap: '2px', color: '#ff9900', marginTop: '4px' }}>
                      {'★★★★★'}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#f0f6fc', marginTop: '6px' }}>
                      Best value for money in the Indian PC components market
                    </div>
                    <p style={{ fontSize: '0.82rem', color: '#8b949e', margin: '6px 0 0', lineHeight: 1.4 }}>
                      The configuration options on this item allowed me to pick exact RAM speeds without paying double elsewhere. High recommendation!
                    </p>
                  </div>
                  <button
                    onClick={() => alert('Review verified and marked helpful by Store Admin.')}
                    style={{ padding: '6px 10px', backgroundColor: '#161b22', color: '#3fb950', border: '1px solid #3fb950', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}
                  >
                    ✔ Verify
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Community Questions & Official Answer Panel */}
          <div className="glass-panel" style={{ padding: '1.6rem', borderRadius: '12px', border: '1px solid #30363d', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #30363d', paddingBottom: '12px' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageCircle size={18} color="#00f2fe" />
                <span>Community Q&A Feed (Post Official Support Replies)</span>
              </div>
              <ShieldCheck size={20} color="#ff9900" />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ backgroundColor: '#0d1117', padding: '14px', borderRadius: '8px', border: '1px solid #30363d', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: '#00f2fe' }}>Q:</span>
                  <span>Does this product come with official Indian warranty and on-site service support?</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#8b949e' }}>Asked by Rajesh Kumar (Bengaluru) on July 10, 2026</div>

                <div style={{ backgroundColor: 'rgba(255, 153, 0, 0.08)', padding: '10px', borderRadius: '6px', borderLeft: '3px solid #ff9900' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ff9900', fontWeight: 800, fontSize: '0.78rem' }}>
                    <ShieldCheck size={14} />
                    <span>PrimeTech India Official Support 🛡️ (Verified Answer)</span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: '#fff', margin: '4px 0 0', lineHeight: 1.4 }}>
                    Yes, Rajesh! All products purchased from PrimeTech India carry comprehensive 2 to 3-year brand warranties with pan-India on-site repair support across 400+ major Indian cities.
                  </p>
                </div>

                {/* Reply Form */}
                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <input
                    type="text"
                    placeholder="Submit additional official support response..."
                    value={replyText[selectedProduct.id] || ''}
                    onChange={(e) => setReplyText({ ...replyText, [selectedProduct.id]: e.target.value })}
                    style={{ flex: 1, padding: '8px 10px', backgroundColor: '#161b22', border: '1px solid #30363d', color: '#fff', borderRadius: '4px', fontSize: '0.8rem' }}
                  />
                  <button
                    onClick={() => {
                      if (!replyText[selectedProduct.id]) return;
                      alert(`Official PrimeTech India reply published: "${replyText[selectedProduct.id]}"`);
                      setReplyText({ ...replyText, [selectedProduct.id]: '' });
                    }}
                    style={{ backgroundColor: '#ff9900', color: '#000', border: 'none', padding: '8px 14px', borderRadius: '4px', fontWeight: 800, fontSize: '0.78rem', cursor: 'pointer' }}
                  >
                    Post Reply 🛡️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
