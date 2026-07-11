import React, { useState } from 'react';
import type { FilterState } from '../../types';
import { CATEGORIES } from '../../data/categories';
import { StarRating } from '../common/StarRating';
import { RotateCcw } from 'lucide-react';

interface FilterSidebarProps {
  filterState: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  onReset: () => void;
}

const ALL_BRANDS = ['Apple', 'ASUS', 'NVIDIA', 'Lenovo', 'HP', 'Razer', 'Samsung', 'LG UltraGear', 'BenQ', 'Keychron', 'Logitech G', 'SteelSeries', 'Elgato', 'Corsair', 'Crucial', 'WD Black', 'ASUS ROG Rapture', 'CalDigit', 'CyberPower'];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filterState, onFilterChange, onReset }) => {
  const [customMin, setCustomMin] = useState<string>(filterState.minPrice ? filterState.minPrice.toString() : '');
  const [customMax, setCustomMax] = useState<string>(filterState.maxPrice < 1000000 ? filterState.maxPrice.toString() : '');

  const activeCategoryDef = CATEGORIES.find((c) => c.id === filterState.category);

  const handleBrandToggle = (brand: string) => {
    const exists = filterState.brand.includes(brand);
    const nextBrands = exists
      ? filterState.brand.filter((b) => b !== brand)
      : [...filterState.brand, brand];
    onFilterChange({ brand: nextBrands });
  };

  const handleApplyPrice = (e: React.FormEvent) => {
    e.preventDefault();
    const min = customMin ? parseInt(customMin, 10) : 0;
    const max = customMax ? parseInt(customMax, 10) : 1000000;
    onFilterChange({ minPrice: min, maxPrice: max });
  };

  return (
    <div
      className="glass-panel"
      style={{
        width: '270px',
        flexShrink: 0,
        borderRadius: '12px',
        padding: '1.2rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        alignSelf: 'flex-start',
      }}
    >
      {/* Top Header & Reset */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #30363d', paddingBottom: '12px' }}>
        <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff' }}>Filters</span>
        <button
          onClick={onReset}
          style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: '#ff9900', fontWeight: 700 }}
        >
          <RotateCcw size={14} />
          <span>Reset All</span>
        </button>
      </div>

      {/* 1. Department / Category */}
      <div>
        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>Department</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span
            onClick={() => onFilterChange({ category: '', subCategory: '' })}
            style={{
              fontSize: '0.85rem',
              fontWeight: !filterState.category ? 700 : 400,
              color: !filterState.category ? '#ff9900' : '#c9d1d9',
              cursor: 'pointer',
            }}
          >
            All Hardware Departments
          </span>
          {CATEGORIES.map((cat) => (
            <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span
                onClick={() => onFilterChange({ category: cat.id, subCategory: '' })}
                style={{
                  fontSize: '0.85rem',
                  fontWeight: filterState.category === cat.id ? 700 : 400,
                  color: filterState.category === cat.id ? '#ff9900' : '#c9d1d9',
                  cursor: 'pointer',
                  paddingLeft: '6px',
                }}
              >
                {cat.name}
              </span>
              {filterState.category === cat.id && (
                <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '2px' }}>
                  {cat.subCategories.map((sub) => (
                    <span
                      key={sub}
                      onClick={() => onFilterChange({ subCategory: sub === filterState.subCategory ? '' : sub })}
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: filterState.subCategory === sub ? 700 : 400,
                        color: filterState.subCategory === sub ? '#00f2fe' : '#8b949e',
                        cursor: 'pointer',
                      }}
                    >
                      • {sub}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: '1px', backgroundColor: '#30363d' }} />

      {/* 2. Customer Review Rating */}
      <div>
        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>Customer Review Rating</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[4, 3, 2].map((stars) => (
            <div
              key={stars}
              onClick={() => onFilterChange({ minRating: filterState.minRating === stars ? 0 : stars })}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                opacity: filterState.minRating && filterState.minRating !== stars ? 0.6 : 1,
              }}
            >
              <StarRating rating={stars} size={15} />
              <span style={{ fontSize: '0.82rem', color: filterState.minRating === stars ? '#ff9900' : '#c9d1d9', fontWeight: filterState.minRating === stars ? 700 : 400 }}>
                & Up
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ height: '1px', backgroundColor: '#30363d' }} />

      {/* 3. Price Range in INR (₹) */}
      <div>
        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>Price Range (₹ INR)</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
          {[
            { label: 'Under ₹25,000', min: 0, max: 25000 },
            { label: '₹25,000 - ₹75,000', min: 25000, max: 75000 },
            { label: '₹75,000 - ₹1,50,000', min: 75000, max: 150000 },
            { label: '₹1,50,000 - ₹3,00,000', min: 150000, max: 300000 },
            { label: 'Over ₹3,00,000', min: 300000, max: 1000000 },
          ].map((preset, idx) => (
            <span
              key={idx}
              onClick={() => onFilterChange({ minPrice: preset.min, maxPrice: preset.max })}
              style={{
                fontSize: '0.82rem',
                color: filterState.minPrice === preset.min && filterState.maxPrice === preset.max ? '#ff9900' : '#c9d1d9',
                fontWeight: filterState.minPrice === preset.min && filterState.maxPrice === preset.max ? 700 : 400,
                cursor: 'pointer',
              }}
            >
              {preset.label}
            </span>
          ))}
        </div>

        {/* Custom Min / Max Form */}
        <form onSubmit={handleApplyPrice} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <input
            type="number"
            placeholder="Min ₹"
            value={customMin}
            onChange={(e) => setCustomMin(e.target.value)}
            style={{ width: '80px', padding: '6px', fontSize: '0.8rem' }}
          />
          <span style={{ color: '#8b949e' }}>-</span>
          <input
            type="number"
            placeholder="Max ₹"
            value={customMax}
            onChange={(e) => setCustomMax(e.target.value)}
            style={{ width: '80px', padding: '6px', fontSize: '0.8rem' }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: '#ff9900',
              color: '#0d1117',
              fontWeight: 700,
              padding: '6px 10px',
              borderRadius: '4px',
              fontSize: '0.78rem',
            }}
          >
            Go
          </button>
        </form>
      </div>

      <div style={{ height: '1px', backgroundColor: '#30363d' }} />

      {/* 4. Brand Selection Checkboxes */}
      <div>
        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>Brand</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
          {(activeCategoryDef ? activeCategoryDef.popularBrands : ALL_BRANDS.slice(0, 10)).map((brandName) => {
            const checked = filterState.brand.includes(brandName);
            return (
              <label
                key={brandName}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.84rem', color: checked ? '#fff' : '#c9d1d9', fontWeight: checked ? 600 : 400 }}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleBrandToggle(brandName)}
                  style={{ accentColor: '#ff9900', cursor: 'pointer' }}
                />
                <span>{brandName}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div style={{ height: '1px', backgroundColor: '#30363d' }} />

      {/* 5. Availability & Prime */}
      <div>
        <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: '10px' }}>Availability</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.84rem', color: '#c9d1d9' }}>
            <input
              type="checkbox"
              checked={filterState.primeOnly}
              onChange={(e) => onFilterChange({ primeOnly: e.target.checked })}
              style={{ accentColor: '#00f2fe' }}
            />
            <span style={{ color: '#00f2fe', fontWeight: 700 }}>⚡ PrimeTech VIP Delivery</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.84rem', color: '#c9d1d9' }}>
            <input
              type="checkbox"
              checked={filterState.inStockOnly}
              onChange={(e) => onFilterChange({ inStockOnly: e.target.checked })}
              style={{ accentColor: '#ff9900' }}
            />
            <span>Exclude Out of Stock</span>
          </label>
        </div>
      </div>
    </div>
  );
};
