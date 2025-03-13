import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  
  return isAuthenticated && user?.role === 'admin' ? 
    children : 
    <Navigate to="/dashboard" />;
};

export default AdminRoute;