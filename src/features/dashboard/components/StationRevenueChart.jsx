import { useState, useEffect } from 'react'
import { adminService } from '../services/adminService'

const StationRevenueTable = () => {
  const [stationDetail, setStationDetail] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await adminService.getDashboardStationDetail()
        setStationDetail(
          data.map((item) => ({
            stationName: item.stationName,
            revenue: item.revenue,
            cars: item.cars ?? 0,
            bookings: item.bookings ?? 0,
            usageRate: item.usageRate,
            peakHours: item.peakHours ?? []
          }))
        )
      } catch (error) {
        console.error('Error fetching data stats admin:', error)
      }
    }

    fetchStats()
  }, [])
  return (
    <div className='overflow-x-auto rounded-xl bg-white p-6 shadow-md'>
      <h3 className='mb-4 text-xl font-semibold text-gray-700'>Station Revenue Details</h3>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Station</th>
            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Revenue</th>
            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Cars</th>
            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Bookings</th>
            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>
              Usage Rate (%)
            </th>
            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Peak Hours</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {stationDetail.map((station, index) => (
            <tr key={index} className='transition-colors hover:bg-gray-50'>
              <td className='px-4 py-2'>{station.stationName}</td>
              <td className='px-4 py-2 font-semibold text-green-600'>{`$${station.revenue}`}</td>
              <td className='px-4 py-2'>{station.cars}</td>
              <td className='px-4 py-2'>{station.bookings}</td>
              <td className='px-4 py-2'>{station.usageRate}%</td>
              <td className='px-4 py-2'>
                {station.peakHours.map((h) => (
                  <span
                    key={h}
                    className='mr-1 mb-1 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800'
                  >
                    {h}h
                  </span>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default StationRevenueTable
