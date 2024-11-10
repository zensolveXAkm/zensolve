import React, { useState } from 'react';
import { db } from '../firebaseConfig'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore';
import { FaUser, FaEnvelope, FaComment, FaSpinner, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

const TestimonialsForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!name || !email || !review) {
      setError('All fields are required.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const reviewData = { name, email, review };

      // Save review data to Firestore
      await addDoc(collection(db, 'testimonials'), reviewData);
      setSuccess('Your review has been submitted successfully!');
      setName('');
      setEmail('');
      setReview('');
    } catch (error) {
      setError('Failed to submit review. Please try again.');
      console.error('Error adding document: ', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-8 p-6 max-w-xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Submit Your Review</h2>

      <div className="relative mb-4">
        <FaUser className="absolute left-3 top-2 text-gray-500" />
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="border p-3 pl-10 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Your Name"
          required 
        />
      </div>

      <div className="relative mb-4">
        <FaEnvelope className="absolute left-3 top-2 text-gray-500" />
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="border p-3 pl-10 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Your Email"
          required 
        />
      </div>

      <div className="relative mb-4">
        <FaComment className="absolute left-3 top-2 text-gray-500" />
        <textarea 
          value={review} 
          onChange={(e) => setReview(e.target.value)} 
          className="border p-3 pl-10 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Your Review"
          rows="4"
          required 
        />
      </div>

      {error && (
        <div className="bg-red-100 border border-red-500 text-red-500 p-3 rounded-lg mb-4 flex items-center">
          <FaExclamationTriangle className="mr-2" /> {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-500 text-green-500 p-3 rounded-lg mb-4 flex items-center">
          <FaCheckCircle className="mr-2" /> {success}
        </div>
      )}

      <button 
        type="submit" 
        className={`w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 transform ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? <FaSpinner className="animate-spin mx-auto" /> : 'Submit Review'}
      </button>
    </form>
  );
};

export default TestimonialsForm;
