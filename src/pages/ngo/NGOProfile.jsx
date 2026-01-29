import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';

function NGOProfile() {
    const { user } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState('capacity');
    const [saved, setSaved] = useState(false);

    const [profile, setProfile] = useState({
        // Storage Capacity
        fridgeCapacity: 100,
        dryStorageCapacity: 200,
        freezerCapacity: 50,

        // Dietary Preferences
        acceptsVeg: true,
        acceptsNonVeg: true,
        acceptsHalal: false,
        acceptsKosher: false,

        // Populations Served
        servesChildren: true,
        servesElderly: true,
        servesHomeless: true,
        servesStudents: false,
        servesMigrants: false,

        // Service Area
        serviceRadius: 10,
        address: 'Chennai, Tamil Nadu',
        latitude: 13.0827,
        longitude: 80.2707
    });

    const handleChange = (field, value) => {
        setProfile(prev => ({ ...prev, [field]: value }));
        setSaved(false);
    };

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <>
            <Navbar />
            <div className="dashboard">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">NGO Profile</h1>
                    <p className="dashboard-subtitle">Configure your capacity and preferences to receive suitable donations</p>
                </div>

                {saved && (
                    <div className="alert alert-success" style={{ marginBottom: 'var(--space-4)' }}>
                        <span>✓</span> <span>Profile saved successfully!</span>
                    </div>
                )}

                {/* Tabs */}
                <div className="tabs">
                    <button className={`tab ${activeTab === 'capacity' ? 'active' : ''}`} onClick={() => setActiveTab('capacity')}>
                        📦 Storage Capacity
                    </button>
                    <button className={`tab ${activeTab === 'dietary' ? 'active' : ''}`} onClick={() => setActiveTab('dietary')}>
                        🥗 Dietary Preferences
                    </button>
                    <button className={`tab ${activeTab === 'area' ? 'active' : ''}`} onClick={() => setActiveTab('area')}>
                        📍 Service Area
                    </button>
                    <button className={`tab ${activeTab === 'population' ? 'active' : ''}`} onClick={() => setActiveTab('population')}>
                        👥 Populations Served
                    </button>
                </div>

                {/* Storage Capacity Tab */}
                {activeTab === 'capacity' && (
                    <div className="card">
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Storage Capacity</h3>
                        <p style={{ color: 'var(--gray-500)', marginBottom: 'var(--space-6)' }}>
                            Define your storage capabilities to receive appropriate food donations
                        </p>

                        {[
                            { key: 'fridgeCapacity', label: 'Refrigerator Storage', icon: '🧊', unit: 'kg', color: 'var(--accent-400)' },
                            { key: 'freezerCapacity', label: 'Freezer Storage', icon: '❄️', unit: 'kg', color: 'var(--primary-400)' },
                            { key: 'dryStorageCapacity', label: 'Dry Storage', icon: '📦', unit: 'kg', color: 'var(--secondary-400)' }
                        ].map(item => (
                            <div key={item.key} style={{ marginBottom: 'var(--space-6)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                                    <label className="form-label" style={{ marginBottom: 0 }}>
                                        {item.icon} {item.label}
                                    </label>
                                    <span style={{ fontWeight: '600', color: item.color }}>
                                        {profile[item.key]} {item.unit}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="500"
                                    value={profile[item.key]}
                                    onChange={(e) => handleChange(item.key, parseInt(e.target.value))}
                                    style={{ width: '100%', accentColor: item.color }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', color: 'var(--gray-400)' }}>
                                    <span>0 kg</span>
                                    <span>500 kg</span>
                                </div>
                            </div>
                        ))}

                        <button className="btn btn-primary" onClick={handleSave}>Save Changes</button>
                    </div>
                )}

                {/* Dietary Preferences Tab */}
                {activeTab === 'dietary' && (
                    <div className="card">
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Dietary Preferences</h3>
                        <p style={{ color: 'var(--gray-500)', marginBottom: 'var(--space-6)' }}>
                            Select the types of food your organization can accept
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--space-3)' }}>
                            {[
                                { key: 'acceptsVeg', label: 'Vegetarian', icon: '🥬', color: 'var(--success-500)' },
                                { key: 'acceptsNonVeg', label: 'Non-Vegetarian', icon: '🍖', color: 'var(--danger-400)' },
                                { key: 'acceptsHalal', label: 'Halal Certified', icon: '☪️', color: 'var(--accent-500)' },
                                { key: 'acceptsKosher', label: 'Kosher', icon: '✡️', color: 'var(--secondary-400)' }
                            ].map(pref => (
                                <label
                                    key={pref.key}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--space-3)',
                                        padding: 'var(--space-4)',
                                        border: '2px solid',
                                        borderColor: profile[pref.key] ? pref.color : 'var(--gray-200)',
                                        borderRadius: 'var(--radius-lg)',
                                        cursor: 'pointer',
                                        background: profile[pref.key] ? `${pref.color}10` : 'white',
                                        transition: 'all var(--transition-fast)'
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={profile[pref.key]}
                                        onChange={(e) => handleChange(pref.key, e.target.checked)}
                                        className="form-checkbox"
                                    />
                                    <span style={{ fontSize: '24px' }}>{pref.icon}</span>
                                    <span style={{ fontWeight: '500' }}>{pref.label}</span>
                                </label>
                            ))}
                        </div>

                        <button className="btn btn-primary" style={{ marginTop: 'var(--space-6)' }} onClick={handleSave}>
                            Save Preferences
                        </button>
                    </div>
                )}

                {/* Service Area Tab */}
                {activeTab === 'area' && (
                    <div className="card">
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Service Area</h3>
                        <p style={{ color: 'var(--gray-500)', marginBottom: 'var(--space-6)' }}>
                            Define the area where you can receive food donations
                        </p>

                        <div className="form-group">
                            <label className="form-label">📍 Base Address</label>
                            <input
                                type="text"
                                className="form-input"
                                value={profile.address}
                                onChange={(e) => handleChange('address', e.target.value)}
                                placeholder="Enter your organization address"
                            />
                        </div>

                        <div className="form-group">
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                                <label className="form-label" style={{ marginBottom: 0 }}>Service Radius</label>
                                <span style={{ fontWeight: '600', color: 'var(--primary-500)' }}>
                                    {profile.serviceRadius} km
                                </span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="50"
                                value={profile.serviceRadius}
                                onChange={(e) => handleChange('serviceRadius', parseInt(e.target.value))}
                                style={{ width: '100%', accentColor: 'var(--primary-500)' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', color: 'var(--gray-400)' }}>
                                <span>1 km</span>
                                <span>50 km</span>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="map-placeholder" style={{ marginBottom: 'var(--space-4)' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '48px', marginBottom: 'var(--space-2)' }}>🗺️</div>
                                <p>Map showing {profile.serviceRadius}km radius around {profile.address}</p>
                            </div>
                        </div>

                        <button className="btn btn-primary" onClick={handleSave}>Save Service Area</button>
                    </div>
                )}

                {/* Populations Served Tab */}
                {activeTab === 'population' && (
                    <div className="card">
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Populations Served</h3>
                        <p style={{ color: 'var(--gray-500)', marginBottom: 'var(--space-6)' }}>
                            Select the groups your organization primarily serves
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 'var(--space-3)' }}>
                            {[
                                { key: 'servesChildren', label: 'Children', icon: '👶' },
                                { key: 'servesElderly', label: 'Elderly', icon: '👴' },
                                { key: 'servesHomeless', label: 'Homeless', icon: '🏠' },
                                { key: 'servesStudents', label: 'Students', icon: '🎓' },
                                { key: 'servesMigrants', label: 'Migrants', icon: '🌍' }
                            ].map(pop => (
                                <label
                                    key={pop.key}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: 'var(--space-2)',
                                        padding: 'var(--space-4)',
                                        border: '2px solid',
                                        borderColor: profile[pop.key] ? 'var(--primary-400)' : 'var(--gray-200)',
                                        borderRadius: 'var(--radius-lg)',
                                        cursor: 'pointer',
                                        background: profile[pop.key] ? 'var(--primary-50)' : 'white',
                                        transition: 'all var(--transition-fast)'
                                    }}
                                >
                                    <span style={{ fontSize: '32px' }}>{pop.icon}</span>
                                    <span style={{ fontWeight: '500' }}>{pop.label}</span>
                                    <input
                                        type="checkbox"
                                        checked={profile[pop.key]}
                                        onChange={(e) => handleChange(pop.key, e.target.checked)}
                                        className="form-checkbox"
                                    />
                                </label>
                            ))}
                        </div>

                        <button className="btn btn-primary" style={{ marginTop: 'var(--space-6)' }} onClick={handleSave}>
                            Save Populations
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default NGOProfile;
