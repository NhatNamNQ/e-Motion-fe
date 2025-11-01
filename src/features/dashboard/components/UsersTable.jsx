import { formatVNDate } from '@/lib/utils'
import {
  User,
  Clipboard,
  MoreHorizontal,
  UserCheck,
  Edit2,
  Lock,
  Unlock,
  Trash2,
  AlertTriangle
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
import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

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

  const [deleteUser, setDeleteUser] = useState(false)

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

  const handleClickDelete = async (user) => {
    setIsLoading(true)
    try {
      await userService.deleteUser(user.email)
      toast.success(`Delete User successfully`)
    } catch (error) {
      toast.error('Failed: ' + error.message)
    } finally {
      fetchUsers()
    }
  }

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
                <td className='relative px-6 py-4'>
                  <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                      <button className='p-1 text-gray-500 hover:text-gray-700'>
                        <MoreHorizontal className='h-5 w-5' />
                      </button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align='end' className='w-40'>
                      <DropdownMenuItem
                        className='flex justify-between'
                        onClick={() => handleClickEdit(user)}
                      >
                        Edit <Edit2 className='h-4 w-4' />
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

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

                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        className='flex justify-between text-red-600 focus:text-red-600'
                        onClick={() => setDeleteUser(user)}
                      >
                        Delete <Trash2 className='h-4 w-4' />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
            <Dialog open={!!deleteUser} onOpenChange={(open) => !open && setDeleteUser(null)}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className='flex items-center gap-2 text-red-600'>
                    <AlertTriangle />
                    Delete User
                  </DialogTitle>
                  <DialogDescription className='mt-2 text-sm text-gray-700'>
                    Are you sure you want to delete <strong>{deleteUser?.email}</strong>? This
                    action will permanently remove the user with the role of{' '}
                    <strong>{deleteUser?.role}</strong>. This cannot be undone.
                  </DialogDescription>
                </DialogHeader>

                {/* Confirm input */}
                <div className='mt-4 flex gap-3'>
                  <Label htmlFor='confirmUsername' className='text-sm text-gray-700'>
                    Email:
                  </Label>
                  <Input
                    id='confirmUsername'
                    placeholder='Enter email to confirm deletion.'
                    value={deleteUser?.confirmEmail || ''}
                    onChange={(e) =>
                      setDeleteUser((prev) => ({ ...prev, confirmEmail: e.target.value }))
                    }
                  />
                </div>
                <p className='mt-1 text-sm text-red-600'>
                  <strong>Warning!</strong> Please be careful, this operation can not be rolled
                  back.
                </p>

                <DialogFooter className='mt-6 flex justify-end gap-2'>
                  <Button variant='outline' onClick={() => setDeleteUser(null)}>
                    Cancel
                  </Button>
                  <Button
                    variant='destructive'
                    disabled={deleteUser?.confirmEmail !== deleteUser?.email}
                    onClick={() => {
                      handleClickDelete(deleteUser)
                      setDeleteUser(null)
                    }}
                  >
                    Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </tbody>
        </table>
      </div>

      <Pagination {...paginationProps} />
    </div>
  )
}

export default UsersTable
