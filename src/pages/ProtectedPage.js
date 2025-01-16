import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedPage() {
    if (!localStorage.getItem('Accesstoken')) {
        return <Navigate to="/SignIn" />;
    }
    return (
        <div>
            <h2>Protected Page</h2>
            <p>This page is protected and requires authentication to access.hello</p>
        </div>
    );
}