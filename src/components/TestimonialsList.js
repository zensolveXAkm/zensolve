import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; // Import Firestore
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FaSpinner, FaTrashAlt } from 'react-icons/fa'; // Import icons for loading and delete

const TestimonialsList = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State to track loading
  const [deleting, setDeleting] = useState(false); // State to track delete process

  // Get current user's info from Firebase Auth
  const user = getAuth().currentUser;

  // Fetch testimonials from Firestore
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const testimonialsCollection = collection(db, 'testimonials');
        const testimonialsSnapshot = await getDocs(testimonialsCollection);
        const testimonialsList = testimonialsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTestimonials(testimonialsList);
      } catch (err) {
        setError('Failed to fetch testimonials.');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Handle delete review (for the review's author only)
  const handleDelete = async (testimonialId) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      if (user) {
        setDeleting(true); // Set deleting state to true

        try {
          const docRef = doc(db, 'testimonials', testimonialId);
          await deleteDoc(docRef);
          setTestimonials(testimonials.filter((testimonial) => testimonial.id !== testimonialId));
        } catch (error) {
          setError('Failed to delete testimonial');
        } finally {
          setDeleting(false); // Set deleting state to false after deletion
        }
      }
    }
  };

  return (
    <div className="my-8 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">User Testimonials</h2>

      {loading && (
        <div className="text-center">
          <FaSpinner className="animate-spin text-blue-500 text-3xl" />
          <p>Loading testimonials...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 text-red-500 p-4 rounded-lg mb-4 text-center">
          {error}
        </div>
      )}

      {testimonials.length === 0 && !loading && (
        <p className="text-center text-gray-500">No testimonials available yet.</p>
      )}

      {testimonials.length > 0 && (
        <div>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="border p-4 mb-4 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <h3 className="font-semibold text-lg">{testimonial.name}</h3>
              <p className="mt-2">{testimonial.review}</p>
              {/* Show the delete button if the current user is the author of the review */}
              {user && user.uid === testimonial.userId && (
                <button
                  onClick={() => handleDelete(testimonial.id)}
                  className="text-red-500 mt-4 flex items-center"
                  disabled={deleting}
                >
                  {deleting ? (
                    <FaSpinner className="animate-spin mr-2" />
                  ) : (
                    <FaTrashAlt className="mr-2" />
                  )}
                  {deleting ? 'Deleting...' : 'Undo Review'}
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialsList;
