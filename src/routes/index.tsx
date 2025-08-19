// src/routes/index.tsx
import SignIn from '../pages/AuthPages/SignIn';
import SignUp from '../pages/AuthPages/SignUp';
import Register from '../pages/AuthPages/Register';
import Home from '../pages/Dashboard/Home';
import Members from '../pages/Dashboard/Members';
import Users from '../pages/Dashboard/Users';
import NotFound from '../pages/OtherPage/NotFound';
import Unauthorized from '../pages/OtherPage/Unauthorized';

import ProtectedRoute from '../components/ProtectedRoute';
import AppLayout from '../layout/AppLayout';
import TrainerDashboard from '../pages/Dashboard/TrainerDashboard';
import AssignedMember from '../pages/Dashboard/trainerFeature/AssignedMember';
import FrontdeskFeature from '../pages/Dashboard/FrontdeskFeature';
import CreateTrainer from '../pages/Dashboard/Frontdesk/CreateTrainer';
import CreateMember from '../pages/Dashboard/Frontdesk/CreateMember';
import UserProfiles from '../pages/UserProfiles';


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
          <ProtectedRoute allowedRoles={['owner', 'frontdesk']}>
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
          <ProtectedRoute allowedRoles={['owner','frontdesk']}>
            <UserProfiles />
          </ProtectedRoute>
        ),
      },
    ],
  },

  { path: '/unauthorized', element: <Unauthorized /> },
  { path: '*', element: <NotFound /> },
];
