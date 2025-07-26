import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { getMember, updateMember } from '../api/members';

const MemberDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [member, setMember] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const data = await getMember(id, user.token);
        setMember(data);
        setFormData({
          name: data.name,
          email: data.email,
          phone: data.phone,
          plan: data.plan,
          status: data.status
        });
      } catch (error) {
        console.error('Failed to fetch member:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMember();
  }, [id, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateMember(id, formData, user.token);
      navigate('/members');
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!member) return <div>Member not found</div>;

  return (
    <div className="member-detail">
      <h2>Edit Member</h2>
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
          Phone:
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </label>
        
        <label>
          Plan:
          <select
            value={formData.plan}
            onChange={(e) => setFormData({...formData, plan: e.target.value})}
          >
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="vip">VIP</option>
          </select>
        </label>
        
        <label>
          Status:
          <select
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="paused">Paused</option>
          </select>
        </label>
        
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default MemberDetail;