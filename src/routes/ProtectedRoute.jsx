import Loader from '@/components/Loader'
import { selectIsAuthenticated, selectUser } from '@/store/selectors/authSelectors'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)

  if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace />
  }

  if (!user) return <Loader />

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to='/' replace />
  }

  return children
}

export default ProtectedRoute
