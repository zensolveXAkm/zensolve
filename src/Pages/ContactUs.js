// ContactUs.js
import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { saveContactDetails } from './inhelp'; // Import the save function
import { db } from '../firebaseConfig';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [phone, setPhone] = useState(''); // New phone state
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [contactDetails, setContactDetails] = useState({
    email: '',
    phone: '',
    address: '',
  });

  // Fetch the latest contact details (email, phone, and address) from Firestore
  useEffect(() => {
    const fetchContactData = async () => {
      const docRef = doc(db, 'settings', 'contactData');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContactDetails(docSnap.data());
      }
    };

    fetchContactData();
  }, []); // Only fetch once when component mounts

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!name || !email || !message) {
      setError('All fields are required!');
      return;
    }

    // Clear previous error messages
    setError(null);

    // Create form data object
    const formData = {
      name,
      email,
      phone,
      message,
    };

    // Call the save function from inhelp.js to save the form data
    const result = await saveContactDetails(formData);

    if (result.success) {
      setSuccess(result.message);
      // Reset form fields
      setName('');
      setEmail('');
      setMessage('');
      setPhone('');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center py-12">
      <div className="w-full max-w-xl p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">Contact Us</h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-lg font-medium text-gray-700">Phone Number</label>
              <input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                required
              />
            </div>

            {error && <div className="text-red-500 text-center">{error}</div>}
            {success && <div className="text-green-500 text-center">{success}</div>}

            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 transition duration-300">
              Send Message
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-gray-700">
          <p>Alternatively, you can reach us at:</p>
          <p>Phone: <strong>{contactDetails.phone || 'xxxxxxxxxxx'}</strong></p> {/* Display phone from Firestore or fallback */}
          <p>Email: <strong>{contactDetails.email || 'support@zensolve.com'}</strong></p> {/* Display email from Firestore or fallback */}
          <p>Address: <strong>{contactDetails.address || 'xxxxxxxx Road, xxxxxx, xxxxxxx, 000000'}</strong></p> {/* Display address from Firestore or fallback */}
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
