import { Link, useLocation } from 'react-router-dom'
import { User, Car, Heart, Store, Calendar, Gift, MapPin, Lock, Trash2, LogOut } from 'lucide-react'

const AccountSidebar = ({ classname }) => {
  const location = useLocation()

  const menuItems = [
    {
      icon: User,
      label: 'Tài khoản của tôi',
      path: '/account/profile',
      active: location.pathname === '/account/profile'
    },
    {
      icon: Car,
      label: 'Lịch sử thuê xe',
      path: '/account/history',
      active: location.pathname === '/account/history'
    },
    {
      icon: Lock,
      label: 'Đổi mật khẩu',
      path: '/profile/change-password',
      active: location.pathname === '/profile/change-password'
    },
    {
      icon: Trash2,
      label: 'Yêu cầu xoá tài khoản',
      path: '/profile/delete-account',
      active: location.pathname === '/profile/delete-account'
    }
  ]

  return (
    <div className={`${classname} mb-8 md:mb-0`}>
      <h1 className='mb-8 text-2xl font-bold'>Xin chào bạn!</h1>
      <nav className='space-y-2'>
        {menuItems.map((item, index) => {
          const IconComponent = item.icon
          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center space-x-3 rounded-lg px-4 py-3 transition-colors duration-200 hover:bg-gray-100 ${
                item.active
                  ? 'border-secondary/90 text-secondary bg-secondary/10 border-l-4'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              <IconComponent
                size={20}
                className={item.active ? 'text-secondary' : 'text-gray-500'}
              />
              <span className='font-medium'>{item.label}</span>
            </Link>
          )
        })}

        {/* Logout Button */}
        <button
          className='mt-6 flex w-full items-center space-x-3 rounded-lg border-t px-4 py-3 pt-6 text-left text-red-600 transition-colors duration-200 hover:bg-red-50 hover:text-red-700'
          onClick={() => {
            // Add logout logic here
            console.log('Logout clicked')
          }}
        >
          <LogOut size={20} />
          <span className='font-medium'>Đăng xuất</span>
        </button>
      </nav>
    </div>
  )
}

export default AccountSidebar
