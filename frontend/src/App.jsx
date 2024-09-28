import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ComplaintForm from './pages/Student/ComplaintForm/ComplaintForm';
import ComplaintHistory from './pages/Student/ComplaintHistort/ComplaintHistory';
import ComplaintList from './pages/Admin/ComplaintList/ComplaintList';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/student/complaint" element={<ComplaintForm />} />
          <Route path="/student/history" element={<ComplaintHistory />} />
          <Route path="/admin/complaints" element={<ComplaintList />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
