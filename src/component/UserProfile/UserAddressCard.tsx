import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  role: string;
  gender?: string;
  address?: string;
  dob?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

const FIXED_FIELDS: { key: string; label: string }[] = [
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "role", label: "Role" },
  { key: "gender", label: "Gender" },
  { key: "address", label: "Address" },
  { key: "dob", label: "Date of Birth" },
  { key: "createdAt", label: "Created At" },
  { key: "updatedAt", label: "Updated At" },
];

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/auth/me", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(formData);
      setEditMode(false);
    } catch (err) {
      console.error("Error updating profile", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data</p>;

  // Helper
  const getFieldValue = (field: string) => {
    return user && user[field] ? user[field] : "NA";
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">User Profile</h2>

      {editMode ? (
        <div className="space-y-3">
          {FIXED_FIELDS.map(({ key, label }) => (
            <div key={key}>
              <label className="block font-medium">{label}</label>
              <input
                type="text"
                name={key}
                value={formData[key] || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>
          ))}
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {FIXED_FIELDS.map(({ key, label }) => (
            <p key={key}>
              <span className="font-semibold">{label}: </span>
              {getFieldValue(key)}
            </p>
          ))}

          <button
            onClick={() => setEditMode(true)}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
