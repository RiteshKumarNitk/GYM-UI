import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

interface Location {
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
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
  autoRenew: boolean;
  lastBillingDate?: string;
  nextBillingDate?: string;
  owner?: Owner;
  plan?: string;
}

type EditablePayload = {
  name?: string;
  domain?: string;
  contactEmail?: string;
  contactPhone?: string;
  status?: string;
  plan?: string;
  subscriptionType?: string;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
  autoRenew?: boolean;
  billingAddress?: string;
  businessDetails?: BusinessDetails;
  location?: Location;
};


const ShowOwnerList: React.FC = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedTenant, setExpandedTenant] = useState<string | null>(null);

  // edit modal state
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [editError, setEditError] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [activeTenant, setActiveTenant] = useState<Tenant | null>(null);
  const [form, setForm] = useState<EditablePayload>({
    name: '',
    contactEmail: '',
    contactPhone: '',
    status: 'active',
    plan: ''
  });
  
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
    } catch (err: any) {
      console.error('Failed to fetch tenants:', err);
      setError(err?.response?.data?.error || 'Failed to fetch tenants.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants();
  }, []);

  const openEdit = (tenant: Tenant) => {
    setActiveTenant(tenant);
    setForm({
      name: tenant.name,
      domain: tenant.domain,
      contactEmail: tenant.contactEmail,
      contactPhone: tenant.contactPhone,
      status: tenant.status,
      plan: tenant.plan,
      subscriptionType: tenant.subscriptionType,
      subscriptionStartDate: tenant.subscriptionStartDate?.split('T')[0],
      subscriptionEndDate: tenant.subscriptionEndDate?.split('T')[0],
      autoRenew: tenant.autoRenew,
      billingAddress: tenant.billingAddress,
      businessDetails: tenant.businessDetails || {},
      location: tenant.location || {}
    });
    setIsEditOpen(true);
     };

  const closeEdit = () => {
    setIsEditOpen(false);
    setActiveTenant(null);
    setEditError(null);
  };

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target;
  const checked = (e.target as HTMLInputElement).checked;

  setForm(prev => ({
    ...prev,
    [name]: type === "checkbox" ? checked : value
  }));
};


  const handleNestedChange = (section: keyof EditablePayload, field: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value
      }
    }));
  };

  const saveEdit = async () => {
  if (!activeTenant) return;
  setSaving(true);
  try {
    const token = localStorage.getItem("token");

    // sirf form bhejna hai
    const payload = form;

    const res = await axios.put(
      `http://localhost:5000/api/tenants/${activeTenant._id}`,
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const updated: Tenant = res.data?.data || res.data;
    setTenants((prev) =>
      prev.map((t) => (t._id === activeTenant._id ? { ...t, ...updated } : t))
    );

    setIsEditOpen(false);
    setActiveTenant(null);
  } catch (err: any) {
    console.error("Update failed:", err.response?.data);
    setEditError(err?.response?.data?.error || "Update failed.");
  } finally {
    setSaving(false);
  }
};


  if (loading) return <div>Loading tenants...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto">
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
              {/* Tenant Header */}
              <div
                className="p-4 flex justify-between items-center"
              >
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    setExpandedTenant(expandedTenant === tenant._id ? null : tenant._id)
                  }
                >
                  <h2 className="text-lg font-semibold text-indigo-700">{tenant.name}</h2>
                  <p className="text-xs text-gray-500">
                    {expandedTenant === tenant._id ? 'Hide Details' : 'Show Details'}
                  </p>
                </div>

                <button
                  onClick={() => openEdit(tenant)}
                  className="px-3 py-1.5 rounded-md text-sm bg-indigo-600 text-white hover:bg-indigo-700"
                >
                  Edit
                </button>
              </div>

              {/* Expanded Details */}
              {expandedTenant === tenant._id && (
                <div className="border-t px-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

                    {/* Owner Info Card */}
                    {tenant.owner && (
                      <div className="p-4 bg-gray-50 rounded-lg shadow">
                        <h3 className="font-semibold text-gray-800 mb-2">Owner Details</h3>
                        <p><strong>Name:</strong> {tenant.owner.name}</p>
                        <p><strong>Email:</strong> {tenant.owner.email}</p>
                        {tenant.owner.phone && <p><strong>Phone:</strong> {tenant.owner.phone}</p>}
                      </div>
                    )}

                    {/* Basic Info Card */}
                    <div className="p-4 bg-gray-50 rounded-lg shadow">
                      <h3 className="font-semibold text-gray-800 mb-2">Basic Info</h3>
                      <p><strong>Tenant ID:</strong> {tenant.tenantId}</p>
                      <p><strong>Domain:</strong> {tenant.domain}</p>
                      <p><strong>Email:</strong> {tenant.contactEmail}</p>
                      {tenant.contactPhone && <p><strong>Phone:</strong> {tenant.contactPhone}</p>}
                      <p><strong>Status:</strong> {tenant.status}</p>
                    </div>

                    {/* Subscription Card */}
                    <div className="p-4 bg-gray-50 rounded-lg shadow">
                      <h3 className="font-semibold text-gray-800 mb-2">Subscription</h3>
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

                    {/* Location + Billing */}
                    {(tenant.location || tenant.billingAddress) && (
                      <div className="p-4 bg-gray-50 rounded-lg shadow">
                        <h3 className="font-semibold text-gray-800 mb-2">Location</h3>
                        {tenant.location && (
                          <p>
                            {tenant.location.address}, {tenant.location.city}, {tenant.location.state},{' '}
                            {tenant.location.zipCode}, {tenant.location.country}
                          </p>
                        )}
                        {tenant.billingAddress && (
                          <>
                            <h3 className="pt-4 font-semibold text-gray-800 mb-2">Billing Address</h3>
                            <p>{tenant.billingAddress}</p>
                          </>
                        )}
                      </div>
                    )}

                    {/* Business Details Card */}
                    {tenant.businessDetails && (
                      <div className="p-4 bg-gray-50 rounded-lg shadow">
                        <h3 className="font-semibold text-gray-800 mb-2">Business Details</h3>
                        <p><strong>GST:</strong> {tenant.businessDetails.gstNumber || 'N/A'}</p>
                        <p><strong>Reg. No:</strong> {tenant.businessDetails.registrationNumber || 'N/A'}</p>
                        <p><strong>Type:</strong> {tenant.businessDetails.businessType || 'N/A'}</p>
                      </div>
                    )}

                    
                    {/* Staff Card (clickable) */}
                    <Link to="/staff" className="block">
                      <div className="p-4 bg-gray-50 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
                        <h3 className="font-semibold text-gray-800 mb-2">Staff</h3>
                        <p className="font-semibold text-blue-800 mb-2">Click to view staff details</p>
                      </div>
                    </Link>

                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Edit Modal */}
     {isEditOpen && activeTenant && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
    <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] flex flex-col">
      
      {/* Header */}
      <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
        <h2 className="text-lg font-semibold">Edit {activeTenant.name}</h2>
        <button
          onClick={closeEdit}
          className="text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
      </div>

      {/* Body (scrollable) */}
      <div className="overflow-y-auto p-6 space-y-6">
        {editError && <p className="text-red-500">{editError}</p>}

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Basic Info */}
          <input name="name" value={form.name || ''} onChange={handleChange} placeholder="Name" className="border p-2 rounded" />
          <input name="domain" value={form.domain || ''} onChange={handleChange} placeholder="Domain" className="border p-2 rounded" />
          <input name="contactEmail" value={form.contactEmail || ''} onChange={handleChange} placeholder="Email" className="border p-2 rounded" />
          <input name="contactPhone" value={form.contactPhone || ''} onChange={handleChange} placeholder="Phone" className="border p-2 rounded" />
          <input name="plan" value={form.plan || ''} onChange={handleChange} placeholder="Plan" className="border p-2 rounded" />
          
          {/* Status Dropdown */}
          <select name="status" value={form.status || 'active'} onChange={handleChange} className="border p-2 rounded">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="archived">Archived</option>
          </select>

          {/* Subscription */}
          <input name="subscriptionType" value={form.subscriptionType || ''} onChange={handleChange} placeholder="Subscription Type" className="border p-2 rounded" />
          <input type="date" name="subscriptionStartDate" value={form.subscriptionStartDate || ''} onChange={handleChange} className="border p-2 rounded" />
          <input type="date" name="subscriptionEndDate" value={form.subscriptionEndDate || ''} onChange={handleChange} className="border p-2 rounded" />

          {/* Auto Renew */}
          <label className="flex items-center gap-2 col-span-2">
            <input type="checkbox" name="autoRenew" checked={form.autoRenew || false} onChange={handleChange} />
            Auto Renew
          </label>

          <input name="billingAddress" value={form.billingAddress || ''} onChange={handleChange} placeholder="Billing Address" className="border p-2 rounded col-span-2" />
        </div>

        {/* Business Details Section */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Business Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input value={form.businessDetails?.gstNumber || ''} onChange={(e) => handleNestedChange('businessDetails', 'gstNumber', e.target.value)} placeholder="GST Number" className="border p-2 rounded" />
            <input value={form.businessDetails?.registrationNumber || ''} onChange={(e) => handleNestedChange('businessDetails', 'registrationNumber', e.target.value)} placeholder="Registration Number" className="border p-2 rounded" />
            <input value={form.businessDetails?.businessType || ''} onChange={(e) => handleNestedChange('businessDetails', 'businessType', e.target.value)} placeholder="Business Type" className="border p-2 rounded" />
          </div>
        </div>

        {/* Location Section */}
        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Location</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input value={form.location?.address || ''} onChange={(e) => handleNestedChange('location', 'address', e.target.value)} placeholder="Address" className="border p-2 rounded col-span-2" />
            <input value={form.location?.city || ''} onChange={(e) => handleNestedChange('location', 'city', e.target.value)} placeholder="City" className="border p-2 rounded" />
            <input value={form.location?.state || ''} onChange={(e) => handleNestedChange('location', 'state', e.target.value)} placeholder="State" className="border p-2 rounded" />
            <input value={form.location?.zipCode || ''} onChange={(e) => handleNestedChange('location', 'zipCode', e.target.value)} placeholder="Zip Code" className="border p-2 rounded" />
            <input value={form.location?.country || ''} onChange={(e) => handleNestedChange('location', 'country', e.target.value)} placeholder="Country" className="border p-2 rounded" />
          </div>
        </div>
      </div>

      {/* Footer (sticky) */}
      <div className="p-4 border-t flex justify-end gap-2 bg-white sticky bottom-0">
        <button onClick={closeEdit} className="px-4 py-2 border rounded">Cancel</button>
        <button onClick={saveEdit} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default ShowOwnerList;
