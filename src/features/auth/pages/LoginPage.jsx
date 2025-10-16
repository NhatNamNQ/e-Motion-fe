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
          case 'ROLE_STAFF':
            navigate('/dashboard')
            break
          default:
            navigate('/')
        }
      }
    } else {
      toast.error(result.payload)
    }
  }

  return (
    <main className='bg-secondary flex h-screen items-center justify-center py-12'>
      <div className='w-full max-w-lg'>
        <div className='rounded-2xl bg-white p-8 shadow-lg'>
          <AuthForm
            isLoading={isLoading}
            config={loginConfig}
            formSchema={loginSchema}
            onSubmit={handleLogin}
            formType='login'
          />
        </div>
      </div>
    </main>
  )
}

export default LoginPage
