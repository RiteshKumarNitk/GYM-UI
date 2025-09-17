import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";   
import axios from "axios";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  tenantId?: string;  
  branch?: { name: string };
}

export default function StaffPage() {
  const location = useLocation();
  const { tenantId } = location.state || {};  
  const [staffData, setStaffData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStaffData(res.data.data);
      } catch (err) {
        console.error("Error fetching staff:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStaff();
  }, []);

  if (loading) return <p>Loading staff...</p>;

  // 🔹 Filter only staff of this tenant
  const tenantUsers = staffData.filter((u) => u.tenantId === tenantId);

  const owner = tenantUsers.find((u) => u.role === "owner"); // ek hi owner hoga
  const members = tenantUsers.filter((u) => u.role === "member");
  const trainers = tenantUsers.filter((u) => u.role === "trainer");
  const frontdesk = tenantUsers.filter((u) => u.role === "frontdesk");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Staff Details</h1>

      {owner ? (
        <div className="bg-gray-100 shadow rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-2">
            Owner: {owner.name} ({owner.email})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{ title: "Members", list: members },
              { title: "Trainers", list: trainers },
              { title: "Front Desk", list: frontdesk }
            ].map((section) => (
              <div
                key={section.title}
                className="bg-white shadow rounded-lg p-4"
              >
                <h3 className="font-semibold text-lg mb-3">
                  {section.title}
                </h3>
                {section.list.length > 0 ? (
                  section.list.map((user) => (
                    <p key={user._id} className="border-b py-1">
                      {user.name} - {user.email}{" "}
                      {user.branch && ` (${user.branch.name})`}
                    </p>
                  ))
                ) : (
                  <p>No {section.title.toLowerCase()} found</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No owner found for this tenant.</p>
      )}
    </div>
  );
}
