import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { getStaff } from '../api/users'; // New API function

const StaffList = () => {
  const { user } = useContext(AuthContext);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const data = await getStaff(user.token);
        setStaff(data);
      } catch (error) {
        console.error('Failed to fetch staff:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStaff();
  }, [user.token]);

  return (
    <div className="staff-list">
      <h2>Staff Members</h2>
      {loading ? (
        <p>Loading staff...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((staffMember) => (
              <tr key={staffMember._id}>
                <td>{staffMember.name}</td>
                <td>{staffMember.email}</td>
                <td>{staffMember.role}</td>
                <td>
                  <button>View</button>
                  <button>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StaffList;