import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { checkUserAuthenticated } from '../utils/auth';
import AdminForm from './AdminForm'; // Fix the import

export default function ProtectedPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const authenticated = await checkUserAuthenticated();
            setIsAuthenticated(authenticated);
        };
        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/SignIn" />;
    }

    return (
        <div>
            <h2>Protected Page</h2>
            <AdminForm />
        </div>
    );
}