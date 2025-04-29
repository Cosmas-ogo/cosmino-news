import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/cosmino-news-logo.png";
import { useUser } from "../contexts/UserContext";

const Navbar = () => {
  const { currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-4 py-2 sm:px-6 lg:px-8 gap-2 sm:gap-0">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={Logo}
            alt="Cosmino News Logo"
            className="h-10 sm:h-12 md:h-16 w-auto object-contain"
          />
          <span className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 hidden sm:inline">
            Cosmino News
          </span>
        </Link>

        {/* Navigation + User controls */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
          {/* Desktop Topic Links */}
          <div className="hidden sm:flex gap-4 text-gray-600 text-sm">
            <Link to="/topics/coding">Coding</Link>
            <Link to="/topics/football">Football</Link>
            <Link to="/topics/cooking">Cooking</Link>
          </div>

          {/* Mobile Topic Dropdown */}
          <div className="sm:hidden w-full">
            <select
              onChange={(e) => {
                if (e.target.value) navigate(e.target.value);
              }}
              className="w-full border rounded px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Browse topics...</option>
              <option value="/topics/coding">Coding</option>
              <option value="/topics/football">Football</option>
              <option value="/topics/cooking">Cooking</option>
            </select>
          </div>

          {/* User Auth */}
          {currentUser ? (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span className="hidden sm:inline">
                Logged in as:{" "}
                <span className="font-semibold">{currentUser}</span>
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded transition text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded transition w-full sm:w-auto text-center"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
