import React, { useState } from 'react';
import type { Order } from '../../types';
import { useOrder } from '../../context/OrderContext';
import { formatINR } from '../../utils/formatters';
import { Truck, CheckCircle2, MapPin, Printer, Zap, Search } from 'lucide-react';

export const AdminOrdersPage: React.FC = () => {
  const { orders, simulateNextStatus } = useOrder();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<Order | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = filterStatus === 'all' || o.currentStatus === filterStatus;
    const matchesSearch =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.shippingAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.shippingAddress.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#161b22', padding: '1.4rem', borderRadius: '12px', border: '1px solid #30363d' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Truck size={26} color="#00f2fe" />
            <span>Customer Orders & Lifecycle Controller ({orders.length} Total)</span>
          </h1>
          <p style={{ color: '#8b949e', margin: '4px 0 0', fontSize: '0.88rem' }}>
            Advance delivery statuses (`Order Placed` ➔ `Shipped` ➔ `Delivered`) and print official Indian GST invoices (`₹`).
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(0, 242, 254, 0.1)', padding: '8px 14px', borderRadius: '8px', border: '1px solid rgba(0, 242, 254, 0.3)' }}>
          <Zap size={16} color="#00f2fe" />
          <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#00f2fe' }}>Real-Time Timeline Sync Enabled</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '280px', position: 'relative' }}>
          <Search size={18} color="#8b949e" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by Order ID (ORD-IND-...), Customer Name, or City (Mumbai, Bengaluru)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: '100%', padding: '10px 10px 10px 38px', backgroundColor: '#161b22', border: '1px solid #30363d', color: '#fff', borderRadius: '8px' }}
          />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: '10px 16px', backgroundColor: '#161b22', border: '1px solid #30363d', color: '#fff', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
        >
          <option value="all">All Statuses ({orders.length})</option>
          <option value="Order Placed">Order Placed</option>
          <option value="Payment Verified">Payment Verified</option>
          <option value="Shipped">Shipped</option>
          <option value="Out for Delivery">Out for Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>

      {/* Orders List Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filteredOrders.length === 0 ? (
          <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', borderRadius: '12px', color: '#8b949e' }}>
            No customer orders match the selected search criteria.
          </div>
        ) : (
          filteredOrders.map((order) => {
            const isDelivered = order.currentStatus === 'Delivered';
            return (
              <div
                key={order.id}
                className="glass-panel"
                style={{
                  borderRadius: '12px',
                  padding: '1.4rem',
                  border: isDelivered ? '1px solid rgba(63, 185, 80, 0.4)' : '1px solid #ff9900',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.2rem',
                }}
              >
                {/* Top Row: ID, Customer, Status */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px', borderBottom: '1px solid #30363d', paddingBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fff', fontFamily: 'var(--font-mono)' }}>
                      {order.orderNumber}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#8b949e' }}>• Placed on {order.date}</span>
                    <span style={{ backgroundColor: '#21262d', color: '#00f2fe', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                      Payment: {order.paymentMethod}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span
                      style={{
                        backgroundColor: isDelivered ? 'rgba(63, 185, 80, 0.2)' : 'rgba(255, 153, 0, 0.2)',
                        color: isDelivered ? '#3fb950' : '#ff9900',
                        border: `1px solid ${isDelivered ? '#3fb950' : '#ff9900'}`,
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.82rem',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      {isDelivered && <CheckCircle2 size={15} />}
                      <span>{order.currentStatus}</span>
                    </span>

                    <button
                      onClick={() => setSelectedInvoiceOrder(order)}
                      style={{
                        backgroundColor: '#161b22',
                        color: '#c9d1d9',
                        border: '1px solid #30363d',
                        padding: '6px 12px',
                        borderRadius: '6px',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <Printer size={15} />
                      <span>Print GST Invoice</span>
                    </button>

                    {!isDelivered && (
                      <button
                        onClick={() => simulateNextStatus(order.id)}
                        className="btn-primary"
                        style={{
                          padding: '8px 16px',
                          fontSize: '0.85rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          boxShadow: '0 0 15px rgba(255,153,0,0.4)',
                        }}
                      >
                        <Zap size={16} />
                        <span>Advance Status ➔</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Middle Row: Items + Address */}
                <div className="grid-2" style={{ gap: '1.5rem', alignItems: 'flex-start' }}>
                  {/* Items List */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Ordered Hardware Items ({order.items.length})
                    </div>
                    {order.items.map((item) => (
                      <div key={item.cartItemId} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#0d1117', padding: '8px 12px', borderRadius: '8px', border: '1px solid #30363d' }}>
                        <img src={item.product.images[0]} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div style={{ flex: 1, overflow: 'hidden' }}>
                          <div style={{ fontWeight: 700, fontSize: '0.86rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.product.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: '#8b949e' }}>
                            Qty: {item.quantity} • Config: {item.selectedConfigs.map((c) => c.name).join(', ') || 'Standard'}
                          </div>
                        </div>
                        <div style={{ fontWeight: 800, color: '#ff9900', fontSize: '0.9rem' }}>
                          {formatINR(item.unitPrice * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Address & Financial Summary */}
                  <div style={{ backgroundColor: '#0d1117', padding: '1.2rem', borderRadius: '8px', border: '1px solid #30363d', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#fff', fontWeight: 800, fontSize: '0.88rem' }}>
                      <MapPin size={16} color="#ff9900" />
                      <span>Indian Delivery Address ({order.shippingAddress.addressType})</span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#c9d1d9', lineHeight: 1.4 }}>
                      <span style={{ fontWeight: 700, color: '#fff' }}>{order.shippingAddress.fullName}</span><br />
                      {order.shippingAddress.street}<br />
                      {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pinCode}<br />
                      <span style={{ color: '#8b949e' }}>Phone: {order.shippingAddress.phone}</span>
                    </div>

                    <div style={{ borderTop: '1px solid #30363d', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 900, fontSize: '1rem', color: '#fff' }}>
                      <span>Total Amount Paid (Incl. 18% GST):</span>
                      <span style={{ color: '#3fb950' }}>{formatINR(order.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Printable GST Tax Invoice Modal */}
      {selectedInvoiceOrder && (
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
            zIndex: 2500,
            padding: '1.5rem',
          }}
        >
          <div
            className="glass-panel"
            style={{
              width: '100%',
              maxWidth: '700px',
              backgroundColor: '#fff',
              color: '#000',
              borderRadius: '12px',
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.4rem',
              boxShadow: '0 12px 48px rgba(0,0,0,0.9)',
            }}
          >
            {/* Invoice Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #000', paddingBottom: '1rem' }}>
              <div>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 900, margin: 0, color: '#000', letterSpacing: '1px' }}>
                  PRIMETECH INDIA PVT. LTD.
                </h2>
                <div style={{ fontSize: '0.82rem', color: '#444', marginTop: '4px' }}>
                  Electra Hardware Hub, Outer Ring Road, Bengaluru, Karnataka - 560103<br />
                  GSTIN: 29AABCP1234F1Z5 | Toll Free: 1800-419-2026
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ff9900' }}>TAX INVOICE</div>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#000', marginTop: '4px' }}>
                  {selectedInvoiceOrder.orderNumber}
                </div>
                <div style={{ fontSize: '0.78rem', color: '#666' }}>Date: {selectedInvoiceOrder.date}</div>
              </div>
            </div>

            {/* Bill To */}
            <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: '#f5f5f5', padding: '1rem', borderRadius: '6px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#666', textTransform: 'uppercase' }}>Billed / Shipped To:</div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#000', marginTop: '4px' }}>
                  {selectedInvoiceOrder.shippingAddress.fullName}
                </div>
                <div style={{ fontSize: '0.82rem', color: '#333', lineHeight: 1.4 }}>
                  {selectedInvoiceOrder.shippingAddress.street}, {selectedInvoiceOrder.shippingAddress.city}<br />
                  {selectedInvoiceOrder.shippingAddress.state} - {selectedInvoiceOrder.shippingAddress.pinCode}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#666', textTransform: 'uppercase' }}>Payment Details:</div>
                <div style={{ fontWeight: 800, color: '#000', marginTop: '4px' }}>{selectedInvoiceOrder.paymentMethod}</div>
                <div style={{ fontSize: '0.82rem', color: '#28a745', fontWeight: 700 }}>PAID IN FULL ✔</div>
              </div>
            </div>

            {/* Items Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #000', fontSize: '0.82rem', color: '#000', textTransform: 'uppercase' }}>
                  <th style={{ padding: '8px 4px' }}>Description / Configuration</th>
                  <th style={{ padding: '8px 4px' }}>HSN Code</th>
                  <th style={{ padding: '8px 4px', textAlign: 'center' }}>Qty</th>
                  <th style={{ padding: '8px 4px', textAlign: 'right' }}>Amount (₹)</th>
                </tr>
              </thead>
              <tbody>
                {selectedInvoiceOrder.items.map((it) => (
                  <tr key={it.cartItemId} style={{ borderBottom: '1px solid #ddd', fontSize: '0.85rem' }}>
                    <td style={{ padding: '10px 4px', fontWeight: 700, color: '#000' }}>
                      {it.product.title}<br />
                      <span style={{ fontSize: '0.75rem', color: '#555', fontWeight: 500 }}>
                        Config: {it.selectedConfigs.map((c) => c.name).join(', ') || 'Standard'}
                      </span>
                    </td>
                    <td style={{ padding: '10px 4px', color: '#444' }}>84713010</td>
                    <td style={{ padding: '10px 4px', textAlign: 'center', fontWeight: 700 }}>{it.quantity}</td>
                    <td style={{ padding: '10px 4px', textAlign: 'right', fontWeight: 800 }}>
                      {formatINR(it.unitPrice * it.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Invoice Totals */}
            <div style={{ alignSelf: 'flex-end', width: '280px', display: 'flex', flexDirection: 'column', gap: '6px', borderTop: '2px solid #000', paddingTop: '10px', fontSize: '0.88rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#444' }}>
                <span>Subtotal:</span>
                <span>{formatINR(selectedInvoiceOrder.subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#444' }}>
                <span>GST (18% CGST + SGST):</span>
                <span>{formatINR(selectedInvoiceOrder.taxAmount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#28a745', fontWeight: 700 }}>
                <span>Promotional Discount:</span>
                <span>-{formatINR(selectedInvoiceOrder.discountAmount)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #000', paddingTop: '8px', fontWeight: 900, fontSize: '1.1rem', color: '#000' }}>
                <span>Total Payable:</span>
                <span>{formatINR(selectedInvoiceOrder.totalAmount)}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '1rem', borderTop: '1px solid #ddd', paddingTop: '1.2rem' }}>
              <button
                onClick={() => window.print()}
                style={{ flex: 1, backgroundColor: '#000', color: '#fff', padding: '12px', borderRadius: '6px', fontWeight: 800, fontSize: '0.95rem', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Printer size={18} />
                <span>Print or Save as PDF</span>
              </button>
              <button
                onClick={() => setSelectedInvoiceOrder(null)}
                style={{ backgroundColor: '#eee', color: '#333', padding: '12px 24px', borderRadius: '6px', fontWeight: 800, fontSize: '0.95rem', border: '1px solid #ccc', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
