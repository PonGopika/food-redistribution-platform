import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [reports, setReports] = useState({ riskyUsers: [], cancelledListings: [] });
    const [loading, setLoading] = useState(true);

    const API_URL = "http://localhost:5000/api";
    const token = localStorage.getItem('token');
    const config = { headers: { 'x-auth-token': token } };

    // Fetch Initial Data
    useEffect(() => {
        fetchStats();
    }, []);

    // Fetch Data based on Tab
    useEffect(() => {
        if (activeTab === 'users' || activeTab === 'verification') fetchUsers();
        if (activeTab === 'safety') fetchReports();
    }, [activeTab]);

    const fetchStats = async () => {
        try {
            const res = await axios.get(`${API_URL}/admin/stats`, config);
            setStats(res.data);
            setLoading(false);
        } catch (err) { console.error("Error fetching admin stats"); }
    };

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${API_URL}/admin/users`, config);
            setUsers(res.data);
        } catch (err) { console.error("Error fetching users"); }
    };

    const fetchReports = async () => {
        try {
            const res = await axios.get(`${API_URL}/admin/reports`, config);
            setReports(res.data);
        } catch (err) { console.error("Error fetching reports"); }
    };

    const verifyUser = async (id) => {
        try {
            await axios.put(`${API_URL}/admin/verify/${id}`, {}, config);
            alert("✅ User Verified!");
            fetchUsers();
            fetchStats();
        } catch (err) { alert("Verification failed"); }
    };

    const toggleBan = async (id, currentStatus) => {
        if (!window.confirm(`Are you sure you want to ${currentStatus ? 'Unban' : 'Ban'} this user?`)) return;
        try {
            await axios.put(`${API_URL}/admin/ban/${id}`, {}, config);
            alert(`User ${currentStatus ? 'Unbanned' : 'Banned'}`);
            fetchUsers();
        } catch (err) { alert("Action failed"); }
    };

    if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading Admin Dashboard...</div>;

    // STYLES
    const containerStyle = { padding: '20px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Arial, sans-serif' };
    const headerStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '2px solid #333', paddingBottom: '10px' };
    const tabContainerStyle = { display: 'flex', gap: '10px', marginBottom: '20px' };
    const tabStyle = (isActive) => ({
        padding: '10px 20px', cursor: 'pointer', borderRadius: '5px', border: 'none', fontWeight: 'bold',
        background: isActive ? '#2c3e50' : '#ecf0f1', color: isActive ? 'white' : '#333'
    });
    const cardStyle = { background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)', marginBottom: '15px' };
    const tableStyle = { width: '100%', borderCollapse: 'collapse', marginTop: '10px' };
    const thStyle = { textAlign: 'left', padding: '10px', background: '#f8f9fa', borderBottom: '2px solid #ddd' };
    const tdStyle = { padding: '10px', borderBottom: '1px solid #eee' };
    const badgeStyle = (type) => ({
        padding: '4px 8px', borderRadius: '12px', fontSize: '0.8em', fontWeight: 'bold',
        background: type === 'Verified' ? '#d4edda' : (type === 'Banned' ? '#f8d7da' : '#fff3cd'),
        color: type === 'Verified' ? '#155724' : (type === 'Banned' ? '#721c24' : '#856404')
    });

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1>🛡️ Admin Dashboard</h1>
                <button onClick={() => window.location.reload()} style={{ padding: '8px 15px', cursor: 'pointer' }}>Refresh</button>
            </div>

            {/* TABS */}
            <div style={tabContainerStyle}>
                <button style={tabStyle(activeTab === 'overview')} onClick={() => setActiveTab('overview')}>📊 Overview</button>
                <button style={tabStyle(activeTab === 'verification')} onClick={() => setActiveTab('verification')}>✅ Verification ({stats?.users?.pending || 0})</button>
                <button style={tabStyle(activeTab === 'safety')} onClick={() => setActiveTab('safety')}>⚠️ Safety Monitor</button>
                <button style={tabStyle(activeTab === 'users')} onClick={() => setActiveTab('users')}>👥 User Management</button>
            </div>

            {/* CONTENT */}
            {activeTab === 'overview' && stats && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <div style={cardStyle}><h3>Total Users</h3><p style={{ fontSize: '2em', margin: '10px 0' }}>{stats.users.total}</p><small>{stats.users.donors} Donors, {stats.users.ngos} NGOs</small></div>
                    <div style={cardStyle}><h3>Active Listings</h3><p style={{ fontSize: '2em', margin: '10px 0', color: '#27ae60' }}>{stats.listings.active}</p></div>
                    <div style={cardStyle}><h3>Food Diverted</h3><p style={{ fontSize: '2em', margin: '10px 0', color: '#e67e22' }}>{stats.impact.foodSaved} kg</p></div>
                    <div style={cardStyle}><h3>Pending Verifications</h3><p style={{ fontSize: '2em', margin: '10px 0', color: '#c0392b' }}>{stats.users.pending}</p></div>
                </div>
            )}

            {activeTab === 'verification' && (
                <div style={cardStyle}>
                    <h3>Pending Verifications</h3>
                    {users.filter(u => !u.isVerified && (u.role === 'NGO' || u.role === 'Donor')).length === 0 ? <p>No pending verifications.</p> : (
                        <table style={tableStyle}>
                            <thead><tr><th style={thStyle}>Name</th><th style={thStyle}>Role</th><th style={thStyle}>Reg Number</th><th style={thStyle}>Action</th></tr></thead>
                            <tbody>
                                {users.filter(u => !u.isVerified && (u.role === 'NGO' || u.role === 'Donor')).map(user => (
                                    <tr key={user._id}>
                                        <td style={tdStyle}>{user.name}<br /><small>{user.email}</small></td>
                                        <td style={tdStyle}>{user.role}</td>
                                        <td style={tdStyle}>{user.ngoRegNumber || 'N/A'}</td>
                                        <td style={tdStyle}>
                                            <button onClick={() => verifyUser(user._id)} style={{ background: '#2ecc71', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>Approve</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {activeTab === 'safety' && (
                <div>
                    <div style={cardStyle}>
                        <h3 style={{ color: '#c0392b' }}>🚩 High Risk Users (Low Rating)</h3>
                        {reports.riskyUsers.length === 0 ? <p>No high-risk users detected.</p> : (
                            <table style={tableStyle}>
                                <thead><tr><th style={thStyle}>User</th><th style={thStyle}>Avg Rating</th><th style={thStyle}>Action</th></tr></thead>
                                <tbody>
                                    {reports.riskyUsers.map(risk => (
                                        <tr key={risk.user._id}>
                                            <td style={tdStyle}>{risk.user.name}</td>
                                            <td style={tdStyle}>{risk.avgRating.toFixed(1)} ⭐</td>
                                            <td style={tdStyle}>
                                                <button onClick={() => toggleBan(risk.user._id, risk.user.isBanned)} style={{ background: '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                                                    {risk.user.isBanned ? 'Unban' : 'Ban User'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div style={cardStyle}>
                        <h3>🛑 Recently Cancelled Listings</h3>
                        {reports.cancelledListings.length === 0 ? <p>No cancellations recently.</p> : (
                            <table style={tableStyle}>
                                <thead><tr><th style={thStyle}>Donor</th><th style={thStyle}>Title</th><th style={thStyle}>Reason</th></tr></thead>
                                <tbody>
                                    {reports.cancelledListings.map(item => (
                                        <tr key={item._id}>
                                            <td style={tdStyle}>{item.donor?.name || 'Unknown'}</td>
                                            <td style={tdStyle}>{item.title}</td>
                                            <td style={tdStyle}>{item.cancellationReason || 'No reason provided'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            )}

            {activeTab === 'users' && (
                <div style={cardStyle}>
                    <h3>All Users</h3>
                    <table style={tableStyle}>
                        <thead><tr><th style={thStyle}>Name</th><th style={thStyle}>Role</th><th style={thStyle}>Status</th><th style={thStyle}>Action</th></tr></thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td style={tdStyle}>{user.name}<br /><small>{user.email}</small></td>
                                    <td style={tdStyle}>{user.role}</td>
                                    <td style={tdStyle}>
                                        {user.isVerified && <span style={badgeStyle('Verified')}>Verified</span>}
                                        {user.isBanned && <span style={{ ...badgeStyle('Banned'), marginLeft: '5px' }}>Banned</span>}
                                        {!user.isVerified && !user.isBanned && <span style={badgeStyle('Pending')}>Pending</span>}
                                    </td>
                                    <td style={tdStyle}>
                                        <button onClick={() => toggleBan(user._id, user.isBanned)} style={{ background: user.isBanned ? '#3498db' : '#e74c3c', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                                            {user.isBanned ? 'Unban' : 'Ban'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
