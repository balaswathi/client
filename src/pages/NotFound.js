import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="text-center my-5">
      <h1 className="display-1">404</h1>
      <p className="lead">Page Not Found</p>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;