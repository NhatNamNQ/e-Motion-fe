import { useEffect, useState } from 'react'
import { formatCurrency } from '@/lib/utils'
import { adminService } from '../services/AdminService'

const SummaryCard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    totalReservations: 0,
    totalBookings: 0,
    totalRevenue: 0,
    usageRate: 0,
    peakHours: []
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getDataDashboardAdmin()
        setStats({
          totalUsers: data.totalUsers ?? 0,
          totalCars: data.totalCars ?? 0,
          totalReservations: data.totalReservations ?? 0,
          totalBookings: data.totalBookings ?? 0,
          totalRevenue: data.totalRevenue ?? 0,
          usageRate: data.usageRate ?? 0,
          peakHours: data.peakHours ?? []
        })
        console.log(data)
      } catch (error) {
        console.error('Error fetching data stats admin:', error)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className='mb-5 overflow-x-auto rounded-xl bg-white p-6 shadow-md'>
      <h3 className='mb-4 text-xl font-semibold text-gray-700'>Summary</h3>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        <div className='rounded-xl border bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg'>
          <h3 className='mb-2 text-lg font-semibold text-gray-700'>Clients</h3>
          <p className='text-3xl font-bold text-blue-600'>{stats.totalUsers}</p>
        </div>

        <div className='rounded-xl border bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg'>
          <h3 className='mb-2 text-lg font-semibold text-gray-700'>Total Cars</h3>
          <p className='text-3xl font-bold text-green-600'>{stats.totalCars}</p>
        </div>

        <div className='rounded-xl border bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg'>
          <h3 className='mb-2 text-lg font-semibold text-gray-700'>Total Reservations</h3>
          <p className='text-3xl font-bold text-purple-600'>{stats.totalReservations}</p>
        </div>

        <div className='rounded-xl border bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg'>
          <h3 className='mb-2 text-lg font-semibold text-gray-700'>Total Bookings</h3>
          <p className='text-3xl font-bold text-purple-600'>{stats.totalBookings}</p>
        </div>

        <div className='rounded-xl border bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg'>
          <h3 className='mb-2 text-lg font-semibold text-gray-700'>Total Revenue</h3>
          <p className='text-3xl font-bold text-green-600'>{formatCurrency(stats.totalRevenue)}</p>
        </div>

        <div className='rounded-xl border bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg'>
          <h3 className='mb-2 text-lg font-semibold text-gray-700'>Usage Rate</h3>
          <p className='text-3xl font-bold text-purple-600'>{stats.usageRate}%</p>
        </div>

        <div className='rounded-xl border bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg'>
          <h3 className='mb-2 text-lg font-semibold text-gray-700'>Peak Hours</h3>
          <p className='text-xl font-medium text-gray-800'>
            {stats.peakHours.length > 0
              ? stats.peakHours.map((hour) => (
                  <span
                    key={hour}
                    className='mr-2 mb-1 inline-block rounded-full bg-blue-100 px-2 py-1 text-blue-800'
                  >
                    {hour}h
                  </span>
                ))
              : 'No data'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default SummaryCard
