import React, { useState } from 'react'
import { toast } from 'sonner'
import { changePassword } from '@/store/actions/authActions'
import { useDispatch, useSelector } from 'react-redux'
import { Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordSchema } from '../../auth/schemas/authSchemas'
import { selectAuthLoading } from '@/store/selectors/authSelectors'
import Loader from '@/components/Loader'

const ChangePasswordPage = () => {
  const isLoading = useSelector(selectAuthLoading)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  const handleChangePassword = async (data) => {
    try {
      await dispatch(
        changePassword({
          oldPassword: data.currentPassword,
          newPassword: data.newPassword
        })
      ).unwrap()
      toast.success('Đổi mật khẩu thành công!')
      reset()
    } catch (error) {
      toast.error('Đổi mật khẩu thất bại: ' + error.message)
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }))
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='px-4 py-10'>
      <div className='mx-auto max-w-3xl'>
        {/* Tiêu đề */}
        <h1 className='mb-2 text-3xl font-bold text-gray-800'>Đổi mật khẩu</h1>
        <p className='mb-8 text-gray-600'>
          Vui lòng nhập mật khẩu hiện tại của bạn để thay đổi mật khẩu
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleChangePassword)}
          className='rounded-2xl bg-white p-10 shadow-sm'
        >
          <h2 className='mb-6 text-xl font-semibold text-gray-800'>Nhập mật khẩu</h2>

          <div className='space-y-6'>
            {/* Mật khẩu hiện tại */}
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Mật khẩu hiện tại
              </label>
              <div className='relative'>
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  {...register('currentPassword')}
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 text-gray-800 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none'
                />
                <button
                  type='button'
                  onClick={() => togglePasswordVisibility('current')}
                  className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                >
                  {showPasswords.current ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.currentPassword && (
                <p className='mt-2 text-sm text-red-500'>{errors.currentPassword.message}</p>
              )}
            </div>

            {/* Mật khẩu mới */}
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>Mật khẩu mới</label>
              <div className='relative'>
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  {...register('newPassword')}
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 text-gray-800 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none'
                />
                <button
                  type='button'
                  onClick={() => togglePasswordVisibility('new')}
                  className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                >
                  {showPasswords.new ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.newPassword && (
                <p className='mt-2 text-sm text-red-500'>{errors.newPassword.message}</p>
              )}
            </div>

            {/* Xác nhận mật khẩu mới */}
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Xác nhận mật khẩu mới
              </label>
              <div className='relative'>
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  className='w-full rounded-lg border border-gray-300 px-4 py-3 pr-10 text-gray-800 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none'
                />
                <button
                  type='button'
                  onClick={() => togglePasswordVisibility('confirm')}
                  className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-700'
                >
                  {showPasswords.confirm ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className='mt-2 text-sm text-red-500'>{errors.confirmPassword.message}</p>
              )}
            </div>
          </div>

          <div className='mt-8 flex justify-end'>
            <button
              type='submit'
              disabled={!isValid}
              className={`rounded-lg px-8 py-3 font-semibold text-white transition ${
                isValid
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'cursor-not-allowed bg-gray-300 text-gray-600'
              }`}
            >
              Xác nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordPage
