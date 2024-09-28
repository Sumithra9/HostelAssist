// src/pages/Signup.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    hostelBlock: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const hostelBlocks = ['A', 'B', 'C', 'D1', 'D2'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate(`/${formData.role}`);
    } catch (err) {
      setError('Error signing up');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Role:
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </label>
        <label>
          Name:
          <input name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Hostel Block:
          <select name="hostelBlock" value={formData.hostelBlock} onChange={handleChange} required>
            <option value="">Select Block</option>
            {hostelBlocks.map((block) => (
              <option key={block} value={block}>
                {block}
              </option>
            ))}
          </select>
        </label>
        <label>
          Email:
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Password:
          <input name="password" type="password" value={formData.password} onChange={handleChange} required />
        </label>
        <button type="submit">Signup</button>
        {error && <p>{error}</p>}
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Signup;
