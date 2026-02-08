import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';

function ProfileDashboard() {
    const navigate = useNavigate();
    const { user, logout, changeLanguage, language } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('personal');
    const [saved, setSaved] = useState(false);

    const [profile, setProfile] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: '',
        bio: ''
    });

    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        smsAlerts: false,
        pushNotifications: true,
        weeklyDigest: true,
        urgentOnly: false
    });

    // Mock contribution history
    const history = [
        { id: 1, type: 'donation', description: 'Listed 50kg Cooked Rice', date: '2026-01-28', status: 'delivered' },
        { id: 2, type: 'donation', description: 'Listed 20kg Fresh Vegetables', date: '2026-01-25', status: 'delivered' },
        { id: 3, type: 'donation', description: 'Listed 15kg Bakery Items', date: '2026-01-20', status: 'expired' },
        { id: 4, type: 'donation', description: 'Listed 30kg Dairy Products', date: '2026-01-15', status: 'delivered' }
    ];

    const handleProfileChange = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
        setSaved(false);
    };

    const handleNotificationChange = (field) => {
        setNotifications(prev => ({ ...prev, [field]: !prev[field] }));
        setSaved(false);
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const handleDeactivate = () => {
        if (window.confirm('Are you sure you want to deactivate your account? This action cannot be undone.')) {
            logout();
            navigate('/');
        }
    };

    const handleExportData = () => {
        // Mock data export
        const data = JSON.stringify({ profile, history }, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'my-foodshare-data.json';
        a.click();
    };

    return (
        <>
            <Navbar />
            <div className="dashboard">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">My Profile</h1>
                    <p className="dashboard-subtitle">Manage your account settings and preferences</p>
                </div>

                {saved && (
                    <div className="alert alert-success" style={{ marginBottom: 'var(--space-4)' }}>
                        <span>✓</span> <span>Changes saved successfully!</span>
                    </div>
                )}

                {/* Profile Card */}
                <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            borderRadius: 'var(--radius-full)',
                            background: 'linear-gradient(135deg, var(--primary-400) 0%, var(--primary-600) 100%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            fontSize: '32px',
                            fontWeight: '700'
                        }}>
                            {user?.name?.charAt(0) || '?'}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ marginBottom: 'var(--space-1)' }}>{user?.name || 'User'}</h3>
                            <p style={{ color: 'var(--gray-500)' }}>{user?.email}</p>
                            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
                                <span className="badge badge-primary" style={{ textTransform: 'capitalize' }}>
                                    {user?.role || 'Member'}
                                </span>
                                {user?.isVerified && <span className="badge badge-verified">✓ Verified</span>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs">
                    <button className={`tab ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => setActiveTab('personal')}>
                        👤 Personal Info
                    </button>
                    <button className={`tab ${activeTab === 'notifications' ? 'active' : ''}`} onClick={() => setActiveTab('notifications')}>
                        🔔 Notifications
                    </button>
                    <button className={`tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
                        📊 History
                    </button>
                    <button className={`tab ${activeTab === 'account' ? 'active' : ''}`} onClick={() => setActiveTab('account')}>
                        ⚙️ Account
                    </button>
                </div>

                {/* Personal Info Tab */}
                {activeTab === 'personal' && (
                    <div className="card">
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Personal Information</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)' }}>
                            <div className="form-group">
                                <label className="form-label">Full Name</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={profile.name}
                                    onChange={(e) => handleProfileChange('name', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={profile.email}
                                    onChange={(e) => handleProfileChange('email', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Phone</label>
                                <input
                                    type="tel"
                                    className="form-input"
                                    value={profile.phone}
                                    onChange={(e) => handleProfileChange('phone', e.target.value)}
                                    placeholder="Enter phone number"
                                />
                            </div>
                            <div className="form-group">
                                <label className="form-label">Address</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={profile.address}
                                    onChange={(e) => handleProfileChange('address', e.target.value)}
                                    placeholder="Enter address"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Bio</label>
                            <textarea
                                className="form-textarea"
                                value={profile.bio}
                                onChange={(e) => handleProfileChange('bio', e.target.value)}
                                placeholder="Tell us about yourself or your organization..."
                                rows={3}
                            />
                        </div>

                        <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
                    </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                    <div className="card">
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Notification Preferences</h3>

                        {[
                            { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive notifications via email', icon: '📧' },
                            { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Receive text message notifications', icon: '📱' },
                            { key: 'pushNotifications', label: 'Push Notifications', desc: 'Browser/app push notifications', icon: '🔔' },
                            { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Summary of platform activity', icon: '📰' },
                            { key: 'urgentOnly', label: 'Urgent Only', desc: 'Only notify for urgent food items', icon: '🚨' }
                        ].map(item => (
                            <div key={item.key} style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                padding: 'var(--space-4)',
                                borderBottom: '1px solid var(--gray-100)'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    <span style={{ fontSize: '24px' }}>{item.icon}</span>
                                    <div>
                                        <div style={{ fontWeight: '500' }}>{item.label}</div>
                                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>{item.desc}</div>
                                    </div>
                                </div>
                                <div
                                    className={`toggle ${notifications[item.key] ? 'active' : ''}`}
                                    onClick={() => handleNotificationChange(item.key)}
                                >
                                    <div className="toggle-knob" />
                                </div>
                            </div>
                        ))}

                        <div style={{ marginTop: 'var(--space-4)' }}>
                            <label className="form-label">Preferred Language</label>
                            <select
                                className="form-select"
                                value={language}
                                onChange={(e) => changeLanguage(e.target.value)}
                                style={{ maxWidth: '200px' }}
                            >
                                <option value="en">🇺🇸 English</option>
                                <option value="hi">🇮🇳 हिंदी</option>
                                <option value="ta">🇮🇳 தமிழ்</option>
                            </select>
                        </div>

                        <button className="btn btn-primary" style={{ marginTop: 'var(--space-4)' }} onClick={handleSave}>
                            Save Preferences
                        </button>
                    </div>
                )}

                {/* History Tab */}
                {activeTab === 'history' && (
                    <div className="card">
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Contribution History</h3>

                        {history.length === 0 ? (
                            <div className="empty-state">
                                <div className="empty-state-icon">📦</div>
                                <h4>No History Yet</h4>
                                <p className="empty-state-text">Your contributions will appear here</p>
                            </div>
                        ) : (
                            <div>
                                {history.map(item => (
                                    <div key={item.id} style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--space-4)',
                                        padding: 'var(--space-4)',
                                        borderBottom: '1px solid var(--gray-100)'
                                    }}>
                                        <div style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: 'var(--radius-lg)',
                                            background: item.status === 'delivered' ? 'var(--success-50)' : 'var(--gray-100)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            {item.status === 'delivered' ? '✓' : '⏱'}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '500' }}>{item.description}</div>
                                            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>{item.date}</div>
                                        </div>
                                        <span className={`badge ${item.status === 'delivered' ? 'badge-success' : 'badge-warning'}`}>
                                            {item.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Account Tab */}
                {activeTab === 'account' && (
                    <div className="card">
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Account Settings</h3>

                        <div style={{
                            padding: 'var(--space-4)',
                            background: 'var(--gray-50)',
                            borderRadius: 'var(--radius-lg)',
                            marginBottom: 'var(--space-4)'
                        }}>
                            <h4 style={{ marginBottom: 'var(--space-2)' }}>📤 Export Your Data</h4>
                            <p style={{ color: 'var(--gray-500)', marginBottom: 'var(--space-3)', fontSize: 'var(--font-size-sm)' }}>
                                Download a copy of all your data in JSON format
                            </p>
                            <button className="btn btn-secondary btn-sm" onClick={handleExportData}>
                                Download Data
                            </button>
                        </div>

                        <div style={{
                            padding: 'var(--space-4)',
                            background: 'var(--danger-50)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--danger-100)'
                        }}>
                            <h4 style={{ marginBottom: 'var(--space-2)', color: 'var(--danger-600)' }}>⚠️ Danger Zone</h4>
                            <p style={{ color: 'var(--gray-600)', marginBottom: 'var(--space-3)', fontSize: 'var(--font-size-sm)' }}>
                                Once you deactivate your account, there is no going back. Please be certain.
                            </p>
                            <button className="btn btn-danger btn-sm" onClick={handleDeactivate}>
                                Deactivate Account
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProfileDashboard;
