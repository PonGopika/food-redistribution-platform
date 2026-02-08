import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/Navbar.css';

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const getNavLinks = () => {
        if (!user) return [];

        switch (user.role) {
            case 'donor':
                return [
                    { path: '/donor', label: 'Dashboard' },
                    { path: '/donor/add-food', label: 'Add Food' },
                    { path: '/donor/status', label: 'My Listings' },
                    { path: '/donor/verification', label: 'Verification' },
                ];
            case 'ngo':
                return [
                    { path: '/ngo', label: 'Dashboard' },
                    { path: '/ngo/nearby-food', label: 'Find Food' },
                    { path: '/ngo/accepted', label: 'Accepted' },
                    { path: '/ngo/profile', label: 'Profile' },
                ];
            case 'volunteer':
                return [
                    { path: '/volunteer', label: 'Dashboard' },
                    { path: '/volunteer/jobs', label: 'Job Board' },
                    { path: '/volunteer/tasks', label: 'My Tasks' },
                    { path: '/volunteer/history', label: 'History' },
                ];
            case 'admin':
                return [
                    { path: '/admin/dashboard', label: 'Dashboard' },
                    { path: '/admin/verify', label: 'Verify Users' },
                    { path: '/admin/reports', label: 'Reports' },
                ];
            default:
                return [];
        }
    };

    const getUserInitials = () => {
        if (!user?.name) return '?';
        return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link to="/" className="navbar-brand">
                    🍲 FoodShare
                </Link>

                {user && (
                    <>
                        <div className="navbar-menu">
                            {getNavLinks().map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`navbar-link ${location.pathname === link.path ? 'active' : ''}`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <div className="navbar-user">
                            <Link to="/profile" className="navbar-link hide-mobile">
                                {user.name}
                            </Link>
                            <div className="user-avatar" title={user.name}>
                                {getUserInitials()}
                            </div>
                            <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;
