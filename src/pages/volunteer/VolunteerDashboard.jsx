import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';

function VolunteerDashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const quickActions = [
    { icon: '📦', label: 'View Pickup Tasks', path: '/volunteer/tasks', color: 'var(--primary-500)' },
    { icon: '📜', label: 'Delivery History', path: '/volunteer/history', color: 'var(--accent-500)' },
    { icon: '🏆', label: 'My Badges', path: '/volunteer/badges', color: 'var(--secondary-300)' },
    { icon: '👤', label: 'My Profile', path: '/profile', color: 'var(--gray-500)' }
  ];

  const stats = {
    totalDeliveries: 47,
    thisMonth: 12,
    avgRating: 4.9,
    badges: 5
  };

  const pendingTasks = [
    {
      id: 1,
      foodName: 'Vegetable Biryani',
      quantity: '10 kg',
      donor: 'Taj Restaurant',
      donorAddress: '123 MG Road, Chennai',
      ngo: 'Hope Foundation',
      ngoAddress: '456 Anna Nagar, Chennai',
      distance: 4.5,
      urgency: 'high',
      eta: '~20 mins'
    }
  ];

  const recentActivity = [
    { type: 'delivery', text: 'Delivered Fresh Bread to Food For All', time: '2 hours ago', rating: 5 },
    { type: 'badge', text: 'Earned "Speed Demon" badge!', time: '1 day ago' },
    { type: 'delivery', text: 'Delivered Mixed Vegetables to Hope Foundation', time: '2 days ago', rating: 4 }
  ];

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome back, {user?.name || 'Volunteer'}! 👋</h1>
          <p className="dashboard-subtitle">Your contributions are making a difference</p>
        </div>

        {/* Onboarding check */}
        {!user?.volunteerProfile?.isOnboarded && (
          <div className="alert alert-info" style={{ marginBottom: 'var(--space-4)' }}>
            <span className="alert-icon">📚</span>
            <div style={{ flex: 1 }}>
              <strong>Complete Your Onboarding</strong>
              <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
                Finish your training to start accepting pickup tasks
              </p>
            </div>
            <button className="btn btn-info btn-sm" onClick={() => navigate('/volunteer/onboarding')}>
              Continue →
            </button>
          </div>
        )}

        {/* Active Task Alert */}
        {pendingTasks.length > 0 && (
          <div className="alert alert-warning" style={{ marginBottom: 'var(--space-4)' }}>
            <span className="alert-icon">🚨</span>
            <div style={{ flex: 1 }}>
              <strong>Active Pickup Task</strong>
              <p style={{ margin: 0, fontSize: 'var(--font-size-sm)' }}>
                {pendingTasks[0].foodName} - {pendingTasks[0].donor} → {pendingTasks[0].ngo}
              </p>
            </div>
            <button className="btn btn-warning btn-sm" onClick={() => navigate('/volunteer/tasks')}>
              View Task →
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon primary">🚴</div>
            <div className="stat-value">{stats.totalDeliveries}</div>
            <div className="stat-label">Total Deliveries</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon warning">📦</div>
            <div className="stat-value">{stats.thisMonth}</div>
            <div className="stat-label">This Month</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--secondary-50)' }}>⭐</div>
            <div className="stat-value">{stats.avgRating}</div>
            <div className="stat-label">Avg Rating</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon info">🏆</div>
            <div className="stat-value">{stats.badges}</div>
            <div className="stat-label">Badges Earned</div>
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
                background: activity.type === 'badge' ? 'var(--secondary-50)' : 'var(--success-50)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {activity.type === 'badge' ? '🏆' : '✅'}
              </div>
              <div style={{ flex: 1 }}>
                <div>{activity.text}</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-400)' }}>
                  {activity.time}
                  {activity.rating && (
                    <span style={{ marginLeft: 'var(--space-2)' }}>
                      {'⭐'.repeat(activity.rating)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          <Link to="/volunteer/history" style={{
            display: 'block',
            textAlign: 'center',
            marginTop: 'var(--space-4)',
            fontSize: 'var(--font-size-sm)'
          }}>
            View All History →
          </Link>
        </div>
      </div>
    </>
  );
}

export default VolunteerDashboard;
