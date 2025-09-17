import { useState } from "react";

interface Exercise {
  name: string;
  sets: number;
  reps: string; // e.g. "12-15"
}

interface DayPlan {
  day: string;
  type: string;
  exercises: Exercise[];
}

const weekPlan: DayPlan[] = [
  {
    day: "Monday",
    type: "Chest Day",
    exercises: [
      { name: "Bench Press", sets: 4, reps: "8-12" },
      { name: "Incline Dumbbell Press", sets: 3, reps: "10-12" },
      { name: "Chest Fly", sets: 3, reps: "12-15" },
    ],
  },
  {
    day: "Tuesday",
    type: "Back Day",
    exercises: [
      { name: "Pull-ups", sets: 4, reps: "8-10" },
      { name: "Deadlift", sets: 4, reps: "6-8" },
      { name: "Bent Over Row", sets: 3, reps: "10-12" },
    ],
  },
  {
    day: "Wednesday",
    type: "Leg Day",
    exercises: [
      { name: "Squats", sets: 4, reps: "8-12" },
      { name: "Lunges", sets: 3, reps: "12-15" },
      { name: "Leg Press", sets: 3, reps: "10-12" },
    ],
  },
  {
    day: "Thursday",
    type: "Shoulder Day",
    exercises: [
      { name: "Overhead Press", sets: 4, reps: "8-12" },
      { name: "Lateral Raises", sets: 3, reps: "12-15" },
      { name: "Front Raises", sets: 3, reps: "12-15" },
    ],
  },
  {
    day: "Friday",
    type: "Arm Day",
    exercises: [
      { name: "Bicep Curls", sets: 3, reps: "12-15" },
      { name: "Tricep Pushdown", sets: 3, reps: "12-15" },
      { name: "Hammer Curls", sets: 3, reps: "10-12" },
    ],
  },
  {
    day: "Saturday",
    type: "Full Body / Cardio",
    exercises: [
      { name: "Burpees", sets: 3, reps: "15-20" },
      { name: "Jumping Jacks", sets: 3, reps: "30 sec" },
      { name: "Mountain Climbers", sets: 3, reps: "30 sec" },
    ],
  },
  {
    day: "Sunday",
    type: "Rest / Recovery",
    exercises: [{ name: "Stretching & Mobility", sets: 1, reps: "30 min" }],
  },
];

function Exerciseplan() {
  const [selectedDay, setSelectedDay] = useState<string>("Monday");

  const dayDetails = weekPlan.find((d) => d.day === selectedDay);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Weekly Exercise Planner</h1>

      {/* Day Selector */}
      <div className="flex gap-2 justify-center mb-6 flex-wrap">
        {weekPlan.map((day) => (
          <button
            key={day.day}
            onClick={() => setSelectedDay(day.day)}
            className={`px-4 py-2 rounded font-semibold border transition-colors ${
              selectedDay === day.day
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {day.day}
          </button>
        ))}
      </div>

      {/* Selected Day Plan */}
      {dayDetails && (
        <div className="border rounded p-6 shadow-md bg-white">
          <h2 className="text-2xl font-bold mb-2">{dayDetails.day}</h2>
          <h3 className="text-xl text-gray-600 mb-4">{dayDetails.type}</h3>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-100">
                <th className="px-4 py-2">Exercise</th>
                <th className="px-4 py-2">Sets</th>
                <th className="px-4 py-2">Reps</th>
              </tr>
            </thead>
            <tbody>
              {dayDetails.exercises.map((ex, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{ex.name}</td>
                  <td className="px-4 py-2">{ex.sets}</td>
                  <td className="px-4 py-2">{ex.reps}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Exerciseplan;
