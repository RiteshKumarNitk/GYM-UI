import React, { useState } from "react";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const times = [
  "06:00 AM",
  "07:00 AM",
  "08:00 AM",
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
];

export default function AvailabilityPage() {
  const [availability, setAvailability] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleSlot = (day: string, time: string) => {
    const key = `${day}-${time}`;
    setAvailability((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Set Availability Schedule</h1>
      <div className="overflow-x-auto">
        <table className="border-collapse border border-gray-300 w-full text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2 bg-gray-100">
                Time
              </th>
              {days.map((day) => (
                <th
                  key={day}
                  className="border border-gray-300 px-4 py-2 bg-gray-100"
                >
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {times.map((time) => (
              <tr key={time}>
                <td className="border border-gray-300 px-2 py-2 font-medium bg-gray-50">
                  {time}
                </td>
                {days.map((day) => {
                  const key = `${day}-${time}`;
                  return (
                    <td
                      key={key}
                      className={`border border-gray-300 px-2 py-2 text-center cursor-pointer ${
                        availability[key]
                          ? "bg-green-400 text-white"
                          : "bg-white hover:bg-gray-100"
                      }`}
                      onClick={() => toggleSlot(day, time)}
                    >
                      {availability[key] ? "✓" : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Selected Slots</h2>
        {Object.keys(availability).filter((key) => availability[key]).length >
        0 ? (
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            {Object.keys(availability)
              .filter((key) => availability[key])
              .map((slot) => {
                const [day, time] = slot.split("-");
                return (
                  <li key={slot}>
                    <span className="font-medium">{day}</span> — {time}
                  </li>
                );
              })}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No slots selected</p>
        )}
      </div>
    </div>
  );
}
