import React, { useState } from 'react';
import type { Product } from '../../types';
import { useAdmin } from '../../context/AdminContext';
import { X, Sparkles, Laptop, Monitor, Keyboard, Plus, Trash2 } from 'lucide-react';

interface ProductEditModalProps {
  productToEdit?: Product | null;
  onClose: () => void;
}

export const ProductEditModal: React.FC<ProductEditModalProps> = ({ productToEdit, onClose }) => {
  const { addProduct, updateProduct, applyProductTemplate } = useAdmin();

  const [title, setTitle] = useState(productToEdit?.title || '');
  const [shortDescription, setShortDescription] = useState(productToEdit?.shortDescription || '');
  const [brand, setBrand] = useState(productToEdit?.brand || '');
  const [category, setCategory] = useState(productToEdit?.category || 'laptops');
  const [subCategory, setSubCategory] = useState(productToEdit?.subCategory || 'Gaming Laptops');
  const [price, setPrice] = useState<number>(productToEdit?.price || 99990);
  const [originalPrice, setOriginalPrice] = useState<number>(productToEdit?.originalPrice || 119990);
  const [stockCount, setStockCount] = useState<number>(productToEdit?.stockCount || 15);
  const [imageUrl, setImageUrl] = useState(productToEdit?.images?.[0] || 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80');
  const [isLightningDeal, setIsLightningDeal] = useState<boolean>(productToEdit?.isLightningDeal || false);

  const [specs, setSpecs] = useState<{ label: string; value: string }[]>(
    productToEdit?.specs || [
      { label: 'Processor', value: 'Intel Core i7 14700HX' },
      { label: 'Graphics', value: 'NVIDIA RTX 4060 8GB' },
      { label: 'Memory', value: '16GB DDR5 5600MHz' },
      { label: 'Storage', value: '1TB NVMe M.2 SSD' },
    ]
  );

  const handleApplyTemplate = (type: 'gaming-laptop' | 'custom-pc' | 'mechanical-keyboard') => {
    const template = applyProductTemplate(type);
    setTitle(template.title);
    setShortDescription(template.shortDescription);
    setBrand(template.brand);
    setCategory(template.category);
    setSubCategory(template.subCategory);
    setPrice(template.price);
    setOriginalPrice(template.originalPrice || template.price * 1.2);
    setStockCount(template.stockCount);
    setImageUrl(template.images[0]);
    setIsLightningDeal(!!template.isLightningDeal);
    setSpecs(template.specs);
  };

  const handleAddSpec = () => {
    setSpecs([...specs, { label: 'New Spec', value: 'Value' }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: 'label' | 'value', val: string) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !brand || price <= 0) return;

    const finalProductData: Product = {
      id: productToEdit?.id || `prod-${Date.now()}`,
      title,
      shortDescription,
      brand,
      category,
      subCategory,
      price: Number(price),
      originalPrice: Number(originalPrice),
      rating: productToEdit?.rating || 4.8,
      reviewsCount: productToEdit?.reviewsCount || 10,
      images: [imageUrl],
      inStock: stockCount > 0,
      stockCount: Number(stockCount),
      isPrime: true,
      isLightningDeal,
      lightningDealClaimedPercentage: isLightningDeal ? 60 : undefined,
      lightningDealEndsAt: isLightningDeal ? new Date(Date.now() + 86400000).toISOString() : undefined,
      specs,
      configurations: productToEdit?.configurations || [
        { id: `cfg-${Date.now()}-1`, name: 'Base Edition', type: 'Specification Tier', priceDelta: 0, isDefault: true },
        { id: `cfg-${Date.now()}-2`, name: 'Extreme Edition (+RAM/SSD)', type: 'Specification Tier', priceDelta: 15000 },
      ],
      bulletPoints: productToEdit?.bulletPoints || [
        'Backed by PrimeTech India official localized support & warranty.',
        'Engineered with premium internal components designed for extreme Indian tropical temperatures.',
        'Fully verified for compatibility with Indian voltage grids (230V 50Hz).',
      ],
    };

    if (productToEdit) {
      updateProduct(productToEdit.id, finalProductData);
    } else {
      addProduct(finalProductData);
    }
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '1.5rem',
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          borderRadius: '16px',
          border: '1px solid #ff9900',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.4rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #30363d', paddingBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: '#fff', margin: 0 }}>
              {productToEdit ? 'Edit Hardware Product (`₹`)' : 'Create New Hardware Catalog Item (`₹`)'}
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#8b949e', margin: '4px 0 0' }}>
              Changes will instantly update on the PrimeTech India customer storefront and checkout engine.
            </p>
          </div>
          <button onClick={onClose} style={{ backgroundColor: 'transparent', border: 'none', color: '#8b949e', cursor: 'pointer' }}>
            <X size={24} />
          </button>
        </div>

        {/* Smart One-Click Pre-fill Templates */}
        {!productToEdit && (
          <div style={{ backgroundColor: '#161b22', padding: '1rem', borderRadius: '10px', border: '1px dashed #ff9900' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ff9900', fontWeight: 800, fontSize: '0.85rem', marginBottom: '10px' }}>
              <Sparkles size={16} />
              <span>One-Click Smart Pre-fill Templates (Click to Auto-Fill Specs & Prices!)</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleApplyTemplate('gaming-laptop')}
                style={{
                  backgroundColor: '#0d1117',
                  color: '#00f2fe',
                  border: '1px solid #00f2fe',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Laptop size={15} />
                <span>💻 Pre-fill Gaming Laptop (₹1,59,990)</span>
              </button>

              <button
                type="button"
                onClick={() => handleApplyTemplate('custom-pc')}
                style={{
                  backgroundColor: '#0d1117',
                  color: '#ff9900',
                  border: '1px solid #ff9900',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Monitor size={15} />
                <span>🖥️ Pre-fill Custom Titan PC (₹3,49,990)</span>
              </button>

              <button
                type="button"
                onClick={() => handleApplyTemplate('mechanical-keyboard')}
                style={{
                  backgroundColor: '#0d1117',
                  color: '#a371f7',
                  border: '1px solid #a371f7',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Keyboard size={15} />
                <span>⌨️ Pre-fill Custom Keyboard (₹16,999)</span>
              </button>
            </div>
          </div>
        )}

        {/* Form Input Fields */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c9d1d9', display: 'block', marginBottom: '6px' }}>
              Hardware Title / Product Name *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. ASUS ROG Strix G16 Core i9 14900HX RTX 4070..."
              style={{ width: '100%', padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px', fontSize: '0.92rem' }}
            />
          </div>

          <div className="grid-3" style={{ gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c9d1d9', display: 'block', marginBottom: '6px' }}>Brand *</label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. ASUS, NVIDIA, Corsair"
                style={{ width: '100%', padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c9d1d9', display: 'block', marginBottom: '6px' }}>Department *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{ width: '100%', padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }}
              >
                <option value="laptops">Laptops</option>
                <option value="components">PC Components & GPUs</option>
                <option value="monitors">Monitors</option>
                <option value="peripherals">Keyboards & Peripherals</option>
                <option value="storage">NVMe SSDs & Storage</option>
                <option value="networking">Networking & Routers</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c9d1d9', display: 'block', marginBottom: '6px' }}>Sub-Category</label>
              <input
                type="text"
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                placeholder="e.g. Gaming Laptops, GPUs"
                style={{ width: '100%', padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }}
              />
            </div>
          </div>

          <div className="grid-3" style={{ gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ff9900', display: 'block', marginBottom: '6px' }}>Selling Price (₹ INR) *</label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                style={{ width: '100%', padding: '10px', backgroundColor: '#0d1117', border: '1px solid #ff9900', color: '#fff', borderRadius: '6px', fontWeight: 800 }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c9d1d9', display: 'block', marginBottom: '6px' }}>MRP / Original Price (₹)</label>
              <input
                type="number"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
                style={{ width: '100%', padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c9d1d9', display: 'block', marginBottom: '6px' }}>Available Stock (Qty)</label>
              <input
                type="number"
                value={stockCount}
                onChange={(e) => setStockCount(Number(e.target.value))}
                style={{ width: '100%', padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c9d1d9', display: 'block', marginBottom: '6px' }}>
              Image URL (High-Res Image)
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              style={{ width: '100%', padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#c9d1d9', display: 'block', marginBottom: '6px' }}>
              Short Description / Summary
            </label>
            <textarea
              rows={2}
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              style={{ width: '100%', padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }}
            />
          </div>

          {/* Lightning Deal Checkbox */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#161b22', padding: '12px', borderRadius: '8px' }}>
            <input
              type="checkbox"
              id="lightningDealCheck"
              checked={isLightningDeal}
              onChange={(e) => setIsLightningDeal(e.target.checked)}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            <label htmlFor="lightningDealCheck" style={{ cursor: 'pointer', fontWeight: 700, color: '#ff9900', fontSize: '0.92rem' }}>
              ⚡ Feature as a Lightning Deal on Homepage Storefront (Adds countdown clock & 60% claim bar!)
            </label>
          </div>

          {/* Specifications Builder */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>Technical Specifications Matrix</label>
              <button
                type="button"
                onClick={handleAddSpec}
                style={{ backgroundColor: '#238636', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Plus size={14} />
                <span>Add Spec</span>
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
              {specs.map((s, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={s.label}
                    onChange={(e) => handleSpecChange(idx, 'label', e.target.value)}
                    placeholder="Label (e.g. RAM)"
                    style={{ flex: 1, padding: '6px 10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '4px', fontSize: '0.82rem' }}
                  />
                  <input
                    type="text"
                    value={s.value}
                    onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                    placeholder="Value (e.g. 32GB DDR5)"
                    style={{ flex: 2, padding: '6px 10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '4px', fontSize: '0.82rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveSpec(idx)}
                    style={{ backgroundColor: 'transparent', border: 'none', color: '#f85149', cursor: 'pointer' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #30363d' }}>
            <button type="submit" className="btn-primary" style={{ flex: 1, padding: '12px', fontSize: '0.95rem' }}>
              {productToEdit ? 'Save Changes & Update Catalog' : 'Publish Hardware to Indian Storefront 🚀'}
            </button>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1, padding: '12px', fontSize: '0.95rem' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
