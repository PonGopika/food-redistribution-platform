import { useState } from 'react';
import Navbar from '../../components/common/Navbar';

function DeliveryHistory() {
  const [filter, setFilter] = useState('all');

  const history = [
    {
      id: 1,
      foodName: 'Vegetable Biryani',
      quantity: '10 kg',
      donor: 'Taj Restaurant',
      ngo: 'Hope Foundation',
      date: '2026-01-29',
      rating: 5,
      points: 25,
      distance: 4.5
    },
    {
      id: 2,
      foodName: 'Fresh Bread',
      quantity: '25 pieces',
      donor: 'City Bakery',
      ngo: 'Food For All',
      date: '2026-01-28',
      rating: 4,
      points: 15,
      distance: 3.2
    },
    {
      id: 3,
      foodName: 'Mixed Vegetables',
      quantity: '15 kg',
      donor: 'Fresh Mart',
      ngo: 'Care Foundation',
      date: '2026-01-26',
      rating: 5,
      points: 20,
      distance: 5.0
    },
    {
      id: 4,
      foodName: 'Cooked Rice',
      quantity: '20 kg',
      donor: 'Grand Hotel',
      ngo: 'Hope Foundation',
      date: '2026-01-25',
      rating: 5,
      points: 30,
      distance: 6.5
    }
  ];

  const stats = {
    totalDeliveries: history.length,
    totalPoints: history.reduce((acc, h) => acc + h.points, 0),
    totalDistance: history.reduce((acc, h) => acc + h.distance, 0).toFixed(1),
    avgRating: (history.reduce((acc, h) => acc + h.rating, 0) / history.length).toFixed(1)
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Delivery History</h1>
          <p className="dashboard-subtitle">Your contributions and achievements</p>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon primary">🚴</div>
            <div className="stat-value">{stats.totalDeliveries}</div>
            <div className="stat-label">Deliveries</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--secondary-50)' }}>🪙</div>
            <div className="stat-value">{stats.totalPoints}</div>
            <div className="stat-label">Points Earned</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon info">📍</div>
            <div className="stat-value">{stats.totalDistance}km</div>
            <div className="stat-label">Distance Covered</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon warning">⭐</div>
            <div className="stat-value">{stats.avgRating}</div>
            <div className="stat-label">Avg Rating</div>
          </div>
        </div>

        {/* Filter */}
        <div className="tabs" style={{ marginBottom: 'var(--space-4)' }}>
          <button className={`tab ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>
            All Time
          </button>
          <button className={`tab ${filter === 'week' ? 'active' : ''}`} onClick={() => setFilter('week')}>
            This Week
          </button>
          <button className={`tab ${filter === 'month' ? 'active' : ''}`} onClick={() => setFilter('month')}>
            This Month
          </button>
        </div>

        {/* History List */}
        <div className="card">
          {history.map((item, idx) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-4)',
                padding: 'var(--space-4)',
                borderBottom: idx < history.length - 1 ? '1px solid var(--gray-100)' : 'none'
              }}
            >
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-lg)',
                background: 'var(--success-50)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px'
              }}>
                ✅
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '500' }}>{item.foodName}</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>
                  {item.donor} → {item.ngo}
                </div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-400)' }}>
                  {item.date} • {item.distance} km
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontWeight: '600', color: 'var(--secondary-500)' }}>+{item.points} pts</div>
                <div style={{ color: 'var(--secondary-300)' }}>
                  {'★'.repeat(item.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default DeliveryHistory;
