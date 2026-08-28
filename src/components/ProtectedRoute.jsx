import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute Component
 *
 * Redirects unauthenticated users to the login page (/login).
 * If authenticated, renders the protected child component.
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-8 text-center text-gray-500">
        Loading...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
