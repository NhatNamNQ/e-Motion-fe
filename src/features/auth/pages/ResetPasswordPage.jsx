import usePageTitle from '@/hooks/usePageTitle'
import AuthForm from '../components/AuthForm'
import { resetPasswordSchema } from '../schemas/authSchemas'
import { resetPasswordConfig } from '../constants'
import { useLocation, useNavigate } from 'react-router-dom'
// eslint-disable-next-line
import { motion } from 'framer-motion'
import { authService } from '../services/authService'
import { toast } from 'sonner'
import { useState } from 'react'

const ResetPasswordPage = () => {
  usePageTitle('Reset Password')
  const navigate = useNavigate()
  const location = useLocation()
  const email = location?.state?.email
  const [isLoading, setIsloading] = useState(false)
  const onSubmit = async (values) => {
    try {
      setIsloading(true)
      const data = await authService.updateForgotPassword({
        email: email,
        newPassword: values.password
      })
      toast.success(data.message)
      navigate('/auth/login')
    } catch (error) {
      toast.error(error.message)
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
          config={resetPasswordConfig}
          formSchema={resetPasswordSchema}
          onSubmit={onSubmit}
          formType='resetPassword'
          isLoading={isLoading}
        />
      </div>
    </motion.div>
  )
}

export default ResetPasswordPage
