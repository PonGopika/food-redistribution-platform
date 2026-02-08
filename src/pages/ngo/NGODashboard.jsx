import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FoodContext } from '../../context/FoodContext';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';

function NGODashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const quickActions = [
    { icon: '🔍', label: 'Find Nearby Food', path: '/ngo/nearby-food', color: 'var(--primary-500)' },
    { icon: '✅', label: 'Accepted Donations', path: '/ngo/accepted', color: 'var(--success-500)' },
    { icon: '⚙️', label: 'NGO Profile', path: '/ngo/profile', color: 'var(--accent-500)' },
    { icon: '👤', label: 'My Account', path: '/profile', color: 'var(--gray-500)' }
  ];

  const stats = {
    totalReceived: 156,
    pendingPickups: 3,
    peopleFed: 2450,
    avgRating: 4.8
  };

  const pendingDonations = [
    { id: 1, name: 'Vegetable Biryani', donor: 'Taj Restaurant', quantity: '10 kg', eta: '30 mins', volunteer: 'Raj Kumar' },
    { id: 2, name: 'Fresh Bread', donor: 'City Bakery', quantity: '25 pieces', eta: '45 mins', volunteer: 'Pending' }
  ];

  const notifications = [
    { type: 'match', text: 'New food match: 15kg Mixed Vegetables from Fresh Mart', time: '5 mins ago', urgent: true },
    { type: 'delivery', text: 'Delivery arriving: Vegetable Biryani from Taj Restaurant', time: '30 mins' },
    { type: 'rating', text: 'Don\'t forget to rate your last donation', time: '2 hours ago' }
  ];

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome, {user?.organizationName || 'NGO'} 👋</h1>
          <p className="dashboard-subtitle">Serving communities with dignity</p>
        </div>

        {/* Smart Notifications */}
        {notifications.filter(n => n.urgent).length > 0 && (
          <div className="alert alert-warning" style={{ marginBottom: 'var(--space-4)' }}>
            <span className="alert-icon">🔔</span>
            <div style={{ flex: 1 }}>
              <strong>New Food Available!</strong>
              <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
                {notifications.find(n => n.urgent)?.text}
              </p>
            </div>
            <button className="btn btn-warning btn-sm" onClick={() => navigate('/ngo/nearby-food')}>
              View Now →
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon primary">📦</div>
            <div className="stat-value">{stats.totalReceived}</div>
            <div className="stat-label">Total Received</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon warning">⏳</div>
            <div className="stat-value">{stats.pendingPickups}</div>
            <div className="stat-label">Pending Pickups</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--success-50)' }}>😊</div>
            <div className="stat-value">{stats.peopleFed}</div>
            <div className="stat-label">People Fed</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon info">⭐</div>
            <div className="stat-value">{stats.avgRating}</div>
            <div className="stat-label">Avg Rating Given</div>
          </div>
        </div>

        {/* Quick Actions */}
        <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Actions</h3>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-6)'
        }}>
          {quickActions.map(action => (
            <div
              key={action.path}
              onClick={() => navigate(action.path)}
              className="card"
              style={{ cursor: 'pointer', textAlign: 'center', padding: 'var(--space-5)' }}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: 'var(--radius-xl)',
                background: `${action.color}15`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                margin: '0 auto var(--space-3)'
              }}>
                {action.icon}
              </div>
              <div style={{ fontWeight: '500' }}>{action.label}</div>
            </div>
          ))}
        </div>

        {/* Pending Deliveries */}
        <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
          <h3 style={{ marginBottom: 'var(--space-4)' }}>🚚 Incoming Deliveries</h3>
          {pendingDonations.length === 0 ? (
            <p style={{ color: 'var(--gray-500)' }}>No pending deliveries</p>
          ) : (
            <div>
              {pendingDonations.map((donation, idx) => (
                <div
                  key={donation.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    padding: 'var(--space-4)',
                    borderBottom: idx < pendingDonations.length - 1 ? '1px solid var(--gray-100)' : 'none'
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--primary-50)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    🍲
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500' }}>{donation.name}</div>
                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>
                      From {donation.donor} • {donation.quantity}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: '600', color: 'var(--primary-500)' }}>
                      🚴 ETA: {donation.eta}
                    </div>
                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-400)' }}>
                      {donation.volunteer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Link to="/ngo/accepted" style={{
            display: 'block',
            textAlign: 'center',
            marginTop: 'var(--space-4)',
            fontSize: 'var(--font-size-sm)'
          }}>
            View All Accepted Donations →
          </Link>
        </div>

        {/* Recent Notifications */}
        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-4)' }}>🔔 Notifications</h3>
          {notifications.map((notif, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-3)',
                borderBottom: idx < notifications.length - 1 ? '1px solid var(--gray-100)' : 'none',
                background: notif.urgent ? 'var(--warning-50)' : 'transparent',
                borderRadius: notif.urgent ? 'var(--radius-md)' : 0
              }}
            >
              <span style={{ fontSize: '20px' }}>
                {notif.type === 'match' ? '🍲' : notif.type === 'delivery' ? '🚚' : '⭐'}
              </span>
              <div style={{ flex: 1 }}>
                <div>{notif.text}</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-400)' }}>{notif.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default NGODashboard;
