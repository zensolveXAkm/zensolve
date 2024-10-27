import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaUser, FaLock } from 'react-icons/fa'; // Importing icons

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading animation
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User registered successfully');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      setError(err.message);
      setLoading(false); // Stop loading animation
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 to-blue-500">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>
        <p className="text-gray-600 text-center mb-4">
          Join us today and enjoy exclusive features tailored for you!
        </p>
        <form onSubmit={handleRegister} className="space-y-4">
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
              'Register'
            )}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        <p className="text-gray-500 text-center mt-4">
          Benefits of registering:
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

export default Register;
