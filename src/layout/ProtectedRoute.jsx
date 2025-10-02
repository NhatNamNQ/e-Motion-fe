import { useAuth } from '@/hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const location = useLocation()
  if (isLoading) return <div>Loading ...</div>
  if (!isAuthenticated) return <Navigate to='/auth/login/' state={{ from: location }} replace />

  return children
}

export default ProtectedRoute
