// src/pages/AdminDashboard.jsx
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
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
    navigate(`/admin/complaints/${category}`);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
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

export default AdminDashboard;
