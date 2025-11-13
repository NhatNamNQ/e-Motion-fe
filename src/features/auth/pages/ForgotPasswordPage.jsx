import usePageTitle from '@/hooks/usePageTitle'
import AuthForm from '../components/AuthForm'

import { Link, useNavigate } from 'react-router-dom'
import { forgotPasswordConfig } from '../constants'
import { forgotPasswordSchema } from '../schemas/authSchemas'
// eslint-disable-next-line
import { motion } from 'framer-motion'
import { authService } from '../services/authService'
import { toast } from 'sonner'
import { useState } from 'react'

const ForgotPasswordPage = () => {
  usePageTitle('Forgot Password')
  const [isLoading, setIsloading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async (values) => {
    try {
      setIsloading(true)
      const data = await authService.forgotPassword(values.email)
      toast.success(data.message)
      navigate('/auth/verify-forgot-password', {
        state: {
          email: values.email
        }
      })
    } catch (error) {
      toast.error(error.message || 'Gửi yêu cầu thất bại')
    } finally {
      setIsloading(false)
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
          config={forgotPasswordConfig}
          formSchema={forgotPasswordSchema}
          onSubmit={onSubmit}
          formType='forgotPassword'
          isLoading={isLoading}
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
    </motion.div>
  )
}

export default ForgotPasswordPage
