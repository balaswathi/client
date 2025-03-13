import { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import AuthContext from '../context/auth/AuthContext';

const Profile = () => {
  const { user, loadUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || ''
      });
    }
  }, [user]);

  const { name, email } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.put('/api/users/profile', formData);
      toast.success('Profile updated successfully');
      loadUser();  // Refresh user data
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update profile');
    }
  };

  return (
    <div className="card">
      <div className="card-header bg-primary text-white">
        <h4>Profile</h4>
      </div>
      <div className="card-body">
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={name}
              onChange={onChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </div>
          
          <div className="mb-3">
            <h5>Security Information</h5>
            <div className="card mb-3">
              <div className="card-body">
                <p><strong>Color Preference:</strong> {user?.colorPreference}</p>
                <p><strong>Sport Preference:</strong> {user?.sportPreference}</p>
                <p className="text-muted">For security reasons, you cannot view your graphical password. To change your security preferences, please contact an administrator.</p>
              </div>
            </div>
          </div>
          
          <button type="submit" className="btn btn-primary">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;