import SelectItems from '@/components/SelectItems'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/context/AuthContext'
import { MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

const Header = () => {
  const { isAuthenticated } = useAuth()

  return (
    <header className='flex h-30 items-center border-b'>
      <div className='container mx-auto flex justify-between pr-4'>
        <Link to='/'>
          <img src='/logo.svg' alt='e-Motion' className='h-[80px] w-[150px] cursor-pointer' />
        </Link>
        <nav className='flex items-center space-x-4'>
          <Link to='/cars'>Xem danh sách xe</Link>
          <div className='flex'>
            <SelectItems children={<MapPin color='#51C09F' />} />
          </div>
          {isAuthenticated ? (
            <Button className='cursor-pointer bg-[#51C09F] px-6 py-2 hover:bg-[#51C09F]/80'>
              Đăng xuất
            </Button>
          ) : (
            <Link to='/auth/login'>
              <Button className='cursor-pointer bg-[#51C09F] px-6 py-2 hover:bg-[#51C09F]/80'>
                Đăng Nhập
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header
