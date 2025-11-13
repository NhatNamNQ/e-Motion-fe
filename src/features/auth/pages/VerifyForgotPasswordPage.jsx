import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// eslint-disable-next-line
import { motion } from 'framer-motion'
import OtpForm from '../components/OtpForm'
import { authService } from '../services/authService'
import { toast } from 'sonner'

const VerifyForgotPasswordPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const email = location?.state?.email
  const [isLoading, setIsLoading] = useState(false)
  console.log(location)
  const handleVerifyForgotPassword = async (values) => {
    try {
      setIsLoading(true)
      const data = await authService.verifyForgotPassword({
        email: email,
        verificationCode: values.verificationCode
      })
      toast.success(data.message)
      navigate('/auth/reset-password', {
        state: {
          email: email
        }
      })
    } catch (error) {
      toast.error(error.message || 'Xác nhận mã thất bại')
    } finally {
      setIsLoading(false)
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
        <div className='mb-6 text-center'>
          <h2 className='text-2xl font-bold'>Xác thực OTP</h2>
          <p className='mt-2 text-gray-600'>
            Mã xác thực đã được gửi đến email: <strong>{email}</strong>
          </p>
        </div>
        <OtpForm
          onSubmit={handleVerifyForgotPassword}
          isLoading={isLoading}
          email={email}
          type='verifyForgotpassword'
        />
      </div>
    </motion.div>
  )
}

export default VerifyForgotPasswordPage
