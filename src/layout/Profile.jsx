import React, { useEffect, useState } from 'react'
import { User, Mail, Phone, Calendar, Shield, Edit2, Save, X, Eye, EyeOff } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, selectAuthLoading, selectAuthError } from '@/store/selectors/authSelectors'
import { formatDate } from '@/lib/utils'
import { toast } from 'sonner'
import { updateProfile, getCurrentUser } from '@/store/actions/authActions'
import Loader from '@/components/Loader'

export default function UserProfile() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const isLoading = useSelector(selectAuthLoading)
  const error = useSelector(selectAuthError)
  console.log('error in profile:', error)

  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState({ ...user })
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })

  useEffect(() => {
    dispatch(getCurrentUser()) // gọi API lấy user từ token trong localStorage
  }, [dispatch])

  const handleEdit = () => {
    setIsEditing(true)
    setEditedUser({ ...user })
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedUser({ ...user })
  }

  const handleSave = async () => {
    // Gọi API để cập nhật thông tin
    await dispatch(updateProfile({ fullName: editedUser.fullName, phone: editedUser.phone }))
    if (error) {
      toast.error('Update profile failed: ' + error)
    } else {
      toast.success('Update profile successful')
    }
    setIsEditing(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedUser((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Mật khẩu mới không khớp!')
      return
    }
    if (passwordData.newPassword.length < 6) {
      alert('Mật khẩu phải có ít nhất 6 ký tự!')
      return
    }
    // Gọi API để đổi mật khẩu
    alert('Đổi mật khẩu thành công!')
    setShowPasswordModal(false)
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12'>
      <div className='mx-auto max-w-4xl'>
        {/* Header Card */}
        <div className='mb-6 overflow-hidden rounded-2xl bg-white shadow-xl'>
          <div className='h-32 bg-gradient-to-r from-blue-600 to-indigo-600'></div>
          <div className='px-8 pb-8'>
            <div className='-mt-16 mb-6 flex items-end justify-between'>
              <div className='flex items-end gap-4'>
                <div className='flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-white shadow-lg'>
                  <User className='h-16 w-16 text-blue-600' />
                </div>
                <div className='pb-2'>
                  <h1 className='text-3xl font-bold text-gray-800'>{user.fullName}</h1>
                  <p className='text-gray-500'>{user.role}</p>
                </div>
              </div>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className='mb-2 flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:bg-blue-700'
                >
                  <Edit2 className='h-4 w-4' />
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className='rounded-2xl bg-white p-8 shadow-xl'>
          <h2 className='mb-6 text-2xl font-bold text-gray-800'>Personal information</h2>

          <div className='space-y-6'>
            {/* Full Name */}
            <div className='flex items-start gap-4'>
              <div className='mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-100'>
                <User className='h-5 w-5 text-blue-600' />
              </div>
              <div className='flex-1'>
                <label className='text-sm font-medium text-gray-500'>Full Name</label>
                {isEditing ? (
                  <input
                    type='text'
                    name='fullName'
                    value={editedUser.fullName}
                    onChange={handleInputChange}
                    className='mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  />
                ) : (
                  <p className='mt-1 text-lg text-gray-800'>{user?.fullName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div className='flex items-start gap-4'>
              <div className='mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-green-100'>
                <Mail className='h-5 w-5 text-green-600' />
              </div>
              <div className='flex-1'>
                <label className='text-sm font-medium text-gray-500'>Email</label>
                <p className='mt-1 text-lg text-gray-800'>{user.email}</p>
              </div>
            </div>

            {/* Phone */}
            <div className='flex items-start gap-4'>
              <div className='mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-purple-100'>
                <Phone className='h-5 w-5 text-purple-600' />
              </div>
              <div className='flex-1'>
                <label className='text-sm font-medium text-gray-500'>Phone</label>
                {isEditing ? (
                  <input
                    type='tel'
                    name='phone'
                    value={editedUser.phone}
                    onChange={handleInputChange}
                    className='mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  />
                ) : (
                  <p className='mt-1 text-lg text-gray-800'>{user.phone}</p>
                )}
              </div>
            </div>

            {/* Role */}
            <div className='flex items-start gap-4'>
              <div className='mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-orange-100'>
                <Shield className='h-5 w-5 text-orange-600' />
              </div>
              <div className='flex-1'>
                <label className='text-sm font-medium text-gray-500'>Role</label>
                <p className='mt-1 text-lg text-gray-800'>{user.role}</p>
              </div>
            </div>

            {/* Created At */}
            <div className='flex items-start gap-4'>
              <div className='mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-indigo-100'>
                <Calendar className='h-5 w-5 text-indigo-600' />
              </div>
              <div className='flex-1'>
                <label className='text-sm font-medium text-gray-500'>Created At</label>
                <p className='mt-1 text-lg text-gray-800'>{formatDate(user.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditing ? (
            <div className='mt-8 flex gap-3 border-t border-gray-200 pt-6'>
              <button
                onClick={handleSave}
                className='flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700'
              >
                <Save className='h-5 w-5' />
                Save
              </button>
              <button
                onClick={handleCancel}
                className='flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-200 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-300'
              >
                <X className='h-5 w-5' />
                Cancel
              </button>
            </div>
          ) : (
            <div className='mt-8 border-t border-gray-200 pt-6'>
              <button
                onClick={() => setShowPasswordModal(true)}
                className='w-full rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-medium text-white transition hover:from-blue-700 hover:to-indigo-700'
              >
                Change Password
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
          <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl'>
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
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Current Password
                </label>
                <div className='relative'>
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    name='currentPassword'
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className='w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  />
                  <button
                    type='button'
                    onClick={() => togglePasswordVisibility('current')}
                    className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  >
                    {showPasswords.current ? (
                      <EyeOff className='h-5 w-5' />
                    ) : (
                      <Eye className='h-5 w-5' />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>New Password</label>
                <div className='relative'>
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    name='newPassword'
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className='w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  />
                  <button
                    type='button'
                    onClick={() => togglePasswordVisibility('new')}
                    className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  >
                    {showPasswords.new ? (
                      <EyeOff className='h-5 w-5' />
                    ) : (
                      <Eye className='h-5 w-5' />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Confirm New Password
                </label>
                <div className='relative'>
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    name='confirmPassword'
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className='w-full rounded-lg border border-gray-300 px-4 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:outline-none'
                  />
                  <button
                    type='button'
                    onClick={() => togglePasswordVisibility('confirm')}
                    className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-gray-600'
                  >
                    {showPasswords.confirm ? (
                      <EyeOff className='h-5 w-5' />
                    ) : (
                      <Eye className='h-5 w-5' />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className='mt-6 flex gap-3'>
              <button
                onClick={handleChangePassword}
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
          </div>
        </div>
      )}
    </div>
  )
}
