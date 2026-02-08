import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';

function PickupTasks() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('available');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const tasks = {
    available: [
      {
        id: 1,
        foodName: 'Vegetable Biryani',
        quantity: '10 kg',
        servings: 50,
        donor: 'Taj Restaurant',
        donorAddress: '123 MG Road, Chennai',
        donorPhone: '+91 98765 43210',
        ngo: 'Hope Foundation',
        ngoAddress: '456 Anna Nagar, Chennai',
        ngoPhone: '+91 98765 12345',
        distance: 4.5,
        urgency: 'high',
        reward: 25
      },
      {
        id: 2,
        foodName: 'Fresh Bread',
        quantity: '25 pieces',
        servings: 25,
        donor: 'City Bakery',
        donorAddress: '789 T Nagar, Chennai',
        donorPhone: '+91 98765 67890',
        ngo: 'Food For All',
        ngoAddress: '321 Adyar, Chennai',
        ngoPhone: '+91 98765 54321',
        distance: 3.2,
        urgency: 'medium',
        reward: 15
      }
    ],
    active: [
      {
        id: 3,
        foodName: 'Mixed Vegetables',
        quantity: '15 kg',
        servings: 30,
        donor: 'Fresh Mart',
        donorAddress: '999 Velachery, Chennai',
        donorPhone: '+91 98765 11111',
        ngo: 'Care Foundation',
        ngoAddress: '111 Mylapore, Chennai',
        ngoPhone: '+91 98765 22222',
        distance: 5.0,
        status: 'heading_to_donor',
        acceptedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
      }
    ]
  };

  const handleAccept = (task) => {
    setSelectedTask(task);
    setShowConfirmModal(true);
  };

  const confirmAccept = () => {
    console.log('Task accepted:', selectedTask?.id);
    setShowConfirmModal(false);
    setSelectedTask(null);
    setActiveTab('active');
  };

  const getUrgencyBadge = (urgency) => {
    const badges = {
      high: { class: 'badge-danger', label: '🚨 Urgent' },
      medium: { class: 'badge-warning', label: '⚡ Medium' },
      low: { class: 'badge-success', label: '✓ Flexible' }
    };
    return badges[urgency] || badges.medium;
  };

  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Pickup Tasks</h1>
          <p className="dashboard-subtitle">Accept and complete food pickup deliveries</p>
        </div>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'available' ? 'active' : ''}`}
            onClick={() => setActiveTab('available')}
          >
            📋 Available ({tasks.available.length})
          </button>
          <button
            className={`tab ${activeTab === 'active' ? 'active' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            🚴 Active ({tasks.active.length})
          </button>
        </div>

        {/* Available Tasks */}
        {activeTab === 'available' && (
          <>
            {tasks.available.length === 0 ? (
              <div className="card">
                <div className="empty-state">
                  <div className="empty-state-icon">📦</div>
                  <h3 className="empty-state-title">No Tasks Available</h3>
                  <p className="empty-state-text">Check back soon for new pickup requests</p>
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                {tasks.available.map(task => {
                  const urgencyBadge = getUrgencyBadge(task.urgency);
                  return (
                    <div key={task.id} className="card" style={{ padding: 'var(--space-4)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                        <div>
                          <h3 style={{ marginBottom: 'var(--space-1)' }}>{task.foodName}</h3>
                          <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>
                            📦 {task.quantity} • 🍽️ ~{task.servings} servings
                          </div>
                        </div>
                        <span className={`badge ${urgencyBadge.class}`}>{urgencyBadge.label}</span>
                      </div>

                      {/* Route Info */}
                      <div style={{
                        background: 'var(--gray-50)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 'var(--space-3)',
                        marginBottom: 'var(--space-3)'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: 'var(--primary-500)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 'var(--font-size-sm)',
                            flexShrink: 0
                          }}>
                            A
                          </div>
                          <div>
                            <div style={{ fontWeight: '500' }}>{task.donor}</div>
                            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>{task.donorAddress}</div>
                          </div>
                        </div>
                        <div style={{ borderLeft: '2px dashed var(--gray-300)', height: '20px', marginLeft: '11px' }} />
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-3)' }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: 'var(--success-500)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 'var(--font-size-sm)',
                            flexShrink: 0
                          }}>
                            B
                          </div>
                          <div>
                            <div style={{ fontWeight: '500' }}>{task.ngo}</div>
                            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>{task.ngoAddress}</div>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: 'var(--space-4)', fontSize: 'var(--font-size-sm)', color: 'var(--gray-600)' }}>
                          <span>📍 {task.distance} km</span>
                          <span>🪙 {task.reward} points</span>
                        </div>
                        <button className="btn btn-primary" onClick={() => handleAccept(task)}>
                          ✋ Accept Task
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Active Tasks */}
        {activeTab === 'active' && (
          <>
            {tasks.active.length === 0 ? (
              <div className="card">
                <div className="empty-state">
                  <div className="empty-state-icon">🚴</div>
                  <h3 className="empty-state-title">No Active Tasks</h3>
                  <p className="empty-state-text">Accept a task to get started</p>
                </div>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                {tasks.active.map(task => (
                  <div key={task.id} className="card" style={{ padding: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
                      <div>
                        <h3 style={{ marginBottom: 'var(--space-1)' }}>{task.foodName}</h3>
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>
                          📦 {task.quantity} • 🍽️ ~{task.servings} servings
                        </div>
                      </div>
                      <span className="badge badge-info">🚴 In Progress</span>
                    </div>

                    {/* Progress Steps */}
                    <div style={{
                      background: 'var(--gray-50)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-4)',
                      marginBottom: 'var(--space-4)'
                    }}>
                      {[
                        { key: 'heading_to_donor', label: 'Heading to Pickup', icon: '🚴' },
                        { key: 'at_donor', label: 'At Donor Location', icon: '📍' },
                        { key: 'picked_up', label: 'Food Picked Up', icon: '📦' },
                        { key: 'heading_to_ngo', label: 'Heading to NGO', icon: '🚴' },
                        { key: 'delivered', label: 'Delivered', icon: '✅' }
                      ].map((step, idx) => {
                        const isActive = step.key === task.status;
                        const isComplete = ['heading_to_donor'].indexOf(task.status) > idx;
                        return (
                          <div key={step.key} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: idx < 4 ? 'var(--space-2)' : 0 }}>
                            <div style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              background: isComplete ? 'var(--success-500)' : isActive ? 'var(--primary-500)' : 'var(--gray-200)',
                              color: isComplete || isActive ? 'white' : 'var(--gray-500)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '14px'
                            }}>
                              {isComplete ? '✓' : step.icon}
                            </div>
                            <span style={{
                              fontWeight: isActive ? '600' : '400',
                              color: isActive ? 'var(--gray-800)' : 'var(--gray-500)'
                            }}>
                              {step.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Contact Info */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                      <div style={{ padding: 'var(--space-3)', background: 'var(--primary-50)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontWeight: '500', marginBottom: 'var(--space-1)' }}>📍 Pickup: {task.donor}</div>
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-600)' }}>{task.donorAddress}</div>
                        <button className="btn btn-primary btn-sm" style={{ marginTop: 'var(--space-2)' }}>
                          📞 Call Donor
                        </button>
                      </div>
                      <div style={{ padding: 'var(--space-3)', background: 'var(--success-50)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontWeight: '500', marginBottom: 'var(--space-1)' }}>🏠 Deliver: {task.ngo}</div>
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-600)' }}>{task.ngoAddress}</div>
                        <button className="btn btn-success btn-sm" style={{ marginTop: 'var(--space-2)' }}>
                          📞 Call NGO
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                      <button className="btn btn-secondary" style={{ flex: 1 }}>
                        🗺️ Open in Maps
                      </button>
                      <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => navigate('/volunteer/confirm-delivery/' + task.id)}>
                        Next Step →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Accept Confirmation Modal */}
        {showConfirmModal && (
          <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
            <div className="modal" onClick={e => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">Accept Pickup Task</h3>
                <button className="modal-close" onClick={() => setShowConfirmModal(false)}>×</button>
              </div>
              <div className="modal-body">
                <p>You are about to accept the following task:</p>
                <div style={{
                  padding: 'var(--space-3)',
                  background: 'var(--gray-50)',
                  borderRadius: 'var(--radius-lg)',
                  marginTop: 'var(--space-3)'
                }}>
                  <div style={{ fontWeight: '600', marginBottom: 'var(--space-2)' }}>
                    {selectedTask?.foodName} ({selectedTask?.quantity})
                  </div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-600)' }}>
                    {selectedTask?.donor} → {selectedTask?.ngo}
                  </div>
                  <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)', marginTop: 'var(--space-2)' }}>
                    📍 {selectedTask?.distance} km • 🪙 {selectedTask?.reward} points
                  </div>
                </div>
                <div className="alert alert-info" style={{ marginTop: 'var(--space-4)' }}>
                  <span className="alert-icon">💡</span>
                  <div>Once accepted, you should complete the pickup within 1 hour.</div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowConfirmModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={confirmAccept}>
                  ✓ Accept Task
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default PickupTasks;
