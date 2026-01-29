import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/Register.css";

function Register() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
    organizationName: "",
    organizationType: "",
    address: "",
    agreeTerms: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));

  const getPasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    return strength;
  };

  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['var(--danger-500)', 'var(--warning-500)', 'var(--secondary-300)', 'var(--success-500)'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Full name is required';
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(form.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!form.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(form.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!form.role) newErrors.role = 'Please select a role';
    if ((form.role === 'donor' || form.role === 'ngo') && !form.organizationName) {
      newErrors.organizationName = 'Organization name is required';
    }
    if (!form.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
    return newErrors;
  };

  const handleNext = () => {
    const newErrors = validateStep1();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateStep2();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    register({
      name: form.name,
      email: form.email,
      role: form.role,
      phone: form.phone,
      organizationName: form.organizationName,
      isVerified: false
    });

    // Navigate based on role
    const redirectMap = {
      donor: '/donor',
      ngo: '/ngo',
      volunteer: '/volunteer'
    };
    navigate(redirectMap[form.role] || '/');
    setLoading(false);
  };

  const passwordStrength = getPasswordStrength(form.password);

  const roleOptions = [
    { value: 'donor', label: 'Food Donor', icon: '🏪', desc: 'Restaurants, Hotels, Caterers' },
    { value: 'ngo', label: 'NGO / Charity', icon: '🏛️', desc: 'Food banks, Shelters, Kitchens' },
    { value: 'volunteer', label: 'Volunteer', icon: '🚴', desc: 'Help deliver food to those in need' }
  ];

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: '500px' }}>
        <div className="auth-header">
          <div className="auth-logo">🍲</div>
          <h1 className="auth-title">Join FoodShare</h1>
          <p className="auth-subtitle">Create an account to start making a difference</p>
        </div>

        {/* Progress Steps */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-6)'
        }}>
          {[1, 2].map(s => (
            <div key={s} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: step >= s ? 'var(--primary-500)' : 'var(--gray-200)',
                color: step >= s ? 'white' : 'var(--gray-500)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: 'var(--font-size-sm)'
              }}>
                {step > s ? '✓' : s}
              </div>
              <span style={{
                fontSize: 'var(--font-size-sm)',
                color: step >= s ? 'var(--gray-800)' : 'var(--gray-400)'
              }}>
                {s === 1 ? 'Personal Info' : 'Role & Finish'}
              </span>
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                />
                {errors.name && <p className="form-error">{errors.name}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="form-error">{errors.email}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="1234567890"
                  value={form.phone}
                  onChange={handleChange}
                />
                {errors.phone && <p className="form-error">{errors.phone}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`form-input ${errors.password ? 'error' : ''}`}
                  placeholder="At least 8 characters"
                  value={form.password}
                  onChange={handleChange}
                />
                {form.password && (
                  <div style={{ marginTop: 'var(--space-2)' }}>
                    <div style={{
                      display: 'flex',
                      gap: 'var(--space-1)',
                      marginBottom: 'var(--space-1)'
                    }}>
                      {[0, 1, 2, 3].map(i => (
                        <div key={i} style={{
                          flex: 1,
                          height: '4px',
                          borderRadius: '2px',
                          background: i < passwordStrength ? strengthColors[passwordStrength - 1] : 'var(--gray-200)'
                        }} />
                      ))}
                    </div>
                    <span style={{
                      fontSize: 'var(--font-size-xs)',
                      color: strengthColors[passwordStrength - 1] || 'var(--gray-400)'
                    }}>
                      {passwordStrength > 0 ? strengthLabels[passwordStrength - 1] : 'Enter password'}
                    </span>
                  </div>
                )}
                {errors.password && <p className="form-error">{errors.password}</p>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <p className="form-error">{errors.confirmPassword}</p>}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="btn btn-primary btn-lg"
                style={{ width: '100%' }}
              >
                Continue →
              </button>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label className="form-label">Select Your Role</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                  {roleOptions.map(option => (
                    <label
                      key={option.value}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-4)',
                        padding: 'var(--space-4)',
                        border: form.role === option.value
                          ? '2px solid var(--primary-500)'
                          : '2px solid var(--gray-200)',
                        borderRadius: 'var(--radius-lg)',
                        cursor: 'pointer',
                        background: form.role === option.value ? 'var(--primary-50)' : 'white',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={option.value}
                        checked={form.role === option.value}
                        onChange={handleChange}
                        style={{ display: 'none' }}
                      />
                      <span style={{ fontSize: '32px' }}>{option.icon}</span>
                      <div>
                        <div style={{ fontWeight: '600' }}>{option.label}</div>
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--gray-500)' }}>
                          {option.desc}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.role && <p className="form-error">{errors.role}</p>}
              </div>

              {(form.role === 'donor' || form.role === 'ngo') && (
                <div className="form-group">
                  <label className="form-label" htmlFor="organizationName">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    id="organizationName"
                    name="organizationName"
                    className={`form-input ${errors.organizationName ? 'error' : ''}`}
                    placeholder="Your organization name"
                    value={form.organizationName}
                    onChange={handleChange}
                  />
                  {errors.organizationName && <p className="form-error">{errors.organizationName}</p>}
                </div>
              )}

              <div className="form-group">
                <label className="form-checkbox-group">
                  <input
                    type="checkbox"
                    name="agreeTerms"
                    className="form-checkbox"
                    checked={form.agreeTerms}
                    onChange={handleChange}
                  />
                  <span style={{ fontSize: 'var(--font-size-sm)' }}>
                    I agree to the <a href="#terms">Terms of Service</a> and{' '}
                    <a href="#privacy">Privacy Policy</a>
                  </span>
                </label>
                {errors.agreeTerms && <p className="form-error">{errors.agreeTerms}</p>}
              </div>

              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn btn-secondary btn-lg"
                  style={{ flex: 1 }}
                >
                  ← Back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ flex: 2 }}
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </>
          )}
        </form>

        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/" style={{ fontWeight: '600' }}>Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
