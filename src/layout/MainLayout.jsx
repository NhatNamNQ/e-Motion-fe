import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { Toaster } from '@/components/ui/sonner'
import { useDispatch, useSelector } from 'react-redux'
import { selectAuthError, selectIsInitialized, selectToken } from '@/store/selectors/authSelectors'
import { useEffect } from 'react'
import { getCurrentUser } from '@/store/actions/authActions'
import { toast } from 'sonner'

const MainLayout = () => {
  const dispatch = useDispatch()
  const token = useSelector(selectToken)
  const error = useSelector(selectAuthError)
  const isInitialized = useSelector(selectIsInitialized)

  useEffect(() => {
    const fetchUser = async () => {
      if (token && !isInitialized) {
        const result = await dispatch(getCurrentUser())
        if (getCurrentUser.fulfilled.match(result)) {
          toast.success(`Chào mừng trở lại ${result.payload.fullName}`)
        } else {
          toast.error(error)
        }
      }
    }
    fetchUser()
  }, [dispatch, token, isInitialized, error])
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
