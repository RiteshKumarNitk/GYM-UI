# Gym Management System - Frontend Integration

This document explains the authentication integration between the GYM-UI frontend and GymMERNBackend.

## 🚀 Features Implemented

### 1. **Authentication System**
- **Login/Logout**: Full JWT-based authentication
- **User Registration**: Public registration for super admin and gym owners
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Role-based Access**: Support for different user roles (superadmin, owner, manager, trainer, frontdesk, member)
- **Persistent Sessions**: Token stored in localStorage

### 2. **API Integration**
- **Centralized API Service**: All backend calls through `apiService`
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: Loading indicators for better UX

### 3. **User Interface**
- **Dynamic User Info**: User dropdown shows real user data
- **Welcome Dashboard**: Personalized welcome message with user details
- **Members Management**: Example page showing API data fetching

## 📁 File Structure

```
src/
├── context/
│   └── AuthContext.tsx          # Authentication state management
├── services/
│   └── api.ts                   # API service for backend communication
├── components/
│   └── ProtectedRoute.tsx       # Route protection component
├── component/
│   ├── auth/
│   │   └── SignInForm.tsx       # Updated login form
│   └── header/
│       └── UserDropdown.tsx     # Updated user dropdown
├── pages/
│   ├── Dashboard/
│   │   ├── Home.tsx            # Updated dashboard
│   │   ├── Members.tsx         # New members page
│   │   └── Users.tsx           # User management page
│   ├── AuthPages/
│   │   └── Register.tsx        # User registration page
│   └── OtherPage/
│       └── Unauthorized.tsx    # Access denied page
└── App.tsx                     # Updated with auth provider and routes
```

## 🔧 Setup Instructions

### 1. **Backend Setup**
Make sure your GymMERNBackend is running:
```bash
cd GymMERNBackend
npm install
npm run dev
```

### 2. **Frontend Setup**
```bash
cd GYM-UI
npm install
npm run dev
```

### 3. **Environment Configuration**
The frontend is configured to connect to `http://localhost:5000/api` by default. If your backend runs on a different port, update the `API_BASE_URL` in `src/services/api.ts`.

## 🔐 Authentication Flow

### Registration Process:
1. User visits `/register` page
2. Chooses registration type (Super Admin or Gym Owner)
3. Fills in required information
4. System creates account and redirects to login
5. User can then login with their credentials

### Login Process:
1. User enters email/password in SignInForm
2. Form validates input and calls `apiService.login()`
3. Backend validates credentials and returns JWT token
4. Token is stored in localStorage
5. User is redirected to dashboard
6. User data is fetched and stored in AuthContext

### Protected Routes:
1. All dashboard routes are wrapped in `ProtectedRoute`
2. Component checks for valid token and user data
3. Unauthenticated users are redirected to `/signin`
4. Loading spinner shown during authentication check

### Logout Process:
1. User clicks logout in UserDropdown
2. Token is removed from localStorage
3. User state is cleared
4. User is redirected to login page

## 👥 User Roles

The system supports the following roles from your backend:
- **superadmin**: System administrator
- **owner**: Gym owner
- **manager**: Gym manager
- **trainer**: Personal trainer
- **frontdesk**: Front desk staff
- **member**: Gym member

## 📊 API Endpoints Integrated

### Authentication:
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Registration:
- `POST /api/setup/superadmin` - Create super admin (public)
- `POST /api/tenants` - Create tenant with owner (public)

### Members:
- `GET /api/members` - Get all members
- `POST /api/members` - Create new member

### Users:
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user

### Trainers:
- `GET /api/trainers` - Get all trainers
- `POST /api/trainers` - Create new trainer

### Plans:
- `GET /api/plans` - Get all plans
- `POST /api/plans` - Create new plan

### Tenants:
- `GET /api/tenants` - Get all tenants
- `POST /api/tenants` - Create new tenant

## 🎯 Usage Examples

### 1. **Using Authentication in Components**
```tsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }
  
  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 2. **Making API Calls**
```tsx
import apiService from '../services/api';

async function fetchData() {
  try {
    const response = await apiService.getMembers();
    console.log(response.data);
  } catch (error) {
    console.error('API call failed:', error);
  }
}
```

### 3. **Protected Routes with Role-based Access**
```tsx
<ProtectedRoute allowedRoles={['owner', 'manager']}>
  <AdminOnlyComponent />
</ProtectedRoute>
```

## 🚨 Error Handling

The system includes comprehensive error handling:
- **Network Errors**: Displayed to user with retry options
- **Authentication Errors**: Automatic logout and redirect
- **API Errors**: User-friendly error messages
- **Validation Errors**: Form-level error display

## 🔄 State Management

Authentication state is managed through React Context:
- **User Data**: Current user information
- **Token**: JWT token for API calls
- **Loading States**: Authentication status
- **Error States**: Error messages and handling

## 🎨 UI Components

### Updated Components:
- **SignInForm**: Now handles real authentication with registration link
- **UserDropdown**: Shows real user data and logout
- **Home Dashboard**: Displays user information
- **Members Page**: Example of API data display
- **Users Page**: User management with role-based creation

### New Components:
- **Register Page**: Public registration for super admin and gym owners
- **ProtectedRoute**: Route protection wrapper
- **Unauthorized Page**: Access denied page
- **AuthContext**: Authentication state management



## 🔧 Customization

### Adding New API Endpoints:
1. Add method to `apiService` in `src/services/api.ts`
2. Use the method in your components
3. Handle responses and errors appropriately

### Adding Role-based Routes:
1. Wrap component with `ProtectedRoute`
2. Specify allowed roles: `<ProtectedRoute allowedRoles={['admin']}>`
3. Create appropriate error pages

### Styling:
All components use Tailwind CSS and follow the existing design system.

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure backend has CORS configured
2. **Token Expired**: System automatically handles token expiration
3. **API Connection**: Check if backend is running on correct port
4. **Role Access**: Verify user has correct role for protected routes

### Debug Mode:
Enable debug logging by checking browser console for detailed error messages.

## 📝 Next Steps

To extend the system:
1. Add more API endpoints to `apiService`
2. Create new protected pages
3. Implement role-based navigation
4. Add form validation and submission
5. Implement real-time updates
6. Add data caching and optimization

---

**Note**: This integration provides a solid foundation for a gym management system. The authentication is secure, the API integration is robust, and the UI is user-friendly. You can now build upon this to add more features specific to your gym management needs. 