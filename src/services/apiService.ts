// services/apiService.ts
const apiService = {
  login: async (email: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json(); // { user, token }
  },

  getMe: async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error('Failed to get user');
    return response.json(); // { user }
  },
};

export default apiService;
