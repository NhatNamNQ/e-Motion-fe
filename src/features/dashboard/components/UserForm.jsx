import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { addUserSchema, editUserSchema } from '@/features/auth/schemas/authSchemas'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { roleOptions } from '../constants/userConfig'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@/components/ui/select'
import { useSelector } from 'react-redux'
import { selectUser } from '@/store/selectors/authSelectors'

const UserForm = ({ mode, handleSubmitUser, setShowUserForm, stations }) => {
  const currentUser = useSelector(selectUser)
  const filteredRoleOptions =
    currentUser?.role === 'ROLE_ADMIN'
      ? roleOptions
      : roleOptions.filter((r) => r.value === 'ROLE_USER')

  const isAdd = mode.type === 'add'
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    confirm: false
  })

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: zodResolver(mode.user ? editUserSchema : addUserSchema),
    mode: 'onBlur',
    defaultValues: {
      fullName: mode.user?.fullname || '',
      phone: mode.user?.phone || '',
      email: mode.user?.email || '',
      password: '',
      confirmPassword: '',
      role: mode.user?.role || (currentUser?.role === 'ROLE_ADMIN' ? 'ROLE_STAFF' : 'ROLE_USER'),
      stationId: mode.user?.station?.id || 1
    }
  })

  return (
    <Dialog open onOpenChange={setShowUserForm}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isAdd ? 'Add New User' : 'Edit Role User'}</DialogTitle>
          <DialogDescription>
            {isAdd ? 'Fill in the details to add a new user' : 'Update role of user'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleSubmitUser)} className='px-6 py-4'>
          <div className='space-y-3'>
            <div className='flex items-start gap-4'>
              <Label className='mt-3 w-32' htmlFor='fullName'>
                Full Name
              </Label>
              <div className='flex-1 flex-col'>
                <Input
                  disabled={mode.user}
                  id='fullName'
                  placeholder='John Doe'
                  {...register('fullName')}
                />
                {errors.fullName && (
                  <p className='mt-2 ml-2 text-xs font-medium text-red-500'>
                    {errors.fullName.message}
                  </p>
                )}
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <Label className='mt-3 w-32' htmlFor='email'>
                Email
              </Label>
              <div className='flex-1 flex-col'>
                <Input
                  disabled={mode.user}
                  id='email'
                  {...register('email')}
                  placeholder='john.doe@gmail.com'
                />
                {errors.email && (
                  <p className='mt-2 ml-2 text-xs font-medium text-red-500'>
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <Label className='mt-3 w-32' htmlFor='phone'>
                Phone Number
              </Label>
              <div className='flex-1 flex-col'>
                <Input
                  disabled={mode.user}
                  id='phone'
                  {...register('phone')}
                  placeholder='+123456789'
                />
                {errors.phone && (
                  <p className='mt-2 ml-2 text-xs font-medium text-red-500'>
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>

            <div className='flex items-start gap-4'>
              <Label className='mt-3 w-32' htmlFor='role'>
                Role
              </Label>
              <Select
                id='role'
                value={watch('role')}
                onValueChange={(value) => setValue('role', value)}
              >
                <SelectTrigger>
                  <SelectValue>
                    {filteredRoleOptions.find((r) => r.value === watch('role'))?.label ||
                      'Select a role'}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {filteredRoleOptions.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {watch('role') === 'ROLE_STAFF' && (
              <div className='flex items-start gap-4'>
                <Label className='mt-3 w-32' htmlFor='stationId'>
                  Station
                </Label>
                <Select
                  id='stationId'
                  value={String(watch('stationId'))}
                  onValueChange={(value) => setValue('stationId', Number(value))}
                >
                  <SelectTrigger>
                    <SelectValue>
                      {stations.find((s) => s.id === watch('stationId'))?.name ||
                        'Select a station'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {stations.map((station) => (
                      <SelectItem key={station.id} value={String(station.id)}>
                        {station.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {isAdd && (
              <div className='flex items-start gap-4'>
                <Label className='mt-3 w-32' htmlFor='password'>
                  Password
                </Label>
                <div className='flex-1'>
                  <div className='relative'>
                    <Input
                      id='password'
                      {...register('password')}
                      placeholder='e.g., S3cur3P@ssw0rd'
                      type={showPasswords.current ? 'text' : 'password'}
                    />
                    <Button
                      type='button'
                      onClick={() => togglePasswordVisibility('current')}
                      className='absolute top-1/2 right-0 -translate-y-1/2 bg-transparent text-gray-400 shadow-none transition hover:bg-transparent hover:text-gray-600'
                    >
                      {showPasswords.current ? (
                        <Eye className='h-4 w-4' />
                      ) : (
                        <EyeOff className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className='mt-2 ml-2 text-xs font-medium text-red-500'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
            )}

            {isAdd && (
              <div className='flex items-start gap-4'>
                <Label className='mt-3 w-32' htmlFor='confirm'>
                  Confirm Password
                </Label>
                <div className='flex-1'>
                  <div className='relative'>
                    <Input
                      id='confirm'
                      {...register('confirmPassword')}
                      placeholder='e.g., S3cur3P@ssw0rd'
                      type={showPasswords.confirm ? 'text' : 'password'}
                      disabled={!watch('password')}
                    />
                    <Button
                      type='button'
                      onClick={() => togglePasswordVisibility('confirm')}
                      className='absolute top-1/2 right-0 -translate-y-1/2 bg-transparent text-gray-400 shadow-none transition hover:bg-transparent hover:text-gray-600'
                    >
                      {showPasswords.confirm ? (
                        <Eye className='h-4 w-4' />
                      ) : (
                        <EyeOff className='h-4 w-4' />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className='mt-2 ml-2 text-xs font-medium text-red-500'>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className='mt-6 flex justify-end'>
            <Button type='submit'>Save changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UserForm
