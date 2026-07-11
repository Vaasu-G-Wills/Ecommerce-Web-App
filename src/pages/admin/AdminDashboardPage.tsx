import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useOrder } from '../../context/OrderContext';
import { formatINR } from '../../utils/formatters';
import { TrendingUp, Package, Truck, Users, AlertTriangle, PlusCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AdminDashboardPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { products, coupons, updateStock } = useAdmin();
  const { orders, simulateNextStatus } = useOrder();

  const totalRevenue = orders.reduce((sum, order) => {
    if (order.currentStatus === 'Delivered' || order.currentStatus !== 'Order Placed') {
      return sum + order.totalAmount;
    }
    return sum + order.totalAmount;
  }, 0);

  const lowStockProducts = products.filter((p) => p.stockCount <= 5);
  const activeOrders = orders.filter((o) => o.currentStatus !== 'Delivered');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Top Welcome Section */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#161b22', padding: '1.6rem', borderRadius: '12px', border: '1px solid #30363d' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', margin: 0 }}>
            Store KPI Dashboard 🇮🇳
          </h1>
          <p style={{ color: '#8b949e', margin: '4px 0 0', fontSize: '0.9rem' }}>
            Real-time overview of PrimeTech India hardware sales, active shipments, and critical inventory metrics.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => onNavigate('/admin/inventory')}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px' }}
          >
            <PlusCircle size={18} />
            <span>Manage Inventory</span>
          </button>
          <button
            onClick={() => onNavigate('/admin/orders')}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px' }}
          >
            <Truck size={18} color="#00f2fe" />
            <span>View All Orders ({orders.length})</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid-4" style={{ gap: '1.2rem' }}>
        <div className="glass-panel" style={{ padding: '1.4rem', borderRadius: '12px', border: '1px solid rgba(255,153,0,0.3)', background: 'linear-gradient(135deg, rgba(255,153,0,0.1) 0%, rgba(22,27,34,0.8) 100%)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#8b949e', fontSize: '0.85rem', fontWeight: 700 }}>
            <span>TOTAL STORE REVENUE</span>
            <TrendingUp size={20} color="#ff9900" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginTop: '10px' }}>
            {formatINR(totalRevenue)}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#3fb950', marginTop: '6px', fontWeight: 600 }}>
            +24.5% vs last month across India
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.4rem', borderRadius: '12px', border: '1px solid #30363d' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#8b949e', fontSize: '0.85rem', fontWeight: 700 }}>
            <span>TOTAL HARDWARE ORDERS</span>
            <Truck size={20} color="#00f2fe" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginTop: '10px' }}>
            {orders.length} Orders
          </div>
          <div style={{ fontSize: '0.78rem', color: '#00f2fe', marginTop: '6px', fontWeight: 600 }}>
            {activeOrders.length} currently in transit
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.4rem', borderRadius: '12px', border: '1px solid #30363d' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#8b949e', fontSize: '0.85rem', fontWeight: 700 }}>
            <span>ACTIVE PRODUCT CATALOG</span>
            <Package size={20} color="#a371f7" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginTop: '10px' }}>
            {products.length} SKUs
          </div>
          <div style={{ fontSize: '0.78rem', color: '#a371f7', marginTop: '6px', fontWeight: 600 }}>
            6 major hardware departments
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.4rem', borderRadius: '12px', border: '1px solid #30363d' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#8b949e', fontSize: '0.85rem', fontWeight: 700 }}>
            <span>PROMOTIONAL COUPONS</span>
            <Users size={20} color="#3fb950" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff', marginTop: '10px' }}>
            {coupons.length} Active Codes
          </div>
          <div style={{ fontSize: '0.78rem', color: '#3fb950', marginTop: '6px', fontWeight: 600 }}>
            TECHPRO10 & custom codes active
          </div>
        </div>
      </div>

      {/* Middle Grid: Low Stock Alert & Quick Actions */}
      <div className="grid-2" style={{ gap: '1.5rem' }}>
        {/* Low Stock Watch */}
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '12px', border: lowStockProducts.length > 0 ? '1px solid rgba(248,81,73,0.5)' : '1px solid #30363d' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #30363d', paddingBottom: '12px', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f85149', fontWeight: 800, fontSize: '1rem' }}>
              <AlertTriangle size={20} />
              <span>Low Stock Alerts ({lowStockProducts.length})</span>
            </div>
            <button onClick={() => onNavigate('/admin/inventory')} style={{ color: '#00f2fe', fontSize: '0.82rem', fontWeight: 700, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>Manage Catalog</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {lowStockProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#8b949e' }}>
              <CheckCircle2 size={36} color="#3fb950" style={{ margin: '0 auto 10px' }} />
              <div style={{ fontWeight: 700, color: '#fff' }}>All Hardware Fully Stocked!</div>
              <p style={{ fontSize: '0.82rem', margin: '4px 0 0' }}>Every item in the catalog currently has healthy inventory levels above 5 units.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {lowStockProducts.slice(0, 4).map((p) => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: '#0d1117', borderRadius: '8px', border: '1px solid #30363d' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={p.images[0]} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#fff', maxWidth: '260px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {p.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#f85149', fontWeight: 700 }}>
                        ⚠️ Only {p.stockCount} units remaining
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => updateStock(p.id, p.stockCount + 15)}
                    style={{
                      backgroundColor: 'rgba(63, 185, 80, 0.15)',
                      color: '#3fb950',
                      border: '1px solid #3fb950',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <PlusCircle size={14} />
                    <span>Quick Restock +15</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Orders Activity */}
        <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid #30363d' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #30363d', paddingBottom: '12px', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: 800, fontSize: '1rem' }}>
              <Truck size={20} color="#00f2fe" />
              <span>Recent Indian Orders ({activeOrders.length} Active)</span>
            </div>
            <button onClick={() => onNavigate('/admin/orders')} style={{ color: '#00f2fe', fontSize: '0.82rem', fontWeight: 700, backgroundColor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>Order Manager</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {orders.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#8b949e' }}>
              <div>No orders placed yet.</div>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {orders.slice(0, 4).map((order) => (
                <div key={order.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: '#0d1117', borderRadius: '8px', border: '1px solid #30363d' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#fff' }}>
                      {order.orderNumber}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#8b949e' }}>
                      {order.shippingAddress.city}, {order.shippingAddress.state} | {formatINR(order.totalAmount)}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        backgroundColor: order.currentStatus === 'Delivered' ? 'rgba(63, 185, 80, 0.15)' : 'rgba(255, 153, 0, 0.15)',
                        color: order.currentStatus === 'Delivered' ? '#3fb950' : '#ff9900',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                      }}
                    >
                      {order.currentStatus}
                    </span>

                    {order.currentStatus !== 'Delivered' && (
                      <button
                        onClick={() => simulateNextStatus(order.id)}
                        title="Simulate advancing this order to next status in timeline"
                        style={{
                          backgroundColor: '#161b22',
                          color: '#00f2fe',
                          border: '1px solid #00f2fe',
                          padding: '5px 10px',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          cursor: 'pointer',
                        }}
                      >
                        ⚡ Advance Status
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
