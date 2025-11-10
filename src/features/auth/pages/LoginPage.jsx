import usePageTitle from '@/hooks/usePageTitle'
import AuthForm from '../components/AuthForm'
import { loginSchema } from '../schemas/authSchemas'
import { loginConfig } from '../constants'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearError } from '../../../store/slices/authSlice'
import { getCurrentUser, loginUser } from '@/store/actions/authActions'
import { selectAuthLoading } from '@/store/selectors/authSelectors'
import { toast } from 'sonner'
// eslint-disable-next-line
import { motion } from 'framer-motion'

const LoginPage = () => {
  usePageTitle('Login')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoading = useSelector(selectAuthLoading)

  const handleLogin = async (formData) => {
    dispatch(clearError())

    const result = await dispatch(
      loginUser({
        email: formData.email,
        password: formData.password
      })
    )

    if (loginUser.fulfilled.match(result)) {
      const userResult = await dispatch(getCurrentUser())
      if (getCurrentUser.fulfilled.match(userResult)) {
        toast.success('Đăng nhập thành công')
        switch (userResult.payload.role) {
          case 'ROLE_ADMIN':
            navigate('/dashboard')
            break
          case 'ROLE_STAFF': {
            const stationId = userResult.payload.station?.id
            if (stationId) {
              navigate(`/dashboard/stations/${stationId}`)
            } else {
              toast.error('Không tìm thấy trạm của nhân viên')
            }
            break
          }
          default:
            navigate('/')
        }
      }
    } else {
      toast.error(result.payload)
    }
  }

  return (
    <motion.div
      className='w-full max-w-md'
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className='px-6 py-8'>
        <AuthForm
          isLoading={isLoading}
          config={loginConfig}
          formSchema={loginSchema}
          onSubmit={handleLogin}
          formType='login'
        />
      </div>
    </motion.div>
  )
}

export default LoginPage
