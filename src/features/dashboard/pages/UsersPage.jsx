import React, { useEffect, useState, useRef } from 'react'
import { User, Clipboard, UserPlus, Filter, UserCheck, Check, X, Eye, EyeOff } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userService } from '../services/userService'
import { toast } from 'sonner'
import Loader from '@/components/Loader'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { ChevronDownIcon, CheckIcon } from 'lucide-react'

import UsersTable from '../components/UsersTable'
import { addUserSchema } from '@/features/auth/schemas/authSchemas'

const UsersPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue
  } = useForm({
    resolver: zodResolver(addUserSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'ROLE_STAFF'
    }
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [limitPerPage, setLimitPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [showStatusFilter, setShowStatusFilter] = useState(false)
  const [showRoleFilter, setShowRoleFilter] = useState(false)
  const [selectedStatuses, setSelectedStatuses] = useState([])
  const [selectedRoles, setSelectedRoles] = useState([])

  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    confirm: false
  })

  const statusPopupRef = useRef(null)
  const rolePopupRef = useRef(null)

  const statusOptions = [
    { value: false, label: 'Active', color: 'bg-teal-50 text-teal-700' },
    { value: true, label: 'Blocked', color: 'bg-red-50 text-red-700' }
  ]

  const roleOptions = [
    { value: 'ROLE_USER', label: 'User', icon: User },
    { value: 'ROLE_STAFF', label: 'Staff', icon: Clipboard },
    { value: 'ROLE_ADMIN', label: 'Admin', icon: UserCheck }
  ]

  const tableProps = {
    users,
    limitPerPage,
    setLimitPerPage,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages
  }

  const fetchUsers = async () => {
    setIsLoading(true)
    try {
      const res = await userService.getUsers(
        currentPage,
        limitPerPage,
        selectedStatuses,
        selectedRoles
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

  const handleClickOutPopup = (e) => {
    if (statusPopupRef.current && !statusPopupRef.current.contains(e.target)) {
      setShowStatusFilter(false)
    }
    if (rolePopupRef.current && !rolePopupRef.current.contains(e.target)) {
      setShowRoleFilter(false)
    }
  }

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field]
    }))
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

  const handleOpenAddUserModal = () => {
    reset()
    setShowAddUserModal(true)
  }

  const handleCloseAddUserModal = () => {
    setShowPasswords({
      current: false,
      confirm: false
    })
    setShowAddUserModal(false)
  }

  const handleSubmitAddUser = async (userData) => {
    console.log('data: ', userData)
    setIsLoading(true)
    try {
      await userService.addUser(userData)
      toast.success('User added successfully!')
      handleCloseAddUserModal()
      fetchUsers()
    } catch (error) {
      toast.error('Error adding user: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
    document.addEventListener('mousedown', handleClickOutPopup)
    return () => {
      document.removeEventListener('mousedown', handleClickOutPopup)
    }
  }, [currentPage, limitPerPage, selectedStatuses, selectedRoles])

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
            <button
              onClick={handleOpenAddUserModal}
              className='flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-white transition hover:bg-gray-800'
            >
              <UserPlus className='h-4 w-4' />
              Add User
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className='mb-6 rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-1 items-center gap-4'>
              <input
                type='text'
                placeholder='Filter users...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-64 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none'
              />
              {/* Status Filter */}
              <div className='relative' ref={statusPopupRef}>
                <button
                  onClick={() => {
                    setShowStatusFilter(!showStatusFilter)
                    setShowRoleFilter(false)
                  }}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition ${
                    selectedStatuses.length > 0
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Filter className='h-4 w-4' />
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

                {showStatusFilter && (
                  <div className='absolute top-full left-0 z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg'>
                    <div className='border-b border-gray-200 p-3'>
                      <h3 className='font-semibold text-gray-900'>Filter by Status</h3>
                    </div>
                    <div className='p-2'>
                      {statusOptions.map((status) => (
                        <button
                          key={status.value}
                          onClick={() => handleClickFilterStatus(status.value)}
                          className='flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition hover:bg-gray-50'
                        >
                          <div className='flex items-center gap-3'>
                            <div
                              className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
                                selectedStatuses.includes(status.value)
                                  ? 'border-blue-500 bg-blue-500'
                                  : 'border-gray-300'
                              }`}
                            >
                              {selectedStatuses.includes(status.value) && (
                                <Check className='h-3 w-3 text-white' />
                              )}
                            </div>
                            <span className='text-sm text-gray-700'>{status.label}</span>
                          </div>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs font-medium ${status.color}`}
                          >
                            {status.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Role Filter */}
              <div className='relative' ref={rolePopupRef}>
                <button
                  onClick={() => {
                    setShowRoleFilter(!showRoleFilter)
                    setShowStatusFilter(false)
                  }}
                  className={`flex items-center gap-2 rounded-lg border px-4 py-2 transition ${
                    selectedRoles.length > 0
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Filter className='h-4 w-4' />
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

                {showRoleFilter && (
                  <div className='absolute top-full left-0 z-50 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg'>
                    <div className='border-b border-gray-200 p-3'>
                      <h3 className='font-semibold text-gray-900'>Filter by Role</h3>
                    </div>
                    <div className='p-2'>
                      {roleOptions.map((role) => {
                        const IconComponent = role.icon
                        return (
                          <button
                            key={role.value}
                            onClick={() => handleClickFilterRole(role.value)}
                            className='flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition hover:bg-gray-50'
                          >
                            <div className='flex items-center gap-3'>
                              <div
                                className={`flex h-5 w-5 items-center justify-center rounded border-2 ${
                                  selectedRoles.includes(role.value)
                                    ? 'border-blue-500 bg-blue-500'
                                    : 'border-gray-300'
                                }`}
                              >
                                {selectedRoles.includes(role.value) && (
                                  <Check className='h-3 w-3 text-white' />
                                )}
                              </div>
                              <span className='text-sm text-gray-700'>{role.label}</span>
                            </div>
                            <IconComponent
                              className={`h-4 w-4 ${role.value === 'ROLE_ADMIN' ? 'text-red-500' : 'text-gray-600'}`}
                            />
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
              {(selectedRoles.length > 0 || selectedStatuses.length > 0) && (
                <button
                  onClick={clearFilters}
                  className='flex items-center gap-2 rounded-lg p-3 px-4 py-2 hover:cursor-pointer hover:bg-gray-200'
                >
                  Clear
                  <X className='h-5 w-5' />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <UsersTable {...tableProps} />

        {/* Add User Modal */}
        {showAddUserModal && (
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
            <div className='w-full max-w-lg rounded-lg bg-white shadow-xl'>
              <div className='flex items-start justify-between border-b border-gray-200 px-6 py-4'>
                <div>
                  <h2 className='text-lg font-semibold text-gray-900'>Add New User</h2>
                  <p className='mt-1 text-sm text-gray-500'>
                    Create new user here. Click save when you're done.
                  </p>
                </div>
                <button
                  onClick={handleCloseAddUserModal}
                  className='rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600'
                >
                  <X className='h-5 w-5' />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(handleSubmitAddUser)} className='px-6 py-4'>
                <div className='space-y-3'>
                  <div className='flex items-center gap-4'>
                    <label className='w-32 text-sm font-medium text-gray-900'>Full Name</label>
                    <div className='flex-1 flex-col'>
                      <input
                        type='text'
                        {...register('fullName')}
                        placeholder='John'
                        className='w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                      />
                      {errors.fullName && (
                        <p className='mt-2 ml-2 text-xs font-medium text-red-500'>
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='flex items-center gap-4'>
                    <label className='w-32 text-sm font-medium text-gray-900'>Email</label>
                    <div className='flex-1 flex-col'>
                      <input
                        type='email'
                        {...register('email')}
                        placeholder='john.doe@gmail.com'
                        className='w-full rounded-lg border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                      />
                      {errors.email && (
                        <p className='mt-2 ml-2 text-xs font-medium text-red-500'>
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='flex items-center gap-4'>
                    <label className='w-32 text-sm font-medium text-gray-900'>Phone Number</label>
                    <div className='flex-1 flex-col'>
                      <input
                        type='tel'
                        {...register('phone')}
                        placeholder='+123456789'
                        className='w-full rounded-lg border border-gray-300 px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                      />
                      {errors.phone && (
                        <p className='mt-2 ml-2 text-xs font-medium text-red-500'>
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='flex items-center gap-4'>
                    <label className='w-32 text-sm font-medium text-gray-900'>Role</label>
                    <div className='relative flex-1'>
                      <Listbox value={watch('role')} onChange={(value) => setValue('role', value)}>
                        <ListboxButton className='relative flex w-full cursor-pointer items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-left text-sm'>
                          {roleOptions.find((r) => r.value === watch('role'))?.label ||
                            'Select role'}
                          <ChevronDownIcon className='w-4' />
                        </ListboxButton>

                        <ListboxOptions className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border border-gray-300 bg-white shadow-lg'>
                          {roleOptions.map((role) => (
                            <ListboxOption key={role.value} value={role.value}>
                              {({ selected, active }) => (
                                <div
                                  className={`flex cursor-pointer justify-between px-3 py-1.5 text-sm ${
                                    active ? 'bg-gray-100' : ''
                                  }`}
                                >
                                  {role.label}
                                  {selected && <CheckIcon className='h-4 w-4 text-blue-500' />}
                                </div>
                              )}
                            </ListboxOption>
                          ))}
                        </ListboxOptions>
                      </Listbox>
                    </div>
                  </div>

                  <div className='flex items-center gap-4'>
                    <label className='w-32 text-sm font-medium text-gray-900'>Password</label>
                    <div className='flex-1'>
                      <div className='relative'>
                        <input
                          type={showPasswords.current ? 'text' : 'password'}
                          {...register('password')}
                          placeholder='e.g., S3cur3P@ssw0rd'
                          className='w-full rounded-lg border border-gray-300 px-3.5 py-2.5 pr-10 text-sm text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                        />
                        <button
                          type='button'
                          onClick={() => togglePasswordVisibility('current')}
                          className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition hover:text-gray-600'
                        >
                          {showPasswords.current ? (
                            <Eye className='h-4 w-4' />
                          ) : (
                            <EyeOff className='h-4 w-4' />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className='mt-2 ml-2 text-xs font-medium text-red-500'>
                          {errors.password.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className='flex items-center gap-4'>
                    <label className='w-32 text-sm font-medium text-gray-900'>
                      Confirm Password
                    </label>
                    <div className='flex-1'>
                      <div className='relative'>
                        <input
                          type={showPasswords.confirm ? 'text' : 'password'}
                          {...register('confirmPassword')}
                          placeholder='e.g., S3cur3P@ssw0rd'
                          className='w-full rounded-lg border border-gray-300 px-3.5 py-2.5 pr-10 text-sm text-gray-900 placeholder-gray-400 transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
                        />
                        <button
                          type='button'
                          onClick={() => togglePasswordVisibility('confirm')}
                          className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 transition hover:text-gray-600'
                        >
                          {showPasswords.confirm ? (
                            <Eye className='h-4 w-4' />
                          ) : (
                            <EyeOff className='h-4 w-4' />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className='mt-2 ml-2 text-xs font-medium text-red-500'>
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className='mt-6 flex justify-end'>
                  <button
                    type='submit'
                    className='rounded-lg bg-gray-900 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 active:bg-gray-950'
                  >
                    Save changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default UsersPage
