import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

function RoleGuard({ children, role }) {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (user.role !== role) {
        const redirectMap = {
            donor: '/donor',
            ngo: '/ngo',
            volunteer: '/volunteer',
            admin: '/admin/dashboard'
        };
        return <Navigate to={redirectMap[user.role] || '/'} replace />;
    }

    return children;
}

export default RoleGuard;
