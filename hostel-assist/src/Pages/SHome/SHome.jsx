// /src/Pages/SHome/SHome.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './SHome.css';
import SNavBar from '../../Components/SNavBar/SNavBar'; // Importing the SNavbar component

const SHome = () => {
  return (
    <>
      <SNavBar /> {/* Add SNavbar here for routing */}

      <Routes>
        {/* Placeholder Routes - You can add actual pages later */}
        <Route path="/complaints" element={<div>Complaints Page</div>} /> {/* Complaints Page */}
        <Route path="/profile" element={<div>Profile Page</div>} /> {/* Profile Page */}
        <Route path="/shistory" element={<div>History Page</div>} /> {/* Profile Page */}
        
      </Routes>
      </>
  );
};

export default SHome;
