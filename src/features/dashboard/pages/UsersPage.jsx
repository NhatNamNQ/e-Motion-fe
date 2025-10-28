import React, { useEffect, useState } from 'react'
import { UserPlus, CirclePlus, Check, X } from 'lucide-react'
import { userService } from '../services/userService'
import { toast } from 'sonner'
import Loader from '@/components/Loader'
import UserForm from '../components/UserForm'
import { statusOptions, roleOptions } from '../constants/userConfig'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

import UsersTable from '../components/UsersTable'
import { useDebounce } from 'use-debounce'

const UsersPage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limitPerPage, setLimitPerPage] = useState(10)
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [selectedStatuses, setSelectedStatuses] = useState([])
  const [selectedRoles, setSelectedRoles] = useState([])
  const [mode, setMode] = useState({
    type: 'add',
    user: null
  })
  const [showUserForm, setShowUserForm] = useState(false)
  const [searchKey, setSearchKey] = useState('')
  const [debouncedFilter] = useDebounce(searchKey, 500)

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const res = await userService.getUsers(
        currentPage,
        limitPerPage,
        selectedStatuses,
        selectedRoles,
        debouncedFilter
      )
      const userData = res.content.map((user) => ({
        fullname: user.fullName,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
        blocked: user.blocked,
        role: user.role
      }))
      setUsers(userData)
      setTotalPages(res.totalPages)
    } catch (error) {
      toast.error('Error get users: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClickFilterStatus = (status) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((s) => s !== status))
    } else {
      setSelectedStatuses([...selectedStatuses, status])
    }
  }

  const handleClickFilterRole = (role) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role))
    } else {
      setSelectedRoles([...selectedRoles, role])
    }
  }

  const clearFilters = () => {
    setSelectedStatuses([])
    setSelectedRoles([])
  }

  const handleCLickAddUserBtn = () => {
    setMode({ type: 'add', user: null })
    setShowUserForm(true)
  }

  const handleSubmitAddUser = async (userData) => {
    setIsLoading(true)
    try {
      await userService.addUser(userData)
      toast.success('User added successfully!')
      setShowUserForm(false)
      fetchUsers()
    } catch (error) {
      toast.error('Error adding user: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmitEditUser = async (userData) => {
    setIsLoading(true)
    try {
      await userService.editUser(userData)
      toast.success('Edit user successfully!')
      setShowUserForm(false)
      fetchUsers()
    } catch (error) {
      toast.error('Error adding user: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [currentPage, limitPerPage, selectedStatuses, selectedRoles, debouncedFilter])

  const tableProps = {
    users,
    limitPerPage,
    setLimitPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages,
    setMode,
    setShowUserForm,
    setIsLoading,
    fetchUsers
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <div className='min-h-screen'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-8'>
          <div className='mb-2 flex items-start justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>User List</h1>
              <p className='mt-1 text-gray-500'>Manage your users and their roles here.</p>
            </div>
            <Button onClick={handleCLickAddUserBtn}>
              <UserPlus className='h-4 w-4' />
              Add User
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className='mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-1 items-center gap-4'>
              <Input
                placeholder='Filter users...'
                value={searchKey ?? ''}
                onChange={(e) => setSearchKey(e.target.value)}
                className='h-8 w-[150px] pl-8 lg:w-[250px]'
              />
              {/* Status Filter */}
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`flex items-center gap-2 rounded-lg border px-4 py-1 transition ${
                      selectedStatuses.length > 0
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <CirclePlus className='size-4' />
                    Status
                    {selectedStatuses.length > 0 && (
                      <span className='ml-2 flex flex-wrap gap-1'>
                        {selectedStatuses.map((status) => (
                          <span
                            key={status}
                            className='rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-700'
                          >
                            {statusOptions.find((s) => s.value === status)?.label || status}
                          </span>
                        ))}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align='start' className='w-60'>
                  <DropdownMenuItem>
                    <h3 className='font-semibold text-gray-900'>Filter by Status</h3>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  {statusOptions.map((status) => (
                    <Label>
                      <DropdownMenuItem className='w-full'>
                        <Checkbox
                          checked={selectedStatuses.includes(status.value)}
                          onCheckedChange={() => handleClickFilterStatus(status.value)}
                          className='data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 [&_svg]:!text-white'
                        />
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </DropdownMenuItem>
                    </Label>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={`flex items-center gap-2 rounded-lg border px-4 py-1 transition ${
                      selectedRoles.length > 0
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <CirclePlus className='size-4' />
                    Role
                    {selectedRoles.length > 0 && (
                      <span className='ml-2 flex flex-wrap gap-1'>
                        {selectedRoles.map((role) => (
                          <span
                            key={role}
                            className='rounded bg-gray-200 px-2 py-0.5 text-xs text-gray-700'
                          >
                            {roleOptions.find((r) => r.value === role)?.label || role}
                          </span>
                        ))}
                      </span>
                    )}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align='start' className='w-60'>
                  <DropdownMenuItem>
                    <h3 className='font-semibold text-gray-900'>Filter by Role</h3>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />
                  {roleOptions.map((role) => (
                    <Label>
                      <DropdownMenuItem className='w-full'>
                        <Checkbox
                          checked={selectedRoles.includes(role.value)}
                          onCheckedChange={() => handleClickFilterRole(role.value)}
                          className='data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 [&_svg]:!text-white'
                        />
                        <div className='flex w-full justify-between px-3'>
                          <span className='text-sm text-gray-700'>{role.label}</span>
                          <role.icon
                            className={`h-4 w-4 ${role.value === 'ROLE_ADMIN' ? 'text-red-500' : 'text-gray-600'}`}
                          />
                        </div>
                      </DropdownMenuItem>
                    </Label>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {(selectedRoles.length > 0 || selectedStatuses.length > 0) && (
                <button
                  onClick={clearFilters}
                  className='flex items-center gap-2 rounded-lg p-3 px-4 py-2 hover:cursor-pointer hover:bg-gray-200'
                >
                  Reset
                  <X className='h-5 w-5' />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <UsersTable {...tableProps} />

        {/* Add User Modal */}
        {showUserForm && (
          <UserForm
            mode={mode}
            handleSubmitUser={mode.type === 'add' ? handleSubmitAddUser : handleSubmitEditUser}
            setShowUserForm={setShowUserForm}
          />
        )}
      </div>
    </div>
  )
}

export default UsersPage
