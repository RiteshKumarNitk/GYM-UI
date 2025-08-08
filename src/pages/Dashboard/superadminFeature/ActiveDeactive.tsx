import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Tenant {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  isActive: boolean;
}

const ActiveDeactive: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem('token');

  const fetchTenants = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tenants', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTenants(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tenants:', err);
      setError('Failed to load tenants.');
      setLoading(false);
    }
  };

  const handleStatusChange = async (tenantId: string, isActive: boolean) => {
    try {
      const url = `http://localhost:5000/api/tenants/${tenantId}/${isActive ? 'deactivate' : 'reactivate'}`;
      await axios.put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTenants(); // Refresh after status change
    } catch (err) {
      console.error('Error updating status:', err);
      alert('Failed to update tenant status.');
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  if (loading) return <p>Loading tenants...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Tenant Management</h1>
      <table className="w-full border text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Address</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {tenants.map((tenant) => (
            <tr key={tenant._id}>
              <td className="p-2 border">{tenant.name}</td>
              <td className="p-2 border">{tenant.email}</td>
              <td className="p-2 border">{tenant.phone}</td>
              <td className="p-2 border">{tenant.address}</td>
              <td className="p-2 border">
                {tenant.isActive ? (
                  <span className="text-green-600 font-medium">Active</span>
                ) : (
                  <span className="text-red-600 font-medium">Inactive</span>
                )}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleStatusChange(tenant._id, tenant.isActive)}
                  className={`px-4 py-1 rounded text-white ${
                    tenant.isActive ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
                  }`}
                >
                  {tenant.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveDeactive;
