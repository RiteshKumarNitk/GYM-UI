import React, { useEffect, useState } from "react";
import axios from "axios";

const Member = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users");
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
            {members.map((member) => (
              <tr
                key={member._id}
                className="border-t border-gray-200 hover:bg-gray-50"
              >
                <td className="px-4 py-3 capitalize">{member.name}</td>
                <td className="px-4 py-3">{member.email}</td>
                <td className="px-4 py-3 capitalize">{member.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Member;
