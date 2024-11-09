import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Import Firestore
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const TestimonialsList = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);

  // Get current user's info from Firebase Auth
  const user = getAuth().currentUser;

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const testimonialsCollection = collection(db, 'testimonials');
        const testimonialsSnapshot = await getDocs(testimonialsCollection);
        const testimonialsList = testimonialsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTestimonials(testimonialsList);
      } catch (err) {
        setError('Failed to fetch testimonials');
      }
    };

    fetchTestimonials();
  }, []);

  // Handle delete review (for the review's author only)
  const handleDelete = async (testimonialId) => {
    if (user) {
      try {
        const docRef = doc(db, 'testimonials', testimonialId);
        await deleteDoc(docRef);
        setTestimonials(testimonials.filter(testimonial => testimonial.id !== testimonialId));
      } catch (error) {
        setError('Failed to delete testimonial');
      }
    }
  };

  return (
    <div className="my-4">
      <h2 className="text-xl font-bold mb-4">User Testimonials</h2>
      {error && <p className="text-red-500">{error}</p>}
      {testimonials.length > 0 ? (
        testimonials.map((testimonial) => (
          <div key={testimonial.id} className="border p-4 mb-2">
            <h3 className="font-semibold">{testimonial.name}</h3>
            <p>{testimonial.review}</p>
            {/* Show the delete button if the current user is the author of the review */}
            {user && user.uid === testimonial.userId && (
              <button
                onClick={() => handleDelete(testimonial.id)}
                className="text-red-500 mt-2"
              >
                Undo Review
              </button>
            )}
          </div>
        ))
      ) : (
        <p>No testimonials available yet.</p>
      )}
    </div>
  );
};

export default TestimonialsList;
