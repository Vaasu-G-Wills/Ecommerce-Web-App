import React from 'react';
import { X, ChevronRight, User, ShieldCheck, HelpCircle, Laptop, Cpu, Monitor, Keyboard, HardDrive, Wifi } from 'lucide-react';
import { CATEGORIES } from '../../data/categories';
import { useAuth } from '../../context/AuthContext';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (path: string, queryParams?: Record<string, string>) => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  const { user } = useAuth();

  if (!isOpen) return null;

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'laptops':
        return <Laptop size={18} color="#ff9900" />;
      case 'components':
        return <Cpu size={18} color="#00f2fe" />;
      case 'monitors':
        return <Monitor size={18} color="#4facfe" />;
      case 'peripherals':
        return <Keyboard size={18} color="#2ea043" />;
      case 'storage':
        return <HardDrive size={18} color="#da3633" />;
      case 'networking':
        return <Wifi size={18} color="#8a2be2" />;
      default:
        return <Laptop size={18} color="#ff9900" />;
    }
  };

  const handleCategorySelect = (categoryId: string, subCat?: string) => {
    onClose();
    if (subCat) {
      onNavigate('/search', { category: categoryId, subCategory: subCat });
    } else {
      onNavigate('/search', { category: categoryId });
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 2000,
        display: 'flex',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Slide-out Drawer Panel */}
      <div
        className="animate-slide-in"
        style={{
          position: 'relative',
          width: '360px',
          maxWidth: '85vw',
          height: '100%',
          backgroundColor: '#0d1117',
          color: '#f0f6fc',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
          boxShadow: '8px 0 32px rgba(0, 0, 0, 0.8)',
          borderRight: '1px solid #30363d',
          zIndex: 2001,
        }}
      >
        {/* Header Bar */}
        <div
          style={{
            backgroundColor: '#232f3e',
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid #30363d',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '1.1rem' }}>
            <User size={24} color="#ff9900" />
            <span>Hello, {user.name}</span>
          </div>
          <button onClick={onClose} style={{ color: '#fff', padding: '4px' }}>
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column' }}>
          {/* Section 1: Trending & Deals */}
          <div style={{ padding: '0 20px 12px', fontSize: '0.85rem', fontWeight: 800, color: '#8b949e', letterSpacing: '0.5px' }}>
            TRENDING IN INDIA
          </div>
          <div
            onClick={() => { onClose(); onNavigate('/'); }}
            style={{ padding: '12px 20px', cursor: 'pointer', transition: 'background 0.2s', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#161b22')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <span>⚡ Lightning Tech Deals</span>
            <ChevronRight size={18} color="#8b949e" />
          </div>
          <div
            onClick={() => { onClose(); onNavigate('/search', { sortBy: 'newest' }); }}
            style={{ padding: '12px 20px', cursor: 'pointer', transition: 'background 0.2s', fontWeight: 600, display: 'flex', justifyContent: 'space-between' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#161b22')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <span>🔥 New Releases (2026 Hardware)</span>
            <ChevronRight size={18} color="#8b949e" />
          </div>

          <div style={{ height: '1px', backgroundColor: '#30363d', margin: '16px 0' }} />

          {/* Section 2: Hardware Categories Taxonomy */}
          <div style={{ padding: '0 20px 12px', fontSize: '0.85rem', fontWeight: 800, color: '#8b949e', letterSpacing: '0.5px' }}>
            SHOP BY DEPARTMENT
          </div>

          {CATEGORIES.map((cat) => (
            <div key={cat.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <div
                onClick={() => handleCategorySelect(cat.id)}
                style={{
                  padding: '12px 20px',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#161b22')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {getCategoryIcon(cat.id)}
                  <span>{cat.name}</span>
                </div>
                <ChevronRight size={18} color="#8b949e" />
              </div>

              {/* Subcategories list indented */}
              <div style={{ paddingLeft: '48px', paddingBottom: '8px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {cat.subCategories.map((sub) => (
                  <span
                    key={sub}
                    onClick={() => handleCategorySelect(cat.id, sub)}
                    style={{
                      fontSize: '0.85rem',
                      color: '#c9d1d9',
                      cursor: 'pointer',
                      padding: '4px 0',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ff9900')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#c9d1d9')}
                  >
                    {sub}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div style={{ height: '1px', backgroundColor: '#30363d', margin: '16px 0' }} />

          {/* Section 3: Help & Settings */}
          <div style={{ padding: '0 20px 12px', fontSize: '0.85rem', fontWeight: 800, color: '#8b949e', letterSpacing: '0.5px' }}>
            HELP & SETTINGS
          </div>
          <div
            onClick={() => { onClose(); onNavigate('/account'); }}
            style={{ padding: '12px 20px', cursor: 'pointer', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '12px' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#161b22')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <ShieldCheck size={18} color="#ff9900" />
            <span>Your Account Dashboard</span>
          </div>
          <div
            onClick={() => { onClose(); onNavigate('/orders'); }}
            style={{ padding: '12px 20px', cursor: 'pointer', transition: 'background 0.2s', display: 'flex', alignItems: 'center', gap: '12px' }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#161b22')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            <HelpCircle size={18} color="#00f2fe" />
            <span>Customer Service & Tracking</span>
          </div>
        </div>
      </div>
    </div>
  );
};
