import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for validation
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";
import { useState } from "react"; // Import useState

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <div>
          <Link to="/" className="text-2xl font-bold text-gold-700">
            Talent Hive
          </Link>
        </div>

        {/* Hamburger Menu Button for Mobile */}
        <button
          className="sm:hidden text-gold-700 text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          ☰
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-white sm:static sm:w-auto sm:flex sm:items-center sm:space-x-8`}
        >
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
    className="block text-gold-700 hover:text-gold-600 text-lg font-medium transition-colors duration-200 px-4 py-2 sm:inline"
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
