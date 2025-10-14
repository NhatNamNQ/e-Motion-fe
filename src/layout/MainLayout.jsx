import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from '@/components/ui/sonner'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectAuthError,
  selectIsAuthenticated,
  selectToken
} from '@/store/selectors/authSelectors'
import { useEffect } from 'react'
import { getCurrentUser } from '@/store/actions/authActions'
import { toast } from 'sonner'

const MainLayout = () => {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const error = useSelector(selectAuthError)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
    const fetchUser = async () => {
      if (token && isAuthenticated) {
        const result = await dispatch(getCurrentUser())
        if (getCurrentUser.fulfilled.match(result)) {
          toast.success(`Chào mừng tới với e-Motion`)
        } else {
          toast.error(error)
        }
      }
    }
    fetchUser()
  }, [dispatch, token, isAuthenticated, error])
  return (
    <>
      <div className='min-h-screen'>
        <Header />
        <Outlet />
      </div>
      <Footer />
      <Toaster position='top-center' expand={true} richColors />
    </>
  )
}

export default MainLayout
