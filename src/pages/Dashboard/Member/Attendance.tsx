import React, { useEffect, useState } from "react";
import axios from "axios";

interface AttendanceEntry {
  date: string;
  status: "Present" | "Absent";
  checkInTime?: string;
  checkOutTime?: string;
  duration?: number;
}

const Attendance: React.FC = () => {
  const [attendance, setAttendance] = useState<AttendanceEntry[]>([]);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth()); // 0=Jan, 11=Dec
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const token = localStorage.getItem("token");

  // Fetch attendance history
  const fetchAttendance = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/attendance/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data: AttendanceEntry[] = res.data;

      // Sort descending
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setAttendance(data);

      // Local check-in
      const today = new Date().toISOString().split("T")[0];
      const storedCheckIn = localStorage.getItem(`checkInTime-${today}`);
      if (storedCheckIn) {
        setIsCheckedIn(true);
        setCheckInTime(storedCheckIn);
      } else {
        setIsCheckedIn(false);
        setCheckInTime("");
      }
    } catch (err) {
      console.error("Failed to fetch attendance:", err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Handle Check-In
  const handleCheckIn = () => {
    const now = new Date().toLocaleTimeString();
    setCheckInTime(now);
    setIsCheckedIn(true);

    const today = new Date().toISOString().split("T")[0];
    localStorage.setItem(`checkInTime-${today}`, now);
  };

  // Handle Check-Out
  const handleCheckOut = async () => {
    if (!checkInTime) return alert("Check-In time not found!");

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/attendance/checkout",
        { checkInTime },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("✅ Checked out successfully!");
      const today = new Date().toISOString().split("T")[0];
      localStorage.removeItem(`checkInTime-${today}`);

      setIsCheckedIn(false);
      setCheckInTime("");
      fetchAttendance();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Check-out failed");
    }
    setLoading(false);
  };

  const todayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ✅ Filtered attendance by selected month & year
  const filteredAttendance = attendance.filter((record) => {
    const recordDate = new Date(record.date);
    return (
      recordDate.getMonth() === selectedMonth &&
      recordDate.getFullYear() === selectedYear
    );
  });

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl p-6 shadow-lg mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
          "Consistency is the key to progress"
        </h1>
        <p className="text-center text-sm md:text-base opacity-90">
          Track your daily workouts and stay accountable
        </p>
        <p className="text-center mt-4 font-semibold">Today: {todayDate}</p>
      </div>

      {/* Action Card */}
      <div className="bg-white shadow-lg rounded-xl p-6 mb-6">
        <h2 className="text-xl font-bold mb-4 text-gray-700 text-center">
          Your Attendance
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
          {!isCheckedIn ? (
            <button
              onClick={handleCheckIn}
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition w-full md:w-auto"
            >
              {loading ? "Checking In..." : "Check In"}
            </button>
          ) : (
            <button
              onClick={handleCheckOut}
              disabled={loading}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition w-full md:w-auto"
            >
              {loading ? "Checking Out..." : "Check Out"}
            </button>
          )}

          <button
            onClick={() => setShowHistory(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition w-full md:w-auto"
          >
            📜 View History
          </button>
        </div>
      </div>

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-xl shadow-lg w-11/12 md:w-3/4 max-w-2xl max-h-[60vh] h-auto overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Attendance History</h3>
              <button
                onClick={() => setShowHistory(false)}
                className="text-red-600 font-semibold text-lg"
              >
                ✖ Close
              </button>
            </div>

            {/* ✅ Month-Year Filter */}
            <div className="mb-4 flex flex-wrap gap-2 items-center">
              <label className="font-semibold">Select Month:</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(Number(e.target.value))}
                className="border px-2 py-1 rounded"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {new Date(0, i).toLocaleString("en-US", { month: "long" })}
                  </option>
                ))}
              </select>

              <label className="font-semibold ml-4">Year:</label>
              <input
                type="number"
                value={selectedYear}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="border px-2 py-1 rounded w-24"
              />
            </div>

            {/* Table */}
            <table className="w-full border border-gray-300 rounded-lg text-center">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-3 border">Date</th>
                  <th className="py-2 px-3 border">Status</th>
                  <th className="py-2 px-3 border">Check-In</th>
                  <th className="py-2 px-3 border">Check-Out</th>
                  <th className="py-2 px-3 border">Duration (min)</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendance.length > 0 ? (
                  filteredAttendance.map((record, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition">
                      <td className="py-2 px-3 border">
                        {new Date(record.date).toLocaleDateString()}
                      </td>
                      <td
                        className={`py-2 px-3 border font-semibold ${
                          record.status === "Present"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {record.status}
                      </td>
                      <td className="py-2 px-3 border">
                        {record.checkInTime || "-"}
                      </td>
                      <td className="py-2 px-3 border">
                        {record.checkOutTime || "-"}
                      </td>
                      <td className="py-2 px-3 border">
                        {record.duration || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-4 text-gray-500 border">
                      No records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attendance;
