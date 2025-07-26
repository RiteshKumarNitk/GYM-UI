import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from '../context/AuthProvider';

// Import all page components
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
// import CreateTenant from '../pages/CreateTenant';
// import CreateStaff from '../pages/CreateStaff';
// import CreateMember from '../pages/CreateMember';
// import Members from '../pages/Members';
import Unauthorized from '../pages/Unauthorized';
import Tenants from '../pages/Tenants';
import StaffList from '../pages/StaffList';
import StaffDetail from '../pages/StaffDetail';
import MemberDetail from '../pages/MemberDetail';

const AppRoutes = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Route */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
     
        {/* Super Admin Routes */}
            <Route path="/create-tenant" element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                {/* <CreateTenant /> */}
              </ProtectedRoute>
            } />
        {/* Super Admin Routes */}
        <Route path="/create-tenant" element={
          <ProtectedRoute allowedRoles={['superadmin']}>
            {/* <CreateTenant /> */}
          </ProtectedRoute>
        } />

        <Route path="/tenants" element={
          <ProtectedRoute allowedRoles={['superadmin']}>
            <Tenants />
          </ProtectedRoute>
        } />

        {/* Gym Owner Routes */}
        <Route path="/create-staff" element={
          <ProtectedRoute allowedRoles={['owner']}>
            {/* <CreateStaff /> */}
          </ProtectedRoute>
        } />

        <Route path="/staff" element={
          <ProtectedRoute allowedRoles={['owner']}>
            <StaffList />
          </ProtectedRoute>
        } />

        <Route path="/staff/:id" element={
          <ProtectedRoute allowedRoles={['owner']}>
            <StaffDetail />
          </ProtectedRoute>
        } />

        {/* Front Desk + Owner Routes */}
        <Route path="/create-member" element={
          <ProtectedRoute allowedRoles={['owner', 'frontdesk']}>
            {/* <CreateMember /> */}
          </ProtectedRoute>
        } />

        {/* 
        <Route path="/members" element={
          <ProtectedRoute allowedRoles={['owner', 'frontdesk']}>
            <Members />
          </ProtectedRoute>
        } /> 
        */}

        <Route path="/members/:id" element={
          <ProtectedRoute allowedRoles={['owner', 'frontdesk']}>
            <MemberDetail />
          </ProtectedRoute>
        } />

        {/* Common Authenticated Routes */}
        <Route path="/" element={
          <ProtectedRoute allowedRoles={['superadmin', 'owner', 'frontdesk']}>
            <Dashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
