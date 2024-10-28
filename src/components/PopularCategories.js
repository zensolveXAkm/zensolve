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
    <section className="my-6 bg-gray-100 p-6 text-center">
      <h3 className="text-xl font-semibold mb-4">Popular Categories</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Link to={category.path} key={index} className="flex flex-col items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
            <div className="text-4xl text-blue-500 mb-2">{category.icon}</div>
            <h4 className="text-lg font-semibold">{category.name}</h4>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PopularCategories;
