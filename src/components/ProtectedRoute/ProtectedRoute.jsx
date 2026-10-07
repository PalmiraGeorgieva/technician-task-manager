import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";

function ProtectedRoute() {
    const { isAuthenticated, authLoading} = useAuth();

    if(authLoading) {
        return <p>Loading...</p>
    }

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;

}

export default ProtectedRoute;