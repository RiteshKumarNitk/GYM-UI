import { useEffect, useState } from "react";
import axios from "axios";

interface MemberData {
  name: string;
  email: string;
  phone: string;
  planType: string;
  address: string;
  dob: string;
  gender: string;
  trainerId?: string;
  password: string; 
}

interface Trainer {
  _id: string;
  name: string;
  email: string;
}

const CreateMember = () => {
  const [member, setMember] = useState<MemberData>({
    name: "",
    email: "",
    phone: "",
    planType: "",
    address: "",
    dob: "",
    gender: "male",
    trainerId: "",
    password: "", // 🔹 init
  });

  const [image, setImage] = useState<File | null>(null);
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // 🔹 Fetch trainers on load
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const trainerList = res.data.data.filter((u: any) => u.role === "trainer");
        setTrainers(trainerList);
      } catch (err) {
        console.error("Error fetching trainers", err);
      }
    };
    fetchTrainers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("User is not authenticated.");
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(member).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });
      if (image) {
        formData.append("image", image);
      }

      await axios.post("http://localhost:5000/api/members", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("✅ Member created successfully!");
      setMember({
        name: "",
        email: "",
        phone: "",
        planType: "",
        address: "",
        dob: "",
        gender: "male",
        trainerId: "",
        password: "", // reset
      });
      setImage(null);
    } catch (err: any) {
      if (err.response?.status === 401) {
        setError("Unauthorized. Please log in again.");
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("An error occurred while creating the member.");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-10 mt-10">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
        🏋️ Create New Member
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 2 column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Name", name: "name", type: "text", required: true },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone", name: "phone", type: "text", required: true },
            { label: "Address", name: "address", type: "text" },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "Password", name: "password", type: "password", required: true }, // 🔹 added here
          ].map((field) => (
            <div key={field.name}>
              <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                value={(member as any)[field.name]}
                onChange={handleChange}
                required={field.required || false}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          ))}

          {/* Gender */}
          <div>
            <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Gender</label>
            <select
              name="gender"
              value={member.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Plan */}
          <div>
            <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Plan</label>
            <select
              name="planType"
              value={member.planType}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Select Plan</option>
              <option value="basic">1 Month (Basic)</option>
              <option value="premium">3 Months (Premium)</option>
              <option value="elite">6 Months (Elite)</option>
            </select>
          </div>

          {/* Trainer Selection */}
          <div>
            <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">Assign Trainer</label>
            <select
              name="trainerId"
              value={member.trainerId}
              onChange={handleChange}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">-- Select Trainer --</option>
              {trainers.map((trainer) => (
                <option key={trainer._id} value={trainer._id}>
                  {trainer.name} ({trainer.email})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
            Profile Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg shadow-md transition-transform duration-200 hover:scale-[1.02]"
        >
          🚀 Create Member
        </button>
      </form>

      {error && <p className="text-red-500 mt-6 text-center font-medium">{error}</p>}
      {success && <p className="text-green-500 mt-6 text-center font-medium">{success}</p>}
    </div>
  );
};

export default CreateMember;
