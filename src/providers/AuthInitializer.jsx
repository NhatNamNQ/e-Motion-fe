import { useDispatch, useSelector } from 'react-redux'
import {
  selectAuthError,
  selectIsAuthenticated,
  selectToken
} from '@/store/selectors/authSelectors'
import { useEffect } from 'react'
import { getCurrentUser } from '@/store/actions/authActions'
import { toast } from 'sonner'

const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const error = useSelector(selectAuthError)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
    const authInit = async () => {
      if (token && isAuthenticated) {
        const result = await dispatch(getCurrentUser())
        if (getCurrentUser.fulfilled.match(result)) {
          toast.success(`Chào mừng tới với e-Motion`)
        } else {
          toast.error(error)
        }
      }
    }
    authInit()
  }, [dispatch, token, isAuthenticated, error])

  return children
}

export default AuthInitializer
