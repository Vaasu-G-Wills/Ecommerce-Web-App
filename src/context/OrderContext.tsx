import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Order, OrderStatus, ProductQuestion, ProductReview } from '../types';
import { INITIAL_QUESTIONS, INITIAL_REVIEWS, PRODUCTS } from '../data/products';
import { useAuth } from './AuthContext';
import { useCart } from './CartContext';
import { getDeliveryDate } from '../utils/formatters';

interface OrderContextType {
  orders: Order[];
  reviews: ProductReview[];
  questions: ProductQuestion[];
  placeOrder: (paymentMethod: Order['paymentMethod']) => Order;
  simulateNextStatus: (orderId: string) => void;
  getOrderById: (orderId: string) => Order | undefined;
  getReviewsForProduct: (productId: string) => ProductReview[];
  addReview: (reviewData: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>) => void;
  voteReviewHelpful: (reviewId: string) => void;
  getQuestionsForProduct: (productId: string) => ProductQuestion[];
  addQuestion: (productId: string, questionText: string) => void;
  addAnswer: (questionId: string, answerText: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

const STATUS_ORDER: OrderStatus[] = [
  'Order Placed',
  'Payment Verified',
  'Shipped',
  'Out for Delivery',
  'Delivered',
];

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { selectedAddress, user } = useAuth();
  const { cartItems, subtotal, shippingFee, taxAmount, discountAmount, totalAmount, clearCart, showToast } = useCart();

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('primetech_orders');
    if (saved) return JSON.parse(saved);
    
    // Seed initial realistic Indian order
    const rtxProduct = PRODUCTS.find((p) => p.id === 'comp-1') || PRODUCTS[0];
    const initialOrder: Order = {
      id: 'ord-init-1',
      orderNumber: 'ORD-IND-99412-2026',
      date: '8 Jul, 2026',
      items: [
        {
          cartItemId: `${rtxProduct.id}_default`,
          product: rtxProduct,
          quantity: 1,
          selectedConfigs: rtxProduct.configurations || [],
          unitPrice: rtxProduct.price,
        },
      ],
      subtotal: rtxProduct.price,
      shippingFee: 0,
      taxAmount: Math.round(rtxProduct.price * (18 / 118)),
      discountAmount: 10000,
      totalAmount: rtxProduct.price - 10000,
      shippingAddress: selectedAddress,
      paymentMethod: 'UPI / QR Code',
      currentStatus: 'Shipped',
      timeline: [
        { status: 'Order Placed', timestamp: '8 Jul, 2026 - 10:14 AM', location: 'Bengaluru Hub', description: 'Order successfully logged into PrimeTech India dispatch system.', completed: true },
        { status: 'Payment Verified', timestamp: '8 Jul, 2026 - 10:15 AM', location: 'Online UPI Gateway', description: 'Payment of ₹1,79,999 received via HDFC Bank UPI.', completed: true },
        { status: 'Shipped', timestamp: '9 Jul, 2026 - 02:40 PM', location: 'PrimeTech Warehouse, Whitefield, Bengaluru', description: 'Package picked up by PrimeTech Express Priority Drone & Courier service.', completed: true },
        { status: 'Out for Delivery', timestamp: 'Estimated Today by 4 PM', location: 'Koramangala Delivery Station', description: 'Courier partner assigned. Package is on vehicle.', completed: false },
        { status: 'Delivered', timestamp: 'Pending', location: 'Customer Delivery Address', description: 'Package delivered securely with OTP verification.', completed: false },
      ],
      estimatedDeliveryDate: 'Today by 9 PM',
    };
    return [initialOrder];
  });

  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    const saved = localStorage.getItem('primetech_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [questions, setQuestions] = useState<ProductQuestion[]>(() => {
    const saved = localStorage.getItem('primetech_questions');
    return saved ? JSON.parse(saved) : INITIAL_QUESTIONS;
  });

  useEffect(() => {
    localStorage.setItem('primetech_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('primetech_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('primetech_questions', JSON.stringify(questions));
  }, [questions]);

  const placeOrder = (paymentMethod: Order['paymentMethod']): Order => {
    const orderNumber = `ORD-IND-${Math.floor(10000 + Math.random() * 90000)}-2026`;
    const nowStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const timeStr = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
    });

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: nowStr,
      items: [...cartItems],
      subtotal,
      shippingFee,
      taxAmount,
      discountAmount,
      totalAmount,
      shippingAddress: selectedAddress,
      paymentMethod,
      currentStatus: 'Order Placed',
      timeline: [
        {
          status: 'Order Placed',
          timestamp: `${nowStr} - ${timeStr}`,
          location: 'PrimeTech India Digital Store',
          description: 'Your hardware order has been received and verified.',
          completed: true,
        },
        {
          status: 'Payment Verified',
          timestamp: `${nowStr} - ${timeStr}`,
          location: paymentMethod,
          description: `Authorized ₹${totalAmount.toLocaleString('en-IN')} via ${paymentMethod}.`,
          completed: true,
        },
        {
          status: 'Shipped',
          timestamp: 'Scheduled',
          location: 'Bengaluru / Mumbai Mega Fulfillment Center',
          description: 'Items will be packed in ESD-safe protective cushioning.',
          completed: false,
        },
        {
          status: 'Out for Delivery',
          timestamp: 'Scheduled',
          location: `${selectedAddress.city} Express Hub`,
          description: 'Assigned to priority delivery vehicle.',
          completed: false,
        },
        {
          status: 'Delivered',
          timestamp: 'Pending',
          location: selectedAddress.street,
          description: 'Package handed over with OTP confirmation.',
          completed: false,
        },
      ],
      estimatedDeliveryDate: getDeliveryDate(1),
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    showToast(`Order ${orderNumber} placed successfully!`, 'success');
    return newOrder;
  };

  const simulateNextStatus = (orderId: string) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        const currentIdx = STATUS_ORDER.indexOf(order.currentStatus);
        if (currentIdx === -1 || currentIdx >= STATUS_ORDER.length - 1) {
          showToast('Order is already fully delivered!', 'info');
          return order;
        }

        const nextStatus = STATUS_ORDER[currentIdx + 1];
        const nowStr = new Date().toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
        });

        const updatedTimeline = order.timeline.map((evt) => {
          if (evt.status === nextStatus) {
            return {
              ...evt,
              timestamp: `Live Simulation - ${nowStr}`,
              completed: true,
            };
          }
          return evt;
        });

        showToast(`Simulated status update: ${nextStatus}!`, 'success');
        return {
          ...order,
          currentStatus: nextStatus,
          timeline: updatedTimeline,
        };
      })
    );
  };

  const getOrderById = (orderId: string) => orders.find((o) => o.id === orderId);

  const getReviewsForProduct = (productId: string) => {
    return reviews.filter((r) => r.productId === productId);
  };

  const addReview = (reviewData: Omit<ProductReview, 'id' | 'date' | 'helpfulCount'>) => {
    const newRev: ProductReview = {
      ...reviewData,
      id: `rev-${Date.now()}`,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      helpfulCount: 1,
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Your verified customer review has been published!', 'success');
  };

  const voteReviewHelpful = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpfulCount: r.helpfulCount + 1 } : r))
    );
    showToast('Marked review as helpful.', 'info');
  };

  const getQuestionsForProduct = (productId: string) => {
    return questions.filter((q) => q.productId === productId);
  };

  const addQuestion = (productId: string, questionText: string) => {
    const newQ: ProductQuestion = {
      id: `qna-${Date.now()}`,
      productId,
      userName: user.name || 'Verified Customer',
      question: questionText,
      date: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
      answers: [],
    };
    setQuestions((prev) => [newQ, ...prev]);
    showToast('Question posted! Community answers will appear here.', 'success');
  };

  const addAnswer = (questionId: string, answerText: string) => {
    setQuestions((prev) =>
      prev.map((q) => {
        if (q.id === questionId) {
          return {
            ...q,
            answers: [
              ...q.answers,
              {
                id: `ans-${Date.now()}`,
                userName: `${user.name} (Community Member)`,
                answer: answerText,
                date: new Date().toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                }),
                upvotes: 1,
              },
            ],
          };
        }
        return q;
      })
    );
    showToast('Your answer has been added.', 'success');
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        reviews,
        questions,
        placeOrder,
        simulateNextStatus,
        getOrderById,
        getReviewsForProduct,
        addReview,
        voteReviewHelpful,
        getQuestionsForProduct,
        addQuestion,
        addAnswer,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};
