import { selectIsAuthenticated } from '@/store/selectors/authSelectors'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  if (isAuthenticated) return <Navigate to='/' replace />

  return children
}

export default PublicRoute
