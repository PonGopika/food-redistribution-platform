import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/RoleSelection.css";

function RoleSelection() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const roles = [
    {
      id: 'donor',
      title: 'Food Donor',
      icon: '🏪',
      description: 'Restaurants, Hotels, Caterers, and Food Businesses',
      features: [
        'List surplus food quickly',
        'Track donation status',
        'Get verified badge',
        'View impact metrics'
      ],
      color: 'var(--primary-500)',
      bgColor: 'var(--primary-50)'
    },
    {
      id: 'ngo',
      title: 'NGO / Charity',
      icon: '🏛️',
      description: 'Food Banks, Shelters, Community Kitchens',
      features: [
        'Find nearby food donations',
        'Set dietary preferences',
        'Define service area',
        'Rate food quality'
      ],
      color: 'var(--accent-500)',
      bgColor: 'var(--accent-50)'
    },
    {
      id: 'volunteer',
      title: 'Volunteer',
      icon: '🚴',
      description: 'Help transport food to those in need',
      features: [
        'Accept delivery tasks',
        'Earn recognition badges',
        'Flexible scheduling',
        'Track your impact'
      ],
      color: 'var(--secondary-400)',
      bgColor: 'var(--secondary-50)'
    }
  ];

  const handleRoleSelect = (role) => {
    // Mock login for demo
    login({
      name: 'Demo User',
      email: 'demo@example.com',
      role: role
    });

    const redirectMap = {
      donor: '/donor',
      ngo: '/ngo',
      volunteer: '/volunteer'
    };
    navigate(redirectMap[role]);
  };

  return (
    <div className="auth-page" style={{ padding: 'var(--space-8)' }}>
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <div style={{ fontSize: '48px', marginBottom: 'var(--space-4)' }}>🍲</div>
          <h1 style={{ marginBottom: 'var(--space-2)' }}>Choose Your Role</h1>
          <p style={{ color: 'var(--gray-500)', fontSize: 'var(--font-size-lg)' }}>
            Select how you'd like to contribute to the food redistribution network
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--space-6)'
        }}>
          {roles.map(role => (
            <div
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              style={{
                background: 'white',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-6)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
                border: '2px solid transparent',
                transition: 'all var(--transition-base)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                e.currentTarget.style.borderColor = role.color;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                e.currentTarget.style.borderColor = 'transparent';
              }}
            >
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: 'var(--radius-xl)',
                background: role.bgColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '36px',
                marginBottom: 'var(--space-4)'
              }}>
                {role.icon}
              </div>

              <h3 style={{ marginBottom: 'var(--space-2)' }}>{role.title}</h3>
              <p style={{
                color: 'var(--gray-500)',
                fontSize: 'var(--font-size-sm)',
                marginBottom: 'var(--space-4)'
              }}>
                {role.description}
              </p>

              <ul style={{
                listStyle: 'none',
                marginBottom: 'var(--space-6)'
              }}>
                {role.features.map((feature, idx) => (
                  <li key={idx} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    fontSize: 'var(--font-size-sm)',
                    color: 'var(--gray-600)',
                    marginBottom: 'var(--space-2)'
                  }}>
                    <span style={{ color: role.color }}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              <button
                className="btn btn-primary"
                style={{
                  width: '100%',
                  background: `linear-gradient(135deg, ${role.color} 0%, ${role.color} 100%)`
                }}
              >
                Continue as {role.title}
              </button>
            </div>
          ))}
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: 'var(--space-8)',
          color: 'var(--gray-500)'
        }}>
          <p>Are you an administrator? <a href="/admin/dashboard">Access Admin Panel</a></p>
        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
