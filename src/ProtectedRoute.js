import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import axios from 'axios'; // Import axios
import { Navigate } from 'react-router-dom'; // Import Navigate

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const response = await axios.get('/api/check-auth');
            setIsAuthenticated(response.data.isAuthenticated);
        };

        checkAuth();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
