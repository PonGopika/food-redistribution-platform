import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';

function DonorVerification() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('upload');
    const [documents, setDocuments] = useState({
        businessLicense: null,
        foodSafetyPermit: null,
        identityProof: null
    });
    const [submitted, setSubmitted] = useState(false);

    const handleFileChange = (e, docType) => {
        const file = e.target.files[0];
        if (file) {
            setDocuments(prev => ({
                ...prev,
                [docType]: {
                    name: file.name,
                    size: (file.size / 1024).toFixed(2) + ' KB',
                    uploaded: new Date().toLocaleString()
                }
            }));
        }
    };

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const verificationStatus = user?.isVerified ? 'verified' : (submitted ? 'pending' : 'not_started');

    const documentTypes = [
        { key: 'businessLicense', label: 'Business License', required: true, desc: 'Valid business registration certificate' },
        { key: 'foodSafetyPermit', label: 'Food Safety Permit', required: true, desc: 'FSSAI license or equivalent' },
        { key: 'identityProof', label: 'Identity Proof', required: false, desc: 'Owner/Manager ID (optional)' }
    ];

    return (
        <>
            <Navbar />
            <div className="dashboard">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Donor Verification</h1>
                    <p className="dashboard-subtitle">Get verified to build trust with NGOs and unlock all features</p>
                </div>

                {/* Verification Status Card */}
                <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: 'var(--radius-full)',
                            background: verificationStatus === 'verified' ? 'var(--success-50)'
                                : verificationStatus === 'pending' ? 'var(--warning-50)' : 'var(--gray-100)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '28px'
                        }}>
                            {verificationStatus === 'verified' ? '✓' : verificationStatus === 'pending' ? '⏳' : '📄'}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{ marginBottom: 'var(--space-1)' }}>
                                {verificationStatus === 'verified' ? 'Verified Donor'
                                    : verificationStatus === 'pending' ? 'Verification In Progress' : 'Not Yet Verified'}
                            </h3>
                            <p style={{ color: 'var(--gray-500)', fontSize: 'var(--font-size-sm)' }}>
                                {verificationStatus === 'verified'
                                    ? 'Your organization is verified. NGOs can trust your listings.'
                                    : verificationStatus === 'pending'
                                        ? 'Our team is reviewing your documents. This usually takes 1-2 business days.'
                                        : 'Upload your documents below to get started.'}
                            </p>
                        </div>
                        {verificationStatus === 'verified' && (
                            <span className="badge badge-verified">✓ Verified</span>
                        )}
                        {verificationStatus === 'pending' && (
                            <span className="badge badge-warning">Pending Review</span>
                        )}
                    </div>
                </div>

                {/* Benefits of Verification */}
                <div className="alert alert-info" style={{ marginBottom: 'var(--space-6)' }}>
                    <span className="alert-icon">💡</span>
                    <div>
                        <strong>Benefits of Verification:</strong>
                        <ul style={{ marginTop: 'var(--space-2)', paddingLeft: 'var(--space-4)' }}>
                            <li>Verified badge on your profile visible to all NGOs</li>
                            <li>Priority listing placement</li>
                            <li>Access to impact reports and sustainability credits</li>
                            <li>Increased trust from recipients</li>
                        </ul>
                    </div>
                </div>

                {/* Tabs */}
                <div className="tabs">
                    <button
                        className={`tab ${activeTab === 'upload' ? 'active' : ''}`}
                        onClick={() => setActiveTab('upload')}
                    >
                        📤 Upload Documents
                    </button>
                    <button
                        className={`tab ${activeTab === 'status' ? 'active' : ''}`}
                        onClick={() => setActiveTab('status')}
                    >
                        📋 Submission Status
                    </button>
                </div>

                {activeTab === 'upload' && (
                    <div className="card">
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Required Documents</h3>

                        {documentTypes.map(doc => (
                            <div key={doc.key} style={{
                                padding: 'var(--space-4)',
                                border: '2px dashed var(--gray-200)',
                                borderRadius: 'var(--radius-lg)',
                                marginBottom: 'var(--space-4)',
                                background: documents[doc.key] ? 'var(--success-50)' : 'white'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                                            <strong>{doc.label}</strong>
                                            {doc.required && <span className="badge badge-danger">Required</span>}
                                        </div>
                                        <p style={{ color: 'var(--gray-500)', fontSize: 'var(--font-size-sm)' }}>{doc.desc}</p>
                                    </div>

                                    {documents[doc.key] ? (
                                        <div style={{ textAlign: 'right' }}>
                                            <div style={{ color: 'var(--success-500)', fontWeight: '600', marginBottom: 'var(--space-1)' }}>
                                                ✓ Uploaded
                                            </div>
                                            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--gray-500)' }}>
                                                {documents[doc.key].name}
                                            </div>
                                        </div>
                                    ) : (
                                        <label className="btn btn-outline btn-sm" style={{ cursor: 'pointer' }}>
                                            <input
                                                type="file"
                                                accept=".pdf,.jpg,.jpeg,.png"
                                                onChange={(e) => handleFileChange(e, doc.key)}
                                                style={{ display: 'none' }}
                                            />
                                            Choose File
                                        </label>
                                    )}
                                </div>
                            </div>
                        ))}

                        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                            <button className="btn btn-secondary" onClick={() => navigate('/donor')}>
                                ← Back to Dashboard
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmit}
                                disabled={!documents.businessLicense || !documents.foodSafetyPermit || submitted}
                            >
                                {submitted ? 'Submitted for Review' : 'Submit for Verification'}
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'status' && (
                    <div className="card">
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Verification Timeline</h3>

                        {[
                            { step: 'Documents Uploaded', status: submitted ? 'completed' : 'pending', date: submitted ? 'Just now' : '-' },
                            { step: 'Under Review', status: submitted ? 'in_progress' : 'pending', date: submitted ? 'Started' : '-' },
                            { step: 'Verification Complete', status: 'pending', date: '-' }
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 'var(--space-4)',
                                padding: 'var(--space-4)',
                                borderLeft: '3px solid',
                                borderLeftColor: item.status === 'completed' ? 'var(--success-500)'
                                    : item.status === 'in_progress' ? 'var(--warning-400)' : 'var(--gray-200)',
                                marginLeft: 'var(--space-4)',
                                marginBottom: 'var(--space-2)'
                            }}>
                                <div style={{
                                    width: '24px',
                                    height: '24px',
                                    borderRadius: '50%',
                                    background: item.status === 'completed' ? 'var(--success-500)'
                                        : item.status === 'in_progress' ? 'var(--warning-400)' : 'var(--gray-200)',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '12px',
                                    marginLeft: '-26px'
                                }}>
                                    {item.status === 'completed' ? '✓' : idx + 1}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: '500' }}>{item.step}</div>
                                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>{item.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default DonorVerification;
