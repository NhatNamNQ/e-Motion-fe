import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import usePageTitle from '@/hooks/usePageTitle'
import OtpForm from '../components/OtpForm'
import {
  selectAuthLoading,
  selectIsAuthenticated,
  selectRegistrationEmail
} from '@/store/selectors/authSelectors'
import { authService } from '../services/authService'

const OtpPage = () => {
  usePageTitle('Verify OTP')
  const navigate = useNavigate()

  const isLoading = useSelector(selectAuthLoading)
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const registrationEmail = useSelector(selectRegistrationEmail)

  useEffect(() => {
    if (isAuthenticated) navigate('/')
    if (!registrationEmail) navigate('/auth/register')
  }, [isAuthenticated, registrationEmail, navigate])

  const handleVerifyOtp = async (formData) => {
    if (!registrationEmail) {
      toast.error('Vui lòng đăng ký trước khi xác thực OTP')
      navigate('/auth/register')
    }

    try {
      await authService.verifyOtp({
        email: registrationEmail,
        verificationCode: formData.verificationCode
      })
      toast.success('Xác thực thành công! Đăng nhập để thuê xe')
      navigate('/auth/login')
    } catch (error) {
      toast.error(error.message || 'Xác thực OTP thất bại')
    }
  }

  return (
    <main className='bg-secondary flex h-screen items-center justify-center py-12'>
      <div className='w-full max-w-lg'>
        <div className='rounded-2xl bg-white p-8 shadow-lg'>
          <div className='mb-6 text-center'>
            <h2 className='text-2xl font-bold'>Xác thực OTP</h2>
            <p className='mt-2 text-gray-600'>
              Mã xác thực đã được gửi đến email: <strong>{registrationEmail}</strong>
            </p>
          </div>
          <OtpForm onSubmit={handleVerifyOtp} isLoading={isLoading} email={registrationEmail} />
        </div>
      </div>
    </main>
  )
}

export default OtpPage
