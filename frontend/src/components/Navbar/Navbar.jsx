// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav>
      <Link to="/">Hostel Assist</Link>
      <div>
        {user ? (
          <>
            {user.role === 'student' && <Link to="/student">Dashboard</Link>}
            {user.role === 'admin' && <Link to="/admin">Dashboard</Link>}
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login/Signup</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
