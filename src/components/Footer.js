import React, { useEffect, useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const SocialLink = ({ href, icon: Icon, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition" aria-label={label}>
    <Icon size={24} />
  </a>
);

const ContactInfo = ({ icon: Icon, children }) => (
  <div className="flex items-center mb-2">
    <Icon className="mr-2" />
    <p>{children}</p>
  </div>
);

const Footer = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const docRef = doc(db, 'settings', 'contactData');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setContactData(docSnap.data());
        } else {
          setError('Contact data not found');
        }
      } catch (err) {
        setError('Error fetching contact data');
      } finally {
        setLoading(false);
      }
    };
    fetchContactData();
  }, []);

  return (
    <footer className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white py-10 shadow-lg">
  <div className="container mx-auto max-w-4xl px-4 text-center">
    <p className="text-base md:text-lg font-medium leading-relaxed mb-6">
      At Zensolve Infotech Solution Private Limited, we are dedicated to providing employment in the private sector through training. We also offer business consultancy, IT consultancy, and admission consultancy.
    </p>

    <nav className="flex flex-wrap justify-center mt-6 space-x-4 md:space-x-6 text-sm md:text-base">
      <a href="/about" className="hover:underline underline-offset-4 decoration-blue-400 transition">About Us</a>
      <a href="/jobs" className="hover:underline underline-offset-4 decoration-blue-400 transition">Jobs</a>
      <a href="/services" className="hover:underline underline-offset-4 decoration-blue-400 transition">Services</a>
      <a href="/contactus" className="hover:underline underline-offset-4 decoration-blue-400 transition">Contact Us</a>
    </nav>

    <hr className="border-t border-gray-600 my-6" />

    <div className="mt-6 flex flex-col items-center space-y-3">
      {loading && <p>Loading contact information...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {contactData && (
        <address className="not-italic space-y-2">
          <ContactInfo icon={FaMapMarkerAlt}>{contactData.address}</ContactInfo>
          <ContactInfo icon={FaEnvelope}>
            Email: <a href={`mailto:${contactData.email}`} className="hover:text-blue-400">{contactData.email}</a>
          </ContactInfo>
          <ContactInfo icon={FaPhone}>
            Call us: <a href={`tel:${contactData.phone}`} className="hover:text-blue-400">{contactData.phone}</a>
          </ContactInfo>
        </address>
      )}
    </div>

    <div className="flex justify-center mt-4 space-x-6">
      <SocialLink href={contactData?.linkedin} icon={FaLinkedin} label="LinkedIn" />
      <SocialLink href={contactData?.facebook} icon={FaFacebook} label="Facebook" />
      <SocialLink href={contactData?.twitter} icon={FaTwitter} label="Twitter" />
    </div>

    <p className="mt-6 text-xs md:text-sm">
      Copyright © {new Date().getFullYear()} by Zensolve Infotech Solution Private Limited. All Rights Reserved.
    </p>
  </div>
</footer>

  );
};

export default Footer;
