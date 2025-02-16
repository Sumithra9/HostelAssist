import { useState } from 'react'
import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SHome from './Pages/SHome/SHome';
import Login from "./Pages/Login/Login";



const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/student" element={<SHome />} />

</Routes>

    </>
  );
};

export default App;
