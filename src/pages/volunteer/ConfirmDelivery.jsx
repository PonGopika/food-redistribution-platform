import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';

function ConfirmDelivery() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [step, setStep] = useState('pickup'); // pickup, in_transit, delivery
    const [pickupPhoto, setPickupPhoto] = useState('');
    const [deliveryPhoto, setDeliveryPhoto] = useState('');
    const [recipientName, setRecipientName] = useState('');
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    // Mock task data
    const task = {
        id: id,
        foodName: 'Mixed Vegetables',
        quantity: '15 kg',
        servings: 30,
        donor: 'Fresh Mart',
        donorAddress: '999 Velachery, Chennai',
        ngo: 'Care Foundation',
        ngoAddress: '111 Mylapore, Chennai'
    };

    const handlePhotoCapture = (type) => {
        // Simulate photo capture
        const mockPhoto = 'data:image/svg+xml,...';
        if (type === 'pickup') {
            setPickupPhoto(mockPhoto);
        } else {
            setDeliveryPhoto(mockPhoto);
        }
    };

    const handleConfirmPickup = () => {
        setStep('in_transit');
    };

    const handleConfirmDelivery = async () => {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        navigate('/volunteer/delivery-success');
    };

    return (
        <>
            <Navbar />
            <div className="dashboard">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">
                        {step === 'pickup' ? '📦 Confirm Pickup' :
                            step === 'in_transit' ? '🚴 In Transit' : '✅ Confirm Delivery'}
                    </h1>
                    <p className="dashboard-subtitle">{task.foodName} - {task.quantity}</p>
                </div>

                {/* Progress Bar */}
                <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {['Pickup', 'In Transit', 'Delivery'].map((label, idx) => {
                            const stepIndex = step === 'pickup' ? 0 : step === 'in_transit' ? 1 : 2;
                            const isComplete = idx < stepIndex;
                            const isActive = idx === stepIndex;
                            return (
                                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                    <div style={{
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: isComplete ? 'var(--success-500)' : isActive ? 'var(--primary-500)' : 'var(--gray-200)',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontWeight: '600'
                                    }}>
                                        {isComplete ? '✓' : idx + 1}
                                    </div>
                                    <span style={{ fontWeight: isActive ? '600' : '400', color: isActive ? 'var(--gray-800)' : 'var(--gray-400)' }}>
                                        {label}
                                    </span>
                                    {idx < 2 && <div style={{ width: '40px', height: '2px', background: isComplete ? 'var(--success-500)' : 'var(--gray-200)', margin: '0 var(--space-2)' }} />}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Pickup Step */}
                {step === 'pickup' && (
                    <div className="card">
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>📍 At Pickup Location</h3>

                        <div style={{
                            padding: 'var(--space-4)',
                            background: 'var(--primary-50)',
                            borderRadius: 'var(--radius-lg)',
                            marginBottom: 'var(--space-4)'
                        }}>
                            <div style={{ fontWeight: '600', marginBottom: 'var(--space-2)' }}>{task.donor}</div>
                            <div style={{ color: 'var(--gray-600)' }}>{task.donorAddress}</div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">📸 Photo of Food (Required)</label>
                            {pickupPhoto ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        background: 'var(--success-50)',
                                        borderRadius: 'var(--radius-lg)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '40px'
                                    }}>
                                        ✅
                                    </div>
                                    <button className="btn btn-secondary btn-sm" onClick={() => setPickupPhoto('')}>
                                        Retake
                                    </button>
                                </div>
                            ) : (
                                <label className="image-upload" onClick={() => handlePhotoCapture('pickup')}>
                                    <div className="image-upload-icon">📸</div>
                                    <p>Tap to capture photo of food</p>
                                </label>
                            )}
                        </div>

                        <div className="checklist" style={{ marginBottom: 'var(--space-4)' }}>
                            <h4 style={{ marginBottom: 'var(--space-3)' }}>Pre-Pickup Checklist</h4>
                            {[
                                'Food is in proper containers',
                                'Food appears fresh and safe',
                                'Quantity matches listing',
                                'Temperature requirements met'
                            ].map((item, idx) => (
                                <label key={idx} className="form-checkbox-group" style={{ padding: 'var(--space-2)' }}>
                                    <input type="checkbox" className="form-checkbox" />
                                    <span>{item}</span>
                                </label>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary btn-lg"
                            style={{ width: '100%' }}
                            onClick={handleConfirmPickup}
                            disabled={!pickupPhoto}
                        >
                            ✓ Confirm Pickup & Start Delivery
                        </button>
                    </div>
                )}

                {/* In Transit Step */}
                {step === 'in_transit' && (
                    <div className="card">
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>🚴 Heading to NGO</h3>

                        <div style={{
                            padding: 'var(--space-4)',
                            background: 'var(--success-50)',
                            borderRadius: 'var(--radius-lg)',
                            marginBottom: 'var(--space-4)'
                        }}>
                            <div style={{ fontWeight: '600', marginBottom: 'var(--space-2)' }}>{task.ngo}</div>
                            <div style={{ color: 'var(--gray-600)' }}>{task.ngoAddress}</div>
                        </div>

                        <div className="alert alert-info" style={{ marginBottom: 'var(--space-4)' }}>
                            <span className="alert-icon">💡</span>
                            <div>
                                <strong>Handling Tips:</strong>
                                <ul style={{ margin: '8px 0 0 16px', padding: 0 }}>
                                    <li>Keep food upright and secure</li>
                                    <li>Maintain temperature if refrigerated</li>
                                    <li>Drive carefully, avoid sudden stops</li>
                                </ul>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                            <button className="btn btn-secondary" style={{ flex: 1 }}>
                                🗺️ Open Navigation
                            </button>
                            <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => setStep('delivery')}>
                                I've Arrived →
                            </button>
                        </div>
                    </div>
                )}

                {/* Delivery Step */}
                {step === 'delivery' && (
                    <div className="card">
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>✅ Confirm Delivery</h3>

                        <div style={{
                            padding: 'var(--space-4)',
                            background: 'var(--success-50)',
                            borderRadius: 'var(--radius-lg)',
                            marginBottom: 'var(--space-4)'
                        }}>
                            <div style={{ fontWeight: '600', marginBottom: 'var(--space-2)' }}>{task.ngo}</div>
                            <div style={{ color: 'var(--gray-600)' }}>{task.ngoAddress}</div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">📸 Photo of Handover (Required)</label>
                            {deliveryPhoto ? (
                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        background: 'var(--success-50)',
                                        borderRadius: 'var(--radius-lg)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '40px'
                                    }}>
                                        ✅
                                    </div>
                                    <button className="btn btn-secondary btn-sm" onClick={() => setDeliveryPhoto('')}>
                                        Retake
                                    </button>
                                </div>
                            ) : (
                                <label className="image-upload" onClick={() => handlePhotoCapture('delivery')}>
                                    <div className="image-upload-icon">📸</div>
                                    <p>Tap to capture handover photo</p>
                                </label>
                            )}
                        </div>

                        <div className="form-group">
                            <label className="form-label">Recipient Name</label>
                            <input
                                type="text"
                                className="form-input"
                                value={recipientName}
                                onChange={(e) => setRecipientName(e.target.value)}
                                placeholder="Name of person who received the food"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Notes (Optional)</label>
                            <textarea
                                className="form-textarea"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Any issues or comments..."
                                rows={2}
                            />
                        </div>

                        <button
                            className="btn btn-success btn-lg"
                            style={{ width: '100%' }}
                            onClick={handleConfirmDelivery}
                            disabled={!deliveryPhoto || !recipientName || loading}
                        >
                            {loading ? '⏳ Submitting...' : '🎉 Complete Delivery'}
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default ConfirmDelivery;
