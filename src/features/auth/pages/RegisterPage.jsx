import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'sonner'
import usePageTitle from '@/hooks/usePageTitle'
import AuthForm from '../components/AuthForm'
import { registerSchema } from '../schemas/authSchemas'
import { registerConfig } from '../constants'
import { clearError } from '@/store/slices/authSlice'
import { selectAuthLoading } from '@/store/selectors/authSelectors'
import { registerUser } from '@/store/actions/authActions'

const RegisterPage = () => {
  usePageTitle('Register')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoading = useSelector(selectAuthLoading)

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
      navigate('/auth/verify-otp')
    } else {
      toast.error(result.payload || 'Đăng ký thất bại')
    }
  }

  return (
    <div className='w-full max-w-md'>
      <div className='px-6 py-8'>
        <AuthForm
          isLoading={isLoading}
          config={registerConfig}
          formSchema={registerSchema}
          onSubmit={handleRegister}
          formType='register'
        />
      </div>
    </div>
  )
}

export default RegisterPage
