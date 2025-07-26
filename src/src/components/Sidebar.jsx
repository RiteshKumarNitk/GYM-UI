import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const Sidebar = () => {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <nav className="w-64 bg-gray-800 text-white p-4">
      <div className="space-y-4">
        <h2 className="text-xl font-bold mb-6">Menu</h2>
        
        {user.isSuperAdmin && (
          <>
            <NavLink 
              to="/tenants" 
              className={({ isActive }) => 
                `block p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
            >
              Tenants
            </NavLink>
            <NavLink 
              to="/create-tenant" 
              className={({ isActive }) => 
                `block p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
            >
              Create Tenant
            </NavLink>
          </>
        )}
        
        {user.isGymOwner && (
          <>
            <NavLink 
              to="/staff" 
              className={({ isActive }) => 
                `block p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
            >
              Staff
            </NavLink>
            <NavLink 
              to="/create-staff" 
              className={({ isActive }) => 
                `block p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
            >
              Add Staff
            </NavLink>
          </>
        )}
        
        {(user.isGymOwner || user.isFrontDesk) && (
          <>
            <NavLink 
              to="/members" 
              className={({ isActive }) => 
                `block p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
            >
              Members
            </NavLink>
            <NavLink 
              to="/create-member" 
              className={({ isActive }) => 
                `block p-2 rounded ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
              }
            >
              Add Member
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Sidebar;