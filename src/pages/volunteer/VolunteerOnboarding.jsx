import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import Navbar from '../../components/common/Navbar';

function VolunteerOnboarding() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [currentStep, setCurrentStep] = useState(0);
    const [completed, setCompleted] = useState({
        training: false,
        codeOfConduct: false,
        availability: false
    });

    const [availability, setAvailability] = useState({
        monday: { morning: false, afternoon: false, evening: false },
        tuesday: { morning: false, afternoon: false, evening: false },
        wednesday: { morning: false, afternoon: false, evening: false },
        thursday: { morning: false, afternoon: false, evening: false },
        friday: { morning: false, afternoon: false, evening: false },
        saturday: { morning: false, afternoon: false, evening: false },
        sunday: { morning: false, afternoon: false, evening: false }
    });

    const [conductAgreed, setConductAgreed] = useState(false);

    const trainingModules = [
        {
            title: 'Food Safety Basics',
            icon: '🧤',
            content: [
                'Always wash hands before handling food',
                'Use insulated bags for temperature control',
                'Never leave food in hot vehicles for extended periods',
                'Check expiry dates and packaging integrity'
            ]
        },
        {
            title: 'Hygiene Guidelines',
            icon: '🧼',
            content: [
                'Wear clean clothes during pickups',
                'Use sanitizer before and after handling',
                'Report any illness - don\'t volunteer when sick',
                'Keep delivery containers clean'
            ]
        },
        {
            title: 'Delivery Best Practices',
            icon: '🚗',
            content: [
                'Confirm pickup before leaving',
                'Take the most direct route',
                'Handle containers with care',
                'Get confirmation signature at delivery'
            ]
        }
    ];

    const codeOfConduct = [
        'Treat all donors and recipients with respect',
        'Maintain confidentiality of all parties',
        'Never consume or redirect donated food',
        'Report any safety concerns immediately',
        'Be punctual and communicate delays',
        'Follow all traffic and safety laws',
        'Represent FoodShare professionally'
    ];

    const handleAvailabilityChange = (day, slot) => {
        setAvailability(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                [slot]: !prev[day][slot]
            }
        }));
    };

    const completeStep = (step) => {
        if (step === 'training') {
            setCompleted(prev => ({ ...prev, training: true }));
            setCurrentStep(1);
        } else if (step === 'codeOfConduct' && conductAgreed) {
            setCompleted(prev => ({ ...prev, codeOfConduct: true }));
            setCurrentStep(2);
        } else if (step === 'availability') {
            setCompleted(prev => ({ ...prev, availability: true }));
        }
    };

    const allCompleted = completed.training && completed.codeOfConduct && completed.availability;

    return (
        <>
            <Navbar />
            <div className="dashboard">
                <div className="dashboard-header">
                    <h1 className="dashboard-title">Volunteer Onboarding</h1>
                    <p className="dashboard-subtitle">Complete these steps to start accepting delivery tasks</p>
                </div>

                {/* Progress */}
                <div className="card" style={{ marginBottom: 'var(--space-6)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        {['Training', 'Code of Conduct', 'Availability'].map((step, idx) => (
                            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: Object.values(completed)[idx] ? 'var(--success-500)'
                                        : currentStep === idx ? 'var(--primary-500)' : 'var(--gray-200)',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '600'
                                }}>
                                    {Object.values(completed)[idx] ? '✓' : idx + 1}
                                </div>
                                <span style={{
                                    fontWeight: currentStep === idx ? '600' : '400',
                                    color: currentStep === idx ? 'var(--gray-900)' : 'var(--gray-500)'
                                }}>
                                    {step}
                                </span>
                                {idx < 2 && (
                                    <div style={{
                                        width: '60px',
                                        height: '2px',
                                        background: Object.values(completed)[idx] ? 'var(--success-500)' : 'var(--gray-200)',
                                        margin: '0 var(--space-2)'
                                    }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Training Module */}
                {currentStep === 0 && (
                    <div className="card">
                        <h3 style={{ marginBottom: 'var(--space-6)' }}>🎓 Food Handling Training</h3>

                        <div style={{ display: 'grid', gap: 'var(--space-4)' }}>
                            {trainingModules.map((module, idx) => (
                                <div key={idx} style={{
                                    padding: 'var(--space-4)',
                                    background: 'var(--gray-50)',
                                    borderRadius: 'var(--radius-lg)',
                                    border: '1px solid var(--gray-200)'
                                }}>
                                    <h4 style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
                                        <span>{module.icon}</span> {module.title}
                                    </h4>
                                    <ul style={{ paddingLeft: 'var(--space-5)', color: 'var(--gray-600)' }}>
                                        {module.content.map((item, i) => (
                                            <li key={i} style={{ marginBottom: 'var(--space-2)' }}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary"
                            style={{ marginTop: 'var(--space-6)' }}
                            onClick={() => completeStep('training')}
                        >
                            I've Read & Understood ✓
                        </button>
                    </div>
                )}

                {/* Code of Conduct */}
                {currentStep === 1 && (
                    <div className="card">
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>📜 Code of Conduct</h3>
                        <p style={{ color: 'var(--gray-500)', marginBottom: 'var(--space-6)' }}>
                            As a FoodShare volunteer, you agree to uphold these standards:
                        </p>

                        <div style={{
                            background: 'var(--gray-50)',
                            padding: 'var(--space-4)',
                            borderRadius: 'var(--radius-lg)',
                            marginBottom: 'var(--space-6)'
                        }}>
                            {codeOfConduct.map((item, idx) => (
                                <div key={idx} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--space-3)',
                                    padding: 'var(--space-3)',
                                    borderBottom: idx < codeOfConduct.length - 1 ? '1px solid var(--gray-200)' : 'none'
                                }}>
                                    <span style={{ color: 'var(--primary-500)' }}>•</span>
                                    {item}
                                </div>
                            ))}
                        </div>

                        <label className="form-checkbox-group" style={{ marginBottom: 'var(--space-4)' }}>
                            <input
                                type="checkbox"
                                className="form-checkbox"
                                checked={conductAgreed}
                                onChange={(e) => setConductAgreed(e.target.checked)}
                            />
                            <span>I agree to follow the Code of Conduct</span>
                        </label>

                        <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                            <button className="btn btn-secondary" onClick={() => setCurrentStep(0)}>
                                ← Back
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => completeStep('codeOfConduct')}
                                disabled={!conductAgreed}
                            >
                                Sign & Continue
                            </button>
                        </div>
                    </div>
                )}

                {/* Availability */}
                {currentStep === 2 && (
                    <div className="card">
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>📅 Set Your Availability</h3>
                        <p style={{ color: 'var(--gray-500)', marginBottom: 'var(--space-6)' }}>
                            Let us know when you're available for deliveries
                        </p>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr>
                                        <th style={{ padding: 'var(--space-3)', textAlign: 'left' }}>Day</th>
                                        <th style={{ padding: 'var(--space-3)', textAlign: 'center' }}>🌅 Morning<br /><small>6am-12pm</small></th>
                                        <th style={{ padding: 'var(--space-3)', textAlign: 'center' }}>☀️ Afternoon<br /><small>12pm-6pm</small></th>
                                        <th style={{ padding: 'var(--space-3)', textAlign: 'center' }}>🌙 Evening<br /><small>6pm-10pm</small></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(availability).map(([day, slots]) => (
                                        <tr key={day} style={{ borderTop: '1px solid var(--gray-200)' }}>
                                            <td style={{ padding: 'var(--space-3)', textTransform: 'capitalize', fontWeight: '500' }}>
                                                {day}
                                            </td>
                                            {Object.entries(slots).map(([slot, checked]) => (
                                                <td key={slot} style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
                                                    <input
                                                        type="checkbox"
                                                        className="form-checkbox"
                                                        checked={checked}
                                                        onChange={() => handleAvailabilityChange(day, slot)}
                                                    />
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-6)' }}>
                            <button className="btn btn-secondary" onClick={() => setCurrentStep(1)}>
                                ← Back
                            </button>
                            <button
                                className="btn btn-primary"
                                onClick={() => completeStep('availability')}
                            >
                                Save Availability
                            </button>
                        </div>
                    </div>
                )}

                {/* Completion */}
                {allCompleted && (
                    <div className="card" style={{ textAlign: 'center', padding: 'var(--space-8)' }}>
                        <div style={{ fontSize: '64px', marginBottom: 'var(--space-4)' }}>🎉</div>
                        <h2 style={{ marginBottom: 'var(--space-2)' }}>Onboarding Complete!</h2>
                        <p style={{ color: 'var(--gray-500)', marginBottom: 'var(--space-6)' }}>
                            You're all set to start accepting delivery tasks
                        </p>
                        <button className="btn btn-primary btn-lg" onClick={() => navigate('/volunteer/jobs')}>
                            View Available Tasks →
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default VolunteerOnboarding;
