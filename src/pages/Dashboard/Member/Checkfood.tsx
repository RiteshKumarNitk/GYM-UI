import { useState } from "react";
import axios from "axios";

function FoodApi() {
  const [food, setFood] = useState("");
  const [data, setData] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/food?food=${food}`);
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
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

      {data && (
        <div className="border rounded p-4 shadow">
          <h2 className="text-xl font-semibold">{data.food}</h2>
          <p><b>Calories:</b> {data.calories}</p>
          <p><b>Protein:</b> {data.protein_g} g</p>
          <p><b>Fat:</b> {data.fat_total_g} g</p>
          <p><b>Carbs:</b> {data.carbohydrates_total_g} g</p>
          <p><b>Gym Friendly:</b> {data.suitable_for_gym_lover ? "Yes" : "No"}</p>
          <p><b>Reason:</b> {data.reason}</p>
          <h3 className="mt-2 font-semibold">Ingredients:</h3>
          <ul className="list-disc list-inside">
            {data.ingredients.map((ing: string, i: number) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default FoodApi;