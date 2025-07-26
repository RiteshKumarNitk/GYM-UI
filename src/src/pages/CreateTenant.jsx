import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import { createTenant } from '../api/auth';

const CreateTenant = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    contactEmail: '',
    ownerName: '',
    ownerEmail: '',
    ownerPassword: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTenant(formData, user.token);
      navigate('/');
    } catch (error) {
      console.error('Tenant creation failed:', error);
    }
  };

  // Render form UI...
};