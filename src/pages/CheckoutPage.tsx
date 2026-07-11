import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrder } from '../context/OrderContext';
import { formatINR } from '../utils/formatters';
import type { Address, Order } from '../types';
import { ShieldCheck, CreditCard, QrCode, Lock, Plus, ArrowRight } from 'lucide-react';

export const CheckoutPage: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const { cartItems, subtotal, discountAmount, shippingFee, taxAmount } = useCart();
  const { addresses, selectedAddress, selectAddress, addAddress } = useAuth();
  const { placeOrder } = useOrder();

  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [shippingMethod, setShippingMethod] = useState<'prime' | 'standard' | 'same-day'>('prime');
  const [paymentMethod, setPaymentMethod] = useState<Order['paymentMethod']>('UPI / QR Code');

  // New Address Form State
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newPinCode, setNewPinCode] = useState('');
  const [newStreet, setNewStreet] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newState, setNewState] = useState('Karnataka');
  const [newAddressType, setNewAddressType] = useState<'Home' | 'Work' | 'Office'>('Home');

  // Payment Form State
  const [upiId, setUpiId] = useState('aarav@okaxis');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  if (cartItems.length === 0) {
    return (
      <div style={{ maxWidth: '800px', margin: '4rem auto', textAlign: 'center', padding: '3rem 1.5rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff' }}>No Items to Checkout</h2>
        <p style={{ color: '#8b949e', marginTop: '1rem' }}>Please add some PC hardware or computer components to your cart before proceeding to checkout.</p>
        <button onClick={() => onNavigate('/')} className="btn-primary" style={{ marginTop: '1.5rem', padding: '0.8rem 2rem' }}>
          Return to Storefront
        </button>
      </div>
    );
  }

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName || !newPhone || !newPinCode || !newStreet || !newCity) return;

    const created: Address = {
      id: `addr-${Date.now()}`,
      fullName: newFullName,
      phone: newPhone,
      pinCode: newPinCode,
      street: newStreet,
      city: newCity,
      state: newState,
      isDefault: false,
      addressType: newAddressType,
    };

    addAddress(created);
    selectAddress(created.id);
    setShowAddAddress(false);
  };

  const finalShippingCost = shippingMethod === 'same-day' ? 199 : shippingFee;
  const finalTotal = Math.max(0, subtotal - discountAmount + finalShippingCost);

  const handlePlaceOrder = () => {
    placeOrder(paymentMethod);
    onNavigate('/orders');
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '2rem auto', padding: '0 1.5rem' }}>
      {/* Top Security Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #30363d', paddingBottom: '16px', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fff' }}>PrimeTech Checkout</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(46, 160, 67, 0.15)', border: '1px solid #238636', padding: '4px 10px', borderRadius: '6px', color: '#2ea043', fontSize: '0.8rem', fontWeight: 700 }}>
            <Lock size={14} />
            <span>256-Bit SSL Encrypted Indian Gateway Simulation</span>
          </div>
        </div>
        <span style={{ fontSize: '0.9rem', color: '#8b949e' }}>Need assistance? Call 1800-419-2026 (Toll Free India)</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 400px', gap: '2.5rem', alignItems: 'flex-start' }}>
        {/* Left Column: Multi-Step Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          {/* STEP 1: DELIVERY ADDRESS */}
          <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.6rem', border: activeStep === 1 ? '2px solid #ff9900' : '1px solid #30363d' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: activeStep === 1 ? '#ff9900' : '#232f3e', color: activeStep === 1 ? '#0d1117' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  1
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>Select Delivery Address in India</h3>
              </div>
              {activeStep !== 1 && (
                <button onClick={() => setActiveStep(1)} style={{ color: '#00f2fe', fontWeight: 700, fontSize: '0.88rem' }}>
                  Change
                </button>
              )}
            </div>

            {activeStep === 1 ? (
              <div style={{ marginTop: '1.4rem' }}>
                <div className="grid-2" style={{ gap: '12px', marginBottom: '1.4rem' }}>
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => selectAddress(addr.id)}
                      style={{
                        padding: '14px',
                        borderRadius: '10px',
                        border: `2px solid ${selectedAddress.id === addr.id ? '#ff9900' : '#30363d'}`,
                        backgroundColor: selectedAddress.id === addr.id ? 'rgba(255, 153, 0, 0.1)' : '#161b22',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 800, color: '#fff' }}>{addr.fullName}</span>
                        <span style={{ fontSize: '0.72rem', backgroundColor: '#232f3e', color: '#00f2fe', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                          {addr.addressType}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.86rem', color: '#c9d1d9', lineHeight: 1.4 }}>
                        {addr.street}, {addr.city}, {addr.state} - {addr.pinCode}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#8b949e', marginTop: '4px' }}>Phone: {addr.phone}</div>
                    </div>
                  ))}
                </div>

                {!showAddAddress ? (
                  <button
                    onClick={() => setShowAddAddress(true)}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#00f2fe', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer', padding: '6px 0' }}
                  >
                    <Plus size={18} />
                    <span>Add a new Indian address</span>
                  </button>
                ) : (
                  <form onSubmit={handleCreateAddress} className="glass-panel" style={{ padding: '1.4rem', borderRadius: '10px', marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <h4 style={{ fontWeight: 700, color: '#fff' }}>Add New Delivery Address</h4>
                    <div className="grid-2" style={{ gap: '10px' }}>
                      <input type="text" placeholder="Full Name (e.g. Rahul Sharma)" value={newFullName} onChange={(e) => setNewFullName(e.target.value)} required style={{ padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }} />
                      <input type="text" placeholder="Mobile Number (+91)" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} required style={{ padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }} />
                      <input type="text" placeholder="PIN Code (6 digits e.g. 560095)" value={newPinCode} onChange={(e) => setNewPinCode(e.target.value)} required style={{ padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }} />
                      <input type="text" placeholder="City / District (e.g. Bengaluru)" value={newCity} onChange={(e) => setNewCity(e.target.value)} required style={{ padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }} />
                    </div>
                    <input type="text" placeholder="Flat, House no., Building, Company, Apartment, Street" value={newStreet} onChange={(e) => setNewStreet(e.target.value)} required style={{ width: '100%', padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }} />
                    <div className="grid-2" style={{ gap: '10px' }}>
                      <input type="text" placeholder="State (e.g. Karnataka)" value={newState} onChange={(e) => setNewState(e.target.value)} required style={{ padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }} />
                      <select value={newAddressType} onChange={(e) => setNewAddressType(e.target.value as 'Home' | 'Work' | 'Office')} style={{ padding: '10px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }}>
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Office">Office</option>
                      </select>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button type="submit" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.88rem' }}>Save & Select</button>
                      <button type="button" onClick={() => setShowAddAddress(false)} className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.88rem' }}>Cancel</button>
                    </div>
                  </form>
                )}

                <button
                  onClick={() => setActiveStep(2)}
                  className="btn-primary"
                  style={{ marginTop: '1.6rem', padding: '0.8rem 2rem' }}
                >
                  <span>Use this address</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            ) : (
              <div style={{ marginTop: '10px', fontSize: '0.88rem', color: '#c9d1d9' }}>
                <span style={{ fontWeight: 700, color: '#fff' }}>{selectedAddress.fullName}</span> — {selectedAddress.street}, {selectedAddress.city} {selectedAddress.pinCode}
              </div>
            )}
          </div>

          {/* STEP 2: SHIPPING METHOD */}
          <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.6rem', border: activeStep === 2 ? '2px solid #ff9900' : '1px solid #30363d' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: activeStep === 2 ? '#ff9900' : '#232f3e', color: activeStep === 2 ? '#0d1117' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  2
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>Choose Delivery Option</h3>
              </div>
              {activeStep !== 2 && (
                <button onClick={() => setActiveStep(2)} style={{ color: '#00f2fe', fontWeight: 700, fontSize: '0.88rem' }}>
                  Change
                </button>
              )}
            </div>

            {activeStep === 2 && (
              <div style={{ marginTop: '1.4rem', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label
                  onClick={() => setShippingMethod('prime')}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '10px',
                    border: `2px solid ${shippingMethod === 'prime' ? '#ff9900' : '#30363d'}`,
                    backgroundColor: shippingMethod === 'prime' ? 'rgba(255, 153, 0, 0.1)' : '#161b22',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                  }}
                >
                  <input type="radio" checked={shippingMethod === 'prime'} onChange={() => {}} style={{ accentColor: '#ff9900' }} />
                  <div>
                    <div style={{ fontWeight: 800, color: '#00f2fe', fontSize: '0.98rem' }}>⚡ FREE One-Day Prime Delivery</div>
                    <div style={{ fontSize: '0.82rem', color: '#c9d1d9', marginTop: '2px' }}>Arrives Tomorrow by 9:00 PM with secure OTP verification at doorstep.</div>
                  </div>
                </label>

                <label
                  onClick={() => setShippingMethod('same-day')}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '10px',
                    border: `2px solid ${shippingMethod === 'same-day' ? '#ff9900' : '#30363d'}`,
                    backgroundColor: shippingMethod === 'same-day' ? 'rgba(255, 153, 0, 0.1)' : '#161b22',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                  }}
                >
                  <input type="radio" checked={shippingMethod === 'same-day'} onChange={() => {}} style={{ accentColor: '#ff9900' }} />
                  <div>
                    <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.98rem' }}>🚀 Same-Day Priority Drone & Express Hub (+₹199)</div>
                    <div style={{ fontSize: '0.82rem', color: '#c9d1d9', marginTop: '2px' }}>Arrives Today by 8:00 PM. High-priority dispatch from Whitefield / Koramangala hub.</div>
                  </div>
                </label>

                <label
                  onClick={() => setShippingMethod('standard')}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '10px',
                    border: `2px solid ${shippingMethod === 'standard' ? '#ff9900' : '#30363d'}`,
                    backgroundColor: shippingMethod === 'standard' ? 'rgba(255, 153, 0, 0.1)' : '#161b22',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                  }}
                >
                  <input type="radio" checked={shippingMethod === 'standard'} onChange={() => {}} style={{ accentColor: '#ff9900' }} />
                  <div>
                    <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.98rem' }}>Standard India Courier (3-5 Business Days)</div>
                    <div style={{ fontSize: '0.82rem', color: '#8b949e', marginTop: '2px' }}>FREE on orders over ₹5,000 or PrimeTech VIP members.</div>
                  </div>
                </label>

                <button
                  onClick={() => setActiveStep(3)}
                  className="btn-primary"
                  style={{ marginTop: '1rem', alignSelf: 'flex-start', padding: '0.8rem 2rem' }}
                >
                  <span>Continue to Payment</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>

          {/* STEP 3: PAYMENT METHOD SIMULATION */}
          <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.6rem', border: activeStep === 3 ? '2px solid #ff9900' : '1px solid #30363d' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: activeStep === 3 ? '#ff9900' : '#232f3e', color: activeStep === 3 ? '#0d1117' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  3
                </div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>Select Payment Method (India)</h3>
              </div>
            </div>

            {activeStep === 3 && (
              <div style={{ marginTop: '1.4rem', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* 1. UPI / QR Code */}
                <div
                  onClick={() => setPaymentMethod('UPI / QR Code')}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    border: `2px solid ${paymentMethod === 'UPI / QR Code' ? '#ff9900' : '#30363d'}`,
                    backgroundColor: paymentMethod === 'UPI / QR Code' ? 'rgba(255, 153, 0, 0.1)' : '#161b22',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="radio" checked={paymentMethod === 'UPI / QR Code'} onChange={() => {}} style={{ accentColor: '#ff9900' }} />
                    <QrCode size={22} color="#00f2fe" />
                    <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>UPI / Instant QR Code (Recommended)</div>
                  </div>

                  {paymentMethod === 'UPI / QR Code' && (
                    <div style={{ marginTop: '14px', paddingLeft: '34px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      <div style={{ fontSize: '0.85rem', color: '#c9d1d9' }}>
                        Simulate instant payment via Google Pay, PhonePe, Paytm, or BHIM UPI:
                      </div>
                      <div style={{ display: 'flex', gap: '8px', maxWidth: '380px' }}>
                        <input
                          type="text"
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="yourname@okaxis"
                          style={{ flex: 1, padding: '8px 12px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px', fontSize: '0.88rem', fontFamily: 'monospace' }}
                        />
                        <span style={{ display: 'inline-flex', alignItems: 'center', padding: '0 10px', backgroundColor: '#238636', color: '#fff', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
                          ✓ Verified ID
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Credit / Debit Cards */}
                <div
                  onClick={() => setPaymentMethod('Credit / Debit Card')}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    border: `2px solid ${paymentMethod === 'Credit / Debit Card' ? '#ff9900' : '#30363d'}`,
                    backgroundColor: paymentMethod === 'Credit / Debit Card' ? 'rgba(255, 153, 0, 0.1)' : '#161b22',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="radio" checked={paymentMethod === 'Credit / Debit Card'} onChange={() => {}} style={{ accentColor: '#ff9900' }} />
                    <CreditCard size={22} color="#ff9900" />
                    <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>Credit / Debit Card (Visa, MasterCard, RuPay, Amex)</div>
                  </div>

                  {paymentMethod === 'Credit / Debit Card' && (
                    <div style={{ marginTop: '14px', paddingLeft: '34px', display: 'grid', gridTemplateColumns: '1fr 120px', gap: '10px', maxWidth: '450px' }}>
                      <input type="text" readOnly value="4532 •••• •••• 9941" style={{ padding: '8px 12px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px', fontFamily: 'monospace' }} />
                      <input type="text" readOnly value="12/29 • 842" style={{ padding: '8px 12px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px', fontFamily: 'monospace' }} />
                    </div>
                  )}
                </div>

                {/* 3. Net Banking */}
                <div
                  onClick={() => setPaymentMethod('Net Banking')}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    border: `2px solid ${paymentMethod === 'Net Banking' ? '#ff9900' : '#30363d'}`,
                    backgroundColor: paymentMethod === 'Net Banking' ? 'rgba(255, 153, 0, 0.1)' : '#161b22',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="radio" checked={paymentMethod === 'Net Banking'} onChange={() => {}} style={{ accentColor: '#ff9900' }} />
                    <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>Net Banking (Top Indian Banks)</div>
                  </div>

                  {paymentMethod === 'Net Banking' && (
                    <div style={{ marginTop: '12px', paddingLeft: '34px' }}>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        style={{ padding: '8px 12px', backgroundColor: '#0d1117', border: '1px solid #30363d', color: '#fff', borderRadius: '6px', fontWeight: 600 }}
                      >
                        <option value="HDFC Bank">HDFC Bank</option>
                        <option value="ICICI Bank">ICICI Bank</option>
                        <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                        <option value="Axis Bank">Axis Bank</option>
                        <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* 4. Cash on Delivery (COD) */}
                <div
                  onClick={() => setPaymentMethod('Cash on Delivery (COD)')}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    border: `2px solid ${paymentMethod === 'Cash on Delivery (COD)' ? '#ff9900' : '#30363d'}`,
                    backgroundColor: paymentMethod === 'Cash on Delivery (COD)' ? 'rgba(255, 153, 0, 0.1)' : '#161b22',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="radio" checked={paymentMethod === 'Cash on Delivery (COD)'} onChange={() => {}} style={{ accentColor: '#ff9900' }} />
                    <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem' }}>Cash on Delivery / Pay on Delivery (COD)</div>
                  </div>
                  {paymentMethod === 'Cash on Delivery (COD)' && (
                    <div style={{ marginTop: '8px', paddingLeft: '34px', fontSize: '0.8rem', color: '#8b949e' }}>
                      Pay via Cash or UPI QR on doorstep arrival.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Final Order Summary Box */}
        <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.8rem', position: 'sticky', top: '90px', border: '1px solid #30363d' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '1.2rem', borderBottom: '1px solid #30363d', paddingBottom: '12px' }}>
            Final Order Review
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#c9d1d9' }}>
              <span>Items ({cartItems.reduce((acc, i) => acc + i.quantity, 0)}):</span>
              <span style={{ color: '#fff', fontWeight: 600, fontFamily: 'monospace' }}>{formatINR(subtotal)}</span>
            </div>

            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#2ea043', fontWeight: 700 }}>
                <span>Coupon Savings:</span>
                <span style={{ fontFamily: 'monospace' }}>-{formatINR(discountAmount)}</span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#c9d1d9' }}>
              <span>Delivery Fee:</span>
              <span style={{ color: finalShippingCost === 0 ? '#00f2fe' : '#fff', fontWeight: 600, fontFamily: 'monospace' }}>
                {finalShippingCost === 0 ? 'FREE' : formatINR(finalShippingCost)}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#8b949e', fontSize: '0.8rem' }}>
              <span>GST Breakdown (18% inclusive):</span>
              <span style={{ fontFamily: 'monospace' }}>{formatINR(taxAmount)}</span>
            </div>

            <div style={{ height: '1px', backgroundColor: '#30363d', margin: '8px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontWeight: 800, color: '#fff' }}>
              <span>Order Total:</span>
              <span style={{ color: '#ff9900', fontFamily: "'JetBrains Mono', monospace" }}>
                {formatINR(finalTotal)}
              </span>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            style={{
              width: '100%',
              marginTop: '1.8rem',
              padding: '1rem',
              fontSize: '1.1rem',
              fontWeight: 800,
              backgroundColor: '#ffa41c',
              color: '#0d1117',
              border: 'none',
              borderRadius: '99px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 18px rgba(255, 164, 28, 0.45)',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.02)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <ShieldCheck size={20} fill="#0d1117" />
            <span>Place Your Order and Pay {formatINR(finalTotal)}</span>
          </button>

          <p style={{ fontSize: '0.78rem', color: '#8b949e', textAlign: 'center', marginTop: '14px', lineHeight: 1.4 }}>
            By placing your order, you agree to PrimeTech India's Conditions of Use & Sale and 7-Day Replacement Policy.
          </p>
        </div>
      </div>
    </div>
  );
};
