import React, { useState } from "react";

// Type
interface WorkoutPlan {
  id: string;
  name: string;
  trainer: string;
  days: number;
  focus: string;
  status: "pending" | "approved" | "rejected";
  isDefault?: boolean;
}

const initialPlans: WorkoutPlan[] = [
  {
    id: "1",
    name: "Full Body Beginner",
    trainer: "Aarav Singh",
    days: 3,
    focus: "Strength",
    status: "approved",
    isDefault: true,
  },
  {
    id: "2",
    name: "Lean Cut",
    trainer: "Neha Verma",
    days: 4,
    focus: "Fat Loss",
    status: "pending",
  },
  {
    id: "3",
    name: "Push Pull Legs",
    trainer: "Rahul Mehta",
    days: 6,
    focus: "Hypertrophy",
    status: "approved",
  },
  {
    id: "4",
    name: "Mobility Reset",
    trainer: "Sara Khan",
    days: 2,
    focus: "Mobility",
    status: "rejected",
  },
];

export default function WorkoutPlansManager() {
  const [plans, setPlans] = useState(initialPlans);

  const approve = (id: string) => {
    setPlans(plans.map((p) => (p.id === id ? { ...p, status: "approved" } : p)));
  };

  const reject = (id: string) => {
    setPlans(
      plans.map((p) =>
        p.id === id ? { ...p, status: "rejected", isDefault: false } : p
      )
    );
  };

  const setDefault = (id: string) => {
    setPlans(plans.map((p) => ({ ...p, isDefault: p.id === id })));
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 p-6 md:p-12">
      <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 md:p-10 w-full">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Manage Workout Plans
        </h2>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-left">
                <th className="p-4">Plan</th>
                <th className="p-4">Trainer</th>
                <th className="p-4">Focus</th>
                <th className="p-4">Days</th>
                <th className="p-4">Status</th>
                <th className="p-4">Default</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => (
                <tr
                  key={plan.id}
                  className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="p-4 font-medium text-gray-900 dark:text-gray-100">
                    {plan.name}
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    {plan.trainer}
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    {plan.focus}
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    {plan.days}
                  </td>
                  <td className="p-4 capitalize">
                    {plan.status === "approved" && (
                      <span className="text-green-600 font-semibold">
                        Approved
                      </span>
                    )}
                    {plan.status === "pending" && (
                      <span className="text-yellow-600 font-semibold">
                        Pending
                      </span>
                    )}
                    {plan.status === "rejected" && (
                      <span className="text-red-600 font-semibold">
                        Rejected
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-gray-700 dark:text-gray-300">
                    {plan.isDefault ? "Yes" : "No"}
                  </td>
                  <td className="p-4 space-x-2">
                    {plan.status === "pending" && (
                      <>
                        <button
                          onClick={() => approve(plan.id)}
                          className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => reject(plan.id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {plan.status === "approved" && !plan.isDefault && (
                      <button
                        onClick={() => setDefault(plan.id)}
                        className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        Set Default
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
