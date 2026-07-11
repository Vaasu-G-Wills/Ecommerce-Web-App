import React, { useState, useEffect, useMemo } from 'react';
import type { FilterState } from '../types';
import { PRODUCTS } from '../data/products';
import { FilterSidebar } from '../components/search/FilterSidebar';
import { SortAndBar } from '../components/search/SortAndBar';
import { ProductCard } from '../components/product/ProductCard';
import { Search, RotateCcw } from 'lucide-react';

interface SearchPageProps {
  queryParams: Record<string, string>;
  onNavigate: (path: string, queryParams?: Record<string, string>) => void;
}

const DEFAULT_FILTERS: FilterState = {
  category: '',
  subCategory: '',
  brand: [],
  minPrice: 0,
  maxPrice: 1000000,
  minRating: 0,
  inStockOnly: false,
  primeOnly: false,
  sortBy: 'featured',
  searchQuery: '',
};

export const SearchPage: React.FC<SearchPageProps> = ({ queryParams, onNavigate }) => {
  const [filterState, setFilterState] = useState<FilterState>({
    ...DEFAULT_FILTERS,
    searchQuery: queryParams.q || '',
    category: queryParams.category || '',
    subCategory: queryParams.subCategory || '',
    primeOnly: queryParams.primeOnly === 'true',
    sortBy: (queryParams.sortBy as FilterState['sortBy']) || 'featured',
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    setFilterState((prev) => ({
      ...prev,
      searchQuery: queryParams.q || '',
      category: queryParams.category || prev.category,
      subCategory: queryParams.subCategory || prev.subCategory,
      primeOnly: queryParams.primeOnly === 'true' || prev.primeOnly,
      sortBy: (queryParams.sortBy as FilterState['sortBy']) || prev.sortBy,
    }));
  }, [queryParams]);

  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilterState({ ...DEFAULT_FILTERS, searchQuery: queryParams.q || '' });
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // 1. Search query
    if (filterState.searchQuery.trim()) {
      const q = filterState.searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.subCategory.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q)
      );
    }

    // 2. Category / Subcategory
    if (filterState.category) {
      result = result.filter((p) => p.category === filterState.category);
    }
    if (filterState.subCategory) {
      result = result.filter((p) => p.subCategory === filterState.subCategory);
    }

    // 3. Brands
    if (filterState.brand.length > 0) {
      result = result.filter((p) => filterState.brand.includes(p.brand));
    }

    // 4. Price bounds in INR
    if (filterState.minPrice > 0) {
      result = result.filter((p) => p.price >= filterState.minPrice);
    }
    if (filterState.maxPrice < 1000000) {
      result = result.filter((p) => p.price <= filterState.maxPrice);
    }

    // 5. Rating
    if (filterState.minRating > 0) {
      result = result.filter((p) => p.rating >= filterState.minRating);
    }

    // 6. Availability & Prime
    if (filterState.inStockOnly) {
      result = result.filter((p) => p.stockCount > 0);
    }
    if (filterState.primeOnly) {
      result = result.filter((p) => p.isPrime);
    }

    // 7. Sorting
    result.sort((a, b) => {
      switch (filterState.sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return (b.isNewRelease ? 1 : 0) - (a.isNewRelease ? 1 : 0);
        case 'featured':
        default:
          return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0) || b.reviewsCount - a.reviewsCount;
      }
    });

    return result;
  }, [filterState]);

  return (
    <div style={{ maxWidth: '1440px', margin: '2rem auto', padding: '0 1.5rem' }}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        {/* Left Sidebar Filters */}
        <FilterSidebar
          filterState={filterState}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Right Content Area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <SortAndBar
            totalResults={filteredAndSortedProducts.length}
            filterState={filterState}
            onFilterChange={handleFilterChange}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />

          {filteredAndSortedProducts.length === 0 ? (
            <div
              className="glass-panel"
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1.2rem',
              }}
            >
              <div style={{ padding: '16px', borderRadius: '50%', backgroundColor: 'rgba(255, 153, 0, 0.15)', color: '#ff9900' }}>
                <Search size={36} />
              </div>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>No hardware found matching your criteria</h3>
              <p style={{ color: '#8b949e', maxWidth: '480px', lineHeight: 1.5 }}>
                We couldn't find any computer electronics matching your active filters or Indian price bounds. Try clearing filters or searching broader keywords like "GPU", "OLED", or "MacBook".
              </p>
              <button onClick={handleResetFilters} className="btn-primary" style={{ padding: '0.7rem 1.6rem', gap: '8px' }}>
                <RotateCcw size={18} />
                <span>Reset All Filters</span>
              </button>
            </div>
          ) : viewMode === 'list' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {filteredAndSortedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} onNavigate={onNavigate} viewMode="list" />
              ))}
            </div>
          ) : (
            <div className="grid-3" style={{ gap: '1.4rem' }}>
              {filteredAndSortedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} onNavigate={onNavigate} viewMode="grid" />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
