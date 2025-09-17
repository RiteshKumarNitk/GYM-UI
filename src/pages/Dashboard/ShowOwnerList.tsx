import React, { useEffect, useState } from "react";
import axios from "axios";

interface Owner {
  name?: string;
  email?: string;
  phone?: string;
}

interface User {
  _id: string;
  name?: string;
  email?: string;
  phone?: string;
  role: string;
  tenantId?: string;
  createdAt?: string;
  updatedAt?: string;
  owner?: Owner;
  [key: string]: any; // ✅ extra fields allow
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // ✅ Merge user + tenant + member + owner data
        const merged: User = {
          ...res.data,
          ...(res.data.tenant || {}),
          ...(res.data.member || {}),
          owner: res.data.tenant?.owner || undefined,
        };

        setUser(merged);
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
    "Owner Info": ["owner.name", "owner.email", "owner.phone"], // ✅ added
  };

  // ✅ Decide visible sections by role
  const getVisibleSections = (): string[] => {
    switch (user.role) {
      case "superadmin":
        return ["General Info"];
      case "owner":
        return ["General Info", "Business Info (Tenant)", "Owner Info"];
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

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">User Profile</h2>
      <p className="text-gray-500 mb-4">
        <span className="font-semibold">Role:</span> {user.role}
      </p>

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
                const value = getNestedValue(user, key);

                return (
                  <div
                    key={key}
                    className="bg-gray-50 p-2 rounded-md text-sm text-gray-800"
                  >
                    <span className="font-semibold capitalize">{key}: </span>
                    {show(value)}
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
