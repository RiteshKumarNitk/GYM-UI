// src/pages/AuthPages/CreateFrontdesk.tsx

import { useState } from "react";
import axios from "axios";

const AssignedMember = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "frontdesk",
    branch: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:5000/api/users",
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("Frontdesk created successfully!");
      console.log(response.data);
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      setMessage(
        err.response?.data?.msg ||
        err.response?.data?.error ||
        "Failed to create frontdesk"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-semibold mb-4">Create Frontdesk</h2>
      {message && (
        <p className={`mb-4 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          name="branch"
          placeholder="Branch ID"
          value={form.branch}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Frontdesk
        </button>
      </form>
    </div>
  );
};

export default AssignedMember;
