import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

const CreateGymForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    domain: "",
    contactEmail: "",
    ownerName: "",
    ownerEmail: "",
    ownerPassword: "",
    contactPhone: "",
    subscriptionType: "monthly",
    autoRenew: true,
    billingAddress: "",
    location: { address: "", city: "", state: "", zipCode: "", country: "India" },
    businessDetails: { gstNumber: "", registrationNumber: "", businessType: "sole_proprietorship" },
    businessHours: daysOfWeek.map((day) => ({ day, open: "", close: "" })),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name.includes(".")) {
      const [section, key] = name.split(".");
      setFormData((prev: any) => ({
        ...prev,
        [section]: { ...prev[section], [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleBusinessHoursChange = (index: number, field: "open" | "close", value: string) => {
    const updatedHours = [...formData.businessHours];
    updatedHours[index][field] = value;
    setFormData((prev) => ({ ...prev, businessHours: updatedHours }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:5000/api/tenants", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Gym Created Successfully!");
      navigate("/home");
    } catch (error: any) {
      alert("Gym creation failed: " + (error.response?.data?.error || "Server error"));
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-600">Create New Gym</h2>
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Basic Info */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "name", placeholder: "Gym Name" },
              { name: "domain", placeholder: "Domain" },
              { name: "contactEmail", placeholder: "Contact Email" },
              { name: "ownerName", placeholder: "Owner Name" },
              { name: "ownerEmail", placeholder: "Owner Email" },
              { name: "ownerPassword", placeholder: "Owner Password", type: "password" },
              { name: "contactPhone", placeholder: "Contact Phone" },
              { name: "billingAddress", placeholder: "Billing Address" },
            ].map((field) => (
              <input
                key={field.name}
                name={field.name}
                type={field.type || "text"}
                placeholder={field.placeholder}
                value={(formData as any)[field.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-400"
                required
              />
            ))}
          </div>
        </div>

        {/* Subscription */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Subscription</h3>
          <div className="flex flex-col gap-3">
            <select
              name="subscriptionType"
              value={formData.subscriptionType}
              onChange={handleChange}
              className="border p-2 rounded-md"
            >
              <option value="trial">Trial</option>
              <option value="monthly">Monthly</option>
              <option value="biannual">Biannual</option>
              <option value="annual">Annual</option>
            </select>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="autoRenew"
                checked={formData.autoRenew}
                onChange={handleChange}
              />
              Auto Renew
            </label>
          </div>
        </div>

        {/* Location */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {["address", "city", "state", "zipCode", "country"].map((field) => (
              <input
                key={field}
                name={`location.${field}`}
                placeholder={field}
                value={(formData.location as any)[field]}
                onChange={handleChange}
                className="border p-2 rounded-md"
              />
            ))}
          </div>
        </div>

        {/* Business Details */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Business Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="businessDetails.gstNumber"
              placeholder="GST Number"
              value={formData.businessDetails.gstNumber}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
            <input
              type="text"
              name="businessDetails.registrationNumber"
              placeholder="Registration Number"
              value={formData.businessDetails.registrationNumber}
              onChange={handleChange}
              className="border p-2 rounded-md"
            />
            <select
              name="businessDetails.businessType"
              value={formData.businessDetails.businessType}
              onChange={handleChange}
              className="border p-2 rounded-md"
            >
              <option value="sole_proprietorship">Sole Proprietorship</option>
              <option value="partnership">Partnership</option>
              <option value="corporation">Corporation</option>
              <option value="llc">LLC</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Business Hours</h3>
          <div className="space-y-3">
            {formData.businessHours.map((hour, index) => (
              <div key={hour.day} className="flex items-center gap-4">
                <label className="w-24 capitalize">{hour.day}</label>
                <input
                  type="time"
                  value={hour.open}
                  onChange={(e) => handleBusinessHoursChange(index, "open", e.target.value)}
                  className="border p-2 rounded-md"
                  required
                />
                <span>to</span>
                <input
                  type="time"
                  value={hour.close}
                  onChange={(e) => handleBusinessHoursChange(index, "close", e.target.value)}
                  className="border p-2 rounded-md"
                  required
                />
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-all"
          >
            Create Gym
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateGymForm;
