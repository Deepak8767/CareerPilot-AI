import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, islogged }) {
  if (!islogged) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default ProtectedRoute;
