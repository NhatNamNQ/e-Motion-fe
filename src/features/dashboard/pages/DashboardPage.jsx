const DashboardPage = () => {
  return (
    <div>
      <h1 className='mb-6 text-3xl font-bold'>Staff Dashboard</h1>
      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        <div className='rounded-lg border bg-white p-6 shadow'>
          <h3 className='mb-2 text-lg font-semibold'>Total Users</h3>
          <p className='text-3xl font-bold text-blue-600'>1,234</p>
        </div>
        <div className='rounded-lg border bg-white p-6 shadow'>
          <h3 className='mb-2 text-lg font-semibold'>Total Cars</h3>
          <p className='text-3xl font-bold text-green-600'>156</p>
        </div>
        <div className='rounded-lg border bg-white p-6 shadow'>
          <h3 className='mb-2 text-lg font-semibold'>Total Bookings</h3>
          <p className='text-3xl font-bold text-purple-600'>789</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
