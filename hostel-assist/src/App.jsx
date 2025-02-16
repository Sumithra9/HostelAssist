import { useState } from 'react'
import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SHome from './Pages/SHome/SHome';
import Login from "./Pages/Login/Login";
import SComplaint from './Pages/SComplaint/SComplaint';
import SProfile from './Pages/SProfile/SProfile';



const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/student" element={<SHome />} />
        <Route path="/complaints" element={<SComplaint />} />
        <Route path="/profile" element={<SProfile />} />

</Routes>

    </>
  );
};

export default App;
