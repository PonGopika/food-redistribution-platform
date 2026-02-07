import React from 'react';

const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    onClick={() => removeToast(toast.id)}
                    style={{
                        background: toast.type === 'error' ? '#e74c3c' : toast.type === 'success' ? '#27ae60' : '#34495e',
                        color: 'white',
                        padding: '12px 20px',
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                        cursor: 'pointer',
                        minWidth: '250px',
                        animation: 'fadeIn 0.3s ease-in-out',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <span>
                        {toast.type === 'success' && '✅ '}
                        {toast.type === 'error' && '⚠️ '}
                        {toast.type === 'info' && 'ℹ️ '}
                        {toast.message}
                    </span>
                    <span style={{ marginLeft: '10px', fontSize: '0.8em', opacity: 0.8 }}>✕</span>
                </div>
            ))}
            <style>
                {`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(-10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}
            </style>
        </div>
    );
};

export default ToastContainer;
