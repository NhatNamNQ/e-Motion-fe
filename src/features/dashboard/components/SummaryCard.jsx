import { User, Car, CalendarCheck, ClipboardCheck, CreditCard, PieChart } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

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
      title: 'Total Bookings',
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
    <div className='overflow-x-auto pb-5'>
      <h3 className='mb-4 text-xl font-semibold text-gray-700'>Summary</h3>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {cards.map((card) => (
          <div
            key={card.title}
            className='flex items-center gap-4 rounded-xl border bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg'
          >
            {card.icon}
            <div>
              <h4 className='mb-1 text-sm font-medium text-gray-600'>{card.title}</h4>
              <p className='text-3xl font-bold text-gray-900'>{card.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SummaryCard
