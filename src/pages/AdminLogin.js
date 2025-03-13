import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/admin/login', { username: 'admin', password: 'admin' });
      localStorage.setItem('adminToken', res.data.token);
      window.location.href = '/admin'; // Redirect to admin dashboard
    } catch (err) {
      toast.error('Invalid credentials');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Admin Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default AdminLogin; 