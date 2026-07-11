import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { useWishlist } from '../context/WishlistContext';
import type { Address } from '../types';
import { Package, Heart, MapPin, Zap, Lock, Headphones, Plus, CheckCircle } from 'lucide-react';

export const AccountPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { user, addresses, selectedAddress, selectAddress, addAddress } = useAuth();
  const { orders } = useOrder();
  const { wishlists } = useWishlist();

  const [activeTab, setActiveTab] = useState<'overview' | 'addresses'>('overview');

  // New Address modal state inside Account Page
  const [showAddModal, setShowAddModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Karnataka');
  const [addrType, setAddrType] = useState<'Home' | 'Work' | 'Office'>('Home');

  const handleCreateAddr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !pinCode || !street || !city) return;
    const created: Address = {
      id: `addr-${Date.now()}`,
      fullName,
      phone,
      pinCode,
      street,
      city,
      state: stateName,
      isDefault: false,
      addressType: addrType,
    };
    addAddress(created);
    selectAddress(created.id);
    setShowAddModal(false);
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '2rem auto', padding: '0 1.5rem' }}>
      {/* Profile Overview Card */}
      <div
        className="glass-panel"
        style={{
          borderRadius: '16px',
          padding: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '2.5rem',
          border: '1px solid #30363d',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.4rem' }}>
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: '#232f3e',
              border: '2px solid #ff9900',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              fontWeight: 800,
              color: '#ff9900',
            }}
          >
            {user.name ? user.name.charAt(0).toUpperCase() : 'A'}
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#fff' }}>{user.name || 'Enthusiast User'}</h1>
              {user.isPrimeMember && (
                <span style={{ backgroundColor: '#232f3e', color: '#00f2fe', padding: '4px 10px', borderRadius: '99px', fontSize: '0.78rem', fontWeight: 700, border: '1px solid #00f2fe' }}>
                  ⚡ PrimeTech India VIP
                </span>
              )}
            </div>
            <div style={{ color: '#8b949e', fontSize: '0.9rem', marginTop: '4px' }}>
              {user.email || 'aarav.sharma@primetech.in'} • Active Indian Member since 2024
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => setActiveTab('overview')} className={activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}>
            Dashboard Overview
          </button>
          <button onClick={() => setActiveTab('addresses')} className={activeTab === 'addresses' ? 'btn-primary' : 'btn-secondary'} style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem' }}>
            Your Addresses ({addresses.length})
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        /* Overview Grid */
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '1.4rem' }}>Quick Actions & Services</h2>

          <div className="grid-3" style={{ gap: '1.6rem' }}>
            {/* Card 1: Your Orders */}
            <div
              onClick={() => onNavigate('/orders')}
              className="glass-panel"
              style={{
                borderRadius: '16px',
                padding: '1.8rem',
                cursor: 'pointer',
                display: 'flex',
                gap: '1.2rem',
                alignItems: 'flex-start',
                border: '1px solid #30363d',
                transition: 'transform 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255, 153, 0, 0.15)', color: '#ff9900' }}>
                <Package size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>Your Orders</h3>
                <p style={{ fontSize: '0.86rem', color: '#8b949e', marginTop: '4px', lineHeight: 1.4 }}>
                  Track, return, buy again, or simulate delivery of your {orders.length} Indian orders.
                </p>
              </div>
            </div>

            {/* Card 2: Your Wishlists */}
            <div
              onClick={() => onNavigate('/wishlist')}
              className="glass-panel"
              style={{
                borderRadius: '16px',
                padding: '1.8rem',
                cursor: 'pointer',
                display: 'flex',
                gap: '1.2rem',
                alignItems: 'flex-start',
                border: '1px solid #30363d',
                transition: 'transform 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(218, 54, 51, 0.15)', color: '#da3633' }}>
                <Heart size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>Your Wishlists & Builds</h3>
                <p style={{ fontSize: '0.86rem', color: '#8b949e', marginTop: '4px', lineHeight: 1.4 }}>
                  Manage your {wishlists.length} custom PC hardware wishlists and dream setups.
                </p>
              </div>
            </div>

            {/* Card 3: Your Addresses */}
            <div
              onClick={() => setActiveTab('addresses')}
              className="glass-panel"
              style={{
                borderRadius: '16px',
                padding: '1.8rem',
                cursor: 'pointer',
                display: 'flex',
                gap: '1.2rem',
                alignItems: 'flex-start',
                border: '1px solid #30363d',
                transition: 'transform 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe' }}>
                <MapPin size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>Your Addresses</h3>
                <p style={{ fontSize: '0.86rem', color: '#8b949e', marginTop: '4px', lineHeight: 1.4 }}>
                  Edit, add, or set default delivery locations ({selectedAddress.city} currently selected).
                </p>
              </div>
            </div>

            {/* Card 4: PrimeTech India VIP */}
            <div
              className="glass-panel"
              style={{
                borderRadius: '16px',
                padding: '1.8rem',
                display: 'flex',
                gap: '1.2rem',
                alignItems: 'flex-start',
                border: '1px solid #30363d',
              }}
            >
              <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(46, 160, 67, 0.15)', color: '#2ea043' }}>
                <Zap size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>PrimeTech Membership</h3>
                <p style={{ fontSize: '0.86rem', color: '#8b949e', marginTop: '4px', lineHeight: 1.4 }}>
                  Enjoying FREE One-Day Delivery across India, priority RTX 5090 restocks, and exclusive deals.
                </p>
              </div>
            </div>

            {/* Card 5: Login & Security */}
            <div
              className="glass-panel"
              style={{
                borderRadius: '16px',
                padding: '1.8rem',
                display: 'flex',
                gap: '1.2rem',
                alignItems: 'flex-start',
                border: '1px solid #30363d',
              }}
            >
              <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(255, 153, 0, 0.15)', color: '#ff9900' }}>
                <Lock size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>Login & Local Security</h3>
                <p style={{ fontSize: '0.86rem', color: '#8b949e', marginTop: '4px', lineHeight: 1.4 }}>
                  Encrypted local-first session credentials (`localStorage` isolation) active.
                </p>
              </div>
            </div>

            {/* Card 6: Customer Support India */}
            <div
              onClick={() => alert("PrimeTech India Priority Support:\nCall: 1800-419-2026 (Toll Free 24x7)\nEmail: support@primetech.in\nHub: Koramangala Stage 4, Bengaluru")}
              className="glass-panel"
              style={{
                borderRadius: '16px',
                padding: '1.8rem',
                cursor: 'pointer',
                display: 'flex',
                gap: '1.2rem',
                alignItems: 'flex-start',
                border: '1px solid #30363d',
              }}
            >
              <div style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'rgba(0, 242, 254, 0.15)', color: '#00f2fe' }}>
                <Headphones size={28} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff' }}>India Priority Support</h3>
                <p style={{ fontSize: '0.86rem', color: '#8b949e', marginTop: '4px', lineHeight: 1.4 }}>
                  Connect instantly with our hardware specialists in Bengaluru & Mumbai.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Address Book Management */
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.6rem' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>Your Saved Indian Addresses</h2>
            <button onClick={() => setShowAddModal(true)} className="btn-primary" style={{ padding: '0.65rem 1.4rem', gap: '6px' }}>
              <Plus size={16} />
              <span>Add New Indian Address</span>
            </button>
          </div>

          <div className="grid-3" style={{ gap: '1.6rem' }}>
            {addresses.map((addr) => {
              const isSelected = selectedAddress.id === addr.id;
              return (
                <div
                  key={addr.id}
                  className="glass-panel"
                  style={{
                    borderRadius: '16px',
                    padding: '1.6rem',
                    border: isSelected ? '2px solid #ff9900' : '1px solid #30363d',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                      <span style={{ fontWeight: 800, color: '#fff', fontSize: '1.1rem' }}>{addr.fullName}</span>
                      <span style={{ fontSize: '0.75rem', backgroundColor: '#232f3e', color: '#00f2fe', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
                        {addr.addressType}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.9rem', color: '#c9d1d9', lineHeight: 1.5 }}>
                      {addr.street}<br />
                      {addr.city}, {addr.state} - {addr.pinCode}<br />
                      India
                    </div>

                    <div style={{ fontSize: '0.82rem', color: '#8b949e', marginTop: '8px' }}>
                      Mobile: {addr.phone}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(48, 54, 61, 0.4)', paddingTop: '12px', marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {isSelected ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2ea043', fontWeight: 700, fontSize: '0.85rem' }}>
                        <CheckCircle size={16} />
                        <span>Active Delivery Target</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => selectAddress(addr.id)}
                        style={{ color: '#00f2fe', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                      >
                        Set as Active Target
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Add Address Modal */}
          {showAddModal && (
            <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
              <div className="glass-panel" style={{ width: '100%', maxWidth: '540px', padding: '24px', borderRadius: '16px' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>Add New Delivery Address</h3>
                <form onSubmit={handleCreateAddr} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="grid-2" style={{ gap: '12px' }}>
                    <input type="text" placeholder="Full Name (e.g. Priya Patel)" value={fullName} onChange={(e) => setFullName(e.target.value)} required style={{ padding: '10px', backgroundColor: '#161b22', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }} />
                    <input type="text" placeholder="Mobile Number (+91)" value={phone} onChange={(e) => setPhone(e.target.value)} required style={{ padding: '10px', backgroundColor: '#161b22', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }} />
                    <input type="text" placeholder="PIN Code (e.g. 400050)" value={pinCode} onChange={(e) => setPinCode(e.target.value)} required style={{ padding: '10px', backgroundColor: '#161b22', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }} />
                    <input type="text" placeholder="City / District (e.g. Mumbai)" value={city} onChange={(e) => setCity(e.target.value)} required style={{ padding: '10px', backgroundColor: '#161b22', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }} />
                  </div>
                  <input type="text" placeholder="Flat, House no., Building, Apartment, Street" value={street} onChange={(e) => setStreet(e.target.value)} required style={{ width: '100%', padding: '10px', backgroundColor: '#161b22', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }} />
                  <div className="grid-2" style={{ gap: '12px' }}>
                    <input type="text" placeholder="State (e.g. Maharashtra)" value={stateName} onChange={(e) => setStateName(e.target.value)} required style={{ padding: '10px', backgroundColor: '#161b22', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }} />
                    <select value={addrType} onChange={(e) => setAddrType(e.target.value as 'Home' | 'Work' | 'Office')} style={{ padding: '10px', backgroundColor: '#161b22', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }}>
                      <option value="Home">Home</option>
                      <option value="Work">Work</option>
                      <option value="Office">Office</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                    <button type="submit" className="btn-primary" style={{ flex: 1, padding: '10px' }}>Save Address</button>
                    <button type="button" onClick={() => setShowAddModal(false)} className="btn-secondary" style={{ flex: 1, padding: '10px' }}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
