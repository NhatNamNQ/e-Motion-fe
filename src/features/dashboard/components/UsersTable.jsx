import { formatVNDate } from '@/lib/utils'
import { User, Clipboard, MoreHorizontal, UserCheck } from 'lucide-react'
import Pagination from '@/components/Pagination'
import { useEffect, useRef, useState } from 'react'
import { Edit2, Lock, Trash2, Unlock } from 'lucide-react'

const UsersTable = ({
  users,
  limitPerPage,
  setLimitPerPage,
  currentPage,
  setCurrentPage,
  totalPages
}) => {
  const [openMenuEmail, setOpenMenuEmail] = useState(null)

  const paginationProps = {
    limitPerPage,
    setLimitPerPage,
    currentPage,
    setCurrentPage,
    totalPages
  }
  const getRoleIcon = (role) => {
    switch (role) {
      case 'ROLE_USER':
        return <User className='h-4 w-4' />
      case 'ROLE_STAFF':
        return <Clipboard className='h-4 w-4' />
      case 'ROLE_ADMIN':
        return <UserCheck className='h-4 w-4 text-red-500' /> // Icon Admin, có thể thêm màu
      default:
        return null
    }
  }

  const handleClickOutMenu = (event) => {
    if (!event.target.closest('.user-menu')) {
      setOpenMenuEmail(null)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutMenu)
    return () => {
      document.removeEventListener('mousedown', handleClickOutMenu)
    }
  }, [])

  return (
    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead className='border-b border-gray-200 bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left'>
                <input type='checkbox' className='rounded border-gray-300' />
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Full Name</th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Email</th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>
                Phone Number
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>
                Created At
              </th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Status</th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Role</th>
              <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'></th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {users.map((user, index) => (
              <tr key={index} className='transition hover:bg-gray-50'>
                <td className='px-6 py-4'>
                  <input type='checkbox' className='rounded border-gray-300' />
                </td>
                <td className='px-6 py-4 text-sm text-gray-900'>{user.fullname}</td>
                <td className='px-6 py-4 text-sm text-gray-600'>{user.email}</td>
                <td className='px-6 py-4 text-sm text-gray-600'>{user.phone}</td>
                <td className='px-6 py-4 text-sm text-gray-900'>{formatVNDate(user.createdAt)}</td>
                <td className='px-6 py-4'>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${user.blocked ? 'bg-red-50 text-red-700' : 'bg-teal-50 text-teal-700'}`}
                  >
                    {user.blocked ? 'Blocked' : 'Active'}
                  </span>
                </td>
                <td className='px-6 py-4'>
                  <div className='flex items-center gap-2 text-sm text-gray-700'>
                    {getRoleIcon(user.role)}
                    {user.role}
                  </div>
                </td>
                <td className='relative px-6 py-4'>
                  <div className='flex justify-center'>
                    <button
                      onClick={() =>
                        setOpenMenuEmail(openMenuEmail === user.email ? null : user.email)
                      }
                      className='user-menu text-gray-400 transition hover:text-gray-600'
                    >
                      <MoreHorizontal className='h-5 w-5' />
                    </button>
                  </div>

                  {/* Popup Menu */}
                  {openMenuEmail === user.email && (
                    <div className='absolute top-full right-0 z-10 mt-1 w-48 rounded-md border border-gray-200 bg-white shadow-lg'>
                      <button
                        // onClick={() => handleEdit(user)}
                        className='flex w-full items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50'
                      >
                        <Edit2 className='h-4 w-4' />
                        Edit
                      </button>
                      <button
                        // onClick={() => handleToggleBlock(user)}
                        className={`flex w-full items-center gap-3 border-t border-gray-200 px-4 py-2 text-sm ${!user.blocked ? 'text-red-700 hover:bg-red-50' : 'text-teal-700 hover:bg-teal-50'}`}
                      >
                        {user.blocked ? (
                          <>
                            <Unlock className='h-4 w-4' />
                            Active
                          </>
                        ) : (
                          <>
                            <Lock className='h-4 w-4' />
                            Block
                          </>
                        )}
                      </button>
                      <button
                        // onClick={() => handleDelete(user)}
                        className='flex w-full items-center gap-3 border-t border-gray-200 px-4 py-2 text-sm text-red-600 hover:bg-red-50'
                      >
                        <Trash2 className='h-4 w-4' />
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination {...paginationProps} />
    </div>
  )
}

export default UsersTable
