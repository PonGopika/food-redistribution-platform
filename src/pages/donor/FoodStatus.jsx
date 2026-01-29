import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FoodContext } from '../../context/FoodContext';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';
import '../../styles/FoodStatus.css';

function FoodStatus() {
  const navigate = useNavigate();
  const { foodListings, updateFood, cancelFood } = useContext(FoodContext);
  const { user } = useContext(AuthContext);
  const [filter, setFilter] = useState('all');
  const [editingId, setEditingId] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);

  // Filter listings for current donor
  const myListings = foodListings.filter(f => f.donorId === user?.id || true); // Show all for demo

  const filteredListings = myListings.filter(f => {
    if (filter === 'all') return true;
    return f.status === filter;
  });

  const getStatusBadge = (status) => {
    const badges = {
      available: { class: 'badge-success', label: '🟢 Available' },
      claimed: { class: 'badge-info', label: '🔵 Claimed' },
      pickup_assigned: { class: 'badge-warning', label: '🟡 Pickup Assigned' },
      picked_up: { class: 'badge-primary', label: '🚚 In Transit' },
      delivered: { class: 'badge-success', label: '✅ Delivered' },
      expired: { class: 'badge-danger', label: '⛔ Expired' },
      cancelled: { class: 'badge-danger', label: '❌ Cancelled' }
    };
    return badges[status] || { class: 'badge-secondary', label: status };
  };

  const getTimeRemaining = (bestBefore) => {
    if (!bestBefore) return null;
    const now = new Date();
    const expiry = new Date(bestBefore);
    const diff = expiry - now;

    if (diff <= 0) return { expired: true, text: 'Expired' };

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return {
      expired: false,
      urgent: hours < 1,
      warning: hours < 3,
      text: hours > 0 ? `${hours}h ${minutes}m left` : `${minutes}m left`,
      hours,
      minutes
    };
  };

  const handleCancel = (food) => {
    setSelectedFood(food);
    setShowCancelModal(true);
  };

  const confirmCancel = () => {
    if (cancelFood && selectedFood) {
      cancelFood(selectedFood.id, cancelReason);
    }
    setShowCancelModal(false);
    setCancelReason('');
    setSelectedFood(null);
  };

  // Mock data for demo
  const mockListings = [
    {
      id: 1,
      name: 'Vegetable Biryani',
      category: 'cooked',
      quantity: 10,
      unit: 'kg',
      servings: 50,
      dietaryType: 'veg',
      status: 'available',
      preparedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      bestBefore: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(),
      allergens: ['gluten'],
      imagePreview: ''
    },
    {
      id: 2,
      name: 'Fresh Bread Loaves',
      category: 'bakery',
      quantity: 25,
      unit: 'pieces',
      servings: 25,
      dietaryType: 'veg',
      status: 'claimed',
      ngo: 'Hope Foundation',
      preparedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      bestBefore: new Date(Date.now() + 1 * 60 * 60 * 1000).toISOString(),
      allergens: ['gluten', 'dairy']
    },
    {
      id: 3,
      name: 'Mixed Vegetables',
      category: 'raw',
      quantity: 15,
      unit: 'kg',
      servings: 30,
      dietaryType: 'vegan',
      status: 'delivered',
      ngo: 'Food For All',
      volunteer: 'Raj Kumar',
      preparedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      bestBefore: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
    }
  ];

  const displayListings = filteredListings.length > 0 ? filteredListings : mockListings.filter(f => {
    if (filter === 'all') return true;
    return f.status === filter;
  });

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 className="dashboard-title">My Food Listings</h1>
              <p className="dashboard-subtitle">Manage and track your food donations</p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/donor/add-food')}>
              ➕ Add New Listing
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon primary">📦</div>
            <div className="stat-value">{mockListings.length}</div>
            <div className="stat-label">Total Listings</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--success-50)' }}>✅</div>
            <div className="stat-value">{mockListings.filter(f => f.status === 'delivered').length}</div>
            <div className="stat-label">Delivered</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon warning">⏳</div>
            <div className="stat-value">{mockListings.filter(f => f.status === 'available').length}</div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon info">🎯</div>
            <div className="stat-value">~{mockListings.reduce((acc, f) => acc + (f.servings || 0), 0)}</div>
            <div className="stat-label">People Fed</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
          {[
            { value: 'all', label: 'All' },
            { value: 'available', label: '🟢 Available' },
            { value: 'claimed', label: '🔵 Claimed' },
            { value: 'delivered', label: '✅ Delivered' }
          ].map(tab => (
            <button
              key={tab.value}
              className={`tab ${filter === tab.value ? 'active' : ''}`}
              onClick={() => setFilter(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Listings */}
        {displayListings.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <div className="empty-state-icon">📦</div>
              <h3 className="empty-state-title">No Listings Found</h3>
              <p className="empty-state-text">You haven't created any food listings yet</p>
              <button className="btn btn-primary" onClick={() => navigate('/donor/add-food')}>
                Create First Listing
              </button>
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
            {displayListings.map(food => {
              const timeRemaining = getTimeRemaining(food.bestBefore);
              const statusBadge = getStatusBadge(food.status);

              return (
                <div key={food.id} className="card" style={{ padding: 'var(--space-4)' }}>
                  <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                    {/* Image placeholder */}
                    <div style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: 'var(--radius-lg)',
                      background: 'var(--gray-100)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '48px',
                      flexShrink: 0
                    }}>
                      {food.category === 'cooked' ? '🍲' :
                        food.category === 'bakery' ? '🍞' :
                          food.category === 'raw' ? '🥬' : '📦'}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-2)' }}>
                        <h3 style={{ marginBottom: 'var(--space-1)' }}>{food.name}</h3>
                        <span className={`badge ${statusBadge.class}`}>{statusBadge.label}</span>
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', marginBottom: 'var(--space-3)', fontSize: 'var(--font-size-sm)', color: 'var(--gray-600)' }}>
                        <span>📦 {food.quantity} {food.unit}</span>
                        <span>🍽️ ~{food.servings} servings</span>
                        <span>{food.dietaryType === 'veg' ? '🥬' : '🍖'} {food.dietaryType}</span>
                        {food.allergens?.length > 0 && (
                          <span>⚠️ {food.allergens.join(', ')}</span>
                        )}
                      </div>

                      {/* Time Remaining */}
                      {timeRemaining && food.status === 'available' && (
                        <div
                          className={`countdown ${timeRemaining.expired ? '' : timeRemaining.urgent ? 'urgent' : timeRemaining.warning ? 'warning' : ''}`}
                          style={{ display: 'inline-flex', marginBottom: 'var(--space-3)' }}
                        >
                          ⏱️ {timeRemaining.text}
                        </div>
                      )}

                      {/* Claimed/Delivery Info */}
                      {food.ngo && (
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)', marginBottom: 'var(--space-2)' }}>
                          <strong>Claimed by:</strong> {food.ngo}
                          {food.volunteer && <span> • <strong>Volunteer:</strong> {food.volunteer}</span>}
                        </div>
                      )}

                      {/* Actions */}
                      {food.status === 'available' && (
                        <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                          <button className="btn btn-secondary btn-sm" onClick={() => setEditingId(food.id)}>
                            ✏️ Edit
                          </button>
                          <button className="btn btn-outline btn-sm">
                            ✓ Mark as Claimed
                          </button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleCancel(food)}>
                            ❌ Cancel
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Cancel Modal */}
        {showCancelModal && (
          <div className="modal-overlay" onClick={() => setShowCancelModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">Cancel Donation</h3>
                <button className="modal-close" onClick={() => setShowCancelModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <p style={{ marginBottom: 'var(--space-4)' }}>
                  Are you sure you want to cancel <strong>{selectedFood?.name}</strong>?
                </p>
                <div className="form-group">
                  <label className="form-label">Reason for cancellation</label>
                  <select
                    className="form-select"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  >
                    <option value="">Select a reason</option>
                    <option value="spoiled">Food has spoiled</option>
                    <option value="sold">Food was sold</option>
                    <option value="consumed">Food was consumed internally</option>
                    <option value="error">Listed by mistake</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowCancelModal(false)}>
                  Keep Listing
                </button>
                <button className="btn btn-danger" onClick={confirmCancel} disabled={!cancelReason}>
                  Confirm Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default FoodStatus;
