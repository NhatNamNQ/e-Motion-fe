import usePageTitle from '@/hooks/usePageTitle'
import AuthForm from '../components/AuthForm'
import { loginSchema } from '../schemas/authSchemas'
import { loginConfig } from '../constants'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearError } from '../../../store/slices/authSlice'
import { useEffect } from 'react'
import { loginUser } from '@/store/actions/authActions'
import {
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated
} from '@/store/selectors/authSelectors'
// import { useAuth } from '@/hooks/useAuth'

const LoginPage = () => {
  usePageTitle('Login')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoading = useSelector(selectAuthLoading)
  const error = useSelector(selectAuthError)
  const isAuthenticated = useSelector(selectIsAuthenticated)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  const handleLogin = async (formData) => {
    dispatch(clearError())

    const result = await dispatch(
      loginUser({
        email: formData.email,
        password: formData.password
      })
    )

    if (loginUser.fulfilled.match(result)) {
      alert('Đăng nhập thành công')
    } else {
      alert(error)
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
