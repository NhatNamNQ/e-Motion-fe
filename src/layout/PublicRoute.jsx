import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <div>Loading ...</div>
  if (isAuthenticated) return <Navigate to='/' replace />

  return children
}

export default PublicRoute
