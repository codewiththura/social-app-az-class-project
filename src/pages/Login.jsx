import React, { useState } from "react";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  async function login(email, password) {
    const response = await fetch(
      `https://api.codewiththura.com/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      },
    );

    if (!response.ok) return null;
    return await response.json();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const loggedInUser = await login(email, password);
      setUser(loggedInUser);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="max-w-md mx-auto my-19 p-6">
      <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
      <p className="text-sm text-gray-500 mb-6">Log in to your account</p>

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
