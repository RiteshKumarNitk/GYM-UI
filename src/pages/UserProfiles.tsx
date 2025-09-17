import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  role: string;
  tenantId?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any; // ✅ extra fields allow
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ Merge user + tenant + member data
        const merged: User = {
          ...res.data,
          ...(res.data.tenant || {}),
          ...(res.data.member || {}),
        };

        setUser(merged);
        setFormData(merged);
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>No user data</p>;

  const show = (val: any): string => {
    if (!val) return "NA";
    if (typeof val === "object") return JSON.stringify(val, null, 2);
    return String(val);
  };

  // ✅ fields grouping
  const sections: Record<string, string[]> = {
    "General Info": ["name", "email", "role", "tenantId", "createdAt"],
    "Contact Info": ["phone", "address", "gender", "dob"],
    "Business Info (Tenant)": [
      "domain",
      "status",
      "subscriptionType",
      "contactEmail",
      "contactPhone",
      "billingAddress",
      "businessDetails.gstNumber",
      "businessDetails.registrationNumber",
      "businessDetails.businessType",
      "location.address",
      "location.city",
      "location.state",
      "location.zipCode",
      "location.country",
    ],
    "Member Info": [
      "planType",
      "assignedTrainer",
      "joinDate",
      "membershipEndDate",
      "profileImage",
      "image",
    ],
    "Trainer Info": ["specialization", "branch"],
  };

  // ✅ Decide visible sections by role
  const getVisibleSections = (): string[] => {
    switch (user.role) {
      case "superadmin":
        return ["General Info"];
      case "owner":
        return ["General Info", "Business Info (Tenant)"];
      case "member":
        return ["General Info", "Contact Info", "Member Info"];
      case "trainer":
        return ["General Info", "Contact Info", "Trainer Info"];
      case "frontdesk":
      case "manager":
        return ["General Info", "Contact Info"];
      default:
        return ["General Info"];
    }
  };

  // ✅ helper for nested keys
  const getNestedValue = (obj: any, path: string): any => {
    return path.split(".").reduce((acc, part) => acc?.[part], obj);
  };

  // ✅ update formData (nested bhi)
  const handleChange = (path: string, value: any) => {
    setFormData((prev) => {
      const updated = { ...prev };
      const parts = path.split(".");
      let obj: any = updated;
      for (let i = 0; i < parts.length - 1; i++) {
        obj[parts[i]] = obj[parts[i]] || {};
        obj = obj[parts[i]];
      }
      obj[parts[parts.length - 1]] = value;
      return updated;
    });
  };

  // ✅ save update
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/auth/update/me", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(formData as User);
      setEditMode(false);
      alert("Profile updated successfully ✅");
    } catch (err) {
      console.error("Error updating profile", err);
      alert("Update failed ❌");
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">User Profile</h2>
      <p className="text-gray-500 mb-4">
        <span className="font-semibold">Role:</span> {user.role}
      </p>

      {/* ✅ Edit Button */}
      <div className="mb-4">
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Edit Profile
          </button>
        ) : (
          <div className="space-x-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-600 text-white rounded-md"
            >
              Save
            </button>
            <button
              onClick={() => {
                setFormData(user);
                setEditMode(false);
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded-md"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {getVisibleSections().map((section) => {
        const keys = sections[section];
        if (!keys) return null;

        return (
          <div key={section} className="mb-5">
            <h3 className="text-lg font-semibold mb-2 border-b pb-1 text-gray-700">
              {section}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {keys.map((key) => {
                const value = getNestedValue(editMode ? formData : user, key);

                return (
                  <div
                    key={key}
                    className="bg-gray-50 p-2 rounded-md text-sm text-gray-800"
                  >
                    <span className="font-semibold capitalize">{key}: </span>
                    {editMode ? (
                      <input
                        type="text"
                        className="ml-2 p-1 border rounded-md w-2/3"
                        value={value || ""}
                        onChange={(e) => handleChange(key, e.target.value)}
                      />
                    ) : (
                      show(value)
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserProfile;
