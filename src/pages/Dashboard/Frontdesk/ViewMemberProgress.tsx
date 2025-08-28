import React, { useState } from "react";

interface ProgressData {
  week: string;
  weight: number;
  height: number;
  bmi: number;
  bodyFat: number;
}

const ViewMemberProgress: React.FC = () => {
  // Sample members
  const members = ["Amit", "Rahul", "Sneha"];

  // Extended static data
  const progressByMember: Record<string, ProgressData[]> = {
    Amit: [
      { week: "Week 1", weight: 70, height: 175, bmi: 22.9, bodyFat: 18 },
      { week: "Week 2", weight: 69, height: 175, bmi: 22.5, bodyFat: 17.8 },
      { week: "Week 3", weight: 68.5, height: 175, bmi: 22.3, bodyFat: 17.5 },
      { week: "Week 4", weight: 68, height: 175, bmi: 22.1, bodyFat: 17.2 },
    ],
    Rahul: [
      { week: "Week 1", weight: 80, height: 180, bmi: 24.7, bodyFat: 20 },
      { week: "Week 2", weight: 79, height: 180, bmi: 24.4, bodyFat: 19.5 },
      { week: "Week 3", weight: 78.5, height: 180, bmi: 24.2, bodyFat: 19.2 },
      { week: "Week 4", weight: 78, height: 180, bmi: 24.0, bodyFat: 18.9 },
    ],
    Sneha: [
      { week: "Week 1", weight: 60, height: 165, bmi: 22.0, bodyFat: 21 },
      { week: "Week 2", weight: 59, height: 165, bmi: 21.7, bodyFat: 20.5 },
      { week: "Week 3", weight: 58.5, height: 165, bmi: 21.5, bodyFat: 20.2 },
      { week: "Week 4", weight: 58, height: 165, bmi: 21.3, bodyFat: 20.0 },
    ],
  };

  const [selectedMember, setSelectedMember] = useState<string>("Amit");

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-6 md:p-12">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 md:p-10 w-full">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Member Progress Reports
        </h1>

        {/* Select Member */}
        <div className="mb-6 flex items-center justify-center">
          <label className="font-medium text-gray-700 dark:text-gray-300 mr-3">
            Select Member:
          </label>
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            className=" border-black rounded"
          >
            {members.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Member Report */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
          Progress Report for {selectedMember}
        </h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                <th className="p-3 text-left">Week</th>
                <th className="p-3 text-left">Weight (kg)</th>
                <th className="p-3 text-left">Height (cm)</th>
                <th className="p-3 text-left">BMI</th>
                <th className="p-3 text-left">Body Fat %</th>
              </tr>
            </thead>
            <tbody>
              {progressByMember[selectedMember].map((data, idx) => (
                <tr
                  key={idx}
                  className={`${
                    idx % 2 === 0
                      ? "bg-white dark:bg-gray-800"
                      : "bg-gray-50 dark:bg-gray-700"
                  } hover:bg-gray-100 dark:hover:bg-gray-600`}
                >
                  <td className="p-3 text-gray-900 dark:text-gray-100">
                    {data.week}
                  </td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">
                    {data.weight}
                  </td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">
                    {data.height}
                  </td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">
                    {data.bmi}
                  </td>
                  <td className="p-3 text-gray-700 dark:text-gray-300">
                    {data.bodyFat}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewMemberProgress;
