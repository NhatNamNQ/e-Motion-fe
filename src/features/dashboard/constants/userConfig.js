import { User, Clipboard, UserCheck } from 'lucide-react'

export const statusOptions = [
  { value: false, label: 'Active', color: 'bg-teal-50 text-teal-700' },
  { value: true, label: 'Blocked', color: 'bg-red-50 text-red-700' }
]

export const roleOptions = [
  { value: 'ROLE_USER', label: 'User', icon: User },
  { value: 'ROLE_STAFF', label: 'Staff', icon: Clipboard },
  { value: 'ROLE_ADMIN', label: 'Admin', icon: UserCheck }
]
