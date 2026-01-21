import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import loading_gif from '../assets/loading.gif';

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className=''><img src={loading_gif} alt="loading..." /></div>;
  }

  if (user && (user.role === 'admin' || user.role === 'seller')) {
    return children;
  }

  return <Navigate to="/" />;
};

export default AdminRoute;
