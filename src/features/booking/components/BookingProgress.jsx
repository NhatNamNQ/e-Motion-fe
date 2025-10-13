import { Calendar, User, Shield, CheckCircle } from 'lucide-react'

const BookingProgress = ({ status }) => {
  return (
    <div className='mb-8 flex items-center justify-center'>
      <div className='flex w-full max-w-2xl items-center'>
        <div className='flex flex-col items-center'>
          <div className='bg-secondary flex h-10 w-10 items-center justify-center rounded-full text-white'>
            <User className='h-5 w-5' />
          </div>
          <span className='text-secondary mt-2 text-xs font-medium'>Tìm và chọn xe</span>
        </div>

        <div className='bg-secondary mx-4 h-0.5 flex-1'></div>

        <div className='flex flex-col items-center'>
          <div
            className={`bg-secondary flex h-10 w-10 items-center justify-center rounded-full text-white`}
          >
            <CheckCircle className='h-5 w-5' />
          </div>
          <span className='text-secondary mt-2 text-xs font-medium'>Xác nhận đơn hàng</span>
        </div>

        <div className={`mx-4 h-0.5 flex-1 ${status ? 'bg-secondary' : 'bg-gray-300'}`}></div>

        <div className='flex flex-col items-center'>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${status ? 'bg-secondary text-white' : 'bg-gray-300 text-gray-500'}`}
          >
            <Shield className='h-5 w-5' />
          </div>
          <span
            className={`mt-2 text-xs font-medium ${status ? 'text-secondary' : 'text-gray-500'} `}
          >
            Thanh toán giữ chỗ
          </span>
        </div>

        <div className={`mx-4 h-0.5 flex-1 ${status ? 'bg-secondary' : 'bg-gray-300'}`}></div>

        <div className='flex flex-col items-center'>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${status ? 'bg-secondary text-white' : 'bg-gray-300 text-gray-500'}`}
          >
            <Calendar className='h-5 w-5' />
          </div>
          <span
            className={`mt-2 text-xs font-medium ${status ? 'text-secondary' : 'text-gray-500'} `}
          >
            Lấy mã & lấy xe
          </span>
        </div>
      </div>
    </div>
  )
}

export default BookingProgress
