import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState(null);
  const [passwordMetrics, setPasswordMetrics] = useState(null);
  const [feedbackAnalytics, setFeedbackAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      console.log('Fetched users:', res.data);
      setUsers(res.data);
    } catch (err) {
      toast.error('Failed to fetch users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const res = await axios.get('/api/admin/user-stats', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      console.log('Fetched user stats:', res.data);
      setUserStats(res.data.data);
    } catch (err) {
      toast.error('Failed to fetch user statistics');
      console.error(err);
    }
  };

  const fetchPasswordMetrics = async () => {
    try {
      const res = await axios.get('/api/admin/password-metrics', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      console.log('Fetched password metrics:', res.data);
      setPasswordMetrics(res.data.passwordMetrics);
    } catch (err) {
      toast.error('Failed to fetch password metrics');
      console.error(err);
    }
  };

  const fetchFeedbackAnalytics = async () => {
    try {
      const res = await axios.get('/api/admin/feedback', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      console.log('Fetched feedback analytics:', res.data);
      setFeedbackAnalytics(res.data);
    } catch (err) {
      toast.error('Failed to fetch feedback analytics');
      console.error(err);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`
        }
      });
      toast.success('User deleted successfully');
      fetchUsers(); // Refresh user list
    } catch (err) {
      toast.error('Failed to delete user');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchUserStats();
    fetchPasswordMetrics();
    fetchFeedbackAnalytics();
  }, []);

  // Prepare chart data for color preferences
  const colorChartData = passwordMetrics ? {
    labels: passwordMetrics.colorMetrics.map(metric => metric._id),
    datasets: [
      {
        label: 'Color Preferences',
        data: passwordMetrics.colorMetrics.map(metric => metric.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(0, 0, 0, 0.6)',
          'rgba(255, 255, 255, 0.6)'
        ],
        borderWidth: 1
      }
    ]
  } : null;

  // Prepare chart data for sport preferences
  const sportChartData = passwordMetrics ? {
    labels: passwordMetrics.sportMetrics.map(metric => metric._id),
    datasets: [
      {
        label: 'Sport Preferences',
        data: passwordMetrics.sportMetrics.map(metric => metric.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)',
          'rgba(83, 102, 255, 0.6)'
        ],
        borderWidth: 1
      }
    ]
  } : null;

  // Prepare chart data for ratings
  const ratingChartData = feedbackAnalytics ? {
    labels: feedbackAnalytics.ratingAnalytics.map(metric => `${metric._id} Star`),
    datasets: [
      {
        label: 'Feedback Ratings',
        data: feedbackAnalytics.ratingAnalytics.map(metric => metric.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)'
        ],
        borderWidth: 1
      }
    ]
  } : null;

  return (
    <div className="admin-dashboard">
      <h2 className="mb-4">Admin Dashboard</h2>
      
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {/* User Statistics */}
          <div className="row mb-4">
            <div className="col-md-3">
              <div className="card bg-primary text-white">
                <div className="card-body">
                  <h5 className="card-title">Total Users</h5>
                  <h2>{userStats?.totalUsers || 0}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-success text-white">
                <div className="card-body">
                  <h5 className="card-title">Regular Users</h5>
                  <h2>{userStats?.regularUsers || 0}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-info text-white">
                <div className="card-body">
                  <h5 className="card-title">Admin Users</h5>
                  <h2>{userStats?.adminUsers || 0}</h2>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card bg-warning text-dark">
                <div className="card-body">
                  <h5 className="card-title">New Today</h5>
                  <h2>{userStats?.newUsersToday || 0}</h2>
                </div>
              </div>
            </div>
          </div>
          
          {/* Password Metrics */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header">
                  <h5>Color Preferences</h5>
                </div>
                <div className="card-body">
                  {colorChartData && <Pie data={colorChartData} />}
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header">
                  <h5>Sport Preferences</h5>
                </div>
                <div className="card-body">
                  {sportChartData && <Pie data={sportChartData} />}
                </div>
              </div>
            </div>
          </div>
          
          {/* Feedback Analytics */}
          <div className="row mb-4">
            <div className="col-md-6">
              <div className="card mb-4">
                <div className="card-header">
                  <h5>Feedback Ratings</h5>
                </div>
                <div className="card-body">
                  {ratingChartData && <Pie data={ratingChartData} />}
                </div>
              </div>
            </div>
          </div>
          
          {/* User Management */}
          <div className="card mb-4">
            <div className="card-header">
              <h5>User Management</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Color</th>
                      <th>Sport</th>
                      <th>Created At</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span className={`badge ${user.role === 'admin' ? 'bg-info' : 'bg-secondary'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td>{user.colorPreference}</td>
                        <td>{user.sportPreference}</td>
                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => deleteUser(user._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;