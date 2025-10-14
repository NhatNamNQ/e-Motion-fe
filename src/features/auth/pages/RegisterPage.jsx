import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import usePageTitle from '@/hooks/usePageTitle'
import AuthForm from '../components/AuthForm'
import { registerSchema } from '../schemas/authSchemas'
import { registerConfig } from '../constants'
import { clearError } from '@/store/slices/authSlice'
import { selectAuthLoading, selectRegistrationEmail } from '@/store/selectors/authSelectors'
import { registerUser } from '@/store/actions/authActions'

const RegisterPage = () => {
  usePageTitle('Register')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoading = useSelector(selectAuthLoading)
  const registrationEmail = useSelector(selectRegistrationEmail)

  useEffect(() => {
    if (registrationEmail) {
      navigate('/auth/verify-otp')
    }
  }, [registrationEmail, navigate])

  const handleRegister = async (formData) => {
    dispatch(clearError())

    const result = await dispatch(
      registerUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      })
    )

    if (registerUser.fulfilled.match(result)) {
      toast.success('Đăng ký thành công! Vui lòng kiểm tra email để xác thực.')
    } else {
      toast.error(result.payload || 'Đăng ký thất bại')
    }
  }

  return (
    <main className='bg-secondary flex h-screen items-center justify-center py-12'>
      <div className='w-full max-w-lg'>
        <div className='rounded-2xl bg-white p-8 shadow-lg'>
          <AuthForm
            config={registerConfig}
            formSchema={registerSchema}
            onSubmit={handleRegister}
            formType='register'
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  )
}

export default RegisterPage
