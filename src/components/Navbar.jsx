import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-300">
      <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          Social App
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            to="/"
            className="text-gray-500 hover:text-gray-900 text-sm font-medium"
          >
            Home
          </Link>

          {isAuthenticated && (
            <Link
              to="/saved"
              className="text-gray-500 hover:text-gray-900 text-sm font-medium"
            >
              Saved Posts
            </Link>
          )}

          {isAuthenticated ? (
            <>
              <Link
                to="/create-post"
                className="bg-blue-600 text-white px-3.5 py-1.5 rounded text-sm font-medium hover:bg-blue-700 transition"
              >
                Create Post
              </Link>
              <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
                <img
                  src={
                    user.avatarUrl ||
                    `https://i.pravatar.cc/150?u=${user.username}`
                  }
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover border border-gray-300"
                />
                <span className="text-sm font-semibold text-gray-800 hidden sm:inline">
                  {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-xs text-red-600 hover:text-red-800 font-medium ml-1 hover:cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-sm font-medium text-gray-700 hover:text-blue-600"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-3.5 py-1.5 rounded text-sm font-medium hover:bg-blue-700 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
