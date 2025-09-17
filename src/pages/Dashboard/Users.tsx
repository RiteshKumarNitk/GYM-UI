import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import PageMeta from "../../component/common/PageMeta";
import Label from "../../component/form/Label";
import Input from "../../component/form/input/InputField";
import Button from "../../component/ui/button/Button";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface CreateUserData {
  name: string;
  email: string;
  password: string;
  role: string;
}

const ROLES = {
  OWNER: "owner",
  MANAGER: "manager",
  TRAINER: "trainer",
  FRONTDESK: "frontdesk",
  MEMBER: "member",
};

export default function Users() {
  const { user: currentUser, token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createUserData, setCreateUserData] = useState<CreateUserData>({
    name: "",
    email: "",
    password: "",
    role: ROLES.MEMBER,
  });
  const [isCreating, setIsCreating] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string>("all");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.success && data.data) {
        setUsers(data.data);
      } else {
        setError(data.error || "Failed to fetch users");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (!createUserData.name || !createUserData.email || !createUserData.password) {
      setError("All fields are required");
      return;
    }
    try {
      setIsCreating(true);
      setError("");
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createUserData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.msg || "Failed to create user");
      }
      setCreateUserData({ name: "", email: "", password: "", role: ROLES.MEMBER });
      setShowCreateForm(false);
      fetchUsers();
    } catch (err: any) {
      setError(err.message || "Failed to create user");
    } finally {
      setIsCreating(false);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "owner":
        return "bg-purple-100 text-purple-800";
      case "manager":
        return "bg-blue-100 text-blue-800";
      case "trainer":
        return "bg-green-100 text-green-800";
      case "frontdesk":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredUsers = roleFilter === "all" ? users : users.filter((u) => u.role === roleFilter);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500"></div>
      </div>
    );
  }


  // Add these derived counts before the return
const totalAdmins = users.filter(
  (u) =>
    u.role === ROLES.OWNER
).length;

const totalMembers = users.filter((u) => u.role === ROLES.MEMBER).length;

// All users count
const totalUsers = users.length;

  return (
    <>
     <PageMeta title="Dashboard" description="Overview" />
<div className="space-y-6">
<div className="bg-white p-6 rounded-xl shadow">
<h1 className="text-2xl font-bold">Welcome back, Super Admin 2!</h1>
<p className="text-gray-500">You are logged in as: <span className="text-blue-600">superadmin</span></p>
<p className="text-gray-400">Tenant ID: root</p>
</div>


{/* Summary Cards showing gym users */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="bg-white p-6 rounded-xl shadow">
<p className="text-gray-500">Total Admins (Owner, Manager, Trainer, Front Desk)</p>
<h2 className="text-3xl font-bold">{totalAdmins}</h2>
</div>
<div className="bg-white p-6 rounded-xl shadow">
<p className="text-gray-500">Total Members</p>
<h2 className="text-3xl font-bold">{totalMembers}</h2>
</div>
<div className="bg-white p-6 rounded-xl shadow">
<p className="text-gray-500">Total Users</p>
<h2 className="text-3xl font-bold">{totalUsers}</h2>
</div>
</div>

        {/* User Management Section */}
        <div className="bg-white p-6 rounded-xl shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Users</h2>
            <div className="flex items-center gap-4">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value="all">All</option>
                <option value={ROLES.OWNER}>Owner</option>
                <option value={ROLES.MANAGER}>Manager</option>
                <option value={ROLES.TRAINER}>Trainer</option>
                <option value={ROLES.FRONTDESK}>Front Desk</option>
                <option value={ROLES.MEMBER}>Member</option>
              </select>
              <Button size="sm" onClick={() => setShowCreateForm(!showCreateForm)}>
                {showCreateForm ? "Cancel" : "Add User"}
              </Button>
            </div>
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          {showCreateForm && (
            <div className="p-4 mb-6 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Create New User</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input value={createUserData.name} onChange={(e) => setCreateUserData({ ...createUserData, name: e.target.value })} />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" value={createUserData.email} onChange={(e) => setCreateUserData({ ...createUserData, email: e.target.value })} />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input type="password" value={createUserData.password} onChange={(e) => setCreateUserData({ ...createUserData, password: e.target.value })} />
                </div>
                <div>
                  <Label>Role</Label>
                  <select value={createUserData.role} onChange={(e) => setCreateUserData({ ...createUserData, role: e.target.value })} className="border rounded px-2 py-2 text-sm">
                    <option value={ROLES.MEMBER}>Member</option>
                    <option value={ROLES.FRONTDESK}>Front Desk</option>
                    <option value={ROLES.TRAINER}>Trainer</option>
                    {currentUser?.role === "owner" && <option value={ROLES.MANAGER}>Manager</option>}
                  </select>
                </div>
              </div>
              <div className="mt-4 text-right">
                <Button size="sm" onClick={handleCreateUser} disabled={isCreating}>
                  {isCreating ? "Creating..." : "Create User"}
                </Button>
              </div>
            </div>
          )}

          {filteredUsers.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No users found.</p>
          ) : (
            <table className="w-full text-left border-t">
              <thead>
                <tr>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Role</th>
                  <th className="py-2">Created</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="py-2">{user.name}</td>
                    <td className="py-2">{user.email}</td>
                    <td className="py-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(user.role)}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
