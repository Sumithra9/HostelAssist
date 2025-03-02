import { useState } from 'react'
import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SHome from './Pages/SHome/SHome';
import Login from "./Pages/Login/Login";
import SComplaint from './Pages/SComplaint/SComplaint';
import SProfile from './Pages/SProfile/SProfile';
import SHistory from './Pages/SHistory/SHistory';
import ComplaintForm from './Pages/ComplaintForm/ComplaintForm';
import Chatbot from './Components/Chatbot';
import AHome from './Pages/AHome/AHome';
import AComplaint from './Pages/AComplaint/AComplaint';
import AComplaintDetails from './Pages/AComplaintDetails/AComplaintDetails';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/student" element={<SHome />} />
        <Route path="/complaints" element={<SComplaint />} />
        <Route path="/profile" element={<SProfile />} />
        <Route path="/shistory" element={<SHistory />} />
        <Route path="/complaint-form" element ={<ComplaintForm/>}/>
        <Route path="/admin" element={<AHome/>}/>
        <Route path="/admin-complaints/:block" element={<AComplaint />} />
        <Route path="/admin-complaints/:block/:category" element={<AComplaintDetails />} />
       

</Routes>
<Chatbot />

    </>
  );
};

export default App;
