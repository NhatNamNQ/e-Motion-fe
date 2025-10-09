const CarCancellationPolicy = () => {
  return (
    <section>
      <h2 className='text-2xl text-gray-700'>Chính sách hủy chuyến </h2>
      <div className='bg-secondary mt-2 h-1 w-10 rounded-full' />
      <div className='overflow-hidden rounded-lg border border-gray-200'>
        <table className='w-full'>
          <thead className='bg-gray-100'>
            <tr>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'></th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>Ngày thường</th>
              <th className='px-4 py-3 text-left text-sm font-medium text-gray-900'>
                Ngày lễ, Tết
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            <tr>
              <td className='px-4 py-3 text-sm font-semibold text-gray-900'>
                <div className='flex items-center'>
                  <div className='bg-secondary mr-2 h-4 w-4 rounded-full' />
                  Hoàn 100% tiền giữ chỗ
                </div>
              </td>
              <td className='px-4 py-3 text-sm text-gray-900'>Trước chuyến đi &gt; 5 ngày</td>
              <td className='px-4 py-3 text-sm text-gray-900'>Trước chuyến đi &gt; 5 ngày</td>
            </tr>
            <tr>
              <td className='px-4 py-3 text-sm font-semibold text-gray-900'>
                <div className='flex items-center'>
                  <div className='mr-2 h-4 w-4 rounded-full bg-red-500' />
                  Không hoàn tiền giữ chỗ
                </div>
              </td>
              <td className='px-4 py-3 text-sm text-gray-900'>Trong vòng 5 ngày trước chuyến đi</td>
              <td className='px-4 py-3 text-sm text-gray-900'>Trong vòng 5 ngày trước chuyến đi</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default CarCancellationPolicy
