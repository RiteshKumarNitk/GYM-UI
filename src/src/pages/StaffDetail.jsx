import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { getStaffMember, updateStaffMember } from '../api/users';

const StaffDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [staff, setStaff] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await getStaffMember(id, user.token);
        setStaff(data);
        setFormData({
          name: data.name,
          email: data.email,
          role: data.role
        });
      } catch (error) {
        console.error('Failed to fetch staff:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStaff();
  }, [id, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStaffMember(id, formData, user.token);
      navigate('/staff');
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!staff) return <div>Staff not found</div>;

  return (
    <div className="staff-detail">
      <h2>Edit Staff Member</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </label>
        
        <label>
          Email:
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </label>
        
        <label>
          Role:
          <select
            value={formData.role}
            onChange={(e) => setFormData({...formData, role: e.target.value})}
          >
            <option value="frontdesk">Front Desk</option>
            <option value="trainer">Trainer</option>
          </select>
        </label>
        
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default StaffDetail;