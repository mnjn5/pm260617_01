import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/AuthContext';

export default function AdminRoute() {
  const { user, role, loading } = useAuth();

  if (loading) return null;
  if (!user || role !== 'admin') return <Navigate to="/" replace />;

  return <Outlet />;
}
