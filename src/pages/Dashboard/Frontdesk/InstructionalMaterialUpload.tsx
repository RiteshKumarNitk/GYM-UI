import React, { useState } from "react";

interface Material {
  id: string;
  type: "pdf" | "image" | "video";
  name: string;
  member: string;
}

const initialMaterials: Material[] = [
  { id: "1", type: "pdf", name: "Diet Plan - Week 1", member: "Amit" },
  { id: "2", type: "image", name: "Squat Form Guide", member: "Rahul" },
  { id: "3", type: "video", name: "Yoga Flow Tutorial", member: "Sneha" },
];

export default function InstructionalMaterialUpload() {
  const [materials, setMaterials] = useState<Material[]>(initialMaterials);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState<"pdf" | "image" | "video">("pdf");
  const [member, setMember] = useState("");

  const uploadMaterial = () => {
    if (!fileName || !member) return;
    const newMaterial: Material = {
      id: Date.now().toString(),
      type: fileType,
      name: fileName,
      member,
    };
    setMaterials([...materials, newMaterial]);
    setFileName("");
    setMember("");
    setFileType("pdf");
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center py-10">
      <div className="w-full max-w-5xl bg-white dark:bg-gray-800 shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          Upload Instructional Material
        </h2>

        {/* Upload Form */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">File Name</label>
              <input
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="Enter file name"
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value as any)}
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="pdf">PDF Diet Plan</option>
                <option value="image">Exercise Image</option>
                <option value="video">Instructional Video</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Member</label>
              <input
                value={member}
                onChange={(e) => setMember(e.target.value)}
                placeholder="Enter member name"
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex justify-end mt-6">
            <button
              onClick={uploadMaterial}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Upload
            </button>
          </div>
        </div>

        {/* Uploaded List */}
        <h3 className="text-2xl font-semibold mb-4">Uploaded Materials</h3>
        <table className="w-full border-collapse bg-white dark:bg-gray-700 shadow rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-600 text-left">
              <th className="p-3">File Name</th>
              <th className="p-3">Type</th>
              <th className="p-3">Member</th>
            </tr>
          </thead>
          <tbody>
            {materials.length === 0 && (
              <tr>
                <td colSpan={3} className="p-4 text-gray-500 text-center">
                  No materials uploaded yet.
                </td>
              </tr>
            )}
            {materials.map((m) => (
              <tr key={m.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-3 font-medium">{m.name}</td>
                <td className="p-3 capitalize">{m.type}</td>
                <td className="p-3">{m.member}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
