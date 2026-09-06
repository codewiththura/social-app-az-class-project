import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <nav className="bg-white border-b border-gray-300">
      <div className="max-w-3xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">
          Social App
        </Link>
        <div className="flex gap-4 items-center">
          <Link to="/" className="text-gray-500 hover:text-gray-900">
            Home
          </Link>
          <Link
            to="/create-post"
            className="bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700"
          >
            Create Post
          </Link>

          {isAuthenticated && (
            <div>
              <span className="text-sm font-semibold text-gray-800">
                {user.name}
              </span>
              <button
                className="text-sm text-red-500 hover:text-red-800 font-medium ml-3 hover:cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
