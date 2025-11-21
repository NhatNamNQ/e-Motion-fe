import { User, Car, CalendarCheck, ClipboardCheck, CreditCard, PieChart } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import CardDashboard from '@/components/CardDashboard'

const SummaryCard = ({ summary }) => {
  const cards = [
    {
      title: 'Khách hàng',
      value: summary?.totalUsers || 0,
      icon: <User className='h-6 w-6 text-blue-500' />
    },
    {
      title: 'Số xe',
      value: summary?.totalCars || 0,
      icon: <Car className='h-6 w-6 text-green-500' />
    },
    {
      title: 'Số đơn đặt',
      value: summary?.totalReservations || 0,
      icon: <CalendarCheck className='h-6 w-6 text-purple-500' />
    },
    {
      title: 'Số lượt thuê',
      value: summary?.totalBookings || 0,
      icon: <ClipboardCheck className='h-6 w-6 text-indigo-500' />
    },
    {
      title: 'Tổng doanh thu',
      value: formatCurrency(summary?.totalRevenue || 0),
      icon: <CreditCard className='h-6 w-6 text-yellow-500' />
    },
    {
      title: 'Tỷ lệ sử dụng',
      value: `${(summary?.usageRate || 0).toFixed(2)}%`,
      icon: <PieChart className='h-6 w-6 text-red-500' />
    }
  ]

  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {cards.map((card) => (
        <CardDashboard card={card} />
      ))}
    </div>
  )
}

export default SummaryCard
