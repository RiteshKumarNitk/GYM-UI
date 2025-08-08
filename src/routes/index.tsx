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
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import CreateGymForm from '../pages/Dashboard/CreateGymForm';
import ShowOwnerList from '../pages/Dashboard/ShowOwnerList';
import ActiveDeactive from '../pages/Dashboard/superadminFeature/ActiveDeactive'


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
          <ProtectedRoute allowedRoles={['superadmin', 'owner', 'frontdesk']}>
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
          <ProtectedRoute allowedRoles={['superadmin']}>
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
}
      // Add more role-protected routes here...
    ],
  },

  { path: '/unauthorized', element: <Unauthorized /> },
  { path: '*', element: <NotFound /> },
];
