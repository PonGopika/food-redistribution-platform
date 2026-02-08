import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VerifiedBadge from './VerifiedBadge';
import { useToast } from '../context/ToastProvider';

const AdminDashboard = ({ token }) => {
    const [view, setView] = useState('verify'); // 'verify', 'users', 'stats', 'activity'
    const [users, setUsers] = useState([]);
    const [stats, setStats] = useState(null);
    const [activities, setActivities] = useState([]);
    const { addToast } = useToast();

    const API_URL = "http://localhost:5000/api";
    const config = { headers: { 'x-auth-token': token } };

    useEffect(() => {
        if (view === 'verify' || view === 'users') {
            fetchUsers();
        } else if (view === 'stats') {
            fetchStats();
        } else if (view === 'activity') {
            fetchActivities();
        }
    }, [view]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${API_URL}/admin/users`, config);
            setUsers(res.data);
        } catch (err) {
            console.error("Error fetching users", err);
        }
    };

    const fetchStats = async () => {
        try {
            const res = await axios.get(`${API_URL}/admin/stats`, config);
            setStats(res.data);
        } catch (err) {
            console.error("Error fetching stats", err);
        }
    };

    const fetchActivities = async () => {
        try {
            const res = await axios.get(`${API_URL}/admin/activity`, config);
            setActivities(res.data);
        } catch (err) {
            console.error("Error fetching activities", err);
        }
    };

    const toggleVerify = async (id) => {
        try {
            await axios.put(`${API_URL}/admin/verify/${id}`, {}, config);
            fetchUsers();
            addToast("User verification updated", 'success');
        } catch (err) {
            addToast("Action failed", 'error');
        }
    };

    const toggleBan = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await axios.put(`${API_URL}/admin/ban/${id}`, {}, config);
            fetchUsers();
            addToast("User ban status updated", 'success');
        } catch (err) {
            addToast("Action failed", 'error');
        }
    };

    // Filter validation lists
    const unverifiedUsers = users.filter(u => !u.isVerified && u.role !== 'Admin');

    return (
        <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '10px' }}>🛡️ Admin Dashboard</h2>

            <div style={{ display: 'flex', gap: '10px', margin: '20px 0' }}>
                <button onClick={() => setView('verify')} style={view === 'verify' ? activeBtn : btn}>Verify Users ({unverifiedUsers.length})</button>
                <button onClick={() => setView('users')} style={view === 'users' ? activeBtn : btn}>All Users</button>
                <button onClick={() => setView('stats')} style={view === 'stats' ? activeBtn : btn}>Platform Stats</button>
                <button onClick={() => setView('activity')} style={view === 'activity' ? activeBtn : btn}>Activity Log</button>
            </div>

            {view === 'verify' && (
                <div>
                    <h3>Pending Verification</h3>
                    {unverifiedUsers.length === 0 ? <p>No pending verifications.</p> : (
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: '#f4f4f4' }}><th style={th}>Name</th><th style={th}>Role</th><th style={th}>Reg No.</th><th style={th}>Action</th></tr>
                            </thead>
                            <tbody>
                                {unverifiedUsers.map(u => (
                                    <tr key={u._id} style={{ borderBottom: '1px solid #eee' }}>
                                        <td style={td}>{u.name}</td>
                                        <td style={td}>{u.role}</td>
                                        <td style={td}>{u.ngoRegNumber || 'N/A'}</td>
                                        <td style={td}>
                                            <button onClick={() => toggleVerify(u._id)} style={{ ...btn, background: '#27ae60', color: 'white' }}>✅ Approve</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {view === 'users' && (
                <div>
                    <h3>User Management</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f4f4f4' }}><th style={th}>Name</th><th style={th}>Role</th><th style={th}>Status</th><th style={th}>Action</th></tr>
                        </thead>
                        <tbody>
                            {users.map(u => (
                                <tr key={u._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={td}>
                                        {u.name}
                                        {u.role === 'Admin' && '🛡️'}
                                        {u.isVerified && <VerifiedBadge />}
                                    </td>
                                    <td style={td}>{u.role}</td>
                                    <td style={td}>
                                        {u.isBanned ? <span style={{ color: 'red' }}>BANNED</span> : <span style={{ color: 'green' }}>Active</span>}
                                        {!u.isVerified && ' (Unverified)'}
                                    </td>
                                    <td style={td}>
                                        {u.role !== 'Admin' && (
                                            <button onClick={() => toggleBan(u._id)} style={{ ...btn, background: u.isBanned ? '#3498db' : '#c0392b', color: 'white' }}>
                                                {u.isBanned ? 'Unban' : '🚫 Ban'}
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {view === 'stats' && stats && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    <div style={statCard}>
                        <h4>Users</h4>
                        <p>Total: {stats.users.total}</p>
                        <p>Donors: {stats.users.donors}</p>
                        <p>NGOs: {stats.users.ngos}</p>
                        <p>Volunteers: {stats.users.volunteers}</p>
                    </div>
                    <div style={statCard}>
                        <h4>Listings</h4>
                        <p>Available: {stats.listings.Available}</p>
                        <p>Claimed: {stats.listings.Claimed}</p>
                        <p>Delivered: {stats.listings.Delivered}</p>
                    </div>
                </div>
            )}

            {view === 'activity' && (
                <div>
                    <h3>Recent Activity</h3>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ background: '#f4f4f4' }}>
                                <th style={th}>Time</th>
                                <th style={th}>User</th>
                                <th style={th}>Action</th>
                                <th style={th}>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map(log => (
                                <tr key={log._id} style={{ borderBottom: '1px solid #eee' }}>
                                    <td style={td}>{new Date(log.createdAt).toLocaleString()}</td>
                                    <td style={td}>{log.user ? `${log.user.name} (${log.user.role})` : 'Unknown'}</td>
                                    <td style={td}>{log.action}</td>
                                    <td style={td}>{log.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

const btn = { padding: '8px 15px', border: '1px solid #ddd', borderRadius: '5px', cursor: 'pointer', background: '#fff' };
const activeBtn = { ...btn, background: '#333', color: '#fff', borderColor: '#333' };
const th = { padding: '10px', textAlign: 'left' };
const td = { padding: '10px' };
const statCard = { padding: '15px', border: '1px solid #eee', borderRadius: '8px', background: '#fafafa' };

export default AdminDashboard;
