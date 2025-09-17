import { useState } from "react";
import axios from "axios";

interface FoodData {
  food: string;
  ingredients: string[];
  calories: number;
  protein_g: number;
  fat_total_g: number;
  carbohydrates_total_g: number;
  suitable_for_gym_lover: boolean;
  reason: string;
  searchedAt: string;
}

function Checkfood() {
  const [food, setFood] = useState("");
  const [data, setData] = useState<FoodData | null>(null);
  const [history, setHistory] = useState<FoodData[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null); // Track expanded item

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/food/history", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Remove duplicates based on food name (latest first)
      const uniqueHistory: FoodData[] = [];
      const map = new Map<string, FoodData>();
      res.data.forEach((item: FoodData) => {
        map.set(item.food.toLowerCase(), item); // overwrite duplicates
      });
      map.forEach((v) => uniqueHistory.push(v));

      // Sort by searchedAt descending
      uniqueHistory.sort((a, b) => new Date(b.searchedAt).getTime() - new Date(a.searchedAt).getTime());
      setHistory(uniqueHistory);
    } catch (err) {
      console.error("Error fetching history", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return console.warn("No token found in localStorage");

      const res = await axios.get(`http://localhost:5000/api/food?food=${food}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleHistory = async () => {
    if (!showHistory) await fetchHistory(); // fetch only when opening
    setShowHistory(!showHistory);
  };

  const toggleExpand = (foodName: string) => {
    setExpanded(expanded === foodName ? null : foodName);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto flex gap-6">
      {/* Left Side - Search Results */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">🍎 Nutrition Finder</h1>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Enter food (e.g. egg, banana)"
            value={food}
            onChange={(e) => setFood(e.target.value)}
            className="border p-2 flex-grow rounded"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Search
          </button>
        </form>

        {/* Nutrition Result in Table */}
        {data && (
          <div className="border rounded p-4 shadow mb-6 overflow-x-auto">
            <h2 className="text-xl font-semibold mb-2">{data.food}</h2>
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <tbody>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Calories</td>
                  <td className="px-4 py-2">{data.calories}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Protein (g)</td>
                  <td className="px-4 py-2">{data.protein_g}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Fat (g)</td>
                  <td className="px-4 py-2">{data.fat_total_g}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Carbs (g)</td>
                  <td className="px-4 py-2">{data.carbohydrates_total_g}</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 font-semibold">Gym Friendly</td>
                  <td className="px-4 py-2">{data.suitable_for_gym_lover ? "Yes" : "No"}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Reason</td>
                  <td className="px-4 py-2">{data.reason}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 font-semibold">Ingredients</td>
                  <td className="px-4 py-2">{data.ingredients.join(", ")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Right Side - History */}
      <div className="w-80">
        <button
          onClick={handleToggleHistory}
          className="bg-gray-700 text-white px-4 py-2 rounded w-full mb-4"
        >
          {showHistory ? "Hide History" : "Show History"}
        </button>

        {showHistory && (
          <div className="border rounded p-4 shadow max-h-[600px] overflow-y-auto">
            <h2 className="text-xl font-bold mb-2">Search History</h2>
            {history.length === 0 ? (
              <p className="text-gray-500">No history found.</p>
            ) : (
              <ul className="divide-y divide-gray-300">
                {history.map((h, i) => (
                  <li key={i} className="py-2 cursor-pointer" onClick={() => toggleExpand(h.food)}>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{h.food}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(h.searchedAt).toLocaleString()}
                      </span>
                    </div>

                    {expanded === h.food && (
                      <div className="mt-2 bg-gray-50 p-2 rounded shadow-inner">
                        <p><b>Calories:</b> {h.calories}</p>
                        <p><b>Protein:</b> {h.protein_g} g</p>
                        <p><b>Fat:</b> {h.fat_total_g} g</p>
                        <p><b>Carbs:</b> {h.carbohydrates_total_g} g</p>
                        <p><b>Gym Friendly:</b> {h.suitable_for_gym_lover ? "Yes" : "No"}</p>
                        <p><b>Reason:</b> {h.reason}</p>
                        <p><b>Ingredients:</b> {h.ingredients.join(", ")}</p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkfood;
