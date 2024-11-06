import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-8 shadow-lg">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold md:text-xl">
          At Zensolve Infotech Solution Private Limited, we are dedicated to providing employment in the private sector through training. We also offer business consultancy, IT consultancy, and admission consultancy.
        </p>
        
        <div className="flex flex-wrap justify-center mt-6 space-x-6">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="hover:text-gray-300 transition">About Us</a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="hover:text-gray-300 transition">Jobs</a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="hover:text-gray-300 transition">Services</a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="hover:text-gray-300 transition">Contact Us</a>
        </div>

        <div className="flex flex-wrap justify-center mt-4 space-x-6">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="hover:text-gray-300 transition">Terms & Conditions</a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="hover:text-gray-300 transition">Privacy Policy</a>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href="#" className="hover:text-gray-300 transition">Sitemap</a>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <div className="flex items-center mb-2">
            <FaMapMarkerAlt className="mr-2" />
            <p>Bhagalpur Road, Godda, Jharkhand, 814133</p>
          </div>
          <div className="flex items-center mb-2">
            <FaEnvelope className="mr-2" />
            <p>Email: <a href="mailto:info@zensolveinfotech.com" className="hover:text-gray-300">support@infozensolve.in</a></p>
          </div>
          <div className="flex items-center">
            <FaPhone className="mr-2" />
            <p>Call us: <a href="tel:02269622941" className="hover:text-gray-300">02269622941</a></p>
          </div>
        </div>

        <div className="flex justify-center mt-4 space-x-4">
          <a href="/" className="hover:text-gray-300 transition" aria-label="LinkedIn">
            <FaLinkedin size={24} />
          </a>
          <a href="/" className="hover:text-gray-300 transition" aria-label="Facebook">
            <FaFacebook size={24} />
          </a>
          <a href="/" className="hover:text-gray-300 transition" aria-label="Twitter">
            <FaTwitter size={24} />
          </a>
        </div>

        <p className="mt-6">Copyright © {new Date().getFullYear()} by Zensolve Infotech Solution Private Limited. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

// Disable eslint warnings for the whole file
/* eslint-disable react/jsx-no-target-blank, react/prop-types */

export default Footer;
