import React, { useState } from "react";
import axios from "axios";

const BMIcal: React.FC = () => {
  const [memberId, setMemberId] = useState("");
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);

    if (!memberId || !weight || !height) {
      setError("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:5000/api/bmi/${memberId}`,
        { weight, height }
      );
      setResult(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Server error");
    }
  };

  // BMI category logic (frontend check)
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 24.9) return "Normal weight";
    if (bmi >= 25 && bmi < 29.9) return "Overweight";
    return "Obese";
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        BMI Calculator
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Member ID"
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          className="w-full border rounded-md p-2"
          required
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
          className="w-full border rounded-md p-2"
          required
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
          className="w-full border rounded-md p-2"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Calculate BMI
        </button>
      </form>

      {error && (
        <div className="mt-4 text-red-600 font-semibold text-center">{error}</div>
      )}

      {result && (
        <div className="mt-6 p-4 border rounded-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-2">Result</h3>
          <p><strong>Name:</strong> {result.member?.name}</p>
          <p><strong>Weight:</strong> {result.member?.weight} kg</p>
          <p><strong>Height:</strong> {result.member?.height} cm</p>
          <p><strong>BMI:</strong> {result.member?.bmi}</p>
          <p>
            <strong>Category:</strong>{" "}
            {result.member?.bmi ? getBMICategory(result.member?.bmi) : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default BMIcal;
