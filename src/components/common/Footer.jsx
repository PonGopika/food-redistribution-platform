function Footer() {
    return (
        <footer style={{
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            padding: 'var(--space-8) var(--space-4)',
            marginTop: 'auto',
            borderTop: '1px solid var(--gray-200)'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 'var(--space-8)',
                    marginBottom: 'var(--space-6)'
                }}>
                    <div>
                        <h4 style={{ marginBottom: 'var(--space-4)', color: 'var(--primary-600)' }}>
                            🍲 FoodShare
                        </h4>
                        <p style={{ color: 'var(--gray-500)', fontSize: 'var(--font-size-sm)' }}>
                            Connecting surplus food with those who need it most. Together, we can reduce food waste and fight hunger.
                        </p>
                    </div>

                    <div>
                        <h5 style={{ marginBottom: 'var(--space-3)' }}>Quick Links</h5>
                        <ul style={{ listStyle: 'none', color: 'var(--gray-500)', fontSize: 'var(--font-size-sm)' }}>
                            <li style={{ marginBottom: 'var(--space-2)' }}>About Us</li>
                            <li style={{ marginBottom: 'var(--space-2)' }}>How It Works</li>
                            <li style={{ marginBottom: 'var(--space-2)' }}>Impact Report</li>
                            <li style={{ marginBottom: 'var(--space-2)' }}>Contact</li>
                        </ul>
                    </div>

                    <div>
                        <h5 style={{ marginBottom: 'var(--space-3)' }}>For Partners</h5>
                        <ul style={{ listStyle: 'none', color: 'var(--gray-500)', fontSize: 'var(--font-size-sm)' }}>
                            <li style={{ marginBottom: 'var(--space-2)' }}>Become a Donor</li>
                            <li style={{ marginBottom: 'var(--space-2)' }}>Register as NGO</li>
                            <li style={{ marginBottom: 'var(--space-2)' }}>Volunteer with Us</li>
                            <li style={{ marginBottom: 'var(--space-2)' }}>Corporate Partnership</li>
                        </ul>
                    </div>

                    <div>
                        <h5 style={{ marginBottom: 'var(--space-3)' }}>Support</h5>
                        <ul style={{ listStyle: 'none', color: 'var(--gray-500)', fontSize: 'var(--font-size-sm)' }}>
                            <li style={{ marginBottom: 'var(--space-2)' }}>Help Center</li>
                            <li style={{ marginBottom: 'var(--space-2)' }}>Food Safety Guidelines</li>
                            <li style={{ marginBottom: 'var(--space-2)' }}>Privacy Policy</li>
                            <li style={{ marginBottom: 'var(--space-2)' }}>Terms of Service</li>
                        </ul>
                    </div>
                </div>

                <div style={{
                    borderTop: '1px solid var(--gray-200)',
                    paddingTop: 'var(--space-4)',
                    textAlign: 'center',
                    color: 'var(--gray-400)',
                    fontSize: 'var(--font-size-sm)'
                }}>
                    © 2026 FoodShare. All rights reserved. Made with ❤️ for a hunger-free world.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
