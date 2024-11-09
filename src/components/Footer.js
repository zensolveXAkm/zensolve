import React, { useEffect, useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Footer = () => {
  const [contactData, setContactData] = useState({
    address: '',
    email: '',
    phone: '',
    linkedin: '',
    facebook: '',
    twitter: ''
  });

  useEffect(() => {
    const fetchContactData = async () => {
      const docRef = doc(db, 'settings', 'contactData');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setContactData(docSnap.data());
      }
    };
    fetchContactData();
  }, []);

  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 shadow-lg">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold md:text-xl">
          At Zensolve Infotech Solution Private Limited, we are dedicated to providing employment in the private sector through training. We also offer business consultancy, IT consultancy, and admission consultancy.
        </p>

        <div className="flex flex-wrap justify-center mt-6 space-x-6">
          <a href="/about" className="hover:text-gray-300 transition">About Us</a>
          <a href="/jobs" className="hover:text-gray-300 transition">Jobs</a>
          <a href="/services" className="hover:text-gray-300 transition">Services</a>
          <a href="/contact" className="hover:text-gray-300 transition">Contact Us</a>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="mr-2" />
            <p>{contactData.address}</p>
          </div>
          <div className="flex items-center mb-2">
            <FaEnvelope className="mr-2" />
            <p>Email: <a href={`mailto:${contactData.email}`} className="hover:text-gray-300">{contactData.email}</a></p>
          </div>
          <div className="flex items-center">
            <FaPhone className="mr-2" />
            <p>Call us: <a href={`tel:${contactData.phone}`} className="hover:text-gray-300">{contactData.phone}</a></p>
          </div>
        </div>

        <div className="flex justify-center mt-4 space-x-4">
          <a href={contactData.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition" aria-label="LinkedIn">
            <FaLinkedin size={24} />
          </a>
          <a href={contactData.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition" aria-label="Facebook">
            <FaFacebook size={24} />
          </a>
          <a href={contactData.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition" aria-label="Twitter">
            <FaTwitter size={24} />
          </a>
        </div>

        <p className="mt-6">Copyright © {new Date().getFullYear()} by Zensolve Infotech Solution Private Limited. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
