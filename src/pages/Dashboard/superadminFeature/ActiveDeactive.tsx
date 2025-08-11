import React, { useEffect, useState } from "react";
import axios from "axios";

interface Tenant {
  _id: string;
  tenantId: string; // Added this so we can use your custom tenantId
  name: string;
  contactEmail: string;
  status: string;
}

const ActiveDeactive: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTenants = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found");
        setLoading(false);
        return;
      }

      const res = await axios.get("http://localhost:5000/api/tenants", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const tenantsData = res.data?.data?.docs || res.data?.data || [];
      setTenants(tenantsData);
    } catch (err) {
      console.error("Error fetching tenants:", err);
      setError("Failed to fetch tenants");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: string, tenantId: string, currentStatus: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const newStatus = currentStatus === "active" ? "inactive" : "active";

      await axios.put(
        `http://localhost:5000/api/tenants/${tenantId}`, // ✅ use tenantId, not array
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTenants((prev) =>
        prev.map((tenant) =>
          tenant._id === id ? { ...tenant, status: newStatus } : tenant
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  if (loading) return <div className="text-center py-10">Loading tenants...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Active / Deactive Tenants</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {tenants.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                No tenants found
              </td>
            </tr>
          ) : (
            tenants.map((tenant) => (
              <tr key={tenant._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{tenant.name}</td>
                <td className="border border-gray-300 px-4 py-2">{tenant.contactEmail}</td>
                <td className="border border-gray-300 px-4 py-2">{tenant.status}</td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => toggleStatus(tenant._id, tenant.tenantId, tenant.status)}
                    className={`px-3 py-1 rounded ${
                      tenant.status === "active"
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {tenant.status === "active" ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveDeactive;
