import React from 'react';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { LightningDeals } from '../components/home/LightningDeals';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { ProductCarousel } from '../components/home/ProductCarousel';
import { useAdmin } from '../context/AdminContext';
import { ShieldCheck, Truck, RotateCcw, CreditCard } from 'lucide-react';

export const HomePage: React.FC<{ onNavigate: (path: string, queryParams?: Record<string, string>) => void }> = ({
  onNavigate,
}) => {
  const { products } = useAdmin();
  const bestSellers = products.filter((p) => p.isBestSeller || p.rating >= 4.8);
  const newArrivals = [...products].sort((a, b) => b.price - a.price).slice(0, 8);
  const gamingGear = products.filter((p) => p.category === 'peripherals' || p.category === 'monitors');

  return (
    <div>
      {/* Promotional Top Bar */}
      <div
        style={{
          background: 'linear-gradient(90deg, #232f3e 0%, #161b22 50%, #232f3e 100%)',
          borderBottom: '1px solid #30363d',
          padding: '8px 16px',
          textAlign: 'center',
          fontSize: '0.82rem',
          fontWeight: 600,
          color: '#f0f6fc',
        }}
      >
        <span style={{ color: '#ff9900', marginRight: '6px' }}>🇮🇳 GREAT INDIAN TECH SALE ACTIVE:</span>
        <span>Flat 10% Instant Discount on all Computer & Electronics orders using coupon code </span>
        <span style={{ backgroundColor: '#ff9900', color: '#0d1117', padding: '1px 6px', borderRadius: '4px', fontWeight: 800, fontFamily: 'monospace' }}>
          TECHPRO10
        </span>
      </div>

      {/* Hero Carousel */}
      <HeroCarousel onNavigate={onNavigate} />

      {/* Main Storefront Body (pulled up slightly over hero mask) */}
      <div style={{ position: 'relative', zIndex: 15, marginTop: '-60px' }}>
        <CategoryGrid onNavigate={onNavigate} />
        
        <LightningDeals onNavigate={onNavigate} />

        {/* Feature Banner: Why Buy Hardware on PrimeTech India? */}
        <div
          className="glass-panel"
          style={{
            maxWidth: '1280px',
            margin: '2.5rem auto',
            padding: '2rem 1.5rem',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(22, 27, 34, 0.95) 0%, rgba(35, 47, 62, 0.9) 100%)',
            border: '1px solid #30363d',
          }}
        >
          <div className="grid-4" style={{ gap: '1.5rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(255, 153, 0, 0.15)', color: '#ff9900' }}>
                <Truck size={28} />
              </div>
              <h4 style={{ fontWeight: 700, color: '#fff' }}>FREE One-Day Prime Delivery</h4>
              <p style={{ fontSize: '0.8rem', color: '#8b949e' }}>
                Express drone & priority delivery across Bengaluru, Mumbai, Delhi & metro hubs.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe' }}>
                <ShieldCheck size={28} />
              </div>
              <h4 style={{ fontWeight: 700, color: '#fff' }}>100% Genuine Brand Warranty</h4>
              <p style={{ fontSize: '0.8rem', color: '#8b949e' }}>
                Direct distributor partnerships with NVIDIA, Apple, ASUS, Corsair & Samsung.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(46, 160, 67, 0.15)', color: '#2ea043' }}>
                <RotateCcw size={28} />
              </div>
              <h4 style={{ fontWeight: 700, color: '#fff' }}>Hassle-Free 7-Day Replacement</h4>
              <p style={{ fontSize: '0.8rem', color: '#8b949e' }}>
                Instant doorstep replacement for any hardware defects or shipping damages.
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
              <div style={{ padding: '12px', borderRadius: '50%', backgroundColor: 'rgba(138, 43, 226, 0.15)', color: '#8a2be2' }}>
                <CreditCard size={28} />
              </div>
              <h4 style={{ fontWeight: 700, color: '#fff' }}>Simulated Instant UPI & Cards</h4>
              <p style={{ fontSize: '0.8rem', color: '#8b949e' }}>
                Test authentic Indian payment simulations including QR/UPI, Net Banking & COD.
              </p>
            </div>
          </div>
        </div>

        <ProductCarousel
          title="Inspired by your recent browsing in PC Components"
          subtitle="Customer favorites across RTX GPUs, high-speed RAM & mechanical keyboards"
          products={bestSellers}
          onNavigate={onNavigate}
        />

        <ProductCarousel
          title="High-Refresh Battle Station Gear & Peripherals"
          subtitle="Level up with esports mice, QD-OLED monitors, and custom keybeds"
          products={gamingGear}
          onNavigate={onNavigate}
        />

        <ProductCarousel
          title="Top Flagship Computers & Laptops (2026 Models)"
          subtitle="The ultimate laptops equipped with RTX 4090 and Apple M4 Max Silicon"
          products={newArrivals}
          onNavigate={onNavigate}
        />
      </div>
    </div>
  );
};
