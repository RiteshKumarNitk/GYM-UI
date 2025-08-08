import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Location {
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
}

interface BusinessHours {
  day: string;
  open: string;
  close: string;
}

interface BusinessDetails {
  gstNumber?: string;
  registrationNumber?: string;
  businessType?: string;
}

interface Owner {
  name: string;
  email: string;
  phone?: string;
}

interface Tenant {
  _id: string;
  tenantId: string;
  name: string;
  domain: string;
  status: string;
  subscriptionType: string;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
  createdAt: string;
  contactEmail: string;
  contactPhone?: string;
  businessDetails?: BusinessDetails;
  location?: Location;
  billingAddress?: string;
  businessHours?: BusinessHours[];
  autoRenew: boolean;
  lastBillingDate?: string;
  nextBillingDate?: string;
  owner?: Owner;
}

const ShowOwnerList: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedTenant, setExpandedTenant] = useState<string | null>(null);

  const fetchTenants = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found');
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:5000/api/tenants', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const tenantsData = response.data?.data?.docs || response.data?.data || [];
      setTenants(tenantsData);
    } catch (err) {
      console.error('Failed to fetch tenants:', err);
      setError('Failed to fetch tenants.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  if (loading) return <div className="text-center text-lg py-10">Loading tenants...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Tenant List</h1>

      {tenants.length === 0 ? (
        <div className="text-center text-gray-600">No tenants found.</div>
      ) : (
        <div className="space-y-4">
          {tenants.map((tenant) => (
            <div
              key={tenant._id}
              className="border rounded-lg shadow-sm bg-white hover:shadow-md transition-all"
            >
              <div
                className="cursor-pointer p-4 flex justify-between items-center"
                onClick={() => setExpandedTenant(expandedTenant === tenant._id ? null : tenant._id)}
              >
                <h2 className="text-lg font-semibold text-indigo-700">{tenant.name}</h2>
                <span className="text-sm text-gray-500">{expandedTenant === tenant._id ? 'Hide' : 'Show'} Details</span>
              </div>

              {expandedTenant === tenant._id && (
                <div className="border-t px-4 py-2 space-y-4 text-sm text-gray-700">

                  {tenant.owner && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Owner Details</h3>
                      <p><strong>Name:</strong> {tenant.owner.name}</p>
                      <p><strong>Email:</strong> {tenant.owner.email}</p>
                      {tenant.owner.phone && <p><strong>Phone:</strong> {tenant.owner.phone}</p>}
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Basic Info</h3>
                    <p><strong>Tenant ID:</strong> {tenant.tenantId}</p>
                    <p><strong>Domain:</strong> {tenant.domain}</p>
                    <p><strong>Email:</strong> {tenant.contactEmail}</p>
                    {tenant.contactPhone && <p><strong>Phone:</strong> {tenant.contactPhone}</p>}
                    <p><strong>Status:</strong> {tenant.status}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Subscription</h3>
                    <p><strong>Type:</strong> {tenant.subscriptionType}</p>
                    <p><strong>Start:</strong> {new Date(tenant.subscriptionStartDate).toLocaleDateString()}</p>
                    <p><strong>End:</strong> {new Date(tenant.subscriptionEndDate).toLocaleDateString()}</p>
                    <p><strong>Auto Renew:</strong> {tenant.autoRenew ? 'Yes' : 'No'}</p>
                    {tenant.lastBillingDate && (
                      <p><strong>Last Billing:</strong> {new Date(tenant.lastBillingDate).toLocaleDateString()}</p>
                    )}
                    {tenant.nextBillingDate && (
                      <p><strong>Next Billing:</strong> {new Date(tenant.nextBillingDate).toLocaleDateString()}</p>
                    )}
                  </div>

                  {tenant.location && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Location</h3>
                      <p>{tenant.location.address}, {tenant.location.city}, {tenant.location.state}, {tenant.location.zipCode}, {tenant.location.country}</p>
                    </div>
                  )}

                  {tenant.billingAddress && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Billing Address</h3>
                      <p>{tenant.billingAddress}</p>
                    </div>
                  )}

                  {tenant.businessDetails && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Business Details</h3>
                      <p><strong>GST:</strong> {tenant.businessDetails.gstNumber || 'N/A'}</p>
                      <p><strong>Reg. No:</strong> {tenant.businessDetails.registrationNumber || 'N/A'}</p>
                      <p><strong>Type:</strong> {tenant.businessDetails.businessType || 'N/A'}</p>
                    </div>
                  )}

                  {(tenant.businessHours || []).length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">Business Hours</h3>
                      <ul className="list-disc list-inside">
                        {tenant.businessHours!.map((slot, index) => (
                          <li key={index}>{slot.day}: {slot.open} - {slot.close}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowOwnerList;
