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
  }

  return (
    <div className='w-full max-w-md'>
      <div className='px-6 py-8'>
        <AuthForm
          config={resetPasswordConfig}
          formSchema={resetPasswordSchema}
          onSubmit={onSubmit}
          formType='resetPassword'
        />
      </div>
    </div>
  )
}

export default ResetPasswordPage
