import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/dashboard">
          <i className="bi bi-speedometer2 me-1"></i> Dashboard
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/profile">
          <i className="bi bi-person me-1"></i> Profile
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/feedback">
          <i className="bi bi-chat-left-text me-1"></i> Feedback
        </Link>
      </li>
      {user && user.role === 'admin' && (
        <li className="nav-item">
          <Link className="nav-link" to="/admin">
            <i className="bi bi-shield-lock me-1"></i> Admin
          </Link>
        </li>
      )}
      <li className="nav-item">
        <a onClick={onLogout} href="#!" className="nav-link">
          <i className="bi bi-box-arrow-right me-1"></i> Logout
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/register">
          <i className="bi bi-person-plus me-1"></i> Register
        </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">
          <i className="bi bi-box-arrow-in-right me-1"></i> Login
        </Link>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-fingerprint me-2"></i>
          Graphical Password System
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav ms-auto">
            {isAuthenticated ? authLinks : guestLinks}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;