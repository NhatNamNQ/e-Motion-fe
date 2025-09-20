import usePageTitle from '@/hooks/usePageTitle'
import AuthForm from '../components/AuthForm'
import { resetPasswordSchema } from '../schemas/authSchemas'
import { resetPasswordConfig } from '../constants'
import { useNavigate } from 'react-router-dom'

const ResetPasswordPage = () => {
  usePageTitle('Reset Password')
  const navigate = useNavigate()

  const onSubmit = (values) => {
    console.log('New password submitted:', values.password)
    navigate('auth/login')
    // Handle password reset logic here
    // You would typically get a token from the URL
  }

  return (
    <main className='flex flex-1 items-center justify-center bg-[#51C09F] py-12'>
      <div className='w-full max-w-lg'>
        <div className='rounded-2xl bg-white p-8 shadow-lg'>
          <AuthForm
            config={resetPasswordConfig}
            formSchema={resetPasswordSchema}
            onSubmit={onSubmit}
            formType='resetPassword'
          />
        </div>
      </div>
    </main>
  )
}

export default ResetPasswordPage
