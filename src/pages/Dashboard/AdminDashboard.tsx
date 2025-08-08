
import {
  FaUserPlus, FaUsers, FaIdBadge, FaMoneyBill,
 FaBuilding, 
  FaBan, FaChartPie, FaFileUpload
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const adminFeatures = [
  { title: "Create Gym", icon: <FaUserPlus />, key: "CreateGymForm" },
  { title: "show owners", icon: <FaUsers />, key: "ShowOwnerList" },
  { title: "Manage Membership Plans", icon: <FaIdBadge />, key: "membershipPlans" },
  { title: "Handle Payments & Billing", icon: <FaMoneyBill />, key: "payments" },
 
  { title: "Manage Gym Profile", icon: <FaBuilding />, key: "gymProfile" },
 
  { title: "Activate/Deactivate Users", icon: <FaBan />, key: "activeDeactive" },
  { title: "Dashboard Analytics", icon: <FaChartPie />, key: "analytics" },
  { title: "Upload Gym Resources", icon: <FaFileUpload />, key: "resources" },
];


const AdminDashboard = () => {

  const navigate = useNavigate();
  return (
    <div className="flex">
      
      

      {/* Main Dashboard */}
      <div className="ml-0 flex-1 min-h-screen bg-gray-50 p-8">
        {/* Top Navbar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Dashboard</h1>
          <div className="text-sm text-gray-600">Welcome, Admin</div>
        </div>

        {/* Grid Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-50px">
          {adminFeatures.map((feature, index) => (
            <div
              key={index}
              onClick={() => navigate(`/admin/${feature.key}`)}
              className="bg-white rounded-2xl shadow hover:shadow-md transition p-6 flex flex-col items-center justify-center text-center"
            >
              <div className="text-4xl text-blue-500 mb-4">{feature.icon}</div>
              <h3 className="text-md font-semibold text-gray-700">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
