import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import { ScrollToTop } from "./component/common/ScrollToTop";
import AppLayout from "./layout/AppLayout";

// pages...
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Register from "./pages/AuthPages/Register";
import NotFound from "./pages/OtherPage/NotFound";
import Unauthorized from "./pages/OtherPage/Unauthorized";
import Home from "./pages/Dashboard/Home";
import Members from "./pages/Dashboard/Members";
import Users from "./pages/Dashboard/Users";
import TrainerDashboard from "./pages/Dashboard/TrainerDashboard";
import StaffPage from "./pages/Dashboard/superadminFeature/StaffPage";
import UserProfiles from "./pages/UserProfiles";
import Calendar from "./pages/Calendar";
import Blank from "./pages/Blank";
import FormElements from "./pages/Forms/FormElements";
import BasicTables from "./pages/Tables/BasicTables";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import Images from "./pages/UiElements/Images";
import Videos from "./pages/UiElements/Videos";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import AssignedMember from "./pages/Dashboard/trainerFeature/AssignedMember";
import CreateMember from "./pages/Dashboard/Frontdesk/CreateMember";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import CreateGymForm from "./pages/Dashboard/CreateGymForm";
import ShowOwnerList from "./pages/Dashboard/ShowOwnerList";
import ActiveDeactive from "./pages/Dashboard/superadminFeature/ActiveDeactive";


export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Auth Routes */}
          <Route path="/" element={<SignIn />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Dashboard Routes */}
          <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
            <Route path="/home" element={<Home />} />
            <Route path="/members" element={<Members />} />
            <Route path="/users" element={<Users />} />
            <Route path="/trainerdashboard" element={<TrainerDashboard />} />
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/AssignedMember" element={<AssignedMember />} />
            <Route path="/CreateMember" element={<CreateMember />} />
            <Route path="/AdminDashboard" element={<AdminDashboard />} />
            <Route path="/CreateGymForm" element={<CreateGymForm />} />
            <Route path="/ShowOwnerList" element={<ShowOwnerList />} />
            <Route path="/activeDeactive" element={<ActiveDeactive />} />
            
            

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Error Routes */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
