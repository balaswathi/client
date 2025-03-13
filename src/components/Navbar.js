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
        <Link className="nav-link" to="/dashboard">Dashboard</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/profile">Profile</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/feedback">Feedback</Link>
      </li>
      {user && user.role === 'admin' && (
        <li className="nav-item">
          <Link className="nav-link" to="/admin">Admin</Link>
        </li>
      )}
      <li className="nav-item">
        <a onClick={onLogout} href="#!" className="nav-link">
          Logout
        </a>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className="nav-item">
        <Link className="nav-link" to="/register">Register</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/login">Login</Link>
      </li>
    </>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Graphical Password System</Link>
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