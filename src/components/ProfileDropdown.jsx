import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { ChevronDown } from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { User, Settings, LogOut, CreditCard, HelpCircle, Shield } from 'lucide-react'
import { logoutUser } from '@/store/actions/authActions'
import { Button } from './ui/button'
import { selectUser } from '@/store/selectors/authSelectors'

const ProfileDropdown = () => {
  const user = useSelector(selectUser)
  const { fullName: name, role, email } = user ? user : ''
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await dispatch(logoutUser())
    navigate('/auth/login')
  }

  const getInitials = (name) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  const getUserDisplayName = () => {
    return name || 'User'
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-gray-100'
        >
          <Avatar className='h-8 w-8'>
            <AvatarImage src='/logo.svg' alt={getUserDisplayName()} />
            <AvatarFallback>{getInitials(getUserDisplayName())}</AvatarFallback>
          </Avatar>
          <ChevronDown className='h-4 w-4 opacity-70' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-56' align='end' forceMount>
        <DropdownMenuLabel className='font-normal'>
          <div className='flex flex-col space-y-1'>
            <p className='text-sm leading-none font-medium'>{getUserDisplayName()}</p>
            <p className='text-muted-foreground text-xs leading-none'>{email}</p>
            <p className='text-muted-foreground text-xs leading-none capitalize'>{role} </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to='/profile'>
              <User />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to='/setting'>
              <Settings />
              Setting
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to='/help'>
            <HelpCircle />
            Support
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className='text-red-600'>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileDropdown
