import React from 'react';
import type { FilterState } from '../../types';
import { Grid, List } from 'lucide-react';

interface SortAndBarProps {
  totalResults: number;
  filterState: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export const SortAndBar: React.FC<SortAndBarProps> = ({
  totalResults,
  filterState,
  onFilterChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <div
      className="glass-panel"
      style={{
        borderRadius: '10px',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
        marginBottom: '1.5rem',
      }}
    >
      {/* Left: Result Counter */}
      <div style={{ fontSize: '0.88rem', color: '#c9d1d9' }}>
        <span>Showing </span>
        <span style={{ fontWeight: 700, color: '#fff' }}>1-{totalResults}</span>
        <span> of </span>
        <span style={{ fontWeight: 700, color: '#ff9900' }}>{totalResults} results</span>
        {filterState.searchQuery && (
          <span>
            {' '}for <span style={{ color: '#fff', fontWeight: 700 }}>"{filterState.searchQuery}"</span>
          </span>
        )}
      </div>

      {/* Right: Sort By Dropdown & Grid/List Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
        {/* Sort Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
          <span style={{ color: '#8b949e' }}>Sort by:</span>
          <select
            value={filterState.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
            style={{
              padding: '6px 12px',
              backgroundColor: '#161b22',
              border: '1px solid #30363d',
              color: '#fff',
              borderRadius: '6px',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High (₹)</option>
            <option value="price-desc">Price: High to Low (₹)</option>
            <option value="rating">Avg. Customer Review</option>
            <option value="newest">Newest Arrivals</option>
          </select>
        </div>

        {/* View Mode Toggle Buttons */}
        <div style={{ display: 'flex', gap: '4px', backgroundColor: '#161b22', padding: '3px', borderRadius: '6px', border: '1px solid #30363d' }}>
          <button
            onClick={() => onViewModeChange('grid')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              backgroundColor: viewMode === 'grid' ? '#232f3e' : 'transparent',
              color: viewMode === 'grid' ? '#ff9900' : '#8b949e',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Grid size={16} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            style={{
              padding: '4px 8px',
              borderRadius: '4px',
              backgroundColor: viewMode === 'list' ? '#232f3e' : 'transparent',
              color: viewMode === 'list' ? '#ff9900' : '#8b949e',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <List size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
