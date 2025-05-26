// src/pages/auth/Login.jsx
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login logic here
  };

  return (
    <div className="space-y-4">
      <h2 className="font-raleway text-2xl text-gray-800 text-center">Welcome Back</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full border border-gray-300 rounded-lg p-2"
          />
        </div>

        <button type="submit" className="w-full bg-primary p-2 text-white rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;