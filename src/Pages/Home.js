import React from 'react';
import Slideshow from '../components/Slideshow';
import TopCompanies from '../components/TopCompanies';
import PopularCategories from '../components/PopularCategories';
import JobList from '../Joblist';
import TestimonialsForm from '../components/Testimonials'; // Import the form
import TestimonialsList from '../components/TestimonialsList'; // Import the list

const Home = () => {
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-3xl font-bold text-center mb-6">ZenSolve Infotech Solution</h2>

      {/* Slideshow Section */}
      <section className="my-6 text-center">
        <Slideshow />
      </section>

      {/* Top Companies Section */}
      <section className="my-6">
        <TopCompanies />
      </section>

      {/* Popular Categories */}
      <PopularCategories />

      {/* Jobs Section */}
      <section className="my-6 bg-gray-200 p-6">
        <h3 className="text-xl font-semibold mb-4 text-center">Job at a Glance</h3>
        <JobList maxJobs={5} />
      </section>

      {/* Testimonials Section */}
      <section className="my-6 bg-gray-100 p-6">
        <TestimonialsForm /> {/* Include the form */}
        <TestimonialsList /> {/* Include the list */}
      </section>
    </div>
  );
};

export default Home;
