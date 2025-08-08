import { useEffect, useState } from "react";
import axios from "axios";

type MemberType = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

const Member = () => {
  const [members, setMembers] = useState<MemberType[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found. User might not be authenticated.");
        return;
      }

      try {
        const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await axios.get(`${BASE_URL}/api/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Assigned Members
      </h1>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                Email
              </th>
              <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {members.length > 0 ? (
              members.map((member) => (
                <tr
                  key={member._id ?? `${member.name}-${Math.random()}`}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-3 capitalize">{member.name}</td>
                  <td className="px-4 py-3">{member.email}</td>
                  <td className="px-4 py-3 capitalize">{member.role}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="text-center px-4 py-6 text-gray-500 italic"
                >
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Member;
