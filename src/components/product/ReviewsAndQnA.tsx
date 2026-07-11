import React, { useState } from 'react';
import type { Product } from '../../types';
import { useOrder } from '../../context/OrderContext';
import { useAuth } from '../../context/AuthContext';
import { StarRating } from '../common/StarRating';
import { ThumbsUp, MessageSquare, PlusCircle, CheckCircle } from 'lucide-react';

export const ReviewsAndQnA: React.FC<{ product: Product }> = ({ product }) => {
  const { user } = useAuth();
  const { getReviewsForProduct, addReview, voteReviewHelpful, getQuestionsForProduct, addQuestion, addAnswer } = useOrder();

  const reviews = getReviewsForProduct(product.id);
  const questions = getQuestionsForProduct(product.id);

  const [activeTab, setActiveTab] = useState<'reviews' | 'qna'>('reviews');

  // New Review Form State
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');

  // New Question / Answer Form States
  const [questionInput, setQuestionInput] = useState('');
  const [answeringQId, setAnsweringQId] = useState<string | null>(null);
  const [answerInput, setAnswerInput] = useState('');

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newComment.trim()) return;

    addReview({
      productId: product.id,
      userName: user.name || 'Verified Customer',
      rating: newRating,
      title: newTitle,
      comment: newComment,
      verifiedPurchase: true,
    });
    setNewTitle('');
    setNewComment('');
    setShowReviewModal(false);
  };

  const handleCreateQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionInput.trim()) return;
    addQuestion(product.id, questionInput);
    setQuestionInput('');
  };

  const handleCreateAnswer = (qId: string) => {
    if (!answerInput.trim()) return;
    addAnswer(qId, answerInput);
    setAnswerInput('');
    setAnsweringQId(null);
  };

  return (
    <div className="glass-panel" style={{ borderRadius: '16px', padding: '2rem', marginTop: '2.5rem' }}>
      {/* Tab Selectors */}
      <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid #30363d', marginBottom: '1.8rem' }}>
        <button
          onClick={() => setActiveTab('reviews')}
          style={{
            paddingBottom: '12px',
            fontSize: '1.15rem',
            fontWeight: 800,
            color: activeTab === 'reviews' ? '#ff9900' : '#8b949e',
            borderBottom: activeTab === 'reviews' ? '3px solid #ff9900' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>Customer Reviews ({reviews.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('qna')}
          style={{
            paddingBottom: '12px',
            fontSize: '1.15rem',
            fontWeight: 800,
            color: activeTab === 'qna' ? '#ff9900' : '#8b949e',
            borderBottom: activeTab === 'qna' ? '3px solid #ff9900' : 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>Customer Q&A ({questions.length})</span>
        </button>
      </div>

      {activeTab === 'reviews' ? (
        <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
          {/* Left Summary Box */}
          <div style={{ width: '320px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff' }}>Customer reviews</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <StarRating rating={product.rating} size={22} />
              <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#fff' }}>{product.rating} out of 5</span>
            </div>
            <span style={{ fontSize: '0.85rem', color: '#8b949e' }}>Based on {product.reviewsCount.toLocaleString('en-IN')} global Indian customer ratings</span>

            {/* Histogram bars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
              {[
                { stars: 5, pct: 82 },
                { stars: 4, pct: 12 },
                { stars: 3, pct: 4 },
                { stars: 2, pct: 1 },
                { stars: 1, pct: 1 },
              ].map((row) => (
                <div key={row.stars} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.82rem', color: '#00f2fe' }}>
                  <span style={{ width: '45px' }}>{row.stars} star</span>
                  <div style={{ flex: 1, height: '14px', backgroundColor: '#161b22', borderRadius: '4px', overflow: 'hidden', border: '1px solid #30363d' }}>
                    <div style={{ width: `${row.pct}%`, height: '100%', backgroundColor: '#ff9900' }} />
                  </div>
                  <span style={{ width: '35px', textAlign: 'right', color: '#8b949e' }}>{row.pct}%</span>
                </div>
              ))}
            </div>

            <div style={{ height: '1px', backgroundColor: '#30363d', margin: '12px 0' }} />

            <div>
              <h5 style={{ fontWeight: 700, color: '#fff', marginBottom: '6px' }}>Review this product</h5>
              <p style={{ fontSize: '0.82rem', color: '#8b949e', marginBottom: '12px' }}>Share your PC hardware feedback with other Indian enthusiasts</p>
              <button
                onClick={() => setShowReviewModal(true)}
                className="btn-secondary"
                style={{ width: '100%', padding: '0.65rem' }}
              >
                Write a customer review
              </button>
            </div>
          </div>

          {/* Right Reviews List */}
          <div style={{ flex: 1, minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
            {reviews.length === 0 ? (
              <div style={{ color: '#8b949e', padding: '2rem 0' }}>No reviews published yet. Be the first Indian enthusiast to review this model!</div>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} style={{ borderBottom: '1px solid rgba(48, 54, 61, 0.4)', paddingBottom: '1.4rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#232f3e', color: '#ff9900', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                      {rev.userName.charAt(0)}
                    </div>
                    <span style={{ fontWeight: 700, color: '#fff' }}>{rev.userName}</span>
                    {rev.verifiedPurchase && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', color: '#ff9900', fontWeight: 600 }}>
                        <CheckCircle size={13} /> Verified Indian Purchase
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '4px 0' }}>
                    <StarRating rating={rev.rating} size={15} />
                    <span style={{ fontWeight: 800, color: '#f0f6fc' }}>{rev.title}</span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: '#8b949e', marginBottom: '8px' }}>Reviewed in India on {rev.date}</div>

                  <p style={{ fontSize: '0.92rem', color: '#c9d1d9', lineHeight: 1.5 }}>{rev.comment}</p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '12px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#8b949e' }}>{rev.helpfulCount} people found this helpful</span>
                    <button
                      onClick={() => voteReviewHelpful(rev.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '4px 10px',
                        borderRadius: '4px',
                        border: '1px solid #30363d',
                        backgroundColor: '#161b22',
                        color: '#c9d1d9',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                      }}
                    >
                      <ThumbsUp size={13} />
                      <span>Helpful</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        /* Q&A Section */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          {/* Post Question Form */}
          <form onSubmit={handleCreateQuestion} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Ask the Indian PC community or PrimeTech engineers a question about compatibility..."
              value={questionInput}
              onChange={(e) => setQuestionInput(e.target.value)}
              style={{
                flex: 1,
                minWidth: '280px',
                padding: '12px 16px',
                backgroundColor: '#161b22',
                border: '1px solid #30363d',
                color: '#fff',
                borderRadius: '8px',
              }}
            />
            <button type="submit" className="btn-primary" style={{ padding: '0 1.5rem', gap: '6px' }}>
              <MessageSquare size={16} />
              <span>Post Question</span>
            </button>
          </form>

          {questions.length === 0 ? (
            <div style={{ color: '#8b949e' }}>No questions asked for this product yet. Ask anything above!</div>
          ) : (
            questions.map((q) => (
              <div key={q.id} className="glass-panel" style={{ padding: '1.4rem', borderRadius: '12px' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                  <span style={{ fontWeight: 800, color: '#ff9900', fontSize: '1.1rem' }}>Q:</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: '#fff', fontSize: '1.02rem' }}>{q.question}</div>
                    <div style={{ fontSize: '0.78rem', color: '#8b949e', marginTop: '2px' }}>Asked by {q.userName} on {q.date}</div>
                  </div>
                </div>

                {/* Answers List */}
                <div style={{ marginTop: '1.2rem', paddingLeft: '1.6rem', display: 'flex', flexDirection: 'column', gap: '1rem', borderLeft: '2px solid #30363d' }}>
                  {q.answers.map((ans) => (
                    <div key={ans.id} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ fontWeight: 800, color: '#00f2fe', fontSize: '1.05rem' }}>A:</span>
                      <div>
                        <div style={{ fontSize: '0.92rem', color: '#c9d1d9', lineHeight: 1.4 }}>{ans.answer}</div>
                        <div style={{ fontSize: '0.76rem', color: '#8b949e', marginTop: '4px' }}>
                          Answered by <span style={{ color: '#ff9900', fontWeight: 600 }}>{ans.userName}</span> on {ans.date}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Answer Toggle */}
                  {answeringQId === q.id ? (
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      <input
                        type="text"
                        placeholder="Type your hardware answer or experience..."
                        value={answerInput}
                        onChange={(e) => setAnswerInput(e.target.value)}
                        style={{ flex: 1, padding: '8px 12px', backgroundColor: '#0d1117', color: '#fff', border: '1px solid #30363d', borderRadius: '6px' }}
                      />
                      <button onClick={() => handleCreateAnswer(q.id)} className="btn-primary" style={{ padding: '0 1rem', fontSize: '0.82rem' }}>
                        Submit
                      </button>
                      <button onClick={() => setAnsweringQId(null)} className="btn-secondary" style={{ padding: '0 1rem', fontSize: '0.82rem' }}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => { setAnsweringQId(q.id); setAnswerInput(''); }}
                      style={{
                        alignSelf: 'flex-start',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.8rem',
                        color: '#00f2fe',
                        fontWeight: 600,
                        cursor: 'pointer',
                        marginTop: '4px',
                      }}
                    >
                      <PlusCircle size={14} />
                      <span>Answer this question</span>
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Write a Review Modal */}
      {showReviewModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '24px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', marginBottom: '16px' }}>Write a Customer Review</h3>
            <form onSubmit={handleCreateReview} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#c9d1d9', marginBottom: '6px' }}>Overall Rating</label>
                <StarRating rating={newRating} size={28} interactive={true} onRatingChange={setNewRating} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#c9d1d9', marginBottom: '6px' }}>Review Headline</label>
                <input
                  type="text"
                  placeholder="e.g. Absolute powerhouse GPU for 4K ray tracing!"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{ width: '100%', padding: '10px', backgroundColor: '#161b22', border: '1px solid #30363d', color: '#fff', borderRadius: '6px' }}
                  required
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#c9d1d9', marginBottom: '6px' }}>Detailed Feedback & Temps</label>
                <textarea
                  rows={4}
                  placeholder="Share details on thermal performance, build quality, and value for money in India..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  style={{ width: '100%', padding: '10px', backgroundColor: '#161b22', border: '1px solid #30363d', color: '#fff', borderRadius: '6px', fontFamily: 'inherit' }}
                  required
                />
              </div>
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button type="submit" className="btn-primary" style={{ flex: 1, padding: '10px' }}>Publish Review</button>
                <button type="button" onClick={() => setShowReviewModal(false)} className="btn-secondary" style={{ flex: 1, padding: '10px' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
