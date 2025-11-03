import { formatVNDate } from '@/lib/utils'

const StaffDetail = ({ user, transaction }) => {
  return (
    <div className='space-y-6'>
      <div>
        <h3 className='mb-4 font-semibold'>Thông tin nhân viên</h3>
        <div className='grid grid-cols-2 gap-4'>
          <div>
            <p className='mb-1 text-sm text-gray-600'>Họ và tên</p>
            <p className='font-medium'>{user.fullName}</p>
          </div>
          <div>
            <p className='mb-1 text-sm text-gray-600'>Email</p>
            <p className='font-medium'>{user.email}</p>
          </div>
          <div>
            <p className='mb-1 text-sm text-gray-600'>Số điện thoại</p>
            <p className='font-medium'>{user.phone}</p>
          </div>
          <div>
            <p className='mb-1 text-sm text-gray-600'>Station</p>
            <p className='font-medium'>{user.stationName}</p>
          </div>
          <div>
            <p className='mb-1 text-sm text-gray-600'>Created At</p>
            <p className='font-medium'>{formatVNDate(user.createdAt)}</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className='mb-4 font-semibold'>Chỉ số hiệu suất</h3>
        <div className='grid grid-cols-2 gap-4'>
          <div className='rounded-lg bg-blue-50 p-4'>
            <p className='mb-1 text-sm text-gray-600'>Tổng giao dịch</p>
            <p className='text-3xl font-bold text-blue-600'>
              {transaction.deliveries + transaction.pickups}
            </p>
          </div>
          <div className='rounded-lg bg-green-50 p-4'>
            <p className='mb-1 text-sm text-gray-600'>Số lượt giao</p>
            <p className='text-3xl font-bold text-green-600'>{transaction.deliveries}</p>
          </div>
          <div className='rounded-lg bg-yellow-50 p-4'>
            <p className='mb-1 text-sm text-gray-600'>Số lượt nhận</p>
            <div className='flex items-center gap-2'>
              <p className='text-3xl font-bold'>{transaction.pickups}</p>
            </div>
          </div>
          <div className='rounded-lg bg-purple-50 p-4'>
            <p className='mb-1 text-sm text-gray-600'>Đánh giá</p>
            <p className='text-3xl font-bold text-purple-600'>5 ⭐</p>
          </div>
        </div>
      </div>

      <div className='border-t pt-6'>
        <h3 className='mb-4 font-semibold'>Nhận xét hiệu suất</h3>
        <div className='rounded-lg border border-green-200 bg-green-50 p-4'>
          <p className='text-sm text-green-800'>
            ✓ Nhân viên đạt hiệu suất tốt với tỷ lệ thành công cao và khách hàng đánh giá tích cực.
          </p>
        </div>
      </div>
    </div>
  )
}

export default StaffDetail
