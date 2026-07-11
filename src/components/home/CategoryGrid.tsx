import React from 'react';
import { ArrowUpRight } from 'lucide-react';

interface CategoryCard {
  title: string;
  categoryKey: string;
  subCategoryKey?: string;
  items: {
    label: string;
    image: string;
    subCat?: string;
  }[];
  ctaText: string;
}

const CATEGORY_CARDS: CategoryCard[] = [
  {
    title: 'Upgrade your Battle Station',
    categoryKey: 'components',
    items: [
      { label: 'Graphics Cards', image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=400&q=80', subCat: 'Graphics Cards (GPUs)' },
      { label: 'Flagship CPUs', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=400&q=80', subCat: 'Processors (CPUs)' },
      { label: 'Motherboards', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80', subCat: 'Motherboards' },
      { label: 'Modular PSUs', image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=400&q=80', subCat: 'Power Supplies (PSUs)' },
    ],
    ctaText: 'Explore PC Components',
  },
  {
    title: 'High-Performance Laptops & MacBooks',
    categoryKey: 'laptops',
    items: [
      { label: 'Gaming Laptops', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=400&q=80', subCat: 'Gaming Laptops' },
      { label: 'Apple MacBooks', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=400&q=80', subCat: 'MacBooks' },
      { label: 'OLED Ultrabooks', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=400&q=80', subCat: 'Ultrabooks' },
      { label: 'Workstation Rigs', image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=400&q=80', subCat: 'Workstation PCs' },
    ],
    ctaText: 'Shop All Laptops',
  },
  {
    title: 'Immersive OLED & 4K Displays',
    categoryKey: 'monitors',
    items: [
      { label: 'QD-OLED Curved', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80', subCat: 'High-Refresh Gaming OLEDs' },
      { label: '240Hz Speed', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80', subCat: 'High-Refresh Gaming OLEDs' },
      { label: '4K Nano IPS', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80', subCat: '4K UHD Professional' },
      { label: 'Designer Mac Mode', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=400&q=80', subCat: '4K UHD Professional' },
    ],
    ctaText: 'See Displays & Monitors',
  },
  {
    title: 'Custom Peripherals & Gen5 SSDs',
    categoryKey: 'peripherals',
    items: [
      { label: 'Custom Keyboards', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=400&q=80', subCat: 'Mechanical Keyboards' },
      { label: '60g Esports Mice', image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=400&q=80', subCat: 'Wireless Gaming Mice' },
      { label: 'PCIe Gen5 Storage', image: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=400&q=80', subCat: '' },
      { label: 'Wi-Fi 7 Mesh', image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80', subCat: '' },
    ],
    ctaText: 'Browse Peripherals & Storage',
  },
];

export const CategoryGrid: React.FC<{ onNavigate: (path: string, queryParams?: Record<string, string>) => void }> = ({ onNavigate }) => {
  return (
    <div style={{ maxWidth: '1280px', margin: '2rem auto', padding: '0 1.5rem' }}>
      <div className="grid-4" style={{ gap: '1.5rem' }}>
        {CATEGORY_CARDS.map((card, idx) => (
          <div
            key={idx}
            className="glass-panel card-hover"
            style={{
              borderRadius: '16px',
              padding: '1.4rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', marginBottom: '1.2rem', letterSpacing: '-0.2px' }}>
                {card.title}
              </h3>

              {/* 2x2 Grid inside Card */}
              <div className="grid-2" style={{ gap: '0.8rem', marginBottom: '1.2rem' }}>
                {card.items.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => {
                      if (item.subCat) {
                        onNavigate('/search', { category: card.categoryKey, subCategory: item.subCat });
                      } else {
                        onNavigate('/search', { category: card.categoryKey });
                      }
                    }}
                    style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '6px' }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '96px',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        backgroundColor: '#0d1117',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.label}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                      />
                    </div>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#c9d1d9', lineHeight: 1.2 }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom CTA Link */}
            <div
              onClick={() => onNavigate('/search', { category: card.categoryKey })}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: '#ff9900',
                fontWeight: 700,
                fontSize: '0.88rem',
                cursor: 'pointer',
              }}
            >
              <span>{card.ctaText}</span>
              <ArrowUpRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
