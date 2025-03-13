import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white">
              <div className="d-flex align-items-center">
                <i className="bi bi-speedometer2 me-2 fs-4"></i>
                <h4 className="mb-0">Dashboard</h4>
              </div>
            </div>
            <div className="card-body bg-gradient-primary-light">
              <h5 className="fw-bold">Welcome {user ? user.name : ''}!</h5>
              <p>You have successfully logged in using the three-layer graphical password authentication system.</p>
            </div>
          </div>
          
          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header bg-light">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-person-circle me-2 text-primary"></i>
                    <h5 className="mb-0">Profile</h5>
                  </div>
                </div>
                <div className="card-body">
                  <p>View and update your profile information.</p>
                  <Link to="/profile" className="btn btn-primary">
                    <i className="bi bi-person me-2"></i>Go to Profile
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 mb-4">
              <div className="card h-100">
                <div className="card-header bg-light">
                  <div className="d-flex align-items-center">
                    <i className="bi bi-chat-left-text me-2 text-secondary"></i>
                    <h5 className="mb-0">Feedback</h5>
                  </div>
                </div>
                <div className="card-body">
                  <p>Submit feedback about your experience with the system.</p>
                  <Link to="/feedback" className="btn btn-secondary">
                    <i className="bi bi-send me-2"></i>Submit Feedback
                  </Link>
                </div>
              </div>
            </div>
            
            {user && user.role === 'admin' && (
              <div className="col-md-12">
                <div className="card">
                  <div className="card-header bg-info text-white">
                    <div className="d-flex align-items-center">
                      <i className="bi bi-gear-fill me-2 fs-4"></i>
                      <h5 className="mb-0">Admin Panel</h5>
                    </div>
                  </div>
                  <div className="card-body">
                    <p>Access admin tools for user management and analytics.</p>
                    <Link to="/admin" className="btn btn-info">
                      <i className="bi bi-shield-lock me-2"></i>Admin Panel
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;