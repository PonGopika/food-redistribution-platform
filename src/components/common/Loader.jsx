function Loader({ size = 'medium', text = '' }) {
    const sizes = {
        small: { width: '24px', height: '24px', border: '3px' },
        medium: { width: '40px', height: '40px', border: '4px' },
        large: { width: '60px', height: '60px', border: '5px' }
    };

    const s = sizes[size] || sizes.medium;

    return (
        <div className="loader-wrapper">
            <div style={{ textAlign: 'center' }}>
                <div
                    style={{
                        width: s.width,
                        height: s.height,
                        border: `${s.border} solid var(--gray-200)`,
                        borderTopColor: 'var(--primary-500)',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto'
                    }}
                />
                {text && (
                    <p style={{
                        marginTop: 'var(--space-3)',
                        color: 'var(--gray-500)',
                        fontSize: 'var(--font-size-sm)'
                    }}>
                        {text}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Loader;
