import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user, login } = useAuth();
  const navigate = useNavigate();

  // If already logged in, redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setIsSubmitting(true);
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to log in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-md mx-auto my-10 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-2 text-center">
        Welcome Back
      </h1>
      <p className="text-sm text-gray-500 mb-6 text-center">
        Log in to your account to interact with posts
      </p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="thura@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:border-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:border-blue-600"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2.5 rounded-md text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 hover:cursor-pointer"
        >
          {isSubmitting ? "Logging in..." : "Log In"}
        </button>
      </form>

      {/* Demo Credentials Helper for class/preview */}
      <div className="mt-6 p-3 bg-gray-50 border border-gray-200 rounded text-xs text-gray-600 space-y-1">
        <p className="font-semibold text-gray-700">Demo Accounts:</p>
        <p>Email: <span className="font-mono text-gray-900">thura@example.com</span> | Password: <span className="font-mono text-gray-900">password123</span></p>
        <p>Email: <span className="font-mono text-gray-900">maythin@example.com</span> | Password: <span className="font-mono text-gray-900">password123</span></p>
      </div>

      <p className="text-sm text-center text-gray-600 mt-6">
        Don&apos;t have an account?{" "}
        <Link to="/signup" className="text-blue-600 font-medium hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}

export default Login;
