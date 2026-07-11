import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, ShoppingCart, Menu, User, ChevronDown, Heart, Package, Zap, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { CATEGORIES } from '../../data/categories';
import { PRODUCTS } from '../../data/products';
import type { Product } from '../../types';

interface NavbarProps {
  onOpenMegaMenu: () => void;
  onNavigate: (path: string, queryParams?: Record<string, string>) => void;
  currentPath: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMegaMenu, onNavigate }) => {
  const { user, selectedAddress, addresses, selectAddress, togglePrimeMembership } = useAuth();
  const { itemCount, openCartDrawer } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  
  // Modals/Popovers
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showAccountPopover, setShowAccountPopover] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSuggestions([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const matches = PRODUCTS.filter(
      (p) =>
        (selectedCategory === 'All' || p.category === selectedCategory) &&
        (p.title.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.subCategory.toLowerCase().includes(query))
    ).slice(0, 6);
    setSuggestions(matches);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    onNavigate('/search', {
      q: searchQuery,
      category: selectedCategory === 'All' ? '' : selectedCategory,
    });
  };

  const handleSuggestionClick = (product: Product) => {
    setShowSuggestions(false);
    setSearchQuery('');
    onNavigate(`/product/${product.id}`);
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
      {/* Top Main Bar (#131921) */}
      <div
        style={{
          backgroundColor: 'var(--bg-header)',
          padding: '0.6rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.2rem',
          flexWrap: 'wrap',
          borderBottom: '1px solid #232f3e',
        }}
      >
        {/* Left: Brand Logo & Location */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Logo */}
          <div
            onClick={() => onNavigate('/')}
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}
          >
            <span style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.5px', color: '#fff' }}>
              Prime<span style={{ color: '#ff9900' }}>Tech</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#00f2fe', marginLeft: '4px' }}>
                INDIA
              </span>
            </span>
            <div
              style={{
                width: '100%',
                height: '3px',
                background: 'linear-gradient(90deg, #ff9900 0%, #ff6a00 100%)',
                borderRadius: '99px',
                marginTop: '-2px',
              }}
            />
          </div>

          {/* Location / Deliver to */}
          <div
            onClick={() => setShowAddressModal(true)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              padding: '6px 8px',
              borderRadius: '6px',
              border: '1px solid transparent',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = '#ff9900')}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'transparent')}
          >
            <MapPin size={18} color="#ff9900" style={{ flexShrink: 0 }} />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span style={{ fontSize: '0.72rem', color: '#c9d1d9' }}>Deliver to {user.name.split(' ')[0]}</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                {selectedAddress.city} {selectedAddress.pinCode}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Search Bar with Category Dropdown & Auto-Suggest */}
        <div ref={searchRef} style={{ flex: 1, minWidth: '320px', maxWidth: '800px', position: 'relative' }}>
          <form
            onSubmit={handleSearchSubmit}
            style={{
              display: 'flex',
              width: '100%',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}
          >
            {/* Category Select */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                backgroundColor: '#232f3e',
                color: '#fff',
                border: 'none',
                padding: '0 12px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                borderRight: '1px solid #30363d',
                borderRadius: 0,
              }}
            >
              <option value="All">All Hardware</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name.split(' ')[0]}
                </option>
              ))}
            </select>

            {/* Input */}
            <input
              type="text"
              placeholder="Search RTX 4090, M4 Max, OLED Monitors, Mechanical Keyboards..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              style={{
                flex: 1,
                border: 'none',
                padding: '10px 16px',
                fontSize: '0.95rem',
                backgroundColor: '#161b22',
                color: '#fff',
                borderRadius: 0,
              }}
            />

            {/* Search Button */}
            <button
              type="submit"
              style={{
                backgroundColor: '#ff9900',
                padding: '0 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0d1117',
                border: 'none',
              }}
            >
              <Search size={22} fontWeight={800} />
            </button>
          </form>

          {/* Live Auto-Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                marginTop: '6px',
                borderRadius: '8px',
                overflow: 'hidden',
                zIndex: 1050,
                boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
              }}
            >
              <div style={{ padding: '8px 12px', fontSize: '0.75rem', color: '#8b949e', borderBottom: '1px solid #30363d' }}>
                RECOMMENDED HARDWARE IN INDIA
              </div>
              {suggestions.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => handleSuggestionClick(prod)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px 14px',
                    cursor: 'pointer',
                    borderBottom: '1px solid rgba(48, 54, 61, 0.4)',
                    transition: 'background-color 0.15s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 153, 0, 0.1)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  <img src={prod.images[0]} alt="" style={{ width: '38px', height: '38px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f0f6fc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {prod.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#ff9900', fontWeight: 700 }}>
                      ₹{prod.price.toLocaleString('en-IN')} | <span style={{ color: '#8b949e' }}>{prod.brand}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Actions: Currency, Account, Orders, Cart */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          {/* Indian Currency/Language Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: 700 }}>
            <span style={{ color: '#ff9900' }}>₹</span>
            <span>INR / EN</span>
          </div>

          {/* Account & Lists Popover Trigger */}
          <div
            style={{ position: 'relative', cursor: 'pointer', padding: '4px 6px' }}
            onMouseEnter={() => setShowAccountPopover(true)}
            onMouseLeave={() => setShowAccountPopover(false)}
            onClick={() => onNavigate('/account')}
          >
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
              <span style={{ fontSize: '0.72rem', color: '#c9d1d9' }}>Hello, {user.name.split(' ')[0]}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>Account & Lists</span>
                <ChevronDown size={14} color="#8b949e" />
              </div>
            </div>

            {/* Account Popover Menu */}
            {showAccountPopover && (
              <div
                className="glass-panel"
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  width: '280px',
                  padding: '16px',
                  borderRadius: '10px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.8)',
                  zIndex: 1100,
                }}
              >
                <div style={{ borderBottom: '1px solid #30363d', paddingBottom: '12px', marginBottom: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={16} color="#ff9900" />
                    <span>{user.name}</span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#8b949e' }}>{user.email}</div>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      togglePrimeMembership();
                    }}
                    style={{
                      marginTop: '8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      backgroundColor: user.isPrimeMember ? 'rgba(0, 242, 254, 0.15)' : 'rgba(139, 148, 158, 0.2)',
                      color: user.isPrimeMember ? '#00f2fe' : '#c9d1d9',
                      border: `1px solid ${user.isPrimeMember ? '#00f2fe' : '#30363d'}`,
                      cursor: 'pointer',
                    }}
                  >
                    <Zap size={12} />
                    <span>{user.isPrimeMember ? 'PrimeTech VIP Active' : 'Join PrimeTech VIP'}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div
                    onClick={(e) => { e.stopPropagation(); onNavigate('/account'); }}
                    style={{ fontSize: '0.88rem', padding: '6px', borderRadius: '4px', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <ShieldCheck size={16} color="#ff9900" />
                    <span>Your Account Settings</span>
                  </div>
                  <div
                    onClick={(e) => { e.stopPropagation(); onNavigate('/orders'); }}
                    style={{ fontSize: '0.88rem', padding: '6px', borderRadius: '4px', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Package size={16} color="#00f2fe" />
                    <span>Your Orders & Live Tracking</span>
                  </div>
                  <div
                    onClick={(e) => { e.stopPropagation(); onNavigate('/wishlist'); }}
                    style={{ fontSize: '0.88rem', padding: '6px', borderRadius: '4px', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Heart size={16} color="#da3633" />
                    <span>Your Hardware Wishlists</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Returns & Orders */}
          <div
            onClick={() => onNavigate('/orders')}
            style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', lineHeight: 1.2, padding: '4px 6px' }}
          >
            <span style={{ fontSize: '0.72rem', color: '#c9d1d9' }}>Returns</span>
            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>& Orders</span>
          </div>

          {/* Shopping Cart Button */}
          <div
            onClick={openCartDrawer}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              padding: '6px 12px',
              backgroundColor: 'rgba(255, 153, 0, 0.12)',
              border: '1px solid rgba(255, 153, 0, 0.4)',
              borderRadius: '99px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 153, 0, 0.25)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 153, 0, 0.12)')}
          >
            <div style={{ position: 'relative' }}>
              <ShoppingCart size={22} color="#ff9900" />
              {itemCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-10px',
                    backgroundColor: '#ff9900',
                    color: '#0d1117',
                    fontWeight: 800,
                    fontSize: '0.72rem',
                    borderRadius: '99px',
                    padding: '1px 6px',
                    boxShadow: '0 0 8px rgba(255, 153, 0, 0.8)',
                  }}
                >
                  {itemCount}
                </span>
              )}
            </div>
            <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>Cart</span>
          </div>
        </div>
      </div>

      {/* Secondary Bar (#232f3e): All Mega Menu & Quick Navigation */}
      <div
        style={{
          backgroundColor: 'var(--bg-subheader)',
          padding: '0.45rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          fontSize: '0.88rem',
          fontWeight: 600,
          color: '#f0f6fc',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          borderBottom: '1px solid #30363d',
        }}
      >
        {/* All Mega Menu Trigger */}
        <button
          onClick={onOpenMegaMenu}
          style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', fontWeight: 700 }}
        >
          <Menu size={18} />
          <span>All Hardware</span>
        </button>

        <span
          onClick={() => onNavigate('/search', { category: 'laptops' })}
          style={{ cursor: 'pointer', transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ff9900')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#f0f6fc')}
        >
          Laptops & MacBooks
        </span>
        <span
          onClick={() => onNavigate('/search', { category: 'components' })}
          style={{ cursor: 'pointer', transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ff9900')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#f0f6fc')}
        >
          PC Components & GPUs
        </span>
        <span
          onClick={() => onNavigate('/search', { category: 'monitors' })}
          style={{ cursor: 'pointer', transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ff9900')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#f0f6fc')}
        >
          OLED Gaming Monitors
        </span>
        <span
          onClick={() => onNavigate('/search', { category: 'peripherals' })}
          style={{ cursor: 'pointer', transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ff9900')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#f0f6fc')}
        >
          Keyboards & Mice
        </span>
        <span
          onClick={() => onNavigate('/search', { category: 'storage' })}
          style={{ cursor: 'pointer', transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ff9900')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#f0f6fc')}
        >
          NVMe Gen5 Storage
        </span>
        <span
          onClick={() => onNavigate('/search', { category: 'networking' })}
          style={{ cursor: 'pointer', transition: 'color 0.2s' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ff9900')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#f0f6fc')}
        >
          Wi-Fi 7 & Docks
        </span>
        <span
          onClick={() => onNavigate('/search', { primeOnly: 'true' })}
          style={{ cursor: 'pointer', color: '#00f2fe', fontWeight: 700 }}
        >
          ⚡ PrimeTech VIP Delivery
        </span>
      </div>

      {/* Deliver-to Location Switcher Modal */}
      {showAddressModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '450px',
              padding: '24px',
              borderRadius: '12px',
              boxShadow: '0 16px 48px rgba(0,0,0,0.8)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={20} color="#ff9900" /> Choose Indian Delivery Location
              </h3>
              <button onClick={() => setShowAddressModal(false)} style={{ color: '#8b949e' }}>
                <X size={20} />
              </button>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#8b949e', marginBottom: '16px' }}>
              Select where your computer hardware and PC components will be delivered across India:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  onClick={() => {
                    selectAddress(addr.id);
                    setShowAddressModal(false);
                  }}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: `2px solid ${selectedAddress.id === addr.id ? '#ff9900' : '#30363d'}`,
                    backgroundColor: selectedAddress.id === addr.id ? 'rgba(255, 153, 0, 0.1)' : '#161b22',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, color: '#fff' }}>{addr.fullName} ({addr.addressType})</span>
                    {selectedAddress.id === addr.id && (
                      <span style={{ fontSize: '0.72rem', backgroundColor: '#ff9900', color: '#000', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#c9d1d9', marginTop: '4px' }}>
                    {addr.street}, {addr.city}, {addr.state} - {addr.pinCode}
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setShowAddressModal(false);
                onNavigate('/checkout');
              }}
              style={{
                width: '100%',
                marginTop: '18px',
                padding: '10px',
                backgroundColor: '#232f3e',
                color: '#00f2fe',
                fontWeight: 700,
                borderRadius: '8px',
              }}
            >
              + Add / Manage Indian Addresses
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
