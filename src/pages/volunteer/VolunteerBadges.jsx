import { useState } from 'react';
import Navbar from '../../components/common/Navbar';

function VolunteerBadges() {
    const [selectedBadge, setSelectedBadge] = useState(null);

    const badges = {
        earned: [
            { id: 1, name: 'First Delivery', icon: '🎯', desc: 'Completed your first delivery', earnedAt: '2026-01-10' },
            { id: 2, name: 'Speed Demon', icon: '⚡', desc: 'Completed 5 deliveries in one day', earnedAt: '2026-01-20' },
            { id: 3, name: 'Early Bird', icon: '🐦', desc: 'Made a delivery before 8 AM', earnedAt: '2026-01-22' },
            { id: 4, name: 'Night Owl', icon: '🦉', desc: 'Made a delivery after 10 PM', earnedAt: '2026-01-25' },
            { id: 5, name: 'Consistent Helper', icon: '📅', desc: 'Made deliveries 7 days in a row', earnedAt: '2026-01-28' }
        ],
        inProgress: [
            { id: 6, name: 'Super Volunteer', icon: '🦸', desc: 'Complete 50 deliveries', progress: 47, total: 50 },
            { id: 7, name: 'Hygiene Hero', icon: '🧼', desc: 'Get 10 perfect hygiene ratings', progress: 7, total: 10 },
            { id: 8, name: 'Distance Champion', icon: '🏃', desc: 'Cover 100km total', progress: 85, total: 100 }
        ],
        locked: [
            { id: 9, name: 'Century Club', icon: '💯', desc: 'Complete 100 deliveries', requirement: 'Complete 100 deliveries' },
            { id: 10, name: 'Top Rated', icon: '⭐', desc: 'Maintain 5-star rating for 30 days', requirement: '30 consecutive days of 5-star ratings' },
            { id: 11, name: 'Community Hero', icon: '🏆', desc: 'Feed 10,000 people', requirement: 'Contribute to meals for 10,000 people' }
        ]
    };

    return (
        <>
            <Navbar />
            <div className="dashboard">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">🏆 My Badges</h1>
                    <p className="dashboard-subtitle">Achievements and milestones</p>
                </div>

                {/* Stats Summary */}
                <div className="card" style={{
                    marginBottom: 'var(--space-6)',
                    background: 'linear-gradient(135deg, var(--secondary-100) 0%, var(--secondary-200) 100%)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', textAlign: 'center' }}>
                        <div>
                            <div style={{ fontSize: '36px', fontWeight: '700', color: 'var(--secondary-600)' }}>
                                {badges.earned.length}
                            </div>
                            <div style={{ color: 'var(--gray-600)' }}>Badges Earned</div>
                        </div>
                        <div style={{ width: '1px', height: '40px', background: 'var(--gray-300)' }} />
                        <div>
                            <div style={{ fontSize: '36px', fontWeight: '700', color: 'var(--primary-500)' }}>
                                {badges.inProgress.length}
                            </div>
                            <div style={{ color: 'var(--gray-600)' }}>In Progress</div>
                        </div>
                        <div style={{ width: '1px', height: '40px', background: 'var(--gray-300)' }} />
                        <div>
                            <div style={{ fontSize: '36px', fontWeight: '700', color: 'var(--gray-400)' }}>
                                {badges.locked.length}
                            </div>
                            <div style={{ color: 'var(--gray-600)' }}>Locked</div>
                        </div>
                    </div>
                </div>

                {/* Earned Badges */}
                <h3 style={{ marginBottom: 'var(--space-4)' }}>✨ Earned Badges</h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: 'var(--space-4)',
                    marginBottom: 'var(--space-6)'
                }}>
                    {badges.earned.map(badge => (
                        <div
                            key={badge.id}
                            className="card"
                            onClick={() => setSelectedBadge(badge)}
                            style={{
                                textAlign: 'center',
                                padding: 'var(--space-4)',
                                cursor: 'pointer',
                                background: 'linear-gradient(135deg, var(--secondary-50) 0%, white 100%)',
                                border: '2px solid var(--secondary-200)',
                                transition: 'transform var(--transition-fast)'
                            }}
                        >
                            <div style={{ fontSize: '48px', marginBottom: 'var(--space-2)' }}>{badge.icon}</div>
                            <div style={{ fontWeight: '600', fontSize: 'var(--font-size-sm)' }}>{badge.name}</div>
                        </div>
                    ))}
                </div>

                {/* In Progress */}
                <h3 style={{ marginBottom: 'var(--space-4)' }}>🔄 In Progress</h3>
                <div style={{ display: 'grid', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
                    {badges.inProgress.map(badge => (
                        <div key={badge.id} className="card" style={{ padding: 'var(--space-4)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                                <div style={{ fontSize: '40px' }}>{badge.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '600', marginBottom: 'var(--space-1)' }}>{badge.name}</div>
                                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)', marginBottom: 'var(--space-2)' }}>
                                        {badge.desc}
                                    </div>
                                    <div className="progress-bar" style={{ height: '8px' }}>
                                        <div
                                            className="progress-fill"
                                            style={{ width: `${(badge.progress / badge.total) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right', fontSize: 'var(--font-size-sm)' }}>
                                    <div style={{ fontWeight: '600', color: 'var(--primary-500)' }}>{badge.progress}/{badge.total}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Locked */}
                <h3 style={{ marginBottom: 'var(--space-4)' }}>🔒 Locked</h3>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
                    gap: 'var(--space-4)'
                }}>
                    {badges.locked.map(badge => (
                        <div
                            key={badge.id}
                            className="card"
                            style={{
                                textAlign: 'center',
                                padding: 'var(--space-4)',
                                opacity: 0.6,
                                filter: 'grayscale(100%)'
                            }}
                        >
                            <div style={{ fontSize: '48px', marginBottom: 'var(--space-2)' }}>{badge.icon}</div>
                            <div style={{ fontWeight: '600', fontSize: 'var(--font-size-sm)' }}>{badge.name}</div>
                            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-500)', marginTop: 'var(--space-1)' }}>
                                {badge.requirement}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Badge Detail Modal */}
                {selectedBadge && (
                    <div className="modal-overlay" onClick={() => setSelectedBadge(null)}>
                        <div className="modal" onClick={e => e.stopPropagation()} style={{ textAlign: 'center' }}>
                            <div className="modal-header">
                                <h3 className="modal-title">{selectedBadge.name}</h3>
                                <button className="modal-close" onClick={() => setSelectedBadge(null)}>×</button>
                            </div>
                            <div className="modal-body">
                                <div style={{ fontSize: '80px', marginBottom: 'var(--space-4)' }}>{selectedBadge.icon}</div>
                                <p style={{ marginBottom: 'var(--space-3)' }}>{selectedBadge.desc}</p>
                                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>
                                    Earned on {selectedBadge.earnedAt}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default VolunteerBadges;
