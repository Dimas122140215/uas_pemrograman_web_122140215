import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setError('Invalid email or password.');
    }, 800);
  };

  return (
    <div className="py-10 px-4 max-w-md mx-auto">
      <h2 className="font-raleway text-2xl text-gray-800 mb-6">Welcome Back</h2>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
          <p className="text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-poppins text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-poppins text-gray-700 mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-primary hover:bg-secondary text-white font-poppins py-2 px-4 rounded-lg transition-colors flex justify-center ${
            isLoading ? 'opacity-70 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <span className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></span>
          ) : (
            'Login'
          )}
        </button>
      </form>

      <p className="mt-4 font-poppins text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;