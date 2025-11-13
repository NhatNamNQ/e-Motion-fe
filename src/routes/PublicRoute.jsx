import { selectIsAuthenticated, selectUser } from '@/store/selectors/authSelectors'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)

  if (isAuthenticated && user) {
    if (user.role === 'ROLE_ADMIN' || user.role === 'ROLE_STAFF') {
      return <Navigate to='/dashboard' replace />
    }
    return <Navigate to='/' replace />
  }
  return children
}

export default PublicRoute
