import React, { useState } from 'react';
import type { Coupon } from '../../types';
import { useAdmin } from '../../context/AdminContext';
import { Tag, PlusCircle, Trash2, Sparkles, CheckCircle2 } from 'lucide-react';

export const AdminCouponsPage: React.FC = () => {
  const { coupons, addCoupon, deleteCoupon } = useAdmin();

  const [code, setCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState<number>(15);
  const [description, setDescription] = useState('');
  const [minOrderValue, setMinOrderValue] = useState<number>(5000);

  const handleApplyTemplate = (type: 'diwali' | 'weekend' | 'vip') => {
    if (type === 'diwali') {
      setCode('DIWALI2026');
      setDiscountPercentage(20);
      setDescription('Grand Diwali Festival Sale — Get 20% Instant Discount across all laptops and custom setups!');
      setMinOrderValue(10000);
    } else if (type === 'weekend') {
      setCode('PRIMEWEEKEND');
      setDiscountPercentage(15);
      setDescription('Prime Weekend Flash Deal — Save 15% on GPUs and high-refresh monitors above ₹8,000!');
      setMinOrderValue(8000);
    } else if (type === 'vip') {
      setCode('VIPTECH30');
      setDiscountPercentage(30);
      setDescription('Exclusive PrimeTech VIP Tier Benefit — Massive 30% discount on pre-built liquid cooled rigs!');
      setMinOrderValue(25000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || discountPercentage <= 0) return;

    const newCoupon: Coupon = {
      code: code.toUpperCase().trim(),
      discountPercentage: Number(discountPercentage),
      description: description || `Save ${discountPercentage}% instantly on your order!`,
      minOrderValue: Number(minOrderValue),
    };

    addCoupon(newCoupon);
    setCode('');
    setDescription('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#161b22', padding: '1.4rem', borderRadius: '12px', border: '1px solid #30363d' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Tag size={26} color="#3fb950" />
            <span>Promotional Coupons & Discount Engine ({coupons.length} Active)</span>
          </h1>
          <p style={{ color: '#8b949e', margin: '4px 0 0', fontSize: '0.88rem' }}>
            Create and manage promotional codes that customers can apply during Indian multi-step checkout (`TECHPRO10`, etc.).
          </p>
        </div>
      </div>

      <div className="grid-2" style={{ gap: '1.5rem', alignItems: 'flex-start' }}>
        {/* Left Form */}
        <div className="glass-panel" style={{ padding: '1.6rem', borderRadius: '12px', border: '1px solid #30363d', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: 0 }}>
            Create New Promotional Coupon Code (`%` Off)
          </h2>

          {/* Quick One-Click Templates */}
          <div style={{ backgroundColor: '#0d1117', padding: '12px', borderRadius: '8px', border: '1px dashed #3fb950' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3fb950', fontWeight: 800, fontSize: '0.82rem', marginBottom: '8px' }}>
              <Sparkles size={15} />
              <span>One-Click Campaign Templates (Auto-Fill Promo Details!)</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleApplyTemplate('diwali')}
                style={{ backgroundColor: '#161b22', color: '#ff9900', border: '1px solid #ff9900', padding: '6px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
              >
                🎉 Diwali Special (`DIWALI2026`)
              </button>
              <button
                type="button"
                onClick={() => handleApplyTemplate('weekend')}
                style={{ backgroundColor: '#161b22', color: '#00f2fe', border: '1px solid #00f2fe', padding: '6px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
              >
                🚀 Prime Weekend (`PRIMEWEEKEND`)
              </button>
              <button
                type="button"
                onClick={() => handleApplyTemplate('vip')}
                style={{ backgroundColor: '#161b22', color: '#a371f7', border: '1px solid #a371f7', padding: '6px 10px', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
              >
                ⚡ VIP Tier Bonus (`VIPTECH30`)
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#c9d1d9', display: 'block', marginBottom: '6px' }}>Promo Code *</label>
              <input
                type="text"
                required
                placeholder="e.g. DIWALI20, GAMING15, RTX5090"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{ width: '100%', padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontWeight: 800, textTransform: 'uppercase' }}
              />
            </div>

            <div className="grid-2" style={{ gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#3fb950', display: 'block', marginBottom: '6px' }}>Discount Percentage (%) *</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={90}
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px', backgroundColor: '#0d1117', border: '1px solid #3fb950', color: '#fff', borderRadius: '6px', fontWeight: 800 }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#c9d1d9', display: 'block', marginBottom: '6px' }}>Min Order Value (₹ INR)</label>
                <input
                  type="number"
                  min={0}
                  value={minOrderValue}
                  onChange={(e) => setMinOrderValue(Number(e.target.value))}
                  style={{ width: '100%', padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#c9d1d9', display: 'block', marginBottom: '6px' }}>Customer-Facing Description</label>
              <textarea
                rows={2}
                placeholder="Brief summary shown inside Cart Drawer and Checkout..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: '100%', padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }}
              />
            </div>

            {/* Live Card Preview */}
            <div style={{ marginTop: '6px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8b949e', marginBottom: '6px' }}>LIVE CHECKOUT CARD PREVIEW:</div>
              <div style={{ backgroundColor: 'rgba(63, 185, 80, 0.1)', border: '1px dashed #3fb950', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ backgroundColor: '#3fb950', color: '#000', fontWeight: 900, fontSize: '0.82rem', padding: '3px 8px', borderRadius: '4px', fontFamily: 'var(--font-mono)' }}>
                    {code.toUpperCase() || 'YOURCODE'}
                  </span>
                  <div style={{ fontSize: '0.78rem', color: '#fff', fontWeight: 700, marginTop: '6px' }}>
                    {discountPercentage}% OFF (Min order ₹{minOrderValue.toLocaleString('en-IN')})
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#8b949e' }}>
                    {description || 'Customer savings description summary'}
                  </div>
                </div>
                <CheckCircle2 size={24} color="#3fb950" />
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '12px', fontSize: '0.92rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <PlusCircle size={18} />
              <span>Publish Coupon to Storefront 🚀</span>
            </button>
          </form>
        </div>

        {/* Right Active Coupons Table */}
        <div className="glass-panel" style={{ padding: '1.6rem', borderRadius: '12px', border: '1px solid #30363d', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: 0 }}>
            Active Promotional Codes ({coupons.length})
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {coupons.map((c) => (
              <div key={c.code} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px', backgroundColor: '#0d1117', borderRadius: '8px', border: '1px solid #30363d' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ backgroundColor: 'rgba(255, 153, 0, 0.15)', color: '#ff9900', border: '1px solid #ff9900', padding: '4px 10px', borderRadius: '6px', fontWeight: 900, fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
                      {c.code}
                    </span>
                    <span style={{ backgroundColor: '#3fb950', color: '#000', padding: '2px 8px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 900 }}>
                      {c.discountPercentage}% OFF
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#c9d1d9', marginTop: '6px', fontWeight: 600 }}>
                    {c.description}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#8b949e', marginTop: '4px' }}>
                    Minimum order requirement: ₹{c.minOrderValue.toLocaleString('en-IN')}
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (window.confirm(`Remove coupon code ${c.code}?`)) {
                      deleteCoupon(c.code);
                    }
                  }}
                  title="Delete Coupon"
                  style={{ backgroundColor: 'rgba(248,81,73,0.15)', color: '#f85149', border: '1px solid rgba(248,81,73,0.3)', padding: '8px', borderRadius: '6px', cursor: 'pointer' }}
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
