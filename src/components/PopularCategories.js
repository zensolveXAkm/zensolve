import React from 'react';
import { Link } from 'react-router-dom';
import { FaLaptop, FaHammer, FaChartLine, FaStethoscope, FaBook, FaBriefcase, FaChalkboardTeacher, FaTruck } from 'react-icons/fa';

const categories = [
  { name: 'IT & Software', icon: <FaLaptop />, path: '/categories/it-software' },
  { name: 'Construction', icon: <FaHammer />, path: '/categories/construction' },
  { name: 'Finance', icon: <FaChartLine />, path: '/categories/finance' },
  { name: 'Healthcare', icon: <FaStethoscope />, path: '/categories/healthcare' },
  { name: 'Education', icon: <FaBook />, path: '/categories/education' },
  { name: 'Business', icon: <FaBriefcase />, path: '/categories/business' },
  { name: 'Teaching', icon: <FaChalkboardTeacher />, path: '/categories/teaching' },
  { name: 'Logistics', icon: <FaTruck />, path: '/categories/logistics' },
];

const PopularCategories = () => {
  return (
    <section className="my-8 bg-white p-6 text-center rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Popular Categories</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <Link
            to={category.path}
            key={index}
            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transform transition duration-300 ease-in-out hover:scale-105 hover:bg-gray-50"
          >
            <div className="text-5xl text-blue-600 mb-4">{category.icon}</div>
            <h4 className="text-lg font-semibold text-gray-700">{category.name}</h4>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
