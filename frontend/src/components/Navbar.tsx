import { Link } from "react-router-dom";
import { useAuth } from "../authContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white shadow-lg fixed w-full z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          MovieApp
        </Link>
        <div className="space-x-6">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/movies" className="hover:underline">
            Movies
          </Link>
          {isLoggedIn ? (
            <>
              <Link to="/favorites" className="hover:underline">
                Favorites
              </Link>
              <Link to="/planned" className="hover:underline">
                Planned
              </Link>
              <Link to="/" className="hover:underline">
              <button
                onClick={logout}
                className="hover:underline"
              >
                Logout
              </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="hover:underline">
                Sign In
              </Link>
              <Link to="/sign-up" className="hover:underline">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;