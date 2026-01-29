import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';

function AcceptedFood() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('pending');
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const acceptedDonations = {
    pending: [
      {
        id: 1,
        name: 'Vegetable Biryani',
        donor: 'Taj Restaurant',
        donorRating: 4.8,
        quantity: '10 kg',
        servings: 50,
        status: 'in_transit',
        volunteer: 'Raj Kumar',
        volunteerPhone: '+91 98765 43210',
        eta: '25 mins',
        claimedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
      },
      {
        id: 2,
        name: 'Fresh Bread',
        donor: 'City Bakery',
        donorRating: 4.5,
        quantity: '25 pieces',
        servings: 25,
        status: 'pickup_pending',
        volunteer: null,
        claimedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
      }
    ],
    completed: [
      {
        id: 3,
        name: 'Mixed Vegetables',
        donor: 'Fresh Mart',
        quantity: '15 kg',
        servings: 30,
        status: 'delivered',
        deliveredAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        rated: true,
        myRating: 5
      },
      {
        id: 4,
        name: 'Cooked Rice',
        donor: 'Grand Hotel',
        quantity: '20 kg',
        servings: 100,
        status: 'delivered',
        deliveredAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        rated: false
      }
    ]
  };

  const getStatusBadge = (status) => {
    const badges = {
      pickup_pending: { class: 'badge-warning', label: '⏳ Awaiting Pickup' },
      in_transit: { class: 'badge-info', label: '🚚 In Transit' },
      delivered: { class: 'badge-success', label: '✅ Delivered' }
    };
    return badges[status] || { class: 'badge-secondary', label: status };
  };

  const handleRate = (food) => {
    setSelectedFood(food);
    setShowRatingModal(true);
  };

  const submitRating = () => {
    console.log('Rating submitted:', { foodId: selectedFood?.id, rating, feedback });
    setShowRatingModal(false);
    setRating(0);
    setFeedback('');
    setSelectedFood(null);
  };

  const displayList = activeTab === 'pending' ? acceptedDonations.pending : acceptedDonations.completed;

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Accepted Donations</h1>
          <p className="dashboard-subtitle">Track and manage your claimed food donations</p>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
            onClick={() => setActiveTab('pending')}
          >
            ⏳ Pending ({acceptedDonations.pending.length})
          </button>
          <button
            className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            ✅ Completed ({acceptedDonations.completed.length})
          </button>
        </div>

        {/* List */}
        {displayList.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <div className="empty-state-icon">📦</div>
              <h3 className="empty-state-title">No {activeTab} donations</h3>
              <p className="empty-state-text">
                {activeTab === 'pending'
                  ? 'Claim food from nearby listings to get started'
                  : 'Completed donations will appear here'}
              </p>
              {activeTab === 'pending' && (
                <button className="btn btn-primary" onClick={() => navigate('/ngo/nearby-food')}>
                  Find Food →
                </button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
            {displayList.map(food => {
              const statusBadge = getStatusBadge(food.status);

              return (
                <div key={food.id} className="card" style={{ padding: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                    <div style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: 'var(--radius-lg)',
                      background: 'var(--primary-50)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '36px',
                      flexShrink: 0
                    }}>
                      🍲
                    </div>

                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <h3 style={{ marginBottom: 'var(--space-1)' }}>{food.name}</h3>
                          <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>
                            From {food.donor} {food.donorRating && `• ⭐ ${food.donorRating}`}
                          </div>
                        </div>
                        <span className={`badge ${statusBadge.class}`}>{statusBadge.label}</span>
                      </div>

                      <div style={{
                        display: 'flex',
                        gap: 'var(--space-4)',
                        marginTop: 'var(--space-3)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--gray-600)'
                      }}>
                        <span>📦 {food.quantity}</span>
                        <span>🍽️ ~{food.servings} servings</span>
                      </div>

                      {/* Pending specific info */}
                      {activeTab === 'pending' && (
                        <div style={{ marginTop: 'var(--space-3)' }}>
                          {food.volunteer ? (
                            <div style={{
                              padding: 'var(--space-3)',
                              background: 'var(--success-50)',
                              borderRadius: 'var(--radius-md)',
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center'
                            }}>
                              <div>
                                <div style={{ fontWeight: '500' }}>🚴 {food.volunteer}</div>
                                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>
                                  ETA: {food.eta}
                                </div>
                              </div>
                              <button className="btn btn-primary btn-sm">
                                📞 Call
                              </button>
                            </div>
                          ) : (
                            <div style={{
                              padding: 'var(--space-3)',
                              background: 'var(--warning-50)',
                              borderRadius: 'var(--radius-md)',
                              fontSize: 'var(--font-size-sm)'
                            }}>
                              ⏳ Waiting for volunteer to accept pickup...
                            </div>
                          )}
                        </div>
                      )}

                      {/* Completed specific info */}
                      {activeTab === 'completed' && (
                        <div style={{ marginTop: 'var(--space-3)' }}>
                          {food.rated ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                              <span>Your rating:</span>
                              {[1, 2, 3, 4, 5].map(star => (
                                <span key={star} style={{ color: star <= food.myRating ? 'var(--secondary-300)' : 'var(--gray-300)' }}>
                                  ★
                                </span>
                              ))}
                            </div>
                          ) : (
                            <button className="btn btn-warning btn-sm" onClick={() => handleRate(food)}>
                              ⭐ Rate This Donation
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Rating Modal */}
        {showRatingModal && (
          <div className="modal-overlay" onClick={() => setShowRatingModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">Rate Food Quality</h3>
                <button className="modal-close" onClick={() => setShowRatingModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <p style={{ marginBottom: 'var(--space-4)' }}>
                  How was the quality of <strong>{selectedFood?.name}</strong> from {selectedFood?.donor}?
                </p>

                {/* Star Rating */}
                <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)' }}>
                  <div className="star-rating" style={{ justifyContent: 'center' }}>
                    {[1, 2, 3, 4, 5].map(star => (
                      <span
                        key={star}
                        className={`star ${star <= rating ? 'active' : ''}`}
                        onClick={() => setRating(star)}
                        style={{ fontSize: '36px' }}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: 'var(--space-2)', color: 'var(--gray-500)' }}>
                    {rating === 0 ? 'Click to rate' :
                      rating <= 2 ? 'Poor' :
                        rating === 3 ? 'Average' :
                          rating === 4 ? 'Good' : 'Excellent!'}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Hygiene Feedback (Optional)</label>
                  <textarea
                    className="form-textarea"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your feedback about food quality and hygiene..."
                    rows={3}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowRatingModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={submitRating} disabled={rating === 0}>
                  Submit Rating
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AcceptedFood;
