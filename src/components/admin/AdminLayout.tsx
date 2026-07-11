import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useOrder } from '../../context/OrderContext';
import { LayoutDashboard, Package, Truck, Tag, MessageSquare, ShoppingCart, RefreshCw, ShieldCheck, Zap, AlertCircle } from 'lucide-react';

interface AdminLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ currentPath, onNavigate, children }) => {
  const { products, coupons, resetToDefaultSeeds, setIsAdminMode } = useAdmin();
  const { orders } = useOrder();

  const lowStockCount = products.filter((p) => p.stockCount <= 5).length;
  const pendingOrdersCount = orders.filter((o) => o.currentStatus !== 'Delivered').length;

  const navItems = [
    { label: 'Dashboard & KPIs', path: '/admin', icon: LayoutDashboard, count: null },
    { label: 'Inventory & Catalog', path: '/admin/inventory', icon: Package, count: products.length, alert: lowStockCount > 0 ? `${lowStockCount} Low` : null },
    { label: 'Orders & Shipments', path: '/admin/orders', icon: Truck, count: orders.length, alert: pendingOrdersCount > 0 ? `${pendingOrdersCount} Active` : null },
    { label: 'Coupons & Deals', path: '/admin/coupons', icon: Tag, count: coupons.length, alert: null },
    { label: 'Reviews Moderation', path: '/admin/reviews', icon: MessageSquare, count: null, alert: null },
  ];

  const handleReturnToStore = () => {
    setIsAdminMode(false);
    onNavigate('/');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#0d1117', color: '#e6edf3', fontFamily: 'var(--font-sans)' }}>
      {/* Golden Admin Mode Banner */}
      <div
        style={{
          backgroundColor: '#ff9900',
          color: '#000',
          padding: '8px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontWeight: 700,
          fontSize: '0.88rem',
          boxShadow: '0 2px 10px rgba(255,153,0,0.3)',
          zIndex: 100,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldCheck size={18} />
          <span>PrimeTech India Store Management Suite — Local-First Real-Time Inventory & Lifecycle Controller</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={resetToDefaultSeeds}
            title="Reset store data back to default Indian seed catalog"
            style={{
              backgroundColor: 'rgba(0,0,0,0.15)',
              border: '1px solid rgba(0,0,0,0.3)',
              padding: '4px 10px',
              borderRadius: '4px',
              color: '#000',
              fontWeight: 700,
              fontSize: '0.78rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <RefreshCw size={14} />
            <span>Reset Demo Seeds</span>
          </button>
          <button
            onClick={handleReturnToStore}
            style={{
              backgroundColor: '#161b22',
              color: '#fff',
              border: '1px solid #30363d',
              padding: '5px 14px',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s',
            }}
          >
            <ShoppingCart size={15} color="#ff9900" />
            <span>Return to Customer Store 🛒</span>
          </button>
        </div>
      </div>

      {/* Main Admin Body */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left Sidebar */}
        <aside
          style={{
            width: '260px',
            backgroundColor: '#161b22',
            borderRight: '1px solid #30363d',
            padding: '1.5rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <div style={{ padding: '0 0.8rem 1.2rem', borderBottom: '1px solid #30363d', marginBottom: '1rem' }}>
            <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#fff', letterSpacing: '0.5px' }}>
              PRIMETECH <span style={{ color: '#ff9900' }}>ADMIN</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#8b949e', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Zap size={12} color="#00f2fe" />
              <span>Real-Time Storefront Sync Active</span>
            </div>
          </div>

          <div style={{ fontSize: '0.72rem', fontWeight: 800, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '1px', margin: '0.5rem 0.8rem 0.3rem' }}>
            Store Management
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: '8px',
                  backgroundColor: isActive ? 'rgba(255, 153, 0, 0.15)' : 'transparent',
                  border: isActive ? '1px solid #ff9900' : '1px solid transparent',
                  color: isActive ? '#ff9900' : '#c9d1d9',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.92rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={18} />
                  <span>{item.label}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {item.alert && (
                    <span
                      style={{
                        backgroundColor: '#f85149',
                        color: '#fff',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        padding: '2px 6px',
                        borderRadius: '10px',
                      }}
                    >
                      {item.alert}
                    </span>
                  )}
                  {item.count !== null && !item.alert && (
                    <span
                      style={{
                        backgroundColor: '#21262d',
                        color: '#8b949e',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '10px',
                      }}
                    >
                      {item.count}
                    </span>
                  )}
                </div>
              </button>
            );
          })}

          <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid #30363d', paddingBottom: '0.5rem' }}>
            <div style={{ backgroundColor: '#0d1117', padding: '1rem', borderRadius: '8px', border: '1px solid #30363d' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00f2fe', fontSize: '0.8rem', fontWeight: 700 }}>
                <AlertCircle size={14} />
                <span>Instant Store Sync</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: '#8b949e', margin: '6px 0 0', lineHeight: 1.4 }}>
                Edits to prices (`₹`), stock (`Qty`), and coupons (`TECHPRO10`) reflect across Indian checkout immediately.
              </p>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
};
