// src/pages/StudentDashboard.jsx
import { useNavigate } from 'react-router-dom';

function StudentDashboard() {
  const categories = [
    'Electrical',
    'Plumbing',
    'Carpentry',
    'AC',
    'Housekeeping',
    'Mess',
    'Water Coolers',
    'Miscellaneous',
  ];
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate('/student/complaints/new', { state: { category } });
  };

  return (
    <div>
      <h2>Student Dashboard</h2>
      <button onClick={() => navigate('/student/complaints/history')}>View Complaint History</button>
      <div className="categories">
        {categories.map((category) => (
          <div key={category} className="card" onClick={() => handleCategoryClick(category)}>
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentDashboard;
