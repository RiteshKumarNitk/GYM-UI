import { useState } from "react";
import axios from "axios";

const TrainerCreate = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const token = localStorage.getItem("token");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.specialization) {
      return setMessage({ type: "error", text: "All fields are required." });
    }

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:5000/api/trainers",
        { ...form },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage({ type: "success", text: "Trainer created successfully!" });
      setForm({ name: "", email: "", password: "", specialization: "" });
    } catch (error: any) {
      const errMsg = error.response?.data?.error || "Something went wrong!";
      setMessage({ type: "error", text: errMsg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">
        Create Trainer
      </h2>

      {message && (
        <div
          className={`mb-4 text-sm font-medium ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-md shadow-sm focus:outline-none focus:ring-2 
                       focus:ring-blue-500 bg-white dark:bg-gray-700 
                       text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Email
          </label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            type="email"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-md shadow-sm focus:outline-none focus:ring-2 
                       focus:ring-blue-500 bg-white dark:bg-gray-700 
                       text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Password
          </label>
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            type="password"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-md shadow-sm focus:outline-none focus:ring-2 
                       focus:ring-blue-500 bg-white dark:bg-gray-700 
                       text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1">
            Specialization
          </label>
          <input
            name="specialization"
            value={form.specialization}
            onChange={handleChange}
            required
            type="text"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 
                       rounded-md shadow-sm focus:outline-none focus:ring-2 
                       focus:ring-blue-500 bg-white dark:bg-gray-700 
                       text-gray-900 dark:text-white"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 text-white font-semibold rounded-md shadow-sm 
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {loading ? "Creating..." : "Create Trainer"}
        </button>
      </form>
    </div>
  );
};

export default TrainerCreate;
