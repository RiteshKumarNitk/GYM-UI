import { useEffect, useState } from "react";
import axios from "axios";

interface Member {
  _id: string;
  name: string;
  email?: string;
  phone: string;
  planType: string;
  assignedTrainer?: { name: string; email: string };
  joinDate: string;
}

export default function MemberList() {
  const [members, setMembers] = useState<Member[]>([]);
  const [images, setImages] = useState<{ [key: string]: string }>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // ✅ new state

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/members", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setMembers(res.data.data);

        // Fetch images for each member
        res.data.data.forEach(async (m: Member) => {
          try {
            const imgRes = await axios.get(
              `http://localhost:5000/api/members/${m._id}/image`,
              {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
                responseType: "blob",
              }
            );
            const imgUrl = URL.createObjectURL(imgRes.data);
            setImages((prev) => ({ ...prev, [m._id]: imgUrl }));
          } catch (err) {
            console.error(`No image for ${m.name}`);
          }
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Members</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {members.map((m) => (
          <div
            key={m._id}
            className="flex items-center justify-between border rounded-xl p-4 shadow-md bg-white"
          >
            {/* Left side - Member Details */}
            <div className="flex-1 pr-4">
              <h3 className="text-lg font-semibold">{m.name}</h3>
              <p className="text-sm text-gray-600">Plan: {m.planType}</p>
              <p className="text-sm text-gray-600">Phone: {m.phone}</p>
              {m.assignedTrainer && (
                <p className="text-sm text-gray-600">
                  Trainer: {m.assignedTrainer.name}
                </p>
              )}
              <p className="text-sm text-gray-500">
                Joined: {new Date(m.joinDate).toLocaleDateString()}
              </p>
            </div>

            {/* Right side - Image */}
            {images[m._id] ? (
              <img
                src={images[m._id]}
                alt={m.name}
                className="w-24 h-24 object-cover rounded-lg shadow cursor-pointer hover:opacity-80"
                onClick={() => setSelectedImage(images[m._id])} // ✅ open modal
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ✅ Modal (Lightbox) */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)} // click outside → close
        >
          <img
            src={selectedImage}
            alt="Enlarged"
            className="max-w-[50%] max-h-[50%] rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
          />
        </div>
      )}
    </div>
  );
}
