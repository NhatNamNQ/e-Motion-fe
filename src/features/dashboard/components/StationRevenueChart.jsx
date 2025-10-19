const StationRevenueTable = ({ data }) => {
  // data ví dụ
  const sampleData = data || [
    { stationName: 'Station A', revenue: 1200, rentals: 15, usageRate: 75, peakHours: [7, 15] },
    { stationName: 'Station B', revenue: 950, rentals: 12, usageRate: 60, peakHours: [8] },
    { stationName: 'Station C', revenue: 780, rentals: 10, usageRate: 50, peakHours: [17, 18] },
    { stationName: 'Station D', revenue: 1500, rentals: 20, usageRate: 90, peakHours: [9, 16] }
  ]

  return (
    <div className='overflow-x-auto rounded-xl bg-white p-6 shadow-md'>
      <h3 className='mb-4 text-xl font-semibold text-gray-700'>Station Revenue Details</h3>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Station</th>
            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Revenue</th>
            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Bookings</th>
            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>
              Usage Rate (%)
            </th>
            <th className='px-4 py-2 text-left text-sm font-medium text-gray-700'>Peak Hours</th>
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {sampleData.map((station, index) => (
            <tr key={index} className='transition-colors hover:bg-gray-50'>
              <td className='px-4 py-2'>{station.stationName}</td>
              <td className='px-4 py-2 font-semibold text-green-600'>{`$${station.revenue}`}</td>
              <td className='px-4 py-2'>{station.rentals}</td>
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
