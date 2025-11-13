import { selectIsAuthenticated, selectUser } from '@/store/selectors/authSelectors'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PublicRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)

  if (isAuthenticated && user) {
    if (user.role === 'ROLE_ADMIN') {
      return <Navigate to='/dashboard' replace />
    } else if (user.role === 'ROLE_STAFF') {
      return <Navigate to={`/dashboard/stations/${user.station.id}`} replace />
    } else {
      return <Navigate to='/' replace />
    }
  }
  return children
}

export default PublicRoute
