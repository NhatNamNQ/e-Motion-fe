import usePageTitle from '@/hooks/usePageTitle'
import AuthForm from '../components/AuthForm'
import { registerSchema } from '../schemas/authSchemas'
import { registerConfig } from '../constants'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

const RegisterPage = () => {
  usePageTitle('Register')
  const navigate = useNavigate()
  const { register } = useAuth()

  const onRegisterSubmit = async (userData) => {
    try {
      const res = await register(userData)
      console.log(res)
      navigate('/auth/verify-otp', {
        state: userData.email
      })
    } catch (error) {
      console.error(error)
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
