import React, { useState } from 'react';
import type { Product } from '../../types';
import { useAdmin } from '../../context/AdminContext';
import { ProductEditModal } from '../../components/admin/ProductEditModal';
import { formatINR } from '../../utils/formatters';
import { PlusCircle, Search, Trash2, Edit, Zap, Package, ArrowUpRight } from 'lucide-react';

export const AdminProductsPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { products, deleteProduct, updateStock, toggleLightningDeal } = useAdmin();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleOpenEdit = (product: Product) => {
    setProductToEdit(product);
    setShowModal(true);
  };

  const handleOpenCreate = () => {
    setProductToEdit(null);
    setShowModal(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#161b22', padding: '1.4rem', borderRadius: '12px', border: '1px solid #30363d' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Package size={26} color="#ff9900" />
            <span>Hardware Catalog & Inventory ({products.length} SKUs)</span>
          </h1>
          <p style={{ color: '#8b949e', margin: '4px 0 0', fontSize: '0.88rem' }}>
            Add new computer components, edit Indian prices (`₹`), adjust stock levels, and toggle homepage Lightning Deals.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', fontSize: '0.92rem' }}
        >
          <PlusCircle size={18} />
          <span>+ Create New Hardware Item</span>
        </button>
      </div>

      {/* Search and Category Filters */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
          <Search size={18} color="#8b949e" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search SKUs by title or brand (e.g. RTX 4090, ASUS, Corsair)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 38px', backgroundColor: '#161b22', border: '1px solid #30363d', color: '#fff', borderRadius: '8px' }}
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ padding: '10px 16px', backgroundColor: '#161b22', border: '1px solid #30363d', color: '#fff', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
        >
          <option value="all">All Departments</option>
          <option value="laptops">Laptops</option>
          <option value="components">PC Components & GPUs</option>
          <option value="monitors">Monitors</option>
          <option value="peripherals">Keyboards & Peripherals</option>
          <option value="storage">NVMe SSDs & Storage</option>
          <option value="networking">Networking</option>
        </select>
      </div>

      {/* Catalog Table */}
      <div className="glass-panel" style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid #30363d' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#1f242d', color: '#8b949e', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              <th style={{ padding: '14px 16px' }}>Hardware SKU</th>
              <th style={{ padding: '14px 16px' }}>Category</th>
              <th style={{ padding: '14px 16px' }}>Price (₹ INR)</th>
              <th style={{ padding: '14px 16px' }}>Stock (Qty)</th>
              <th style={{ padding: '14px 16px' }}>Lightning Deal</th>
              <th style={{ padding: '14px 16px', textAlign: 'right' }}>Quick Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: '#8b949e' }}>
                  No hardware matching your search filters. Click "+ Create New Hardware Item" to add one!
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid #30363d', transition: 'background-color 0.15s' }}>
                  {/* SKU / Image */}
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={p.images[0]} alt="" style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', border: '1px solid #30363d' }} />
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#fff', maxWidth: '340px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {p.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#8b949e', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#ff9900', fontWeight: 700 }}>{p.brand}</span> • ★ {p.rating} ({p.reviewsCount} reviews)
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ backgroundColor: '#21262d', color: '#c9d1d9', padding: '4px 8px', borderRadius: '4px', fontSize: '0.78rem', fontWeight: 600, textTransform: 'capitalize' }}>
                      {p.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td style={{ padding: '12px 16px', fontWeight: 800, color: '#fff', fontSize: '0.95rem' }}>
                    {formatINR(p.price)}
                  </td>

                  {/* Stock Controls */}
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        onClick={() => updateStock(p.id, p.stockCount - 1)}
                        style={{ width: '26px', height: '26px', borderRadius: '4px', backgroundColor: '#21262d', color: '#fff', border: '1px solid #30363d', cursor: 'pointer', fontWeight: 800 }}
                      >
                        -
                      </button>
                      <span style={{ fontWeight: 800, color: p.stockCount <= 5 ? '#f85149' : '#3fb950', minWidth: '36px', textAlign: 'center' }}>
                        {p.stockCount}
                      </span>
                      <button
                        onClick={() => updateStock(p.id, p.stockCount + 1)}
                        style={{ width: '26px', height: '26px', borderRadius: '4px', backgroundColor: '#21262d', color: '#fff', border: '1px solid #30363d', cursor: 'pointer', fontWeight: 800 }}
                      >
                        +
                      </button>
                    </div>
                  </td>

                  {/* Lightning Deal Toggle */}
                  <td style={{ padding: '12px 16px' }}>
                    <button
                      onClick={() => toggleLightningDeal(p.id, !p.isLightningDeal)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        backgroundColor: p.isLightningDeal ? 'rgba(255, 153, 0, 0.15)' : 'rgba(139, 148, 158, 0.15)',
                        color: p.isLightningDeal ? '#ff9900' : '#8b949e',
                        border: `1px solid ${p.isLightningDeal ? '#ff9900' : 'transparent'}`,
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                      }}
                    >
                      <Zap size={13} />
                      <span>{p.isLightningDeal ? 'Active Deal ⚡' : 'Normal'}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        onClick={() => onNavigate(`/product/${p.id}`)}
                        title="View live on customer storefront"
                        style={{ padding: '6px', backgroundColor: '#21262d', color: '#00f2fe', border: '1px solid #30363d', borderRadius: '6px', cursor: 'pointer' }}
                      >
                        <ArrowUpRight size={16} />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(p)}
                        title="Edit specifications, price, and options"
                        style={{ padding: '6px', backgroundColor: '#21262d', color: '#ff9900', border: '1px solid #30363d', borderRadius: '6px', cursor: 'pointer' }}
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Are you sure you want to delete ${p.title}?`)) {
                            deleteProduct(p.id);
                          }
                        }}
                        title="Delete from catalog"
                        style={{ padding: '6px', backgroundColor: 'rgba(248,81,73,0.15)', color: '#f85149', border: '1px solid rgba(248,81,73,0.3)', borderRadius: '6px', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && <ProductEditModal productToEdit={productToEdit} onClose={() => setShowModal(false)} />}
    </div>
  );
};
