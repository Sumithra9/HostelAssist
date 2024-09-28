// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ComplaintForm from './pages/ComplaintForm';
import ComplaintHistory from './pages/ComplaintHistory';
import AdminComplaintList from './pages/AdminComplaintList';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />

        {/* Student Routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/complaints/new"
          element={
            <ProtectedRoute role="student">
              <ComplaintForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/complaints/history"
          element={
            <ProtectedRoute role="student">
              <ComplaintHistory />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/complaints/:category"
          element={
            <ProtectedRoute role="admin">
              <AdminComplaintList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
