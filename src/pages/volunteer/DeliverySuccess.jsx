import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';

function DeliverySuccess() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="dashboard" style={{ textAlign: 'center', paddingTop: 'var(--space-10)' }}>
                <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'var(--success-100)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto var(--space-6)',
                    animation: 'fadeIn 0.5s ease-out'
                }}>
                    <span style={{ fontSize: '60px' }}>🎉</span>
                </div>

                <h1 style={{ marginBottom: 'var(--space-2)' }}>Delivery Complete!</h1>
                <p style={{ color: 'var(--gray-500)', marginBottom: 'var(--space-6)' }}>
                    Thank you for making a difference in someone's life today
                </p>

                {/* Stats Card */}
                <div className="card" style={{ maxWidth: '400px', margin: '0 auto var(--space-6)' }}>
                    <h4 style={{ marginBottom: 'var(--space-4)' }}>Delivery Summary</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                        <div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--primary-500)' }}>+25</div>
                            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>Points Earned</div>
                        </div>
                        <div>
                            <div style={{ fontSize: '24px', fontWeight: '700', color: 'var(--success-500)' }}>~30</div>
                            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>People Fed</div>
                        </div>
                    </div>
                </div>

                {/* Badge Earned */}
                <div className="card" style={{
                    maxWidth: '400px',
                    margin: '0 auto var(--space-6)',
                    background: 'linear-gradient(135deg, var(--secondary-100) 0%, var(--secondary-200) 100%)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                        <div style={{ fontSize: '48px' }}>🏆</div>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontWeight: '600', color: 'var(--secondary-600)' }}>Badge Progress</div>
                            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-600)' }}>
                                3 more deliveries to earn "Super Volunteer"!
                            </div>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center' }}>
                    <button className="btn btn-secondary" onClick={() => navigate('/volunteer/history')}>
                        📜 View History
                    </button>
                    <button className="btn btn-primary" onClick={() => navigate('/volunteer/tasks')}>
                        🚴 More Tasks
                    </button>
                </div>
            </div>
        </>
    );
}

export default DeliverySuccess;
