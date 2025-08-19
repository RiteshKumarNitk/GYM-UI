
import { useNavigate } from "react-router-dom";
import {
  Users,
  ClipboardCheck,
  Dumbbell,
  BarChart2,
  Upload,
  Calendar,
  Send,
  UserCog,
} from "lucide-react";

export default function TrainerDashboard() {
  const navigate = useNavigate();

  const features = [
    { title: "Create Frontdesk", icon: Users, path: "/AssignedMember" },
    { title: "Create Members", icon: ClipboardCheck, path: "/createmember" },
    { title: "Workout Plans", icon: Dumbbell, path: "/workout-plans" },
    { title: "Progress Reports", icon: BarChart2, path: "/progress-reports" },
    { title: "Upload Material", icon: Upload, path: "/upload-material" },
    { title: "Availability", icon: Calendar, path: "/availability" },
    { title: "Send Notifications", icon: Send, path: "/notifications" },
    { title: "Profile", icon: UserCog, path: "/profile" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navbar */}
      <div className="bg-white dark:bg-gray-800 shadow-md py-4 px-6 sticky top-0 z-30 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Owner Dashboard
        </h1>
      </div>

      {/* Feature Cards */}
      <div className="p-6 max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {features.map((feat, idx) => (
          <div
            key={idx}
            onClick={() => navigate(feat.path)}
            className="bg-white dark:bg-gray-800 rounded-2xl p-6 h-40 shadow hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between"
          >
            <feat.icon size={36} className="text-blue-500 self-end" />
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
              {feat.title}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
