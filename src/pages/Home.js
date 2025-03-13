import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container py-5">
      <div className="jumbotron text-center">
        <h1 className="display-4 mb-4">Graphical Password Authentication System</h1>
        <p className="lead mb-4">
          A secure multi-layer authentication system using color preferences,
          sports selections, and graphical passwords.
        </p>
        <hr className="my-4" />
        <p className="mb-4">
          Create a highly secure account or login to an existing one using our
          innovative three-factor authentication.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/register" className="btn btn-primary btn-lg">
            <i className="bi bi-person-plus me-2"></i>Register
          </Link>
          <Link to="/login" className="btn btn-secondary btn-lg">
            <i className="bi bi-box-arrow-in-right me-2"></i>Login
          </Link>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-4">
          <div className="card mb-4 text-center">
            <div className="card-body">
              <div className="display-4 text-primary mb-3">
                <i className="bi bi-palette"></i>
              </div>
              <h5 className="card-title">Color Preference</h5>
              <p className="card-text">
                Select your favorite color as the first layer of authentication.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 text-center">
            <div className="display-4 text-secondary mb-3">
              <i className="bi bi-trophy"></i>
            </div>
            <div className="card-body">
              <h5 className="card-title">Sport Selection</h5>
              <p className="card-text">
                Choose your favorite sport as the second layer of security.
              </p>
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-4 text-center">
            <div className="display-4 text-primary-dark mb-3">
              <i className="bi bi-image"></i>
            </div>
            <div className="card-body">
              <h5 className="card-title">Graphical Password</h5>
              <p className="card-text">
                Create a unique graphical password by selecting points on an image.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;