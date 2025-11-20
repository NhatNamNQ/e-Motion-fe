import { useState } from 'react'
import { formatDateResponse } from '@/lib/utils'
import {
  User,
  Clipboard,
  MoreHorizontal,
  UserCheck,
  Edit2,
  Lock,
  Unlock,
  BadgeAlert
} from 'lucide-react'
import Pagination from '@/components/Pagination'
import { userService } from '../services/userService'
import { toast } from 'sonner'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import ReportDialog from './ReportDialog'

import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUser } from '@/store/selectors/authSelectors'

const UsersTable = ({
  users,
  limitPerPage,
  setLimitPerPage,
  currentPage,
  setCurrentPage,
  totalPages,
  setMode,
  setShowUserForm,
  setIsLoading,
  fetchUsers
}) => {
  const paginationProps = { limitPerPage, setLimitPerPage, currentPage, setCurrentPage, totalPages }
  const currentUser = useSelector(selectUser)
  const navigate = useNavigate()

  const [reportDialog, setReportDialog] = useState({
    open: false,
    userId: null,
    userEmail: ''
  })

  const getRoleIcon = (role) => {
    switch (role) {
      case 'ROLE_USER':
        return <User className='h-4 w-4' />
      case 'ROLE_STAFF':
        return <Clipboard className='h-4 w-4' />
      case 'ROLE_ADMIN':
        return <UserCheck className='h-4 w-4 text-red-500' />
      default:
        return null
    }
  }

  const handleClickEdit = (user) => {
    setMode({ type: 'edit', user })
    setShowUserForm(true)
  }

  const handleToggleBlock = async (user) => {
    setIsLoading(true)
    try {
      await userService.toggleStatusUser(user.email)
      toast.success(`User ${user.blocked ? 'active' : 'blocked'} successfully`)
    } catch (error) {
      toast.error('Failed: ' + error.message)
    } finally {
      fetchUsers()
    }
  }

  const navigateToUserDetail = (user) => {
    if (user.role === 'ROLE_ADMIN') return
    navigate(`/dashboard/users/${user.email}`)
  }

  const handleOpenReport = (user) => {
    setReportDialog({
      open: true,
      userId: user.id,
      userEmail: user.email
    })
  }

  const handleCloseReport = () => {
    setReportDialog({
      open: false,
      userId: null,
      userEmail: ''
    })
  }

  return (
    <>
      <div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm'>
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead className='border-b border-gray-200 bg-gray-50'>
              <tr>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>
                  Full Name
                </th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Email</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>
                  Phone Number
                </th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>
                  Created At
                </th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Status</th>
                <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'>Role</th>
                {currentUser?.role === 'ROLE_ADMIN' && (
                  <th className='px-6 py-3 text-left text-sm font-semibold text-gray-900'></th>
                )}
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200'>
              {users.map((user, index) => (
                <tr
                  key={index}
                  className='transition hover:cursor-pointer hover:bg-gray-50'
                  onClick={() => navigateToUserDetail(user)}
                >
                  <td className='px-6 py-4 text-sm text-gray-900'>{user.fullname}</td>
                  <td className='px-6 py-4 text-sm text-gray-600'>{user.email}</td>
                  <td className='px-6 py-4 text-sm text-gray-600'>{user.phone}</td>
                  <td className='px-6 py-4 text-sm text-gray-900'>
                    {formatDateResponse(user.createdAt)}
                  </td>
                  <td className='px-6 py-4'>
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                        user.blocked ? 'bg-red-50 text-red-700' : 'bg-teal-50 text-teal-700'
                      }`}
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
                  {currentUser?.role === 'ROLE_ADMIN' && (
                    <td className='relative px-6 py-4' onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <button className='p-1 text-gray-500 hover:text-gray-700'>
                            <MoreHorizontal className='h-5 w-5' />
                          </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align='end' className='w-40'>
                          {user.role === 'ROLE_STAFF' && (
                            <>
                              <DropdownMenuItem
                                className='flex justify-between'
                                onClick={() => handleClickEdit(user)}
                              >
                                Edit <Edit2 className='h-4 w-4' />
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </>
                          )}
                          <DropdownMenuItem
                            className={`${user.blocked ? 'text-teal-600 focus:text-teal-600' : 'text-red-600 focus:text-red-600'} flex justify-between`}
                            onClick={() => handleToggleBlock(user)}
                          >
                            {user.blocked ? (
                              <>
                                Active <Unlock className='h-4 w-4' />
                              </>
                            ) : (
                              <>
                                Block <Lock className='h-4 w-4' />
                              </>
                            )}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  )}
                  {currentUser?.role === 'ROLE_STAFF' && (
                    <td className='relative px-6 py-4' onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <button className='p-1 text-gray-500 hover:text-gray-700'>
                            <MoreHorizontal className='h-5 w-5' />
                          </button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent align='end' className='w-40'>
                          <DropdownMenuItem
                            className='flex items-center gap-2'
                            onClick={() => handleOpenReport(user)}
                          >
                            <BadgeAlert className='h-4 w-4 text-red-600' />
                            <span>Tạo khiếu nại</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination {...paginationProps} />
      </div>

      <ReportDialog
        open={reportDialog.open}
        onOpenChange={handleCloseReport}
        userEmail={reportDialog.userEmail}
        type='REPORT_USER'
      />
    </>
  )
}

export default UsersTable
