import Loader from '@/components/Loader'
import { useAuth } from '@/hooks/useAuth'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()
  if (isLoading) return <Loader />
  if (isAuthenticated) return <Navigate to='/' replace />

  return children
}

export default PublicRoute
