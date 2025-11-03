import { User, Car, CalendarCheck, ClipboardCheck, CreditCard, PieChart } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import CardDashboard from '@/components/CardDashboard'

const SummaryCard = ({ summary }) => {
  const cards = [
    {
      title: 'Clients',
      value: summary.totalUsers,
      icon: <User className='h-6 w-6 text-blue-500' />
    },
    {
      title: 'Total Cars',
      value: summary.totalCars,
      icon: <Car className='h-6 w-6 text-green-500' />
    },
    {
      title: 'Total Reservations',
      value: summary.totalReservations,
      icon: <CalendarCheck className='h-6 w-6 text-purple-500' />
    },
    {
      title: 'Total Rentals',
      value: summary.totalBookings,
      icon: <ClipboardCheck className='h-6 w-6 text-indigo-500' />
    },
    {
      title: 'Total Revenue',
      value: formatCurrency(summary.totalRevenue),
      icon: <CreditCard className='h-6 w-6 text-yellow-500' />
    },
    {
      title: 'Usage Rate',
      value: `${summary.usageRate}%`,
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
