// Get all tenants
export const getTenants = async (token) => {
  const response = await fetch('/api/tenants', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
};