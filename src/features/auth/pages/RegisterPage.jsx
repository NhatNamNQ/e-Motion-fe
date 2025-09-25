import usePageTitle from '@/hooks/usePageTitle'
import AuthForm from '../components/AuthForm'
import { registerSchema } from '../schemas/authSchemas'
import { registerConfig } from '../constants'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'

const RegisterPage = () => {
  usePageTitle('Register')
  const navigate = useNavigate()

  const onRegisterSubmit = async (credentials) => {
    try {
      const res = await registerUser(credentials)
      console.log(res)
      // Handle register logic here
      navigate('/auth/verify-otp', {
        state: {
          email: credentials.email
        }
      })
    } catch (error) {
      console.error('Registration failed:', error)
    }
  }

  return (
    <main className='flex flex-1 items-center justify-center bg-[#51C09F] py-12'>
      <div className='w-full max-w-lg'>
        <div className='rounded-2xl bg-white p-8 shadow-lg'>
          <AuthForm
            config={registerConfig}
            formSchema={registerSchema}
            onSubmit={onRegisterSubmit}
            formType='register'
          />
        </div>
      </div>
    </main>
  )
}

export default RegisterPage
