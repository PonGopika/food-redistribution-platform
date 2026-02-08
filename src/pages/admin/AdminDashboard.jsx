import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';

function AdminDashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    totalDonations: 1250,
    activeDonors: 45,
    activeNGOs: 23,
    volunteers: 78,
    mealsServed: 45000,
    pendingVerifications: 5,
    safetyAlerts: 2
  };

  const pendingVerifications = [
    { id: 1, name: 'Fresh Foods Restaurant', type: 'donor', submittedAt: '2026-01-28', docs: ['Business License', 'Food Safety Permit'] },
    { id: 2, name: 'City Catering', type: 'donor', submittedAt: '2026-01-29', docs: ['Business License'] },
    { id: 3, name: 'Community Kitchen NGO', type: 'ngo', submittedAt: '2026-01-28', docs: ['Registration Certificate'] }
  ];

  const safetyAlerts = [
    { id: 1, type: 'hygiene', severity: 'high', message: 'Low hygiene rating reported for City Bakery', time: '2 hours ago' },
    { id: 2, type: 'expired', severity: 'medium', message: '3 listings expired without pickup', time: '5 hours ago' }
  ];

  const recentActivity = [
    { type: 'delivery', text: 'Vegetable Biryani delivered to Hope Foundation', time: '10 mins ago' },
    { type: 'verification', text: 'Taj Restaurant verified', time: '1 hour ago' },
    { type: 'signup', text: 'New volunteer: Priya Sharma', time: '2 hours ago' },
    { type: 'donation', text: '25kg Fresh Bread listed by City Bakery', time: '3 hours ago' }
  ];

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">Platform overview and management</p>
        </div>

        {/* Alerts */}
        {safetyAlerts.length > 0 && (
          <div className="alert alert-danger" style={{ marginBottom: 'var(--space-4)' }}>
            <span className="alert-icon">🚨</span>
            <div style={{ flex: 1 }}>
              <strong>{safetyAlerts.length} Safety Alerts Require Attention</strong>
              <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
                {safetyAlerts[0].message}
              </p>
            </div>
            <button className="btn btn-danger btn-sm" onClick={() => setActiveTab('alerts')}>
              View All →
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))' }}>
          <div className="stat-card">
            <div className="stat-icon primary">🍲</div>
            <div className="stat-value">{stats.totalDonations}</div>
            <div className="stat-label">Total Donations</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--success-50)' }}>😊</div>
            <div className="stat-value">{stats.mealsServed.toLocaleString()}</div>
            <div className="stat-label">Meals Served</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon warning">🏪</div>
            <div className="stat-value">{stats.activeDonors}</div>
            <div className="stat-label">Active Donors</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon info">🏠</div>
            <div className="stat-value">{stats.activeNGOs}</div>
            <div className="stat-label">NGOs</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--accent-50)' }}>🚴</div>
            <div className="stat-value">{stats.volunteers}</div>
            <div className="stat-label">Volunteers</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
            📊 Overview
          </button>
          <button className={`tab ${activeTab === 'verifications' ? 'active' : ''}`} onClick={() => setActiveTab('verifications')}>
            ✓ Verifications ({stats.pendingVerifications})
          </button>
          <button className={`tab ${activeTab === 'alerts' ? 'active' : ''}`} onClick={() => setActiveTab('alerts')}>
            🚨 Alerts ({stats.safetyAlerts})
          </button>
          <button className={`tab ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>
            👥 Users
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-4)' }}>
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
                  <span style={{ fontSize: '20px' }}>
                    {activity.type === 'delivery' ? '✅' :
                      activity.type === 'verification' ? '✓' :
                        activity.type === 'signup' ? '👤' : '📦'}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 'var(--font-size-sm)' }}>{activity.text}</div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-400)' }}>{activity.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="card">
              <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Actions</h3>
              {[
                { icon: '✓', label: 'Verify Pending Users', count: pendingVerifications.length, path: '#verifications' },
                { icon: '🚨', label: 'Review Safety Alerts', count: safetyAlerts.length, path: '#alerts' },
                { icon: '📊', label: 'Generate Reports', path: '#reports' },
                { icon: '⚙️', label: 'Platform Settings', path: '#settings' }
              ].map((action, idx) => (
                <div
                  key={idx}
                  onClick={() => action.path.startsWith('#') ? setActiveTab(action.path.slice(1)) : navigate(action.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    background: 'var(--gray-50)',
                    marginBottom: 'var(--space-2)'
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{action.icon}</span>
                  <span style={{ flex: 1 }}>{action.label}</span>
                  {action.count && (
                    <span className="badge badge-primary">{action.count}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Verifications Tab */}
        {activeTab === 'verifications' && (
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Pending Verifications</h3>
            {pendingVerifications.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">✓</div>
                <h4>All Caught Up!</h4>
                <p className="empty-state-text">No pending verifications</p>
              </div>
            ) : (
              pendingVerifications.map((item, idx) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    padding: 'var(--space-4)',
                    borderBottom: idx < pendingVerifications.length - 1 ? '1px solid var(--gray-100)' : 'none'
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-lg)',
                    background: item.type === 'donor' ? 'var(--primary-50)' : 'var(--success-50)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px'
                  }}>
                    {item.type === 'donor' ? '🏪' : '🏠'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500' }}>{item.name}</div>
                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>
                      {item.type.toUpperCase()} • Submitted {item.submittedAt}
                    </div>
                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-400)' }}>
                      Documents: {item.docs.join(', ')}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button className="btn btn-success btn-sm">✓ Approve</button>
                    <button className="btn btn-danger btn-sm">✗ Reject</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Safety Alerts</h3>
            {safetyAlerts.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">✓</div>
                <h4>No Alerts</h4>
                <p className="empty-state-text">All clear!</p>
              </div>
            ) : (
              safetyAlerts.map((alert, idx) => (
                <div
                  key={alert.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-4)',
                    padding: 'var(--space-4)',
                    borderBottom: idx < safetyAlerts.length - 1 ? '1px solid var(--gray-100)' : 'none',
                    background: alert.severity === 'high' ? 'var(--danger-50)' : 'var(--warning-50)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--space-2)'
                  }}
                >
                  <span style={{ fontSize: '24px' }}>
                    {alert.type === 'hygiene' ? '🧼' : '⏰'}
                  </span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '500' }}>{alert.message}</div>
                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>{alert.time}</div>
                  </div>
                  <span className={`badge ${alert.severity === 'high' ? 'badge-danger' : 'badge-warning'}`}>
                    {alert.severity.toUpperCase()}
                  </span>
                  <button className="btn btn-secondary btn-sm">Review</button>
                </div>
              ))
            )}
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>User Management</h3>
            <p style={{ color: 'var(--gray-500)' }}>
              User management interface would display here with search, filter, and bulk actions.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)' }}>
              <button className="btn btn-primary">View All Donors</button>
              <button className="btn btn-secondary">View All NGOs</button>
              <button className="btn btn-secondary">View All Volunteers</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminDashboard;
