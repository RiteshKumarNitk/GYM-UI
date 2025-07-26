// api/auth.js
export const login = async (credentials) => {
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  return await response.json();
};

// api/tenants.js
export const createTenant = async (tenantData, token) => {
  const response = await fetch("/api/tenants", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(tenantData),
  });
  return await response.json();
};

// api/users.js
export const createUser = async (userData, token) => {
  const response = await fetch("/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(userData),
  });
  return await response.json();
};

// api/members.js
export const createMember = async (memberData, token) => {
  const response = await fetch("/api/members", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(memberData),
  });
  return await response.json();
};

export const getMembers = async (token) => {
  const response = await fetch("/api/members", {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return await response.json();
};