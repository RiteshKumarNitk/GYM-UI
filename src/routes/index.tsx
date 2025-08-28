// src/routes/index.tsx
import SignIn from '../pages/AuthPages/SignIn';
import SignUp from '../pages/AuthPages/SignUp';
import Register from '../pages/AuthPages/Register';
import Home from '../pages/Dashboard/Home';
import Members from '../pages/Dashboard/Members';
import Users from '../pages/Dashboard/Users';
// import NotFound from '../pages/OtherPage/NotFound';
// import Unauthorized from '../pages/OtherPage/Unauthorized';
import ProtectedRoute from '../components/ProtectedRoute';
import AppLayout from '../layout/AppLayout';
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import CreateGymForm from '../pages/Dashboard/CreateGymForm';
import ShowOwnerList from '../pages/Dashboard/ShowOwnerList';
import ActiveDeactive from '../pages/Dashboard/superadminFeature/ActiveDeactive';
import StaffPage from '../pages/Dashboard/superadminFeature/StaffPage';

import TrainerDashboard from '../pages/Dashboard/TrainerDashboard';
import AssignedMember from '../pages/Dashboard/trainerFeature/AssignedMember';
import FrontdeskFeature from '../pages/Dashboard/FrontdeskFeature';
import CreateTrainer from '../pages/Dashboard/Frontdesk/CreateTrainer';
import CreateMember from '../pages/Dashboard/Frontdesk/CreateMember';
import UserProfiles from '../pages/UserProfiles';
import ShowList from '../pages/Dashboard/Frontdesk/ShowList';


export const routes = [
  { path: '/', element: <SignIn /> },
  { path: '/signin', element: <SignIn /> },
  { path: '/signup', element: <SignUp /> },
  { path: '/register', element: <Register /> },

  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/home',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', 'owner', 'frontdesk','trainer','member']}>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: '/members',
        element: (
          <ProtectedRoute allowedRoles={['superadmin','owner', 'frontdesk']}>
            <Members />
          </ProtectedRoute>
        ),
      },
      {
        path: '/users',
        element: (
          <ProtectedRoute allowedRoles={['superadmin','owner']}>
            <Users />
          </ProtectedRoute>
        ),
      },
      {
        path: '/AdminDashboard',
        element: (
          <ProtectedRoute allowedRoles={['superadmin']}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
  path: '/admin/CreateGymForm',
  element: (
    <ProtectedRoute allowedRoles={['superadmin']}>
      <CreateGymForm />
    </ProtectedRoute>
  ),
},

{
  path: '/admin/ShowOwnerList',
  element: (
    <ProtectedRoute allowedRoles={['superadmin']}>
      <ShowOwnerList />
    </ProtectedRoute>
  ),
},

{
  path: '/admin/activeDeactive',
  element: (
    <ProtectedRoute allowedRoles={['superadmin']}>
      <ActiveDeactive />
    </ProtectedRoute>
  ),
},

{
  path: '/staff',
  element: (
    <ProtectedRoute allowedRoles={['superadmin']}>
      <StaffPage />
    </ProtectedRoute>
  ),
},
      // Add more role-protected routes here...
      {
        path: '/trainerdashboard',
        element: (
          <ProtectedRoute allowedRoles={['owner']}>
            <TrainerDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/trainer/assignedmembers',
        element: (
          <ProtectedRoute allowedRoles={['owner']}>
            <AssignedMember />
          </ProtectedRoute>
        ),
      },
      {
        path: '/frontdeskFeature',
        element: (
          <ProtectedRoute allowedRoles={['owner','frontdesk']}>
            <FrontdeskFeature />
          </ProtectedRoute>
        ),
      },
      {
        path: '/createtrainer',
        element: (
          <ProtectedRoute allowedRoles={['owner','frontdesk']}>
            <CreateTrainer />
          </ProtectedRoute>
        ),
      },
      {
        path: '/createmember',
        element: (
          <ProtectedRoute allowedRoles={['owner','frontdesk']}>
            <CreateMember />
          </ProtectedRoute>
        ),
      },
      {
        path: '/trainer/profile',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', 'owner', 'frontdesk','trainer','member']}>
            <UserProfiles />
          </ProtectedRoute>
        ),
      },

      {
        path: '/trainer/showlist',
        element: (
          <ProtectedRoute allowedRoles={['superadmin', 'owner', 'frontdesk','trainer','member']}>
            <ShowList />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // { path: '/unauthorized', element: <Unauthorized /> },
  // { path: '*', element: <NotFound /> },
];
