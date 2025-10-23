import React, { useState } from 'react'
import { toast } from 'sonner'
import { changePassword } from '@/store/actions/authActions'
import { useDispatch } from 'react-redux'
import { X, Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { changePasswordSchema } from '../../auth/schemas/authSchemas'

const ChangePasswordPage = ({ setShowPasswordModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  })
  const dispatch = useDispatch()
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  const handleChangePassword = async (passwordData) => {
    // Gọi API để đổi mật khẩu
    try {
      await dispatch(
        changePassword({
          oldPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      ).unwrap()
      toast.success('Đổi mật khẩu thành công!')
      setShowPasswordModal(false)
    } catch (error) {
      toast.error('Change Password failed: ' + error)
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
      <form
        onSubmit={handleSubmit(handleChangePassword)}
        className='w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl'
      >
        <div className='mb-6 flex items-center justify-between'>
          <h3 className='text-2xl font-bold text-gray-800'>Change Password</h3>
          <button
            onClick={() => setShowPasswordModal(false)}
            className='text-gray-400 transition hover:text-gray-600'
          >
            <X className='h-6 w-6' />
          </button>
        </div>

        <div className='space-y-4'>
          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>Current Password</label>
            <div className='relative'>
              <input
                type={showPasswords.current ? 'text' : 'password'}
                name='currentPassword'
                {...register('currentPassword')}
                className='w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />
              <button
                type='button'
                onClick={() => togglePasswordVisibility('current')}
                className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                {showPasswords.current ? (
                  <Eye className='h-5 w-5' />
                ) : (
                  <EyeOff className='h-5 w-5' />
                )}
              </button>
            </div>
            {errors.currentPassword && (
              <p className='mt-2 text-sm font-medium text-red-500'>
                {errors.currentPassword.message}
              </p>
            )}
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>New Password</label>
            <div className='relative'>
              <input
                type={showPasswords.new ? 'text' : 'password'}
                name='newPassword'
                {...register('newPassword')}
                className='w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />
              <button
                type='button'
                onClick={() => togglePasswordVisibility('new')}
                className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                {showPasswords.new ? <Eye className='h-5 w-5' /> : <EyeOff className='h-5 w-5' />}
              </button>
            </div>
            {errors.newPassword && (
              <p className='mt-2 text-sm font-medium text-red-500'>{errors.newPassword.message}</p>
            )}
          </div>

          <div>
            <label className='mb-2 block text-sm font-medium text-gray-700'>
              Confirm New Password
            </label>
            <div className='relative'>
              <input
                type={showPasswords.confirm ? 'text' : 'password'}
                name='confirmPassword'
                {...register('confirmPassword')}
                className='w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />
              <button
                type='button'
                onClick={() => togglePasswordVisibility('confirm')}
                className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600'
              >
                {showPasswords.confirm ? (
                  <Eye className='h-5 w-5' />
                ) : (
                  <EyeOff className='h-5 w-5' />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className='mt-2 text-sm font-medium text-red-500'>
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        <div className='mt-6 flex gap-3'>
          <button
            type='submit'
            className='flex-1 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700'
          >
            Change Password
          </button>
          <button
            onClick={() => setShowPasswordModal(false)}
            className='flex-1 rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-300'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default ChangePasswordPage
