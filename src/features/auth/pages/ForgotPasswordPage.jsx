import usePageTitle from '@/hooks/usePageTitle'
import AuthForm from '../components/AuthForm'

import { Link, useNavigate } from 'react-router-dom'
import { forgotPasswordConfig } from '../constants'
import { forgotPasswordSchema } from '../schemas/authSchemas'

const ForgotPasswordPage = () => {
  usePageTitle('Forgot Password')

  const navigate = useNavigate()

  const onSubmit = (values) => {
    console.log('Forgot password for email:', values.email)
    navigate('/auth/reset-password')
  }

  return (
    <div className='w-full max-w-md'>
      <div className='px-6 py-8'>
        <AuthForm
          config={forgotPasswordConfig}
          formSchema={forgotPasswordSchema}
          onSubmit={onSubmit}
          formType='forgotPassword'
        />
        <p className='mt-6 text-center text-sm'>
          <Link
            to='/auth/login'
            className='text-secondary hover:text-secondary/80 font-medium transition-colors'
          >
            Quay lại Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
