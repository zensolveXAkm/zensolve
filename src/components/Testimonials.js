import React, { useState } from 'react';
import { db } from '../firebaseConfig'; // Import Firestore
import { collection, addDoc } from 'firebase/firestore';

const TestimonialsForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare review data
      const reviewData = { name, email, review };

      // Save review data to Firestore
      await addDoc(collection(db, 'testimonials'), reviewData);
      setSuccess('Your review has been submitted successfully!');
      setName('');
      setEmail('');
      setReview('');
      setError(null);
    } catch (error) {
      setError('Failed to submit review. Please try again.');
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-4 p-4 border">
      <h2 className="text-xl font-bold mb-4">Submit Your Review</h2>
      <label>Name</label>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        className="border p-2 my-2 w-full" 
        required 
      />

      <label>Email</label>
      <input 
        type="email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        className="border p-2 my-2 w-full" 
        required 
      />

      <label>Review</label>
      <textarea 
        value={review} 
        onChange={(e) => setReview(e.target.value)} 
        className="border p-2 my-2 w-full" 
        required 
      />

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}

      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Submit Review</button>
    </form>
  );
};

export default TestimonialsForm;
