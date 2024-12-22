// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for validation
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };
  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container flex items-center justify-start h-16 space-x-8">
        {/* Logo */}
        <div>
          <Link to="/" className="text-2xl font-bold text-gold-700">
            Talent Hive
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden sm:flex space-x-8 items-center">
          <NavLink to="/services">Services</NavLink>

          {userData ? (
            <button
              onClick={handleLogout}
              className="ml-6 bg-gold-700 text-white font-semibold text-lg px-6 py-2 rounded-md shadow-md hover:bg-gold-600 transition-all duration-200"
            >
              Logout ({userData.email})
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="ml-6 bg-gold-700 text-white font-semibold text-lg px-6 py-2 rounded-md shadow-md hover:bg-gold-600 transition-all duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="ml-6 bg-gold-700 text-white font-semibold text-lg px-6 py-2 rounded-md shadow-md hover:bg-gold-600 transition-all duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

// Define the NavLink component
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gold-700 hover:text-gold-600 text-lg font-medium transition-colors duration-200"
  >
    {children}
  </Link>
);

// Prop validation for NavLink
NavLink.propTypes = {
  to: PropTypes.string.isRequired, // Validate that 'to' is a required string
  children: PropTypes.node.isRequired, // Validate that children can be any valid node
};

export default Navbar;
