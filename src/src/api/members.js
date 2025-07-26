// Get single member
export const getMember = async (id, token) => {
  const response = await fetch(`/api/members/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return await response.json();
};

// Update member
export const updateMember = async (id, data, token) => {
  const response = await fetch(`/api/members/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return await response.json();
};