import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';
import '../../styles/DonorDashboard.css';

function DonorDashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const quickActions = [
    { icon: '➕', label: 'Add Surplus Food', path: '/donor/add-food', color: 'var(--primary-500)' },
    { icon: '📦', label: 'View My Listings', path: '/donor/status', color: 'var(--accent-500)' },
    { icon: '✓', label: 'Get Verified', path: '/donor/verification', color: 'var(--secondary-400)' },
    { icon: '👤', label: 'My Profile', path: '/profile', color: 'var(--gray-500)' }
  ];

  // Mock stats
  const stats = {
    totalDonations: 24,
    activeListing: 2,
    mealsProvided: 1250,
    co2Saved: 85
  };

  const recentActivity = [
    { type: 'listing', text: 'Vegetable Biryani claimed by Hope Foundation', time: '2 hours ago' },
    { type: 'delivered', text: 'Fresh Bread delivered successfully', time: '1 day ago' },
    { type: 'rating', text: 'Received 5-star rating from Food For All', time: '2 days ago' }
  ];

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, {user?.name || 'Donor'}! 👋</h1>
          <p className="dashboard-subtitle">{user?.organizationName || 'Your organization'}</p>
        </div>

        {/* Verification Alert */}
        {!user?.isVerified && (
          <div className="alert alert-warning" style={{ marginBottom: 'var(--space-6)' }}>
            <span className="alert-icon">⚠️</span>
            <div style={{ flex: 1 }}>
              <strong>Complete Your Verification</strong>
              <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
                Get verified to build trust with NGOs and unlock all features.
              </p>
            </div>
            <button className="btn btn-warning btn-sm" onClick={() => navigate('/donor/verification')}>
              Get Verified →
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon primary">🍲</div>
            <div className="stat-value">{stats.totalDonations}</div>
            <div className="stat-label">Total Donations</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon warning">📦</div>
            <div className="stat-value">{stats.activeListing}</div>
            <div className="stat-label">Active Listings</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--success-50)' }}>😊</div>
            <div className="stat-value">{stats.mealsProvided}</div>
            <div className="stat-label">Meals Provided</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon info">🌱</div>
            <div className="stat-value">{stats.co2Saved}kg</div>
            <div className="stat-label">CO₂ Saved</div>
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
              style={{
                cursor: 'pointer',
                textAlign: 'center',
                padding: 'var(--space-5)'
              }}
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

        {/* Recent Activity */}
        <div className="card">
          <h3 style={{ marginBottom: 'var(--space-4)' }}>Recent Activity</h3>
          {recentActivity.map((activity, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                padding: 'var(--space-3)',
                borderBottom: idx < recentActivity.length - 1 ? '1px solid var(--gray-100)' : 'none'
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: activity.type === 'rating' ? 'var(--secondary-50)' :
                  activity.type === 'delivered' ? 'var(--success-50)' : 'var(--primary-50)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {activity.type === 'rating' ? '⭐' : activity.type === 'delivered' ? '✅' : '📦'}
              </div>
              <div style={{ flex: 1 }}>
                <div>{activity.text}</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-400)' }}>{activity.time}</div>
              </div>
            </div>
          ))}
          <Link to="/donor/status" style={{
            display: 'block',
            textAlign: 'center',
            marginTop: 'var(--space-4)',
            fontSize: 'var(--font-size-sm)'
          }}>
            View All Activity →
          </Link>
        </div>
      </div>
    </>
  );
}

export default DonorDashboard;
