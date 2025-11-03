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
    }
  ]

  return (
    <div className={`${classname} mb-8 md:mb-0`}>
      <nav className='space-y-2'>
        <h1 className='text-center text-2xl'>Chào mừng bạn</h1>
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
      </nav>
    </div>
  )
}

export default AccountSidebar
