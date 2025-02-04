import { Link, useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for validation
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions/authActions";
import { useState, useEffect  } from "react"; // Import useState

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false); // Close the mobile menu on route change
  }, [location]);


  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container flex items-center justify-start h-16 px-4 space-x-4">
        {/* Logo */}
        <div>
          <Link to="/" className="text-2xl font-bold text-gold-700 onClick={() => setIsMobileMenuOpen(false)}">
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
          } absolute top-16 left-0 w-full bg-white sm:static sm:block sm:w-auto`}
        >
          <div
            className={`flex flex-col sm:flex-row sm:items-center ${
              isMobileMenuOpen ? "space-y-4 p-4 sm:space-y-0 sm:p-0" : "sm:space-x-8"
            }`}
          >
            <NavLink to="/services" onClick={() => setIsMobileMenuOpen(false)}>Services</NavLink>

            {userData ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false); // Close menu after logout
                }}
                className="bg-gold-700 text-white font-semibold text-lg px-6 py-2 rounded-md shadow-md hover:bg-gold-600 transition-all duration-200"
              >
                Logout ({userData.email})
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="bg-gold-700 text-white font-semibold text-lg px-6 py-2 rounded-md shadow-md hover:bg-gold-600 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gold-700 text-white font-semibold text-lg px-6 py-2 rounded-md shadow-md hover:bg-gold-600 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu on click
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

// Define the NavLink component
const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="block text-gold-700 hover:text-gold-600 text-lg font-medium transition-colors duration-200 px-4 py-2 sm:px-0"
    
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
