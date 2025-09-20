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
    // Handle sending reset link logic here
  }

  return (
    <main className='flex flex-1 items-center justify-center bg-[#51C09F] py-12'>
      <div className='w-full max-w-lg'>
        <div className='rounded-2xl bg-white p-8 shadow-lg'>
          <AuthForm
            config={forgotPasswordConfig}
            formSchema={forgotPasswordSchema}
            onSubmit={onSubmit}
            formType='forgotPassword'
          />
          <p className='mt-6 text-center text-sm'>
            <Link
              to='/auth/login'
              className='font-medium text-teal-500 transition-colors hover:text-teal-600'
            >
              Quay lại Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default ForgotPasswordPage
