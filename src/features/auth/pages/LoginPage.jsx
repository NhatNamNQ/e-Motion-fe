import usePageTitle from '@/hooks/usePageTitle'
import AuthForm from '../components/AuthForm'
import { loginSchema } from '../schemas/authSchemas'
import { loginConfig } from '../constants'
import { useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'

const LoginPage = () => {
  usePageTitle('Login')
  const navigate = useNavigate()

  const onLoginSubmit = async (credentials) => {
    try {
      const { data } = await authService.login(credentials)
      if (data.token) {
        localStorage.setItem('token', data.token)
        navigate('/')
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className='flex flex-1 items-center justify-center bg-[#51C09F] py-12'>
      <div className='w-full max-w-lg'>
        <div className='rounded-2xl bg-white p-8 shadow-lg'>
          <AuthForm
            config={loginConfig}
            formSchema={loginSchema}
            onSubmit={onLoginSubmit}
            formType='login'
          />
        </div>
      </div>
    </main>
  )
}

export default LoginPage
