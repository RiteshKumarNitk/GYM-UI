import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputField from "../../../component/form/input/InputField";
import Label from "../../../component/form/Label";
import { toast } from 'react-toastify';

const roles = [
  { value: 'trainer', label: 'Trainer' },
  { value: 'member', label: 'Member' },
];

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}

const CreateTrainerMember = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'trainer',
    specialization: '',
  });

  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setUsers(res.data.users || []); // Update based on your backend response format
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload: any = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        role: formData.role,
      };

      if (formData.role === 'trainer') {
        payload.specialization = formData.specialization;
      }

      await axios.post('http://localhost:5000/api/users', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      toast.success('User created successfully!');
      setFormData({
        name: '',
        email: '',
        password: '',
        phone: '',
        role: 'trainer',
        specialization: '',
      });
      fetchUsers();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.msg || 'Error creating user');
    } finally {
      setLoading(false);
    }
  };

  const trainers = users.filter((user) => user.role === 'trainer');
  const members = users.filter((user) => user.role === 'member');

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Create Trainer / Member</h2>
        <button
          onClick={() => setShowForm((prev) => !prev)}
          className="bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center shadow"
          title={showForm ? "Close Form" : "Add New"}
        >
          {showForm ? "×" : "+"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <Label>Name</Label>
            <InputField
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>

          <div>
            <Label>Email</Label>
            <InputField
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
            />
          </div>

          <div>
            <Label>Password</Label>
            <InputField
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
            />
          </div>

          <div>
            <Label>Phone</Label>
            <InputField
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone"
            />
          </div>

          <div>
            <Label>Role</Label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </div>

          {formData.role === 'trainer' && (
            <div>
              <Label>Specialization</Label>
              <InputField
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Enter trainer specialization"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full mt-4"
          >
            {loading ? 'Creating...' : 'Create'}
          </button>
        </form>
      )}

      {/* Trainer & Member Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-3">👨‍🏫 Trainers</h3>
          {trainers.length === 0 ? (
            <p className="text-sm text-gray-600">No trainers found.</p>
          ) : (
            <ul className="space-y-2">
              {trainers.map((t) => (
                <li key={t._id} className="p-2 bg-white dark:bg-gray-700 rounded shadow-sm">
                  <p><strong>Name:</strong> {t.name}</p>
                  <p><strong>Email:</strong> {t.email}</p>
                  <p><strong>Phone:</strong> {t.phone}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow">
          <h3 className="text-lg font-bold mb-3">🧍 Members</h3>
          {members.length === 0 ? (
            <p className="text-sm text-gray-600">No members found.</p>
          ) : (
            <ul className="space-y-2">
              {members.map((m) => (
                <li key={m._id} className="p-2 bg-white dark:bg-gray-700 rounded shadow-sm">
                  <p><strong>Name:</strong> {m.name}</p>
                  <p><strong>Email:</strong> {m.email}</p>
                  <p><strong>Phone:</strong> {m.phone}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTrainerMember;
