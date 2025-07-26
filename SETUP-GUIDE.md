# Gym Management System - Setup Guide

This guide will help you set up and get started with the gym management system.

## 🚀 Quick Start

### 1. **Start the Backend**
```bash
cd GymMERNBackend
npm install
npm run dev
```
The backend will start on `http://localhost:5000`

### 2. **Start the Frontend**
```bash
cd GYM-UI
npm install
npm run dev
```
The frontend will start on `http://localhost:5173`

## 👤 **First Time Setup**

### Option 1: Create Super Admin (Recommended for First Time)
1. Go to `http://localhost:5173/register`
2. Select **"Super Admin"** registration type
3. Fill in your details:
   - Full Name: Your name
   - Email: Your email
   - Password: Choose a strong password
4. Click "Create Account"
5. You'll be redirected to login page
6. Login with your credentials

### Option 2: Create Gym Owner (For Gym Owners)
1. Go to `http://localhost:5173/register`
2. Select **"Gym Owner"** registration type
3. Fill in gym details:
   - Gym Name: Your gym name
   - Domain: Your gym domain (e.g., "fitlife-gym")
   - Contact Email: Gym contact email
4. Fill in owner details:
   - Full Name: Your name
   - Email: Your email
   - Password: Choose a strong password
5. Click "Create Account"
6. Login with your credentials

## 🔐 **User Roles & Permissions**

### Super Admin
- Can create and manage all gyms (tenants)
- Has access to system-wide settings
- Can create other super admins

### Gym Owner
- Can manage their own gym
- Can create managers, trainers, front desk staff, and members
- Has full access to gym operations

### Manager
- Can create trainers, front desk staff, and members
- Can manage gym operations
- Reports to owner

### Trainer
- Can view assigned members
- Can create workout plans
- Limited to member management

### Front Desk
- Can create and manage members
- Can handle check-ins
- Basic gym operations

### Member
- Can view their own profile
- Can view assigned workout plans
- Limited access

## 📋 **Getting Started Workflow**

### For Super Admin:
1. **Register** as Super Admin
2. **Login** to the system
3. **Create Gym Owners** (if needed)
4. **Monitor** all gyms in the system

### For Gym Owner:
1. **Register** as Gym Owner
2. **Login** to your gym dashboard
3. **Create Staff** (managers, trainers, front desk)
4. **Create Members** and assign trainers
5. **Manage** gym operations

### For Staff:
1. **Login** with credentials provided by owner/manager
2. **Access** role-specific features
3. **Manage** assigned responsibilities

## 🛠️ **Key Features**

### Dashboard
- Welcome message with user info
- Quick access to main features
- Role-based navigation

### User Management
- Create new users with specific roles
- View all users in your gym
- Role-based permissions

### Member Management
- View all gym members
- Member details and plans
- Trainer assignments

### Navigation
- Sidebar with role-based menu items
- User dropdown with profile info
- Logout functionality

## 🔧 **Troubleshooting**

### Common Issues:

1. **"Super Admin already exists"**
   - Only one super admin can exist
   - Use existing super admin credentials
   - Or reset the database

2. **"Email already exists"**
   - Use a different email address
   - Or login with existing account

3. **"Invalid credentials"**
   - Check email and password
   - Ensure account was created successfully

4. **CORS Errors**
   - Ensure backend is running on port 5000
   - Check backend CORS configuration

### Database Reset (if needed):
```bash
# In MongoDB
use gymowl
db.dropDatabase()
```

## 📱 **API Endpoints Used**

### Public Endpoints:
- `POST /api/setup/superadmin` - Create super admin
- `POST /api/tenants` - Create gym with owner
- `POST /api/auth/login` - User login

### Protected Endpoints:
- `GET /api/auth/me` - Get current user
- `GET /api/users` - Get users (role-based)
- `POST /api/users` - Create user (role-based)
- `GET /api/members` - Get members
- `POST /api/members` - Create member

## 🎯 **Next Steps**

After initial setup:
1. **Explore** the dashboard features
2. **Create** additional users as needed
3. **Add** members to your gym
4. **Customize** the system for your needs
5. **Integrate** additional features

## 📞 **Support**

If you encounter issues:
1. Check the browser console for errors
2. Verify backend is running and accessible
3. Check database connection
4. Review the README-INTEGRATION.md for detailed information

---

**Happy Gym Management! 🏋️‍♂️** 