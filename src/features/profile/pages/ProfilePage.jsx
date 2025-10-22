import React, { useEffect, useState } from 'react'
import { User, Mail, Phone, Calendar, Shield, Edit2, Save, X, LockKeyhole } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, selectAuthLoading } from '@/store/selectors/authSelectors'
import { formatDate } from '@/lib/utils'
import { toast } from 'sonner'
import { updateProfile, getCurrentUser } from '@/store/actions/authActions'
import Loader from '@/components/Loader'
import ChangePasswordPage from '@/features/profile/components/ChangePassword'
import Document from '../components/Document'

export default function UserProfile() {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const isLoading = useSelector(selectAuthLoading)

  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState({ ...user })
  const [showPasswordModal, setShowPasswordModal] = useState(false)

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
    try {
      await dispatch(
        updateProfile({ fullName: editedUser.fullName, phone: editedUser.phone })
      ).unwrap()
      toast.success('Update profile successful')
    } catch (error) {
      toast.error('Update profile failed: ' + error)
    } finally {
      setIsEditing(false)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedUser((prev) => ({
      ...prev,
      [name]: value
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
              <div className='flex gap-3'>
                {!isEditing && (
                  <button
                    onClick={handleEdit}
                    className='mb-2 flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:cursor-pointer hover:bg-blue-700'
                  >
                    <Edit2 className='h-4 w-4' />
                    Edit
                  </button>
                )}
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className='mb-2 flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 text-white transition hover:cursor-pointer hover:bg-blue-700'
                >
                  <LockKeyhole className='h-4 w-4' />
                  Change Password
                </button>
              </div>
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
          {isEditing && (
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
          )}

          <Document />
        </div>
      </div>

      {showPasswordModal && <ChangePasswordPage setShowPasswordModal={setShowPasswordModal} />}
    </div>
  )
}
