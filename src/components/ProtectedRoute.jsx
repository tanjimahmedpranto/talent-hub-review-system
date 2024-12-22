// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // If not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  return children; // Render the protected content if authenticated
};

// PropTypes validation
ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired, // `isAuthenticated` should be a boolean
  children: PropTypes.node.isRequired, // `children` can be any valid React nodes (elements, strings, etc.)
};

export default ProtectedRoute;
