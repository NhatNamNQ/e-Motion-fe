import ProfilePage from '@/features/profile/pages/ProfilePage'
import CardDashboard from '@/components/CardDashboard'
import { BarChart3, Truck, Package, Star } from 'lucide-react'

const StaffDetail = ({ user, transaction }) => {
  const cards = [
    {
      title: 'Tổng giao dịch',
      value: transaction.deliveries + transaction.pickups,
      icon: <BarChart3 className='h-12 w-12 text-blue-500' />
    },
    {
      title: 'Số lượt giao',
      value: transaction.deliveries,
      icon: <Truck className='h-12 w-12 text-green-500' />
    },
    {
      title: 'Số lượt nhận',
      value: transaction.pickups,
      icon: <Package className='h-12 w-12 text-purple-500' />
    },
    {
      title: 'Đánh giá',
      value: '5 ⭐',
      icon: <Star className='h-12 w-12 text-indigo-500' />
    }
  ]
  return (
    <div className='space-y-6'>
      <ProfilePage user={user} />
      <div className='mb-8 grid grid-cols-1 gap-4 md:grid-cols-4'>
        {cards.map((card) => (
          <CardDashboard card={card} />
        ))}
      </div>
    </div>
  )
}

export default StaffDetail
