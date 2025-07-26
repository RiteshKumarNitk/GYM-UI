import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { getTenants } from '../api/tenants'; // New API function

const Tenants = () => {
  const { user } = useContext(AuthContext);
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const data = await getTenants(user.token);
        setTenants(data);
      } catch (error) {
        console.error('Failed to fetch tenants:', error);
      } finally {
        setLoading(false);
      }
    };
    
    if (user.isSuperAdmin) {
      fetchTenants();
    }
  }, [user]);

  if (!user.isSuperAdmin) {
    return <div>Unauthorized access</div>;
  }

  return (
    <div className="tenants-list">
      <h2>Managed Tenants</h2>
      {loading ? (
        <p>Loading tenants...</p>
      ) : (
        <div className="tenant-cards">
          {tenants.map((tenant) => (
            <div key={tenant._id} className="tenant-card">
              <h3>{tenant.name}</h3>
              <p>Domain: {tenant.domain}</p>
              <p>Contact: {tenant.contactEmail}</p>
              <p>Owner: {tenant.ownerName}</p>
              <button>View Details</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tenants;