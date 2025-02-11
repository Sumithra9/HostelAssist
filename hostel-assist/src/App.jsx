import { useState } from 'react'
import './App.css'
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";


const App = () => {
  return (
    <>
  
      <Routes>
        <Route path="/" element={<Login />} /> 
        
      </Routes>
   
    </>
  );
};

export default App;
