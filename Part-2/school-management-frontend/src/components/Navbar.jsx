import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const { auth, setAuth, loading } = useAuth();

  const handleLogout = () => {
    logout();
    setAuth(null);
    navigate("/");
  };

  if (loading) {
    return (
      <nav className="bg-white border-b shadow px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-semibold text-gray-700">
          School System
        </div>
        <div className="text-sm text-gray-500">Loading...</div>
      </nav>
    );
  }

  return (
    <nav className="bg-white border-b shadow px-6 py-4 flex justify-between items-center">
      <div
        className="text-xl font-semibold text-gray-700 cursor-pointer"
        onClick={() => navigate("/")}
      >
        School System
      </div>

      {auth ? (
        <>
          {/* Navigation links */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Dashboard
            </button>
            <button
              onClick={() => navigate("/courses")}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Courses
            </button>
            <button
              onClick={() => navigate("/students")}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Students
            </button>
            <button
              onClick={() => navigate("/teachers")}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Teachers
            </button>
          </div>

          {/* User info and logout */}
          <div className="flex items-center gap-4 ml-6">
            <span className="text-sm text-gray-600">
              Logged in as <strong>{auth?.email || auth?.username || "User"}</strong>
              {auth?.role && <span className="text-blue-600 ml-1">({auth.role})</span>}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
            >
              Logout
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors"
          >
            Sign Up
          </button>
        </div>
      )}
    </nav>
  );
}
