import React, { useState } from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatINR } from '../utils/formatters';
import { Heart, Plus, Trash2, ShoppingBag, Lock, Globe, ChevronRight } from 'lucide-react';

export const WishlistPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { wishlists, activeWishlistId, setActiveWishlistId, createWishlist, deleteWishlist, removeFromWishlist, moveItemToCart } = useWishlist();
  const { addToCart } = useCart();

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [newListPrivate, setNewListPrivate] = useState(false);

  const activeWl = wishlists.find((w) => w.id === activeWishlistId) || wishlists[0];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;
    createWishlist(newListName, newListPrivate);
    setNewListName('');
    setShowCreateForm(false);
  };

  const handleAddAllToCart = () => {
    if (!activeWl) return;
    activeWl.items.forEach((item) => {
      addToCart(item.product);
    });
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '2rem auto', padding: '0 1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#8b949e', marginBottom: '1.2rem' }}>
        <span onClick={() => onNavigate('/account')} style={{ cursor: 'pointer', color: '#c9d1d9' }}>Your Account</span>
        <ChevronRight size={14} />
        <span style={{ color: '#ff9900', fontWeight: 600 }}>Your Hardware Wishlists & Builds</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px minmax(0, 1fr)', gap: '2.5rem', alignItems: 'flex-start' }}>
        {/* Left Sidebar: Wishlists List */}
        <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.4rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #30363d', paddingBottom: '12px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Heart size={18} color="#da3633" />
              <span>Your Lists ({wishlists.length})</span>
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {wishlists.map((wl) => {
              const isActive = wl.id === activeWl?.id;
              return (
                <div
                  key={wl.id}
                  onClick={() => setActiveWishlistId(wl.id)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    backgroundColor: isActive ? 'rgba(255, 153, 0, 0.12)' : '#161b22',
                    border: `1px solid ${isActive ? '#ff9900' : '#30363d'}`,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', overflow: 'hidden' }}>
                    <span style={{ fontWeight: 700, color: isActive ? '#ff9900' : '#fff', fontSize: '0.92rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {wl.name}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#8b949e', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {wl.isPrivate ? <Lock size={12} /> : <Globe size={12} />}
                      <span>{wl.isPrivate ? 'Private' : 'Shared'} • {wl.items.length} items</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {!showCreateForm ? (
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn-secondary"
              style={{ width: '100%', padding: '0.65rem', gap: '6px', fontSize: '0.85rem' }}
            >
              <Plus size={16} />
              <span>Create New Wishlist</span>
            </button>
          ) : (
            <form onSubmit={handleCreate} style={{ display: 'flex', flexDirection: 'column', gap: '10px', backgroundColor: '#161b22', padding: '12px', borderRadius: '8px', border: '1px solid #30363d' }}>
              <input
                type="text"
                placeholder="List Name (e.g. My PC Build)"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                required
                style={{ padding: '8px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px', fontSize: '0.85rem' }}
              />
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#c9d1d9' }}>
                <input type="checkbox" checked={newListPrivate} onChange={(e) => setNewListPrivate(e.target.checked)} style={{ accentColor: '#ff9900' }} />
                <span>Keep list private</span>
              </label>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '6px', fontSize: '0.8rem' }}>Save</button>
                <button type="button" onClick={() => setShowCreateForm(false)} className="btn-secondary" style={{ flex: 1, padding: '6px', fontSize: '0.8rem' }}>Cancel</button>
              </div>
            </form>
          )}
        </div>

        {/* Right Area: Active Wishlist Content */}
        <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.8rem' }}>
          {activeWl ? (
            <div>
              {/* Header Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #30363d', paddingBottom: '16px', marginBottom: '1.6rem', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>{activeWl.name}</h2>
                    <span style={{ fontSize: '0.75rem', backgroundColor: '#232f3e', color: '#00f2fe', padding: '3px 8px', borderRadius: '99px', fontWeight: 700 }}>
                      {activeWl.isPrivate ? '🔒 Private List' : '🌐 Shared List'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#8b949e', marginTop: '4px' }}>
                    Created locally on PrimeTech India • {activeWl.items.length} items saved
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  {activeWl.items.length > 0 && (
                    <button onClick={handleAddAllToCart} className="btn-primary" style={{ padding: '0.65rem 1.4rem', fontSize: '0.88rem', gap: '6px' }}>
                      <ShoppingBag size={16} />
                      <span>Add All to Cart</span>
                    </button>
                  )}
                  {wishlists.length > 1 && (
                    <button
                      onClick={() => deleteWishlist(activeWl.id)}
                      style={{ padding: '0.65rem 1rem', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#da3633', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600 }}
                    >
                      <Trash2 size={16} />
                      <span>Delete List</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Items in List */}
              {activeWl.items.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#8b949e' }}>
                  <Heart size={44} style={{ margin: '0 auto 12px', opacity: 0.3 }} />
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff' }}>This wishlist is empty</div>
                  <p style={{ fontSize: '0.88rem', marginTop: '6px' }}>Click the heart icon on any product page or search result to save hardware here.</p>
                  <button onClick={() => onNavigate('/')} className="btn-primary" style={{ marginTop: '1.4rem', padding: '0.65rem 1.6rem' }}>
                    Explore Hardware Catalog
                  </button>
                </div>
              ) : (
                <div className="grid-3" style={{ gap: '1.4rem' }}>
                  {activeWl.items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        backgroundColor: '#161b22',
                        borderRadius: '12px',
                        border: '1px solid #30363d',
                        padding: '14px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div
                          onClick={() => onNavigate(`/product/${item.product.id}`)}
                          style={{ width: '100%', height: '170px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#0d1117', cursor: 'pointer', marginBottom: '1rem' }}
                        >
                          <img src={item.product.images[0]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#ff9900', textTransform: 'uppercase' }}>
                          {item.product.brand}
                        </span>

                        <h4
                          onClick={() => onNavigate(`/product/${item.product.id}`)}
                          style={{ fontWeight: 700, color: '#fff', cursor: 'pointer', margin: '4px 0 8px', fontSize: '0.95rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
                        >
                          {item.product.title}
                        </h4>

                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', fontFamily: "'JetBrains Mono', monospace" }}>
                          {formatINR(item.product.price)}
                        </span>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                        <button
                          onClick={() => moveItemToCart(item.product.id, activeWl.id)}
                          className="btn-primary"
                          style={{ flex: 1, padding: '0.6rem', fontSize: '0.85rem' }}
                        >
                          <ShoppingBag size={15} />
                          <span>Move to Cart</span>
                        </button>
                        <button
                          onClick={() => removeFromWishlist(item.product.id, activeWl.id)}
                          style={{ padding: '0.6rem 0.8rem', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#da3633', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div style={{ color: '#8b949e' }}>Select a wishlist on the left.</div>
          )}
        </div>
      </div>
    </div>
  );
};
