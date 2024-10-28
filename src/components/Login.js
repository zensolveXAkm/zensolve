import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { FaUser, FaLock } from 'react-icons/fa'; // Importing icons
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading animation
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful');
      navigate('/'); // Redirect to home page after successful login
      setLoading(false); // Stop loading animation
    } catch (err) {
      setError(err.message);
      setLoading(false); // Stop loading animation
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <p className="text-gray-600 text-center mb-4">
          Welcome back! Please login to access your dashboard and enjoy personalized features.
        </p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500">
            <div className="bg-gray-200 p-3">
              <FaUser className="text-gray-600" />
            </div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-none p-2 flex-1 focus:outline-none"
              required
            />
          </div>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:border-blue-500">
            <div className="bg-gray-200 p-3">
              <FaLock className="text-gray-600" />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-none p-2 flex-1 focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg transition duration-200 ease-in-out transform hover:bg-blue-700 hover:scale-105"
            disabled={loading} // Disable button during loading
          >
            {loading ? (
              <span className="loader"></span>
            ) : (
              'Login'
            )}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <p className="text-gray-600 text-center mt-4">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Register here
          </a>
        </p>
        <p className="text-gray-500 text-center mt-2">
          Benefits of logging in:
        </p>
        <ul className="text-gray-500 text-center list-disc list-inside">
          <li>Access to exclusive features</li>
          <li>Personalized content and recommendations</li>
          <li>Track your activities and preferences</li>
        </ul>
      </div>
    </div>
  );
};

export default Login;
