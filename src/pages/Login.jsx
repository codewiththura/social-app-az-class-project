import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to login");
    }
  }

  return (
    <div className="max-w-md mx-auto my-19 p-6">
      <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
      <p className="text-sm text-gray-500 mb-6">Log in to your account</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 mb-4">
          {error}
        </div>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm font-medium">Email Address</label>
        <input
          type="email"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md text-sm p-2.5"
        />

        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          placeholder="*******"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md text-sm p-2.5"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 text-sm"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
