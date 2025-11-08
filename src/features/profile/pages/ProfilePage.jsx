import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { User, Edit2, Save, X, LockKeyhole } from 'lucide-react'
import { selectUser, selectAuthLoading } from '@/store/selectors/authSelectors'
import { formatDateResponse } from '@/lib/utils'
import { toast } from 'sonner'
import { updateProfile, getCurrentUser } from '@/store/actions/authActions'
import Loader from '@/components/Loader'
import Document from '../components/Document'

export default function ProfilePage({ user }) {
  const dispatch = useDispatch()
  const currentUser = useSelector(selectUser)
  const canEdit = user == null
  if (canEdit) {
    user = currentUser
  }
  const isLoading = useSelector(selectAuthLoading)

  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState({ ...user })

  useEffect(() => {
    dispatch(getCurrentUser())
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
    try {
      await dispatch(
        updateProfile({ fullName: editedUser.fullName, phone: editedUser.phone })
      ).unwrap()
      toast.success('Cập nhật hồ sơ thành công')
    } catch (error) {
      toast.error('Cập nhật thất bại: ' + error)
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

  if (isLoading) return <Loader />

  return (
    <div>
      <div className='p-8'>
        <div className='mb-8 flex items-start gap-10'>
          {/* Avatar */}
          <div className='text-center'>
            <div className='mb-4 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-green-400 to-green-600'>
              <User size={80} className='text-white' />
            </div>
            <h2 className='mb-2 text-2xl font-bold'>{user?.fullName}</h2>
            <p className='text-sm text-gray-500'>Tham gia: {formatDateResponse(user?.createdAt)}</p>
          </div>

          {/* Account Information */}
          <div className='flex-1 space-y-6'>
            <div className='flex items-center justify-between'>
              <h3 className='text-xl font-bold'>Thông tin tài khoản</h3>
              {canEdit &&
                (!isEditing ? (
                  <button
                    onClick={handleEdit}
                    className='flex items-center gap-1 text-blue-600 hover:underline'
                  >
                    <Edit2 size={16} /> Chỉnh sửa
                  </button>
                ) : (
                  <div className='flex gap-2'>
                    <button
                      onClick={handleSave}
                      className='flex items-center gap-1 rounded bg-blue-600 px-3 py-1 text-white hover:bg-blue-700'
                    >
                      <Save size={16} /> Lưu
                    </button>
                    <button
                      onClick={handleCancel}
                      className='flex items-center gap-1 rounded bg-gray-200 px-3 py-1 text-gray-700 hover:bg-gray-300'
                    >
                      <X size={16} /> Hủy
                    </button>
                  </div>
                ))}
            </div>

            {/* Full Name */}
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-600'>Họ và tên:</label>
              {isEditing ? (
                <input
                  type='text'
                  name='fullName'
                  value={editedUser.fullName || ''}
                  onChange={handleInputChange}
                  className='w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500'
                />
              ) : (
                <p className='text-gray-800'>{user?.fullName}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-600'>Số điện thoại:</label>
              {isEditing ? (
                <input
                  type='text'
                  name='phone'
                  value={editedUser.phone || ''}
                  onChange={handleInputChange}
                  className='w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500'
                />
              ) : (
                <span className='text-gray-800'>{user.phone}</span>
              )}
            </div>

            {/* Email */}
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-600'>Email:</label>
              <div className='flex items-center gap-2'>
                <span className='text-gray-800'>{user.email}</span>
              </div>
            </div>

            {/* Role */}
            <div>
              <label className='mb-2 block text-sm font-medium text-gray-600'>Vai trò:</label>
              <p className='text-gray-800'>{user.role}</p>
            </div>
          </div>
        </div>
      </div>

      {user.role === 'ROLE_USER' && <Document />}
    </div>
  )
}
