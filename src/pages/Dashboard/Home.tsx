import EcommerceMetrics from "../../component/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../component/ecommerce/MonthlySalesChart";
import StatisticsChart from "../../component/ecommerce/StatisticsChart";
import MonthlyTarget from "../../component/ecommerce/MonthlyTarget";
import RecentOrders from "../../component/ecommerce/RecentOrders";
import DemographicCard from "../../component/ecommerce/DemographicCard";
import PageMeta from "../../component/common/PageMeta";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const { user } = useAuth();
  return (
    <>
      <PageMeta
        title="GYM DASHBOARD"
        description="GYM DASHBOARD"
      />
      
      {/* Welcome Message */}
      <div className="mb-6 p-6 bg-white rounded-lg shadow-sm dark:bg-gray-800">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Welcome back, {user?.name || 'User'}!
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          You are logged in as: <span className="font-semibold text-brand-500">{user?.role || 'Unknown Role'}</span>
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Tenant ID: {user?.tenantId || 'N/A'}
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />

          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div>
    </>
  );
}
