import SelectItems from '@/components/SelectItems'
import { Button } from '@/components/ui/button'
import { selectIsAuthenticated, selectUser } from '@/store/selectors/authSelectors'
import { MapPin } from 'lucide-react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileDropdown from '@/components/ProfileDropdown'

const Header = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const user = useSelector(selectUser)

  const getHomeLink = () => {
    if (!isAuthenticated) return '/'
    if (user?.role === 'ROLE_ADMIN') return '/dashboard'
    if (user?.role === 'ROLE_STAFF') return `/dashboard/stations/${user?.station?.id}`
    return '/'
  }

  const link = getHomeLink()

  return (
    <header className='flex items-center border-b py-8'>
      <div className='container mx-auto flex justify-between pr-4'>
        <Link to={link}>
          <img src='/logo.svg' alt='e-Motion' className='h-[60px] w-[150px] cursor-pointer' />
        </Link>
        <nav className='flex items-center space-x-4'>
          <Link to='/cars'>Xem danh sách xe</Link>
          {isAuthenticated ? (
            <ProfileDropdown />
          ) : (
            <div className='flex gap-2'>
              <Link to='/auth/register'>
                <Button variant='outline'>Đăng Ký</Button>
              </Link>
              <Link to='/auth/login'>
                <Button className='bg-secondary hover:bg-secondary/80 cursor-pointer px-6 py-2'>
                  Đăng Nhập
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
