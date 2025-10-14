import SelectItems from '@/components/SelectItems'
import { Button } from '@/components/ui/button'
import { logoutUser } from '@/store/actions/authActions'
import { selectIsAuthenticated } from '@/store/selectors/authSelectors'
import { MapPin } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const Header = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser())
      toast.success('Đăng xuất thành công')
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <header className='flex h-30 items-center border-b'>
      <div className='container mx-auto flex justify-between pr-4'>
        <Link to='/'>
          <img src='/logo.svg' alt='e-Motion' className='h-[80px] w-[150px] cursor-pointer' />
        </Link>
        <nav className='flex items-center space-x-4'>
          <Link to='/cars'>Xem danh sách xe</Link>
          <div className='flex'>
            <SelectItems children={<MapPin color='#3B82F6' />} />
          </div>
          {isAuthenticated ? (
            <Button
              className='bg-secondary hover:bg-secondary/80 cursor-pointer px-6 py-2'
              onClick={handleLogout}
            >
              Đăng xuất
            </Button>
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
