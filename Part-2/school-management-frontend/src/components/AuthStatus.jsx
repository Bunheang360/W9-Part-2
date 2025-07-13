import { useAuth } from "../context/AuthContext";

const AuthStatus = () => {
  const { auth, loading } = useAuth();

  if (loading) {
    return <div className="text-sm text-gray-500">Checking authentication...</div>;
  }

  if (auth) {
    return (
      <div className="text-sm text-green-600">
        ✓ Authenticated as {auth.email || auth.username}
      </div>
    );
  }

  return <div className="text-sm text-red-600">✗ Not authenticated</div>;
};

export default AuthStatus;
