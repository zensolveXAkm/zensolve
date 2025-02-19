import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './Pages/Home';
import JobDetails from './components/JobDetails';
import Login from './components/Login';
import Register from './components/Register';

// Import all category pages
import ITSoftware from './Pages/categories/ITSoftware';
import Construction from './Pages/categories/Construction';
import Finance from './Pages/categories/Finance';
import Healthcare from './Pages/categories/Healthcare';
import Education from './Pages/categories/Education';
import Business from './Pages/categories/Business';
import Teaching from './Pages/categories/Teaching';
import Logistics from './Pages/categories/Logistics';
import ApplyJob from './components/ApplyJob';
// import AdminPanel from './Pages/AdminPanel';
// import SSUpload from './components/SSUpload';
// import LogoUpload from './components/LogoUpload';
import ThankYou from './components/ThankYou';
import SaveJob from './components/SaveJob';
import ContactUs from './Pages/ContactUs';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<Home />} />
        <Route path="/contactus" element={<ContactUs />} />

        {/* Category Routes */}
        <Route path="/categories/it-software" element={<ITSoftware />} />
        <Route path="/categories/construction" element={<Construction />} />
        <Route path="/categories/finance" element={<Finance />} />
        <Route path="/categories/healthcare" element={<Healthcare />} />
        <Route path="/categories/education" element={<Education />} />
        <Route path="/categories/business" element={<Business />} />
        <Route path="/categories/teaching" element={<Teaching />} />
        <Route path="/categories/logistics" element={<Logistics />} />

        {/* Job Details Route with Dynamic ID */}
        <Route path="/job-details/" element={<JobDetails />} />
        <Route path="/saved-jobs" element={<SaveJob/>} />
        {/* Login and Register Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='apply-job' element={<ApplyJob />} />
        <Route path='/thank-you' element={ <ThankYou/> } />


      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
