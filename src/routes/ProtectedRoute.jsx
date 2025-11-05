import Loader from '@/components/Loader'
import { selectIsAuthenticated, selectUser } from '@/store/selectors/authSelectors'
import { useSelector } from 'react-redux'
import { Navigate, useParams } from 'react-router-dom'

const ProtectedRoute = ({ children, allowedRoles = [], allowOwnStationOnly = false }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)
  const { stationId } = useParams()

  if (!isAuthenticated) {
    return <Navigate to='/auth/login' replace />
  }

  if (!user) return <Loader />

  if (allowOwnStationOnly && user.role === 'ROLE_STAFF') {
    if (!user.station?.id || user.station.id != stationId) {
      return <Navigate to={`/dashboard/stations/${user.station?.id}`} replace />
    }
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to='/' replace />
  }

  return children
}

export default ProtectedRoute
