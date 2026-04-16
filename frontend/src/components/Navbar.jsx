import { LogOut, User, MessageSquare, LogIn, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../features/auth/auth.slice.js";

const Navbar = () => {
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 font-semibold text-lg text-indigo-600"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="hidden sm:block">My Chat App</span>
        </Link>

        {/* Right: Actions */}
        {authUser ? (
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Profile */}
            <Link
              to="/profile"
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
                location.pathname === "/profile"
                  ? "bg-indigo-100 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </Link>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            {/* Avatar */}
            <img
              src={
                authUser?.avatar?.url ||
                "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt="profile"
              className="w-8 h-8 rounded-full object-cover border"
            />
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/login"
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
                location.pathname === "/login"
                  ? "bg-indigo-100 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </Link>

            <Link
              to="/register"
              className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition ${
                location.pathname === "/register"
                  ? "bg-indigo-100 text-indigo-600"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <User2 className="w-4 h-4" />
              <span className="hidden sm:inline">register</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
