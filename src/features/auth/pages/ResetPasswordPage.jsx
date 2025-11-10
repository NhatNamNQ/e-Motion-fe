import usePageTitle from '@/hooks/usePageTitle'
import AuthForm from '../components/AuthForm'
import { resetPasswordSchema } from '../schemas/authSchemas'
import { resetPasswordConfig } from '../constants'
import { useNavigate } from 'react-router-dom'
// eslint-disable-next-line
import { motion } from 'framer-motion'

const ResetPasswordPage = () => {
  usePageTitle('Reset Password')
  const navigate = useNavigate()

  const onSubmit = (values) => {
    console.log('New password submitted:', values.password)
    navigate('auth/login')
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
        />
      </div>
    </motion.div>
  )
}

export default ResetPasswordPage
