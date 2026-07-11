import React from 'react';
import { ArrowUp, Globe, ShieldCheck } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: '#131921', color: '#f0f6fc', marginTop: '4rem' }}>
      {/* Back to top button */}
      <div
        onClick={scrollToTop}
        style={{
          backgroundColor: '#37475a',
          padding: '14px',
          textAlign: 'center',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#485769')}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#37475a')}
      >
        <ArrowUp size={16} />
        <span>Back to top</span>
      </div>

      {/* 4-Column Links */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem', borderBottom: '1px solid #232f3e' }}>
        <div className="grid-4" style={{ gap: '2rem' }}>
          {/* Col 1 */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', color: '#fff' }}>
              Get to Know Us
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: '#c9d1d9' }}>
              <li><a href="#" onClick={(e) => e.preventDefault()}>About PrimeTech India</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Careers & Hardware Engineering</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Press Releases</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>PrimeTech Science & AI</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', color: '#fff' }}>
              Connect with Us
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: '#c9d1d9' }}>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Facebook</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Twitter / X (PrimeTechIN)</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Instagram</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>GitHub Hardware Repo</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', color: '#fff' }}>
              Make Money with Us
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: '#c9d1d9' }}>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Sell PC Components on PrimeTech</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Become an Affiliate Partner</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Fulfillment by PrimeTech India</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>Advertise Your Brand</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1rem', color: '#fff' }}>
              Let Us Help You
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.88rem', color: '#c9d1d9' }}>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('/account'); }}>Your Account Dashboard</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('/orders'); }}>Track Orders & Returns</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('/wishlist'); }}>Hardware Wishlist & Builds</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigate('/cart'); }}>PrimeTech VIP Benefits</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Currency & Copyright */}
      <div style={{ backgroundColor: '#0d1117', padding: '2rem 1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span
            onClick={() => onNavigate('/')}
            style={{ fontSize: '1.3rem', fontWeight: 800, cursor: 'pointer', color: '#fff' }}
          >
            Prime<span style={{ color: '#ff9900' }}>Tech</span> India
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #30363d', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem' }}>
            <Globe size={16} color="#00f2fe" />
            <span>English (India)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #30363d', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 700 }}>
            <span style={{ color: '#ff9900' }}>₹</span>
            <span>Indian Rupee (INR)</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #30363d', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', color: '#2ea043', fontWeight: 600 }}>
            <ShieldCheck size={16} color="#2ea043" />
            <span>Local-First Secure Architecture</span>
          </div>
        </div>

        <p style={{ fontSize: '0.8rem', color: '#8b949e', maxWidth: '650px' }}>
          Conditions of Use & Sale | Privacy Notice | Interest-Based Ads | Indian E-Commerce Compliance © 2026, PrimeTech India Hardware Corp. or its affiliates. Engineered for extreme PC enthusiasts across Bengaluru, Mumbai, Delhi, and India.
        </p>
      </div>
    </footer>
  );
};
