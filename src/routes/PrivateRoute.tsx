// PrivateRoute.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface PrivateRouteProps {
    children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate("/", { replace: true }); // Redireciona para login se o token não estiver presente
        }
    }, [navigate]);

    return <>{children}</>;
};

export default PrivateRoute;
