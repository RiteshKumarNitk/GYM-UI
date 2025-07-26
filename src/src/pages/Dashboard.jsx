import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.name}</h1>
      
      {user?.role === 'superadmin' && (
        <div className="superadmin-view">
          <h2>Super Admin Dashboard</h2>
          {/* Tenant management tools */}
        </div>
      )}
      
      {user?.role === 'owner' && (
        <div className="owner-view">
          <h2>Gym Owner Dashboard</h2>
          {/* Business analytics, staff management */}
        </div>
      )}
      
      {user?.role === 'frontdesk' && (
        <div className="frontdesk-view">
          <h2>Front Desk Dashboard</h2>
          {/* Member check-in, quick actions */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
