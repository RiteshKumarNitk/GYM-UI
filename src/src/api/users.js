// Get all staff members
export const getStaff = async (token) => {
  const response = await fetch('/api/users?role=frontdesk', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
};

// Get single staff member
export const getStaffMember = async (id, token) => {
  const response = await fetch(`/api/users/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
};

// Update staff member
export const updateStaffMember = async (id, data, token) => {
  const response = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return await response.json();
};