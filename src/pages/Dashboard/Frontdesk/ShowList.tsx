import React, { useEffect, useState } from "react";
import axios from "axios";

interface Trainer {
  _id: string;
  name: string;
  email: string;
  role: string;
  tenantId: string;
}

interface Member {
  _id: string;
  name: string;
  email: string;
  phone: string;
  tenantId: string;
  assignedTrainer?: Trainer;
}

const FrontdeskDashboard: React.FC = () => {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  // ✅ fetch trainers
  const fetchTrainers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const trainerList = res.data.data.filter(
        (u: Trainer) => u.role === "trainer"
      );
      setTrainers(trainerList);
    } catch (err) {
      console.error("Error fetching trainers:", err);
    }
  };

  // ✅ fetch members
  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/members", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembers(res.data.data);
    } catch (err) {
      console.error("Error fetching members:", err);
    }
  };

  useEffect(() => {
    fetchTrainers();
    fetchMembers();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Trainers Box */}
      <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
        <h2 className="text-xl font-bold text-blue-700 mb-4">
          👨‍🏫 Trainers List
        </h2>
        {trainers.length > 0 ? (
          <table className="w-full border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-blue-100 text-left">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((t) => (
                <tr key={t._id} className="hover:bg-blue-50">
                  <td className="border p-2">{t.name}</td>
                  <td className="border p-2">{t.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No trainers found for this tenant.</p>
        )}
      </div>

      {/* Members Box */}
      <div className="bg-white shadow-md rounded-2xl p-5 border border-gray-200">
        <h2 className="text-xl font-bold text-green-700 mb-4">
          🧑‍🤝‍🧑 Members List
        </h2>
        {members.length > 0 ? (
          <table className="w-full border rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-green-100 text-left">
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Phone</th>
                <th className="border p-2">Assigned Trainer</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m._id} className="hover:bg-green-50">
                  <td className="border p-2">{m.name}</td>
                  <td className="border p-2">{m.email}</td>
                  <td className="border p-2">{m.phone}</td>
                  <td className="border p-2">
                    {m.assignedTrainer?.name || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No members found for this tenant.</p>
        )}
      </div>
    </div>
  );
};

export default FrontdeskDashboard;
