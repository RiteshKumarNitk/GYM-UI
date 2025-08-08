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
      // Add more role-protected routes here...
    ],
  },

  { path: '/unauthorized', element: <Unauthorized /> },
  { path: '*', element: <NotFound /> },
];
