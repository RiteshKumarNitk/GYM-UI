import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const daysOfWeek = [
  "monday",

];

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
    location: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "India",
    },
    businessDetails: {
      gstNumber: "",
      registrationNumber: "",
      businessType: "sole_proprietorship",
    },
    businessHours: daysOfWeek.map((day) => ({
      day,
      open: "",
      close: "",
    })),
  });

  const handleChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const { name, value, type } = e.target;

  if (type === "checkbox") {
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }));
  } else if (name.includes(".")) {
    const [section, key] = name.split(".");
    setFormData((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

  const handleBusinessHoursChange = (
    index: number,
    field: "open" | "close",
    value: string
  ) => {
    const updatedHours = [...formData.businessHours];
    updatedHours[index][field] = value;
    setFormData((prev) => ({
      ...prev,
      businessHours: updatedHours,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post("http://localhost:5000/api/tenants", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Gym Created Successfully!");
      navigate("/home");
    } catch (error: any) {
      console.error(error.response?.data || error.message);
      alert("Gym creation failed: " + (error.response?.data?.error || "Server error"));
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6 text-center">Create Gym</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Basic Info */}
        {[
          { name: "name", type: "text", placeholder: "Gym Name" },
          { name: "domain", type: "text", placeholder: "Domain" },
          { name: "contactEmail", type: "email", placeholder: "Contact Email" },
          { name: "ownerName", type: "text", placeholder: "Owner Name" },
          { name: "ownerEmail", type: "email", placeholder: "Owner Email" },
          { name: "ownerPassword", type: "password", placeholder: "Owner Password" },
          { name: "contactPhone", type: "text", placeholder: "Contact Phone" },
          { name: "billingAddress", type: "text", placeholder: "Billing Address" },
        ].map((field) => (
          <input
            key={field.name}
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={(formData as any)[field.name]}
            onChange={handleChange}
            required
            className="w-full border p-2"
          />
        ))}

        {/* Subscription */}
        <select
          name="subscriptionType"
          value={formData.subscriptionType}
          onChange={handleChange}
          className="w-full border p-2"
        >
          <option value="trial">Trial</option>
          <option value="monthly">Monthly</option>
          <option value="biannual">Biannual</option>
          <option value="annual">Annual</option>
        </select>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="autoRenew"
            checked={formData.autoRenew}
            onChange={handleChange}
          />
          <span>Auto Renew</span>
        </label>

        {/* Location */}
        <h3 className="text-lg font-semibold mt-4">Location</h3>
        {["address", "city", "state", "zipCode", "country"].map((field) => (
          <input
            key={field}
            name={`location.${field}`}
            placeholder={field}
            value={(formData.location as any)[field]}
            onChange={handleChange}
            className="w-full border p-2"
          />
        ))}

        {/* Business Details */}
        <h3 className="text-lg font-semibold mt-4">Business Details</h3>
        <input
          type="text"
          name="businessDetails.gstNumber"
          placeholder="GST Number"
          value={formData.businessDetails.gstNumber}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <input
          type="text"
          name="businessDetails.registrationNumber"
          placeholder="Registration Number"
          value={formData.businessDetails.registrationNumber}
          onChange={handleChange}
          className="w-full border p-2"
        />
        <select
          name="businessDetails.businessType"
          value={formData.businessDetails.businessType}
          onChange={handleChange}
          className="w-full border p-2"
        >
          <option value="sole_proprietorship">Sole Proprietorship</option>
          <option value="partnership">Partnership</option>
          <option value="corporation">Corporation</option>
          <option value="llc">LLC</option>
          <option value="other">Other</option>
        </select>

        {/* Business Hours */}
        <h3 className="text-lg font-semibold mt-4">Business Hours</h3>
        {formData.businessHours.map((hour, index) => (
          <div key={hour.day} className="flex items-center gap-2">
            <label className="w-24 capitalize">{hour.day}</label>
            <input
              type="time"
              value={hour.open}
              onChange={(e) => handleBusinessHoursChange(index, "open", e.target.value)}
              className="border p-1"
              required
            />
            <span>to</span>
            <input
              type="time"
              value={hour.close}
              onChange={(e) => handleBusinessHoursChange(index, "close", e.target.value)}
              className="border p-1"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Create Gym
        </button>
      </form>
    </div>
  );
};

export default CreateGymForm;
